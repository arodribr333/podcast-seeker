import styles from './App.module.css';
import { PodcastTrack } from './components/PodcastTrack/PodcastTrack';
import { usePodcasts } from './hooks/usePodcasts';
import { useSearch } from './hooks/useSearch';
function App() {
    const { hasResults, channel, podcasts } = usePodcasts();
	const { search, error, updateSearch } = useSearch();
    const handleSearchSubmit = (
        event: React.FormEvent<HTMLFormElement>,
    ): void => {
        event.preventDefault();
        console.log({ search });
    };
    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        updateSearch(event.currentTarget.value);
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

            <section>
                <h2>Resultados de la búsqueda:</h2>
                {hasResults ? (
                    podcasts.results.map((result) => (
                        <article key={result.trackId}>
                            <img
                                src={result.artworkUrl100}
                                alt={result.collectionName}
                            />
                            <div className='data'>
                                <h3>{result.artistName}</h3>
                                <p>{result.collectionName}</p>
                                <p>Categorías:</p>
                                <ul className={styles.genreList}>
                                    {result.genres.map((genre) => (
                                        <li
                                            className={`${styles.genre} ${
                                                result.primaryGenreName ===
                                                    genre && styles.genrePrimary
                                            }`}
                                            key={genre}
                                        >
                                            {genre}
                                        </li>
                                    ))}
                                </ul>
                                <p>Artículos: {result.trackCount}</p>
                            </div>
                            <div className={styles.channel}>
                                {channel.items.map((item) => (
                                    <PodcastTrack
                                        key={item.audio}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </article>
                    ))
                ) : (
                    <p>No se encontraron resultados</p>
                )}
            </section>
        </div>
    );
}

export default App;
