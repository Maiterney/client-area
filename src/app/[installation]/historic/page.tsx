import { api } from '@/utils';
import styles from './styles.module.scss'
import { HistoricTabs } from '@/templates/Historic/HistoricTabs';
import { cookies } from 'next/dist/client/components/headers';
import { ClientDetails } from '@/components/ClientDetails';
import { InstallationDetail } from '@/components/InstallationDetails';
import { HistoricCharts } from '@/templates/Historic/HistoricCharts';
import { FilterYear } from '@/components/FilterYear';

export default async function HistoricPage({params}:{params:{installation:string}}) { 
    const cookie = cookies()
    const token = cookie.get('nextAuth.token')?.value
    let date = new Date();
    let currentYear = date.getFullYear()
    api.defaults.headers['Authorization'] = `Bearer ${token}`
    const bills = await api.get(`/user/bills?installation=${params.installation}&year=${currentYear}`).then(res => { return res.data.data }).catch(err => { console.log(err); return [] })

    return (
        <div className={styles.historic}>
            {/* <ClientDetails /> */}
            <div className={styles.installation}>
                <InstallationDetail />
                <FilterYear />
            </div>
            <HistoricTabs billsData={bills.bills}/>
            <HistoricCharts data={bills.charts}/>
        </div>
    )
}