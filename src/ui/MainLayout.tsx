import {Outlet, useNavigate} from "react-router-dom";
import {deleteToken, useCurrentUser} from "../features/auth/model";
import {useQueryClient} from "@tanstack/react-query";
import {sectionKeys} from "../features/section/api";

export const MainLayout = () => {
    const nav = useNavigate()
    const queryClient = useQueryClient()
    const user = useCurrentUser()

    return (
        <div className="w-screen h-[90vh]">
            <div className="w-full h-8 shadow flex justify-end items-center">
                {
                    user ?
                        <button onClick={async () => {
                            await queryClient.invalidateQueries({queryKey: sectionKeys.sections.root})
                            deleteToken()
                        }}>
                            Выйти
                        </button>
                        : <div className="mx-4 space-x-2">
                            <button onClick={() => nav("/login")}
                                    className="hover:text-cyan-700">
                                Войти
                            </button>
                            <button onClick={() => nav("/signup")}
                                    className="hover:text-cyan-700">
                                Регистрация
                            </button>
                        </div>
                }
            </div>
            <Outlet/>
        </div>
    );
}