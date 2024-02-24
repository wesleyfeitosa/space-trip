import { serverUrl } from '@/infra/server';
import { type UpcomingLaunch } from '@/entities/upcoming-launch';
import { LaunchCard } from '@/components/molecules/launch-card';
import styles from './page.module.css';

interface LaunchProps {
	count: number;
	results: UpcomingLaunch[];
}

async function fetchLaunches() {
	const response = await fetch(`${serverUrl}/launch/upcoming?limit=10`, {
		next: {
			tags: ['list-upcoming-launches'],
			revalidate: 60 * 60, // Revalidate the data after 1 hour
		},
	});

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
