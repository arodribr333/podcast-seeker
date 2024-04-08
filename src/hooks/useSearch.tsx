import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import { SearchPodcasts } from '../services/SearchPodcasts';

export const useSearch = () => {
	const { playerStatus, setPlayerStatus } = useContext( PlayerContext );
	const { channelUsed, player } = playerStatus;
	const [ firstSearch, setFirstSearch ] = useState( true );
	const [ search, updateSearch ] = useState( '' );
	const [ error, setError ] = useState<string | null>( null );
	const isFirstRender = useRef( true );
	const navigate = useNavigate();
	const handleInputChange = ( event: React.FormEvent<HTMLInputElement> ) => {
		updateSearch( event.currentTarget.value );
	};
	const handleSearchSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault();
		await SearchPodcasts( { search } ).then( ( podcasts ) => {
			setPlayerStatus( {
				player,
				channelUsed,
				searchUsed: {
					hasResults: podcasts.resultCount > 0,
					term: search,
					podcasts
				}
			} );
			return podcasts;
		} );
		firstSearch && setFirstSearch( false );
		if ( window.location.pathname === '/' ) return;
		navigate( "/" );
	};
	useEffect( () => {
		if ( isFirstRender.current ) {
			isFirstRender.current = search === '';
			return;
		}
		if ( search === '' ) {
			setError( 'No se puede buscar un string vacío' );
			return;
		}
		if ( search.length < 3 ) {
			setError( 'La búsqueda debe contener al menos 3 caracteres' );
			return;
		}
		setError( null );
	}, [ search ] );
	return {
		search,
		error,
		firstSearch,
		handleInputChange,
		handleSearchSubmit
	};
};
