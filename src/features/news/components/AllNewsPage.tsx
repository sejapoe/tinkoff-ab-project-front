import React from 'react';
import {useCurrentUser} from "../../auth/model";
import {CreateNewsForm} from "./CreateNewsForm";
import {useAllNews} from "../api";
import {PageRequest} from "../../../model/page";
import Pageable from "../../../ui/pageable/Pageable";
import {UniversalPaginationController} from "../../../ui/pageable/UniversalPaginationController";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

type AllNewsPageContentProps = {
    page: PageRequest
};

const AllNewsPageContent = ({page}: AllNewsPageContentProps) => {
    const {data: news} = useAllNews(page)

    if (!news) return <>"Ты лох"</>;

    return (
        <div className="w-full">
            <div className="flex flex-col space-y-2">
                {news.content.map(value => (
                    <Link to={`/news/${value.id}`} className="text-xl ml-4 text-blue-500 hover:text-blue-700 w-fit">
                        <FontAwesomeIcon icon={solid("newspaper")}/> {value.title}
                    </Link>
                ))}
            </div>

            <div className="flex justify-center">
                <UniversalPaginationController totalPages={news.totalPages}/>
            </div>
        </div>
    );
};

export const AllNewsPage = () => {
    const user = useCurrentUser();

    return (
        <div className="w-full">
            <div className="text-3xl flex justify-center">Новости</div>
            {user?.roles.includes("ROLE_MODERATOR") && <CreateNewsForm/>}
            <Pageable defaultPageSize={10}>
                {({page}) =>
                    <AllNewsPageContent page={{
                        pageNumber: page.page,
                        forPage: page.size
                    }}/>
                }
            </Pageable>
        </div>
    );
};