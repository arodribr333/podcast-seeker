export interface ProviderChannel {
    trackId: number;
    feedUrl: string;
}
export interface ProviderSearch {
    hasResults: boolean;
    term: string;
    podcasts: PodcastsResponse;
}
export interface SearchsContextState {
    searchUsed: ProviderSearch;
    channelUsed: ProviderChannel;
}
export interface SearchsContextType {
    searchInfo: SearchsContextState;
    setSearchInfo: React.Dispatch<SearchsContextState>;
}
export interface SearchsProviderProps {
    children: JSX.Element;
}