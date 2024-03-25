import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { PodcastTrack } from "./components/PodcastTrack/PodcastTrack";
import { useXMLParser } from "./hooks/useXMLParses";
import searchResponse from "./mocks/with-results.json";
function App() {
	const [response, setResponse] = useState(null);
	const hasResults = searchResponse.resultCount > 0;
	const { channel, handleChannel } = useXMLParser();
	useEffect(() => {
		// fetch(
		// 	"https://itunes.apple.com/search?term=midudev&country=es&media=podcast",
		// )
		// 	.then((res) => res.json())
		// 	.then((data) => setResponse(data));
		searchResponse.results.map((result) => {
			fetch(result.feedUrl)
				.then((res) => res.text())
				.then((data) => {
					handleChannel({ inputData: data });
				});
		});
	}, [handleChannel]);
	return (
		<>
			<h1>Buscador de podcast</h1>
			<section>
				<h2>Resultados de la búsqueda:</h2>
				{hasResults ? (
					searchResponse.results.map((result) => (
						<article key={result.trackId}>
							<img src={result.artworkUrl100} alt={result.collectionName} />
							<div className="data">
								<h3>{result.artistName}</h3>
								<p>{result.collectionName}</p>
								<p>Categorías:</p>
								<ul className={styles.genreList}>
									{result.genres.map((genre) => (
										<li
											className={`${styles.genre} ${
												result.primaryGenreName === genre && styles.genrePrimary
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
									<PodcastTrack key={item.audio} item={item} />
								))}
							</div>
						</article>
					))
				) : (
					<p>No se encontraron resultados</p>
				)}
			</section>
		</>
	);
}

export default App;
