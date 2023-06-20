'use client'
import styles from './styles.module.scss'
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { useInstallations } from '@/store/installations';
import { useUserData } from '@/store/userData';
import { useBills } from '@/store/bills';
import { useCharts } from '@/store/charts';
import { useToggleNav } from '@/store/toggleNav';
import { destroyCookie } from 'nookies';
import { api } from '@/utils';
import { IconLogout } from '@/svg';
import { useMediaQuery } from '@/hooks/use-media-query';

type User = {
    name: string,
    profile_photo_url: string
}
 
export const Header = ({myUser, myInstallations, myBills, myCharts}:{myUser: User | any, myInstallations:any, myBills:any, myCharts:any}) => {
    const { installation } = useParams()
    const { push } = useRouter()
    const responsive = useMediaQuery(769)
    const { setToggleNav, toggleNav } = useToggleNav()
    const { user, setUser } = useUserData()
    const { installations, setInstallations } = useInstallations()
    const { setCharts } = useCharts()
    const { setBills } = useBills()
    const [ listInstallations, setListInstallations ] = useState<Array<any>>([])
    const menu = useRef<any>(null)
    const items:MenuItem[] = [
        {
            label: user?.name,
            /* items: [
                {
                    label: 'Minha conta',
                    icon: 'pi pi-cog',
                    command: () => {},
                }
            ] */
        },
        {
            separator: true,
        },
        {
            label: 'Minhas instalações',
            items: listInstallations,
        },
        

    ];
    useEffect(() => { 
        setInstallations(myInstallations) 
        setUser(myUser)
        setBills(myBills)
        setCharts(myCharts)
    },[myInstallations, myUser, myBills, myCharts])
    useEffect(() => {
        let installationsNav = installations.map((item:any) => {
            return {
                label: item.number,
                icon: 'pi pi-box',
                url: `/${item.number}/dashboard`
            }
        })
        setListInstallations(installationsNav)
    },[installations])
    const logout = async () => {
        await api.put('/authenticate/logout').finally(() => { 
                destroyCookie(null, 'nextAuth.token', {domain:'woltz.com.br'})
                destroyCookie(null, 'nextAuth.email', {domain:'woltz.com.br'})
                destroyCookie(null, 'nextAuth.expire_token', {domain:'woltz.com.br'})
                destroyCookie(null, 'nextAuth.refresh', {domain:'woltz.com.br'})
        })
        push(`${process.env.NEXT_PUBLIC_URL_LOGIN}`)
    }
    return (
        <div className={styles.header}>
            <button className='btn clean'  onClick={(e:any) => menu?.current.toggle(e)}>
                <Avatar className="p-overlay-badge" image={user?.profile_photo_url} size="large" shape="circle">
                    {/* <Badge value="4" severity="danger" /> */}
                </Avatar>
                <p>
                    <strong>Instalação</strong>
                    <span>{installation}</span>
                </p>
                <i className="pi pi-angle-down" style={{ fontSize: '1rem' }}></i>
            </button>
            <Menu model={items} popup ref={menu} />
            {responsive &&  <button className={`btn clean ${styles.logout}`} onClick={logout}><IconLogout /></button>}
        </div>
    )
}