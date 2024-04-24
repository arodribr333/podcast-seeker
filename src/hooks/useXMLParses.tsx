import { useCallback } from 'react';
import X2JS from 'x2js';
import type {
    ReturnedChannel,
    XMLChannel,
    XmlChannelItem,
    XmlDoc
} from '../types/types.d';
interface handleChannelProps {
    inputData: string;
    trackId: number;
    feedUrl: string;
};
export const useXMLParser = () => {
    const handleChannel = useCallback( ( { inputData, trackId, feedUrl }: handleChannelProps ): ReturnedChannel => {
        const x2js = new X2JS();
        const xmlDoc: XmlDoc = x2js.xml2js( inputData );
        const channel: XMLChannel = xmlDoc.rss?.channel;
        const xmlItem: XmlChannelItem[] = xmlDoc.rss.channel.item;
        const { title } = channel;
        const formatDate = ( input: string ): string => {
            const date = new Date( input );
            const day = String( date.getDate() ).padStart( 2, '0' );
            const month = String( date.getMonth() + 1 ).padStart( 2, '0' );
            const year = date.getFullYear();
            return `${ day }/${ month }/${ year }`;
        };
        const getItemId = ( date: string ): number => {
            const pub = new Date( date ).getTime();
            const result = ( Math.floor( trackId * ( trackId * 5 ) ) ) + pub;
            return result;
        };
        const processXmlItem = ( item: XmlChannelItem[] | XmlChannelItem, channelTitle: string ) => {
            if ( Array.isArray( item ) ) {
                const XmlMappedItems = xmlItem.map( ( item ) => {
                    return {
                        id: getItemId( item.pubDate ),
                        channel: channelTitle,
                        duration: item.duration?.__text,
                        audio: item.enclosure?._url,
                        episode: item.episode?.__text,
                        image: item.image?._href,
                        season: item.season?.__text,
                        title: item.title.toString(),
                        date: formatDate( item.pubDate )
                    };
                } );
                return XmlMappedItems;
            }
            const { duration, enclosure, episode, image, season, title, pubDate } = item;
            const compose = {
                id: getItemId( pubDate ),
                channel: channelTitle,
                duration: duration?.__text,
                audio: enclosure?._url,
                episode: episode?.__text,
                image: image?._href,
                season: season?.__text,
                title: title.toString(),
                date: formatDate( pubDate )
            };
            const composeArray = new Array();
            composeArray.push( compose );
            return composeArray;
        };
        const XmlMappedItems = processXmlItem( xmlItem, title );
        return {
            id: trackId,
            title: channel.title,
            author: channel.owner.name.__text,
            image: channel.image[ 0 ].url,
            category: channel.category._text,
            description: channel.description,
            generator: channel.generator,
            items: XmlMappedItems,
            language: channel.language,
            type: channel.type,
            feedUrl
        };
    }, [] );

    return {
        handleChannel,
    };
};
