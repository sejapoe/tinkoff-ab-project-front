import {useNavigate} from "react-router-dom";
import {useLogin} from "../api";
import {useForm} from "react-hook-form";
import {InputField} from "../../../ui/form/InputField";

type LoginValues = {
    name: string;
    password: string;
}


export const LoginForm = () => {
    const nav = useNavigate()
    const {mutate} = useLogin();
    const {register, handleSubmit, formState} = useForm<LoginValues>()

    return (
        <div className="w-screen h-full rounded flex justify-center items-center">
            <form className="p-8 flex flex-col shadow space-y-6" onSubmit={handleSubmit(data => {
                mutate(data, {
                    onSuccess: () => {
                        nav("/")
                    }
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