import { useChannels } from '../../hooks/useChannels';
import type { PodcastType } from "../../types/types";
import { IconView } from "../Icons/Icons";
import styles from "./Podcast.module.css";
const GENRE = 'Podcasts';
interface PodcastProps {
    podcast: PodcastType;
}
export const Podcast = ( { podcast }: PodcastProps ) => {
    const { getChannel } = useChannels();

    const handleViewPodcast = () => {
        getChannel( podcast.feedUrl ).then( ( data ) => console.log( data ) );
    };
    return (
        <article className={styles.podcast}>
            <div className={styles.podcastInfo}>
                <figure className={styles.podcastFigure}>
                    <img src={podcast.artworkUrl100} alt={podcast.collectionName} />
                </figure>
                <div className={styles.podcastData}>
                    <h3 className={styles.podcastTitle}>{podcast.artistName}</h3>
                    <p className={styles.podcastDescription}>{podcast.collectionName}</p>
                    <ul className={styles.podcastGenreList}>
                        {podcast.genres.map( ( genre ) => (
                            genre !== GENRE &&
                            <li
                                className={`${ styles.podcastGenre } ${ podcast.primaryGenreName === genre &&
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
                title={`Ver ${ podcast.collectionName }`}
                onClick={handleViewPodcast}>
                <IconView />
            </button>
            {/* <div className={styles.channel}>
                {channel.items.map((item) => (
                    <PodcastTrack
                        key={item.audio}
                        item={item}
                    />
                ))}
            </div> */}
        </article>
    );
};