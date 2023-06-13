import { Skeleton } from 'primereact/skeleton';
import styles from './styles.module.scss'

export const SkeletonAccount = () => {
    return (
        <div className={styles.skeleton}>
            <div className={styles.tabs}>
                <ul>
                    <li><Skeleton height="2rem"></Skeleton></li>
                    <li><Skeleton height="2rem"></Skeleton></li>
                    <li><Skeleton height="2rem"></Skeleton></li>
                    <li><Skeleton height="2rem"></Skeleton></li>
                    <li><Skeleton height="2rem"></Skeleton></li>
                    <li><Skeleton height="2rem"></Skeleton></li>
                    <li><Skeleton height="2rem"></Skeleton></li>
                    <li><Skeleton height="2rem"></Skeleton></li>
                    <li><Skeleton height="2rem"></Skeleton></li>
                    <li><Skeleton height="2rem"></Skeleton></li>
                    <li><Skeleton height="2rem"></Skeleton></li>
                    <li><Skeleton height="2rem"></Skeleton></li>
                </ul>
            </div>
            <div className={styles.details}>
                <div className={styles.title}>
                    <Skeleton height="2rem" width='10rem'></Skeleton>
                </div>
                <div className={styles.accountDetail}>
                    <div className={styles.value}>
                        <p>Valor</p>
                        <Skeleton height="2rem" width='7rem'></Skeleton>
                    </div>
                    <div className={styles.dueDate}>
                        <p>Vencimento</p>
                        <Skeleton height="2rem" width='10rem'></Skeleton>
                    </div>
                    <div className={styles.consumption}>
                        <p>Consumo</p>
                        <Skeleton height="2rem" width='10rem'></Skeleton>
                    </div>
                </div>
                <div className={styles.economyDetails}>
                    <div className={styles.title}>
                        <h2>Economia woltz</h2>
                    </div>
                    <div className={styles.cards}>
                        <div className={`${styles.card} ${styles.outline}`}>
                            <p>Fatura distribuidora</p>
                            <Skeleton height="2rem" width='5rem'></Skeleton>
                        </div>
                        <div className={`${styles.card} ${styles.outline}`}>
                            <p>Fatura Woltz</p>
                            <Skeleton height="2rem" width='5rem'></Skeleton>
                        </div>
                        <div className={`${styles.card} ${styles.outline}`}>
                            <p>Fatura Total</p>
                            <Skeleton height="2rem" width='5rem'></Skeleton>
                        </div>
                        <div className={`${styles.card}`}>
                            <p>Desconto na energia</p>
                            <Skeleton height="2rem" width='5rem'></Skeleton>
                        </div>
                        <div className={`${styles.card}`}>
                            <p>Economia</p>
                            <Skeleton height="2rem" width='5rem'></Skeleton>
                        </div>
                        <div className={`${styles.card}`}>
                            <p>Desconto na conta</p>
                            <Skeleton height="2rem" width='5rem'></Skeleton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}