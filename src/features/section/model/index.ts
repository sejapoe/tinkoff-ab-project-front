import {SectionResponseDto, ShortSectionResponseDto} from "../../../api/Api";

export type Section = {
    id: number;
    name: string;
}

export type SectionWithSubsections = Section & {
    subsections: Section[]
    parent: Section | null
}

export const mapSectionWithSubsections = (dto?: SectionResponseDto): SectionWithSubsections => ({
    id: dto?.id || -1,
    name: dto?.name || "",
    subsections: dto?.subsections?.map(mapSection) || [],
    parent: dto?.parent ? mapSection(dto.parent) : null
})

export const mapSection = (dto: ShortSectionResponseDto): Section => ({
    id: dto.id || -1,
    name: dto.name || ""
})