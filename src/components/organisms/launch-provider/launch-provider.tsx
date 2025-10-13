'use client';

import { translateAgencyDescription } from '@/utils/translations';
import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import { useLanguage } from '@/contexts/language-context';
import { ProgressiveImage } from '@/components/atoms/progressive-image/progressive-image';

import styles from './launch-provider.module.css';

interface LaunchProviderProps {
	provider: UpcomingLaunchDetail['launch_service_provider'];
}

export function LaunchProvider({ provider }: LaunchProviderProps) {
	const { language } = useLanguage();

	if (!provider) return null;

	const labels = {
		title:
			language === 'pt' ? 'Provedor de Lançamento' : 'Launch Service Provider',
		founded: language === 'pt' ? 'Fundada em' : 'Founded',
		totalLaunches: language === 'pt' ? 'Lançamentos totais' : 'Total Launches',
		successful: language === 'pt' ? 'Sucessos' : 'Successful',
		failed: language === 'pt' ? 'Falhas' : 'Failed',
	};

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>{labels.title}</h2>
			<div className={styles.providerCard}>
				<div className={styles.providerHeader}>
					{provider.logo && (
						<ProgressiveImage
							thumbnailUrl={provider.logo?.thumbnail_url}
							fullImageUrl={provider.logo?.image_url}
							alt={`${provider.name} logo`}
							className={styles.providerLogo}
							loading="lazy"
							objectFit="contain"
						/>
					)}
					<div className={styles.providerInfo}>
						<h3>{provider.name}</h3>
						<p className={styles.providerStats}>
							{labels.founded}: {provider.founding_year}
						</p>
						<p className={styles.providerStats}>
							{labels.totalLaunches}: {provider.total_launch_count}
						</p>
						<p className={styles.providerStats}>
							{labels.successful}: {provider.successful_launches} |{' '}
							{labels.failed}: {provider.failed_launches}
						</p>
					</div>
				</div>
				<p className={styles.providerDescription}>
					{translateAgencyDescription(provider.description)}
				</p>
			</div>
		</section>
	);
}
