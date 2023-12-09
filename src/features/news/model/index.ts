import {Document, mapDocument, mapPost, Post} from '../../post/model'
import {
    NewsCommentResponseDto,
    NewsResponseDto,
    PageResponseDtoNewsCommentResponseDto,
    PageResponseDtoPostResponseDto, PageResponseDtoShortNewsResponseDto,
    ShortNewsResponseDto
} from "../../../api/Api";

export type News = {
    id: number;
    postId: number;
    title: string;
    text: string;
    files: Document[];
}

export const mapNews = (dto: NewsResponseDto): News => ({
    id: dto?.id!,
    postId: dto?.post_id!,
    title: dto?.title || "",
    text: dto?.text || "",
    files: dto?.files?.map(mapDocument) || [],
})

export type ShortNews = {
    id: number;
    title: string;
}

export const mapShortNews = (dto: ShortNewsResponseDto): ShortNews => ({
    id: dto?.id!,
    title: dto?.title!
})

export type PageShortNews = {
    number: number;
    size: number;
    totalPages: number;
    totalElements: number;
    content: ShortNews[];
}

export const mapPageShortNews = (dto: PageResponseDtoShortNewsResponseDto): PageShortNews => ({
    number: dto.number!,
    size: dto.size!,
    totalPages: dto.totalPages!,
    totalElements: dto.totalElements!,
    content: dto.content?.map(mapShortNews) || []
})

export type NewsComment = {
    threadId: number;
    post: Post;
}

export const mapNewsComment = (dto: NewsCommentResponseDto): NewsComment => ({
    threadId: dto?.threadId!,
    post: mapPost(dto.post!)
})

export type PageNewsComments = {
    number: number;
    size: number;
    totalPages: number;
    totalElements: number;
    content: NewsComment[];
}

export const mapPageNewsComments = (dto: PageResponseDtoNewsCommentResponseDto): PageNewsComments => ({
    number: dto.number!,
    size: dto.size!,
    totalPages: dto.totalPages!,
    totalElements: dto.totalElements!,
    content: dto.content?.map(mapNewsComment) || []
})