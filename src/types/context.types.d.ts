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
    status: keyof typeof PlayerStatus;
    audioId: number;
    audioUrl: string;
}
export interface PlayerContextState {
    url: string;
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    searchUsed: ProviderSearch;
    channelUsed: ProviderChannel;
    player: ProviderPlayer;
}
export interface PlayerContextType {
    url: string;
    searchUsed: ProviderSearch;
    channelUsed: ProviderChannel;
    player: ProviderPlayer;
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    handleUrlChange: ( url: string ) => void;
    handleSearchUsedChange: ( search: ProviderSearch ) => void;
    handleChannelUsedChange: ( channel: ProviderChannel ) => void;
    handlePlayer: ( player: ProviderPlayer ) => void;
    handlePlay: () => void;
    handlePause: () => void;
    handleVolumeChange: ( newVolume: number ) => void;
    handleTimeChange: ( time: number ) => void;
}
export interface PlayerProviderProps {
    children: JSX.Element;
}