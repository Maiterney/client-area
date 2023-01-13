import { Accordion, AccordionTab } from 'primereact/accordion'
import { TabPanel, TabView } from 'primereact/tabview'
import { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';
import styles from './styles.module.scss'
import { useDataContext } from '../../context/DataContext';
import Router from 'next/router'
 
export default function HistoricComponent (){
    const { setMouthAccount } = useDataContext()
    const [ isAccounts, setIsAccounts ] = useState([
        {
            id:'01',
            mes: 'Jan/2022',
            title: 'Janeiro 2022',
            valor: '26,90',
            vencimento: '04/01/2023',
            consumo: '40',
            status: 'Em aberto',
            qr_code: '',
            cod_barra: '5452145421215454',
            pdf: '#',
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
            pdf: '#',
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
            pdf: '#',
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
            status: 'Não disponível',
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
            status: 'Não disponível',
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
            status: 'Não disponível',
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
            status: 'Não disponível',
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
            status: 'Não disponível',
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
            status: 'Não disponível',
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
            status: 'Não disponível',
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
            status: 'Não disponível',
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
            status: 'Não disponível',
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
    ])
    const [ isPayAccounts, setIsPayAccounts ] = useState([])
    const [ isNotPayAccounts, setNotPayAccounts ] = useState([])

    const [isKWh, setIsKWh] = useState({
        labels: ['Janeiro', 'Fevereiro ', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
            {
                backgroundColor: ["#00FF66", '#FF9900', '#FF0000'],
                borderWidth: 0,
                borderColor:'transparent',
                data: [65, 20, 92],
                maxBarThickness: 30,
                borderRadius: 5
            }
        ]
    });
    const [isR$, setIsR$] = useState({
        labels: ['Janeiro', 'Fevereiro ', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
            {
                backgroundColor: ["#00FF66", '#FF9900', '#FF0000'],
                borderWidth: 0,
                borderColor:'transparent',
                data: [65, 20, 92],
                maxBarThickness: 30,
                borderRadius: 5
            }
        ]
    });

    const RouteAccount = (month:number) => {
        setMouthAccount(month)
        Router.push('/accounts')
    }


    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1.2,
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        return {
            basicOptions
        }
    }
    const { basicOptions } = getLightTheme();

    useEffect(() => {
        if(!isAccounts) return
        /* @ts-ignore */
        setIsPayAccounts(isAccounts.filter((item:any) => item?.status == 'Paga'))
        /* @ts-ignore */
        setNotPayAccounts(isAccounts.filter((item:any) => item?.status != 'Paga' && item?.status != 'Não disponível'))
        
    },[isAccounts])

    return (
        <div className={styles.historic}>
            <div className={styles.clientDetails}>
                <h2>Bom dia, Maria</h2>
                <span className={styles.protocol}>
                    <strong>N° do protocolo</strong> 1515525154515
                </span>
            </div>
            <div className={styles.installation}>
                <span><strong>Instalação N°:</strong> 1515525154515</span>
                <span><strong>Endereço:</strong> Rua paulo matos 1500 Cx 1</span>
            </div>
            <div className={styles.historicTab}>
                <TabView className='tabView historicTab'>
                    <TabPanel header="Histórico de conta">
                        {isAccounts ? 
                            isAccounts.map((item:any) => {
                                const { id, mes, title, valor, vencimento, consumo, status, fatura_dist, fatura_woltz, total, desconto_energia, economia, desconto_conta, active } = item;
                                return (
                                    <Accordion className={`accordion ${styles.accordion}`} key={id}>
                                        <AccordionTab disabled={active} header={
                                            <div className={styles.title}>
                                                <div className={styles.text}>
                                                    <span className={styles.data}>{title}</span>
                                                    <span className={styles.value}>{valor ? `R$ ${valor}` : ''} </span>
                                                    <span className={styles.consumption}>{consumo ? `${consumo}KWh` : ''}</span>
                                                </div>
                                                <span className={`${styles.status} statusText ${status == 'Em aberto' ? 'isOpen' : status == 'Em atraso' ? 'isDelay' : status == 'Paga' ? 'isPay' : '' }`}>{status}</span>
                                            </div>
                                        }>
                                            <div className={styles.buttonsAccordion}>
                                                {status == 'Paga'
                                                ? 
                                                    ''
                                                :
                                                    <button className="btn default primary" onClick={() => RouteAccount(id - 1)}>
                                                        Pagar conta
                                                    </button>
                                                }
                                                <button className="btn outline primary" onClick={() => RouteAccount(id - 1)}>
                                                    Mais detalhes
                                                </button>
                                            </div>
                                        </AccordionTab>
                                    </Accordion>
                                )
                            })
                        : 
                            <h3>Não a contas</h3>
                        }
                    </TabPanel>
                    <TabPanel header="Débitos">
                        {isNotPayAccounts ? 
                            isNotPayAccounts.map((item:any) => {
                                const { id, mes, title, valor, vencimento, consumo, status, fatura_dist, fatura_woltz, total, desconto_energia, economia, desconto_conta, active } = item;
                                return (
                                    <Accordion className={`accordion ${styles.accordion}`} key={id}>
                                        <AccordionTab disabled={active} header={
                                            <div className={styles.title}>
                                                <div className={styles.text}>
                                                    <span className={styles.data}>{title}</span>
                                                    <span className={styles.value}>{valor ? `R$ ${valor}` : ''} </span>
                                                    <span className={styles.consumption}>{consumo ? `${consumo}KWh` : ''}</span>
                                                </div>
                                                <span className={`${styles.status} statusText ${status == 'Em aberto' ? 'isOpen' : status == 'Em atraso' ? 'isDelay' : status == 'Paga' ? 'isPay' : '' }`}>{status}</span>
                                            </div>
                                        }>
                                            <div className={styles.buttonsAccordion}>
                                                {status == 'Paga'
                                                ? 
                                                    ''
                                                :
                                                    <button className="btn default primary" onClick={() => RouteAccount(id - 1)}>
                                                        Pagar conta
                                                    </button>
                                                }
                                                <button className="btn outline primary" onClick={() => RouteAccount(id - 1)}>
                                                    Mais detalhes
                                                </button>
                                            </div>
                                        </AccordionTab>
                                    </Accordion>
                                )
                            })
                        : 
                            <h3>Não a contas</h3>
                        }
                    </TabPanel>
                    <TabPanel header="Pagos">
                        {isPayAccounts ? 
                            isPayAccounts.map((item:any) => {
                                const { id, mes, title, valor, vencimento, consumo, status, fatura_dist, fatura_woltz, total, desconto_energia, economia, desconto_conta, active } = item;
                                return (
                                    <Accordion className={`accordion ${styles.accordion}`} key={id}>
                                        <AccordionTab disabled={active} header={
                                            <div className={styles.title}>
                                                <div className={styles.text}>
                                                    <span className={styles.data}>{title}</span>
                                                    <span className={styles.value}>{valor ? `R$ ${valor}` : ''} </span>
                                                    <span className={styles.consumption}>{consumo ? `${consumo}KWh` : ''}</span>
                                                </div>
                                                <span className={`${styles.status} statusText ${status == 'Em aberto' ? 'isOpen' : status == 'Em atraso' ? 'isDelay' : status == 'Paga' ? 'isPay' : '' }`}>{status}</span>
                                            </div>
                                        }>
                                            <div className={styles.buttonsAccordion}>
                                                {status == 'Paga'
                                                ? 
                                                    ''
                                                :
                                                    <button className="btn default primary" onClick={() => RouteAccount(id - 1)}>
                                                        Pagar conta
                                                    </button>
                                                }
                                                <button className="btn outline primary" onClick={() => RouteAccount(id - 1)}>
                                                    Mais detalhes
                                                </button>
                                            </div>
                                        </AccordionTab>
                                    </Accordion>
                                )
                            })
                        : 
                            <h3>Não a contas</h3>
                        }
                    </TabPanel>
                </TabView>
            </div>
            <div className={styles.historicCharts}>
                <TabView className='tabView historicTab'>
                    <TabPanel header="KWh">
                        <Chart type="bar" data={isKWh} options={basicOptions} />
                    </TabPanel>
                    <TabPanel header="R$">
                        <Chart type="bar" data={isR$} options={basicOptions} />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    )
}