import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlayerContext } from '../../context/PlayerContext';
import { useSearch } from '../../hooks/useSearch';
import { IconFavorite, IconMenu, IconPodcast, IconSearchList } from '../Icons/Icons';
import styles from './MenuBar.module.css';

export const MenuBar = () => {
    const { searchUsed, channelUsed } = useContext( PlayerContext );
    const location = useLocation();
    const {
        search,
        error,
        handleInputChange,
        handleSearchSubmit,
    } = useSearch();
    const [ hasChannel, setHasChannel ] = useState<boolean>(false);
    const [ hasSearch, setHasSearch ] = useState<boolean>(false);
    const [ navOpen, setNavOpen ] = useState<boolean>( false );
    const [ currentPath, setCurrentPath] = useState('');
    useEffect( () => {
        if ( channelUsed.feedUrl !== '' ) setHasChannel( true );
    }, [ channelUsed ] );
    useEffect( () => {
        if ( searchUsed.hasResults ) setHasSearch( true );
    }, [ searchUsed ] );
    const handleOpenNavTrigger = () => {
        setNavOpen( !navOpen );
    };
    useEffect( () => {
        if ( location.pathname !== currentPath ) setNavOpen( false );
        setCurrentPath( location.pathname );
    }, [ location.pathname ] );
    const handleActiveLocation = (path:string):string => {
        if(location.pathname === path) return `${styles.menuButton} ${styles.active}`;
        return `${styles.menuButton}`;
    };
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
            
            {/* <HeaderSeeker
                search={search}
                error={error}
                searchSubmit={( e ) => handleSearchSubmit( e )}
                inputChange={( e ) => handleInputChange( e )}
            /> */}
        </header>
    );
}