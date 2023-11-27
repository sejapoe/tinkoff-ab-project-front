import {createStore, StateCreator, useStore} from "zustand";
import {devtools, persist} from "zustand/middleware";
import api from "../../../api";

type User = {
    id: number;
    token: string;
};

type SessionState = {
    user: User | null;
    addUser: (user: User) => void;
    deleteUser: () => void;
}

const createSessionSlice: StateCreator<
    SessionState,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    SessionState
> = (set) => ({
    user: null,
    addUser: (user) => {
        set({user}, false, 'session/addUser')
        api.setSecurityData(user.token)
    },
    deleteUser: () => {
        set({user: null}, false, 'session/deleteUser')
        api.setSecurityData(null)
    }
})

export const sessionStore = createStore<SessionState>()(
    persist(
        devtools(
            (...a) => ({...createSessionSlice(...a)}),
            {name: 'Session Store'},
        ),
        {
            name: 'session',
            onRehydrateStorage: () => (state) => {
                if (state?.user) {
                    const {user} = state;
                    api.setSecurityData(user ? user.token : null)
                }
            }
        }
    )
)

export const useAuth = () => useStore(sessionStore, (state) => !!state.user?.token);

export const useCurrentUser = () => useStore(sessionStore, (state) => state.user);

export const addUser = (user: User) => sessionStore.getState().addUser(user);

export const deleteToken = () => sessionStore.getState().deleteUser();