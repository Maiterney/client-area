'use client'
import moment from 'moment'
import styles from './styles.module.scss'
import { useFilterYear } from '@/store'
import Link from 'next/link'
 
export const AccountDetails = ({data, item}:any) => {
    const { yearController } = useFilterYear()
    let value = Number(data.value)
    let dueDate = new Date(data.due_date)
    let cvtDueDate = dueDate.setDate(dueDate.getDate() + 1)
    let convertDate = new Date(cvtDueDate)
    let dateNow = moment()
    let dueDateAccount = moment(data.due_date)
    let days = dateNow.diff(dueDateAccount, 'days');

    const sendTrade = (id:any) => {
        // console.log(id)
    }

    return (
        <div className={styles.accountDetails}>
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
                    {data.bill_generated != null ?
                        data.payment_status == 'Vencido' && days >= 60 ? null : 
                        <Link href={data.bill_generated} target='_blank' className="btn outline second">
                            Baixar PDF 
                        </Link> : null
                    }
                    {data.bill_generated == null && 
                        <button className="btn outline second disabledAccount" disabled>
                            Fatura não gerada
                        </button>
                    }
                    {/* {data.payment_status == 'Vencido' && 
                        <button className={`btn outline isDelayAccount`} onClick={() => sendTrade(data.id)}>Negociar</button>
                    } */}
                    
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
    )
}