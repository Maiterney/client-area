'use client'
import { api } from '@/utils'
import styles from './styles.module.scss'
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation';

type User = {
    name: string,
    profile_photo_url: string
}
 
export const HeaderV2 = ({user, installations}:{user: User | any, installations:any}) => {
    const { installation } = useParams()
    const menu = useRef<any>(null)
    const [ listInstallations, setListInstallations ] = useState<Array<any>>([])
    const items:MenuItem[] = [
        {
            label: user?.name,
            items: [
                {
                    label: 'Minha conta',
                    icon: 'pi pi-cog',
                    command: () => {},
                },
                {
                    label: 'Sair',
                    icon: 'pi pi-sign-out',
                    command: () => {},
                },
            ]
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
        installations.map((item:any) => {
            setListInstallations([
                ...listInstallations, {
                    label: item.number,
                    icon: 'pi pi-box',
                    url: `/${item.number}/dashboard`
                }
            ])
        })
    },[installations])
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
        </div>
    )
}