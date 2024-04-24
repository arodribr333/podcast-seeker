import { useEffect } from 'react';
import { useImageUrl } from '../../hooks/useImageUrl';
import {
	usePodcastTrack,
	type PodcastTrackProps,
} from '../../hooks/usePodcastTrack';
import { IconCalendar, IconPause, IconPlay, IconTime } from '../Icons/Icons';
import styles from './PodcastTrack.module.css';
export const PodcastTrack = ({ item }: PodcastTrackProps) => {
	const { trackRunning, handleAddTrack } =
		usePodcastTrack({ item });
    const { handleSetImageSrc, handleImageError }= useImageUrl();
	useEffect(() => {
		if (!item || undefined) return;
		item?.image && handleSetImageSrc(item.image);
	}, [item]);

	return (
		<article className={`${styles.track} ${trackRunning ? styles.active : ''}`}>
			<div className={styles.trackItem}>
				<img
					className={styles.trackImg}
					src={item.image}
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
		</article>
	);
};
