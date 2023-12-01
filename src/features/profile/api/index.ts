import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import {CreateSectionRequestDto, RequestParams, UpdateAccountRequestDto} from "../../../api/Api";
import {Account, mapAccount} from "../model";
import api, {GenericErrorModel} from "../../../api";
import {mapSection, Section} from "../../section/model";
import {sectionKeys} from "../../section/api";

export const accountKeys = {
    account: {
        root: ["account"],
        byId: (id: number) => [...accountKeys.account.root, id]
    },

    mutations: {
        update: () => [...accountKeys.account.root, "update"]
    }
}

export const useAccount = (id: number, params?: RequestParams) =>
    useQuery<Account, GenericErrorModel, Account, unknown[]>({
        queryKey: accountKeys.account.byId(id),
        queryFn: async ({signal}) => {
            const response = await api.account.get2(id, {
                signal,
                ...params
            })

            return mapAccount(response.data)
        }
    })


export type UseUpdateAccountMutation = UseMutationOptions<Account, GenericErrorModel, UpdateAccountRequestDto, unknown[]>

type UseUpdateAccountOptions = Omit<UseUpdateAccountMutation, 'mutationFn' | 'mutationKey'>

export const useUpdateAccount = (options?: UseUpdateAccountOptions) =>
    useMutation<Account, GenericErrorModel, UpdateAccountRequestDto, unknown[]>({
        mutationKey: accountKeys.mutations.update(),
        mutationFn: async (dto) => {
            const response = await api.account.updateAccount(dto)

            return mapAccount(response.data)
        },
        ...options
    })