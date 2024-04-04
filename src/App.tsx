import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { SearchResults } from './components/SearchResults/SearchResults';
import { usePodcasts } from './hooks/usePodcasts';
import { useSearch } from './hooks/useSearch';
import { SearchPodcasts } from './services/SearchPodcasts';

function App () {
    const { hasResults, podcasts, handleSetPodcasts } = usePodcasts();
    const { search, error, updateSearch } = useSearch();
    const handleSearchSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();
        const podcast = await SearchPodcasts( { search } );
        handleSetPodcasts( podcast );
    };
    const handleInputChange = ( event: React.FormEvent<HTMLInputElement> ) => {
        updateSearch( event.currentTarget.value );
    };
    return (
        <div className={styles.page}>
            <header>
                <h1>Buscador de podcast</h1>
                <form className={styles.form} onSubmit={handleSearchSubmit}>
                    <div className={styles.formSearch}>
                        <input
                            type='text'
                            value={search}
                            onChange={handleInputChange}
                            name='query'
                            placeholder='National Geographic, midudev...'
                        />
                        <button type='submit'>Buscar</button>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </header>
            <Routes>
                <Route path='/' element={<SearchResults hasResults={hasResults} podcasts={podcasts} />} />
            </Routes>

        </div>
    );
}

export default App;
