import {Document, mapDocument} from '../../post/model'
import {AccountResponseDto} from "../../../api/Api";

export type Gender = "NOT_SPECIFIED" | "MALE" | "FEMALE" | "APACHE_HELICOPTER";

export type Account = {
    id: number;
    name: string
    displayName: string;
    description: string;
    gender: Gender;
    avatar?: Document;
}

export const mapAccount = (data: AccountResponseDto): Account => ({
    id: data.id || -1,
    name: data.name || "",
    displayName: data.displayName || "",
    gender: data.gender || "NOT_SPECIFIED",
    description: data.description || "",
    avatar: data.avatar && mapDocument(data.avatar)
})
