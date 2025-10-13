import { cookies } from 'next/headers';
import type { Metadata } from 'next';

import { getLanguageFromCookies } from '@/utils/language';
import { translateApiData } from '@/services/translation-service';
import { type UpdatesResponse } from '@/interfaces/update';
import { serverUrl } from '@/infra/server';
import { UpdateCard } from '@/components/molecules/update-card/update-card';

import styles from './page.module.css';

export const metadata: Metadata = {
	title: 'Latest Space News & Updates',
	description:
		'Stay informed with the latest space news, mission updates, and announcements from the space industry. Real-time updates from space agencies worldwide.',
	openGraph: {
		title: 'Latest Space News & Updates | Space Trip',
		description:
			'Stay informed with the latest space news and mission updates.',
		url: 'https://space-trip.vercel.app/news',
	},
};

async function fetchUpdates(): Promise<UpdatesResponse | undefined> {
	try {
		const response = await fetch(`${serverUrl}/updates?limit=10`, {
			next: {
				tags: ['list-updates'],
				revalidate: 60 * 30, // Revalidate the data after 30 minutes
			},
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(
				`Failed to fetch updates: ${response.status} ${response.statusText}`,
			);
		}

		const updatesData = (await response.json()) as UpdatesResponse;

		// Validate the response structure
		if (!updatesData || !Array.isArray(updatesData.results)) {
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
		const translatedData = await translateApiData(updatesData, shouldTranslate);

		return translatedData;
	} catch (error) {
		console.error('Error fetching updates:', error);
		return undefined;
	}
}

export default async function NewsPage() {
	const updatesData = await fetchUpdates();

	// Get language for UI labels
	const cookieStore = await cookies();
	const cookieString = cookieStore
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join('; ');
	const language = getLanguageFromCookies(cookieString);

	const labels = {
		title: language === 'pt' ? 'Últimas Notícias' : 'Latest News',
		subtitle:
			language === 'pt'
				? 'Fique por dentro das últimas atualizações do mundo espacial'
				: 'Stay updated with the latest news from the space world',
		noUpdates:
			language === 'pt'
				? 'Nenhuma atualização encontrada no momento.'
				: 'No updates found at the moment.',
		totalUpdates:
			language === 'pt'
				? (count: number) => `${count} atualizações disponíveis`
				: (count: number) => `${count} updates available`,
	};

	return (
		<main className={styles.main}>
			<div className={styles.header}>
				<h1 className={styles.title}>{labels.title}</h1>
				<p className={styles.subtitle}>{labels.subtitle}</p>
				{updatesData && updatesData.count > 0 && (
					<p className={styles.count}>
						{labels.totalUpdates(updatesData.count)}
					</p>
				)}
			</div>

			{updatesData && updatesData.results.length > 0 ? (
				<div className={styles.updatesGrid}>
					{updatesData.results.map((update) => (
						<UpdateCard key={update.id} update={update} />
					))}
				</div>
			) : (
				<p className={styles.noUpdates}>{labels.noUpdates}</p>
			)}
		</main>
	);
}
