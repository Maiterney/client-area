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

export default function CheckBox ({label ,register, value}:InputsProps){

    return (
        <div className='checkBoxGroupInput'>
            <label>
                <input value={value} type='checkbox' {...register} hidden/>
                <span className='checkedBox'></span>
                <span className='checkedLabel'>{label}</span>
            </label>
        </div>
    )
}