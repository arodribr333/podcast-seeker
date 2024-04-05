import styles from "./HeaderSeeker.module.css";

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
        <header>
            <h1>Buscador de podcast</h1>
            <form
                className={styles.form}
                onSubmit={(e) => searchSubmit(e)}
            >
                <div className={styles.formSearch}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => inputChange(e)}
                        name="query"
                        placeholder="National Geographic, midudev..."
                    />
                    <button type="submit">Buscar</button>
                </div>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </header>
    );
};
