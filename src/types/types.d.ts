export interface XmlData {
	__prefix: string;
	__text: string;
	__cdata?: string;
	_text?: string;
	_length?: string;
	_type?: string;
	_url?: string;
	_isPermaLink?: string;
	_href?: string;
	_rel?: string;
	toString?: () => string;
}
export interface XmlChannelImage {
	link: string;
	title: string;
	url: string;
}
export interface XmlChannelOwner {
	email: XmlData;
	name: XmlData;
}
type MappedXmlChannelItem = {
	id: number;
	channel: string;
	duration: string;
	audio: string;
	episode: string;
	image: string;
	season: string;
	title: string;
	date: string;
};
export interface XmlChannelItem {
	creator: XmlData;
	description: string;
	duration: XmlData;
	enclosure: XmlData;
	episode: XmlData;
	episodeType: XmlData;
	explicit: XmlData;
	guid: XmlData;
	image: XmlData;
	link: string;
	pubDate: string;
	season: XmlData;
	summary: XmlData;
	title: string;
}
export interface XMLChannel {
	author: string[] | XmlData[];
	category: XmlData.__text;
	copyright: string;
	description: string;
	explicit: XmlData;
	generator: string;
	image: XmlChannelImage[];
	item: XmlChannelItem[] | [];
	language: string;
	lastBuildDate: string;
	link: Array<string | XmlData>;
	owner: XmlChannelOwner;
	summary: XmlData;
	title: string;
	type: XmlData.__text;
}
export interface XmlDocRss {
	channel: XMLChannel;
}
export interface XmlDoc {
	rss: XmlDocRss;
}
export interface ReturnedChannel {
	id: number;
	title: string;
	author: string;
	image: string;
	category: string;
	description: string;
	generator: string;
	items: MappedXmlChannelItem[];
	language: string;
	type: string;
	feedUrl: string;
}

export interface PodcastType {
	wrapperType: string;
	kind: string;
	collectionId: number,
	trackId: number,
	artistName: string;
	collectionName: string;
	trackName: string;
	collectionCensoredName: string;
	trackCensoredName: string;
	collectionViewUrl: string;
	feedUrl: string;
	trackViewUrl: string;
	artworkUrl30: string;
	artworkUrl60: string;
	artworkUrl100: string;
	collectionPrice: number;
	trackPrice: number;
	collectionHdPrice: number;
	releaseDate: string;
	collectionExplicitness: string;
	trackExplicitness: string;
	trackCount: number;
	trackTimeMillis: number;
	country: string;
	currency: string;
	primaryGenreName: string;
	contentAdvisoryRating: string;
	artworkUrl600: string;
	genreIds: string[];
	genres: string[];
}
export interface PodcastsResponse {
	resultCount: number;
	results: PodcastType[];
}