import {Outlet, useNavigate} from "react-router-dom";
import {deleteToken, useCurrentUser} from "../features/auth/model";
import {useQueryClient} from "@tanstack/react-query";
import {sectionKeys} from "../features/section/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

export const MainLayout = () => {
    const nav = useNavigate()
    const queryClient = useQueryClient()
    const user = useCurrentUser()

    return (
        <div className="w-screen h-[90vh]">
            <div className="w-full h-8 shadow flex justify-between items-center">
                <div className="mx-4 text-xl text-blue-700 cursor-pointer" onClick={() => nav("/")}>
                    <FontAwesomeIcon icon={solid("home")}/>
                </div>
                <div>
                    {
                        user ?
                            <div className="mx-4 space-x-2">
                                <button onClick={() => nav("/profile")}
                                        className="hover:text-cyan-700 text-blue-700">
                                    {user.username}
                                </button>
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
            </div>
            <div className="w-full mt-4 flex justify-center">
                <div className="w-2/3 shadow p-4 rounded">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}