import { useContext } from 'react';
import styles from './App.module.css';
import { HeaderSeeker } from './components/HeaderSeeker/HeaderSeeker';
import { MenuBar } from './components/MenuBar/MenuBar';
import { PodcastPlayer } from './components/PodcastPlayer/PodcastPlayer';
import { PlayerContext } from './context/PlayerContext';
import { useSearch } from './hooks/useSearch';
import { RouterComponent } from './router/RouterComponent';
function App () {
    const { url } = useContext( PlayerContext );
    const {
        search,
        error,
        firstSearch,
        handleInputChange,
        handleSearchSubmit,
    } = useSearch();
    return (
        <>
            <MenuBar />
            {url !== '' && <PodcastPlayer />}
            <div className={styles.page}>
                <HeaderSeeker
                    search={search}
                    error={error}
                    searchSubmit={( e ) => handleSearchSubmit( e )}
                    inputChange={( e ) => handleInputChange( e )}
                />
                <RouterComponent firstSearch={firstSearch} />
            </div>
        </>
    );
}

export default App;
