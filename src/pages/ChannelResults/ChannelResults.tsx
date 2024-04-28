import { IconError, IconPodcast } from '../../components/Icons/Icons';
import { PodcastTrack } from '../../components/PodcastTrack/PodcastTrack';
import { SeekerTexts } from '../../constants/constants';
import { useChannels } from '../../hooks/useChannels';
import styles from './ChannelResults.module.css';
export const ChannelResults = () => {
    const { channel, imageSrc, handleImageError } = useChannels();
    return (
        <>
            {channel && !( channel instanceof Error ) && (
                <div className={styles.channelPage}>
                    <h2><IconPodcast />{SeekerTexts.CHANNEL}</h2>
                    <div className={styles.info}>
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
                    <IconError /> {SeekerTexts.SORRY}
                </h3>
            )}
        </>
    );
};
