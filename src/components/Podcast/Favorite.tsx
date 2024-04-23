import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../../context/PlayerContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { ReturnedChannel } from "../../types/types";
import { IconView } from "../Icons/Icons";
import styles from "./Podcast.module.css";
interface FavoriteProps {
    favorite: ReturnedChannel;
}
export const Favorite = ( { favorite }: FavoriteProps ) => {
    const { handleChannelUsedChange } = useContext( PlayerContext );
    const navigate = useNavigate();
	const [data, setData] = useLocalStorage<Error | ReturnedChannel | null>(
		'channel',
		null,
    );
    const { id, feedUrl, title, description, image } = favorite;
    const handleViewChannel = () => {
        handleChannelUsedChange( {
            trackId: id,
            feedUrl: feedUrl
        } );
        setData( favorite );
        setTimeout( () => {
            console.log( data );
            navigate( '/channel' );
        }, 300 );
    };
    
    return (
        <article className={styles.podcast}>
            <div className={styles.podcastInfo}>
                <figure className={styles.podcastFigure}>
                    <img src={image} alt={description} />
                </figure>
                <div className={styles.podcastData}>
                    <h3 className={styles.podcastTitle}>{title}</h3>
                    <p className={styles.podcastDescription}>{description}</p>
                </div>
            </div>
            <button
                className={styles.podcastButton}
                type="button"
                title={`Ver ${ title }`}
                onClick={handleViewChannel}>
                <IconView />
            </button>
        </article>
    );
};
