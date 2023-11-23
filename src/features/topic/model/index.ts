import {
    PageResponseDtoPostResponseDto,
    PostResponseDto,
    ShortTopicResponseDto,
    TopicResponseDto
} from "../../../api/Api";
import {mapPagePosts, mapPost, PagePosts, Post} from "../../post/model";

export type Topic = {
    id: number
    name: string;
}

export const mapTopic = (dto: ShortTopicResponseDto): Topic => ({
    id: dto.id!,
    name: dto.name!,
})

export type TopicWithPosts = Topic & {
    parentId: number;
    posts: PagePosts;
}

export const mapTopicWithPosts = (dto: TopicResponseDto): TopicWithPosts => ({
    id: dto.id!,
    parentId: dto.parent_id!,
    name: dto.name!,
    posts: mapPagePosts(dto.posts!)
})
