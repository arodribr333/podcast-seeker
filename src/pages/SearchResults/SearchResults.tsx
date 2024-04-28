import { useContext, useEffect } from 'react';
import { IconSearchList } from '../../components/Icons/Icons';
import { Podcast } from '../../components/Podcast/Podcast';
import { SeekerConstants, SeekerTexts } from '../../constants/constants';
import { PlayerContext } from '../../context/PlayerContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { PodcastType } from '../../types/types';
import styles from './SearchResults.module.css';

export const SearchResults = () => {
    const { searchUsed } = useContext( PlayerContext );
    const { hasResults, podcasts } = searchUsed;
    const [ data, setData ] = useLocalStorage<null>(SeekerConstants.CHANNEL_KEY, null);
    useEffect( () => {
        if ( !data ) return;
        setData( null );
        return;
    }, [] );
    return (
        <section className={styles.search}>
            <h2><IconSearchList /> {SeekerTexts.SEARCH_RESULTS}</h2>
            <div className={styles.searchResults}>
                {hasResults ? (
                    podcasts.results.map( ( podcast: PodcastType ) => (
                        <Podcast key={podcast.trackId} podcast={podcast} />
                    ) )
                ) : (
                    <p>{SeekerTexts.NEW_SEARCH}</p>
                )}
            </div>
        </section>
    );
};