import Link from 'next/link';

import { translateMissionDescription } from '@/utils/translations';
import { type UpcomingLaunch } from '@/interfaces/upcoming-launch';
import { ProgressiveImage } from '@/components/atoms/progressive-image/progressive-image';
import { Countdown } from '@/components/atoms/countdown/countdown';

import { BadgeStatus } from '../badge-status/badge-status';
import styles from './launch-card.module.css';

interface Props {
	readonly launch: UpcomingLaunch;
}

export function LaunchCard({ launch }: Props) {
	return (
		<Link href={`/launch/details/${launch.id}`} className={styles.cardLink}>
			<article className={styles.card}>
				<ProgressiveImage
					thumbnailUrl={launch.image?.thumbnail_url}
					fullImageUrl={launch.image?.image_url}
					alt={launch.name}
					className={styles.imageContainer}
					loading="lazy"
				/>
				<section className={styles.cardContent}>
					<h3>{launch.name}</h3>
					<p className={styles.description}>
						{translateMissionDescription(launch.mission?.description ?? '')}
					</p>
					<section className={styles.statusContainer}>
						<Countdown net={launch.net} />
						<BadgeStatus status={launch.status} />
					</section>
				</section>
			</article>
		</Link>
	);
}
