import { useContext, useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import styles from "./App.module.css";
import { ChannelResults } from "./components/ChannelResults/ChannelResults";
import { HeaderSeeker } from "./components/HeaderSeeker/HeaderSeeker";
import { SearchResults } from "./components/SearchResults/SearchResults";
import { SearchsContext } from './context/SearchsContext';
import { usePodcasts } from "./hooks/usePodcasts";
import { useSearch } from "./hooks/useSearch";
import { SearchPodcasts } from "./services/SearchPodcasts";
function App () {
    const { searchInfo, setSearchInfo } = useContext( SearchsContext );
    const [ firstSearch, setFirstSearch ] = useState( true );
    const { hasResults, podcasts, handleSetPodcasts } = usePodcasts();
    const { search, error, updateSearch } = useSearch();
    const navigate = useNavigate();
    const handleSearchSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        const podcast = await SearchPodcasts( { search } ).then( ( data ) => {
            setSearchInfo( {
                channelUsed: searchInfo.channelUsed,
                searchUsed: {
                    hasResults: data.resultCount > 0,
                    term: search,
                    podcasts: data
                }
            } );
            return data;
        } );
        firstSearch && setFirstSearch( false );
        handleSetPodcasts( podcast );
        if ( window.location.pathname === '/' ) return;
        navigate( "/" );
    };
    const handleInputChange = ( event: React.FormEvent<HTMLInputElement> ) => {
        updateSearch( event.currentTarget.value );
    };
    return (
        <div className={styles.page}>
            <HeaderSeeker
                search={search}
                error={error}
                searchSubmit={handleSearchSubmit}
                inputChange={handleInputChange}
            />
            <Routes>
                <Route
                    path='/'
                    element={
                        !firstSearch && <SearchResults
                            hasResults={searchInfo.searchUsed.hasResults}
                            podcasts={searchInfo.searchUsed.podcasts}
                        />
                    }
                />
                <Route
                    path='/channel'
                    element={<ChannelResults />}
                />
            </Routes>
        </div>
    );
}

export default App;
