'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { TabView, TabPanel } from 'primereact/tabview';
import { Dialog } from 'primereact/dialog';
import copy from "copy-to-clipboard"; 
import { Toast } from 'primereact/toast'
import { SkeletonAccount } from '../SkeletonAccounts/index'
import { useTabNumber } from '@/store/tabAccount'
import { useBills } from '@/store/bills'
import { api } from '@/utils'
import { useParams } from 'next/navigation'
import { useInstallations } from '@/store/installations'
import { InstallationDetail } from '@/components/InstallationDetails'
import { SkeletonTabAccount } from '../SkeletonTabAccounts'
import { useListMouths } from '@/store/listMonths'
import { FilterYear } from '@/components/FilterYear'
import { useFilterYear } from '@/store/filterYear'

type ToastMessage = {
    title: string,
    msg: string,
    type: 'success' | 'error' | 'info' | 'warn',
    time?:number
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


export const ListAccounts = ({billsData, currentYear, currentMonth}:any) => {
    /* const { control, handleSubmit, setValue } = useForm() */
    const { installations } = useInstallations()
    const { setTabNumber, tabNumberIndex } = useTabNumber()
    const [ displayResponsive, setDisplayResponsive ] = useState(false);
    const { yearController, setYear } = useFilterYear()
    const toast = useRef<Toast>(null);
    const [ isLoader, setIsLoader ] = useState(true)
    const {setBills, bills} = useBills()
    const { listMonths } = useListMouths()

    useEffect(() => {
        setBills(billsData)
        setIsLoader(false)
        setTabNumber(Number(currentMonth))
        console.log(billsData)
    },[billsData])

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
        console.log(bills)
        // console.log(bills.filter((item:any) => bills))
    },[])


    return (
        <>
            <div className={styles.installation}>
                <InstallationDetail />
                <FilterYear />
            </div>
            <div className={styles.tabAccounts}>
                {yearController.loading || isLoader ? <SkeletonAccount /> : null}
                {!yearController.loading || !isLoader ?
                    <TabView activeIndex={tabNumberIndex} onTabChange={(e) => setTabNumber(e.index)} className='tabView' style={{width: '100%'}}>
                        {listMonths.map((item:any) => {
                            if(bills[item.month]) {
                                const data = bills[item.month]
                                let dataTime = new Date(data.generation_month.reference)
                                let year = dataTime.getFullYear()
                                let value = Number(data.value)
                                let dueDate = new Date(data.due_date)
                                let cvtDueDate = dueDate.setDate(dueDate.getDate() + 1)
                                let convertDate = new Date(cvtDueDate)
                                let totalAccount = Number(data.total_amount_distributor) + value
                                let accountDiscount = Number(data.amount_saved) / Number(data.total_amount_without_discount)
                                
                                return (
                                    <TabPanel header={item.label} key={item.label}>
                                        <div className={styles.tabContent}>
                                            <div className={styles.details}>
                                                <div className={styles.title}>
                                                    <h2>{item.label} {year}</h2>
                                                </div>
                                                <div className={styles.accountDetail}>
                                                    <div className={styles.value}>
                                                        <p>Valor</p>
                                                        <h3>R$ {value?.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                                                    </div>
                                                    <div className={styles.dueDate}>
                                                        <p>Vencimento</p>
                                                        <h3>{convertDate.toLocaleDateString()}</h3>
                                                    </div>
                                                    <div className={styles.consumption}>
                                                        <p>Consumo</p>
                                                        <h3>{data.injected_energy.toLocaleString('pt-br')}KWh</h3>
                                                    </div>
                                                    <div className={styles.status}>
                                                        {data.payment_status == 'Aberto' && <button className={`btn rounded disable status isOpen`}>{data.payment_status}</button>}
                                                        {data.payment_status == 'Aprovação' && <button className={`btn rounded disable status isDelay`}>{data.payment_status}</button>}
                                                        {data.payment_status == 'Aguardando' && <button className={`btn rounded disable status isDelay`}>{data.payment_status}</button>}
                                                        {data.payment_status == 'Pago' && <button className={`btn rounded disable status isPay`}>{data.payment_status}</button>}
                                                        {data.payment_status == 'Vencido' && <button className={`btn rounded disable status isOpen`}>{data.payment_status}</button>}
                                                        {/* <button className={`btn rounded disable status ${paymentStatus[Number(data.payment_status)].status}`}>
                                                            {paymentStatus[Number(data.payment_status)].label}
                                                        </button> */}
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
                                                    {data.bill_generated != null && 
                                                        <Link href={data.bill_generated} target='_blank' className="btn outline second">
                                                            Baixar PDF
                                                        </Link>
                                                    }
                                                    {data.bill_generated == null && 
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
                                                        <h3>R$ {data.total_amount_distributor}</h3>
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
                                                        <h3>{Number(data.installation_data.agent_discount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}  %</h3>
                                                    </div>
                                                    <div className={`${styles.card}`}>
                                                        <p>Economia</p>
                                                        <h3>R$ {Number(data.amount_saved).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                                                    </div>
                                                    <div className={`${styles.card}`}>
                                                        <p>Desconto na conta</p>
                                                        <h3> 
                                                            {Number(data.total_amount_without_discount) == 0 && '0'} 
                                                            {Number(data.total_amount_without_discount) >= 1 && Number(accountDiscount.toFixed(2))} 
                                                            %   
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </TabPanel>
                                )
                            } else {
                                return (
                                    <TabPanel header={item.label} key={item.label} disabled>
                                        <p style={{textAlign: 'center'}}>Não há conta nesse mês</p>
                                    </TabPanel>
                                )
                            }



                            /* if(item.data){
                                let data = new Date(item.data.generation_month.reference)
                                let year = data.getFullYear()
                                let value = Number(item.data.value)
                                let dueDate = new Date(item.data.due_date)
                                return (
                                    <TabPanel header={item.month} key={item.month}>
                                        <div className={styles.tabContent}>
                                            {month5 && <SkeletonTabAccount />}
                                            {!month5 &&
                                                <>
                                                    <div className={styles.details}>
                                                        <div className={styles.title}>
                                                            <h2>{item.month} {year}</h2>
                                                        </div>
                                                        <div className={styles.accountDetail}>
                                                            <div className={styles.value}>
                                                                <p>Valor</p>
                                                                <h3>R$ {value?.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                                                            </div>
                                                            <div className={styles.dueDate}>
                                                                <p>Vencimento</p>
                                                                <h3>{dueDate.toLocaleDateString('pt-BR')}</h3>
                                                            </div>
                                                            <div className={styles.consumption}>
                                                                <p>Consumo</p>
                                                                <h3>{item.data.injected_energy.toLocaleString('pt-br')}KWh</h3>
                                                            </div>
                                                            <div className={styles.status}>
                                                                <button className={`btn rounded disable status ${paymentStatus[Number(item.data.payment_status)].status}`}>
                                                                    {paymentStatus[Number(item.data.payment_status)].label}
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
                                                </>
                                            }
                                        </div>  
                                    </TabPanel>
                                )
                            } else {
                            } */
                        })
                        }
                        {/* {bills.map((item:any) => {
                            let data = new Date(item.generation_month.reference)
                            let year = data.getFullYear()
                            let month = data.getMonth()
                            let value = Number(item.value)
                            let dueDate = new Date(item.due_date)
                            console.log('item', item)
                            return (
                                <TabPanel header={months[month + 1]} key={item.id}>
                                    <div className={styles.tabContent}>
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
                                                    <h3>{item.injected_energy.toLocaleString('pt-br')}KWh</h3>
                                                </div>
                                                <div className={styles.status}>
                                                    <button className={`btn rounded disable status ${paymentStatus[Number(item.payment_status)].status}`}>
                                                        {paymentStatus[Number(item.payment_status)].label}
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
                                    </div>
                                </TabPanel>
                            )})
                        } */}
                    </TabView>
                    :
                    <div className={styles.emptyAccounts}>
                        <h2>Não há contas nesse período</h2>
                    </div>
                }
            </div>
            <Toast ref={toast} position="bottom-right"/>
        </>
    )
}