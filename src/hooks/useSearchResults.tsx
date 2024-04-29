import { useContext, useEffect } from 'react';
import { SeekerConstants } from '../constants/constants';
import { PlayerContext } from '../context/PlayerContext';
import { useLocalStorage } from './useLocalStorage';

export const useSearchResults = () => {
    const { isLoading, searchUsed, handleIsLoading } = useContext( PlayerContext );
    const { hasResults, podcasts } = searchUsed;
    const [ data, setData ] = useLocalStorage<null>(SeekerConstants.CHANNEL_KEY, null);
    useEffect( () => {
        if ( !data ) return;
        setData( null );
        return;
    }, [] );
    useEffect( () => {
        if ( !hasResults ) return;
        handleIsLoading( false );
    }, [podcasts] );
    return {
        isLoading,
        hasResults,
        podcasts
    }
};