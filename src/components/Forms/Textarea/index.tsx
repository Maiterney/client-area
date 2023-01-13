import { UseFormRegisterReturn } from 'react-hook-form'

type InputsProps = {
    label?: string,
    placeholder?: string,
    register: UseFormRegisterReturn,
}

export default function Textarea ({label, placeholder ,register}:InputsProps){

    return (
        <>
            <label>{label}</label>
            <textarea {...register} placeholder={placeholder}></textarea>
        </>
    )
}