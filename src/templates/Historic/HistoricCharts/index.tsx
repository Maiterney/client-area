'use client'
import { Chart } from 'primereact/chart';
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { useCharts } from '@/store/charts';
 
export const HistoricCharts = () => {
    const { charts } = useCharts()

    return (
        <div className={styles.chart}>
            {charts != null && <Chart type="bar" width='100%' data={charts!} />}
        </div>
    )
}