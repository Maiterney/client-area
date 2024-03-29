'use client'
import { useContext, useEffect, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import styles from './styles.module.scss'
import Link from 'next/link'
import { useParams } from 'next/navigation';
import { InstallationDetail } from '@/components/InstallationDetails';
import { useListMouths } from '@/store/listMonths';
import { LoaderPage } from '@/components/LoaderPage';
import { useLoaderPage } from '@/store/loaderPage';
import { useBills } from '@/store/bills';
import { AlertAccount } from '@/components/AlertAccount';
import { useFilterYear } from '@/store';
import moment from 'moment';

export const Inicio = ({ billsData, currentMonth }: { billsData: any, currentMonth: any }) => {
    const { installation } = useParams()
    const { listMonths } = useListMouths()
    const { bills } = useBills()
    const [alertAccountToggle, setAlertAccountToggle] = useState(false)
    const { setLoaderPage } = useLoaderPage()
    const { yearController } = useFilterYear()

    useEffect(() => {
        setLoaderPage(true)
    },[setLoaderPage])


    useEffect(() => {
        if(!bills) return
        setLoaderPage(false)
    },[bills, setLoaderPage])


    return (
        <LoaderPage>
            <div className={styles.dashboardArea}>
                {/* <ClientDetails /> */}
                <AlertAccount />
                <div className={styles.installation}>
                    <InstallationDetail />
                </div>
                <div className={styles.accounts}>
                    <div className={styles.openAccounts}>
                        <h3>Ultimas contas</h3>
                        {bills.length != 0 ? 
                            <Accordion className={`accordion ${styles.accordion}`}>
                                {listMonths.map((item: any) => {
                                    if (item.month <= currentMonth && item.month >= currentMonth - 2 && bills[item.month] /* && bills[item.month].payment_status != 'Arquivado' */) {
                                        const data = bills[item.month]
                                        let value = Number(data.value)
                                        let referenceDate = moment(data.generation_month.reference, 'YYYY/MM/DD')
                                        let referenceYear = referenceDate.year();
                                        return (
                                            <AccordionTab 
                                                key={`${item.label}`} 
                                                disabled={data.payment_status == 'Arquivado' ? true : false}
                                                header={
                                                    <div className={styles.title}>
                                                        <div className={styles.text}>
                                                            <span className={styles.data}>{item.label} {referenceYear}</span>
                                                            <span className={styles.value}>R$ {value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span>
                                                        </div>
                                                        {data.payment_status == 'Aberto' && <span className={`${styles.status} statusText isOpen`}>{data.payment_status}</span>}
                                                        {data.payment_status == 'Aprovação' && <span className={`${styles.status} statusText isDelay`}>{data.payment_status}</span>}
                                                        {data.payment_status == 'Aguardando' && <span className={`${styles.status} statusText isDelay`}>{data.payment_status}</span>}
                                                        {data.payment_status == 'Pago' && <span className={`${styles.status} statusText isPay`}>{data.payment_status}</span>}
                                                        {data.payment_status == 'Vencido' && <span className={`${styles.status} statusText isOpen`}>{data.payment_status}</span>}
                                                    </div>
                                                }>
                                                <div className={styles.buttonsAccordion}>
                                                    
                                                    {data.payment_status == 'Pago'
                                                        ?
                                                        <Link href={`/${installation}/accounts/${referenceYear}/${item.month}`} className="btn outline primary">
                                                            Mais detalhes
                                                        </Link>
                                                        :
                                                        <Link href={`/${installation}/accounts/${referenceYear}/${item.month}`} className="btn default primary">
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
                            :
                            <p style={{textAlign: 'center'}}>Nenhuma conta gerada</p>
                        }
                    </div>
                    <div className={styles.historyAccounts}>
                        <h3>Histórico de consumo</h3>
                        <ul className={styles.historyList}>
                            {bills.length != 0  ? 
                                listMonths.map((item: any) => {
                                    if (item.month <= currentMonth && item.month >= currentMonth - 2 && bills[item.month]) {
                                        const data = bills[item.month]
                                        let referenceDate = moment(data.generation_month.reference, 'YYYY/MM/DD')
                                        let referenceYear = referenceDate.year();
                                        return (
                                            <li key={item.month}><span>{item.label} {referenceYear}</span> <span>{data.injected_energy.toLocaleString('pt-br')} kwh</span></li>
                                        )
                                    } else {
                                        return null
                                    }

                                })
                                : 
                                <li style={{display: 'flex', justifyContent: 'center'}}><p style={{textAlign: 'center'}}>Nenhuma conta gerada</p></li>
                            }
                            
                        </ul>
                        {bills.length != 0  && 
                            <div className={styles.button}>
                                <Link href={`/${installation}/historic`} className="btn default primary">
                                    Histórico completo
                                </Link>
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.economy}>
                    <div className={styles.discountAnnual}>
                        <p>Desconto anual na energia</p>
                        <h3 className={styles.valueDiscount}>
                            --%
                        </h3>
                    </div>
                    <div className={styles.economyAnnual}>
                        <p>Economia anual</p>
                        <h3 className={styles.valueDiscount}>
                            R$ --
                        </h3>
                    </div>
                    <div className={styles.totalDiscount}>
                        <p>Total de descontos</p>
                        <h3 className={styles.valueDiscount}>
                            R$ --
                        </h3>
                    </div>
                </div>
            </div>
        </LoaderPage>
    )
}