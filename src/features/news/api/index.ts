import {PageRequest} from "../../../model/page";
import {
    CreateCommentInThreadRequestDto,
    CreateNewsCommentRequestDto,
    CreateNewsRequestDto,
    RequestParams
} from "../../../api/Api";
import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import {
    mapNews, mapNewsComment,
    mapPageNewsComments,
    mapPageShortNews,
    News,
    NewsComment,
    PageNewsComments,
    PageShortNews
} from "../model";
import api, {GenericErrorModel} from "../../../api";
import {mapPagePosts, mapPost, PagePosts, Post} from "../../post/model";

export const newsKeys = {
    news: {
        root: ["news"],
        byPage: (page: PageRequest) => [...newsKeys.news.root, page],
        byId: (id: number) => [...newsKeys.news.root, id],

        mutations: {
            create: () => [newsKeys.news.root, "create"]
        }
    },

    comments: {
        root: (newsId: number) => [...newsKeys.news.byId(newsId), "comments"],
        byPage: (newsId: number, page: PageRequest) => [...newsKeys.comments.root(newsId), page],

        mutations: {
            create: (newsId: number) => [newsKeys.comments.root(newsId), "create"]
        }
    },

    thread: {
        root: (threadId: number) => ["news", "threads", threadId],
        byPage: (threadId: number, page: PageRequest) => [...newsKeys.thread.root(threadId), page],

        mutations: {
            create: (threadId: number) => [newsKeys.thread.root(threadId), "create"]
        }
    }
}


export const useAllNews = (page: PageRequest, params?: RequestParams) =>
    useQuery<PageShortNews, GenericErrorModel, PageShortNews, unknown[]>({
        queryKey: newsKeys.news.byPage(page),
        queryFn: async ({signal}) => {
            const response = await api.news.getAllNews(page, {
                signal,
                ...params
            });

            return mapPageShortNews(response.data)
        }
    })

export const useNews = (id: number, params?: RequestParams) =>
    useQuery<News, GenericErrorModel, News, unknown[]>({
        queryKey: newsKeys.news.byId(id),
        queryFn: async ({signal}) => {
            const response = await api.news.getNews(id, {
                signal,
                ...params
            });

            return mapNews(response.data)
        }
    })


export const useNewsComments = (newsId: number, page: PageRequest, params?: RequestParams) =>
    useQuery<PageNewsComments, GenericErrorModel, PageNewsComments, unknown[]>({
        queryKey: newsKeys.comments.byPage(newsId, page),
        queryFn: async ({signal}) => {
            const response = await api.news.getComments(newsId, page, {
                signal,
                ...params
            });

            return mapPageNewsComments(response.data)
        }
    })

export const useNewsThreadComments = (threadId: number, page: PageRequest, params?: RequestParams) =>
    useQuery<PagePosts, GenericErrorModel, PagePosts, unknown[]>({
        queryKey: newsKeys.thread.byPage(threadId, page),
        queryFn: async ({signal}) => {
            const response = await api.news.getThreadComments(threadId, page, {
                signal,
                ...params
            });

            return mapPagePosts(response.data)
        }
    })

export type UseCreateNewsMutation = UseMutationOptions<News, GenericErrorModel, CreateNewsRequestDto>

type UseCreateNewsOptions = Omit<UseCreateNewsMutation, 'mutationFn' | 'mutationKey'>

export const useCreateNews = (options?: UseCreateNewsOptions) =>
    useMutation<News, GenericErrorModel, CreateNewsRequestDto>({
        mutationKey: newsKeys.news.mutations.create(),
        mutationFn: async (dto) => {
            const response = await api.news.createNews(dto)
            return mapNews(response.data)
        },
        ...options
    })

export type UseCreateCommentMutation = UseMutationOptions<NewsComment, GenericErrorModel, CreateNewsCommentRequestDto>

type UseCreateCommentOptions = Omit<UseCreateCommentMutation, 'mutationKey' | 'mutationFn'>

export const useCreateComment = (newsId: number, options?: UseCreateCommentOptions) =>
    useMutation<NewsComment, GenericErrorModel, CreateNewsCommentRequestDto>({
        mutationKey: newsKeys.comments.mutations.create(newsId),
        mutationFn: async (dto) => {
            const response = await api.news.createComment(dto)
            return mapNewsComment(response.data)
        },
        ...options
    })


export type UseCreateThreadCommentMutation = UseMutationOptions<Post, GenericErrorModel, CreateCommentInThreadRequestDto>

type UseCreateThreadCommentOptions = Omit<UseCreateThreadCommentMutation, 'mutationKey' | 'mutationFn'>

export const useCreateThreadComment = (threadId: number, options?: UseCreateThreadCommentOptions) =>
    useMutation<Post, GenericErrorModel, CreateCommentInThreadRequestDto>({
        mutationKey: newsKeys.thread.mutations.create(threadId),
        mutationFn: async (dto) => {
            const response = await api.news.createThreadComment(dto)
            return mapPost(response.data)
        },
        ...options
    })