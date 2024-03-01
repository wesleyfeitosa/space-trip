'use client';

import { type UpcomingLaunch } from '@/entities/upcoming-launch';
import { Countdown } from '../atoms/countdown';
import { Button } from '../atoms/button';
import styles from './launch-card.module.css';
import { BadgeStatus } from './badge-status';

interface Props {
	readonly launch: UpcomingLaunch;
}

export function LaunchCard({ launch }: Props) {
	return (
		<div className={styles.card}>
			<img
				className={styles.launchImage}
				src={launch.image}
				alt={launch.name}
			/>
			<section className={styles.cardContent}>
				<h3>{launch.name}</h3>
				<p>{launch.mission.description}</p>
				<section className={styles.statusContainer}>
					<Countdown net={launch.net} />
					<BadgeStatus status={launch.status} />
				</section>
				<Button
					title="Ver detalhes"
					onClick={() => {
						console.log('Ver detalhes');
					}}
				/>
			</section>
		</div>
	);
}
