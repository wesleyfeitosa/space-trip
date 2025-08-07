import { translateRocketDescription } from '@/utils/translations';
import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import styles from './rocket-info.module.css';

interface RocketInfoProps {
	rocket: UpcomingLaunchDetail['rocket'];
	formatDate: (dateString: string) => string;
	formatCurrency: (amount: number) => string;
}

export function RocketInfo({
	rocket,
	formatDate,
	formatCurrency,
}: RocketInfoProps) {
	if (!rocket) return null;

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Foguete</h2>
			<div className={styles.rocketCard}>
				<h3>{rocket.configuration.full_name}</h3>
				<div className={styles.rocketSpecs}>
					<p>Fabricante: {rocket.configuration.manufacturer.name}</p>
					<p>Primeiro voo: {formatDate(rocket.configuration.maiden_flight)}</p>
					{rocket.configuration.length && (
						<p>Comprimento: {rocket.configuration.length}m</p>
					)}
					{rocket.configuration.diameter && (
						<p>Diâmetro: {rocket.configuration.diameter}m</p>
					)}
					{rocket.configuration.leo_capacity && (
						<p>Capacidade LEO: {rocket.configuration.leo_capacity}kg</p>
					)}
					{rocket.configuration.launch_cost && (
						<p>
							Custo de lançamento:{' '}
							{formatCurrency(rocket.configuration.launch_cost)}
						</p>
					)}
				</div>
				<p className={styles.rocketDescription}>
					{translateRocketDescription(rocket.configuration.description)}
				</p>
			</div>
		</section>
	);
}
