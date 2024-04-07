import styles from "./App.module.css";
import { HeaderSeeker } from "./components/HeaderSeeker/HeaderSeeker";
import { useSearch } from "./hooks/useSearch";
import { RouterComponent } from './router/RouterComponent';
function App () {
    const { search, error, firstSearch, handleInputChange, handleSearchSubmit } = useSearch();
    return (
        <div className={styles.page}>
            <HeaderSeeker
                search={search}
                error={error}
                searchSubmit={( e ) => handleSearchSubmit( e )}
                inputChange={( e ) => handleInputChange( e )}
            />
            <RouterComponent firstSearch={firstSearch} />
        </div>
    );
}

export default App;
