import { createContext, useState } from 'react';
import type { PlayerContextState, PlayerContextType, PlayerProviderProps } from '../types/context.types';
const initialState: PlayerContextState = {
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
    player: {
        audioId: 0,
        status: 'stopped',
        audioUrl: ''
    }
};
export const PlayerContext = createContext<PlayerContextType>( {} as PlayerContextType );
export const PlayerProvider = ( { children }: PlayerProviderProps ) => {
    const [ playerStatus, setPlayerStatus ] = useState<PlayerContextState>( initialState );
    return (
        <PlayerContext.Provider value={{
            playerStatus,
            setPlayerStatus
        }}>
            {children}
        </PlayerContext.Provider>
    );
};