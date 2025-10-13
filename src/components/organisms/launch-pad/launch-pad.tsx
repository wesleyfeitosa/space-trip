'use client';

import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import { useLanguage } from '@/contexts/language-context';

import styles from './launch-pad.module.css';

interface LaunchPadProps {
	pad: UpcomingLaunchDetail['pad'];
}

export function LaunchPad({ pad }: LaunchPadProps) {
	const { language } = useLanguage();

	if (!pad) return null;

	const labels = {
		title: language === 'pt' ? 'Local de Lançamento' : 'Launch Pad',
		location: language === 'pt' ? 'Local' : 'Location',
		country: language === 'pt' ? 'País' : 'Country',
		coordinates: language === 'pt' ? 'Coordenadas' : 'Coordinates',
	};

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>{labels.title}</h2>
			<div className={styles.padCard}>
				<h3>{pad.name}</h3>
				<p>
					{labels.location}: {pad.location.name}
				</p>
				<p>
					{labels.country}: {pad.country.name}
				</p>
				<p>
					{labels.coordinates}: {pad.latitude.toFixed(6)},{' '}
					{pad.longitude.toFixed(6)}
				</p>
				{pad.description && (
					<p className={styles.padDescription}>{pad.description}</p>
				)}
			</div>
		</section>
	);
}
