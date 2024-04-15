import { Route, Routes } from 'react-router-dom';
import { ChannelResults } from '../pages/ChannelResults/ChannelResults';
import { SearchResults } from '../pages/SearchResults/SearchResults';

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