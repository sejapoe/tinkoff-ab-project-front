import {FieldWrapper, FieldWrapperPassThroughProps} from "./FieldWrapper";
import {UseFormRegisterReturn} from "react-hook-form";
import clsx from "clsx";

type InputFieldProps = FieldWrapperPassThroughProps & {
    type?: 'text' | 'email' | 'password' | 'time';
    noAutocomplete?: boolean;
    className?: string;
    defaultValue?: string;
    registration: Partial<UseFormRegisterReturn>;
};

export const InputField = ({
                               type = "text",
                               label,
                               className,
                               defaultValue,
                               registration,
                               noAutocomplete,
                               error
                           }: InputFieldProps) => {
    return (
        <FieldWrapper label={label} error={error}>
            <input
                type={type}
                className={clsx(
                    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200",
                    "shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                    className
                )}
                autoComplete={noAutocomplete ? "off" : "on"}
                defaultValue={defaultValue}
                {...registration}
            />
        </FieldWrapper>
    )
}