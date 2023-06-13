'use client'
import Link from 'next/link'
import { useRouter, usePathname, useParams } from 'next/navigation'
import { destroyCookie } from 'nookies'
import { api } from '@/utils'
import styles from './styles.module.scss'
import { useToggleNav } from '@/store/toggleNav'
import { IconAccounts, IconHistoric, IconHome, IconLogout, LogoWhite } from '@/svg'
 
export const Sidebar = () => {
    const { toggleNav } = useToggleNav()
    const path = usePathname()
    const { installation } = useParams()
    const { push } = useRouter()
    
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
    console.log(path)
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
        <div className={`${styles.sidebar} ${toggleNav ?  styles.active : '' }`}>
            <div className={styles.sidebarLogo}>
                <LogoWhite />
            </div>
            <ul>
                {/* <li className=''><Link href={'/'}><IconHome /><span>Inicio</span></Link></li>
                <li><Link href={'#'}><IconFinance /><span>Financeiro</span></Link></li>
                <li><Link href={'#'}><IconMarketing /><span>Marketing</span></Link></li>
                <li><Link href={'#'}><IconAdm /><span>Administração</span></Link></li>
                <li><Link href={'#'}><IconBusiness /><span>Business</span></Link></li>
                <li><Link href={'/users'}><IconUsers /><span>Usuários</span></Link></li> */}
                {menu.map(item => {
                    return (
                        <li key={item.id} className={path == `${item?.path}` ? styles.activeNav : 'sss'}><Link href={item.path}><Icon name={item.icon}/><span>{item.slug}</span></Link></li>
                    )
                })}
            </ul>
            <div className={styles.logout}>
                <ul>
                    <li><Link href={'#'} onClick={logout}><IconLogout /> <span>Logout</span></Link></li>
                </ul>
            </div>
        </div>
    )
}