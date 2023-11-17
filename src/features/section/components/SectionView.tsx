import {SectionWithSubsections} from "../model";
import {Link, useParams} from "react-router-dom";
import {sectionKeys, useCreateSection, useRootSection, useSection} from "../api";
import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";

type SectionProps = {
    section: SectionWithSubsections
}

const Section = ({section}: SectionProps) => {
    const queryClient = useQueryClient()
    const [input, setInput] = useState("")
    const {mutate} = useCreateSection()

    return <div className="p-8">
        {section.parent && <Link to={`/sections/${section.parent.id}`}>
            <p className="text-xl text-blue-500 hover:text-blue-700">{section.parent.name}</p>
        </Link>}
        <div className="flex items-center space-x-5">
            <p className="text-3xl text-black">
                {section.name}
            </p>
            {section.name.endsWith("курс") &&
                <form onSubmit={event => {
                    if (input === "") return
                    mutate({
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
                    <input type="text" value={input} onChange={event => setInput(event.target.value)}
                           className="border border-blue-600"/>

                </form>
            }
        </div>
        <ul>
            {section.subsections.map(value => (
                <li key={value.id} className="text-xl ml-4 text-blue-500 hover:text-blue-700 w-fit">
                    <Link to={`/sections/${value.id}`}>{value.name}</Link>
                </li>
            ))}
        </ul>

    </div>
}

export const RootSectionView = () => {
    const {data} = useRootSection()

    return data ? <Section section={data}/> : null
}

export const SectionView = () => {
    const {id} = useParams()

    const {data} = useSection(parseInt(id || "-1"));

    return data ? <Section section={data}/> : null
}