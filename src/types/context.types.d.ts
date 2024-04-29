enum PlayerStatus {
    running = 'running',
    paused = 'paused',
    stopped = 'stopped',
}
export interface ProviderChannel {
    trackId: number;
    feedUrl: string;
}
export interface ProviderSearch {
    hasResults: boolean;
    term: string;
    podcasts: PodcastsResponse;
}
export interface ProviderPlayer {
    image: string;
    channel: string;
    title: string;
}
export interface PlayerContextState {
    url: string;
    isPlaying: boolean;
    isLoading: boolean;
    volume: number;
    currentTime: number;
    searchUsed: ProviderSearch;
    channelUsed: ProviderChannel;
    player: ProviderPlayer;
    favorites: ReturnedChannel[];
}
export interface PlayerContextType {
    url: string;
    searchUsed: ProviderSearch;
    channelUsed: ProviderChannel;
    player: ProviderPlayer;
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    isLoading: boolean;
    favorites: MappedXmlChannelItem[];
    handleUrlChange: ( url: string ) => void;
    handleSearchUsedChange: ( search: ProviderSearch ) => void;
    handleChannelUsedChange: ( channel: ProviderChannel ) => void;
    handlePlayer: ( player: ProviderPlayer ) => void;
    handlePlay: () => void;
    handlePause: () => void;
    handleVolumeChange: ( newVolume: number ) => void;
    handleTimeChange: ( time: number ) => void;
    handleUpdateFavorites: ( item: MappedXmlChannelItem ) => void;
    handleIsLoading: ( loading: boolean ) => void;
    isInFavorites: ( item: MappedXmlChannelItem ) => boolean;
}
export interface PlayerProviderProps {
    children: JSX.Element;
}