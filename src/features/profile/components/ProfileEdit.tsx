import {Account, Gender} from "../model";
import {useCurrentUser} from "../../auth/model";
import {Avatar} from "./Avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {accountKeys, useAccount, useUpdateAccount} from "../api";
import {Navigate, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";

const genderL10n: {
    [P in Gender]: string
} = {
    "NOT_SPECIFIED": "Не указан",
    "MALE": "Мужской",
    "FEMALE": "Женский",
    "APACHE_HELICOPTER": "Боевой вертолет",
}


type ProfileEditContentProps = {
    account: Account;
}

const ProfileEditContent = ({account}: ProfileEditContentProps) => {
    const nav = useNavigate()
    const queryClient = useQueryClient()
    const {mutate} = useUpdateAccount()
    const [name, setName] = useState(account.displayName)
    const [description, setDescription] = useState(account.description)
    const [gender, setGender] = useState(account.gender)
    const [avatar, setAvatar] = useState<File | null>(null)

    return <div className="text-gray-900 flex justify-center">
        <div className="space-y-4 w-1/3">
            <label className="flex flex-col">
                <span className="text-xl">Имя:</span>
                <input className="border py-1 px-2"
                       value={name}
                       onChange={event => setName(event.target.value)}/>
            </label>
            <label className="flex flex-col">
                <span className="text-xl">О себе:</span>
                <textarea className="border py-1 px-2"
                          value={description}
                          rows={5}
                          onChange={event => setDescription(event.target.value)}/>
            </label>
            <label className="flex flex-col w-full">
                <span className="text-xl">Гендер:</span>
                <select className="w-full py-1 px-2"
                        value={gender}
                        onChange={event => setGender(event.target.value as Gender)}>
                    {Object.entries(genderL10n).map(value => (
                        <option key={value[0]} value={value[0]}>{value[1]}</option>
                    ))}
                </select>
            </label>
            <label className="flex flex-col w-full">
                <span className="text-xl">Аватарка (.img, .png):</span>
                <input className="w-full py-1 px-2"
                       type="file"
                       accept="image/png,image/jpeg"
                       onChange={event => setAvatar(event.target.files?.item(0) || null)}/>
            </label>

            <button className="w-full bg-blue-700 text-white text-xl py-2 px-4 rounded"
                    onClick={() => {
                        console.log(avatar)
                        mutate({
                            id: account.id,
                            name,
                            gender,
                            description,
                            avatar: avatar || undefined
                        }, {
                            onSuccess: async () => {
                                await queryClient.invalidateQueries({queryKey: accountKeys.account.byId(account.id)});
                                nav("/profile")
                            }
                        })
                    }}
            >
                Сохранить
            </button>
        </div>
    </div>;
}


const ProfileEditLoader = ({id}: { id: number }) => {
    const {data: account} = useAccount(id);

    return <>{
        !!account && <ProfileEditContent account={account}/>
    }</>;
}

export const ProfileEdit = () => {
    const user = useCurrentUser()

    if (!user) return <Navigate to="/login"/>;

    return <ProfileEditLoader id={user.id}/>
};
