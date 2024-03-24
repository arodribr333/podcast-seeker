import { useEffect, useState } from "react";
import "./App.css";
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
			{hasResults ? (
				searchResponse.results.map((result) => (
					<div key={result.trackId}>
						<img src={result.artworkUrl100} alt={result.collectionName} />
						<div className="data">
							<h1>{result.artistName}</h1>
							<p>{result.collectionName}</p>
							<p>
								<a
									href={result.collectionViewUrl}
									target="_blank"
									rel="noreferrer"
								>
									{result.collectionName}
								</a>
							</p>
							<p>
								<a href={result.feedUrl} target="_blank" rel="noreferrer">
									Feed URL
								</a>
							</p>
						</div>
					</div>
				))
			) : (
				<p>No se encontraron resultados</p>
			)}
		</>
	);
}

export default App;
