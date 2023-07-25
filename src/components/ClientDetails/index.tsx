'use client'
import { useUserData } from '@/store/userData'
import styles from './styles.module.scss'
 
export const ClientDetails = () => {
    const { user } = useUserData()
    return (
        <div className={styles.clientDetails}>
            <h2>Bom dia, {user?.user?.name}</h2>
            <span className={styles.protocol}>
                <strong>N° do protocolo</strong> 1515525154515
            </span>
        </div>
    )
}