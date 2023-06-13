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

type ToastMessage = {
    title: string,
    msg: string,
    type: 'success' | 'error' | 'info' | 'warn',
    time?:number
}

const PaymentStatus = {
    '0': 'Aberto',
    '1': 'Aprovação',
    '2': 'Aguardando',
    '3': 'Pago',
    '4': 'Vencido'
  };

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


export const ListAccounts = ({date,billsData}:any) => {
    const { control, handleSubmit, setValue } = useForm()
    const { setTabNumber, tabNumberIndex } = useTabNumber()
    const [ displayResponsive, setDisplayResponsive ] = useState(false);
    const toast = useRef<Toast>(null);
    const [ isAccounts, setIsAccounts ] = useState<any>([])
    const [ isLoader, setIsLoader ] = useState(false)
    const {setBills, bills} = useBills()
    useEffect(() => {
        setBills(billsData)
    },[billsData])

    let data2022 = [
        {
            id:'01',
            mes: 'Jan/2022',
            title: 'Janeiro 2022',
            valor: '26,90',
            vencimento: '04/01/2023',
            consumo: '40',
            status: 'Em aberto',
            qr_code: '/images/qrcode.png',
            cod_barra: '5452145421215454',
            pdf: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
            fatura_dist: '608,33',
            fatura_woltz: '232,70',
            total: '1.141,03',
            desconto_energia: '6,12%',
            economia: '13,56',
            desconto_conta: '1,17%',
            active: false,
        },
        {
            id:'02',
            mes: 'Fev/2022',
            title: 'Fevereiro 2022',
            valor: '26,90',
            vencimento: '04/01/2023',
            consumo: '40',
            status: 'Em atraso',
            qr_code: '',
            cod_barra: '5452145421215454',
            pdf: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
            fatura_dist: '608,33',
            fatura_woltz: '232,70',
            total: '1.141,03',
            desconto_energia: '6,12%',
            economia: '13,56',
            desconto_conta: '1,17%',
            active: false,
        },
        {
            id:'03',
            mes: 'Mar/2022',
            title: 'Março 2022',
            valor: '26,90',
            vencimento: '04/01/2023',
            consumo: '40',
            status: 'Paga',
            qr_code: '',
            cod_barra: '5452145421215454',
            pdf: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
            fatura_dist: '608,33',
            fatura_woltz: '232,70',
            total: '1.141,03',
            desconto_energia: '6,12%',
            economia: '13,56',
            desconto_conta: '1,17%',
            active: false,
        },
        {
            id:'04',
            mes: 'Abril/2022',
            title: 'Abril 2022',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'05',
            mes: 'Maio/2022',
            title: 'Maio 2022',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'06',
            mes:'Jun/2022',
            title: 'Junho 2022',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'07',
            mes: 'Jul/2022',
            title: 'Julho 2022',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'08',
            mes: 'Ago/2022',
            title: 'Agosto 2022',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'09',
            mes: 'Set/2022',
            title: 'Setembro 2022',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'10',
            mes: 'Out/2022',
            title: 'Outubro 2022',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'11',
            mes: 'Nov/2022',
            title: 'Novembro 2022',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'12',
            mes: 'Dez/2022',
            title: 'Dezembro 2022',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
    ]
    let data2023 = [
        {
            id:'01',
            mes: 'Jan/2023',
            title: 'Janeiro 2023',
            valor: '26,90',
            vencimento: '04/01/2023',
            consumo: '40',
            status: 'Em aberto',
            qr_code: '/images/qrcode.png',
            cod_barra: '5452145421215454',
            pdf: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
            fatura_dist: '608,33',
            fatura_woltz: '232,70',
            total: '1.141,03',
            desconto_energia: '6,12%',
            economia: '13,56',
            desconto_conta: '1,17%',
            active: false,
        },
        {
            id:'02',
            mes: 'Fev/2023',
            title: 'Fevereiro 2023',
            valor: '26,90',
            vencimento: '04/01/2023',
            consumo: '40',
            status: 'Em atraso',
            qr_code: '',
            cod_barra: '5452145421215454',
            pdf: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
            fatura_dist: '608,33',
            fatura_woltz: '232,70',
            total: '1.141,03',
            desconto_energia: '6,12%',
            economia: '13,56',
            desconto_conta: '1,17%',
            active: false,
        },
        {
            id:'03',
            mes: 'Mar/2023',
            title: 'Março 2023',
            valor: '26,90',
            vencimento: '04/01/2023',
            consumo: '40',
            status: 'Paga',
            qr_code: '',
            cod_barra: '5452145421215454',
            pdf: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
            fatura_dist: '608,33',
            fatura_woltz: '232,70',
            total: '1.141,03',
            desconto_energia: '6,12%',
            economia: '13,56',
            desconto_conta: '1,17%',
            active: false,
        },
        {
            id:'04',
            mes: 'Abril/2023',
            title: 'Abril 2023',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'05',
            mes: 'Maio/2023',
            title: 'Maio 2023',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'06',
            mes:'Jun/2023',
            title: 'Junho 2023',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'07',
            mes: 'Jul/2023',
            title: 'Julho 2023',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'08',
            mes: 'Ago/2023',
            title: 'Agosto 2023',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'09',
            mes: 'Set/2023',
            title: 'Setembro 2023',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'10',
            mes: 'Out/2023',
            title: 'Outubro 2023',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'11',
            mes: 'Nov/2023',
            title: 'Novembro 2023',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
        {
            id:'12',
            mes: 'Dez/2023',
            title: 'Dezembro 2023',
            valor: '',
            vencimento: '',
            consumo: '',
            status: '',
            qr_code: '',
            cod_barra: '',
            pdf: '',
            fatura_dist: '',
            fatura_woltz: '',
            total: '',
            desconto_energia: '',
            economia: '',
            desconto_conta: '',
            active: true,
        },
    ]

    const ToastMessage = ({title, msg, type, time = 3000}:ToastMessage) => {
        toast?.current?.show({severity:type, summary: title, detail: msg, life: time});
    }

    useEffect(() => {
        setValue('filterYear', date)
        setIsAccounts(data2023)
    },[date])

    const copyValue = (value:any) => {
        copy(value);
        ToastMessage({
            title:'Código de barras copiado', 
            msg: `${value}`, 
            type: 'success'
        })
    }

    const filterAccounts = (data:any) => {
        console.log(data)
        setIsLoader(true)
        if(data.filterYear == 2023) {
            setIsAccounts(data2023)
        }
        if(data.filterYear == 2022) {
            setIsAccounts(data2022)
        }
        setTimeout(() => {
            setIsLoader(false)
        }, 2000);
    }

    return (
        <>
            <div className={styles.installation}>
                <div className={styles.textArea}>
                    <span><strong>Instalação N°:</strong> 1515525154515</span>
                    <span><strong>Endereço:</strong> Rua paulo matos 1500 Cx 1</span>
                </div>
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
                {!isLoader &&
                    <TabView activeIndex={tabNumberIndex} onTabChange={(e) => setTabNumber(e.index)} className='tabView'>
                        {bills.map((item:any) => {
                                let data = new Date(item.generation_month.reference)
                                let year = data.getFullYear()
                                let month = data.getMonth()
                                let value = Number(item.value)
                                let dueDate = new Date(item.due_date)
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
                                                        {/* <button className={`btn rounded disable status ${status == 'Em aberto' ? 'isOpen' : status == 'Em atraso' ? 'isDelay' : status == 'Paga' ? 'isPay' : '' }`}> */}
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
                                            {/* <Dialog header="QR-code" visible={displayResponsive} onHide={() => setDisplayResponsive(false)} breakpoints={{'960px': '30vw'}} style={{width: '30vw'}} className={'modalQrCode'}>
                                                <Image src={qr_code} alt='qrcode' width={450} height={450}/>
                                            </Dialog> */}
                                        </div>
                                    </TabPanel>
                                )
                            })
                        }
                    </TabView>
                }
            </div>
            <Toast ref={toast} position="bottom-right"/>
        </>
    )
}