import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeekerConstants } from '../constants/constants';
import { PlayerContext } from '../context/PlayerContext';
import { SearchPodcasts } from '../services/SearchPodcasts';

export const useSearch = () => {
    const { searchUsed, handleSearchUsedChange, handleIsLoading } = useContext( PlayerContext );
    const [ firstSearch, setFirstSearch ] = useState( true );
    const [ search, updateSearch ] = useState( '' );
    const [ error, setError ] = useState<string | null>( null );
    const isFirstRender = useRef( true );
    const navigate = useNavigate();
    const handleInputChange = ( event: React.FormEvent<HTMLInputElement> ) => {
        updateSearch( event.currentTarget.value );
    };
    const handleSearchSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        const { term } = searchUsed;
        event.preventDefault();
        if ( search === '' ) {
            handleSearchTerm();
            return;
        }
        if ( search === term ) return;
        handleIsLoading( true );
        await SearchPodcasts( { search } ).then( ( podcasts ) => {
            handleSearchUsedChange( {
                hasResults: podcasts.resultCount > 0,
                term: search,
                podcasts,
            } );
            return podcasts;
        } );
        firstSearch && setFirstSearch( false );
        if ( window.location.pathname === SeekerConstants.BASE_LINK ) return;
        navigate( SeekerConstants.BASE_LINK );
    };
    const handleSearchTerm = useCallback( () => {
        if ( search === '' ) {
            setError( 'You can not do an empty search' );
            return;
        }
        if ( search.length < 3 ) {
            setError( 'The search must contain at least 3 characters' );
            return;
        }
    }, [ search ] );
    useEffect( () => {
        if ( isFirstRender.current ) {
            isFirstRender.current = search === '';
            return;
        }
        handleSearchTerm();
        setError( null );
    }, [ search, handleSearchTerm ] );
    return {
        search,
        error,
        firstSearch,
        handleInputChange,
        handleSearchSubmit,
    };
};
