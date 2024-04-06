import { createContext, useState } from 'react';
import type { PodcastsResponse } from '../types/types';
interface ProviderChannel {
    collectionId: number;
    feedUrl: string;
}
interface ProviderSearch {
    hasResults: boolean;
    term: string;
    podcasts: PodcastsResponse;
}
export interface SearchsContextState {
    searchUsed: ProviderSearch;
    channelUsed: ProviderChannel | null;
}
interface SearchsContextType {
    searchInfo: SearchsContextState;
    setSearchInfo: React.Dispatch<SearchsContextState>;
}
interface SearchsProviderProps {
    children: JSX.Element;
}
const initialState: SearchsContextState = {
    searchUsed: {
        hasResults: false,
        term: '',
        podcasts: {
            resultCount: 0,
            results: []
        }
    },
    channelUsed: null,
};
export const SearchsContext = createContext<SearchsContextType>( {} as SearchsContextType );
export const SearchsProvider = ( { children }: SearchsProviderProps ) => {
    const [ searchInfo, setSearchInfo ] = useState<SearchsContextState>( initialState );
    return (
        <SearchsContext.Provider value={{
            searchInfo,
            setSearchInfo
        }}>
            {children}
        </SearchsContext.Provider>
    );
};