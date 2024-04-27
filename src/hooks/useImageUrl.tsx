import { useEffect, useState } from 'react';
import { SeekerConstants } from '../constants/constants';

export const useImageUrl = (image: string) => {
	const [imageSrc, setImageSrc] = useState<string>(SeekerConstants.DEFAULT_IMAGE);
	const handleSetImageSrc = ( image: string ) => {
		setImageSrc(image);
	};
	const handleImageError = () => {
		handleSetImageSrc(SeekerConstants.DEFAULT_IMAGE);
	};
	
	useEffect(() => {
		if (!image || undefined) return;
		image && handleSetImageSrc(image);
	}, [ image ] );
	
    return {
        imageSrc,
        handleImageError,
        handleSetImageSrc
    }
}