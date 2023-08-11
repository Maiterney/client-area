'use client'
import { MyForm } from '@/components/Form'
import { Toast } from 'primereact/toast'
import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { api } from '@/utils'
import styles from './styles.module.scss';
import { useParams, useRouter } from 'next/navigation'
import moment from 'moment'

interface TransitionProps {
    created_at: any,
    type: string,
    user: {
        id: number,
        name: string
    },
    message:string
}

interface FormInputs {
    subject?: string,
    description?: string,
    transition?: Array<TransitionProps>
}

interface ShowToastProps {
    type: 'success' | 'info' | 'warn' | 'error',
    title?: String,
    message?: String,
    life?: number
}
 
export const SupportForm = () => {
    const { push } = useRouter()
    const { installation } = useParams()
    const { control, reset, handleSubmit, formState: { errors } } = useForm<FormInputs>()
    const [ loaderButton, setLoaderButton ] = useState(false);
    const toast = useRef<Toast>(null);

    const showToast = ({ type, title, message, life = 3000 }:ShowToastProps) => {
        toast.current!.show({ severity: type, summary: title, detail: message, life: life});
    };

    const sendForm = (data:FormInputs) => {
        setLoaderButton(true)
        console.log(data)
        api.post('/user/contact-us', data).then(res => {
            showToast({
                type:'success',
                title: 'Mensagem enviada!',
                message: 'Em breve entraremos em contato!'
            })
            reset()
            setTimeout(() => {
                push(`/${installation}/support`)
            }, 1000);
        }).catch(err => {
            console.log(err)
            showToast({
                type:'error',
                title: 'Erro ao enviar mensagem!',
                message: 'Tente novamente mais tarde!'
            })

        })
        .finally(() => {
            setLoaderButton(false)
        });
    }
    return (
        <div className={styles.contactUs}>
            <div className={styles.title}>
                <h3>Novo chamado</h3>
            </div>
            <MyForm.Root onSubmit={handleSubmit(sendForm)}>
                <MyForm.Row>
                    <MyForm.InputController name={'subject'} label='Assunto' type='text' control={control} required='Campo obrigatório' errorMessage={errors.subject && errors.subject.message} limit={80}/>
                    <MyForm.SelectController 
                        name={'type'} 
                        control={control} 
                        required='Campo obrigatório' 
                        errorMessage={errors.subject && errors.subject.message}
                        label='Motivo do chamado'
                        options={[
                            {key: 'Dúvidas sobre faturas', value: 'Dúvidas sobre faturas'},
                            {key: 'Dúvidas sobre desligamento', value: 'Dúvidas sobre desligamento'},
                            {key: 'Outros assuntos', value: 'Outros assuntos'}
                        ]}
                    />
                </MyForm.Row>
                <MyForm.Row>
                    <MyForm.TextAreaController name={'description'} label='Mensagem' control={control} required='Campo obrigatório' errorMessage={errors.description && errors.description.message}/>
                </MyForm.Row>
                <MyForm.SubmitButton loading={loaderButton} />
            </MyForm.Root>
            <Toast ref={toast} position="bottom-right"/>
        </div>
    )
}