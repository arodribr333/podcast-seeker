import { Link } from 'react-router-dom';
import { useMenuBar } from '../../hooks/useMenuBar';
import { HeaderSeeker } from '../HeaderSeeker/HeaderSeeker';
import { IconFavorite, IconMenu, IconPodcast, IconSearchList } from '../Icons/Icons';
import styles from './MenuBar.module.css';
export const MenuBar = () => {
    const { search, error, hasChannel, hasSearch, navOpen, handleOpenNavTrigger, handleActiveLocation, handleInputChange, handleSearchSubmit} = useMenuBar();
    return (
        <header className={styles.menubar}>
            <button className={`${ styles.menuButton } ${ styles.navTrigger } ${ navOpen && styles.active }`} onClick={handleOpenNavTrigger} type='button'>
                <IconMenu />
                <span className='visually-hidden'>Menu {navOpen ? 'Open' : 'Closed'}</span>
            </button>
            <nav className={`${styles.nav} ${ navOpen && styles.open }`}>
                <Link className={handleActiveLocation('/favorites')} to='/favorites'><IconFavorite /> Favoritos</Link>
                {hasSearch && <Link className={handleActiveLocation('/')} to='/'><IconSearchList /> Last Results</Link>}
                {hasChannel && <Link className={handleActiveLocation('/channel')} to='/channel'><IconPodcast /> Last Channel</Link>}
            </nav>
            
            <HeaderSeeker
                search={search}
                error={error}
                searchSubmit={( e ) => handleSearchSubmit( e )}
                inputChange={( e ) => handleInputChange( e )}
            />
        </header>
    );
}