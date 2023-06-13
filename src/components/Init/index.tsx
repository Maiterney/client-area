'use client'
import { api } from '@/utils'
import styles from './styles.module.scss'
import { useRouter } from "next/navigation"
 
export const InitPage = ({token}:any) => {
    const { back, push } = useRouter()
    api.defaults.headers['Authorization'] = `Bearer ${token}`
    api.get('/user/installations').then(res => { 
        console.log(res?.data?.installations?.results) 
        push(`/${res.data.installations.results[0].number}/dashboard`)
    }).catch(err => { 
        console.log(err); 
        back()
    })
    return <></>
}