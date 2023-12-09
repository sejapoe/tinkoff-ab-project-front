import {Document, mapDocument} from '../../post/model'
import {AccountResponseDto} from "../../../api/Api";

export const genderL10n: {
    [P in Gender]: string
} = {
    "NOT_SPECIFIED": "Не указан",
    "MALE": "Мужской",
    "FEMALE": "Женский",
    "APACHE_HELICOPTER": "Боевой вертолет",
}

export type Gender = "NOT_SPECIFIED" | "MALE" | "FEMALE" | "APACHE_HELICOPTER";

export type Account = {
    id: number;
    name: string
    displayName: string;
    description: string;
    gender: Gender;
    avatar?: Document;
    isEnabled: boolean;
    roles: string[];
}

export const mapAccount = (data: AccountResponseDto): Account => ({
    id: data.id || -1,
    name: data.name || "",
    displayName: data.displayName || "",
    gender: data.gender || "NOT_SPECIFIED",
    description: data.description || "",
    avatar: data.avatar && mapDocument(data.avatar),
    isEnabled: !!data.enabled,
    roles: data.roles!
})
