import styles from './styles.module.scss'
import { HistoricTabs } from '@/templates/Historic/HistoricTabs';

export default function HistoricPage() {
    let date = new Date();
    let currentYear = date.getFullYear()

    return (
        <div className={styles.historic}>
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
            </div>
            <HistoricTabs date={currentYear}/>
        </div>
    )
}