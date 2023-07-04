'use client'
import { useTradeAccount } from '@/store'
import { Dialog } from 'primereact/dialog';
import styles from './styles.module.scss'
import { IconConstruction } from '@/svg';
 
export const AccountTrade = () => {
    const { tradeAccount, setTradeAccount } = useTradeAccount()
    return (
        <Dialog header="Header" visible={tradeAccount} onHide={() => setTradeAccount(false)}
            /* style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} */>
            <IconConstruction />
        </Dialog>
    )
}