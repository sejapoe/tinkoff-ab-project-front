import React from 'react';
import {useParams} from "react-router-dom";
import {useNews} from "../api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import {NewsComments} from "./NewsComments";

export const NewsPage = () => {
    const {newsId: strNewsId} = useParams()

    const newsId = parseInt(strNewsId!)

    const {data: news} = useNews(newsId)

    if (!news) return <>Ты лох!</>

    const files = news.files.filter(value => value.type === "FILE");
    const images = news.files.filter(value => value.type === "IMAGE");

    return (
        <div>
            <div className="text-3xl flex justify-center">{news.title}</div>
            <div className="whitespace-pre-line">
                {news.text}
            </div>
            {images.length > 0 &&
                <div className="flex flex-col space-y-2 border-t border-gray-600 mt-2 pt-2">
                    {images.map(value => (
                        <div key={`document-${value.filename}`}
                             className="flex items-center space-x-2">
                            <img src={`http://localhost:8080/images/${value.filename}`} alt={value.originalName}/>
                        </div>
                    ))}
                </div>}
            {files.length > 0 &&
                <div className="flex flex-col space-y-2 border-t border-gray-600 mt-2 pt-2">
                    {files.map(value => (
                        <div key={`document-${value.filename}`}
                             className="flex items-center space-x-2">
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
            <div className="border-t border-gray-600 mt-2">
                <NewsComments newsId={newsId}/>
            </div>
        </div>
    );
};