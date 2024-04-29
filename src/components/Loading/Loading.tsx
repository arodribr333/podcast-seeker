import { SoundBars } from '../SoundBars/SoundBars';
import styles from './Loading.module.css';
interface LoadingProps {
    loadingStyles?: React.CSSProperties | undefined
}
export const Loading = ( { loadingStyles }: LoadingProps ) => {
    const barsStyles: React.CSSProperties = {
        transform: 'scale(5.5)'
    };
    return (
        <div className={styles.loading} style={loadingStyles}>
            <SoundBars customStyles={barsStyles}/>
        </div>
    );
}