'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { api } from '@/utils'
import Link from 'next/link'
import copy from 'copy-to-clipboard'
import { Toast } from 'primereact/toast'
import { ClientDetails } from '@/components/ClientDetails'
import { useParams } from 'next/navigation'
import { LoaderPage } from '@/components/LoaderPage'
import { useLoaderPage } from '@/store/loaderPage'
import { useFilterYear } from '@/store/filterYear'

type ToastMessage = {
    title: string,
    msg: string,
    type: 'success' | 'error' | 'info' | 'warn',
    time?:number
}

const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

interface Account {

}

export const Account = ({ accountData }: { accountData: any }) => {
    const { accountYear, accountMonth } = useParams()
    const { setLoaderPage } = useLoaderPage()
    const { yearController } = useFilterYear()
    const toast = useRef<Toast>(null);
    const ToastMessage = ({title, msg, type, time = 3000}:ToastMessage) => {
        toast?.current?.show({severity:type, summary: title, detail: msg, life: time});
    }

    let data = new Date(accountData?.generation_month?.reference)
    let year = data?.getFullYear()
    let month = data?.getMonth()
    let value = Number(accountData?.value)
    let dueDate = new Date(accountData?.due_date)
    let totalAccount = Number(accountData.total_amount_distributor) + value
    let accountDiscount = Number(accountData.amount_saved) / Number(accountData.total_amount_without_discount)

    useEffect(() => { setLoaderPage(true) }, [])
    useEffect(() => {
        if(!accountData) return
        setLoaderPage(false)
        console.log(accountData) 
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
                                {accountData.payment_status == 'Aprovação' && <button className={`btn rounded disable status isDelay`}>{accountData.payment_status}</button>}
                                {accountData.payment_status == 'Aguardando' && <button className={`btn rounded disable status isDelay`}>{accountData.payment_status}</button>}
                                {accountData.payment_status == 'Pago' && <button className={`btn rounded disable status isPay`}>{accountData.payment_status}</button>}
                                {accountData.payment_status == 'Vencido' && <button className={`btn rounded disable status isOpen`}>{accountData.payment_status}</button>}
                            </div>
                        </div>
                        <div className={styles.actions}>
                            {/* <button className="btn default primary" onClick={() => setDisplayResponsive(true)}>
                                Pagar com PIX
                            </button> */}
                            {/* <button className="btn outline second" value={123456789} onClick={() => copyValue(123456789)} >
                                Código de barras
                            </button> */}
                            {/* <button className="btn outline second">
                                Enviar por e-mail
                            </button> */}
                            {accountData.bill_generated != null && 
                                <Link href={accountData.bill_generated} target='_blank' className="btn outline second">
                                    Baixar PDF
                                </Link>
                            }
                            {accountData.bill_generated == null && 
                                <button className="btn outline second disabledAccount" disabled>
                                    Fatura não gerada
                                </button>
                            }
                        </div>
                    </div>
                    <div className={styles.economyDetails}>
                        <div className={styles.title}>
                            <h2>Economia woltz</h2>
                        </div>
                        <div className={styles.cards}>
                            <div className={`${styles.card} ${styles.outline}`}>
                                <p>Fatura distribuidora</p>
                                <h3>R$ {accountData.total_amount_distributor}</h3>
                            </div>
                            <div className={`${styles.card} ${styles.outline}`}>
                                <p>Fatura Woltz</p>
                                <h3>R$ {value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                            </div>
                            <div className={`${styles.card} ${styles.outline}`}>
                                <p>Fatura Total</p>
                                <h3>R$ {totalAccount.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                            </div>
                            <div className={`${styles.card}`}>
                                <p>Desconto na energia</p>
                                <h3>{Number(accountData.installation_data.agent_discount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}  %</h3>
                            </div>
                            <div className={`${styles.card}`}>
                                <p>Economia</p>
                                <h3>R$ {Number(accountData.amount_saved).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                            </div>
                            <div className={`${styles.card}`}>
                                <p>Desconto na conta</p>
                                <h3> 
                                    {Number(accountData.total_amount_without_discount) == 0 && '0'} 
                                    {Number(accountData.total_amount_without_discount) >= 1 && Number(accountDiscount.toFixed(2))} 
                                    %   
                                </h3>
                            </div>
                        </div>
                    </div>
                    <Toast ref={toast} position="bottom-right"/>
                </div>
            </div>
        </LoaderPage>
    )
}