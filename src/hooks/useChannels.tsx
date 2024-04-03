import { useXMLParser } from "./useXMLParses";

export const useChannels = () => {
    const { handleChannel } = useXMLParser();
    const getChannel = async ( feedUrl: string ) => {
        return fetch( feedUrl )
            .then( ( response ) => response.text() )
            .then( ( data ) => {
                return handleChannel( { inputData: data } );
            } )
            .catch( error => console.log( `Error fetching ${ error }` ) );
    };
    return {
        getChannel
    };
};
