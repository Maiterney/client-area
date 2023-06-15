'use client'
import { useInstallations } from '@/store/installations'
import styles from './styles.module.scss'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useUserData } from '@/store/userData'
 
export const InstallationDetail = () => {
    const { installations } = useInstallations()
    const { installation } = useParams()
    const { user } = useUserData()
    let installationData = installations.filter((item:any) => item.number == installation)

    return (
        <div className={styles.textArea}>
            <h2>{user?.name}</h2>
            <span><strong>Instalação N°:</strong> {installationData[0]?.number}</span>
            <span><strong>Endereço:</strong> {installationData[0]?.address}, N°{installationData[0]?.address_number} - {installationData[0]?.district} - {installationData[0]?.state}</span>
        </div>
    )
}