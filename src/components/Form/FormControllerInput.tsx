import { Controller, Control, FieldError } from 'react-hook-form'
import styles from './styles.module.scss'

interface FormControllerInputProps{
    name: any,
    defaultValue?: string
    required?: boolean | string,
    control: Control,
    type: string,
    label?: string,
    errorMessage?: string | any
}
 
export function FormControllerInput ({ name, defaultValue = '', required = false, control, type, label, errorMessage }:FormControllerInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{ required: required }}
            render={({ field, fieldState }) => (
                <div className={styles.formGroup}>
                    <input type={type} {...field} className={field.value && styles.labelActive}/> 
                    {label && <label htmlFor={field.name}>{label}</label>}
                    {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>} 
                </div>
            )}
        />
    )
}