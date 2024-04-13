import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { IconPause, IconPlay, IconTimeBackward, IconTimeForward, IconVolume, IconVolumeOff, IconVolumeOn } from "../Icons/Icons";
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
    const [ mute, setMute ] = useState<boolean>( false );
    const [ currentShown, setCurrentShown ] = useState<string>( '' );
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
    useEffect( () => {
        if ( !audioRef.current ) return;
        const audio = audioRef.current;
        audio.volume = volume;
        if ( volume === 0 ) {
            setMute( true );
            return;
        }
        setMute( false );
    }, [ volume ] );

    const formatTime = useCallback( ( seconds: number ) => {
        const horas = Math.floor( seconds / 3600 );
        const minutes = Math.floor( ( seconds % 3600 ) / 60 );
        const secondsLeft = Math.floor( ( seconds % 3600 ) % 60 );
        return `${ horas.toString().padStart( 2, "0" ) }:${ minutes.toString().padStart( 2, "0" ) }:${ secondsLeft
            .toString()
            .padStart( 2, "0" ) }`;
    }, [] );

    const formatTotalTime = useCallback( ( duration: number ) => {
        if ( !duration ) return "00:00:00";
        return formatTime( duration );
    }, [] );

    useEffect( () => {
        if ( currentTime === duration ) return;
        const time = formatTotalTime( currentTime );
        setCurrentShown( time );
    }, [ currentTime ] );

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
    const handleSwitchMute = () => {
        if ( !audioRef.current ) return;
        const audio = audioRef.current;
        if ( volume > 0 && ( audio.volume === volume ) ) {
            audio.volume = 0;
            setMute( true );
            return;
        }
        audio.volume = volume;
        setMute( false );
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
    const handleModifiedTime = ( amount: number ) => {
        const audio = audioRef.current;
        if ( !audio ) return;
        const newTime = currentTime + ( amount );
        audio.currentTime = newTime;
        handleTimeChange( newTime );
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
                        title='Return 10 seconds'
                        className={styles.playerButton}
                        onClick={() => handleModifiedTime( -10 )}
                        disabled={!isPlaying}
                        type="button"
                    >
                        <IconTimeBackward />
                    </button>
                    <button
                        title={`${ ( isPlaying && 'Pause' ) || ( !isPlaying && 'Play' ) }`}
                        className={styles.playerButton}
                        onClick={handleRunning}
                        type="button"
                    >
                        {isPlaying && <IconPause />}
                        {!isPlaying && <IconPlay />}
                    </button>
                    <button
                        title='Advance 10 seconds'
                        className={styles.playerButton}
                        onClick={() => handleModifiedTime( 10 )}
                        disabled={!isPlaying}
                        type="button"
                    >
                        <IconTimeForward />
                    </button>
                    <button
                        className={styles.playerButton}
                        title={`${ ( mute && 'Unmute' ) || ( !mute && 'Mute' ) }`}
                        onClick={handleSwitchMute}
                        type="button"
                    >
                        {mute && <IconVolumeOn />}
                        {!mute && <IconVolumeOff />}
                    </button>
                    <div className={styles.volumeControl}>
                        <button
                            className={`${ styles.playerButton } ${ styles.volumeHandler }`}
                            title='Display volume regulator'
                            type="button"
                        >
                            <IconVolume />
                        </button>
                        <input
                            className={`${ styles.rangeBar } ${ styles.volumeRange }`}
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
                    <p className={styles.time}>{currentShown}/{totalTime}</p>
                </div>
            </div>
        </div>
    );
};
