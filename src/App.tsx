import styles from './App.module.css';
import { Podcast } from './components/Podcast/Podcast';
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

            <section className={styles.search}>
                <h2>Resultados de la búsqueda:</h2>
                <div className={styles.searchResults}>
                    {hasResults ? (
                        podcasts.results.map( ( result ) => (
                            <Podcast key={result.trackId} podcast={result} />
                        ) )
                    ) : (
                        <p>No se encontraron resultados</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default App;
