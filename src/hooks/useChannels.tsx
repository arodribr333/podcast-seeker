import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import type { ReturnedChannel } from '../types/types';
import { useImageUrl } from './useImageUrl';
import { useLocalStorage } from './useLocalStorage';
import { useXMLParser } from './useXMLParses';
interface getChannelProps {
	feedUrl: string;
	trackId: number;
}
export const useChannels = () => {
	const { channelUsed, favorites, handleUpdateFavorites, isInFavorites } =
		useContext(PlayerContext);
	const { feedUrl, trackId } = channelUsed;
	const { handleChannel } = useXMLParser();
	const [favorite, setFavorite] = useState<boolean>(false);
	const [channel, setChannel] = useState<Error | ReturnedChannel>();
	const { imageSrc, handleSetImageSrc, handleImageError }= useImageUrl();
	const [data, setData] = useLocalStorage<Error | ReturnedChannel | null>(
		'channel',
		null,
	);
	useEffect(() => {
		if (data) {
			setChannel(data);
			return;
		}
		try {
			getChannel({ feedUrl, trackId }).then((data) => {
				setData(data);
				setChannel(data);
			});
		} catch (error) {
			console.log(error);
		}
	}, []);
	useEffect(() => {
		isInFavorites(channel) ? setFavorite(true) : setFavorite(false);
	}, [channel, favorites]);
	useEffect( () => {
		if ( channel instanceof Error || undefined ) return;
		channel?.image && handleSetImageSrc(channel.image);
	}, [channel]);
	const handleFavoriteSwitch = () => {
		handleUpdateFavorites(channel);
	};
	const getChannel = async ({ feedUrl, trackId }: getChannelProps) => {
		return fetch(feedUrl)
			.then((response) => response.text())
			.then((inputData) => {
				return handleChannel({ inputData, trackId, feedUrl });
			})
			.catch((error) => {
				console.log(`Error fetching ${error}`);
				const newError = new Error(`Error fetching ${error}`);
				return newError;
			});
	};
	return {
		channel,
		favorite,
		imageSrc,
		getChannel,
		handleFavoriteSwitch,
		handleImageError
	};
};
