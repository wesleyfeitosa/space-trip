'use client';

import { translateRocketDescription } from '@/utils/translations';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import { useLanguage } from '@/contexts/language-context';

import styles from './rocket-info.module.css';

interface RocketInfoProps {
	rocket: UpcomingLaunchDetail['rocket'];
}

export function RocketInfo({ rocket }: RocketInfoProps) {
	const { language } = useLanguage();

	if (!rocket) return null;

	const locale = language === 'pt' ? 'pt-BR' : 'en-US';
	const labels = {
		title: language === 'pt' ? 'Foguete' : 'Rocket',
		manufacturer: language === 'pt' ? 'Fabricante' : 'Manufacturer',
		firstFlight: language === 'pt' ? 'Primeiro voo' : 'First Flight',
		length: language === 'pt' ? 'Comprimento' : 'Length',
		diameter: language === 'pt' ? 'Diâmetro' : 'Diameter',
		leoCapacity: language === 'pt' ? 'Capacidade LEO' : 'LEO Capacity',
		launchCost: language === 'pt' ? 'Custo de lançamento' : 'Launch Cost',
	};

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>{labels.title}</h2>
			<div className={styles.rocketCard}>
				<h3>{rocket.configuration.full_name}</h3>
				<div className={styles.rocketSpecs}>
					<p>
						{labels.manufacturer}: {rocket.configuration.manufacturer.name}
					</p>
					<p>
						{labels.firstFlight}:{' '}
						{formatDate(rocket.configuration.maiden_flight, locale)}
					</p>
					{rocket.configuration.length && (
						<p>
							{labels.length}: {rocket.configuration.length}m
						</p>
					)}
					{rocket.configuration.diameter && (
						<p>
							{labels.diameter}: {rocket.configuration.diameter}m
						</p>
					)}
					{rocket.configuration.leo_capacity && (
						<p>
							{labels.leoCapacity}: {rocket.configuration.leo_capacity}kg
						</p>
					)}
					{rocket.configuration.launch_cost && (
						<p>
							{labels.launchCost}:{' '}
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
