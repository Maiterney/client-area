'use client'
import { useEffect, useState } from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { TabPanel, TabView } from 'primereact/tabview'
import styles from './styles.module.scss'
import { useParams, useRouter } from 'next/navigation'
import { useTabNumber } from '@/store/tabAccount'
import Link from 'next/link'
import { useBills } from '@/store/bills'
import { useListMouths } from '@/store/listMonths'

const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']


export const HistoricTabs = ({ billsData }: { billsData: any }) => {
    const { setTabNumber } = useTabNumber()
    const { listMonths } = useListMouths()
    const { installation } = useParams()
    const { push } = useRouter()
    const { bills, setBills } = useBills()
    const [isNotPayAccounts, setNotPayAccounts] = useState<Array<any>>([])
    const [isPayAccounts, setIsPayAccounts] = useState<Array<any>>([])

    useEffect(() => {
        if (!billsData) return
        setBills(billsData)
        console.log(billsData)
    }, [billsData])


    const RouteAccount = (month: number) => {
        setTabNumber(month)
        push('/accounts')
    }

    const paymentStatus = [
        {
            label: 'Aberto',
            status: 'isOpen'
        },
        {
            label: 'Aprovação',
            status: 'isDelay'
        },
        {
            label: 'Aguardando',
            status: 'isDelay'
        },
        {
            label: 'Pago',
            status: 'isPay'
        },
        {
            label: 'Vencido',
            status: 'isOpen'
        },
    ]

    return (
        <div className={styles.historicTab}>
            <TabView className='tabView historicTab' >
                <TabPanel header="Histórico de conta">
                    <div className={styles.list}>
                        {bills ?
                            listMonths.map((item: any) => {

                                if (bills[item.month]) {
                                    const data = bills[item.month]
                                    let dataTime = new Date(data.generation_month.reference)
                                    let year = dataTime.getFullYear()
                                    let value = Number(data.value)
                                    return (
                                        <div className={styles.title} key={item.month}>
                                            <div className={styles.text}>
                                                <span className={styles.data}>{item.label} {year}</span>
                                                <span className={styles.value}>{value.toLocaleString('pt-br', { minimumFractionDigits: 2 })} </span>
                                                <span className={styles.consumption}>{data.injected_energy.toLocaleString('pt-br')} KWh</span>
                                            </div>
                                            {data.payment_status == 'Aberto' && <span className={`${styles.status} statusText isOpen`}>{data.payment_status}</span>}
                                            {data.payment_status == 'Aprovação' && <span className={`${styles.status} statusText isDelay`}>{data.payment_status}</span>}
                                            {data.payment_status == 'Aguardando' && <span className={`${styles.status} statusText isDelay`}>{data.payment_status}</span>}
                                            {data.payment_status == 'Pago' && <span className={`${styles.status} statusText isPay`}>{data.payment_status}</span>}
                                            {data.payment_status == 'Vencido' && <span className={`${styles.status} statusText isOpen`}>{data.payment_status}</span>}

                                            {/* <span className={`${styles.status} statusText ${data.payment_status}`}>{data.payment_status}</span> */}
                                            <div className={styles.buttonsAccordion}>
                                                <Link href={`/${installation}/accounts/${year}/${item.month}`} className="btn default primary">
                                                    Mais detalhes
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className={styles.title} key={item.month}>
                                            <div className={styles.text}>
                                                <span className={styles.data}>{item.label} 2023</span>
                                            </div>
                                            <span className={`${styles.status} statusText inactive`}>Não disponível</span>
                                        </div>
                                    )
                                }
                            })
                            :
                            <h3>Não a contas</h3>
                        }
                    </div>
                </TabPanel>
                <TabPanel header="Em aberto/Vencidos">
                    <div className={styles.list}>
                        {bills ?
                            listMonths.map((item: any) => {
                                if (bills[item.month] && bills[item.month].payment_status != 'Pago') {
                                    const data = bills[item.month]
                                    let dataTime = new Date(data.generation_month.reference)
                                    let year = dataTime.getFullYear()
                                    let value = Number(data.value)

                                    return (
                                        <div className={styles.title} key={item.month}>
                                            <div className={styles.text}>
                                                <span className={styles.data}>{item.label} {year}</span>
                                                <span className={styles.value}>{value.toLocaleString('pt-br', { minimumFractionDigits: 2 })} </span>
                                                <span className={styles.consumption}>{data.injected_energy.toLocaleString('pt-br')} KWh</span>
                                            </div>
                                            {data.payment_status == 'Aberto' && <span className={`${styles.status} statusText isOpen`}>{data.payment_status}</span>}
                                            {data.payment_status == 'Aprovação' && <span className={`${styles.status} statusText isDelay`}>{data.payment_status}</span>}
                                            {data.payment_status == 'Aguardando' && <span className={`${styles.status} statusText isDelay`}>{data.payment_status}</span>}
                                            {data.payment_status == 'Pago' && <span className={`${styles.status} statusText isPay`}>{data.payment_status}</span>}
                                            {data.payment_status == 'Vencido' && <span className={`${styles.status} statusText isOpen`}>{data.payment_status}</span>}
                                            <div className={styles.buttonsAccordion}>
                                                <Link href={`/${installation}/accounts/${year}/${item.month}`} className="btn default primary">
                                                    Mais detalhes
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return null
                                }
                            })
                            :
                            <h3>Não a contas</h3>
                        }
                    </div>
                </TabPanel>
                <TabPanel header="Pagos">
                    <div className={styles.list}>
                        {bills ?
                            listMonths.map((item: any) => {
                                if (bills[item.month] && bills[item.month].payment_status == 'Pago') {
                                    const data = bills[item.month]
                                    let dataTime = new Date(data.generation_month.reference)
                                    let year = dataTime.getFullYear()
                                    let value = Number(data.value)

                                    return (
                                        <div className={styles.title} key={item.month}>
                                            <div className={styles.text}>
                                                <span className={styles.data}>{item.label} {year}</span>
                                                <span className={styles.value}>{value.toLocaleString('pt-br', { minimumFractionDigits: 2 })} </span>
                                                <span className={styles.consumption}>{data.injected_energy.toLocaleString('pt-br')} KWh</span>
                                            </div>
                                            {data.payment_status == 'Aberto' && <span className={`${styles.status} statusText isOpen`}>{data.payment_status}</span>}
                                            {data.payment_status == 'Aprovação' && <span className={`${styles.status} statusText isDelay`}>{data.payment_status}</span>}
                                            {data.payment_status == 'Aguardando' && <span className={`${styles.status} statusText isDelay`}>{data.payment_status}</span>}
                                            {data.payment_status == 'Pago' && <span className={`${styles.status} statusText isPay`}>{data.payment_status}</span>}
                                            {data.payment_status == 'Vencido' && <span className={`${styles.status} statusText isOpen`}>{data.payment_status}</span>}
                                            <div className={styles.buttonsAccordion}>
                                                <Link href={`/${installation}/accounts/${year}/${item.month}`} className="btn default primary">
                                                    Mais detalhes
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return null
                                }
                            })
                            :
                            <h3>Não a contas</h3>
                        }
                    </div>  
                </TabPanel>
            </TabView>
        </div>
    )
}