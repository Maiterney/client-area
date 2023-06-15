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
    const { control, handleSubmit, setValue } = useForm()
    const { installations } = useInstallations()
    const { setTabNumber, tabNumberIndex } = useTabNumber()
    const [ displayResponsive, setDisplayResponsive ] = useState(false);
    const toast = useRef<Toast>(null);
    const [ isLoader, setIsLoader ] = useState(true)
    const {setBills, bills} = useBills()
    const { installation } = useParams()
    const { listMonths } = useListMouths()
    const [ months, setMonths ] = useState([
        {
            label: 'janeiro',
            month: 1
        }, 
        {
            label: 'Fevereiro',
            month: 2
        }, 
        {
            label: 'março',
            month: 3
        }, 
        {
            label: 'abril',
            month: 4
        }, 
        {
            label: 'maio',
            month: 5
        }, 
        {
            label: 'junho',
            month: 6
        }, 
        {
            label: 'julho',
            month: 7
        }, 
        {
            label: 'agosto',
            month: 8
        }, 
        {
            label: 'setembro',
            month: 9
        }, 
        {
            label: 'outubro',
            month: 10
        }, 
        {
            label: 'novembro',
            month: 11
        }, 
        {
            label: 'dezembro',
            month: 12
        }, 
    ])

    useEffect(() => {
        setBills(billsData)
        setIsLoader(false)
        setTabNumber(Number(currentMonth))
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

    const filterAccounts = async (data:any) => {
        setIsLoader(true)
        await api.get(`/user/bills?installation=${installation}&year=${data.filterYear}`).then(res => { 
            setBills(res.data.data.bills) 
        }).catch(err => { 
            console.log(err); setBills([]) 
        }).finally(() => {
            setIsLoader(false)
        })
    }

    const tabClick = async (index:any) => {
        // console.log('click', index)
        setTabNumber(index)
    }

    return (
        <>
            <div className={styles.installation}>
                <InstallationDetail />
                <div className={styles.filter}>
                    <form onChange={handleSubmit(filterAccounts)}>
                        <div className={styles.formController}>
                            <div className={styles.formRow}>
                                <Controller 
                                    name="filterYear" 
                                    control={control}
                                    defaultValue={''}
                                    rules={{ required: false }}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <div className={`${styles.formGroup}`}>
                                                <label htmlFor={field.name}> Selecione o ano: </label>
                                                <select id={field.name} {...field} value={field.value}>
                                                    <option value="2023">2023</option>
                                                    <option value="2022">2022</option>
                                                </select>
                                            </div>
                                        )
                                    }} 
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className={styles.tabAccounts}>
                {isLoader && <SkeletonAccount />}
                {!isLoader ?
                    <TabView activeIndex={tabNumberIndex} onTabChange={(e) => tabClick(e.index)} className='tabView'>
                        {listMonths.map((item:any) => {
                            if(bills[item.month]) {
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
                                                        <button className={`btn rounded disable status ${paymentStatus[Number(data.payment_status)].status}`}>
                                                            {paymentStatus[Number(data.payment_status)].label}
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
                                                        <h3>R${value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                                                    </div>
                                                    <div className={`${styles.card}`}>
                                                        <p>Desconto na energia</p>
                                                        <h3>6,12%</h3>
                                                    </div>
                                                    <div className={`${styles.card}`}>
                                                        <p>Economia</p>
                                                        <h3>R$ {economy.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                                                    </div>
                                                    <div className={`${styles.card}`}>
                                                        <p>Desconto na conta</p>
                                                        <h3>1,17%</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </TabPanel>
                                )
                            } else {
                                return (
                                    <TabPanel header={item.label} key={item.label} disabled>
                                        <p>Não há conta nesse mês</p>
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