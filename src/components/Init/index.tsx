'use client'
import { api } from '@/utils'
import { useRouter } from "next/navigation"
import { LoaderPage } from '../LoaderPage'


export const InitPage = ({token}:any) => {
    const { back, push } = useRouter()
    api.defaults.headers['Authorization'] = `Bearer ${token}`
    api.get('/user/installations').then(res => { 
        const encryptedData = encodeURIComponent(res?.data?.installations?.results[0].number)
        push(`/${encryptedData}/dashboard`)
    }).catch(err => { 
        console.log(err); 
        // back()
    })
    return <LoaderPage><></></LoaderPage>
}