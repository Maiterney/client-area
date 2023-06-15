'use client'
import { Chart } from 'primereact/chart';
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
 
export const HistoricCharts = ({data}:{data:any}) => {
    const [chartData, setChartData] = useState(data);
    const [chartOptions, setChartOptions] = useState({});
    return (
        <div className={styles.chart}>
            <Chart type="line" width='100%' data={chartData} options={chartOptions} />
        </div>
    )
}