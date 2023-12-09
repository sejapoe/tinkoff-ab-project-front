import {Navigate, useNavigate, useSearchParams} from "react-router-dom";
import {useLogin} from "../api";
import {useForm} from "react-hook-form";
import {InputField} from "../../../ui/form/InputField";
import {useCurrentUser} from "../model";

type LoginValues = {
    name: string;
    password: string;
}


export const LoginForm = () => {
    const [queryParams] = useSearchParams()
    const nav = useNavigate()
    const {mutate} = useLogin();
    const {register, handleSubmit, formState} = useForm<LoginValues>()

    const redirectTo = queryParams.get("redirect_uri") || "/"

    return (
        <div className="w-full h-full rounded flex justify-center items-center">
            <form className="p-8 flex flex-col shadow space-y-6" onSubmit={handleSubmit(data => {
                mutate(data, {
                    onSuccess: () => {
                        nav(redirectTo)
                    },
                    onError: err => alert(err.error.detail || "Ошибка")
                })
            })}>
                <InputField label="Имя пользователя" error={formState.errors["name"]}
                            registration={register("name", {required: true})}/>
                <InputField type="password" label="Пароль" error={formState.errors["password"]}
                            registration={register("password", {required: true})}/>
                <button className="cursor-pointer px-4 py-2 bg-gray-200 border rounded" type="submit">
                    Войти
                </button>
            </form>
        </div>
    );
}