import { ListAccounts } from '@/templates/Accounts/ListAccounts'
import styles from './styles.module.scss'
import { api } from '@/utils';

export default async function AccountsPage({params}:{params: {installation:string}}) {
    let date = new Date();
    let currentYear = date.getFullYear()
    let bills = await api.get(`/user/bills?installation=${params.installation}`).then(res => { return res.data.bills.results }).catch(err => { console.log(err); return [] })

    return (
        <div className={styles.accountsComponent}>
            <div className={styles.clientDetails}>
                <h2>Bom dia, Maria</h2>
                <span className={styles.protocol}>
                    <strong>N° do protocolo</strong> 1515525154515
                </span>
            </div>
            <ListAccounts date={currentYear} billsData={bills}/>
        </div>
    )
}