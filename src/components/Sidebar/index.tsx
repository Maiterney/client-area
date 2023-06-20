'use client'
import Link from 'next/link'
import { useRouter, usePathname, useParams } from 'next/navigation'
import { destroyCookie } from 'nookies'
import { api } from '@/utils'
import styles from './styles.module.scss'
import { useToggleNav } from '@/store/toggleNav'
import { IconAccounts, IconHistoric, IconHome, IconLogout, LogoWhite } from '@/svg'
import { useMediaQuery } from '@/hooks/use-media-query'
 
export const Sidebar = () => {
    const { toggleNav } = useToggleNav()
    const path = usePathname()
    const { installation } = useParams()
    const { push } = useRouter()
    const responsive = useMediaQuery(769)
    
    let menu = [
        {
            id: 1,
            icon: 'home',
            path: `/${installation}/dashboard`,
            slug: 'Inicio', 
        },
        {
            id: 2,
            icon: 'accounts',
            path: `/${installation}/accounts`,
            slug: 'Contas', 
        },
        {
            id: 3,
            icon: 'historic',
            path: `/${installation}/historic`,
            slug: 'Histórico', 
        }
    ]
    const logout = async () => {
        await api.put('/authenticate/logout').finally(() => { 
                destroyCookie(null, 'nextAuth.token', {domain:'woltz.com.br'})
                destroyCookie(null, 'nextAuth.email', {domain:'woltz.com.br'})
                destroyCookie(null, 'nextAuth.expire_token', {domain:'woltz.com.br'})
                destroyCookie(null, 'nextAuth.refresh', {domain:'woltz.com.br'})
        })
        push(`${process.env.NEXT_PUBLIC_URL_LOGIN}`)
    }
    const Icon = ({name}:{name: string}) => {
        switch(name) {
            case 'home' :
                return <IconHome />
            case 'accounts' : 
                return <IconAccounts />
            case 'historic' : 
                return <IconHistoric />
        }
        return (<></>) 
    }

    return (
        <div className={`${styles.sidebar} ${toggleNav ?  styles.active : '' } ${responsive ?  styles.mobile : '' }`}>
            <div className={styles.sidebarLogo}>
                <LogoWhite />
            </div>
            <ul>
                {menu.map(item => {
                    return (
                        <li key={item.id} className={path == `${item?.path}` ? styles.activeNav : ''}><Link href={item.path}><Icon name={item.icon}/><span>{item.slug}</span></Link></li>
                    )
                })}
            </ul>
            {!responsive &&  
                <div className={styles.logout}>
                    <ul>
                        <li><Link href={'#'} onClick={logout}><IconLogout /> <span>Logout</span></Link></li>
                    </ul>
                </div>
            }
        </div>
    )
}