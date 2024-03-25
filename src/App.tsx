import { useEffect, useState } from "react";
import "./App.css";
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
	console.log(channel);
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
								<p>{result.primaryGenreName}</p>
								<ul>
									{result.genres.map((genre) => (
										<li key={genre}>{genre}</li>
									))}
								</ul>
								<p>Artículos: {result.trackCount}</p>
							</div>
							<div>
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
