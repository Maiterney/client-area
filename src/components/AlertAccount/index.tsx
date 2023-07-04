'use client'
import { useAlertAccount } from '@/store/alertAccount'
import styles from './styles.module.scss'
 
export const AlertAccount = () => {
    const { alertAccount } = useAlertAccount()
    if(alertAccount == false) return null
    return (
        <div className={styles.alertAccount}>
            <p><strong>Atenção:</strong> Você possui pelo menos uma conta vencida ou em atraso!</p>
        </div>
    )
}