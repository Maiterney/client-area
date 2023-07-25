import styles from './styles.module.scss'

interface FlipRootProps {
    children: React.ReactNode
}
 
export const FlipRoot = ({ children }:FlipRootProps) => {
    return (
        <div className={styles.flipCardContainer}>
            <div className={styles.flipCard}>
                {children}
            </div>
        </div>
    )
}