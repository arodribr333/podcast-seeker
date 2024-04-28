import { Link } from 'react-router-dom';
import { SeekerConstants, SeekerTexts } from '../../constants/constants';
import { useMenuBar } from '../../hooks/useMenuBar';
import { IconFavorite, IconMenu, IconPodcast, IconSearchList } from '../Icons/Icons';
import { SoundBars } from '../SoundBars/SoundBars';
import styles from './MenuBar.module.css';

export const MenuBar = () => {
    const { isPlaying, navRef, buttonRef, navOpen, hasSearch, hasChannel, handleOpenNavTrigger, handleActiveLocation} = useMenuBar();
    return (
        <header className={styles.menubar}>
            <button ref={buttonRef} className={`${ styles.menuButton } ${ navOpen && styles.active }`} onClick={handleOpenNavTrigger} type='button'>
                <IconMenu />
                <span className='visually-hidden'>{SeekerTexts.MENU} {navOpen ? SeekerTexts.OPEN : SeekerTexts.CLOSED}</span>
            </button>
            {isPlaying && <SoundBars />}
            <nav ref={navRef} className={`${styles.nav} ${ navOpen && styles.open }`}>
                <Link className={handleActiveLocation( SeekerConstants.FAVS_LINK )} to={SeekerConstants.FAVS_LINK}><IconFavorite /> {SeekerTexts.FAVS}</Link>
                {hasSearch && <Link className={handleActiveLocation(SeekerConstants.BASE_LINK)} to={SeekerConstants.BASE_LINK}><IconSearchList /> {SeekerTexts.LAST_SEARCH}</Link>}
                {hasChannel && <Link className={handleActiveLocation( SeekerConstants.CHANNEL_LINK )} to={SeekerConstants.CHANNEL_LINK}><IconPodcast /> {SeekerTexts.LAST_CHANNEL}</Link>}
            </nav>
        </header>
    );
}