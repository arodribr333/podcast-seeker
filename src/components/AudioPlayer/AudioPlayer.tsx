import { useAudio } from '../../hooks/useAudio';

export const AudioPlayer = ( { url } ) => {
    const { playing, togglePlay } = useAudio( url );

    return (
        <div>
            <button onClick={togglePlay} type='button'>{playing ? "Pause" : "Play"}</button>
        </div>
    );
};
