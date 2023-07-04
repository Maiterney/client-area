'use client'
import { useEffect, useRef, useState } from 'react'
import { useTabNumber, useBills, useListMouths, useFilterYear, useLoaderPage } from '@/store'
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast'
import { SkeletonAccount } from '../SkeletonAccounts/index'
import { InstallationDetail } from '@/components/InstallationDetails'
import { FilterYear } from '@/components/FilterYear'
import { LoaderPage } from '@/components/LoaderPage';
import { useMediaQuery } from '@/hooks/use-media-query';
import { AlertAccount } from '@/components/AlertAccount';
import { AccountDetails } from '@/components/AccountDetails';
import styles from './styles.module.scss'

export const ListAccounts = ({currentMonth}:any) => {
    const { setTabNumber, tabNumberIndex } = useTabNumber()
    const { setLoaderPage } = useLoaderPage()
    const { yearController } = useFilterYear()
    const [ isLoader, setIsLoader ] = useState(true)
    const { bills} = useBills()
    const { listMonths } = useListMouths()
    const responsive = useMediaQuery(769)
    const toast = useRef<Toast>(null);

    useEffect(() => { setLoaderPage(true) }, [])

    useEffect(() => {
        if(!bills) return
        setIsLoader(false)
        setLoaderPage(false)
        setTabNumber(Number(currentMonth))
    },[currentMonth, bills])


    return (
        <LoaderPage>
            <AlertAccount />
            <div className={styles.installation}>
                <InstallationDetail />
                <FilterYear />
            </div>
            
            <div className={styles.tabAccounts}>
                {yearController.loading || isLoader ? <SkeletonAccount /> : null}
                {!yearController.loading || !isLoader ?
                    <TabView scrollable={responsive} activeIndex={tabNumberIndex} onTabChange={(e) => setTabNumber(e.index)} className='tabView' style={{width: '100%'}}>
                        {bills ? 
                            listMonths.map((item:any) => {
                                if(bills[item.month]) {
                                    return (
                                        <TabPanel header={item.label} key={item.label}>
                                            <AccountDetails data={bills[item.month]} item={item}/> 
                                        </TabPanel>
                                    )
                                } else {
                                    return (
                                        <TabPanel header={item.label} key={item.label} disabled>
                                            <p style={{textAlign: 'center'}}>Não há conta nesse mês</p>
                                        </TabPanel>
                                    )
                                }
                            })
                        : <h3>Não a contas</h3>}
                    </TabView>
                    :
                    <div className={styles.emptyAccounts}>
                        <h2>Não há contas nesse período</h2>
                    </div>
                }
            </div>
            <Toast ref={toast} position="bottom-right"/>
        </LoaderPage>
    )
}