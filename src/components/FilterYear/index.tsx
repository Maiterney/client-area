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
    const { setYear, yearController } = useFilterYear()
    const { setCharts } = useCharts()

    const filterAccounts = async (data:any) => {
        setYear({
            yearOptions: yearController.yearOptions,
            year: data.filterYear,
            loading: true
        })
        await api.get(`/user/bills?installation=${installation}&year=${data.filterYear}`).then(res => { 
            setBills(res.data.data.bills) 
            setCharts(res.data.data.charts)
            console.log(res.data.data.bills)
        }).catch(err => { 
            console.log(err); 
            setBills([]) 
            setCharts(null)
        }).finally(() => {
            setYear({
                yearOptions: yearController.yearOptions,
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
                            defaultValue={yearController.year}
                            rules={{ required: false }}
                            render={({ field, fieldState }) => {
                                return (
                                    <div className={`${styles.formGroup}`}>
                                        <label htmlFor={field.name}> Selecione o ano: </label>
                                        <select id={field.name} {...field} value={field.value}>
                                            {yearController.yearOptions.map((year:string) => {
                                                return (
                                                    <option key={year} value={year}>{year}</option>
                                                )
                                            })}
                                            {/* <option value="2022">2022</option> */}
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