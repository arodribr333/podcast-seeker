import { useContext } from "react";
import { Favorite } from '../../components/Podcast/Favorite';
import { PlayerContext } from '../../context/PlayerContext';
import styles from './Favorites.module.css';
export const Favorites = () => {
	const { favorites, handleChannelUsedChange } = useContext(PlayerContext);
	return (
		<div className={styles.favorites}>
			{(favorites.length > 0) ? (
                favorites.map( ( favorite ) => (
                    <Favorite key={favorite.id} favorite={favorite} />
                ))
			) : (
				<p>You still have no favorite saved</p>
			)}
		</div>
	);
};
