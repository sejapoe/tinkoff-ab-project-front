import {DocumentResponseDto, PostResponseDto} from "../../../api/Api";

export type Document = {
    filename: string;
    originalName: string;
}

export const mapDocument = (dto: DocumentResponseDto): Document => ({
    filename: dto?.filename || "",
    originalName: dto?.original_name || "",
})

export type Post = {
    id: number
    text: string;
    parentId: number;
    createdAt: string;
    documents: Document[]
}

export const mapPost = (dto: PostResponseDto): Post => ({
    id: dto?.id || -1,
    text: dto?.text || "",
    parentId: dto?.parent_id || -1,
    createdAt: dto?.created_at || "",
    documents: dto?.documents?.map(mapDocument) || [],
})