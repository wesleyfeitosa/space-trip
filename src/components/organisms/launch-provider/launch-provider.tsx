import { translateAgencyDescription } from '@/utils/translations';
import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import { ProgressiveImage } from '@/components/atoms/progressive-image/progressive-image';
import styles from './launch-provider.module.css';

interface LaunchProviderProps {
	provider: UpcomingLaunchDetail['launch_service_provider'];
}

export function LaunchProvider({ provider }: LaunchProviderProps) {
	if (!provider) return null;

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Provedor de Lançamento</h2>
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
							Fundada em: {provider.founding_year}
						</p>
						<p className={styles.providerStats}>
							Lançamentos totais: {provider.total_launch_count}
						</p>
						<p className={styles.providerStats}>
							Sucessos: {provider.successful_launches} | Falhas:{' '}
							{provider.failed_launches}
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
