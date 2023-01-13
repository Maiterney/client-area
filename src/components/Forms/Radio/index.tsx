import { useEffect, useState,useRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import useForm from "react-hook-form";
/* @ts-ignore */
import { mask as masker, unMask } from 'remask'

type InputsProps = {
    label?: string,
    register: UseFormRegisterReturn,
    value?: string
}

export default function Radio ({label ,register, value}:InputsProps){

    return (
        <div className='formGroup radioGroupInput'>
            <label>
                <input value={value} type='radio' {...register} />
                <span>{label}</span>
            </label>
        </div>
    )
}