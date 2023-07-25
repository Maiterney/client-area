import styles from './styles.module.scss'
 
interface FlipFrontCardProps {
    children: React.ReactNode
}

export const FlipBackCard = ({ children }:FlipFrontCardProps) => {
    return (
        <div className={styles.cardBack}>
            {children}
        </div>
    )
}