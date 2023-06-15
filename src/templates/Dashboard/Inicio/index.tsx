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
import { useListMouths } from '@/store/listMonths';

const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']


export const Inicio = ({ billsData, currentMonth }: { billsData: any, currentMonth: any }) => {
    const { installation } = useParams()
    const { listMonths } = useListMouths()
    const [bills, setBills] = useState(billsData)
    const { setMouthAccount } = useRouteState()
    const { push } = useRouter()
    const RouteAccount = (month: number) => {
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
                        {listMonths.map((item: any) => {
                            console.log(currentMonth)
                            if (item.month <= currentMonth && item.month >= currentMonth - 2 && bills[item.month]) {
                                const data = bills[item.month]
                                let date = new Date(data.generation_month.reference)
                                let year = date.getFullYear()
                                let month = Number(data.toLocaleString('default', { month: 'numeric' }))
                                let value = Number(data.value)
                                return (
                                    <AccordionTab key={item.label} header={<div className={styles.title}><div className={styles.text}><span className={styles.data}>{item.label} {year}</span><span className={styles.value}>R$ {value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span></div><span className={styles.status}>Em aberto</span></div>}>
                                        <div className={styles.buttonsAccordion}>
                                            {data.payment_status == '3'
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
                                return null
                            }

                        })}
                    </Accordion>
                </div>
                <div className={styles.historyAccounts}>
                    <h3>Histórico de consumo</h3>
                    <ul className={styles.historyList}>
                        {listMonths.map((item: any) => {
                            console.log(currentMonth)
                            if (item.month <= currentMonth && item.month >= currentMonth - 2 && bills[item.month]) {
                                const data = bills[item.month]
                                let date = new Date(data.generation_month.reference)
                                let year = date.getFullYear()
                                return (
                                    <li key={item.id}><span>{item.label} {year}</span> <span>{data.injected_energy.toLocaleString('pt-br')} kwh</span></li>
                                )
                            } else {
                                return null
                            }

                        })}
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