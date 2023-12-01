import React from 'react';
import {useAccount} from "../api";
import {Account, Gender} from "../model";
import {Avatar} from "./Avatar";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useCurrentUser} from "../../auth/model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const genderL10n: {
    [P in Gender]: string
} = {
    "NOT_SPECIFIED": "Не указан",
    "MALE": "Мужской",
    "FEMALE": "Женский",
    "APACHE_HELICOPTER": "Боевой вертолет",
}

type ProfileContentProps = {
    account: Account;
}

const ProfileContent = ({account}: ProfileContentProps) => {
    const user = useCurrentUser();

    return <div className="text-gray-900">
        <div className="flex flex-row items-start">
            <Avatar className="w-48" document={account.avatar}/>
            <div className="flex flex-col m-2 ml-4 w-full">
                <div className="flex justify-between">
                    <span className="font-bold text-3xl">
                        {account.displayName}
                    </span>
                    <div>
                        <span className="text-2xl">
                            Гендер: <b>{genderL10n[account.gender]}</b>
                        </span>
                        <Link
                            className="ml-4 text-2xl text-blue-700 hover:text-cyan-700 cursor-pointer transition-colors"
                            to={"/profile/edit"}
                        >
                            {user?.id === account.id && <FontAwesomeIcon icon={solid("user-edit")}/>}
                        </Link>
                    </div>

                </div>
                <div className="shadow w-fit py-2 px-4 rounded bg-gray-100">
                    <div className="pb-1 mb-1 border-b-2 border-dotted border-gray-900 w-full text-xl">
                        Обо мне:
                    </div>
                    <div className="whitespace-pre-line">
                        {account.description}<br/>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}


const ProfileLoader = ({id}: { id: number }) => {
    const {data: account} = useAccount(id);

    return <>{
        !!account && <ProfileContent account={account}/>
    }</>;
}

export const Profile = () => {
    const user = useCurrentUser()
    const {id} = useParams()

    if (!user && !id) return <Navigate to="/login"/>;

    return <ProfileLoader id={
        parseInt(id || user!.id.toString())
    }/>
};
