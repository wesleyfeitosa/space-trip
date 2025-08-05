import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import { BadgeStatus } from '@/components/molecules/badge-status/badge-status';
import { Countdown } from '@/components/atoms/countdown/countdown';
import styles from './launch-hero.module.css';

interface LaunchHeroProps {
	launch: UpcomingLaunchDetail;
	formatDate: (dateString: string) => string;
}

export function LaunchHero({ launch, formatDate }: LaunchHeroProps) {
	return (
		<section className={styles.hero}>
			{launch.image && (
				<div className={styles.heroImage}>
					<img
						src={launch.image.image_url}
						alt={launch.name}
						className={styles.mainImage}
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
