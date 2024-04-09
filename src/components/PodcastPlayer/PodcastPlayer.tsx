import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { IconPause, IconPlay } from '../Icons/Icons';
import styles from './PodcastPlayer.module.css';

export const PodcastPlayer = () => {
    const {
        url,
        isPlaying,
        volume,
        currentTime,
        handlePlay,
        handlePause,
        handleVolumeChange,
        handleTimeChange,
    } = useContext( PlayerContext );

    const audioRef = useRef<HTMLAudioElement | null>( null );
    useEffect( () => {
        if ( !audioRef.current ) return;

        const audio = audioRef.current;
        audio.src = url;
        audio.volume = volume;
        audio.currentTime = currentTime;
        if ( isPlaying ) {
            audio.play();
        } else {
            audio.pause();
        }

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, [ url, isPlaying, volume ] );
    const handleTimeUpdate = (
        event: React.SyntheticEvent<HTMLAudioElement>,
    ) => {
        if ( !audioRef.current ) return;

        const audio = audioRef.current;
        handleTimeChange( audio.currentTime );
    };
    const handleRunning = () => {
        if ( isPlaying ) {
            handlePause();
            return;
        }
        handlePlay();
    };

    return (
        <div className={styles.player}>
            {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
            <audio
                ref={audioRef}
                controls
                onTimeUpdate={handleTimeUpdate}
            />
            {/* <button
                onClick={handlePlay}
                type="button"
            >
                <IconPlay />
            </button> */}
            <button
                className={styles.runningButton}
                onClick={handleRunning}
                type="button"
            >
                {( isPlaying ) && <IconPause />}
                {( !isPlaying ) && <IconPlay />}
            </button>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={( event ) =>
                    handleVolumeChange( event.target.valueAsNumber )
                }
            />
        </div>
    );
};
