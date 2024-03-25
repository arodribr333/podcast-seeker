import { useCallback, useState } from "react";
import X2JS from "x2js";
import type {
	MappedXmlChannelItem,
	XMLChannel,
	XmlDoc,
} from "../types/types.d";
interface handleChannelProps {
	inputData: string;
}
const initialState = {
	author: "",
	category: "",
	description: "",
	generator: "",
	items: [] as MappedXmlChannelItem[],
	language: "",
	type: "",
};
export const useXMLParser = () => {
	const [returnedChannel, setReturnedChannel] = useState(initialState);
	const handleChannel = useCallback(({ inputData }: handleChannelProps) => {
		const x2js = new X2JS();
		const xmlDoc: XmlDoc = x2js.xml2js(inputData);
		const channel: XMLChannel = xmlDoc.rss?.channel;
		const XmlMappedItems = xmlDoc.rss.channel.item.map((item) => {
			return {
				duration: item.duration?.__text,
				audio: item.enclosure?._url,
				episode: item.episode?.__text,
				image: item.image?._href,
				season: item.season?.__text,
				title: item.title,
			};
		});
		setReturnedChannel({
			author: channel.owner.name.__text,
			category: channel.category._text,
			description: channel.description,
			generator: channel.generator,
			items: XmlMappedItems,
			language: channel.language,
			type: channel.type,
		});
	}, []);
	return {
		channel: returnedChannel,
		handleChannel,
	};
};
