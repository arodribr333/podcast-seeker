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
    searchUsed: ProviderSearch;
    channelUsed: ProviderChannel;
    player: ProviderPlayer;
}
export interface PlayerContextType {
    playerStatus: PlayerContextState;
    setPlayerStatus: React.Dispatch<PlayerContextState>;
}
export interface PlayerProviderProps {
    children: JSX.Element;
}