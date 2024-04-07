import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchsContext } from '../../context/SearchsContext';
import type { PodcastType } from "../../types/types";
import { IconView } from "../Icons/Icons";
import styles from "./Podcast.module.css";
const GENRE = 'Podcasts';
interface PodcastProps {
    podcast: PodcastType;
}
export const Podcast = ( { podcast }: PodcastProps ) => {
    const { searchInfo, setSearchInfo } = useContext( SearchsContext );
    const { searchUsed } = searchInfo;
    const navigate = useNavigate();
    // const { getChannel } = useChannels();
    const { feedUrl, trackId, artworkUrl100, collectionName, artistName, genres, primaryGenreName } = podcast;
    const handleViewPodcast = () => {
        setSearchInfo( {
            searchUsed,
            channelUsed: {
                trackId,
                feedUrl,
            }
        } );
        navigate( '/channel' );
    };
    return (
        <article className={styles.podcast}>
            <div className={styles.podcastInfo}>
                <figure className={styles.podcastFigure}>
                    <img src={artworkUrl100} alt={collectionName} />
                </figure>
                <div className={styles.podcastData}>
                    <h3 className={styles.podcastTitle}>{artistName}</h3>
                    <p className={styles.podcastDescription}>{collectionName}</p>
                    <ul className={styles.podcastGenreList}>
                        {genres.map( ( genre ) => (
                            genre !== GENRE &&
                            <li
                                className={`${ styles.podcastGenre } ${ primaryGenreName === genre &&
                                    styles.podcastGenrePrimary
                                    }`}
                                key={genre}
                            >
                                {genre}
                            </li>
                        ) )}
                    </ul>
                </div>
            </div>
            <button
                className={styles.podcastButton}
                type="button"
                title={`Ver ${ collectionName }`}
                onClick={handleViewPodcast}>
                <IconView />
            </button>
        </article>
    );
};
