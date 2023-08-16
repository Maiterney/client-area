'use client'
import { useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { Toast } from 'primereact/toast'
import { useParams } from 'next/navigation'
import { LoaderPage } from '@/components/LoaderPage'
import { useLoaderPage } from '@/store'
import moment from 'moment';

const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

export const Account = ({ accountData }: { accountData: any }) => {
    const { accountYear, accountMonth } = useParams()
    const { setLoaderPage } = useLoaderPage()
    const toast = useRef<Toast>(null);
    let value = Number(accountData?.value)
    let dueDate = new Date(accountData?.due_date)
    let dateNow = moment()
    let dueDateAccount = moment(accountData.due_date)
    let days = dateNow.diff(dueDateAccount, 'days');
    useEffect(() => { setLoaderPage(true) }, [setLoaderPage])
    useEffect(() => {
        if(!accountData) return
        setLoaderPage(false)
        // console.log(accountData) 
    }, [accountData])
    

    return (
        <LoaderPage>
            <div className={styles.internalAccount}>
                {/* <ClientDetails /> */}
                <div className={styles.account}>
                    <div className={styles.details}>
                        <div className={styles.title}>
                            <h2>{months[Number(accountMonth) - 1]} {accountYear}</h2>
                        </div>
                        <div className={styles.accountDetail}>
                            <div className={styles.value}>
                                <p>Valor</p>
                                <h3>R$ {value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                            </div>
                            <div className={styles.dueDate}>
                                <p>Vencimento</p>
                                <h3>{dueDate?.toLocaleDateString('pt-BR')}</h3>
                            </div>
                            <div className={styles.consumption}>
                                <p>Consumo</p>
                                <h3>{accountData?.injected_energy.toLocaleString('pt-br')}KWh</h3>
                            </div>
                            <div className={styles.status}>
                                {accountData.payment_status == 'Aberto' && <button className={`btn rounded disable status isOpen`}>{accountData.payment_status}</button>}
                                {accountData.payment_status == 'Aprovação' && <button className={`btn rounded disable status isOpen`}>{accountData.payment_status}</button>}
                                {accountData.payment_status == 'Aguardando' && <button className={`btn rounded disable status isOpen`}>{accountData.payment_status}</button>}
                                {accountData.payment_status == 'Pago' && <button className={`btn rounded disable status isPay`}>{accountData.payment_status}</button>}
                                {accountData.payment_status == 'Vencido' && <button className={`btn rounded disable status isDelay`}>{accountData.payment_status}</button>}
                            </div>
                        </div>
                        <div className={styles.actions}>

                            {accountData.bill_generated != null &&
                                accountData.payment_status == 'Vencido' && days >= 60 ? null : 
                                <Link href={accountData.bill_generated} target='_blank' className="btn outline second">
                                    Baixar PDF 
                                </Link> 
                            }
                            {accountData.bill_generated == null && 
                                <button className="btn outline second disabledAccount" disabled>
                                    Fatura não gerada
                                </button>
                            }
                            {/* {accountData.payment_status == 'Vencido' && 
                                <button className={`btn outline isDelayAccount`} onClick={() => sendTrade(accountData.id)}>Negociar</button>
                            } */}
                        </div>
                    </div>
                    <div className={styles.economyDetails}>
                        <div className={styles.title}>
                            <h2>Economia woltz</h2>
                        </div>
                        <div className={styles.cards}>
                            <div className={`${styles.card} ${styles.outline}`}>
                                <p>Fatura Woltz</p>
                                <h3>R$ {value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                            </div>
                            <div className={`${styles.card}`}>
                                <p>Desconto na energia</p>
                                <h3>{Number(accountData.installation_data.agent_discount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}  %</h3>
                            </div>
                            <div className={`${styles.card}`}>
                                <p>Economia</p>
                                <h3>R$ {Number(accountData.amount_saved).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                            </div>
                        </div>
                    </div>
                    <Toast ref={toast} position="bottom-right"/>
                </div>
            </div>
        </LoaderPage>
    )
}