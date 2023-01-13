import { useContext, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import styles from './styles.module.scss'
import { useRouteState } from '../../hooks/use-route-state';
import Router from 'next/router';
import { useDataContext } from '../../context/DataContext';
import Link from 'next/link'
 
export default function Inicio (){
    const { setMouthAccount } = useDataContext()

    /* const onClick = (itemIndex:any) => {
        let _activeIndex = activeIndex ? [...activeIndex] : [];

        if (_activeIndex.length === 0) {
            _activeIndex.push(itemIndex);
        }
        else {
            const index = _activeIndex.indexOf(itemIndex);
            if (index === -1) {
                _activeIndex.push(itemIndex);
            }
            else {
                _activeIndex.splice(index, 1);
            }
        }

        setActiveIndex(_activeIndex);
    } */

    const RouteAccount = (month:number) => {
        setMouthAccount(month)
        Router.push('/accounts')
    }

    return (
        <div className={styles.dashboardArea}>
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
            <div className={styles.accounts}>
                <div className={styles.openAccounts}>
                    <h3>Contas em aberto</h3>
                    <Accordion className={`accordion ${styles.accordion}`}>
                        <AccordionTab header={<div className={styles.title}><div className={styles.text}><span className={styles.data}>Dezembro 2022</span><span className={styles.value}>R$ 26,90</span></div><span className={styles.status}>Em aberto</span></div>}>
                            <div className={styles.buttonsAccordion}>
                                <button className="btn default primary" onClick={() => RouteAccount(0)} >
                                    Pagar conta
                                </button>
                                <button className="btn outline primary" onClick={() => RouteAccount(0)}>
                                    Mais detalhes
                                </button>
                            </div>
                        </AccordionTab>
                        <AccordionTab header={<div className={styles.title}><div className={styles.text}><span className={styles.data}>Novembro 2022</span><span className={styles.value}>R$ 26,90</span></div><span className={styles.status}>Em aberto</span></div>}>
                            <div className={styles.buttonsAccordion}>
                                <button className="btn default primary" onClick={() => RouteAccount(1)}>
                                    Pagar conta
                                </button>
                                <button className="btn outline primary" onClick={() => RouteAccount(1)}>
                                    Mais detalhes
                                </button>
                            </div>
                        </AccordionTab>
                        <AccordionTab header={<div className={styles.title}><div className={styles.text}><span className={styles.data}>Outubro 2022</span><span className={styles.value}>R$ 26,90</span></div><span className={styles.status}>Em aberto</span></div>}>
                            <div className={styles.buttonsAccordion}>
                                <button className="btn default primary" onClick={() => RouteAccount(2)}>
                                    Pagar conta
                                </button>
                                <button className="btn outline primary" onClick={() => RouteAccount(2)}>
                                    Mais detalhes
                                </button>
                            </div>
                        </AccordionTab>
                    </Accordion>
                </div>
                <div className={styles.historyAccounts}>
                    <h3>Histórico de consumo</h3>
                    <ul className={styles.historyList}>
                        <li><span>Dezembro 2022</span> <span>40kwh</span></li>
                        <li><span>Dezembro 2022</span> <span>40kwh</span></li>
                        <li><span>Dezembro 2022</span> <span>40kwh</span></li>
                    </ul>
                    <div className={styles.button}>
                        <Link href='/historic' className="btn default primary">
                            Histórico completo
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.economy}>
                <div className={styles.discountAnnual}>
                    <p>Desconto anual na energia</p>
                    <h3 className={styles.valueDiscount}>
                        6,12%
                    </h3>
                </div>
                <div className={styles.economyAnnual}>
                    <p>Economia anual</p>
                    <h3 className={styles.valueDiscount}>
                        R$ 155,00
                    </h3>
                </div>
                <div className={styles.totalDiscount}>
                    <p>Total de descontos</p>
                    <h3 className={styles.valueDiscount}>
                        R$ 245,00
                    </h3>
                </div>
            </div>
        </div>
    )
}