import { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type {
	PlayerContextState,
	ProviderChannel,
	ProviderPlayer,
	ProviderSearch,
} from '../../types/context.types';
import type { MappedXmlChannelItem } from '../../types/types';

const initialState: PlayerContextState = {
	url: '',
	isPlaying: false,
	volume: 1,
	currentTime: 0,
	searchUsed: {
		hasResults: false,
		term: '',
		podcasts: {
			resultCount: 0,
			results: [],
		},
	},
	channelUsed: {
		feedUrl: '',
		trackId: 0,
	},
	player: {
		title: '',
		channel: '',
		image: '',
	},
	favorites: [],
};
export const usePodcastProvider = () => {
	const [searchUsed, setSearchUsed] = useState<ProviderSearch>(
		initialState.searchUsed,
	);
	const [channelUsed, setChannelUsed] = useState<ProviderChannel>(
		initialState.channelUsed,
	);
	const [player, setPlayer] = useState<ProviderPlayer>(initialState.player);
	const [url, setUrl] = useState<string>('');
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [volume, setVolume] = useState<number>(1);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [favorites, updateFavorites] = useState<MappedXmlChannelItem[]>([]);
	const [savedFavorites, setSavedFavorites] = useLocalStorage<
	MappedXmlChannelItem[] | null
	>('favorites', null);

	useEffect(() => {
		if (savedFavorites) {
			updateFavorites(savedFavorites);
			return;
		}
	}, []);
	const handlePlayer = (player: ProviderPlayer) => {
		setPlayer(player);
	};
	const handleSearchUsedChange = (search: ProviderSearch) => {
		setSearchUsed(search);
	};
	const handleChannelUsedChange = (channel: ProviderChannel) => {
		setChannelUsed(channel);
	};
	const handleUrlChange = (url: string) => {
		setUrl(url);
	};
	const handlePlay = () => {
		setIsPlaying(true);
	};
	const handlePause = () => {
		setIsPlaying(false);
	};
	const handleVolumeChange = (newVolume: number) => {
		setVolume(newVolume);
	};
	const handleTimeChange = (time: number) => {
		setCurrentTime(time);
	};
	const isInFavorites = (item: MappedXmlChannelItem): boolean => {
		return favorites.some((fav) => fav.id === item?.id);
	};
	const handleUpdateFavorites = (item: MappedXmlChannelItem) => {
		const isFavorite = isInFavorites(item);
		if (isFavorite) {
			const filtered = favorites.filter((fav) => fav.id !== item.id);
			updateFavorites([...filtered]);
			setSavedFavorites([...filtered]);
			return;
		}
		updateFavorites([...favorites, item]);
		setSavedFavorites([...favorites, item]);
	};

	return {
		searchUsed,
		channelUsed,
		player,
		url,
		isPlaying,
		volume,
		currentTime,
		favorites,
		handleUrlChange,
		handleSearchUsedChange,
		handleChannelUsedChange,
		handlePlayer,
		handlePlay,
		handlePause,
		handleVolumeChange,
		handleTimeChange,
		handleUpdateFavorites,
		isInFavorites,
	};
};
