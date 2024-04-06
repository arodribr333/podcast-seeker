import { useContext } from 'react';
import { SearchsContext } from '../../context/SearchsContext';
import { Podcast } from '../Podcast/Podcast';
import styles from './SearchResults.module.css';

export const SearchResults = () => {
    const { searchInfo } = useContext( SearchsContext );
    return (
        <section className={styles.search}>
            <h2>Resultados de la búsqueda:</h2>
            <div className={styles.searchResults}>
                {searchInfo.searchUsed.hasResults ? (
                    searchInfo.searchUsed.podcasts.results.map( ( result ) => (
                        <Podcast key={result.trackId} podcast={result} />
                    ) )
                ) : (
                    <p>Realiza una nueva búsqueda</p>
                )}
            </div>
        </section>
    );
};