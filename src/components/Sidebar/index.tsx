'use client'
import Link from 'next/link'
import { IconAccounts, IconHistoric, IconHome } from '@/svg'
import Logo from '@/svg/Logo'
import styles from './styles.module.scss'
import { useParams } from 'next/navigation'
 
export default function Sidebar (){
    const { installation } = useParams()
    return (
        <div className={styles.sidebar}>
            <nav className={styles.navbar}>
                <Link href={`/${installation}/dashboard`}><IconHome /> <span>Inicio</span></Link>
                <Link href={`/${installation}/accounts`}><IconAccounts /> <span>Contas</span></Link>
                <Link href={`/${installation}/historic`}><IconHistoric /> <span>Histórico</span></Link>
            </nav>
            <div className={styles.logo}>
                <Logo />
            </div>
        </div>
    )
}