import {DocumentResponseDto, PageResponseDtoPostResponseDto, PostResponseDto} from "../../../api/Api";

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
    isAuthor: boolean;
    isAnonymous: boolean;
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