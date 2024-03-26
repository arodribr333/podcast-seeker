import { useEffect } from "react";
import podcasts from "../mocks/with-results.json";
import { useXMLParser } from "./useXMLParses";

export const usePodcasts = () => {
	const hasResults = podcasts.resultCount > 0;
	const { channel, handleChannel } = useXMLParser();
	useEffect(() => {
		// fetch(
		// 	"https://itunes.apple.com/search?term=midudev&country=es&media=podcast",
		// )
		// 	.then((res) => res.json())
		// 	.then((data) => setResponse(data));
		podcasts.results.map((result) => {
			fetch(result.feedUrl)
				.then((res) => res.text())
				.then((data) => {
					handleChannel({ inputData: data });
				});
		});
	}, [handleChannel]);
	return {
		hasResults,
		channel,
		podcasts,
	};
};
