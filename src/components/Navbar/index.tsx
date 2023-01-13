import Link from 'next/link';
import { InputText } from 'primereact/inputtext';
import { MegaMenu } from 'primereact/megamenu';
import { useRef, useState } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import styles from './styles.module.scss'
 
export default function Navbar (){
    const [ isInstallation, setIsInstallation ] = useState(false);
    const [ isProfile, setIsProfile ] = useState(false)

    const items = [
        {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            command: () => {
                console.log('ok')
            }
        }
    ];

    const [listInstallations, setListInstallations] = useState([
        {
            label: '125212524848124',
            command: () => {
                console.log('ok')
            }
        }
    ])
    

    const handleOpenProfile = () => {
        console.log('ok')
        setIsProfile(!isProfile)
        setIsInstallation(false)
    }

    const handleOpenInstallation = () => {
        console.log('ok')
        setIsInstallation(!isInstallation)
        setIsProfile(false)
    }   

    return (
        <div className={'navbar'}>
            <nav className={'navMenu'}>
                <SplitButton label={`Minhas instalações ${listInstallations[0].label}`} model={listInstallations} className="p-button-text navSplitButton buttonInstallation"></SplitButton>
                <SplitButton label='Maria A. C.' model={items} className="p-button-text navSplitButton"></SplitButton>
                {/* <ul className={`primaryMenu ${isInstallation ? 'active' : ''}`}>
                    <li>
                        <Link href='' className='linkMenu' onClick={handleOpenInstallation}>
                            <div className="textLink">
                                <p>Minhas instalações</p>
                                <span>115825212454</span>
                            </div>
                            <i className='pi pi-angle-down'></i>
                        </Link>
                        <ul className={'subMenu'}>
                            <li>Instalação 1</li>
                            <li>Instalação 2</li> 
                        </ul>
                    </li>
                </ul>
                <ul className={`primaryMenu ${isProfile ? 'active' : ''}`}>
                    <li>
                        <Link href='' onClick={handleOpenProfile} className='linkMenu'>
                            <img src="/images/profile.png" alt="" />
                            <i className='pi pi-angle-down'></i>
                        </Link>
                        <ul className={`subMenu`}>
                            <li>menu 1</li>
                            <li>menu 2</li> 
                        </ul>
                    </li>
                </ul> */}
            </nav>
        </div>
    )
}