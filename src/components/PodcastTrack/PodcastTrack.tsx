import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import type { MappedXmlChannelItem } from "../../types/types";
import { IconCalendar, IconPause, IconPlay, IconTime } from "../Icons/Icons";
import styles from "./PodcastTrack.module.css";
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
        if ( isPlaying && url === item.audio ) {
            setTrackRunning( true );
            return;
        }
        setTrackRunning( false );
    }, [ isPlaying, url ] );
    const handleAddTrack = () => {
        const { title, image, channel } = item;
        handleTimeChange( 0 );
        handlePlayer( { title, image, channel } );
        handleUrlChange( item.audio );
        // if ( isPlaying ) {
        // 	handlePause();
        // 	return;
        // };
        // handlePlay();
        // };
    };
    return (
        <article
            // className={styles.track}
            className={`${ styles.track } ${ trackRunning && styles.active }`}
        >
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
                        {item.duration.includes( ":" ) && (
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
                // className={`${trackRuninng ? ${styles.active} ${styles.actionButton} : ${styles.actionButton}}`}
                className={`${ styles.actionButton } ${ trackRunning && styles.active
                    }`}
                title={item.title}
                type="button"
                onClick={handleAddTrack}
            >
                {trackRunning && <IconPause />}
                {!trackRunning && <IconPlay />}
            </button>
        </article>
    );
};
