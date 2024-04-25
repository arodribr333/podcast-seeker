import { useContext } from 'react';
import { PodcastTrack } from '../../components/PodcastTrack/PodcastTrack';
import { PlayerContext } from '../../context/PlayerContext';
import styles from './Favorites.module.css';
export const Favorites = () => {
	const { favorites, handleChannelUsedChange } = useContext(PlayerContext);
	return (
		<div className={styles.favorites}>
			{(favorites.length > 0) ? (
                favorites.map( ( item ) => (
					<PodcastTrack
						key={item.id}
						item={item}
					/>
				))
			) : (
				<p>You still have no favorite saved</p>
			)}
		</div>
	);
};
