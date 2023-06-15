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

    return (
        <div className={styles.historicTab}>
            <TabView className='tabView historicTab'>
                <TabPanel header="Histórico de conta">
                    <Accordion className={`accordion ${styles.accordion}`}>
                        {bills ?
                            listMonths.map((item: any) => {

                                if (bills[item.month]) {
                                    const data = bills[item.month]
                                    let dataTime = new Date(data.generation_month.reference)
                                    let year = dataTime.getFullYear()
                                    let value = Number(data.value)
                                    return (
                                        <AccordionTab key={item.month} header={
                                            <div className={styles.title}>
                                                <div className={styles.text}>
                                                    <span className={styles.data}>{item.label} {year}</span>
                                                    <span className={styles.value}>{value.toLocaleString('pt-br', { minimumFractionDigits: 2 })} </span>
                                                    <span className={styles.consumption}>{data.injected_energy.toLocaleString('pt-br')} KWh</span>
                                                </div>
                                                <span className={`${styles.status} statusText ${paymentStatus[Number(data.payment_status)].status}`}>{paymentStatus[Number(data.payment_status)].label}</span>
                                            </div>
                                        }>
                                            <div className={styles.buttonsAccordion}>
                                                {item.payment_status == '3'
                                                    ?
                                                    <Link href={`/${installation}/accounts/${year}/${item.month}`} className="btn outline primary">
                                                        Mais detalhes
                                                    </Link>
                                                    :
                                                    <Link href={`/${installation}/accounts/${year}/${item.month}`} className="btn default primary">
                                                        Pagar conta
                                                    </Link>
                                                }

                                            </div>
                                        </AccordionTab>
                                    )
                                } else {
                                    return (
                                        <AccordionTab disabled key={item.month} header={
                                            <div className={styles.title}>
                                                <div className={styles.text}>
                                                    <span className={styles.data}>{item.label} 2023</span>
                                                </div>
                                                <span className={`${styles.status} statusText inactive`}>Não disponível</span>
                                            </div>
                                        }>
                                        </AccordionTab>
                                    )
                                }















                                let data = new Date(item.generation_month.reference)
                                let year = data.getFullYear()
                                let month = Number(data.toLocaleString('default', { month: 'numeric' }))
                                let value = Number(item.value)
                                return (
                                    <Accordion className={`accordion ${styles.accordion}`} key={item.id}>
                                        <AccordionTab header={
                                            <div className={styles.title}>
                                                <div className={styles.text}>
                                                    <span className={styles.data}>{months[month + 1]} {year}</span>
                                                    <span className={styles.value}>{value.toLocaleString('pt-br', { minimumFractionDigits: 2 })} </span>
                                                    <span className={styles.consumption}>{item.injected_energy.toLocaleString('pt-br')} KWh</span>
                                                </div>
                                                <span className={`${styles.status} statusText ${paymentStatus[Number(item.payment_status)].status}`}>{paymentStatus[Number(item.payment_status)].label}</span>
                                            </div>
                                        }>
                                            <div className={styles.buttonsAccordion}>
                                                {item.payment_status == '3'
                                                    ?
                                                    <Link href={`/${installation}/accounts/${year}/${month + 1}`} className="btn outline primary">
                                                        Mais detalhes
                                                    </Link>
                                                    :
                                                    <Link href={`/${installation}/accounts/${year}/${month + 1}`} className="btn default primary">
                                                        Pagar conta
                                                    </Link>
                                                }

                                            </div>
                                        </AccordionTab>
                                    </Accordion>
                                )
                            })
                            :
                            <h3>Não a contas</h3>
                        }
                    </Accordion>
                </TabPanel>
                <TabPanel header="Débitos">
                    <Accordion className={`accordion ${styles.accordion}`}>
                        {bills ?
                            listMonths.map((item: any) => {
                                if (bills[item.month] && bills[item.month].payment_status != '3') {
                                    const data = bills[item.month]
                                    let dataTime = new Date(data.generation_month.reference)
                                    let year = dataTime.getFullYear()
                                    let value = Number(data.value)
                                    let dueDate = new Date(data.due_date)
                                    let cvtDueDate = dueDate.setDate(dueDate.getDate() + 1)
                                    let convertDate = new Date(cvtDueDate)
                                    let economy = Number(data.amount_saved)

                                    // let currentDay = new Date(data.due_date).add(Date.DAY, +1).format('Y-m-d');

                                    return (
                                        <AccordionTab key={item.month} header={
                                            <div className={styles.title}>
                                                <div className={styles.text}>
                                                    <span className={styles.data}>{item.label} {year}</span>
                                                    <span className={styles.value}>{value.toLocaleString('pt-br', { minimumFractionDigits: 2 })} </span>
                                                    <span className={styles.consumption}>{data.injected_energy.toLocaleString('pt-br')} KWh</span>
                                                </div>
                                                <span className={`${styles.status} statusText ${paymentStatus[Number(data.payment_status)].status}`}>{paymentStatus[Number(data.payment_status)].label}</span>
                                            </div>
                                        }>
                                            <div className={styles.buttonsAccordion}>
                                                {item.payment_status == '3'
                                                    ?
                                                    <Link href={`/${installation}/accounts/${year}/${item.month}`} className="btn outline primary">
                                                        Mais detalhes
                                                    </Link>
                                                    :
                                                    <Link href={`/${installation}/accounts/${year}/${item.month}`} className="btn default primary">
                                                        Pagar conta
                                                    </Link>
                                                }

                                            </div>
                                        </AccordionTab>
                                    )
                                } else {
                                    return (
                                        <></>
                                    )
                                }
                            })
                            :
                            <h3>Não a contas</h3>
                        }
                    </Accordion>
                </TabPanel>
                <TabPanel header="Pagos">
                    <Accordion className={`accordion ${styles.accordion}`}>
                        {bills ?
                            listMonths.map((item: any) => {
                                if (bills[item.month] && bills[item.month].payment_status == '3') {
                                    const data = bills[item.month]
                                    let dataTime = new Date(data.generation_month.reference)
                                    let year = dataTime.getFullYear()
                                    let value = Number(data.value)

                                    return (
                                        <AccordionTab key={item.month} header={
                                            <div className={styles.title}>
                                                <div className={styles.text}>
                                                    <span className={styles.data}>{item.label} {year}</span>
                                                    <span className={styles.value}>{value.toLocaleString('pt-br', { minimumFractionDigits: 2 })} </span>
                                                    <span className={styles.consumption}>{data.injected_energy.toLocaleString('pt-br')} KWh</span>
                                                </div>
                                                <span className={`${styles.status} statusText ${paymentStatus[Number(data.payment_status)].status}`}>{paymentStatus[Number(data.payment_status)].label}</span>
                                            </div>
                                        }>
                                            <div className={styles.buttonsAccordion}>
                                                {item.payment_status == '3'
                                                    ?
                                                    <Link href={`/${installation}/accounts/${year}/${item.month}`} className="btn outline primary">
                                                        Mais detalhes
                                                    </Link>
                                                    :
                                                    <Link href={`/${installation}/accounts/${year}/${item.month}`} className="btn default primary">
                                                        Pagar conta
                                                    </Link>
                                                }

                                            </div>
                                        </AccordionTab>
                                    )
                                } else {
                                    return (
                                        <></>
                                    )
                                }
                            })
                            :
                            <h3>Não a contas</h3>
                        }
                    </Accordion>
                </TabPanel>
            </TabView>
        </div>
    )
}