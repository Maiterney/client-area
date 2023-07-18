'use client'
import Link from 'next/link'
import { useRouter, usePathname, useParams } from 'next/navigation'
import { destroyCookie, setCookie } from 'nookies'
import { api } from '@/utils'
import styles from './styles.module.scss'
import { useToggleNav } from '@/store/toggleNav'
import { IconAccounts, IconContactUs, IconHistoric, IconHome, IconLogout, LogoWhite } from '@/svg'
import { useMediaQuery } from '@/hooks/use-media-query'
import Cookies from 'js-cookie'
 
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
        },
        // {
        //     id: 4,
        //     icon: 'contactUs',
        //     path: `/${installation}/contact-us`,
        //     slug: 'Fale conosco', 
        // }
    ]
    const logout = async () => {
        await api.put('/authenticate/logout').finally(() => { 
            Cookies.remove('nextAuth.token')
            Cookies.remove('nextAuth.email')
            Cookies.remove('nextAuth.expire_token')
            Cookies.remove('nextAuth.refresh')
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
            case 'contactUs' : 
                return <IconContactUs />
        }
        return (<></>) 
    }

    const setPreviousPage = (myPath:string) => {
        Cookies.set('previous', myPath, {domain: `${process.env.NEXT_PUBLIC_DOMAIN}` , path: '/'})
        Cookies.set('type', 'client', {domain: `${process.env.NEXT_PUBLIC_DOMAIN}`, path: '/'})
    }

    return (
        <div className={`${styles.sidebar} ${toggleNav ?  styles.active : '' } ${responsive ?  styles.mobile : '' }`}>
            <div className={styles.sidebarLogo}>
                <LogoWhite />
            </div>
            <ul>
                {menu.map(item => {
                    return (
                        <li key={item.id} className={path == `${item?.path}` ? styles.activeNav : ''}><Link href={item.path} onClick={() => setPreviousPage(item?.path)}><Icon name={item.icon}/><span>{item.slug}</span></Link></li>
                    )
                })}
            </ul>
            {!responsive &&  
                <div className={styles.logout}>
                    <ul>
                        <li><button className={`${styles.navLink}`} onClick={logout}><IconLogout /> <span>Logout</span></button></li>
                    </ul>
                </div>
            }
        </div>
    )
}