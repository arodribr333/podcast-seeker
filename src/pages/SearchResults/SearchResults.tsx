import { IconSearchList } from '../../components/Icons/Icons';
import { Loading } from '../../components/Loading/Loading';
import { Podcast } from '../../components/Podcast/Podcast';
import { GenericLoadingStyles, SeekerTexts } from '../../constants/constants';
import { useSearchResults } from '../../hooks/useSearchResults';
import type { PodcastType } from '../../types/types';
import styles from './SearchResults.module.css';
export const SearchResults = () => {
    const { isLoading, podcasts, hasResults } = useSearchResults();
    return (
        <section className={styles.search}>
            <h2><IconSearchList /> {SeekerTexts.SEARCH_RESULTS}</h2>
            <div className={styles.searchResults}>
                {isLoading && <Loading loadingStyles={GenericLoadingStyles} />}
                {(!isLoading && hasResults) ? (
                    podcasts.results.map( ( podcast: PodcastType ) => (
                        <Podcast key={podcast.trackId} podcast={podcast} />
                    ) )
                ) : !isLoading &&  (
                    <p>{SeekerTexts.NEW_SEARCH}</p>
                )}
            </div>
        </section>
    );
};