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
	author?: string;
	duration: string;
	audio: string;
	episode: string;
	image: string;
	season?: string | XmlData;
	title: string;
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
	category: XmlData;
	copyright: string;
	description: string;
	explicit: XmlData;
	generator: string;
	image: XmlChannelImage[];
	item: XmlChannelItem[];
	language: string;
	lastBuildDate: string;
	link: Array<string | XmlData>;
	owner: XmlChannelOwner;
	summary: XmlData;
	title: string;
	type: XmlData;
}
export interface XmlDocRss {
	channel: XMLChannel;
}
export interface XmlDoc {
	rss: XmlDocRss;
}
export interface ReturnedChannel {
	author: string;
	category: string;
	description: string;
	generator: string;
	items: MappedXmlChannelItem[];
	language: string;
	type: string;
}
