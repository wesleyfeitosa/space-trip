'use client';

import { useState, useEffect } from 'react';

import styles from './progressive-image.module.css';

interface ProgressiveImageProps {
	thumbnailUrl?: string;
	fullImageUrl?: string;
	fallbackImage?: string;
	alt: string;
	className?: string;
	loading?: 'eager' | 'lazy';
	objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
	onLoad?: () => void;
	onError?: () => void;
}

export function ProgressiveImage({
	thumbnailUrl,
	fullImageUrl,
	fallbackImage = '/default-launch.png',
	alt,
	className = '',
	loading = 'lazy',
	objectFit = 'cover',
	onLoad,
	onError,
}: ProgressiveImageProps) {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);
	const [cacheBuster, setCacheBuster] = useState('');

	// Create a unique key for this image instance
	const imageKey = `${thumbnailUrl}-${fullImageUrl}`;
	const [previousImageKey, setPreviousImageKey] = useState(imageKey);

	// Add cache busting for development (hydration-safe)
	const addCacheBuster = (url: string) => {
		if (cacheBuster) {
			const separator = url.includes('?') ? '&' : '?';
			return `${url}${separator}${cacheBuster}`;
		}

		return url;
	};

	// Reset states when image changes
	const resetStates = () => {
		setImageLoaded(false);
		setImageError(false);
	};

	if (imageKey !== previousImageKey) {
		resetStates();
		setPreviousImageKey(imageKey);
	}

	// Set cache buster only on client side to avoid hydration issues
	useEffect(() => {
		setCacheBuster(`t=${Date.now()}`);
	}, [imageKey]); // Reset cache buster when image changes

	const handleLoad = () => {
		setImageLoaded(true);
		onLoad?.();
	};

	const handleError = () => {
		setImageError(true);
		onError?.();
	};

	// Determine if we should show fallback
	const shouldShowFallback = (!thumbnailUrl && !fullImageUrl) || imageError;

	return (
		<div className={`${styles.imageContainer} ${className}`}>
			{/* Thumbnail - shows immediately and fades out when full image loads */}
			{thumbnailUrl && !shouldShowFallback && (
				<img
					className={`${styles.image} ${styles.thumbnail} ${
						imageLoaded ? styles.fadeOut : ''
					}`}
					src={addCacheBuster(thumbnailUrl)}
					alt={`${alt} thumbnail`}
					loading="eager"
					style={{ objectFit }}
				/>
			)}

			{/* Full image - loads in background */}
			{fullImageUrl && !imageError && (
				<img
					className={`${styles.image} ${styles.fullImage} ${
						imageLoaded ? styles.loaded : styles.loading
					}`}
					src={addCacheBuster(fullImageUrl)}
					alt={alt}
					loading={loading}
					style={{ objectFit }}
					onLoad={handleLoad}
					onError={handleError}
				/>
			)}

			{/* Fallback image - shows when no images available or on error */}
			{shouldShowFallback && (
				<img
					className={`${styles.image} ${styles.fallback}`}
					src={fallbackImage}
					alt={alt}
					loading={loading}
					style={{ objectFit }}
				/>
			)}
		</div>
	);
}
