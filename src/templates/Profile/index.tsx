'use client'
import { useEffect } from 'react'
import { LoaderPage } from '@/components/LoaderPage'
import styles from './styles.module.scss'
import { useLoaderPage, useUserData } from '@/store'
import { MyForm } from '@/components/Form'
import { useForm } from 'react-hook-form'
 
export const Profile = () => {
    const { handleSubmit, reset, watch, control, formState: {errors}} = useForm()
    const { user } = useUserData()
    const { setLoaderPage } = useLoaderPage();
    let passwordValid = watch('new_password');
    useEffect(() => { 
        if(user) {
            console.log(user)
            reset(user.user)
            setLoaderPage(false) 
        }
    },[reset, setLoaderPage, user])

    const updatePassword = (data:any) => {
        console.log(data)
        console.log(errors)
    }

    useEffect(() => {
        console.log(passwordValid)
    },[passwordValid])

    return (
        <LoaderPage>
            <div className={styles.profile}>
                <div className={styles.content}>
                    <h3>Perfil</h3>
                    <MyForm.Root onSubmit={handleSubmit(updatePassword)}>
                        <MyForm.Row>
                            <MyForm.InputController 
                                name={'name'} 
                                label='Nome' 
                                type='text' 
                                control={control} 
                                required='Campo obrigatório' 
                                errorMessage={errors.name && errors.name.message}
                                readOnly={true}
                            />
                            <MyForm.InputController 
                                name={'email'} 
                                label='Email' 
                                type='email' 
                                control={control} 
                                required='Campo obrigatório' 
                                errorMessage={errors.email && errors.email.message}
                                readOnly={true}
                            />
                        </MyForm.Row>
                        <MyForm.Row>
                            <MyForm.InputControllerMask 
                                name={'document'} 
                                label='CPF/CNPJ' 
                                type='text' 
                                control={control} 
                                required='Campo obrigatório' 
                                errorMessage={errors.name && errors.name.message}
                                inputMask={['999.999.999-99']}
                                readOnly={true}
                            />
                            <MyForm.InputControllerMask 
                                name={'phone'} 
                                label='Telefone' 
                                type='email' 
                                control={control} 
                                required='Campo obrigatório' 
                                errorMessage={errors.email && errors.email.message}
                                readOnly={true}
                                inputMask={['(99) 99999-9999']}
                            />
                        </MyForm.Row>
                        <p style={{textAlign: 'center'}}>Mudar senha</p>
                        <MyForm.Row>
                            <MyForm.InputController 
                                name={'old_password'} 
                                label='Senha atual' 
                                type='password' 
                                control={control} 
                                required='Campo obrigatório' 
                                errorMessage={errors.old_password && errors.old_password.message}
                            />
                            <MyForm.InputController 
                                name={'new_password'} 
                                label='Nova senha'
                                type='password' 
                                control={control} 
                                required='Campo obrigatório' 
                                errorMessage={errors.new_password && errors.new_password.message}
                                validate={
                                    (value) => {
                                        let regex = new RegExp(/^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$/)
                                        if(value.length < 8 ) {
                                            console.log(regex.test(value))
                                            return 'Mínimo de caracteres 8 dígitos'
                                        } 
                                    }
                                }
                            />

                            <MyForm.InputController 
                                name={'confirm_new_password'} 
                                label='Confirmar nova senha' 
                                type='password' 
                                control={control} 
                                required='Campo obrigatório' 
                                errorMessage={errors.confirm_new_password && errors.confirm_new_password.message}
                                validate={
                                    (value) => {
                                        if(value != passwordValid) {
                                            return 'Senhas diferentes'
                                        }
                                    }
                                }
                            />
                        </MyForm.Row>
                        <MyForm.SubmitButton loading={false}/>
                    </MyForm.Root>
                </div>
            </div>
        </LoaderPage>
    )
}