import {Topic, TopicWithPosts} from "../model";
import {Link, useNavigate, useParams} from "react-router-dom";
import {topicKeys, useDeleteTopic, useTopic} from "../api";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRef, useState} from "react";
import {useCreatePost, useDeletePost, useUpdatePost} from "../../post/api";
import {useQueryClient} from "@tanstack/react-query";
import Pageable from "../../../ui/pageable/Pageable";
import {UniversalPaginationController} from "../../../ui/pageable/UniversalPaginationController";
import {MAX_FILE_SIZE, MAX_SUMMARY_FILE_SIZE} from "../../../utils/consants";
import {useCurrentUser} from "../../auth/model";
import clsx from "clsx";
import {Edited} from "../../post/components/Edited";

export type CreateFormProps = {
    parentId: number
}

const CreateForm = ({parentId}: CreateFormProps) => {
    const user = useCurrentUser()
    const queryClient = useQueryClient()
    const [files, setFiles] = useState<File[]>([])
    const [text, setText] = useState("")
    const [isAnonymous, setAnonymous] = useState(false)

    const formRef = useRef<HTMLFormElement>(null)
    const {mutate} = useCreatePost(parentId)

    return <form
        ref={formRef}
        onSubmit={e => {
            e.preventDefault()
            if (text === "") return alert("Заполните все обязательные поля")

            if (files.some(file => file.size > MAX_FILE_SIZE)
                || files.reduce((partSum: number, file: File) => partSum + file.size, 0) > MAX_SUMMARY_FILE_SIZE) {
                return alert("Размер файлов превышает лимит");
            }

            mutate({
                parentId,
                authorId: user?.id || -1,
                text,
                files,
                isAnonymous,
            }, {
                onSuccess: async () => {
                    setText("")
                    setFiles([])
                    formRef.current?.reset()
                    await queryClient.invalidateQueries({queryKey: topicKeys.topics.root})
                },
                onError: err => {
                    console.log(err)
                    alert(err.error.detail || "Ошибка")
                }
            })
        }
        }
        className="space-y-2"
    >
            <textarea className="w-full h-32 p-2 border border-gray-600 rounded-md resize-none placeholder-gray-600"
                      value={text}
                      onChange={e => setText(e.target.value)}
                      placeholder={"Напишите пост..."}
            />

        <input type="file"
               multiple
               onChange={e => setFiles(e.target.files ? Array.from(e.target.files) : [])}
        />

        <label>
            <input type="checkbox"
                   checked={isAnonymous}
                   onChange={e => setAnonymous(e.target.checked)}
            />
            Опубликовать анонимно
        </label>

        <button type={"submit"}
                className="px-4 py-2 border border-blue-500 text-blue-500 hover:border-blue-700 bg-white rounded-md w-full">
            Отправить
        </button>
    </form>
}

type TopicComponentProps = {
    topic: TopicWithPosts
}

const TopicComponent = ({
                            topic
                        }: TopicComponentProps
) => {
    const queryClient = useQueryClient()
    const user = useCurrentUser()
    const nav = useNavigate()
    const {mutate: deleteTopic} = useDeleteTopic({
        onSuccess: () => {
            nav(`/sections/${topic.parentId}`)
        }
    })
    const {mutate: deletePost} = useDeletePost({
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: topicKeys.topics.root})
        }
    })
    const {mutate: updatePost} = useUpdatePost({
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: topicKeys.topics.root})
        }
    })

    return <div className="px-8">
        <Link to={`/sections/${topic.parentId}`} className="text-xl text-blue-500 hover:text-blue-700">
            <FontAwesomeIcon icon={solid("chevron-left")} className="mr-2"/>Назад
        </Link>
        <div className="flex items-center space-x-5">
            <p className="text-3xl text-black">
                {topic.name}
            </p>
            {user?.roles.includes("ROLE_MODERATOR") &&
                <FontAwesomeIcon icon={solid("trash")}
                                 className="text-xl text-yellow-600 hover:text-yellow-800 cursor-pointer"
                                 onClick={() => deleteTopic(topic.id)}/>
            }
        </div>
        <div className="mt-4 space-y-4 w-1/2">
            {topic.posts.content.map(value => (
                <div key={`post-${value.id}`}
                     className="flex flex-col space-y-2 border border-gray-600 p-2 rounded">
                    <p className="whitespace-pre-line">{value.text}</p>
                    {value.documents.length > 0 &&
                        <div className="flex flex-col space-y-2 border-t border-gray-600">
                            {value.documents.map(value => (
                                <div key={`document-${value.filename}`}
                                     className="flex items-center mt-4 space-x-2">
                                    <a href={`http://localhost:8080/files/${value.filename}`}
                                       target="_blank"
                                       rel="noreferrer"
                                       className="text-blue-500 hover:text-blue-700">
                                        <FontAwesomeIcon icon={regular("file")} className="mr-2"/>
                                        {value.originalName}
                                    </a>
                                </div>
                            ))}
                        </div>}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-600 text-gray-600">
                        {
                            <Link to={`/profile/${value.authorId}`} className={clsx(
                                !user?.roles.includes("ROLE_MODERATOR") && value.isAnonymous ? "pointer-events-none" : "text-blue-700"
                            )}>
                                <FontAwesomeIcon icon={
                                    value.isAnonymous ? solid("user-secret") : solid("user")
                                } className="mr-2"/>
                                {value.authorName}{value.isAuthor ? " (Вы)" : ""}
                            </Link>
                        }
                        <span>
                            <FontAwesomeIcon icon={regular("clock")} className="mr-2"/>
                            {new Date(value.createdAt).toLocaleString()}
                            {value.modified && value.updateAt && <Edited updateAt={value.updateAt} id={value.id}/>}
                            {
                                value.isAuthor &&
                                <FontAwesomeIcon icon={solid("edit")}
                                                 className="ml-2 text-green-700 hover:text-green-800 cursor-pointer"
                                                 onClick={() => {
                                                     const s = prompt("Введите новое сообщение")
                                                     if (s) {
                                                         updatePost({
                                                             id: value.id,
                                                             text: s,
                                                         })
                                                     }
                                                 }}
                                />
                            }
                            {
                                user?.roles.includes("ROLE_MODERATOR") &&
                                <FontAwesomeIcon icon={solid("trash")}
                                                 className="ml-2 text-yellow-600 hover:text-yellow-800 cursor-pointer"
                                                 onClick={() => deletePost(value.id)}/>
                            }
                        </span>

                    </div>
                </div>
            ))}
            <UniversalPaginationController totalPages={topic.posts.totalPages}/>
            {user && <div className="flex flex-col space-y-2">
                <CreateForm parentId={topic.id}/>
            </div>}
        </div>
    </div>
}

type TopicLoaderProps = {
    id: number;
    pageNumber: number;
    forPage: number;
}

const TopicLoader = (props: TopicLoaderProps) => {
    const {data: topic} = useTopic(props)

    return topic ? <TopicComponent topic={topic}/> : <span>ты лох</span>
}

export const TopicView = () => {
    const {id} = useParams();
    return <Pageable defaultPageSize={5}>
        {({page}) => (
            <TopicLoader id={parseInt(id!)} pageNumber={page.page} forPage={page.size}/>
        )}
    </Pageable>
}