'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useTabNumber, useBills, useListMouths, useFilterYear, useLoaderPage, useTradeAccount } from '@/store'
import { TabView, TabPanel } from 'primereact/tabview';
import copy from "copy-to-clipboard"; 
import { Toast } from 'primereact/toast'
import { SkeletonAccount } from '../SkeletonAccounts/index'
import { InstallationDetail } from '@/components/InstallationDetails'
import { FilterYear } from '@/components/FilterYear'
import { LoaderPage } from '@/components/LoaderPage';
import { useMediaQuery } from '@/hooks/use-media-query';
import { AlertAccount } from '@/components/AlertAccount';
import styles from './styles.module.scss'

type ToastMessage = {
    title: string,
    msg: string,
    type: 'success' | 'error' | 'info' | 'warn',
    time?:number
}

export const ListAccounts = ({currentMonth}:any) => {
    const { setTabNumber, tabNumberIndex } = useTabNumber()
    const { setTradeAccount } = useTradeAccount()
    const { setLoaderPage } = useLoaderPage()
    const { yearController } = useFilterYear()
    const [ isLoader, setIsLoader ] = useState(true)
    const { bills} = useBills()
    const { listMonths } = useListMouths()
    const responsive = useMediaQuery(769)
    const toast = useRef<Toast>(null);

    useEffect(() => { setLoaderPage(true) }, [])

    useEffect(() => {
        if(!bills) return
        setIsLoader(false)
        setLoaderPage(false)
        setTabNumber(Number(currentMonth))
    },[currentMonth, bills])

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
    return (
        <LoaderPage>
            <AlertAccount />
            <div className={styles.installation}>
                <InstallationDetail />
                <FilterYear />
            </div>
            
            <div className={styles.tabAccounts}>
                {yearController.loading || isLoader ? <SkeletonAccount /> : null}
                {!yearController.loading || !isLoader ?
                    <TabView scrollable={responsive} activeIndex={tabNumberIndex} onTabChange={(e) => setTabNumber(e.index)} className='tabView' style={{width: '100%'}}>
                        {bills ? 
                            listMonths.map((item:any) => {
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
                                                        <h2>{item.label} {yearController.year}</h2>
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
                                                            {data.payment_status == 'Aprovação' && <button className={`btn rounded disable status isOpen`}>{data.payment_status}</button>}
                                                            {data.payment_status == 'Aguardando' && <button className={`btn rounded disable status isOpen`}>{data.payment_status}</button>}
                                                            {data.payment_status == 'Pago' && <button className={`btn rounded disable status isPay`}>{data.payment_status}</button>}
                                                            {data.payment_status == 'Vencido' && <button className={`btn rounded disable status isDelay`}>{data.payment_status}</button>}
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
                                                        {data.payment_status == 'Vencido' && 
                                                            <button className={`btn outline isDelayAccount`} onClick={() => setTradeAccount(true)}>Negociar</button>
                                                        }
                                                        
                                                    </div>
                                                </div>
                                                <div className={styles.economyDetails}>
                                                    <div className={styles.title}>
                                                        <h2>Dados da fatura</h2>
                                                    </div>
                                                    <div className={styles.cards}>
                                                        {/* <div className={`${styles.card} ${styles.outline}`}>
                                                            <p>Fatura distribuidora</p>
                                                            <h3>R$ {data.total_amount_distributor}</h3>
                                                        </div> */}
                                                        <div className={`${styles.card} `}>
                                                            <p>Fatura Woltz</p>
                                                            <h3>R$ {value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                                                        </div>
                                                        {/* <div className={`${styles.card} ${styles.outline}`}>
                                                            <p>Fatura Total</p>
                                                            <h3>R$ {totalAccount.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                                                        </div> */}
                                                        <div className={`${styles.card} ${styles.outline}`}>
                                                            <p>Desconto na energia</p>
                                                            <h3>{Number(data.installation_data.agent_discount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}  %</h3>
                                                        </div>
                                                        <div className={`${styles.card}`}>
                                                            <p>Economia</p>
                                                            <h3>R$ {Number(data.amount_saved).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                                                        </div>
                                                        {/* <div className={`${styles.card}`}>
                                                            <p>Desconto na conta</p>
                                                            <h3> 
                                                                {Number(data.total_amount_without_discount) == 0 && '0'} 
                                                                {Number(data.total_amount_without_discount) >= 1 && Number(accountDiscount.toFixed(2))} 
                                                                %   
                                                            </h3>
                                                        </div> */}
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
                            })
                        : <h3>Não a contas</h3>}
                    </TabView>
                    :
                    <div className={styles.emptyAccounts}>
                        <h2>Não há contas nesse período</h2>
                    </div>
                }
            </div>
            <Toast ref={toast} position="bottom-right"/>
        </LoaderPage>
    )
}