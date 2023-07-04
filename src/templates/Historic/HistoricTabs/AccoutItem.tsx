import Link from 'next/link'
import styles from './styles.module.scss'
import { useFilterYear } from '@/store/filterYear'
import { useParams } from 'next/navigation'

export const AccountItem = ({data, item}:any) => {
    const { installation } = useParams()
    const { yearController } = useFilterYear()
    let value = Number(data.value)

    return (
        <div className={styles.title} key={item.month}>
            <div className={styles.text}>
                <div className={styles.period}>
                    <span className={styles.data}>{item.label}</span>
                </div>
                <div className={styles.value}>
                    <span className={styles.value}>R$ {value.toLocaleString('pt-br', { minimumFractionDigits: 2 })} </span>
                </div>
                <div className={styles.consume}>
                    <span className={styles.consumption}>{data.injected_energy.toLocaleString('pt-br')} KWh</span>
                </div>
            </div>
            <div className={styles.status}>
                {data.payment_status == 'Aberto' && <span className={`${styles.status} btn rounded disable status isOpen`}>{data.payment_status}</span>}
                {data.payment_status == 'Aprovação' && <span className={`${styles.status} btn rounded disable status isOpen`}>{data.payment_status}</span>}
                {data.payment_status == 'Aguardando' && <span className={`${styles.status} btn rounded disable status isOpen`}>{data.payment_status}</span>}
                {data.payment_status == 'Pago' && <span className={`${styles.status} btn rounded disable status isPay`}>{data.payment_status}</span>}
                {data.payment_status == 'Vencido' && <span className={`${styles.status} btn rounded disable status isDelay`}>{data.payment_status}</span>}
            </div>
            <div className={styles.button}>
                <Link href={`/${installation}/accounts/${yearController.year}/${item.month}`} className="btn default primary">
                    Mais detalhes
                </Link>
            </div>
        </div>
    )
}