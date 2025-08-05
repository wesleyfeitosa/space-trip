import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import styles from './mission-details.module.css';

interface MissionDetailsProps {
	mission: UpcomingLaunchDetail['mission'];
}

export function MissionDetails({ mission }: MissionDetailsProps) {
	if (!mission) return null;

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Detalhes da Missão</h2>
			<div className={styles.missionCard}>
				<h3>{mission.name}</h3>
				<p className={styles.missionType}>Tipo: {mission.type}</p>
				<p className={styles.missionDescription}>{mission.description}</p>
				{mission.orbit && (
					<p className={styles.orbitInfo}>
						Órbita: {mission.orbit.name} ({mission.orbit.abbrev})
					</p>
				)}
			</div>
		</section>
	);
}
