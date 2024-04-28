import { useContext, useEffect, useState } from "react";
import { SeekerConstants, SeekerTexts } from '../constants/constants';
import { PlayerContext } from "../context/PlayerContext";
import type { ReturnedChannel } from "../types/types";
import { useImageUrl } from "./useImageUrl";
import { useLocalStorage } from "./useLocalStorage";
import { useXMLParser } from "./useXMLParses";
interface getChannelProps {
	feedUrl: string;
	trackId: number;
}
export const useChannels = () => {
	const { channelUsed } = useContext(PlayerContext);
	const { feedUrl, trackId } = channelUsed;
	const { handleChannel } = useXMLParser();
	const [channel, setChannel] = useState<Error | ReturnedChannel>();
	const channelImg =
		!(channel instanceof Error || undefined) && channel?.image
			? channel.image
			: '';
	const { imageSrc, handleImageError } = useImageUrl(channelImg);
	const [data, setData] = useLocalStorage<Error | ReturnedChannel | null>(
		SeekerConstants.CHANNEL_KEY,
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
	const getChannel = async ({ feedUrl, trackId }: getChannelProps) => {
		return fetch(feedUrl)
			.then((response) => response.text())
			.then((inputData) => {
				return handleChannel({ inputData, trackId, feedUrl });
			})
			.catch((error) => {
				console.log(`${SeekerTexts.FETCHING_ERROR} ${error}`);
				const newError = new Error(`${SeekerTexts.FETCHING_ERROR} ${error}`);
				return newError;
			});
	};
	return {
		channel,
		imageSrc,
		getChannel,
		handleImageError,
	};
};
