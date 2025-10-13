'use client';

import {
	translateMissionType,
	translateOrbit,
	translateMissionDescription,
} from '@/utils/translations';
import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import { useLanguage } from '@/contexts/language-context';

import styles from './mission-details.module.css';

interface MissionDetailsProps {
	mission: UpcomingLaunchDetail['mission'];
}

export function MissionDetails({ mission }: MissionDetailsProps) {
	const { language } = useLanguage();

	if (!mission) return null;

	const translatedOrbit = mission.orbit
		? translateOrbit(mission.orbit.name, mission.orbit.abbrev)
		: null;

	const labels = {
		title: language === 'pt' ? 'Detalhes da Missão' : 'Mission Details',
		type: language === 'pt' ? 'Tipo' : 'Type',
		orbit: language === 'pt' ? 'Órbita' : 'Orbit',
	};

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>{labels.title}</h2>
			<div className={styles.missionCard}>
				<h3>{mission.name}</h3>
				<p className={styles.missionType}>
					{labels.type}: {translateMissionType(mission.type)}
				</p>
				<p className={styles.missionDescription}>
					{translateMissionDescription(mission.description)}
				</p>
				{translatedOrbit && (
					<p className={styles.orbitInfo}>
						{labels.orbit}: {translatedOrbit.name} ({translatedOrbit.abbrev})
					</p>
				)}
			</div>
		</section>
	);
}
