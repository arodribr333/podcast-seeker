import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../components/MenuBar/MenuBar.module.css';
import { PlayerContext } from '../context/PlayerContext';
import { useSearch } from './useSearch';

export const useMenuBar = () => {
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
    useEffect( () => {
        if ( location.pathname !== currentPath ) setNavOpen( false );
        setCurrentPath( location.pathname );
    }, [ location.pathname ] );
    const handleOpenNavTrigger = () => {
        setNavOpen( !navOpen );
    };
    const handleActiveLocation = (path:string):string => {
        if(location.pathname === path) return `${styles.menuButton} ${styles.active}`;
        return `${styles.menuButton}`;
    };
    return {
        search,
        error,
        hasChannel,
        hasSearch,
        navOpen,
        handleOpenNavTrigger,
        handleActiveLocation,
        handleInputChange,
        handleSearchSubmit
    }
}