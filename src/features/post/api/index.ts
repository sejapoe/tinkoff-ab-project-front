import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {CreatePostRequestDto} from "../../../api/Api";
import {mapPost, Post} from "../model";
import api, {GenericErrorModel} from "../../../api";
import {topicKeys} from "../../topic/api";

export const postKeys = {
    posts: {
        root: ['posts'],
        byId: (id: number) => [...postKeys.posts.root, id]
    },
    mutations: {
        createPost: (sectionId: number) => [...postKeys.posts.byId(sectionId), 'createPost'],
        deletePost: () => [...postKeys.posts.root, 'delete']
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

// ---------------------------------------------------------
// -------------          admin         --------------------
// ---------------------------------------------------------

export type UseDeletePostMutation = UseMutationOptions<void, GenericErrorModel, number, unknown[]>

type UseDeletePostOptions = Omit<UseDeletePostMutation, 'mutationFn' | 'mutationKey'>

export const useDeletePost = (options?: UseDeletePostOptions) =>
    useMutation<void, GenericErrorModel, number, unknown[]>({
        mutationKey: topicKeys.mutations.deleteTopic(),
        mutationFn: async (id) => {
            await api.post.delete1({id})
        },
        ...options
    })
