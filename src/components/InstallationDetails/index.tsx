'use client'
import { useInstallations } from '@/store/installations'
import styles from './styles.module.scss'
 
export const InstallationDetail = () => {
    const { installations } = useInstallations()
    return (
        <div className={styles.textArea}>
            <span><strong>Instalação N°:</strong> {installations[0]?.number}</span>
            <span><strong>Endereço:</strong> {installations[0]?.address}, N°{installations[0]?.address_number} - {installations[0]?.district} - {installations[0]?.state}</span>
        </div>
    )
}