import { Controller, Control, FieldError, Validate, FieldValues, ValidationRule } from 'react-hook-form'
import styles from './styles.module.scss'

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
    validate?: Validate<any, FieldValues>,
    pattern?: ValidationRule<RegExp>
}
 
export function FormControllerInput ({ name, defaultValue = '', required = false, control, type, label, errorMessage, limit = '', readOnly = false, validate, pattern }:FormControllerInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{ required: required, validate: validate, pattern: pattern }}
            render={({ field, fieldState }) => (
                <div className={styles.formGroup}>
                    <input type={type} {...field} className={`${field.value && styles.labelActive} ${fieldState.error && styles.borderError}`} maxLength={limit} readOnly={readOnly}/> 
                    {label && <label htmlFor={field.name}>{label}</label>}
                    {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>} 
                </div>
            )}
        />
    )
}