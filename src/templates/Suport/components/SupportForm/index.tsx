'use client'
import { MyForm } from '@/components/Form'
import { Toast } from 'primereact/toast'
import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { api } from '@/utils'
import styles from './styles.module.scss';
import { useParams, useRouter } from 'next/navigation'

interface FormInputs {
    subject?: string,
    message?: string
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
                    <MyForm.InputController name={'subject'} label='Assunto' type='text' control={control} required='Assunto e obrigatória' errorMessage={errors.subject && errors.subject.message} limit={80}/>
                </MyForm.Row>
                <MyForm.Row>
                    <MyForm.TextAreaController name={'description'} label='Mensagem' control={control} required='Mensagem e obrigatória' errorMessage={errors.message && errors.message.message}/>
                </MyForm.Row>
                <MyForm.SubmitButton loading={loaderButton} />
            </MyForm.Root>
            <Toast ref={toast} position="bottom-right"/>
        </div>
    )
}