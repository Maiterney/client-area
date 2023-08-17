import { Controller, Control, FieldError, useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { mask } from 'ts-remask'

interface FormControllerInputProps{
    name: any,
    defaultValue?: string
    required?: boolean | string,
    control: Control,
    type: string,
    label?: string,
    errorMessage?: string | any,
    limit?: any,
    readOnly?: boolean,
    inputMask:Array<string>
}
 
export function FormControllerInputMask ({ name, defaultValue = '', required = false, control, type, label, errorMessage, limit = '', readOnly = false, inputMask }:FormControllerInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{ required: required }}
            render={({ field, fieldState }) => {
                field.value ? field.value = mask(field.value, inputMask) : ''
                return (
                    <div className={styles.formGroup}>
                        <input type={type} {...field} className={`${field.value && styles.labelActive} ${fieldState.error && styles.borderError}`} maxLength={limit} readOnly={readOnly}/> 
                        {label && <label htmlFor={field.name}>{label}</label>}
                        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>} 
                        {errorMessage?.type === 'pattern' && <span className={styles.errorMessage}>askdjalsdhjashdlahsjhd</span>} 
                    </div>
                )
            }}
        />
    )
}