import { useEffect, useState } from 'react';
import { SeekerConstants } from '../constants/constants';

export const useImageUrl = (image: string) => {
	const [imageSrc, setImageSrc] = useState<string>(SeekerConstants.NO_IMAGE);
	const handleSetImageSrc = ( image: string ) => {
		setImageSrc(image);
	};
	const handleImageError = () => {
		handleSetImageSrc(`${import.meta.env.VITE_DEFAULT_IMAGE}`);
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