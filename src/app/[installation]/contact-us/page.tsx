'use client'
import { useEffect, useRef, useState } from 'react'
import { MyForm } from "@/components/Form"
import { useForm } from "react-hook-form"
import styles from './styles.module.scss'
import { LoaderPage } from "@/components/LoaderPage"
import { useLoaderPage } from '@/store'
import { Toast } from 'primereact/toast'

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


export default function ContactUsPage() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormInputs>()
    const { setLoaderPage } = useLoaderPage()
    const [ loaderButton, setLoaderButton ] = useState(false);
    const toast = useRef<Toast>(null);

    const showToast = ({ type, title, message, life = 3000 }:ShowToastProps) => {
        toast.current!.show({ severity: type, summary: title, detail: message, life: life});
    };

    const sendForm = (data:FormInputs) => {
        setLoaderButton(true)
        console.log(data)
        setTimeout(() => {
            showToast({
                type:'success',
                title: 'Mensagem enviada',
                message: 'Em breve entraremos em contato!'
            })
            setLoaderButton(false)
        }, 5000);
    }

    useEffect(() => {
        setLoaderPage(false)
    },[setLoaderPage])

    return (
        <LoaderPage>
            <div className={styles.contactUs}>
                <h3>Fale conosco</h3>
                <MyForm.Root onSubmit={handleSubmit(sendForm)} className={styles.form}>
                    <MyForm.Row>
                        <MyForm.InputController name={'subject'} label='Assunto' type='text' control={control} required='Assunto e obrigatória' errorMessage={errors.subject && errors.subject.message}/>
                    </MyForm.Row>
                    <MyForm.Row>
                        <MyForm.TextAreaController name={'message'} label='Mensagem' control={control} required='Mensagem e obrigatória' errorMessage={errors.message && errors.message.message}/>
                    </MyForm.Row>
                    <MyForm.SubmitButton loading={loaderButton} />
                </MyForm.Root>
                <Toast ref={toast} position="bottom-right"/>
            </div>
        </LoaderPage>
    )
}