import { useNavigate } from 'react-router-dom';
import { IconFavorite } from '../Icons/Icons';
import styles from './MenuBar.module.css';

export const MenuBar = () => {
    
    const navigate = useNavigate();
    return (
        <header className={styles.menubar}>
            <button className={styles.menuButton} onClick={() => navigate( '/favorites' )} type='button'><IconFavorite /> Favoritos</button>
        </header>
    );
}