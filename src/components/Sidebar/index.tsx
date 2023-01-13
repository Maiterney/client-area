import Link from 'next/link'
import { IconAccounts, IconHistoric, IconHome } from '../Svg'
import Logo from '../Svg/Logo'
import styles from './styles.module.scss'
 
export default function Sidebar (){
    return (
        <div className={styles.sidebar}>
            <nav className={styles.navbar}>
                <Link href={'/dashboard'}><IconHome /> <span>Inicio</span></Link>
                <Link href={'/accounts'}><IconAccounts /> <span>Contas</span></Link>
                <Link href={'/historic'}><IconHistoric /> <span>Histórico</span></Link>
            </nav>
            <div className={styles.logo}>
                <Logo />
            </div>
        </div>
    )
}