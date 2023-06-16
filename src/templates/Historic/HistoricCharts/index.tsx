'use client'
import { Chart } from 'primereact/chart';
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { useCharts } from '@/store/charts';
 
export const HistoricCharts = ({data}:{data:any}) => {
    const { setCharts, charts } = useCharts()
    useEffect(() => {
        setCharts(data)
    },[data])
    return (
        <div className={styles.chart}>
            {charts != null && <Chart type="bar" width='100%' data={charts!} />}
        </div>
    )
}