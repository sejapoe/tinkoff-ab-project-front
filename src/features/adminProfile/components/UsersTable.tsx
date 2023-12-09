import React from 'react';
import {useAccounts, useBanAccount, useDemote, usePromote, usersKeys} from "../api";
import Pageable from "../../../ui/pageable/Pageable";
import {PageAccounts} from "../model";
import {Account, genderL10n} from "../../profile/model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useQueryClient} from "@tanstack/react-query";
import clsx from "clsx";
import {useCurrentUser} from "../../auth/model";
import {Link} from "react-router-dom";
import {UniversalPaginationController} from "../../../ui/pageable/UniversalPaginationController";

type ActionsProps = {
    account: Account
};

const Actions = ({account}: ActionsProps) => {
    const user = useCurrentUser();
    const queryClient = useQueryClient()

    const options = {
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: usersKeys.users.root})
        }
    };

    const {mutate: ban} = useBanAccount(options)
    const {mutate: promote} = usePromote(options)
    const {mutate: demote} = useDemote(options)


    return (
        <div className="space-x-4">
            {!account.isEnabled
                ? "banned"
                : account.id === user?.id
                    ? "Это вы"
                    : <>
                        {account.roles.includes("ROLE_MODERATOR") ? <FontAwesomeIcon icon={solid("down-long")}
                                         className="cursor-pointer text-blue-700 hover:text-cyan-600"
                                         title="Снять с модерки"
                                         onClick={() => {
                                             demote(account.id)
                                         }}/>
                        : <FontAwesomeIcon icon={solid("up-long")}
                                         className="cursor-pointer text-green-500 hover:text-lime-600"
                                         title="Повысить до модератора"
                                         onClick={() => {
                                             promote(account.id)
                                         }}/>}
                        <FontAwesomeIcon icon={solid("hammer")}
                                         className="cursor-pointer text-red-500 hover:text-pink-600"
                                         title="Бан хаммер"
                                         onClick={() => {
                                             ban(account.id)
                                         }}/>
                    </>
            }
        </div>
    );
};

const roleL10n: Record<string, string> = {
    "ROLE_USER": "Юзверь",
    "ROLE_MODERATOR": "Модер",
    "ROLE_ADMIN": "Админ"
}

type UsersTableContentProps = {
    accounts: PageAccounts;
}

const UsersTableContent = ({accounts}: UsersTableContentProps) => {
    console.log(accounts)

    return <div className="w-full">
        <table className="w-full table-auto">
            <thead>
            <tr>
                <th>#</th>
                <th>Логин</th>
                <th>Роль</th>
                <th>Гендер</th>
                <th>Отображаемое имя</th>
                <th>Действия</th>
            </tr>
            </thead>
            <tbody className={"text-center"}>
            {accounts.content.map(value => (<tr key={value.id} className={clsx(
                !value.isEnabled && "text-red-600"
            )}>
                <td>{value.id}</td>
                <td><Link to={`/profile/${value.id}`}
                          className="text-blue-700 hover:text-cyan-700 cursor-pointer">{value.name}</Link></td>
                <td>{roleL10n[value.roles.sort()[0]]}</td>
                <td>{genderL10n[value.gender]}</td>
                <td>{value.displayName}</td>
                <td><Actions account={value}/></td>
            </tr>))}
            </tbody>
        </table>
        <div className="w-full flex justify-center">
            <UniversalPaginationController totalPages={accounts.totalPages}/>
        </div>
    </div>
}

type UsersLoaderProps = {
    pageNumber: number;
    forPage: number;
};

const UsersLoader = (props: UsersLoaderProps) => {
    const {data: accounts} = useAccounts(props);

    return (accounts ? <UsersTableContent accounts={accounts}/> : <>{"Ты лох"}</>)
};

export const UsersTable = () => {
    return (
        <Pageable defaultPageSize={15}>
            {({page}) => (
                <UsersLoader pageNumber={page.page} forPage={page.size}/>
            )}
        </Pageable>

    );
};