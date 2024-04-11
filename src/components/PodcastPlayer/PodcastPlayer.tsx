import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { IconPause, IconPlay } from "../Icons/Icons";
import styles from "./PodcastPlayer.module.css";

export const PodcastPlayer = () => {
    const {
        url,
        isPlaying,
        volume,
        currentTime,
        player,
        handlePlay,
        handlePause,
        handleVolumeChange,
        handleTimeChange,
    } = useContext( PlayerContext );
    const { title, image, channel } = player;
    const audioRef = useRef<HTMLAudioElement | null>( null );
    const [ duration, setDuration ] = useState( 0 );
    const [ totalTime, setTotalTime ] = useState<string>( '' );
    const [ runningTime, setRunningTime ] = useState<string>( '' );
    useEffect( () => {
        if ( !audioRef.current ) return;

        const audio = audioRef.current;
        const audioInfo = new Audio( url );
        audioInfo.onloadedmetadata = () => {
            setDuration( audioInfo.duration );
        };
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
    }, [ url, isPlaying ] );

    const formatTime = useCallback( ( seconds: number ) => {
        const horas = Math.floor( seconds / 3600 );
        const minutes = Math.floor( ( seconds % 3600 ) / 60 );
        const secondsLeft = Math.floor( ( seconds % 3600 ) % 60 );
        return `${ horas.toString().padStart( 2, "0" ) }:${ minutes.toString().padStart( 2, "0" ) }:${ secondsLeft
            .toString()
            .padStart( 2, "0" ) }`;
    }, [] );

    const formatTotalTime = useCallback( ( duration: number ) => {
        if ( !duration ) return "--:--";
        return formatTime( duration );
    }, [] );
    useEffect( () => {
        const total = formatTotalTime( duration );
        setTotalTime( total );
    }, [ duration ] );
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
    const onVolumeChange = ( volume: number ) => {
        if ( !audioRef.current ) return;
        const newVolume = volume;
        audioRef.current.volume = newVolume;
        handleVolumeChange( newVolume );
    };
    const onTimeChange = ( time: number ) => {
        const audio = audioRef.current;
        if ( !audio ) return;
        const newTime = time;
        audio.currentTime = newTime;
        setDuration( audio.duration );
        handleTimeChange( currentTime );
    };
    return (
        <div className={styles.player}>
            <figure className={styles.playerFigure}>
                <img
                    src={image}
                    alt={title}
                />
            </figure>
            <div className={styles.playerContent}>
                <h3 className={styles.playerTitle}>{title}</h3>
                <p className={styles.playerChannel}>{channel}</p>
                {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
                <audio
                    ref={audioRef}
                    controls
                    onTimeUpdate={handleTimeUpdate}
                />
                <div className={styles.playerActions}>
                    <button
                        className={styles.runningButton}
                        onClick={handleRunning}
                        type="button"
                    >
                        {isPlaying && <IconPause />}
                        {!isPlaying && <IconPlay />}
                    </button>
                    <input
                        className={styles.rangeBar}
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={( event ) =>
                            onVolumeChange( event.target.valueAsNumber )
                        }
                    />
                </div>
                <div>
                    <input
                        className={`${ styles.rangeBar } ${ styles.seekBar }`}
                        type="range"
                        min="0"
                        max={audioRef.current?.duration || 0}
                        value={currentTime}
                        onChange={( event ) =>
                            onTimeChange( event.target.valueAsNumber )
                        }
                    />
                    <p>{totalTime}</p>
                </div>
            </div>
        </div>
    );
};
