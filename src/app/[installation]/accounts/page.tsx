import { ListAccounts } from '@/templates/Accounts/ListAccounts'
import styles from './styles.module.scss'
import { api } from '@/utils';

export default async function AccountsPage({params}:{params: {installation:string}}) {
    let date = new Date();
    let currentYear = date.getFullYear()
    const bills = await api.get(`/user/bills?installation=${params.installation}`).then(res => { return res.data.bills.results }).catch(err => { console.log(err); return [] })
    const user = await api.get('/user/profile').then(res => { return res.data }).catch(err => { console.log(err); return [] })

    return (
        <div className={styles.accountsComponent}>
            <div className={styles.clientDetails}>
                <h2>Bom dia, {user.name}</h2>
                <span className={styles.protocol}>
                    <strong>N° do protocolo</strong> 1515525154515
                </span>
            </div>
            <ListAccounts date={currentYear} billsData={bills}/>
        </div>
    )
}