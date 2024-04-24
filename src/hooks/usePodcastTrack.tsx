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
		handleTimeChange,
		handleUrlChange,
		handlePlayer,
		handlePlay,
		handlePause,
	} = useContext(PlayerContext);

	const [trackRunning, setTrackRunning] = useState(false);

	useEffect(() => {
		setTrackRunning(isPlaying && url === item.audio);
	}, [isPlaying, url, item.audio]);

	const handleAddTrack = () => {
		const { title, channel, image, audio } = item;
		handleTimeChange(0);
		handlePlayer({ title, image, channel });
		handleUrlChange(audio);
		trackRunning ? handlePause() : handlePlay();
	};
	return {
		trackRunning,
		handleAddTrack		
	};
};
