import { IconError, IconFavorite, IconNoFavorite } from '../../components/Icons/Icons';
import { PodcastTrack } from '../../components/PodcastTrack/PodcastTrack';
import { useChannels } from '../../hooks/useChannels';
import styles from './ChannelResults.module.css';
export const ChannelResults = () => {
    const { channel, favorite, imageSrc, handleFavoriteSwitch, handleImageError } = useChannels();
    return (
        <>
            {channel && !( channel instanceof Error ) && (
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
                                src={imageSrc}
                                alt={channel.title}
                                onError={handleImageError}
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
            )}
            {channel && channel instanceof Error && (
                <h3 className={styles.error}>
                    <IconError /> Sorry about that! The channel has not been loaded
                </h3>
            )}
        </>
    );
};
