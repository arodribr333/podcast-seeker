import { useEffect, useState } from 'react';

type KeyPath<T> = keyof T & string;
type Index = string | string[];

interface DBConfig<T> {
    name: string;
    version: number;
    storeName: string;
    keyPath: KeyPath<T>;
    indexes?: Array<{ name: string; keyPath: Index; unique?: boolean; }>;
}

function useIndexedDB<T> ( config: DBConfig<T> ) {
    const [ db, setDb ] = useState<IDBDatabase | null>( null );
    const [ error, setError ] = useState<string | null>( null );

    useEffect( () => {
        const request = indexedDB.open( config.name, config.version );

        request.onerror = () => {
            setError( 'Error when opening the database' );
        };

        request.onsuccess = () => {
            setDb( request.result );
        };

        request.onupgradeneeded = ( event ) => {
            console.log( event );
            const db = request.result;
            const store = db.createObjectStore( config.storeName, { keyPath: config.keyPath } );

            if ( config.indexes ) {
                config.indexes.forEach( ( index ) => {
                    store.createIndex( index.name, index.keyPath, { unique: index.unique } );
                } );
            }
        };
    }, [ config ] );

    function getObjectStore ( transaction: IDBTransaction ) {
        return transaction.objectStore( config.storeName );
    }

    function get<T> ( key: any ): Promise<T | undefined> {
        return new Promise( ( resolve, reject ) => {
            if ( !db ) {
                reject( 'The database is not ready' );
                return;
            }

            const transaction = db.transaction( [ config.storeName ], 'readonly' );
            const store = getObjectStore( transaction );

            const request = store.get( key );
            request.onsuccess = () => {
                resolve( request.result );
            };
            request.onerror = () => {
                reject( 'Error obtaining the object' );
            };
        } );
    }

    function set ( key: any, value: T ): Promise<void> {
        return new Promise( ( resolve, reject ) => {
            if ( !db ) {
                reject( 'The database is not ready' );
                return;
            }

            const transaction = db.transaction( [ config.storeName ], 'readwrite' );
            const store = getObjectStore( transaction );

            const request = store.put( value, key );
            request.onsuccess = () => {
                resolve();
            };
            request.onerror = () => {
                reject( 'Error to store the object' );
            };
        } );
    }

    return { db, error, get, set };
}

export default useIndexedDB;
