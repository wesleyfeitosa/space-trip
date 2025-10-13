import { cookies } from 'next/headers';

import { getLanguageFromCookies } from '@/utils/language';
import { translateApiData } from '@/services/translation-service';
import { type UpcomingLaunch } from '@/interfaces/upcoming-launch';
import { serverUrl } from '@/infra/server';
import { LaunchCard } from '@/components/molecules/launch-card/launch-card';

import styles from './page.module.css';

interface LaunchProps {
	count: number;
	results: UpcomingLaunch[];
}

async function fetchLaunches(): Promise<UpcomingLaunch[]> {
	try {
		const response = await fetch(`${serverUrl}/launches/upcoming?limit=10`, {
			next: {
				tags: ['list-upcoming-launches'],
				revalidate: 60 * 60, // Revalidate the data after 1 hour
			},
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(
				`Failed to fetch launches data: ${response.status} ${response.statusText}`,
			);
		}

		const launchesData = (await response.json()) as LaunchProps;

		// Validate the response structure
		if (!launchesData || !Array.isArray(launchesData.results)) {
			throw new Error('Invalid response format: missing results array');
		}

		// Get language preference from cookies
		const cookieStore = await cookies();
		const cookieString = cookieStore
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');
		const language = getLanguageFromCookies(cookieString);

		// Translate the data only if language is Portuguese
		const shouldTranslate = language === 'pt';
		const translatedData = await translateApiData(
			launchesData,
			shouldTranslate,
		);

		return translatedData.results;
	} catch (error) {
		console.error('Error fetching launches:', error);

		// Return empty array as fallback instead of throwing
		// This prevents the entire page from crashing
		return [];
	}
}

export default async function Home() {
	const launches = await fetchLaunches();

	// Get language for UI labels
	const cookieStore = await cookies();
	const cookieString = cookieStore
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join('; ');
	const language = getLanguageFromCookies(cookieString);

	const labels = {
		title: language === 'pt' ? 'Próximos lançamentos' : 'Upcoming Launches',
		noLaunches:
			language === 'pt'
				? 'Nenhum lançamento encontrado no momento.'
				: 'No launches found at the moment.',
	};

	return (
		<main className={styles.main}>
			<h2 className={styles.title}>{labels.title}</h2>
			{launches.length > 0 ? (
				<ul>
					{launches.map((launch) => (
						<LaunchCard key={launch.id} launch={launch} />
					))}
				</ul>
			) : (
				<p>{labels.noLaunches}</p>
			)}
		</main>
	);
}
