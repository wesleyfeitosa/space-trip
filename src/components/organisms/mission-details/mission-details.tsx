import {
	translateMissionType,
	translateOrbit,
	translateMissionDescription,
} from '@/utils/translations';
import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import styles from './mission-details.module.css';

interface MissionDetailsProps {
	mission: UpcomingLaunchDetail['mission'];
}

export function MissionDetails({ mission }: MissionDetailsProps) {
	if (!mission) return null;

	const translatedOrbit = mission.orbit
		? translateOrbit(mission.orbit.name, mission.orbit.abbrev)
		: null;

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Detalhes da Missão</h2>
			<div className={styles.missionCard}>
				<h3>{mission.name}</h3>
				<p className={styles.missionType}>
					Tipo: {translateMissionType(mission.type)}
				</p>
				<p className={styles.missionDescription}>
					{translateMissionDescription(mission.description)}
				</p>
				{translatedOrbit && (
					<p className={styles.orbitInfo}>
						Órbita: {translatedOrbit.name} ({translatedOrbit.abbrev})
					</p>
				)}
			</div>
		</section>
	);
}
