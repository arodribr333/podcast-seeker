import { useState } from 'react';
import { SeekerConstants } from '../constants/constants';

export const useImageUrl = () => {
	const [imageSrc, setImageSrc] = useState<string>(SeekerConstants.DEFAULT_IMAGE);
	const handleSetImageSrc = ( image: string ) => {
		setImageSrc(image);
	};
	const handleImageError = () => {
		handleSetImageSrc(SeekerConstants.DEFAULT_IMAGE);
	};
    return {
        imageSrc,
        handleImageError,
        handleSetImageSrc
    }
}