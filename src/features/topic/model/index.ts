import {TopicResponseDto} from "../../../api/Api";
import {mapPost, Post} from "../../post/model";

export type Topic = {
    id: number
    parentId: number;
    name: string;
    posts: Post[];
}

export const mapTopic = (dto: TopicResponseDto): Topic => ({
    id: dto.id || -1,
    parentId: dto?.parent_id || -1,
    name: dto?.name || "",
    posts: dto?.posts?.map(mapPost) || []
})
