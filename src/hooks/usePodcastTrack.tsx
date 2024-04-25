import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import type { MappedXmlChannelItem } from '../types/types';

export interface PodcastTrackProps {
	item: MappedXmlChannelItem;
}
export const usePodcastTrack = ({ item }: PodcastTrackProps) => {
	const {
		url,
		isPlaying,
		favorites,
		handleTimeChange,
		handleUrlChange,
		handlePlayer,
		handlePlay,
		handlePause,
		handleUpdateFavorites,
		isInFavorites
	} = useContext(PlayerContext);

	const [trackRunning, setTrackRunning] = useState(false);

	const [favorite, setFavorite] = useState<boolean>(false);
	useEffect(() => {
		setTrackRunning(isPlaying && url === item.audio);
	}, [isPlaying, url, item.audio]);

	useEffect(() => {
		isInFavorites(item) ? setFavorite(true) : setFavorite(false);
	}, [item, favorites]);
	const handleFavoriteSwitch = () => {
		handleUpdateFavorites(item);
	};
	const handleAddTrack = () => {
		const { title, channel, image, audio } = item;
		handleTimeChange(0);
		handlePlayer({ title, image, channel });
		handleUrlChange(audio);
		trackRunning ? handlePause() : handlePlay();
	};
	return {
		trackRunning,
		favorite,
		handleFavoriteSwitch,
		handleAddTrack
	};
};
