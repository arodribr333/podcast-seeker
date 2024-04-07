import { createContext, useState } from 'react';
import type { SearchsContextState, SearchsContextType, SearchsProviderProps } from '../types/context.types';
const initialState: SearchsContextState = {
    searchUsed: {
        hasResults: false,
        term: '',
        podcasts: {
            resultCount: 0,
            results: []
        }
    },
    channelUsed: {
        feedUrl: '',
        trackId: 0
    },
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