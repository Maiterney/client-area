import styles from './styles.module.scss'
 
export const AlertAccount = () => {
    return (
        <div className={styles.alertAccount}>
            <p>Você possui pelo menos uma conta vencida ou em atraso!</p>
        </div>
    )
}