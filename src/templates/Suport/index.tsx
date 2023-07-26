'use client'
import { LoaderPage } from '@/components/LoaderPage';
import styles from './styles.module.scss'
import { useEffect, useState} from 'react';
import { useLoaderPage } from '@/store';
import { Support } from './components';
import { TabPanel, TabView } from 'primereact/tabview';
import { FlipCard } from '@/components/FlipCard';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SupportListRow } from './components/SupportListRow';
import { api } from '@/utils';

interface ContentDataProps {
    description: string,
    subject: string
}

interface CalledSupportProps {
    id: number,
    content_data: ContentDataProps,
    document_type: string,
    protocol: string,
    request_date: string,
    status: string,
    user_id: number
}
 
export const SupportContainer = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { installation } = useParams()
    const { setLoaderPage } = useLoaderPage()
    const [ isPending, setIsPending ] = useState([])
    const [ isDone, setIsDone ] = useState([])
    const [ isList, setIsList ] = useState<any>([])

    useEffect(() => {
        setLoaderPage(true)
        api.get('/user/contact-us').then(res => { 
            // console.log(res.data.data)
            setIsList(res.data.data);
        }).catch(err => {
            console.log(err); 
            setIsList([])
        })
    },[setLoaderPage])

    useEffect(() => {
        if(!isList) return
        let listPending = isList?.data?.filter((item:CalledSupportProps) => item.status == 'pending');
        setIsPending(listPending);
        let listDone = isList?.data?.filter((item:CalledSupportProps) => item.status == 'done');
        
        setIsDone(listDone);
        setLoaderPage(false)
    },[setLoaderPage, isList])

    return (
        <LoaderPage>
            <div className={styles.contactUs}>
                <div className={styles.title}>
                    <h3>Lista de chamados</h3>
                    <Link href={`/${installation}/support/new-contact`} className={styles.button}>Abrir novo chamado</Link>
                </div>

                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className='tabView supportTab'>
                    <TabPanel header="Abertos">
                        <div className={styles.contentTab}>
                            {isPending?.sort().reverse().map((item:CalledSupportProps) => {
                                return (
                                    <SupportListRow 
                                        key={item.id} 
                                        protocol={item.protocol} 
                                        status={item.status} 
                                        title={item.content_data.subject} 
                                        link={`/${installation}/support/view/${item.id}`}
                                        date={item.request_date}
                                    />
                                )
                            })}

                        </div>
                    </TabPanel>
                    <TabPanel header="Finalizados">
                        <div className={styles.contentTab}>
                            {isDone?.sort().reverse().map((item:CalledSupportProps) => {
                                return (
                                    <SupportListRow 
                                        key={item.id} 
                                        protocol={item.protocol} 
                                        status={item.status} 
                                        title={item.content_data.subject}
                                        link={`/${installation}/support/view/${item.id}`}
                                        date={item.request_date}
                                    />
                                )
                            })}
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </LoaderPage>
    )
}