import React, {useRef, useState} from 'react';
import {Disclosure} from "@headlessui/react";
import {useQueryClient} from "@tanstack/react-query";
import {newsKeys, useCreateThreadComment} from "../api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

type CreateNewsThreadCommentProps = {
    threadId: number;
};

export const CreateNewsThreadComment = ({threadId}: CreateNewsThreadCommentProps) => {
    const queryClient = useQueryClient()
    const [text, setText] = useState("")
    const [isAnonymous, setAnonymous] = useState(false)

    const formRef = useRef<HTMLFormElement>(null)
    const {mutate} = useCreateThreadComment(threadId)

    return (
        <div>
            <Disclosure>
                <Disclosure.Button className="mb-2 text-green-700">
                    Оставить комментарий...
                </Disclosure.Button>
                <Disclosure.Panel>
                    <form
                        ref={formRef}
                        onSubmit={e => {
                            e.preventDefault()
                            if (text === "") return alert("Заполните все обязательные поля")

                            mutate({
                                threadId,
                                text,
                                isAnonymous,
                            }, {
                                onSuccess: async () => {
                                    setText("")
                                    formRef.current?.reset()
                                    await queryClient.invalidateQueries({queryKey: newsKeys.news.root})
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
                      placeholder={"Напишите комментарий..."}
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
                </Disclosure.Panel>
            </Disclosure>
        </div>
    );
};