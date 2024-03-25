import type { MappedXmlChannelItem } from "../../types/types";
import { IconPlay, IconTime } from "../Icons/Icons";
import styles from "./PodcastTrack.module.css";
interface PodcastTrackProps {
	item: MappedXmlChannelItem;
}
export const PodcastTrack = ({ item }: PodcastTrackProps) => {
	return (
		<article className={styles.track}>
			<div className={styles.trackItem}>
				<img className={styles.trackImg} src={item.image} alt={item.title} />
				<div className={styles.trackInfo}>
					<h4 className={styles.title}>{item.title}</h4>
					<p className={styles.trackDuration}>
						<IconTime /> {item.duration}
					</p>
					<p className={styles.seasonEpisode}>
						<span className={styles.bold}>S</span>
						{item.season}/<span className={styles.bold}>E</span>
						{item.episode}
					</p>
				</div>
			</div>
			<button
				className={styles.actionButton}
				title={item.title}
				type="button"
				onClick={() => {}}
			>
				<IconPlay />
			</button>
		</article>
	);
};
