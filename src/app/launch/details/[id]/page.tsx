import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';

import { getLanguageFromCookies } from '@/utils/language';
import { translateApiData } from '@/services/translation-service';
import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import { serverUrl } from '@/infra/server';
import { RocketInfo } from '@/components/organisms/rocket-info/rocket-info';
import { RemainingSections } from '@/components/organisms/remaining-sections/remaining-sections';
import { MissionDetails } from '@/components/organisms/mission-details/mission-details';
import { LaunchWindow } from '@/components/organisms/launch-window/launch-window';
import { LaunchProvider } from '@/components/organisms/launch-provider/launch-provider';
import { LaunchPad } from '@/components/organisms/launch-pad/launch-pad';
import { LaunchHero } from '@/components/organisms/launch-hero/launch-hero';

import styles from './page.module.css';

interface Props {
	params: Promise<{
		id: string;
	}>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const launch = await fetchLaunchDetails(id);

	if (!launch) {
		return {
			title: 'Launch Not Found',
		};
	}

	const description = launch.mission?.description
		? `${launch.mission.description.slice(0, 155)}...`
		: `${launch.name} - Launch details, mission information, and real-time updates.`;

	return {
		title: launch.name,
		description,
		openGraph: {
			title: `${launch.name} | Space Trip`,
			description,
			url: `https://space-trip.vercel.app/launch/details/${id}`,
			images: launch.image?.image_url
				? [
						{
							url: launch.image.image_url,
							width: 1200,
							height: 630,
							alt: launch.name,
						},
					]
				: undefined,
		},
		twitter: {
			card: 'summary_large_image',
			title: launch.name,
			description,
			images: launch.image?.image_url ? [launch.image.image_url] : undefined,
		},
	};
}

async function fetchLaunchDetails(
	id: string,
): Promise<UpcomingLaunchDetail | undefined> {
	try {
		const response = await fetch(`${serverUrl}/launches/upcoming/${id}`, {
			next: {
				tags: [`launch-detail-${id}`],
				revalidate: 60 * 30, // Revalidate every 30 minutes
			},
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			if (response.status === 404) {
				return undefined;
			}

			throw new Error(`Failed to fetch launch details: ${response.status}`);
		}

		const data = (await response.json()) as UpcomingLaunchDetail;

		// Get language preference from cookies
		const cookieStore = await cookies();
		const cookieString = cookieStore
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');
		const language = getLanguageFromCookies(cookieString);

		// Translate the data only if language is Portuguese
		const shouldTranslate = language === 'pt';
		const translatedData = await translateApiData(data, shouldTranslate);

		return translatedData;
	} catch (error) {
		console.error('Error fetching launch details:', error);
		return undefined;
	}
}

export default async function LaunchDetailsPage({ params }: Props) {
	const { id } = await params;
	const launch = await fetchLaunchDetails(id);

	if (!launch) {
		notFound();
	}

	// Structured data for launch event
	const countryCode = launch.pad?.country?.name ?? 'Unknown';

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: launch.name,
		description: launch.mission?.description ?? launch.name,
		startDate: launch.net,
		eventStatus: 'https://schema.org/EventScheduled',
		location: {
			'@type': 'Place',
			name: launch.pad?.name ?? 'Unknown',
			address: {
				'@type': 'PostalAddress',
				addressCountry: countryCode,
			},
		},
		organizer: {
			'@type': 'Organization',
			name: launch.launch_service_provider?.name ?? 'Unknown',
		},
		image: launch.image?.image_url ?? '/default-launch.png',
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<div className={styles.container}>
				<LaunchHero launch={launch} />
				<MissionDetails mission={launch.mission} />

				<div className={styles.detailsGrid}>
					<LaunchProvider provider={launch.launch_service_provider} />
					<RocketInfo rocket={launch.rocket} />
				</div>

				<LaunchWindow launch={launch} />
				<LaunchPad pad={launch.pad} />
				<RemainingSections launch={launch} />
			</div>
		</>
	);
}
