import {CreateSectionRequestDto, RequestParams} from "../../../api/Api";
import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import {mapSectionWithSubsections, SectionWithSubsections} from "../model";
import api, {GenericErrorModel} from "../../../api";

export const sectionKeys = {
    sections: {
        root: ['sections'],
        byId: (id: number) => [...sectionKeys.sections.root, id]
    },

    mutations: {
        createSection: ['sections', 'create']
    }
}

export const useSection = (id: number, params?: RequestParams) =>
    useQuery<SectionWithSubsections, GenericErrorModel, SectionWithSubsections, unknown[]>({
        queryKey: sectionKeys.sections.byId(id),
        queryFn: async ({signal}) => {
            const response = await api.sections.getSection(id, {
                signal,
                ...params
            })

            return mapSectionWithSubsections(response.data)
        }
    })

export const useRootSection = (params?: RequestParams) =>
    useQuery<SectionWithSubsections, GenericErrorModel, SectionWithSubsections, unknown[]>({
        queryKey: sectionKeys.sections.root,
        queryFn: async ({signal}) => {
            const response = await api.sections.getRootSection({
                signal,
                ...params
            })

            return mapSectionWithSubsections(response.data)
        }
    })

export type UseCreateSectionMutation = UseMutationOptions<SectionWithSubsections, GenericErrorModel, CreateSectionRequestDto, unknown[]>

type UseCreateSectionOptions = Omit<UseCreateSectionMutation, 'mutationFn' | 'mutationKey'>

export const useCreateSection = (options?: UseCreateSectionOptions) =>
    useMutation<SectionWithSubsections, GenericErrorModel, CreateSectionRequestDto, unknown[]>({
        mutationKey: sectionKeys.mutations.createSection,
        mutationFn: async (dto) => {
            const response = await api.sections.createSection(dto)

            return mapSectionWithSubsections(response.data)
        },
        ...options
    })