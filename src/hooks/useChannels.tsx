import { useXMLParser } from "./useXMLParses";
interface getChannelProps {
    feedUrl: string;
    trackId: number;
}
export const useChannels = () => {
    const { handleChannel } = useXMLParser();
    const getChannel = async ( { feedUrl, trackId }: getChannelProps ) => {
        return fetch( feedUrl )
            .then( ( response ) => response.text() )
            .then( ( inputData ) => {
                return handleChannel( { inputData, trackId } );
            } )
            .catch( ( error ) => {
                console.log( `Error fetching ${ error }` );
                const newError = new Error( `Error fetching ${ error }` );
                return newError;
            } );
    };
    return {
        getChannel
    };
};
