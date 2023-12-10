import React from 'react';
import {PageRequest} from "../../../model/page";
import {newsKeys, useNewsComments} from "../api";
import Pageable from "../../../ui/pageable/Pageable";
import {LoadMorePaginationController} from "../../../ui/pageable/LoadMorePaginationController";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {Link} from "react-router-dom";
import clsx from "clsx";
import {useCurrentUser} from "../../auth/model";
import {topicKeys, useDeleteTopic} from "../../topic/api";
import {Thread} from "./Thread";
import {queryClient} from "../../../lib/react-query";
import {CreateNewsComment} from "./CreateNewsComment";
import {Edited} from "../../post/components/Edited";
import {useUpdatePost} from "../../post/api";

type NewsCommentsContentProps = {
    newsId: number;
    page: PageRequest;
};

const NewsCommentsContent = ({newsId, page}: NewsCommentsContentProps) => {
    const user = useCurrentUser()
    const {data: comments} = useNewsComments(newsId, page)
    const {mutate: deleteTopic} = useDeleteTopic({
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: newsKeys.news.root})
        }
    })
    const {mutate: updatePost} = useUpdatePost({
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: newsKeys.news.root})
        }
    })

    if (!comments) return <>Ты лох!</>

    return (
        <div className="space-y-4 my-4">
            {comments.content.map(value => (
                <div key={`thread-${value.threadId}`}
                     className="flex flex-col space-y-2 border border-gray-600 p-2 rounded">
                    <p className="whitespace-pre-line">{value.post.text}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-600 text-gray-600">
                        {
                            <Link to={`/profile/${value.post.authorId}`} className={clsx(
                                !user?.roles.includes("ROLE_MODERATOR") && value.post.isAnonymous ? "pointer-events-none" : "text-blue-700"
                            )}>
                                <FontAwesomeIcon icon={
                                    value.post.isAnonymous ? solid("user-secret") : solid("user")
                                } className="mr-2"/>
                                {value.post.authorName}{value.post.isAuthor ? " (Вы)" : ""}
                            </Link>
                        }
                        <span>
                            <FontAwesomeIcon icon={regular("clock")} className="mr-2"/>
                            {new Date(value.post.createdAt).toLocaleString()}
                            {value.post.modified && value.post.updateAt && <Edited updateAt={value.post.updateAt} id={value.post.id}/>}
                            {
                                value.post.isAuthor &&
                                <FontAwesomeIcon icon={solid("edit")}
                                                 className="ml-2 text-green-700 hover:text-green-800 cursor-pointer"
                                                 onClick={() => {
                                                     const s = prompt("Введите новое сообщение")
                                                     if (s) {
                                                         updatePost({
                                                             id: value.post.id,
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
                                                 onClick={() => deleteTopic(value.threadId)}/>
                            }
                        </span>
                    </div>

                    <Thread id={value.threadId}/>
                </div>
            ))}
            <LoadMorePaginationController totalPages={comments.totalPages} step={5}/>
            {user && <div className="flex flex-col space-y-2">
                <CreateNewsComment newsId={newsId}/>
            </div>}
        </div>
    );
};

type NewsCommentsProps = {
    newsId: number;
};

export const NewsComments = ({newsId}: NewsCommentsProps) => {
    return (
        <div>
            <Pageable defaultPageSize={5}>
                {({page}) =>
                    <NewsCommentsContent newsId={newsId} page={{
                        forPage: page.size,
                        pageNumber: page.page
                    }}/>
                }
            </Pageable>
        </div>
    );
};