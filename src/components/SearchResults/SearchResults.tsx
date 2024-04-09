import { useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import type { PodcastType } from '../../types/types';
import { Podcast } from '../Podcast/Podcast';
import styles from './SearchResults.module.css';

export const SearchResults = () => {
    const { searchUsed } = useContext( PlayerContext );
    const { hasResults, podcasts } = searchUsed;
    return (
        <section className={styles.search}>
            <h2>Resultados de la búsqueda:</h2>
            <div className={styles.searchResults}>
                {hasResults ? (
                    podcasts.results.map( ( podcast: PodcastType ) => (
                        <Podcast key={podcast.trackId} podcast={podcast} />
                    ) )
                ) : (
                    <p>Realiza una nueva búsqueda</p>
                )}
            </div>
        </section>
    );
};