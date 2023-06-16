'use client'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { useBills } from '@/store/bills'
import { useParams } from 'next/navigation'
import { api } from '@/utils'
import styles from './styles.module.scss'
import { useFilterYear } from '@/store/filterYear'
import { useCharts } from '@/store/charts'
 
export const FilterYear = () => {
    const { control, handleSubmit, setValue } = useForm()
    const {setBills} = useBills()
    const { installation } = useParams()
    const { setYear } = useFilterYear()
    const { setCharts } = useCharts()

    const filterAccounts = async (data:any) => {
        setYear({
            year: data.filterYear,
            loading: true
        })
        await api.get(`/user/bills?installation=${installation}&year=${data.filterYear}`).then(res => { 
            setBills(res.data.data.bills) 
            setCharts(res.data.data.charts)
        }).catch(err => { 
            console.log(err); 
            setBills([]) 
            setCharts(null)
        }).finally(() => {
            setYear({
                year: data.filterYear,
                loading: false
            })
        })
    }

    return (
        <div className={styles.filter}>
            <form onChange={handleSubmit(filterAccounts)}>
                <div className={styles.formController}>
                    <div className={styles.formRow}>
                        <Controller 
                            name="filterYear" 
                            control={control}
                            defaultValue={''}
                            rules={{ required: false }}
                            render={({ field, fieldState }) => {
                                return (
                                    <div className={`${styles.formGroup}`}>
                                        <label htmlFor={field.name}> Selecione o ano: </label>
                                        <select id={field.name} {...field} value={field.value}>
                                            <option value="2023">2023</option>
                                            <option value="2022">2022</option>
                                        </select>
                                    </div>
                                )
                            }} 
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}