import styles from './styles.module.scss'
 
interface FlipFrontCardProps {
    children: React.ReactNode
}

export const FlipFrontCard = ({ children }:FlipFrontCardProps) => {
    return (
        <div className={styles.cardFront}>
            {children}
        </div>
    )
}