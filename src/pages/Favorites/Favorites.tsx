import { useContext } from 'react';
import { IconFavorite } from '../../components/Icons/Icons';
import { PodcastTrack } from '../../components/PodcastTrack/PodcastTrack';
import { SeekerTexts } from '../../constants/constants';
import { PlayerContext } from '../../context/PlayerContext';
import styles from './Favorites.module.css';
export const Favorites = () => {
	const { favorites } = useContext(PlayerContext);
	return (
		<div className={styles.favorites}>
			<h2><IconFavorite />{SeekerTexts.FAVS}</h2>
            <h3 className='visually-hidden'>{SeekerTexts.FAVS_LIST}</h3>
			{(favorites.length > 0) ? (
                favorites.map( ( item ) => (
					<PodcastTrack
						key={item.id}
						item={item}
					/>
				))
			) : (
				<p>{SeekerTexts.NO_FAVS}</p>
			)}
		</div>
	);
};
