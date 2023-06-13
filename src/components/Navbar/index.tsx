'use client'
import { api } from '@/utils';
import { SplitButton } from 'primereact/splitbutton';
import { useEffect, useState } from 'react';
import { usePathname, useParams, useRouter } from 'next/navigation'
import { useUserData } from '@/store/userData';
import { useInstallations } from '@/store/installations';
import { destroyCookie } from 'nookies';
 
export default function Navbar ({token, userData, installationsData}:{token:any, userData:any, installationsData:any}){
    const { user, setUser } = useUserData()
    const { installations, setInstallations } = useInstallations()
    const [ isInstallations, setIsInstallations ] = useState(installationsData)
    const { installation } = useParams()
    const { push } = useRouter()
    useEffect(() => {
        setUser(userData)
        setInstallations(installationsData)
    },[userData, installationsData])

    useEffect(() => {
        api.defaults.headers['Authorization'] = `Bearer ${token}`
        api.get(`/user/bills?installation=${installation}`).then(res => { console.log('sss',res.data) }).catch(err => { console.log(err); return [] })
    },[])

    const logout = async () => {
        await api.put('/authenticate/logout').finally(() => { 
            destroyCookie(null, 'nextAuth.token', {domain:'woltz.com.br'})
            destroyCookie(null, 'nextAuth.email', {domain:'woltz.com.br'})
            destroyCookie(null, 'nextAuth.expire_token', {domain:'woltz.com.br'})
            destroyCookie(null, 'nextAuth.refresh', {domain:'woltz.com.br'})
        })
        push(`${process.env.NEXT_PUBLIC_URL_LOGIN}`)
    }

    const items = [
        {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            command: () => logout()
        }
    ];

    const listInstallations = [
        {
            label: '125212524848124',
            command: () => {
                console.log('ok')
            }
        }
    ]

    return (
        <div className={'navbar'}>
            <nav className={'navMenu'}>
                <SplitButton label={`Minhas instalações ${installation}`} model={installations} className="p-button-text navSplitButton buttonInstallation"></SplitButton>
                <SplitButton label={user?.name} model={items} className="p-button-text navSplitButton"></SplitButton>
            </nav>
        </div>
    )
}