'use client';

import { formatDate } from '@/utils/formatters';
import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import { useLanguage } from '@/contexts/language-context';
import { BadgeStatus } from '@/components/molecules/badge-status/badge-status';
import { ProgressiveImage } from '@/components/atoms/progressive-image/progressive-image';
import { Countdown } from '@/components/atoms/countdown/countdown';

import styles from './launch-hero.module.css';

interface LaunchHeroProps {
	launch: UpcomingLaunchDetail;
}

export function LaunchHero({ launch }: LaunchHeroProps) {
	const { language } = useLanguage();

	const locale = language === 'pt' ? 'pt-BR' : 'en-US';
	const labels = {
		credit: language === 'pt' ? 'Crédito' : 'Credit',
		lastUpdated: language === 'pt' ? 'Última atualização' : 'Last updated',
	};

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
						<p className={styles.imageCredit}>
							{labels.credit}: {launch.image.credit}
						</p>
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
					{labels.lastUpdated}: {formatDate(launch.last_updated, locale)}
				</p>
			</div>
		</section>
	);
}
