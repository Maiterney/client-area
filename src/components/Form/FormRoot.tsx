import { FormHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface FormRootProps extends FormHTMLAttributes<HTMLFormElement> {}
 
export const FormRoot = ({ ...rest }:FormRootProps) => {
    return (
        <form {...rest}></form>
    )
}