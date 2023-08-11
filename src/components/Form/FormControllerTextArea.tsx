import { Controller, Control, FieldError } from 'react-hook-form'
import styles from './styles.module.scss'
import { useState } from 'react'

interface FormControllerInputProps{
    name: any,
    defaultValue?: string
    required?: boolean | string,
    control: Control,
    label?: string,
    errorMessage?: string | any
}
 
export function FormControllerTextArea ({ name, defaultValue = '', required = false, control, label, errorMessage }:FormControllerInputProps) {
    const [ charactersQuantity, setCharactersQuantity ] = useState(0)

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{ required: required }}
            render={({ field, fieldState }) => {
                const setValue = (value:string) => {
                    setCharactersQuantity(value.length)
                    field.onChange(value)
                }
                return (
                    <div className={styles.formGroup} style={{width: '98%'}}>
                        <textarea cols={30} rows={10} maxLength={5000} onChange={(e:any) => setValue(e.target.value)} className={`${field.value && styles.labelActive} ${fieldState.error && styles.borderError}`}></textarea>
                        {label && <label htmlFor={field.name}>{label}</label>}
                        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>} 
                        <p className={styles.charactersQuantity}>{charactersQuantity} / <span>5000</span></p>
                    </div>
                )
            }}
        />
    )
}