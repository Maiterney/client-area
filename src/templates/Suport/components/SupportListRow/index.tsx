import { IconMessage } from '@/svg'
import styles from './styles.module.scss'
import Link from 'next/link'
import moment from 'moment'

interface SupportRowListProps {
    title: string,
    status: string,
    protocol: string,
    link: string,
    date: string
}
 
export const SupportListRow = ({ title, status, protocol, link = '#', date }:SupportRowListProps) => {
    const time = moment(date, "YYYYMMDD").fromNow();
    return (
        <div className={styles.rowList}>
            <div className={styles.icon}>
                <IconMessage />
            </div>
            <div className={styles.status}>
                <p>{protocol}</p>
                {status == 'pending' && <span className={`${styles.status} ${styles.open}`}>Em aberto</span>}
                {status == 'done' && <span className={`${styles.status} ${styles.finality}`}>Finalizado</span>}
            </div>
            <div className={styles.title}>
                <p>{title}</p>
            </div>
            <div className={styles.date}>
                <p>{time}</p>
            </div>
            <div className={styles.action}>
                <Link href={link}>Ver chamado</Link>
            </div>
        </div>
    )
}