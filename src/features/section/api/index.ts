import {CreateSectionRequestDto, RequestParams} from "../../../api/Api";
import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import {mapSection, mapSectionWithSubsections, Section, SectionWithSubsections} from "../model";
import api, {GenericErrorModel} from "../../../api";
import {PageRequest} from "../../../model/page";

export const sectionKeys = {
    sections: {
        root: ['sections'],
        byId: (id: number) => [...sectionKeys.sections.root, id],
        byQuery: (query: UseSectionQuery) => [...sectionKeys.sections.root, query]
    },

    mutations: {
        createSection: () => [...sectionKeys.sections.root, 'create'],
        deleteSection: () => [...sectionKeys.sections.root, 'delete'],
    }
}

type UseSectionQuery = {
    id: number;
} & PageRequest

export const useSection = (query: UseSectionQuery, params?: RequestParams) =>
    useQuery<SectionWithSubsections, GenericErrorModel, SectionWithSubsections, unknown[]>({
        queryKey: sectionKeys.sections.byQuery(query),
        queryFn: async ({signal}) => {
            const response = await api.sections.getSection(query.id,
                query,
                {
                    signal,
                    ...params
                })

            return mapSectionWithSubsections(response.data)
        }
    })

export const useRootSection = (page: PageRequest, params?: RequestParams) =>
    useQuery<SectionWithSubsections, GenericErrorModel, SectionWithSubsections, unknown[]>({
        queryKey: sectionKeys.sections.byQuery({
            ...page,
            id: -1
        }),
        queryFn: async ({signal}) => {
            const response = await api.sections.getRootSection(page,
                {
                    signal,
                    ...params
                })

            return mapSectionWithSubsections(response.data)
        }
    })

export type UseCreateSectionMutation = UseMutationOptions<Section, GenericErrorModel, CreateSectionRequestDto, unknown[]>

type UseCreateSectionOptions = Omit<UseCreateSectionMutation, 'mutationFn' | 'mutationKey'>

export const useCreateSection = (options?: UseCreateSectionOptions) =>
    useMutation<Section, GenericErrorModel, CreateSectionRequestDto, unknown[]>({
        mutationKey: sectionKeys.mutations.createSection(),
        mutationFn: async (dto) => {
            const response = await api.sections.createSection(dto)

            return mapSection(response.data)
        },
        ...options
    })


export type UseDeleteSectionMutation = UseMutationOptions<void, GenericErrorModel, number, unknown[]>

type UseDeleteSectionOptions = Omit<UseDeleteSectionMutation, 'mutationFn' | 'mutationKey'>

export const useDeleteSection = (options?: UseDeleteSectionOptions) =>
    useMutation<void, GenericErrorModel, number, unknown[]>({
        mutationKey: sectionKeys.mutations.createSection(),
        mutationFn: async (id) => {
            await api.sections.deleteSection(id);
        },
        ...options
    })