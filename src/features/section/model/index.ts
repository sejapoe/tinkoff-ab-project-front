import {SectionResponseDto, ShortSectionResponseDto} from "../../../api/Api";
import {mapTopic, Topic} from "../../topic/model";

export type Section = {
    id: number;
    name: string;
}

export type SectionWithSubsections = Section & {
    subsections: Section[]
    topics: Topic[]
    parent: Section | null
}

export const mapSectionWithSubsections = (dto?: SectionResponseDto): SectionWithSubsections => ({
    id: dto?.id || -1,
    name: dto?.name || "",
    subsections: dto?.subsections?.map(mapSection) || [],
    topics: dto?.topics?.map(mapTopic) || [],
    parent: dto?.parent ? mapSection(dto.parent) : null
})

export const mapSection = (dto: ShortSectionResponseDto): Section => ({
    id: dto.id || -1,
    name: dto.name || ""
})