'use client'
import { useContext, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { useRouteState } from '@/app/hooks';
import { useUserData } from '@/store/userData';
import { useInstallations } from '@/store/installations';
import { useParams } from 'next/navigation';
import { useBills } from '@/store/bills';
import { ClientDetails } from '@/components/ClientDetails';
import { InstallationDetail } from '@/components/InstallationDetails';

const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']


export const Inicio = ({billsData}:{billsData:any}) => {
    const { installation } = useParams()
    const [ bills, setBills ] = useState(billsData)
    const { setMouthAccount } = useRouteState()
    const { push } = useRouter()
    const RouteAccount = (month:number) => {
        setMouthAccount(month)
        push(`${installation}/accounts`)
    }

    console.log('data', bills)


    return (
        <div className={styles.dashboardArea}>
            <ClientDetails />
            <div className={styles.installation}>
                <InstallationDetail />
            </div>
            <div className={styles.accounts}>
                <div className={styles.openAccounts}>
                    <h3>Contas em aberto</h3>
                    <Accordion className={`accordion ${styles.accordion}`}>
                        {bills.slice(0,2).map((item:any) => {
                            let data = new Date(item.generation_month.reference)
                            let year = data.getFullYear()
                            let month = Number(data.toLocaleString('default', { month: 'numeric' }))
                            let value = Number(item.value)
                            return (
                                <AccordionTab key={item.id} header={<div className={styles.title}><div className={styles.text}><span className={styles.data}>{months[month + 1]} {year}</span><span className={styles.value}>R$ {value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span></div><span className={styles.status}>Em aberto</span></div>}>
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
                            )
                        })}
                        {/* <AccordionTab header={<div className={styles.title}><div className={styles.text}><span className={styles.data}>Novembro 2022</span><span className={styles.value}>R$ 26,90</span></div><span className={styles.status}>Em aberto</span></div>}>
                            <div className={styles.buttonsAccordion}>
                                <button className="btn default primary" onClick={() => RouteAccount(1)}>
                                    Pagar conta
                                </button>
                                <button className="btn outline primary" onClick={() => RouteAccount(1)}>
                                    Mais detalhes
                                </button>
                            </div>
                        </AccordionTab>
                        <AccordionTab header={<div className={styles.title}><div className={styles.text}><span className={styles.data}>Outubro 2022</span><span className={styles.value}>R$ 26,90</span></div><span className={styles.status}>Em aberto</span></div>}>
                            <div className={styles.buttonsAccordion}>
                                <button className="btn default primary" onClick={() => RouteAccount(2)}>
                                    Pagar conta
                                </button>
                                <button className="btn outline primary" onClick={() => RouteAccount(2)}>
                                    Mais detalhes
                                </button>
                            </div>
                        </AccordionTab> */}
                    </Accordion>
                </div>
                <div className={styles.historyAccounts}>
                    <h3>Histórico de consumo</h3>
                    <ul className={styles.historyList}>
                        {bills.slice(0,2).map((item:any) => {
                            let data = new Date(item.generation_month.reference)
                            let year = data.getFullYear()
                            let month = data.getMonth()
                            let value = Number(item.value)
                            return (
                                <li key={item.id}><span>{months[month + 1]} {year}</span> <span>{item.injected_energy.toLocaleString('pt-br')} kwh</span></li>
                            )
                        })}
                        {/* <li><span>Dezembro 2022</span> <span>40kwh</span></li>
                        <li><span>Dezembro 2022</span> <span>40kwh</span></li>
                        <li><span>Dezembro 2022</span> <span>40kwh</span></li> */}
                    </ul>
                    <div className={styles.button}>
                        <Link href={`/${installation}/historic`} className="btn default primary">
                            Histórico completo
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.economy}>
                <div className={styles.discountAnnual}>
                    <p>Desconto anual na energia</p>
                    <h3 className={styles.valueDiscount}>
                        6,12%
                    </h3>
                </div>
                <div className={styles.economyAnnual}>
                    <p>Economia anual</p>
                    <h3 className={styles.valueDiscount}>
                        R$ 155,00
                    </h3>
                </div>
                <div className={styles.totalDiscount}>
                    <p>Total de descontos</p>
                    <h3 className={styles.valueDiscount}>
                        R$ 245,00
                    </h3>
                </div>
            </div>
        </div>
    )
}