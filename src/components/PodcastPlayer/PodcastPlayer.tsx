import { SeekerTexts } from '../../constants/constants';
import { usePodcastPlayer } from '../../hooks/usePodcastPlayer';
import {
    IconCollapsePlayer,
    IconPause,
    IconPlay,
    IconTimeBackward,
    IconTimeForward,
    IconUnCollapsePlayer,
    IconVolume,
    IconVolumeOff,
    IconVolumeOn,
} from '../Icons/Icons';
import styles from './PodcastPlayer.module.css';
export const PodcastPlayer = () => {
    const {
        isPlaying, volume, currentTime, player,
        audioRef,
        collapsed,
        mute,
        currentShown,
        totalTime,
        imageSrc, 
        handleCollapsePlayer,
        handleModifiedTime,
        handleTimeUpdate,
        handleRunning,
        handleSwitchMute,
        onVolumeChange,
        onTimeChange,
        handleImageError
    } = usePodcastPlayer();
    const { title, channel } = player;

    return (
        <div
            className={`${ styles.player } ${ collapsed ? styles.collapsed : '' }`}
        >
            <button
                className={styles.buttonCollapseStatus}
                type='button'
                title={collapsed ? SeekerTexts.UNCOLLAPSE : SeekerTexts.COLLAPSE}
                onClick={handleCollapsePlayer}
            >
                {collapsed ? <IconUnCollapsePlayer /> : <IconCollapsePlayer />}
            </button>
            <figure className={styles.playerFigure}>
                <img
                    src={imageSrc}
                    alt={title}
                    onError={handleImageError}
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
                        title={SeekerTexts.RETURN_TIME}
                        className={styles.playerButton}
                        onClick={() => handleModifiedTime( -10 )}
                        disabled={!isPlaying}
                        type='button'
                    >
                        <IconTimeBackward />
                    </button>
                    <button
                        title={`${ isPlaying ? SeekerTexts.PLAY : SeekerTexts.PAUSE }`}
                        className={styles.playerButton}
                        onClick={handleRunning}
                        type='button'
                    >
                        {isPlaying ? <IconPause /> : <IconPlay />}
                    </button>
                    <button
                        title={SeekerTexts.ADVANCE_TIME}
                        className={styles.playerButton}
                        onClick={() => handleModifiedTime( 10 )}
                        disabled={!isPlaying}
                        type='button'
                    >
                        <IconTimeForward />
                    </button>
                    <button
                        className={styles.playerButton}
                        title={`${ mute ? SeekerTexts.UNMUTE : SeekerTexts.MUTE }`}
                        onClick={handleSwitchMute}
                        type='button'
                    >
                        {mute ? <IconVolumeOn /> : <IconVolumeOff />}
                    </button>
                    <div className={styles.volumeControl}>
                        <button
                            className={`${ styles.playerButton } ${ styles.volumeHandler }`}
                            title={SeekerTexts.VOLUME_REGULATOR_DISPLAY}
                            type='button'
                        >
                            <IconVolume />
                        </button>
                        <input
                            className={`${ styles.rangeBar } ${ styles.volumeRange }`}
                            type='range'
                            min='0'
                            max='1'
                            step='0.01'
                            value={volume}
                            onChange={( event ) =>
                                onVolumeChange( event.target.valueAsNumber )
                            }
                        />
                    </div>
                </div>
                <div className={styles.timeHandler}>
                    <input
                        className={`${ styles.rangeBar } ${ styles.seekBar }`}
                        type='range'
                        min='0'
                        max={audioRef.current?.duration || 0}
                        value={currentTime}
                        onChange={( event ) =>
                            onTimeChange( event.target.valueAsNumber )
                        }
                    />
                    <p className={styles.time}>
                        {currentShown}/{totalTime}
                    </p>
                </div>
            </div>
        </div>
    );
};
