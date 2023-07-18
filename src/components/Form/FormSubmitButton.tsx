import { ButtonHTMLAttributes, HtmlHTMLAttributes } from 'react'
import styles from './styles.module.scss'
import { ProgressSpinner } from 'primereact/progressspinner';
interface FormSubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading: boolean
}
 
export const FormSubmitButton = ({ loading, ...rest }:FormSubmitButtonProps) => {
    return (
        <div className={styles.formSubmitButton}>
            <button className={`btn default ${loading ? 'disabledButton' : ''}`} {...rest} disabled={loading}>
                {loading ? <ProgressSpinner style={{width: '25px', height: '25px'}} strokeWidth="5" fill="gray" animationDuration=".5s" /> : 'Enviar'}
            </button>
        </div>
    )
}