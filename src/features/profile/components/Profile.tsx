import React from 'react';
import {useAccount} from "../api";
import {Account, genderL10n} from "../model";
import {Avatar} from "./Avatar";
import {Link, Navigate, useLocation, useParams} from "react-router-dom";
import {useCurrentUser} from "../../auth/model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {getPathWithRedirect} from "../../../utils/routes";
import {UsersTable} from "../../adminProfile/components/UsersTable";
import clsx from "clsx";
import {useQueryClient} from "@tanstack/react-query";
import {useBanAccount} from "../../adminProfile/api";

type ProfileContentProps = {
    account: Account;
}

const ProfileContent = ({account}: ProfileContentProps) => {
    const user = useCurrentUser();
    const queryClient = useQueryClient()
    const {mutate} = useBanAccount({
        onSuccess: async () => {
            await queryClient.invalidateQueries()
        }
    })

    return <div className="text-gray-900">
        <div className="flex flex-row items-start">
            <Avatar className="w-48" document={account.avatar}/>
            <div className="flex flex-col m-2 ml-4 w-full">
                <div className="flex justify-between">
                    <span className={clsx("font-bold text-3xl", !account.isEnabled && "text-red-600")}>
                        {account.displayName}
                    </span>
                    <div className="flex">
                        <span className="text-2xl">
                            Гендер: <b>{genderL10n[account.gender]}</b>
                        </span>
                        <div className="ml-4 text-2xl">
                            {user?.id === account.id
                                ? <Link className="text-blue-700 hover:text-cyan-700 cursor-pointer transition-colors"
                                        to={"/profile/edit"}>
                                    <FontAwesomeIcon icon={solid("user-edit")}/>
                                </Link>
                                : user?.roles?.includes("ROLE_ADMIN") && account.isEnabled &&
                                <FontAwesomeIcon
                                    className="text-red-700 hover:text-rose-400 cursor-pointer transition-colors"
                                    icon={solid("hammer")}
                                    onClick={() => mutate(account.id)}
                                />
                            }
                        </div>
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
        {
            (user && user.roles.includes("ROLE_ADMIN") && user.id === account.id)
            && <div>
                <UsersTable/>
            </div>
        }
    </div>
        ;
}


const ProfileLoader = ({id}: { id: number }) => {
    const {data: account} = useAccount(id);

    return <>{
        !!account && <ProfileContent account={account}/>
    }</>;
}

export const Profile = () => {
    const location = useLocation()
    const user = useCurrentUser()
    const {id} = useParams()

    if (!user && !id) return <Navigate to={getPathWithRedirect(`/login`, location)}/>;

    return <ProfileLoader id={
        parseInt(id || user!.id.toString())
    }/>
};
