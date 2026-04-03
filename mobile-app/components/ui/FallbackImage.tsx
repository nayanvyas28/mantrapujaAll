import React, { useState } from 'react';
import { Image, ImageProps } from 'expo-image';

interface FallbackImageProps extends ImageProps {
    fallbackSource?: any;
}

export const FallbackImage = ({ source, fallbackSource, style, ...props }: FallbackImageProps) => {
    const [hasError, setHasError] = useState(false);

    const defaultFallback = require('../../assets/images/puja_thumbnail.jpg');
    const displaySource = hasError ? (fallbackSource || defaultFallback) : source;

    return (
        <Image
            source={displaySource}
            onError={() => setHasError(true)}
            style={style}
            {...props}
        />
    );
};
