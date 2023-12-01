import {CreateTopicRequestDto, RequestParams, TopicResponseDto} from "../../../api/Api";
import api, {GenericErrorModel} from "../../../api";
import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import {mapTopic, mapTopicWithPosts, Topic, TopicWithPosts} from "../model";
import {PageRequest} from "../../../model/page";
import {mapPagePosts} from "../../post/model";

export const topicKeys = {
    topics: {
        root: ['topics'],
        byId: (id: number) => [...topicKeys.topics.root, id],
        byQuery: (query: UseTopicQuery) => [...topicKeys.topics.root, query]
    },
    mutations: {
        createTopic: (sectionId: number) => [...topicKeys.topics.byId(sectionId), 'createTopic'],
        deleteTopic: () => [...topicKeys.topics.root, 'delete']
    }
}

type UseTopicQuery = {
    id: number;
} & PageRequest;

export const useTopic = (query: UseTopicQuery, params?: RequestParams) =>
    useQuery<TopicWithPosts, GenericErrorModel, TopicWithPosts, unknown[]>({
        queryKey: topicKeys.topics.byQuery(query),
        queryFn: async ({signal}) => {
            const response = await api.topic.get(query.id,
                query,
                {
                    signal,
                    ...params
                })

            return mapTopicWithPosts(response.data)
        }
    })


export type UseCreateTopicMutation = UseMutationOptions<Topic, GenericErrorModel, CreateTopicRequestDto, unknown[]>

type UseCreateTopicOptions = Omit<UseCreateTopicMutation, 'mutationFn' | 'mutationKey'>

export const useCreateTopic = (sectionId: number, options?: UseCreateTopicOptions) =>
    useMutation<Topic, GenericErrorModel, CreateTopicRequestDto, unknown[]>({
        mutationKey: topicKeys.mutations.createTopic(sectionId),
        mutationFn: async (dto) => {
            const response = await api.topic.create(dto)

            return mapTopic(response.data)
        },
        ...options
    })


// ---------------------------------------------------------
// -------------          admin         --------------------
// ---------------------------------------------------------


export type UseDeleteTopicMutation = UseMutationOptions<void, GenericErrorModel, number, unknown[]>

type UseDeleteTopicOptions = Omit<UseDeleteTopicMutation, 'mutationFn' | 'mutationKey'>

export const useDeleteTopic = (options?: UseDeleteTopicOptions) =>
    useMutation<void, GenericErrorModel, number, unknown[]>({
        mutationKey: topicKeys.mutations.deleteTopic(),
        mutationFn: async (id) => {
            await api.topic.delete({id})
        },
        ...options
    })
