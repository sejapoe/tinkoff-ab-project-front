import {Topic} from "../model";
import {Link, useParams} from "react-router-dom";
import {topicKeys, useTopic} from "../api";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRef, useState} from "react";
import {useCreatePost} from "../../post/api";
import {useQueryClient} from "@tanstack/react-query";

export type CreateFormProps = {
    parentId: number
}

const CreateForm = ({parentId}: CreateFormProps) => {
    const queryClient = useQueryClient()
    const [files, setFiles] = useState<File[]>([])
    const [text, setText] = useState("")
    const formRef = useRef<HTMLFormElement>(null)
    const {mutate} = useCreatePost(parentId)

    return <form
        ref={formRef}
        onSubmit={e => {
            e.preventDefault()
            if (text === "") return

            mutate({
                parentId,
                authorId: -1,
                text,
                files,
            }, {
                onSuccess: async () => {
                    setText("")
                    setFiles([])
                    formRef.current?.reset()
                    await queryClient.invalidateQueries({queryKey: topicKeys.topics.byId(parentId)})
                }
            })
        }}
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

        <button type={"submit"}
                className="px-4 py-2 border border-blue-500 text-blue-500 hover:border-blue-700 bg-white rounded-md w-full">
            Отправить
        </button>
    </form>
}

type TopicProps = {
    topic: Topic
}

const TopicV = ({topic}: TopicProps) => {
    return <div className="p-8">
        <Link to={`/sections/${topic.parentId}`} className="text-xl text-blue-500 hover:text-blue-700">
            <FontAwesomeIcon icon={solid("chevron-left")} className="mr-2"/>Назад
        </Link>
        <div className="flex items-center space-x-5">
            <p className="text-3xl text-black">
                {topic.name}
            </p>
        </div>
        <div className="mt-4 space-y-4 w-1/2">
            {topic.posts.map(value => (
                <div key={`post-${value.id}`} className="flex flex-col space-y-2 border border-gray-600 p-2 rounded">
                    {value.text}
                    {value.documents.length > 0 && <div className="flex flex-col space-y-2 border-t border-gray-600">
                        {value.documents.map(value => (
                            <div key={`document-${value}`} className="flex items-center mt-4 space-x-2">
                                <a href={`http://localhost:8080/files/${value.filename}`} target="_blank"
                                   rel="noreferrer"
                                   className="text-blue-500 hover:text-blue-700">
                                    <FontAwesomeIcon icon={regular("file")} className="mr-2"/>
                                    {value.originalName}
                                </a>
                            </div>
                        ))}
                    </div>}
                </div>
            ))}
            <div className="flex flex-col space-y-2">
                <CreateForm parentId={topic.id}/>
            </div>
        </div>
    </div>
}

export const TopicView = () => {
    const {id} = useParams();
    const {data: topic} = useTopic(parseInt(id || "-1"))

    return topic ? <TopicV topic={topic}/> : null
}