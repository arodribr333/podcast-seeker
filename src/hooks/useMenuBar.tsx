import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../components/MenuBar/MenuBar.module.css';
import { PlayerContext } from '../context/PlayerContext';

export const useMenuBar = () => {
    const { isPlaying, searchUsed, channelUsed } = useContext( PlayerContext );
    const location = useLocation();
    const navRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
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
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if ((navRef.current && !navRef.current.contains(event.target as Node)) && (buttonRef.current && !buttonRef.current.contains(event.target as Node))) {
                setNavOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleActiveLocation = (path: string): string => {
        if(location.pathname === path) return `${styles.menuButton} ${styles.active}`;
        return `${styles.menuButton}`;
    };
    return {
        isPlaying,
        navRef,
        buttonRef,
        hasChannel,
        hasSearch,
        navOpen,
        handleOpenNavTrigger,
        handleActiveLocation
    }
}