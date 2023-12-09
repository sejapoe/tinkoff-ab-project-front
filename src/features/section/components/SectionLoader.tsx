import {SectionWithSubsections} from "../model";
import {Link, useNavigate, useParams} from "react-router-dom";
import {sectionKeys, useCreateSection, useRootSection, useSection} from "../api";
import {useRef, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useCreateTopic} from "../../topic/api";
import Pageable from "../../../ui/pageable/Pageable";
import {UniversalPaginationController} from "../../../ui/pageable/UniversalPaginationController";
import {Disclosure} from "@headlessui/react";
import {MAX_FILE_SIZE, MAX_SUMMARY_FILE_SIZE} from "../../../utils/consants";
import {useCurrentUser} from "../../auth/model";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type SectionProps = {
    section: SectionWithSubsections
}

const allowedNames = ["Конспекты семинаров", "Контрольные работы", "Литература"]
const CreateTopicForm = ({section}: { section: SectionWithSubsections }) => {
    const user = useCurrentUser()
    const queryClient = useQueryClient()
    const [name, setName] = useState("")
    const [files, setFiles] = useState<File[]>([])
    const [text, setText] = useState("")
    const {mutate: createTopic} = useCreateTopic(section.id)
    const formRef = useRef<HTMLFormElement>(null)
    const nav = useNavigate()

    return <form
        ref={formRef}
        onSubmit={event => {
            event.preventDefault()
            if (name === "" || text === "") return alert("Заполните все обязательные поля")

            console.log(files.map(file => file.size))

            if (files.some(file => file.size > MAX_FILE_SIZE)
                || files.reduce((partSum: number, file: File) => partSum + file.size, 0) > MAX_SUMMARY_FILE_SIZE) {
                return alert("Размер файлов превышает лимит");
            }

            createTopic({
                name,
                parentId: section.id,
                authorId: user?.id || -1,
                text,
                files
            }, {
                onSuccess: async (data) => {
                    await queryClient.invalidateQueries({queryKey: sectionKeys.sections.root});
                    setName("")
                    setText("")
                    setFiles([])
                    formRef.current?.reset()
                    nav(`/topics/${data.id}`)
                },
                onError: err => {
                    alert(err.error.detail || "Ошибка")
                }
            })
        }} className="space-y-4">
        <input type="text" value={name} onChange={event => setName(event.target.value)}
               className="border border-gray-600 rounded-md placeholder-gray-600 w-full p-2"
               placeholder={"Название темы"}/>

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

const CreateSubjectForm = ({section}: { section: SectionWithSubsections }) => {
    const queryClient = useQueryClient()
    const [input, setInput] = useState("")
    const {mutate: createSection} = useCreateSection()

    return <>
        {section.rights.canCreateSubsections ?
            <form onSubmit={event => {
                if (input === "") return
                createSection({
                    name: input,
                    parent_id: section.id
                }, {
                    onSuccess: async () => {
                        await queryClient.invalidateQueries({queryKey: sectionKeys.sections.root});
                        setInput("")
                    },
                    onError: error => {
                        alert(error.error.detail)
                        setInput("")
                    }
                })
                event.preventDefault()
            }}>
                <label className="text-xl text-black">
                    Новый предмет:
                    <input type="text" value={input} onChange={event => setInput(event.target.value)}
                           className="ml-2 border border-blue-600"/>
                </label>
            </form> : null
        }
    </>;
}

function CreateTopicFormWrapper({section}: { section: SectionWithSubsections }) {
    return section.rights.canCreateTopics ?
        <div className="w-1/3">
            <Disclosure>
                <Disclosure.Button className="px-4 py-2 bg-gray-300 border border-gray-400 rounded">
                    Создание темы <FontAwesomeIcon icon={solid("chevron-down")} className="ml-2"/>
                </Disclosure.Button>
                <Disclosure.Panel className="mt-2">
                    <CreateTopicForm section={section}/>
                </Disclosure.Panel>
            </Disclosure>
        </div> : null;
}

const Section = ({section}: SectionProps) => {
    return <div className="px-8">
        {section.parent &&
            <Link to={section.parent.id === -1 ? "/sections" : `/sections/${section.parent.id}`}
                  className="text-xl text-blue-500 hover:text-blue-700">
                <FontAwesomeIcon icon={solid("chevron-left")} className="mr-2"/>{section.parent.name}
            </Link>}
        <div className="flex items-center space-x-5">
            <p className="text-3xl text-black">
                {section.name}
            </p>
            <CreateSubjectForm section={section}/>
        </div>
        <CreateTopicFormWrapper section={section}/>
        <ul>
            {section.page.subsections.map(value => (
                <li key={`section-${value.id}`} className="text-xl ml-4 text-blue-500 hover:text-blue-700 w-fit">
                    <FontAwesomeIcon icon={regular("folder")}/> <Link to={`/sections/${value.id}`}>{value.name}</Link>
                </li>
            ))}
            {section.page.topics.map(value => (
                <li key={`topic-${value.id}`} className="text-xl ml-4 text-blue-500 hover:text-blue-700 w-fit">
                    <FontAwesomeIcon icon={regular("file-alt")}/> <Link to={`/topics/${value.id}`}>{value.name}</Link>
                </li>
            ))}
        </ul>
        <UniversalPaginationController totalPages={section.page.totalPages}/>
    </div>
}

type SectionLoaderProps = {
    id: number,
    pageNumber: number,
    forPage: number,
}

const SectionLoader = (props: SectionLoaderProps) => {
    const {data} = useSection(props);

    return data ? <Section section={data}/> : <span className="text-gray-500">ты лох</span>
}

export const SectionView = () => {
    const {id} = useParams()

    return <Pageable defaultPageSize={10}>
        {({page}) => (
            <SectionLoader id={parseInt(id!)} pageNumber={page.page} forPage={page.size}/>
        )}
    </Pageable>
}

type RootSectionLoaderProps = {
    pageNumber: number,
    forPage: number,
}

const RootSectionLoader = (props: RootSectionLoaderProps) => {
    const {data} = useRootSection(props);

    return data ? <Section section={data}/> : <span className="text-gray-500">ты лох</span>
}

export const RootSectionView = () => {
    return <Pageable defaultPageSize={10}>
        {({page}) => (
            <RootSectionLoader pageNumber={page.page} forPage={page.size}/>
        )}
    </Pageable>
}
