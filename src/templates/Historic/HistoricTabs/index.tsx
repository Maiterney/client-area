'use client'
import { useEffect, useState } from 'react'
import { TabPanel, TabView } from 'primereact/tabview'
import styles from './styles.module.scss'
import { useBills } from '@/store/bills'
import { useLoaderPage } from '@/store/loaderPage'
import { LoaderPage } from '@/components/LoaderPage'
import { useMediaQuery } from '@/hooks/use-media-query'
import { AccountTabTotal } from './AccountTabTotal'
import { AccountTabOpen } from './AccountTabOpen'
import { AccountTabPaid } from './AccountTabPaid'

const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']


export const HistoricTabs = () => {
    const { bills } = useBills()
    const { setLoaderPage } = useLoaderPage()
    const responsive = useMediaQuery(769)

    useEffect(() => {
        setLoaderPage(true)
    },[])
    useEffect(() => {
        if (!bills) return
        setLoaderPage(false)
    }, [bills])


    return (
        <LoaderPage>
            <div className={styles.historicTab}>
                <TabView className='tabView historicTab' scrollable={responsive}>
                    <TabPanel header="Histórico de conta">
                        <AccountTabTotal />
                    </TabPanel>
                    <TabPanel header="Em aberto/Vencidos">
                        <AccountTabOpen />
                    </TabPanel>
                    <TabPanel header="Pagos">
                        <AccountTabPaid />
                    </TabPanel>
                </TabView>
            </div>
        </LoaderPage>
    )
}