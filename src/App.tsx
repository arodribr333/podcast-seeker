import { Route, Routes, useNavigate } from "react-router-dom";
import styles from "./App.module.css";
import { ChannelResults } from "./components/ChannelResults/ChannelResults";
import { HeaderSeeker } from "./components/HeaderSeeker/HeaderSeeker";
import { SearchResults } from "./components/SearchResults/SearchResults";
import { usePodcasts } from "./hooks/usePodcasts";
import { useSearch } from "./hooks/useSearch";
import { SearchPodcasts } from "./services/SearchPodcasts";
function App () {
    const { hasResults, podcasts, handleSetPodcasts } = usePodcasts();
    const { search, error, updateSearch } = useSearch();
    const navigate = useNavigate();
    const handleSearchSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        const podcast = await SearchPodcasts( { search } );
        handleSetPodcasts( podcast );
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
                        <SearchResults
                            hasResults={hasResults}
                            podcasts={podcasts}
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
