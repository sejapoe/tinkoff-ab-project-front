import {useForm} from "react-hook-form"
import {useSignUp} from "../api";
import {useNavigate} from "react-router-dom";
import {InputField} from "../../../ui/form/InputField";

type SignUpValues = {
    name: string;
    password: string;
    confirm_password: string;
}


export const SignUpForm = () => {
    const nav = useNavigate()
    const {mutate} = useSignUp();
    const {register, handleSubmit, watch, formState} = useForm<SignUpValues>()

    return (
        <div className="w-screen h-full rounded flex justify-center items-center">
            <form className="p-8 flex flex-col shadow space-y-6" onSubmit={handleSubmit(data => {
                mutate(data, {
                    onSuccess: () => {
                        nav(-1)
                    }
                })
            })}>
                <InputField label="Имя пользователя" error={formState.errors["name"]}
                            registration={register("name", {required: true})}/>
                <InputField type="password" label="Пароль" error={formState.errors["password"]}
                            registration={register("password", {required: true})}/>
                <InputField type="password" label="Подтвердите пароль" error={formState.errors["confirm_password"]}
                            registration={register("confirm_password", {
                                required: true,
                                validate: (val: string) => {
                                    if (watch('password') !== val) {
                                        return "Your passwords do no match";
                                    }
                                }
                            })}/>
                <button className="cursor-pointer px-4 py-2 bg-gray-200 border rounded" type="submit">
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
}