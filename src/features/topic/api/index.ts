import {CreateTopicRequestDto, RequestParams, TopicResponseDto} from "../../../api/Api";
import api, {GenericErrorModel} from "../../../api";
import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import {mapTopic, Topic} from "../model";

export const topicKeys = {
    topics: {
        root: ['topics'],
        byId: (id: number) => [...topicKeys.topics.root, id]
    },
    mutations: {
        createTopic: (sectionId: number) => [...topicKeys.topics.byId(sectionId), 'createTopic']
    }
}

export const useTopic = (id: number, params?: RequestParams) =>
    useQuery<Topic, GenericErrorModel, Topic, unknown[]>({
        queryKey: topicKeys.topics.byId(id),
        queryFn: async ({signal}) => {
            const response = await api.topic.get({id}, {
                signal,
                ...params
            })

            return mapTopic(response.data)
        }
    })


export type UseCreateTopicMutation = UseMutationOptions<TopicResponseDto, GenericErrorModel, CreateTopicRequestDto, unknown[]>

type UseCreateTopicOptions = Omit<UseCreateTopicMutation, 'mutationFn' | 'mutationKey'>

export const useCreateTopic = (sectionId: number, options?: UseCreateTopicOptions) =>
    useMutation<TopicResponseDto, GenericErrorModel, CreateTopicRequestDto, unknown[]>({
        mutationKey: topicKeys.mutations.createTopic(sectionId),
        mutationFn: async (dto) => {
            const response = await api.topic.create(dto)

            return response.data
        },
        ...options
    })