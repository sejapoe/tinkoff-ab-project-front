import {
    SectionMultiPageResponseDto,
    SectionResponseDto,
    ShortSectionResponseDto,
    ShortTopicResponseDto
} from "../../../api/Api";
import {mapTopic, mapTopicWithPosts, Topic} from "../../topic/model";

export type Section = {
    id: number;
    name: string;
}

export const mapSection = (dto: ShortSectionResponseDto): Section => ({
    id: dto.id || -1,
    name: dto.name || ""
})

export type SectionMultiPage = {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    subsections: Section[];
    topics: Topic[];
}

export const mapSectionMultiPage = (dto: SectionMultiPageResponseDto): SectionMultiPage => ({
    pageNumber: dto.pageNumber!,
    pageSize: dto.pageSize!,
    totalPages: dto.totalPages!,
    totalElements: dto.totalElements!,
    subsections: dto.subsections!.map(mapSection),
    topics: dto.topics!.map(mapTopic),
})

export type SectionWithSubsections = Section & {
    parent: Section | null
    page: SectionMultiPage
}

export const mapSectionWithSubsections = (dto?: SectionResponseDto): SectionWithSubsections => ({
    id: dto?.id || -1,
    name: dto?.name || "",
    parent: dto?.parent ? mapSection(dto.parent) : null,
    page: mapSectionMultiPage(dto!.page!)
})