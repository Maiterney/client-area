'use client'
import { useEffect, useState } from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { TabPanel, TabView } from 'primereact/tabview'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'
import { useTabNumber } from '@/store/tabAccount'

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

export const HistoricTabs = ({bills}:{bills:any}) => {
    const { setTabNumber } = useTabNumber()
    const { push } = useRouter()
    const [ isNotPayAccounts, setNotPayAccounts ] = useState<Array<any>>([])
    const [ isPayAccounts, setIsPayAccounts ] = useState<Array<any>>([])

    useEffect(() => {
        if(!bills) return
        setIsPayAccounts(bills.filter((item:any) => item?.payment_status == '3'))
        setNotPayAccounts(bills.filter((item:any) => item?.payment_status != '3' && item?.status != 'Não disponível'))
        
    },[bills])
    

    const RouteAccount = (month:number) => {
        setTabNumber(month)
        push('/accounts')
    }

    return (
        <div className={styles.historicTab}>
                <TabView className='tabView historicTab'>
                    <TabPanel header="Histórico de conta">
                        {bills ? 
                            bills.map((item:any) => {
                                let data = new Date(item.generation_month.reference)
                                let year = data.getFullYear()
                                let month = data.getMonth()
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
                                                    <button className="btn outline primary" onClick={() => RouteAccount(item.id - 1)}>
                                                        Mais detalhes
                                                    </button>
                                                :
                                                    <button className="btn default primary" onClick={() => RouteAccount(item.id - 1)}>
                                                        Pagar conta
                                                    </button>
                                                }
                                                
                                            </div>
                                        </AccordionTab>
                                    </Accordion>
                                )
                            })
                        : 
                            <h3>Não a contas</h3>
                        }
                    </TabPanel>
                    <TabPanel header="Débitos">
                        {isNotPayAccounts ? 
                            isNotPayAccounts.map((item:any) => {
                                let data = new Date(item.generation_month.reference)
                                let year = data.getFullYear()
                                let month = data.getMonth()
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
                                                    <button className="btn outline primary" onClick={() => RouteAccount(item.id - 1)}>
                                                        Mais detalhes
                                                    </button>
                                                :
                                                    <button className="btn default primary" onClick={() => RouteAccount(item.id - 1)}>
                                                        Pagar conta
                                                    </button>
                                                }
                                                
                                            </div>
                                        </AccordionTab>
                                    </Accordion>
                                )
                            })
                        : 
                            <h3>Não a contas</h3>
                        }
                    </TabPanel>
                    <TabPanel header="Pagos">
                        {isPayAccounts ? 
                            isPayAccounts.map((item:any) => {
                                let data = new Date(item.generation_month.reference)
                                let year = data.getFullYear()
                                let month = data.getMonth()
                                let value = Number(item.value)
                                return (
                                    <Accordion className={`accordion ${styles.accordion}`} key={item.id}>
                                        <AccordionTab header={
                                            <div className={styles.title}>
                                                <div className={styles.text}>
                                                    <span className={styles.date}>{months[month + 1]} {year}</span>
                                                    <span className={styles.value}>{value.toLocaleString('pt-br', { minimumFractionDigits: 2 })} </span>
                                                    <span className={styles.consumption}>{item.injected_energy.toLocaleString('pt-br')} KWh</span>
                                                </div>
                                                <span className={`${styles.status} statusText ${paymentStatus[Number(item.payment_status)].status}`}>{paymentStatus[Number(item.payment_status)].label}</span>
                                            </div>
                                        }>
                                            <div className={styles.buttonsAccordion}>
                                                {item.payment_status == '3'
                                                ? 
                                                    <button className="btn outline primary" onClick={() => RouteAccount(item.id - 1)}>
                                                        Mais detalhes
                                                    </button>
                                                :
                                                    <button className="btn default primary" onClick={() => RouteAccount(item.id - 1)}>
                                                        Pagar conta
                                                    </button>
                                                }
                                                
                                            </div>
                                        </AccordionTab>
                                    </Accordion>
                                )
                            })
                        : 
                            <h3>Não a contas</h3>
                        }
                    </TabPanel>
                </TabView>
            </div>
    )
}