export const SearchPodcasts = async ( { search }: { search: string } ) => {
    if ( search === '' ) return;
    try {
        const response = await fetch( `https://itunes.apple.com/search?term=${search}&country=es&media=podcast` );
        const json = await response.json();
        return json;
    } catch (e) {
        throw new Error( 'Searching podcast error' );
    }
}