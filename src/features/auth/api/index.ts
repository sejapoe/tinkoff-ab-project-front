import api, {GenericErrorModel} from "../../../api";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {JwtRequestDto, SignUpRequestDto} from "../../../api/Api";
import {addUser} from "../model";

export const authKeys = {
    auth: {
        root: ['auth'],
    },
    mutations: {
        login: () => [...authKeys.auth.root, 'login'],
        signUp: () => [...authKeys.auth.root, 'signUp']
    }
}

export type UseSignUpMutation = UseMutationOptions<void, GenericErrorModel, SignUpRequestDto, unknown[]>

type UseSignUpOptions = Omit<UseSignUpMutation, 'mutationFn' | 'mutationKey'>

export const useSignUp = (options?: UseSignUpOptions) =>
    useMutation<void, GenericErrorModel, SignUpRequestDto, unknown[]>({
        mutationKey: authKeys.mutations.signUp(),
        mutationFn: async (dto) => {
            const response = await api.auth.signUp(dto)

            addUser({
                id: response.data.account_id!,
                token: response.data.token!
            })
        },
        ...options
    })


export type UseLoginMutation = UseMutationOptions<void, GenericErrorModel, JwtRequestDto, unknown[]>

type UseLoginOptions = Omit<UseLoginMutation, 'mutationFn' | 'mutationKey'>

export const useLogin = (options?: UseLoginOptions) =>
    useMutation<void, GenericErrorModel, JwtRequestDto, unknown[]>({
        mutationKey: authKeys.mutations.login(),
        mutationFn: async (dto) => {
            const response = await api.auth.login(dto)

            addUser({
                id: response.data.account_id!,
                token: response.data.token!
            })
        },
        ...options
    })


