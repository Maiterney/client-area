'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { api } from '@/utils'
import Link from 'next/link'
import copy from 'copy-to-clipboard'
import { Toast } from 'primereact/toast'

type ToastMessage = {
    title: string,
    msg: string,
    type: 'success' | 'error' | 'info' | 'warn',
    time?:number
}

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

export const Account = ({ accountData }: { accountData: any }) => {
    const [ displayResponsive, setDisplayResponsive ] = useState(false);
    const toast = useRef<Toast>(null);
    const ToastMessage = ({title, msg, type, time = 3000}:ToastMessage) => {
        toast?.current?.show({severity:type, summary: title, detail: msg, life: time});
    }
    const copyValue = (value:any) => {
        copy(value);
        ToastMessage({
            title:'Código de barras copiado', 
            msg: `${value}`, 
            type: 'success'
        })
    }
    useEffect(() => {
        if(!accountData) return
        console.log(accountData) 
    }, [accountData])
    
    let data = new Date(accountData.generation_month.reference)
    let year = data?.getFullYear()
    let month = data?.getMonth()
    let value = Number(accountData?.value)
    let dueDate = new Date(accountData?.due_date)


    return (
        <div className={styles.account}>
            <div className={styles.details}>
                <div className={styles.title}>
                    <h2>{months[month + 1]} {year}</h2>
                </div>
                <div className={styles.accountDetail}>
                    <div className={styles.value}>
                        <p>Valor</p>
                        <h3>R$ {value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                    </div>
                    <div className={styles.dueDate}>
                        <p>Vencimento</p>
                        <h3>{dueDate.toLocaleDateString('pt-BR')}</h3>
                    </div>
                    <div className={styles.consumption}>
                        <p>Consumo</p>
                        <h3>{accountData.injected_energy.toLocaleString('pt-br')}KWh</h3>
                    </div>
                    <div className={styles.status}>
                        {/* <button className={`btn rounded disable status ${status == 'Em aberto' ? 'isOpen' : status == 'Em atraso' ? 'isDelay' : status == 'Paga' ? 'isPay' : '' }`}> */}
                        <button className={`btn rounded disable status ${paymentStatus[Number(accountData.payment_status)].status}`}>
                            {paymentStatus[Number(accountData.payment_status)].label}
                        </button>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button className="btn default primary" onClick={() => setDisplayResponsive(true)}>
                        Pagar com PIX
                    </button>
                    <button className="btn outline second" value={123456789} onClick={() => copyValue(123456789)} >
                        Código de barras
                    </button>
                    <button className="btn outline second">
                        Enviar por e-mail
                    </button>
                    <Link href={'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png'} target='_blank' className="btn outline second">
                        Baixar PDF
                    </Link>
                </div>
            </div>
            <div className={styles.economyDetails}>
                <div className={styles.title}>
                    <h2>Economia woltz</h2>
                </div>
                <div className={styles.cards}>
                    <div className={`${styles.card} ${styles.outline}`}>
                        <p>Fatura distribuidora</p>
                        <h3>R$ 608,33</h3>
                    </div>
                    <div className={`${styles.card} ${styles.outline}`}>
                        <p>Fatura Woltz</p>
                        <h3>R$ 232,70</h3>
                    </div>
                    <div className={`${styles.card} ${styles.outline}`}>
                        <p>Fatura Total</p>
                        <h3>R$ 1.141,03</h3>
                    </div>
                    <div className={`${styles.card}`}>
                        <p>Desconto na energia</p>
                        <h3>6,12%</h3>
                    </div>
                    <div className={`${styles.card}`}>
                        <p>Economia</p>
                        <h3>R$ 13,56</h3>
                    </div>
                    <div className={`${styles.card}`}>
                        <p>Desconto na conta</p>
                        <h3>1,17%</h3>
                    </div>
                </div>
            </div>
            <Toast ref={toast} position="bottom-right"/>
        </div>
    )
}