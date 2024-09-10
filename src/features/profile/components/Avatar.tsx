import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import React from "react";
import {Document} from "../../post/model";

type AvatarProps = {
    document?: Document;
    className?: string;
}
export const Avatar = ({document, className}: AvatarProps) => (
    <div className={clsx(
        "aspect-square p-4 flex justify-center items-center",
        className
    )}>
        {document
            ? <img className="w-full aspect-square rounded-full ring-2 ring-gray-800"
                   src={`https://sejapoe.ru/nmc/images/${document.filename}`}
                   alt={"avatar"}/>
            : <div className={clsx(
                "w-full bg-gray-400 rounded-full aspect-square flex justify-center items-center",
                "text-white text-7xl ring-2 ring-gray-800"
            )}>
                <FontAwesomeIcon icon={solid("question")}/>
            </div>
        }
    </div>
)
