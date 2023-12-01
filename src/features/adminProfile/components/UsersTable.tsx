import React from 'react';
import {useAccounts, useBanAccount, usersKeys} from "../api";
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
    const {mutate} = useBanAccount({
        onSuccess: async () => {
            await queryClient.invalidateQueries()
        }
    })


    return (
        <div>
            {!account.isEnabled
                ? "Уже забанен"
                : account.id === user?.id
                    ? "Это вы"
                    : <FontAwesomeIcon icon={solid("hammer")}
                                       className="cursor-pointer text-red-500 hover:text-pink-600"
                                       title="Бан хаммер"
                                       onClick={() => {
                                           mutate(account.id)
                                       }}/>}
        </div>
    );
};

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