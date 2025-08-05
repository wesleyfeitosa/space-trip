import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import styles from './launch-pad.module.css';

interface LaunchPadProps {
	pad: UpcomingLaunchDetail['pad'];
}

export function LaunchPad({ pad }: LaunchPadProps) {
	if (!pad) return null;

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Local de Lançamento</h2>
			<div className={styles.padCard}>
				<h3>{pad.name}</h3>
				<p>Local: {pad.location.name}</p>
				<p>País: {pad.country.name}</p>
				<p>
					Coordenadas: {pad.latitude.toFixed(6)}, {pad.longitude.toFixed(6)}
				</p>
				{pad.description && (
					<p className={styles.padDescription}>{pad.description}</p>
				)}
			</div>
		</section>
	);
}
