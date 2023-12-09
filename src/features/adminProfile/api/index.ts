import {RequestParams} from "../../../api/Api";
import {PageRequest} from "../../../model/page";
import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../api";
import {mapPageAccounts, PageAccounts} from "../model";
import {accountKeys} from "../../profile/api";
import {Account, mapAccount} from "../../profile/model";

export const usersKeys = {
    users: {
        root: ["accounts"],
        byPage: (page: PageRequest) => [...usersKeys.users.root, page]
    },

    mutations: {
        ban: () => [...usersKeys.users.root, "ban"],
        promote: () => [...usersKeys.users.root, "promote"],
        demote: () => [...usersKeys.users.root, "demote"],
    }
}

export const useAccounts = (page: PageRequest, params?: RequestParams) =>
    useQuery<PageAccounts, GenericErrorModel, PageAccounts, unknown[]>({
        queryKey: usersKeys.users.byPage(page),
        queryFn: async ({signal}) => {
            const response = await api.account.getAll(page, {
                signal,
                ...params
            })

            return mapPageAccounts(response.data)
        }
    })

export type UseBanAccountMutation = UseMutationOptions<number, GenericErrorModel, number, unknown[]>

type UseBanAccountOptions = Omit<UseBanAccountMutation, 'mutationFn' | 'mutationKey'>

export const useBanAccount = (options?: UseBanAccountOptions) =>
    useMutation<number, GenericErrorModel, number, unknown[]>({
        mutationKey: usersKeys.mutations.ban(),
        mutationFn: async (id) => {
            const response = await api.account.delete2({id})

            return response.data
        },
        ...options
    })

export type UsePromoteMutation = UseMutationOptions<Account, GenericErrorModel, number, unknown[]>

type UsePromoteOptions = Omit<UsePromoteMutation, 'mutationFn' | 'mutationKey'>

export const usePromote = (options?: UsePromoteOptions) =>
    useMutation<Account, GenericErrorModel, number, unknown[]>({
        mutationKey: usersKeys.mutations.promote(),
        mutationFn: async (id) => {
            const response = await api.account.promote(id)

            return mapAccount(response.data)
        },
        ...options
    })

export type UseDemoteMutation = UseMutationOptions<Account, GenericErrorModel, number, unknown[]>

type UseDemoteOptions = Omit<UseDemoteMutation, 'mutationFn' | 'mutationKey'>

export const useDemote = (options?: UseDemoteOptions) =>
    useMutation<Account, GenericErrorModel, number, unknown[]>({
        mutationKey: usersKeys.mutations.demote(),
        mutationFn: async (id) => {
            const response = await api.account.demote(id)

            return mapAccount(response.data)
        },
        ...options
    })