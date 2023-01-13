import { useState, useEffect } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type InputsProps = {
    label?: string,
    placeholder?: string,
    register: UseFormRegisterReturn,
    options?: Array<object>,
    value?: string | any
}

export default function Select ({label, register, options, value}:InputsProps){
    const [selectValue, setSelectValue] = useState('')

    useEffect(() => {
        if(!value) return
        setSelectValue(value)
    },[value])
    
    const setValue = (e:any) => {
        if(!e) return
        setSelectValue(e.target.value)
    }

    return (
        <>
            <label>{label}</label>
            <select {...register } value={selectValue} onChange={setValue} defaultValue={selectValue}>
                <option style={{display: 'none'}} value=''>Selecione uma opção...</option>
                {options?.map((option:any, index:any) => (
                    <option key={index} value={option.value}>{option.name}</option>
                ))}
            </select>
        </>
    )
}