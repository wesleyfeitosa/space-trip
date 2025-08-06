import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import { BadgeStatus } from '@/components/molecules/badge-status/badge-status';
import { ProgressiveImage } from '@/components/atoms/progressive-image/progressive-image';
import { Countdown } from '@/components/atoms/countdown/countdown';
import styles from './launch-hero.module.css';

interface LaunchHeroProps {
	launch: UpcomingLaunchDetail;
	formatDate: (dateString: string) => string;
}

export function LaunchHero({ launch, formatDate }: LaunchHeroProps) {
	// Debug logging
	console.log('LaunchHero Debug:', {
		hasImage: Boolean(launch.image),
		thumbnailUrl: launch.image?.thumbnail_url,
		fullImageUrl: launch.image?.image_url,
		imageCredit: launch.image?.credit,
	});

	return (
		<section className={styles.hero}>
			{launch.image && (
				<div className={styles.heroImage}>
					<ProgressiveImage
						thumbnailUrl={launch.image?.thumbnail_url}
						fullImageUrl={launch.image?.image_url}
						alt={launch.name}
						className={styles.mainImage}
						loading="eager"
						objectFit="cover"
					/>
					{launch.image.credit && (
						<p className={styles.imageCredit}>Crédito: {launch.image.credit}</p>
					)}
				</div>
			)}
			<div className={styles.heroContent}>
				<h1 className={styles.title}>{launch.name}</h1>
				<div className={styles.statusRow}>
					<BadgeStatus status={launch.status} />
					<Countdown net={launch.net} />
				</div>
				<p className={styles.lastUpdated}>
					Última atualização: {formatDate(launch.last_updated)}
				</p>
			</div>
		</section>
	);
}
