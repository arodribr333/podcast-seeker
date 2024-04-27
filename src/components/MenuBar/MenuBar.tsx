import { Link } from 'react-router-dom';
import { useMenuBar } from '../../hooks/useMenuBar';
import { IconFavorite, IconMenu, IconPodcast, IconSearchList } from '../Icons/Icons';
import styles from './MenuBar.module.css';

export const MenuBar = () => {
    const { navRef, buttonRef, navOpen, hasSearch, hasChannel, handleOpenNavTrigger, handleActiveLocation} = useMenuBar();
    return (
        <header className={styles.menubar}>
            <button ref={buttonRef} className={`${ styles.menuButton } ${ navOpen && styles.active }`} onClick={handleOpenNavTrigger} type='button'>
                <IconMenu />
                <span className='visually-hidden'>Menu {navOpen ? 'Open' : 'Closed'}</span>
            </button>
            <nav ref={navRef} className={`${styles.nav} ${ navOpen && styles.open }`}>
                <Link className={handleActiveLocation('./favorites')} to='./favorites'><IconFavorite /> Favorites</Link>
                {hasSearch && <Link className={handleActiveLocation('./')} to='./'><IconSearchList /> Last Results</Link>}
                {hasChannel && <Link className={handleActiveLocation('./channel')} to='./channel'><IconPodcast /> Last Channel</Link>}
            </nav>
        </header>
    );
}