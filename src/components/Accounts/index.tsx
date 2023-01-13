import Link from 'next/dist/client/link';
import { TabView, TabPanel } from 'primereact/tabview';
import { useEffect, useRef, useState } from 'react';
import copy from "copy-to-clipboard"; 
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import styles from './styles.module.scss'
import Image from 'next/dist/client/image';
import { useRouteState } from '../../hooks/use-route-state';
import { useDataContext } from '../../context/DataContext';
 
export default function AccountsComponent (){
    const { mouthAccount, setMouthAccount } = useDataContext()
    const [ displayResponsive, setDisplayResponsive ] = useState(false);
    const [ position, setPosition ] = useState('center');
    const [ isFilterAccounts, setIsFilterAccounts ] = useState('')
    const [ isAccounts, setIsAccounts ] = useState([
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
    ])

    const toast = useRef<any>(null);
    const filterInput = useRef<HTMLSelectElement>(null)

    const dialogFuncMap = {
        'displayResponsive': setDisplayResponsive,
    }

    const onClick = (name:any, position:any) => {
        /* @ts-ignore */
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name:any) => {
        /* @ts-ignore */
        dialogFuncMap[`${name}`](false);
    }

    const showSuccess = (title:string, msg:string) => {
        toast.current.show({severity:'success', summary: title, detail: msg, life: 3000});
    }

    const copyValue = (value:any) => {
        copy(value);
        showSuccess('Código de barras copiado', value)
    }

    useEffect(() => {
        let date = new Date();
        let currentYear = date.getFullYear()
        setIsFilterAccounts(`${currentYear}`)
    },[])


    useEffect(() => {
        console.log(isFilterAccounts)
    },[isFilterAccounts])


    return (
        <div className={styles.accountsComponent}>
            <div className={styles.clientDetails}>
                <h2>Bom dia, Maria</h2>
                <span className={styles.protocol}>
                    <strong>N° do protocolo</strong> 1515525154515
                </span>
            </div>
            <div className={styles.installation}>
                <div className={styles.textArea}>
                    <span><strong>Instalação N°:</strong> 1515525154515</span>
                    <span><strong>Endereço:</strong> Rua paulo matos 1500 Cx 1</span>
                </div>
                <div className={styles.filter}>
                    <form>
                        <div className="formController">
                            <div className="formRow">
                                <div className={`formGroup ${styles.formGroup}`}>
                                    <label htmlFor=""> Selecione o ano:</label>
                                    <select ref={filterInput} name="filterYear" onChange={(e:any) => setIsFilterAccounts(e.target.value)} value={isFilterAccounts}>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className={styles.tabAccounts}>
                <TabView activeIndex={mouthAccount} onTabChange={(e) => setMouthAccount(e.index)} className='tabView'>
                    {isAccounts ? 
                        isAccounts.map((item:any) => {
                            const { id, mes, title, valor, vencimento, consumo, status, fatura_dist, fatura_woltz, total, desconto_energia, economia, desconto_conta, cod_barra, pdf, qr_code, active } = item
                            return (
                                <TabPanel header={mes} key={id} disabled={active}>
                                    <div className={styles.tabContent}>
                                        <div className={styles.details}>
                                            <div className={styles.title}>
                                                <h2>{title}</h2>
                                            </div>
                                            <div className={styles.accountDetail}>
                                                <div className={styles.value}>
                                                    <p>Valor</p>
                                                    <h3>R$ {valor}</h3>
                                                </div>
                                                <div className={styles.dueDate}>
                                                    <p>Vencimento</p>
                                                    <h3>{vencimento}</h3>
                                                </div>
                                                <div className={styles.consumption}>
                                                    <p>Consumo</p>
                                                    <h3>{consumo}KWh</h3>
                                                </div>
                                                <div className={styles.status}>
                                                    <button className={`btn rounded disable status ${status == 'Em aberto' ? 'isOpen' : status == 'Em atraso' ? 'isDelay' : status == 'Paga' ? 'isPay' : '' }`}>
                                                        {status}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={styles.actions}>
                                                {/* @ts-ignore */}
                                                <button className="btn default primary" onClick={() => onClick('displayResponsive')}>
                                                    Pagar com PIX
                                                </button>
                                                <button className="btn outline second" value={cod_barra} onClick={() => copyValue(cod_barra)} >
                                                    Código de barras
                                                </button>
                                                <button className="btn outline second">
                                                    Enviar por e-mail
                                                </button>
                                                <Link href={pdf} target='_blank' className="btn outline second">
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
                                                    <h3>R$ {fatura_dist}</h3>
                                                </div>
                                                <div className={`${styles.card} ${styles.outline}`}>
                                                    <p>Fatura Woltz</p>
                                                    <h3>R$ {fatura_woltz}</h3>
                                                </div>
                                                <div className={`${styles.card} ${styles.outline}`}>
                                                    <p>Fatura Total</p>
                                                    <h3>R$ {total}</h3>
                                                </div>
                                                <div className={`${styles.card}`}>
                                                    <p>Desconto na energia</p>
                                                    <h3>R$ {desconto_energia}</h3>
                                                </div>
                                                <div className={`${styles.card}`}>
                                                    <p>Economia</p>
                                                    <h3>R$ {economia}</h3>
                                                </div>
                                                <div className={`${styles.card}`}>
                                                    <p>Desconto na conta</p>
                                                    <h3>R$ {desconto_conta}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <Dialog header="QR-code" visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{'960px': '30vw'}} style={{width: '30vw'}} className={'modalQrCode'}>
                                            <Image src={qr_code} alt='qrcode' width={450} height={450}/>
                                        </Dialog>
                                    </div>
                                </TabPanel>
                            )
                        })
                    : 
                    ''
                    }
                </TabView>
            </div>
            <Toast ref={toast} />
        </div>
    )
}