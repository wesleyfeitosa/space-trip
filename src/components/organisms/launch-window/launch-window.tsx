'use client';

import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import { useLanguage } from '@/contexts/language-context';

import styles from './launch-window.module.css';

interface LaunchWindowProps {
	launch: UpcomingLaunchDetail;
	formatDate: (dateString: string) => string;
}

export function LaunchWindow({ launch, formatDate }: LaunchWindowProps) {
	const { language } = useLanguage();

	const labels = {
		title: language === 'pt' ? 'Janela de Lançamento' : 'Launch Window',
		net: language === 'pt' ? 'NET (Não Antes De)' : 'NET (No Earlier Than)',
		windowStart: language === 'pt' ? 'Início da janela' : 'Window Start',
		windowEnd: language === 'pt' ? 'Fim da janela' : 'Window End',
	};

	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>{labels.title}</h2>
			<div className={styles.windowCard}>
				<p>
					<strong>{labels.net}:</strong> {formatDate(launch.net)}
				</p>
				<p>
					<strong>{labels.windowStart}:</strong>{' '}
					{formatDate(launch.window_start)}
				</p>
				<p>
					<strong>{labels.windowEnd}:</strong> {formatDate(launch.window_end)}
				</p>
			</div>
		</section>
	);
}
