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
                        <div className="mx-4 space-x-2">
                            <span>{user.username}</span>
                            <button onClick={async () => {
                                await queryClient.invalidateQueries({queryKey: sectionKeys.sections.root})
                                deleteToken()
                            }} className="hover:text-cyan-700 text-blue-700">
                                Выйти
                            </button>
                        </div>

                        : <div className="mx-4 space-x-2">
                            <button onClick={() => nav("/login")}
                                    className="hover:text-cyan-700 text-blue-700">
                                Войти
                            </button>
                            <button onClick={() => nav("/signup")}
                                    className="hover:text-cyan-700 text-blue-700">
                                Регистрация
                            </button>
                        </div>
                }
            </div>
            <div className="mt-2">
                <Outlet/>
            </div>
        </div>
    );
}