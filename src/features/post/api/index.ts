import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import {CreatePostRequestDto, PostAuditResponseDto, RequestParams, UpdatePostRequestDto} from "../../../api/Api";
import {mapPost, mapPostHistory, Post, PostHistory} from "../model";
import api, {GenericErrorModel} from "../../../api";
import {topicKeys} from "../../topic/api";

export const postKeys = {
    posts: {
        root: ['posts'],
        byId: (id: number) => [...postKeys.posts.root, id],
        history: (id: number) => [...postKeys.posts.byId(id), "history"],
    },
    mutations: {
        createPost: (sectionId: number) => [...postKeys.posts.byId(sectionId), 'createPost'],
        deletePost: () => [...postKeys.posts.root, 'delete'],
        updatePost: () => [...postKeys.posts.root, 'update']
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

export type UseUpdatePostMutation = UseMutationOptions<Post, GenericErrorModel, UpdatePostRequestDto, unknown[]>

type UseUpdatePostOptions = Omit<UseUpdatePostMutation, 'mutationFn' | 'mutationKey'>

export const useUpdatePost = (options?: UseUpdatePostOptions) =>
    useMutation<Post, GenericErrorModel, UpdatePostRequestDto, unknown[]>({
        mutationKey: postKeys.mutations.updatePost(),
        mutationFn: async (dto) => {
            const response = await api.post.update(dto);

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
        mutationKey: postKeys.mutations.deletePost(),
        mutationFn: async (id) => {
            await api.post.delete1({id})
        },
        ...options
    })


export const usePostHistory = (id: number, params?: RequestParams) =>
    useQuery<PostHistory[], GenericErrorModel, PostHistory[], unknown[]>({
        queryKey: postKeys.posts.history(id),
        queryFn: async ({signal}) => {
            const response = await api.audit.getRevisions({id}, {
                signal,
                ...params
            })
            return response.data.map(mapPostHistory)
        },
    })
