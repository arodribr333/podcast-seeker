import { useEffect, useRef, useState } from 'react';

export const useSearch = () => {
	const [ search, updateSearch ] = useState( '' );
	const [ error, setError ] = useState<string | null>( null );
	const isFirstRender = useRef( true );
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
		updateSearch
	};
};
