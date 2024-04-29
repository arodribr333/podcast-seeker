import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeekerConstants, SeekerTexts } from '../../constants/constants';
import { PlayerContext } from '../../context/PlayerContext';
import type { PodcastType } from '../../types/types';
import { IconView } from '../Icons/Icons';
import styles from './Podcast.module.css';
const GENRE = 'Podcasts';
interface PodcastProps {
    podcast: PodcastType;
}
export const Podcast = ( { podcast }: PodcastProps ) => {
    const { handleChannelUsedChange, handleIsLoading } = useContext( PlayerContext );
    const navigate = useNavigate();
    const { feedUrl, trackId, artworkUrl100, collectionName, artistName, genres, primaryGenreName } = podcast;
    const handleViewPodcast = () => {
        handleIsLoading( true );
        handleChannelUsedChange( {
            trackId,
            feedUrl,
        } );
        navigate( SeekerConstants.CHANNEL_LINK );
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
                type='button'
                title={`${SeekerTexts.WATCH} ${ collectionName }`}
                onClick={handleViewPodcast}>
                <IconView />
            </button>
        </article>
    );
};
