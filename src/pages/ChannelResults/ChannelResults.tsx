import { useContext, useEffect, useState } from 'react';
import { IconError, IconFavorite, IconNoFavorite } from '../../components/Icons/Icons';
import { PodcastTrack } from '../../components/PodcastTrack/PodcastTrack';
import { PlayerContext } from '../../context/PlayerContext';
import { useChannels } from '../../hooks/useChannels';
import type { ReturnedChannel } from '../../types/types';
import styles from './ChannelResults.module.css';
export const ChannelResults = () => {
    const { channelUsed, favorites, handleUpdateFavorites, isInFavorites } = useContext( PlayerContext );
    const { feedUrl, trackId } = channelUsed;
    const { getChannel } = useChannels();
    const [ favorite, setFavorite ] = useState<boolean>(false);
    const [ channel, setChannel ] = useState<Error | ReturnedChannel>();
    useEffect( () => {
        try {
            getChannel( { feedUrl, trackId } ).then( ( data ) => setChannel( data ) );
        } catch ( error ) {
            console.log( error );
        }
    }, [] );
    useEffect( () => {
        isInFavorites( channel ) ? setFavorite( true ) : setFavorite( false );
    }, [channel, favorites])
    const handleFavoriteSwitch = () => {
        handleUpdateFavorites( channel );
    };
    return (
        <>
            {channel && !( channel instanceof Error ) && (
                <>
                    <div className={styles.channelPage}>
                        <div className={styles.info}>
                            <button
                                className={`${styles.switchFavorite} ${favorite && styles.favoriteActive}`}
                                onClick={handleFavoriteSwitch}
                                type='button'>
                                { favorite ? <IconFavorite /> : <IconNoFavorite />}
                            </button>
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
                    <IconError /> Sorry about that! The channel has not been loaded
                </h3>
            )}
        </>
    );
};
