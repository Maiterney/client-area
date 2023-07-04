import styles from './styles.module.scss'
import { HistoricTabs } from '@/templates/Historic/HistoricTabs';
import { InstallationDetail } from '@/components/InstallationDetails';
import { HistoricCharts } from '@/templates/Historic/HistoricCharts';
import { FilterYear } from '@/components/FilterYear';
import { AlertAccount } from '@/components/AlertAccount';

export default async function HistoricPage({params}:{params:{installation:string}}) { 
    return (
        <div className={styles.historic}>
            <AlertAccount />
            <div className={styles.installation}>
                <InstallationDetail />
                <FilterYear />
            </div>
            <HistoricTabs />
            <HistoricCharts />
        </div>
    )
}