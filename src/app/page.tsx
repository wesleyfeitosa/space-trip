import { type UpcomingLaunch } from '@/entities/upcoming-launch';
import { LaunchCard } from '@/components/launch-card';
import { serverUrl } from '@/api/server';
import styles from './page.module.css';

type LaunchProps = {
	count: number;
	results: UpcomingLaunch[];
};

export async function fetchLaunches() {
	const response = await fetch(`${serverUrl}/launch/upcoming?limit=10`);

	if (!response) {
		throw new Error('Failed to fetch launches data.');
	}

	const launchesData = (await response.json()) as LaunchProps;

	return launchesData.results;
}

export default async function Home() {
	const launches = await fetchLaunches();

	return (
		<main className={styles.main}>
			<h2 className={styles.title}>Próximos lançamentos</h2>
			<ul>
				{launches.map((launch) => (
					<LaunchCard key={launch.id} launch={launch} />
				))}
			</ul>
		</main>
	);
}
