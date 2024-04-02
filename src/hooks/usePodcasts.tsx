import { useEffect, useState } from "react";
import type { PodcastsResponse } from '../types/types.d';
import { useXMLParser } from "./useXMLParses";
const initialPodcastsResponse: PodcastsResponse = {
    resultCount: 0,
    results: []
};
export const usePodcasts = () => {
    const [ podcasts, setPodcasts ] = useState( initialPodcastsResponse );
    const hasResults = podcasts.resultCount > 0;
    const { handleChannel } = useXMLParser();
    useEffect( () => {
        podcasts.results.map( async ( result ) => {
            try {
                const response = await fetch( result.feedUrl );
                const text = await response.text();
                const channel = handleChannel( { inputData: text } );
                console.log( channel );
            } catch ( e ) {
                throw new Error( 'Searching podcast error' );
            }
        } );
    }, [ podcasts, handleChannel ] );

    const handleSetPodcasts = ( inputPodcast: PodcastsResponse ) => {
        if ( !inputPodcast ) return;
        if ( inputPodcast === podcasts ) return;
        setPodcasts( inputPodcast );
    };
    return {
        hasResults,
        podcasts,
        handleSetPodcasts
    };
};
