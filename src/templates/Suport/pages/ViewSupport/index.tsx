'use client'
import { useEffect } from 'react'
import { IconMessage } from '@/svg'
import styles from './styles.module.scss'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toast } from 'primereact/toast'
import { api } from '@/utils'
import moment from 'moment'
import { LoaderPage } from '@/components/LoaderPage'
import { useLoaderPage, useUserData } from '@/store'
import { useParams } from 'next/navigation'
import { ProgressSpinner } from 'primereact/progressspinner'
import 'moment/locale/pt-br'

interface DataProps {
    title: string,
    status: string,
    protocol: string,
    link: string
}

interface TransitionProps {
    created_at: string,
    message: string,
    type: 'response' | 'request',
    user: {
        id: number, 
        name: string
    }
}  

interface ContentDataProps {
    description: string,
    subject: string,
    transition: Array<TransitionProps>
}

interface CalledSupportProps {
    id: number,
    content_data: ContentDataProps,
    document_type: string,
    protocol: string,
    request_date: string,
    status: string,
    user_id: number,
}
 
export const ViewSupport = () => {
    const { handleSubmit, control, formState: { errors } } = useForm()
    const [ charactersQuantity, setCharactersQuantity ] = useState(0)
    const { user } = useUserData()
    const [ isLoader, setIsLoader] = useState(false)
    const { id } = useParams()
    const { setLoaderPage } = useLoaderPage()
    const [isData, setIsData] = useState<CalledSupportProps>()
    const [isMessages, setIsMessages] = useState<ContentDataProps>()
    const toast = useRef<Toast>(null);
    const dateTime = moment(isData?.request_date, "YYYYMMDD").locale('pt-BR').format('ll').toLocaleString()

    const showAlert = ({type, summary = '', details }: {type: 'success' | 'info'| 'warn' | 'error', summary?: string , details: string}) => {
        toast.current!.show({severity: type, summary: summary, detail: details, life: 3000});
    }


    useEffect(() =>{
        setLoaderPage(true)
        api.get(`/user/contact-us/${id}`).then(res => { 
            // console.log('data', JSON.parse(res.data.data[0].content_data))

            let myData = {
                "id": res.data.data[0].id,
                "content_data": JSON.parse(res.data.data[0].content_data),
                "document_type": res.data.data[0].document_type,
                "protocol": res.data.data[0].protocol,
                "request_date": res.data.data[0].request_date,
                "status": res.data.data[0].status,
                "user_id": res.data.data[0].user_id,
            }

            setIsData(myData);


            setIsMessages(JSON.parse(res.data.data[0].content_data));
        }).catch(err => {
            console.log(err); 
        })
    },[setLoaderPage, setIsData, setIsMessages, id])

    useEffect(() => {
        if(!isData || !isMessages) return
        // console.log('isData', isData)
        // console.log('verify', isData.content_data.transition[isData?.content_data?.transition.length - 1].type == 'response')
        setLoaderPage(false)
    },[isData, isMessages,setLoaderPage])



    const sendNewMessage = (data:any) => {
        setIsLoader(true)
        let formData:any = isData?.content_data;


        formData.transition.push({
            "created_at": moment.utc(),
            "type": "response",
            "user": {
                "id": user?.user.id,
                "name": user?.user.name
            },
            "message": data.message
        })


        
        api.put(`/user/contact-us/${id}`, formData).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setIsLoader(false)
        })


    }


    return (
        <LoaderPage>
            <div className={styles.view}>
                <div className={styles.details}>
                    <div className={styles.row}>
                        <div className={styles.icon}>
                            <IconMessage />
                        </div>
                        <p>{isData?.protocol} | Criado em: {dateTime}</p>
                        <div className={styles.status}>
                            {isData?.status == 'pending' && <span className={`${styles.status} ${styles.open}`}>Aberto</span>}
                            {isData?.status == 'done' && <span className={`${styles.status} ${styles.finality}`}>Finalizado</span>}
                        </div>
                    </div>
                    <p className={styles.title}>Assunto: {isMessages?.subject} </p>
                </div>
                <div className={styles.chat}>
                    <ul className={styles.chatList}>
                        {isData?.content_data?.transition && isData?.content_data?.transition.length >= 1 ?
                            isMessages?.transition.map((item:TransitionProps) => {
                                const time = moment.utc(item.created_at).locale('pt-BR').fromNow();
                                return (
                                    <li className={`${item.type == 'request' ? styles.client : styles.attendant}`} key={item.created_at}>
                                        <div className={styles.text}>
                                            <div className={styles.titleMessage}><strong>{item.user.name}</strong> <span>{time}</span></div>
                                            <p className={styles.message}>{item.message}</p>
                                        </div>
                                    </li>

                                )
                            })
                            : <li className={styles.isEmptyData}><p>Sem resposta</p></li>
                        }
                    </ul>
                </div>
                {/* {isData?.content_data?.transition && isData?.content_data?.transition.length >= 1 && isData.content_data.transition[isData?.content_data?.transition.length - 1].type == 'response' &&
                    <div className={styles.sendNewMessage}>
                        <p>Nova mensagem:</p>
                        <form onSubmit={handleSubmit(sendNewMessage)} className={styles.form}>
                            <Controller
                                name={'message'}
                                control={control}
                                defaultValue={''}
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field, fieldState }) => {
                                    const setValue = (value:string) => {
                                        setCharactersQuantity(value.length)
                                        field.onChange(value)
                                    }
                                    return (
                                        <div className={`${styles.formGroup} ${fieldState.error && styles.error}`}>
                                            <textarea cols={30} rows={2} maxLength={5000} onChange={(e:any) => setValue(e.target.value)} />
                                            {errors?.message && <span className={styles.errorMessage}>{fieldState.error?.message}</span>} 
                                            <p className={styles.charactersQuantity}>{charactersQuantity} / <span>5000</span></p>
                                        </div>
                                    )
                                }}
                            />
                            <div className={styles.submitForm}>
                                <button className="btn default" disabled={isLoader}>
                                    {isLoader && <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="5" fill="transparent" animationDuration=".5s" />}
                                    {!isLoader && 'Enviar'}
                                </button>
                            </div>
                        </form>
                    </div>
                } */}
                <Toast ref={toast} position="bottom-right"/>
            </div>
        </LoaderPage>
    )
}