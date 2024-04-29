import styles from './SoundBars.module.css';
interface SoundBarsProps {
    customStyles?: React.CSSProperties | undefined
}
export const SoundBars = ({customStyles}: SoundBarsProps) => {
    return (
        <div className={styles.soundBars} style={customStyles}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
        </div>

    );
};