import {PageResponseDtoAccountResponseDto} from "../../../api/Api";
import {Account, mapAccount} from "../../profile/model";

export type PageAccounts = {
    number: number;
    size: number;
    totalPages: number;
    totalElements: number;
    content: Account[];
}


export const mapPageAccounts = (dto: PageResponseDtoAccountResponseDto): PageAccounts => ({
    number: dto.number!,
    size: dto.size!,
    totalPages: dto.totalPages!,
    totalElements: dto.totalElements!,
    content: dto.content?.map(mapAccount) || []
})