import { useEffect, useState } from 'react';

export function useLocalStorage<T> ( key: string, defaultValue: T ): [ T, ( newValue: T ) => void ] {
    const [ value, setValue ] = useState( () => {
        const storedValue = localStorage.getItem( key );
        if ( storedValue ) {
            return JSON.parse( storedValue ) as T;
        }
        return defaultValue;
    } );

    useEffect( () => {
        localStorage.setItem( key, JSON.stringify( value ) );
    }, [ value ] );

    return [ value, setValue ];
}
