import {
	usePodcastTrack,
	type PodcastTrackProps,
} from '../../hooks/usePodcastTrack';
import { IconCalendar, IconFavorite, IconNoFavorite, IconPause, IconPlay, IconTime } from '../Icons/Icons';
import styles from './PodcastTrack.module.css';
export const PodcastTrack = ({ item }: PodcastTrackProps) => {
	const { imageSrc, trackRunning, favorite, handleAddTrack, handleFavoriteSwitch, handleImageError } = usePodcastTrack({ item });
	return (
		<article className={`${styles.track} ${trackRunning ? styles.active : ''}`}>
			<div className={styles.trackItem}>
				<img
					className={styles.trackImg}
					src={imageSrc}
					alt={item.title}
					onError={handleImageError}
				/>
				<div className={styles.trackInfo}>
					<h4 className={styles.title}>{item.title}</h4>
					<div className={styles.dateAndDuration}>
						<p className={styles.date}>
							<IconCalendar /> {item.date}
						</p>
						{item.duration.includes(':') && (
							<p className={styles.trackDuration}>
								<IconTime /> {item.duration}
							</p>
						)}
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
			<div className={styles.actions}>
				<button
					className={`${styles.actionButton} ${styles.favAction} ${favorite && styles.active}`}
					onClick={()=>handleFavoriteSwitch()}
					type='button'>
					{ favorite ? <IconFavorite /> : <IconNoFavorite />}
				</button>
				<button
					className={`${styles.actionButton} ${
						trackRunning ? styles.active : ''
					}`}
					title={item.title}
					type='button'
					onClick={handleAddTrack}
				>
					{trackRunning ? <IconPause /> : <IconPlay />}
				</button>
			</div>
		</article>
	);
};
