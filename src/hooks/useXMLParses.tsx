import { useCallback } from "react";
import X2JS from "x2js";
import type {
    ReturnedChannel,
    XMLChannel,
    XmlChannelItem,
    XmlDoc
} from "../types/types.d";
interface handleChannelProps {
    inputData: string;
};
export const useXMLParser = () => {
    const handleChannel = useCallback( ( { inputData }: handleChannelProps ): ReturnedChannel => {
        const x2js = new X2JS();
        const xmlDoc: XmlDoc = x2js.xml2js( inputData );
        const channel: XMLChannel = xmlDoc.rss?.channel;
        const xmlItem: XmlChannelItem[] = xmlDoc.rss.channel.item;
        const processXmlItem = ( item: XmlChannelItem[] | XmlChannelItem ) => {
            if ( Array.isArray( item ) ) {
                const XmlMappedItems = xmlItem.map( ( item ) => {
                    return {
                        duration: item.duration?.__text,
                        audio: item.enclosure?._url,
                        episode: item.episode?.__text,
                        image: item.image?._href,
                        season: item.season?.__text,
                        title: item.title.toString(),
                    };
                } );
                return XmlMappedItems;
            }
            const { duration, enclosure, episode, image, season, title } = item;
            const compose = {
                duration: duration?.__text,
                audio: enclosure?._url,
                episode: episode?.__text,
                image: image?._href,
                season: season?.__text,
                title: title.toString(),
            };
            const composeArray = new Array();
            composeArray.push( compose );
            return composeArray;
        };
        const XmlMappedItems = processXmlItem( xmlItem );
        return {
            author: channel.owner.name.__text,
            category: channel.category._text,
            description: channel.description,
            generator: channel.generator,
            items: XmlMappedItems,
            language: channel.language,
            type: channel.type,
        };
    }, [] );

    return {
        handleChannel,
    };
};
