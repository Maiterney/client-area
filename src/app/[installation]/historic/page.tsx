import { api } from '@/utils';
import styles from './styles.module.scss'
import { HistoricTabs } from '@/templates/Historic/HistoricTabs';
import { cookies } from 'next/dist/client/components/headers';
import { ClientDetails } from '@/components/ClientDetails';
import { InstallationDetail } from '@/components/InstallationDetails';
import { HistoricCharts } from '@/templates/Historic/HistoricCharts';
import { FilterYear } from '@/components/FilterYear';

export default async function HistoricPage({params}:{params:{installation:string}}) { 
    return (
        <div className={styles.historic}>
            <div className={styles.installation}>
                <InstallationDetail />
                <FilterYear />
            </div>
            <HistoricTabs />
            <HistoricCharts />
        </div>
    )
}