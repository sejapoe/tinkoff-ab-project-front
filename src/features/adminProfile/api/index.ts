import {RequestParams} from "../../../api/Api";
import {PageRequest} from "../../../model/page";
import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../api";
import {mapPageAccounts, PageAccounts} from "../model";
import {accountKeys} from "../../profile/api";

export const usersKeys = {
    users: {
        root: ["accounts"],
        byPage: (page: PageRequest) => [...usersKeys.users.root, page]
    },

    mutations: {
        ban: () => [usersKeys.users.root, "ban"]
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
        mutationKey: accountKeys.mutations.update(),
        mutationFn: async (id) => {
            const response = await api.account.delete2({id})

            return response.data
        },
        ...options
    })