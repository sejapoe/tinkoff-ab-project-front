import {SectionWithSubsections} from "../model";
import {Link, useParams} from "react-router-dom";
import {sectionKeys, useCreateSection, useRootSection, useSection} from "../api";
import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useCreateTopic} from "../../topic/api";
import Pageable from "../../../ui/pageable/Pageable";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import clsx from "clsx";
import {UniversalPaginationController} from "../../../ui/pageable/UniversalPaginationController";

type SectionProps = {
    section: SectionWithSubsections
}

const allowedNames = ["Конспекты семинаров", "Контрольные работы", "Литература"]

const CreateForm = ({section}: { section: SectionWithSubsections }) => {
    const queryClient = useQueryClient()
    const [input, setInput] = useState("")
    const {mutate: createSection} = useCreateSection()
    const {mutate: createTopic} = useCreateTopic(section.id)

    return <>
        {section.name.endsWith("курс") ?
            <form onSubmit={event => {
                if (input === "") return
                createSection({
                    name: input,
                    parent_id: section.id
                }, {
                    onSuccess: async () => {
                        await queryClient.invalidateQueries({queryKey: sectionKeys.sections.root});
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
            </form> :
            allowedNames.includes(section.name) ?
                <form onSubmit={event => {
                    if (input === "") return
                    createTopic({
                        name: input,
                        parentId: section.id
                    }, {
                        onSuccess: async () => {
                            await queryClient.invalidateQueries({queryKey: sectionKeys.sections.root});
                            setInput("")
                        }
                    })
                    event.preventDefault()
                }}>
                    <label className="text-xl text-black">
                        Новая тема:
                        <input type="text" value={input} onChange={event => setInput(event.target.value)}
                               className="ml-2 border border-blue-600"/>
                    </label>
                </form> : null
        }
    </>;
}

const Section = ({section}: SectionProps) => {
    return <div className="p-8">
        {section.parent &&
            <Link to={`/sections/${section.parent.id}`} className="text-xl text-blue-500 hover:text-blue-700">
                <FontAwesomeIcon icon={solid("chevron-left")} className="mr-2"/>{section.parent.name}
            </Link>}
        <div className="flex items-center space-x-5">
            <p className="text-3xl text-black">
                {section.name}
            </p>
            <CreateForm section={section}/>
        </div>
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