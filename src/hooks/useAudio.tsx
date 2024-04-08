import { useEffect, useState } from 'react';

export const useAudio = ( url: string ) => {
    const [ audio ] = useState( new Audio( url ) );
    const [ playing, setPlaying ] = useState( false );

    const togglePlay = () => setPlaying( !playing );

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect( () => {
        playing ? audio.play() : audio.pause();
    }, [ playing ] );

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect( () => {
        audio.addEventListener( "ended", () => setPlaying( false ) );
        return () => {
            audio.removeEventListener( "ended", () => setPlaying( false ) );
        };
    }, [] );

    return {
        playing,
        togglePlay
    };
};
