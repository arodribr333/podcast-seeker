import { Route, Routes } from 'react-router-dom';
import { ChannelResults } from '../components/ChannelResults/ChannelResults';
import { SearchResults } from '../components/SearchResults/SearchResults';

interface RouterComponentProps {
    firstSearch: boolean;
}

export const RouterComponent = ( { firstSearch }: RouterComponentProps ) => {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    !firstSearch && <SearchResults />
                }
            />
            <Route
                path='/channel'
                element={<ChannelResults />}
            />
        </Routes>
    );
};