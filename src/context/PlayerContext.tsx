import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';
import type {
	PlayerContextState,
	PlayerContextType,
	PlayerProviderProps,
	ProviderChannel,
	ProviderPlayer,
	ProviderSearch,
} from "../types/context.types";
import type { ReturnedChannel } from "../types/types";
const initialState: PlayerContextState = {
	url: "",
	isPlaying: false,
	volume: 1,
	currentTime: 0,
	searchUsed: {
		hasResults: false,
		term: "",
		podcasts: {
			resultCount: 0,
			results: [],
		},
	},
	channelUsed: {
		feedUrl: "",
		trackId: 0,
	},
	player: {
		title: "",
		channel: "",
		image: "",
	},
	favorites: [],
};
export const PlayerContext = createContext<PlayerContextType>(
	{} as PlayerContextType,
);
export const PlayerProvider = ({ children }: PlayerProviderProps) => {
	const [searchUsed, setSearchUsed] = useState<ProviderSearch>(
		initialState.searchUsed,
	);
	const [channelUsed, setChannelUsed] = useState<ProviderChannel>(
		initialState.channelUsed,
	);
	const [player, setPlayer] = useState<ProviderPlayer>(initialState.player);
	const [url, setUrl] = useState<string>("");
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [volume, setVolume] = useState<number>(1);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [favorites, updateFavorites] = useState<ReturnedChannel[]>([]);
	const [savedFavorites, setSavedFavorites] = useLocalStorage< ReturnedChannel[] | null>(
		"favorites",
		null,
	);
	
	useEffect( () => {
		if ( savedFavorites ) {
			updateFavorites( savedFavorites );
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
    const isInFavorites = ( channel: ReturnedChannel ): boolean => {
        return favorites.some( ( fav ) => fav.id === channel?.id );
    };
	const handleUpdateFavorites = (channel: ReturnedChannel) => {
		const isFavorite = isInFavorites(channel);
        if ( isFavorite ) {
            const filtered = favorites.filter( ( item ) => { item.id !== channel.id; } );
            updateFavorites( [ ...filtered ] );
            return;
        }
		updateFavorites([...favorites, channel]);
		setSavedFavorites([...favorites, channel]);
	};
	return (
		<PlayerContext.Provider
			value={{
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
                isInFavorites
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
};
