import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import { useChannels } from '../../hooks/useChannels';
import type { ReturnedChannel } from '../../types/types';
import { IconError } from '../Icons/Icons';
import { PodcastTrack } from '../PodcastTrack/PodcastTrack';
import styles from './ChannelResults.module.css';
export const ChannelResults = () => {
    const { channelUsed } = useContext( PlayerContext );
    const { feedUrl, trackId } = channelUsed;
    const { getChannel } = useChannels();
    const [ channel, setChannel ] = useState<Error | ReturnedChannel>();
    useEffect( () => {
        try {
            getChannel( { feedUrl, trackId } ).then( ( data ) => setChannel( data ) );
        } catch ( error ) {
            console.log( error );
        }
    }, [] );
    return (
        <>
            {channel && !( channel instanceof Error ) && (
                <>
                    <div className={styles.channelPage}>
                        <div className={styles.info}>
                            <figure className={styles.infoFigure}>
                                <img
                                    className={styles.infoImg}
                                    src={channel.image}
                                    alt={channel.title}
                                />
                            </figure>
                            <div className={styles.infoChannel}>
                                <h3 className={styles.title}>
                                    {channel.title}
                                </h3>
                                {channel.title !== channel.author && (
                                    <p className={styles.author}>
                                        {channel.author}
                                    </p>
                                )}
                                <p className={styles.description}>
                                    {channel.description}
                                </p>
                            </div>
                        </div>
                        <div className={styles.channelResults}>
                            {channel.items.map( ( item ) => (
                                <PodcastTrack
                                    key={item.id}
                                    item={item}
                                />
                            ) )}
                        </div>
                    </div>
                </>
            )}
            {channel && channel instanceof Error && (
                <h3 className={styles.error}>
                    <IconError /> Lo sentimos, no se ha podido cargar el canal
                </h3>
            )}
        </>
    );
};
