import { Controller, Control, FieldError } from 'react-hook-form'
import styles from './styles.module.scss'

interface OptionsProps {
    key: string,
    value: string
}

interface FormControllerSelectProps{
    name: any,
    defaultValue?: string
    required?: boolean | string,
    control: Control,
    label?: string,
    errorMessage?: string | any,
    options?: Array<OptionsProps>
}
 
export function FormControllerSelect ({ name, defaultValue = '', required = false, control, label, errorMessage, options }:FormControllerSelectProps) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{ required: required }}
            render={({ field, fieldState }) => (
                <div className={styles.formGroup}>
                    <select {...field} className={`${field.value && styles.labelActive} ${fieldState.error && styles.borderError}`}>
                        <option value="">Selecione uma opção</option>
                        {options?.map(opt => {
                            return (
                                <option value={opt.value} key={opt.value}>{opt.key}</option>
                            )
                        })}
                    </select> 
                    {label && <label htmlFor={field.name}>{label}</label>}
                    {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>} 
                </div>
            )}
        />
    )
}