import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import type { MappedXmlChannelItem } from '../../types/types';
import { IconCalendar, IconPause, IconPlay, IconTime } from '../Icons/Icons';
import styles from './PodcastTrack.module.css';
interface PodcastTrackProps {
    item: MappedXmlChannelItem;
}
export const PodcastTrack = ( { item }: PodcastTrackProps ) => {
    const {
        url,
        isPlaying,
        handleTimeChange,
        handleUrlChange,
        handlePlayer,
        handlePlay,
        handlePause,
    } = useContext( PlayerContext );

    const [ trackRunning, setTrackRunning ] = useState( false );

    useEffect( () => {
        setTrackRunning( isPlaying && url === item.audio );
    }, [ isPlaying, url, item.audio ] );

    const handleAddTrack = () => {
        const { title, image, channel, audio } = item;
        handleTimeChange( 0 );
        handlePlayer( { title, image, channel } );
        handleUrlChange( audio );
        trackRunning ? handlePause() : handlePlay();
    };

    const trackClass = `${ styles.track } ${ trackRunning ? styles.active : '' }`;

    return (
        <article className={trackClass}>
            <div className={styles.trackItem}>
                <img
                    className={styles.trackImg}
                    src={item.image}
                    alt={item.title}
                />
                <div className={styles.trackInfo}>
                    <h4 className={styles.title}>{item.title}</h4>
                    <div className={styles.dateAndDuration}>
                        <p className={styles.date}>
                            <IconCalendar /> {item.date}
                        </p>
                        {item.duration.includes( ':' ) && (
                            <p className={styles.trackDuration}>
                                <IconTime /> {item.duration}
                            </p>
                        )}
                    </div>
                    {item.season && item.episode && (
                        <p className={styles.seasonEpisode}>
                            <span className={styles.bold}>S</span>
                            {item.season}/<span className={styles.bold}>E</span>
                            {item.episode}
                        </p>
                    )}
                </div>
            </div>
            <button
                className={`${ styles.actionButton } ${ trackRunning ? styles.active : ''
                    }`}
                title={item.title}
                type="button"
                onClick={handleAddTrack}
            >
                {trackRunning ? <IconPause /> : <IconPlay />}
            </button>
        </article>
    );
};
