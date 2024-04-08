import { useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import type { MappedXmlChannelItem } from "../../types/types";
import { IconCalendar, IconPlay, IconTime } from "../Icons/Icons";
import styles from "./PodcastTrack.module.css";
interface PodcastTrackProps {
	item: MappedXmlChannelItem;
}
export const PodcastTrack = ( { item }: PodcastTrackProps ) => {
	const { playerStatus, setPlayerStatus } = useContext( PlayerContext );
	const { searchUsed, channelUsed, player } = playerStatus;
	const { status } = player;
	const { id, audio } = item;
	const handleAudio = () => {
		setPlayerStatus( {
			searchUsed,
			channelUsed,
			player: {
				audioId: id,
				audioUrl: audio,
				status: 'running'
			}
		} );
	};
	return (
		<article className={styles.track}>
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
						{( item.duration.includes( ':' ) ) && <p className={styles.trackDuration}>
							<IconTime /> {item.duration}
						</p>}
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
				className={styles.actionButton}
				title={item.title}
				type="button"
				onClick={handleAudio}
			>
				<IconPlay />
			</button>
		</article>
	);
};
