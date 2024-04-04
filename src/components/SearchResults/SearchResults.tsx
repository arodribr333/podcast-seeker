import type { PodcastsResponse } from '../../types/types';
import { Podcast } from '../Podcast/Podcast';
import styles from './SearchResults.module.css';

interface SearchResultsProps {
    hasResults: boolean,
    podcasts: PodcastsResponse;
}
export const SearchResults = ( { hasResults, podcasts }: SearchResultsProps ) => {
    return (
        <section className={styles.search}>
            <h2>Resultados de la búsqueda:</h2>
            <div className={styles.searchResults}>
                {hasResults ? (
                    podcasts.results.map( ( result ) => (
                        <Podcast key={result.trackId} podcast={result} />
                    ) )
                ) : (
                    <p>Realiza una nueva búsqueda</p>
                )}
            </div>
        </section>
    );
};