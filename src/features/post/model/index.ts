import {
    DocumentResponseDto,
    PageResponseDtoPostResponseDto,
    PostAuditResponseDto,
    PostResponseDto
} from "../../../api/Api";

export type Document = {
    filename: string;
    originalName: string;
    type: "FILE" | "IMAGE";
}

export const mapDocument = (dto: DocumentResponseDto): Document => ({
    filename: dto?.filename || "",
    originalName: dto?.original_name || "",
    type: dto.type!
})

export type Post = {
    id: number
    text: string;
    parentId: number;
    createdAt: string;
    isAuthor: boolean;
    isAnonymous: boolean;
    modified: boolean;
    updateAt?: string;
    authorId: number
    authorName: string;
    documents: Document[]
}

export const mapPost = (dto: PostResponseDto): Post => ({
    id: dto?.id || -1,
    text: dto?.text || "",
    parentId: dto?.parent_id || -1,
    createdAt: dto?.created_at || "",
    isAuthor: dto?.is_author || false,
    isAnonymous: dto?.is_anonymous || false,
    modified: dto?.modified || false,
    updateAt: dto?.updated_at,
    authorId: dto?.author_id || -1,
    authorName: dto?.author_name || "",
    documents: dto?.documents?.map(mapDocument) || [],
})

export type PagePosts = {
    number: number;
    size: number;
    totalPages: number;
    totalElements: number;
    content: Post[];
}

export const mapPagePosts = (dto: PageResponseDtoPostResponseDto): PagePosts => ({
    number: dto.number!,
    size: dto.size!,
    totalPages: dto.totalPages!,
    totalElements: dto.totalElements!,
    content: dto.content?.map(mapPost) || []
})

export type PostHistory = {
    id: number;
    text: string;
    updatedAt: string;
}

export const mapPostHistory = (dto: PostAuditResponseDto): PostHistory => ({
    id: dto.id!,
    text: dto.text!,
    updatedAt: dto.updated_at!,
})