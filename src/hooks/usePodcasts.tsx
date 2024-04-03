import { useState } from "react";
import type { PodcastsResponse } from '../types/types.d';
const initialPodcastsResponse: PodcastsResponse = {
    resultCount: 0,
    results: []
};
export const usePodcasts = () => {
    const [ podcasts, setPodcasts ] = useState( initialPodcastsResponse );
    const hasResults = podcasts.resultCount > 0;
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
