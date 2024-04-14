import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { usePodcastPlayer } from "../../hooks/usePodcastPlayer";
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
} from "../Icons/Icons";
import styles from "./PodcastPlayer.module.css";
export const PodcastPlayer = () => {
    const { isPlaying, volume, currentTime, player } =
        useContext( PlayerContext );
    const { title, image, channel } = player;
    const {
        audioRef,
        collapsed,
        mute,
        currentShown,
        totalTime,
        handleCollapsePlayer,
        handleModifiedTime,
        handleTimeUpdate,
        handleRunning,
        handleSwitchMute,
        onVolumeChange,
        onTimeChange,
    } = usePodcastPlayer();

    return (
        <div
            className={`${ styles.player } ${ collapsed ? styles.collapsed : "" }`}
        >
            <button
                className={styles.buttonCollapseStatus}
                type="button"
                title={collapsed ? "Uncollapse" : "Collapse"}
                onClick={handleCollapsePlayer}
            >
                {collapsed ? <IconUnCollapsePlayer /> : <IconCollapsePlayer />}
            </button>
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
                        title="Return 10 seconds"
                        className={styles.playerButton}
                        onClick={() => handleModifiedTime( -10 )}
                        disabled={!isPlaying}
                        type="button"
                    >
                        <IconTimeBackward />
                    </button>
                    <button
                        title={`${ isPlaying ? "Pause" : "Play" }`}
                        className={styles.playerButton}
                        onClick={handleRunning}
                        type="button"
                    >
                        {isPlaying ? <IconPause /> : <IconPlay />}
                    </button>
                    <button
                        title="Advance 10 seconds"
                        className={styles.playerButton}
                        onClick={() => handleModifiedTime( 10 )}
                        disabled={!isPlaying}
                        type="button"
                    >
                        <IconTimeForward />
                    </button>
                    <button
                        className={styles.playerButton}
                        title={`${ mute ? "Unmute" : "Mute" }`}
                        onClick={handleSwitchMute}
                        type="button"
                    >
                        {mute ? <IconVolumeOn /> : <IconVolumeOff />}
                    </button>
                    <div className={styles.volumeControl}>
                        <button
                            className={`${ styles.playerButton } ${ styles.volumeHandler }`}
                            title="Display volume regulator"
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
                <div className={styles.timeHandler}>
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
                    <p className={styles.time}>
                        {currentShown}/{totalTime}
                    </p>
                </div>
            </div>
        </div>
    );
};
