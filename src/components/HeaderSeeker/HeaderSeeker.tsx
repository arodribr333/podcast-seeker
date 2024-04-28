import { SeekerTexts } from '../../constants/constants';
import { IconSearch } from '../Icons/Icons';
import styles from './HeaderSeeker.module.css';

interface HeaderSeekerProps {
    search: string;
    error: string | null;
    searchSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    inputChange: (e: React.FormEvent<HTMLInputElement>) => void;
}
export const HeaderSeeker = ({
    search,
    error,
    searchSubmit,
    inputChange,
}: HeaderSeekerProps) => {
    return (
        <div className={styles.seeker}>
            <h1 className='visually-hidden'>{SeekerTexts.PODCAST_SEARCH_ENGINE}</h1>
            <form
                className={styles.form}
                onSubmit={(e) => searchSubmit(e)}
            >
                <div className={styles.formSearch}>
                    <input
                        type='text'
                        value={search}
                        onChange={(e) => inputChange(e)}
                        name='query'
                        placeholder={SeekerTexts.INPUT_SEARCH_PLACEHOLDER}
                    />
                    <button className={styles.searchButton} type='submit'>
                        <IconSearch />
                        <span className='visually-hidden'>{SeekerTexts.SEEK}</span>
                    </button>
                </div>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};
