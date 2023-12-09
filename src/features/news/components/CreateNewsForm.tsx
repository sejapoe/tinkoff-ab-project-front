import React, {useRef, useState} from 'react';
import {useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {MAX_FILE_SIZE, MAX_SUMMARY_FILE_SIZE} from "../../../utils/consants";
import {newsKeys, useCreateNews} from "../api";
import {Disclosure} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

export const CreateNewsForm = () => {
    const queryClient = useQueryClient()
    const [name, setName] = useState("")
    const [files, setFiles] = useState<File[]>([])
    const [text, setText] = useState("")
    const {mutate: createTopic} = useCreateNews()
    const formRef = useRef<HTMLFormElement>(null)
    const nav = useNavigate()

    return <div className="m-4">
        <Disclosure>
            <Disclosure.Button className="px-4 py-2 bg-gray-300 border border-gray-400 rounded mb-2">
                Создание новости <FontAwesomeIcon icon={solid("chevron-down")} className="ml-2"/>
            </Disclosure.Button>
            <Disclosure.Panel>
                <form
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
                            text,
                            files
                        }, {
                            onSuccess: async (data) => {
                                await queryClient.invalidateQueries({queryKey: newsKeys.news.root});
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
                           placeholder={"Название новости"}/>

                    <textarea
                        className="w-full h-32 p-2 border border-gray-600 rounded-md resize-none placeholder-gray-600"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder={"Напишите новость..."}
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
            </Disclosure.Panel>
        </Disclosure></div>
};