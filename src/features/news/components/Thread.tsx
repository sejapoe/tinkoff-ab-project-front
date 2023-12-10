import React from 'react';
import Pageable from "../../../ui/pageable/Pageable";
import {PageRequest} from "../../../model/page";
import {newsKeys, useNewsThreadComments} from "../api";
import {LoadMorePaginationController} from "../../../ui/pageable/LoadMorePaginationController";
import {Link} from "react-router-dom";
import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useCurrentUser} from "../../auth/model";
import {useDeletePost, useUpdatePost} from "../../post/api";
import {useQueryClient} from "@tanstack/react-query";
import {CreateNewsThreadComment} from "./CreateNewsThreadComment";
import {Edited} from "../../post/components/Edited";
import {queryClient} from "../../../lib/react-query";

type ThreadContentProps = {
    id: number;
    page: PageRequest;
};

const ThreadContent = ({id, page}: ThreadContentProps) => {
    const queryClient = useQueryClient()
    const user = useCurrentUser();
    const {data: comments} = useNewsThreadComments(id, page)
    const {mutate: deletePost} = useDeletePost({
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: newsKeys.news.root})
        }
    })
    const {mutate: updatePost} = useUpdatePost({
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: newsKeys.news.root})
        }
    })

    if (!comments) return <>Ты лох!</>;

    return (
        <div className="space-y-4 my-4 ml-8">
            {comments.content.map(value => (
                <div key={`thread-${id}-${value.id}`}
                     className="flex flex-col space-y-2 border border-gray-400 p-2 rounded">
                    <p className="whitespace-pre-line">{value.text}</p>
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
            <LoadMorePaginationController totalPages={comments.totalPages} step={5}/>
            {
                user && <CreateNewsThreadComment threadId={id}/>
            }
        </div>
    );
};

type ThreadProps = {
    id: number;
};

export const Thread = ({id}: ThreadProps) => {
    return (
        <Pageable defaultPageSize={3}>
            {({page}) =>
                <ThreadContent id={id} page={{
                    pageNumber: page.page,
                    forPage: page.size
                }}/>
            }
        </Pageable>
    );
};