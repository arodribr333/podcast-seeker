import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";

export const usePodcastPlayer = () => {
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
    const [ duration, setDuration ] = useState( 0 );
    const [ totalTime, setTotalTime ] = useState<string>( "" );
    const [ mute, setMute ] = useState<boolean>( false );
    const [ currentShown, setCurrentShown ] = useState<string>( "" );
    const [ collapsed, setCollapsed ] = useState<boolean>( false );

    useEffect( () => {
        if ( !audioRef.current ) return;

        const audio = audioRef.current;
        const newAudio = new Audio( url );
        newAudio.onloadedmetadata = () => {
            setDuration( newAudio.duration );
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
    }, [ url ] );

    useEffect( () => {
        if ( !audioRef.current ) return;

        const audio = audioRef.current;
        audio.volume = volume;
        if ( volume === 0 ) {
            setMute( true );
        } else {
            setMute( false );
        }
    }, [ volume ] );

    useEffect( () => {
        const time = formatTotalTime( currentTime );
        setCurrentShown( time );
    }, [ currentTime ] );

    useEffect( () => {
        const total = formatTotalTime( duration );
        setTotalTime( total );
    }, [ duration ] );

    useEffect( () => {
        if ( !audioRef.current ) return;
        const audio = audioRef.current;
        if ( isPlaying ) {
            handlePlay();
            audio.play();
        } else {
            handlePause();
            audio.pause();
        }
    }, [ isPlaying ] );

    const formatTime = useCallback( ( seconds: number ) => {
        const hours = Math.floor( seconds / 3600 );
        const minutes = Math.floor( ( seconds % 3600 ) / 60 );
        const secondsLeft = Math.floor( ( seconds % 3600 ) % 60 );
        return `${ hours.toString().padStart( 2, "0" ) }:${ minutes
            .toString()
            .padStart( 2, "0" ) }:${ secondsLeft.toString().padStart( 2, "0" ) }`;
    }, [] );

    const formatTotalTime = useCallback(
        ( duration: number ) => {
            if ( !duration ) return "00:00:00";
            return formatTime( duration );
        },
        [ formatTime ],
    );

    const handleTimeUpdate = (
        event: React.SyntheticEvent<HTMLAudioElement>,
    ) => {
        console.log( event );
        if ( !audioRef.current ) return;

        const audio = audioRef.current;
        handleTimeChange( audio.currentTime );
    };

    const handleRunning = () => {
        if ( isPlaying ) {
            handlePause();
        } else {
            handlePlay();
        }
    };

    const handleSwitchMute = () => {
        if ( !audioRef.current ) return;

        const audio = audioRef.current;
        if ( volume > 0 && audio.volume === volume ) {
            audio.volume = 0;
            setMute( true );
        } else {
            audio.volume = volume;
            setMute( false );
        }
    };

    const onVolumeChange = ( volume: number ) => {
        if ( !audioRef.current ) return;

        const newVolume = volume;
        audioRef.current.volume = newVolume;
        handleVolumeChange( newVolume );
    };

    const onTimeChange = ( time: number ) => {
        if ( !audioRef.current ) return;

        const audio = audioRef.current;
        const newTime = time;
        audio.currentTime = newTime;
        handleTimeChange( newTime );
    };

    const handleModifiedTime = ( amount: number ) => {
        if ( !audioRef.current ) return;
        const audio = audioRef.current;
        const newTime = currentTime + amount;
        audio.currentTime = newTime;
        // if ( newTime <= 0 ) return;
        // if ( currentTime >= duration ) return;
        handleTimeChange( newTime );
    };
    const handleCollapsePlayer = () => {
        setCollapsed( !collapsed );
    };
    return {
        audioRef,
        duration,
        totalTime,
        mute,
        currentShown,
        collapsed,
        handleCollapsePlayer,
        handleTimeUpdate,
        handleModifiedTime,
        handleRunning,
        handleSwitchMute,
        onVolumeChange,
        onTimeChange,
    };
};
