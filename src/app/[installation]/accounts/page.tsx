import { ListAccounts } from '@/templates/Accounts/ListAccounts'
import styles from './styles.module.scss'
import { api } from '@/utils';
import { cookies } from 'next/dist/client/components/headers';
import { ClientDetails } from '@/components/ClientDetails';

export default async function AccountsPage({params}:{params: {installation:string}}) {
    const cookie = cookies()
    const token = cookie.get('nextAuth.token')?.value
    let date = new Date();
    let currentYear = date.getFullYear()
    api.defaults.headers['Authorization'] = `Bearer ${token}`
    const bills = await api.get(`/user/bills?installation=${params.installation}`).then(res => { return res.data.bills.results }).catch(err => { console.log(err); return [] })

    return (
        <div className={styles.accountsComponent}>
            <ClientDetails />
            <ListAccounts date={currentYear} billsData={bills}/>
        </div>
    )
}