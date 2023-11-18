import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {CreatePostRequestDto} from "../../../api/Api";
import {mapPost, Post} from "../model";
import api, {GenericErrorModel} from "../../../api";

export const postKeys = {
    posts: {
        root: ['posts'],
        byId: (id: number) => [...postKeys.posts.root, id]
    },
    mutations: {
        createPost: (sectionId: number) => [...postKeys.posts.byId(sectionId), 'createPost']
    }
};

export type UseCreatePostMutation = UseMutationOptions<Post, GenericErrorModel, CreatePostRequestDto, unknown[]>

type UseCreatePostOptions = Omit<UseCreatePostMutation, 'mutationFn' | 'mutationKey'>

export const useCreatePost = (sectionId: number, options?: UseCreatePostOptions) =>
    useMutation<Post, GenericErrorModel, CreatePostRequestDto, unknown[]>({
        mutationKey: postKeys.mutations.createPost(sectionId),
        mutationFn: async (dto) => {
            const response = await api.post.createWithAttachments(dto);

            return mapPost(response.data)
        },
        ...options
    })