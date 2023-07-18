import { useState } from 'react'
import { useBills } from '@/store/bills'
import styles from './styles.module.scss'
import { useParams } from 'next/navigation'
import { useListMouths } from '@/store/listMonths'
import { useFilterYear } from '@/store/filterYear'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { useMediaQuery } from '@/hooks/use-media-query'
import Link from 'next/link'
import { AccountItem } from './AccoutItem'
import { Skeleton } from 'primereact/skeleton'
 
export const AccountTabPaid = () => {
    const { installation } = useParams()
    const { bills } = useBills()
    const { listMonths } = useListMouths()
    const { yearController } = useFilterYear()
    const responsive = useMediaQuery(769)
    const [ notAccount, setNotAccount ] = useState(true)

    const headerAccount = (item:any, value:any, data:any) => {
        return (
            <div className={styles.text}>
                <div className={styles.period}>
                    <span className={styles.data}>Mês: {item.label}</span>
                </div>
                <div className={styles.status}>
                    {data.payment_status == 'Aberto' && <span className={`${styles.status} btn rounded disable status isOpen`}>{data.payment_status}</span>}
                    {data.payment_status == 'Aprovação' && <span className={`${styles.status} btn rounded disable status isDelay`}>{data.payment_status}</span>}
                    {data.payment_status == 'Aguardando' && <span className={`${styles.status} btn rounded disable status isDelay`}>{data.payment_status}</span>}
                    {data.payment_status == 'Pago' && <span className={`${styles.status} btn rounded disable status isPay`}>{data.payment_status}</span>}
                    {data.payment_status == 'Vencido' && <span className={`${styles.status} btn rounded disable status isOpen`}>{data.payment_status}</span>}
                </div>
            </div>
        )
    }

    const headerNotAccount = (item:any) => {
        return (
            <div className={styles.inactive} key={item.month}>
                <div className={styles.text}>
                    <span className={styles.data}>Mês: {item.label}</span>
                </div>
                <span className={`${styles.status} statusText inactive`}>Não disponível</span>
            </div>
        )
    }

    if(!bills) return <h3>Não a contas</h3>

    return (
        <>
            {responsive && 
                <div className={styles.accordion}>
                    <Accordion activeIndex={0} className='accordion'>
                        {listMonths.map((item: any) => {
                            if (bills[item.month] && bills[item.month].payment_status == 'Pago') {
                                let data = bills[item.month]
                                let value = Number(data.value)
                                if(notAccount) {
                                    setNotAccount(false)
                                }
                                return (
                                    <AccordionTab header={headerAccount(item, value, data)} key={item.month}>
                                        <div className={styles.accordionContent}>
                                            <div className={styles.textContent}>
                                                <div className={styles.accountValue}>
                                                    <span className={styles.value}><strong>Valor: </strong> R$ {value.toLocaleString('pt-br', { minimumFractionDigits: 2 })} </span>
                                                </div>
                                                <div className={styles.accountConsume}>
                                                    <span className={styles.consumption}><strong>Consumo: </strong>{data.injected_energy.toLocaleString('pt-br')} KWh</span>
                                                </div>
                                            </div>
                                            <div className={styles.button}>
                                                <Link href={`/${installation}/accounts/${yearController.year}/${item.month}`} className="btn default primary">
                                                    Mais detalhes
                                                </Link>
                                            </div>
                                        </div>
                                    </AccordionTab>
                                )
                            } else {
                                return null 
                            }
                        })}
                        
                    </Accordion>
                    {notAccount && <p style={{textAlign: 'center'}}>Nenhuma conta gerada</p>}
                </div>
            }
            {!responsive && 
                <div className={styles.list}>
                    {!notAccount && 
                        <div className={styles.headerList}>
                            <div className={styles.text}>
                                <div className={styles.period}>
                                    <span className={styles.data}>Mês</span>
                                </div>
                                <div className={styles.value}>
                                    <span className={styles.value}>Valor</span>
                                </div>
                                <div className={styles.consume}>
                                    <span className={styles.consumption}>Consumo</span>
                                </div>
                            </div>
                            <div className={styles.status}>
                                <span>Status</span>
                            </div>
                            <div className={styles.button}>
                                <span>Ação</span>
                            </div>
                        </div>
                    }
                    {listMonths.map((item: any) => {
                        if (yearController.loading) {
                            return (
                                <div className={styles.title} key={item.month}>
                                    <div className={styles.text}>
                                        <div className={styles.period}>
                                            <Skeleton height="2rem" width='6rem'></Skeleton>
                                        </div>
                                        <div className={styles.value}>
                                            <Skeleton height="2rem" width='6rem'></Skeleton>
                                        </div>
                                        <div className={styles.consume}>
                                            <Skeleton height="2rem" width='6rem'></Skeleton>
                                        </div>
                                    </div>
                                    <div className={styles.status}>
                                        <Skeleton height="2rem" width='4rem'></Skeleton>
                                    </div>
                                    <div className={styles.button}>
                                        <Skeleton height="2rem" width='7.8rem'></Skeleton>
                                    </div>
                                </div>
                            )
                        }

                        if (bills[item.month] && bills[item.month].payment_status == 'Pago' && bills[item.month].payment_status != 'Arquivado') {
                            if(notAccount) {
                                setNotAccount(false)
                            }
                            return <AccountItem data={bills[item.month]} item={item} key={item.month}/>
                        } else return null
                    })}
                    {notAccount && <p style={{textAlign: 'center'}}>Nenhuma conta gerada</p>}
                </div>
            }
        </>
    )
}