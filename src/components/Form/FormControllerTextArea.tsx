import { Controller, Control, FieldError } from 'react-hook-form'
import styles from './styles.module.scss'

interface FormControllerInputProps{
    name: any,
    defaultValue?: string
    required?: boolean | string,
    control: Control,
    label?: string,
    errorMessage?: string | any
}
 
export function FormControllerTextArea ({ name, defaultValue = '', required = false, control, label, errorMessage }:FormControllerInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{ required: required }}
            render={({ field, fieldState }) => (
                <div className={styles.formGroup}>
                    <textarea cols={30} rows={10} {...field} className={field.value && styles.labelActive}></textarea>
                    {label && <label htmlFor={field.name}>{label}</label>}
                    {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>} 
                </div>
            )}
        />
    )
}