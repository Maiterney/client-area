import { useEffect, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
/* @ts-ignore */
import { mask as masker, unMask } from 'remask'

type InputsProps = {
    label?: string,
    placeholder?: string,
    type?: string,
    register: UseFormRegisterReturn,
    mask?: Array<string>,
    value?: string | any
}

export default function Input ({label, type, placeholder ,register, mask, value}:InputsProps){
    const [ inputValue, setInputValue ] = useState('')

    useEffect(() => {
        if(!value) return
        setInputValue(value)
    },[value])

    const inputMask = (e:any) => {
        if(e) {
            const input = unMask(e.target.value)
            const maskedInput = masker(input, mask)
            setInputValue(maskedInput)
        }
    }

    const inputChange = (e:any) => {
        if(e) {
            setInputValue(e.target.value)
        }
    }

    return (
        <>
            <label>{label}</label>
            {mask ? 
                <input type={type} placeholder={placeholder} {...register} value={inputValue} onChange={inputMask} autoComplete="off"/> 
                : 
                <input type={type} placeholder={placeholder} {...register} value={inputValue} onChange={inputChange} autoComplete="off"/>
            }
        </>
    )
}