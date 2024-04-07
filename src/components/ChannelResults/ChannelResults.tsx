import { useContext, useEffect, useState } from 'react';
import { SearchsContext } from '../../context/SearchsContext';
import { useChannels } from '../../hooks/useChannels';
import type { ReturnedChannel } from '../../types/types';
import { PodcastTrack } from '../PodcastTrack/PodcastTrack';
import styles from "./ChannelResults.module.css";
export const ChannelResults = () => {
    const { searchInfo, setSearchInfo } = useContext( SearchsContext );
    const { channelUsed } = searchInfo;
    const { feedUrl, trackId } = channelUsed;
    const { getChannel } = useChannels();
    const [ channel, setChannel ] = useState<Error | ReturnedChannel>();
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect( () => {
        try {
            getChannel( { feedUrl, trackId } ).then( ( data ) => {
                console.log( data );
                setChannel( data );
            } );
        } catch ( error ) {
            console.log( error );
        }
    }, [] );
    return (
        <>
            {( channel && !( channel instanceof Error ) ) &&
                <>
                    <div className={styles.channelResults}>
                        <div className={styles.info}>
                            <h3 className={styles.title}>{channel.author}</h3>
                            <p className={styles.title}>{channel.category}</p>
                            <p className={styles.title}>{channel.description}</p>
                        </div>
                        {channel.items.map( ( item ) => (
                            <PodcastTrack
                                key={item.audio}
                                item={item}
                            />
                        ) )}
                    </div>
                </>
            }
        </>
    );
};
