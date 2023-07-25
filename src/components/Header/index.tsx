'use client'
import styles from './styles.module.scss'
import { useInstallations, useUserData, useBills, useCharts, useFilterYear, useListMouths, useAlertAccount, useLoaderPage} from '@/store';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import { api } from '@/utils';
import { IconLogout } from '@/svg';
import { useMediaQuery } from '@/hooks/use-media-query';

type User = {
    name: string,
    profile_photo_url: string
}
 
export const Header = ({myUser, myInstallations, myBills, myCharts, references, currentYear, currentInstallation, previousRedirect}:{myUser: User | any, myInstallations:any, myBills:any, myCharts:any, references:any, currentYear:any, currentInstallation:any, previousRedirect:any}) => {
    const { push } = useRouter()
    const { setLoaderPage } = useLoaderPage()
    const responsive = useMediaQuery(769)
    const { setUser } = useUserData()
    const { installations, setInstallations } = useInstallations()
    const { setCharts } = useCharts()
    const { setBills } = useBills()
    const { setYear } = useFilterYear()
    const [ listInstallations, setListInstallations ] = useState<Array<any>>([])
    const menu = useRef<any>(null)
    const { listMonths } = useListMouths()
    const { alertAccount, setAlertAccount } = useAlertAccount()
    /* const items:MenuItem[] = [
        {
            label: user?.name,
            disabled:true,
            items: [
                {
                    label: 'Minha conta',
                    icon: 'pi pi-cog',
                    command: () => {},
                }
            ]
        },
        {
            separator: true,
        },
        {
            label: 'Minhas instalações',
            items: listInstallations,
        },
    ]; */
    const items:MenuItem[] = listInstallations;

    useEffect(() => {
        if(previousRedirect) {
            listInstallations.filter((inst:any) => {
                if(inst.label != currentInstallation) {
                    setLoaderPage(true)
                    push('/')
                }
            })
        }
    },[listInstallations, setLoaderPage, previousRedirect, currentInstallation, push])
    useEffect(() => { 
        if(!myBills) return
        listMonths?.filter((item:any) => { 
            if(myBills[item.month]) {
                myBills[item.month].payment_status != 'Pago'
                if(alertAccount == false) {
                    setAlertAccount(true)
                }
            }
        })
        setInstallations(myInstallations) 
        setUser(myUser)
        setBills(myBills)
        setCharts(myCharts)
        setYear({
            year: String(currentYear),
            yearOptions: references,
            loading: false
        })
        console.log(myUser)
    },[myInstallations, myUser, myBills, myCharts, references, currentInstallation])

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
                {/* <Avatar className="p-overlay-badge" image={user?.profile_photo_url} size="large" shape="circle"></Avatar> */}
                <p>
                    <strong>Minhas Instalações</strong>
                </p>
                <i className="pi pi-angle-down" style={{ fontSize: '1rem' }}></i>
            </button>
            <Menu model={items} popup ref={menu} />
            {responsive &&  <button className={`btn clean ${styles.logout}`} onClick={logout}><IconLogout /></button>}
        </div>
    )
}