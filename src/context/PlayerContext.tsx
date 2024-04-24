import { createContext } from 'react';
import type {
	PlayerContextType,
	PlayerProviderProps,
} from '../types/context.types';
import { usePodcastProvider } from './hooks/usePodcastProvider';
export const PlayerContext = createContext<PlayerContextType>(
	{} as PlayerContextType,
);

export const PlayerProvider = ( { children }: PlayerProviderProps ) => {
	return (
		<PlayerContext.Provider
			value={usePodcastProvider()}
		>
			{children}
		</PlayerContext.Provider>
	);
};
