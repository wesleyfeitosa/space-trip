'use client';

import { type UpcomingLaunch } from '@/entities/upcoming-launch';
import styles from './launch-card.module.css';
import { Button } from './button';

type Props = {
	readonly launch: UpcomingLaunch;
};

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
				<p>{launch.net}</p>
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
