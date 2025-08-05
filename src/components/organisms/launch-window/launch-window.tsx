import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import styles from './launch-window.module.css';

interface LaunchWindowProps {
	launch: UpcomingLaunchDetail;
	formatDate: (dateString: string) => string;
}

export function LaunchWindow({ launch, formatDate }: LaunchWindowProps) {
	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>Janela de Lançamento</h2>
			<div className={styles.windowCard}>
				<p>
					<strong>NET (No Earlier Than):</strong> {formatDate(launch.net)}
				</p>
				<p>
					<strong>Início da janela:</strong> {formatDate(launch.window_start)}
				</p>
				<p>
					<strong>Fim da janela:</strong> {formatDate(launch.window_end)}
				</p>
			</div>
		</section>
	);
}
