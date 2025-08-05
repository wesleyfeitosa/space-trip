'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { type UpcomingLaunch } from '@/interfaces/upcoming-launch';
import { Countdown } from '@/components/atoms/countdown/countdown';
import { Button } from '@/components/atoms/button/button';
import { BadgeStatus } from '../badge-status/badge-status';
import styles from './launch-card.module.css';

interface Props {
	readonly launch: UpcomingLaunch;
}

export function LaunchCard({ launch }: Props) {
	const router = useRouter();
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);
	const [cacheBuster, setCacheBuster] = useState('');

	// Reset when launch.id changes
	const currentLaunchId = launch.id;
	const [previousLaunchId, setPreviousLaunchId] = useState(currentLaunchId);

	const thumbnailUrl = launch.image?.thumbnail_url;
	const fullImageUrl = launch.image?.image_url;
	const fallbackImage = '/default-launch.png';

	// Add cache busting for development (hydration-safe)
	const addCacheBuster = (url: string) => {
		if (cacheBuster) {
			const separator = url.includes('?') ? '&' : '?';
			return `${url}${separator}${cacheBuster}`;
		}

		return url;
	};

	// Reset states when launch changes
	const resetStates = () => {
		setImageLoaded(false);
		setImageError(false);
	};

	if (currentLaunchId !== previousLaunchId) {
		resetStates();
		setPreviousLaunchId(currentLaunchId);
	}

	// Set cache buster only on client side to avoid hydration issues
	useEffect(() => {
		setCacheBuster(`t=${Date.now()}`);
	}, [currentLaunchId]); // Reset cache buster when launch changes

	return (
		<div className={styles.card}>
			<div className={styles.imageContainer}>
				{/* Thumbnail - shows immediately and fades out when full image loads */}
				{thumbnailUrl && (
					<img
						className={`${styles.launchImage} ${styles.thumbnail} ${
							imageLoaded ? styles.fadeOut : ''
						}`}
						src={addCacheBuster(thumbnailUrl)}
						alt={`${launch.name} thumbnail`}
						loading="eager"
					/>
				)}

				{/* Full image - loads in background */}
				{fullImageUrl && !imageError ? (
					<img
						className={`${styles.launchImage} ${styles.fullImage} ${
							imageLoaded ? styles.loaded : styles.loading
						}`}
						src={addCacheBuster(fullImageUrl)}
						alt={launch.name}
						loading="lazy"
						onLoad={() => {
							setImageLoaded(true);
						}}
						onError={() => {
							setImageError(true);
						}}
					/>
				) : (
					<img
						className={`${styles.launchImage} ${styles.fallback}`}
						src={fallbackImage}
						alt={launch.name}
						loading="lazy"
					/>
				)}
			</div>
			<section className={styles.cardContent}>
				<h3>{launch.name}</h3>
				<p className={styles.description}>{launch.mission?.description}</p>
				<section className={styles.statusContainer}>
					<Countdown net={launch.net} />
					<BadgeStatus status={launch.status} />
				</section>
				<Button
					title="Ver detalhes"
					onClick={() => {
						router.push(`/launch/details/${launch.id}`);
					}}
				/>
			</section>
		</div>
	);
}
