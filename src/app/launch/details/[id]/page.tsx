import { notFound } from 'next/navigation';

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
	params: {
		id: string;
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

		return (await response.json()) as UpcomingLaunchDetail;
	} catch (error) {
		console.error('Error fetching launch details:', error);
		return undefined;
	}
}

function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('pt-BR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short',
	});
}

function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
	}).format(amount);
}

export default async function LaunchDetailsPage({ params }: Props) {
	const launch = await fetchLaunchDetails(params.id);

	if (!launch) {
		notFound();
	}

	return (
		<div className={styles.container}>
			<LaunchHero launch={launch} formatDate={formatDate} />
			<MissionDetails mission={launch.mission} />

			<div className={styles.detailsGrid}>
				<LaunchProvider provider={launch.launch_service_provider} />
				<RocketInfo
					rocket={launch.rocket}
					formatDate={formatDate}
					formatCurrency={formatCurrency}
				/>
			</div>

			<LaunchWindow launch={launch} formatDate={formatDate} />
			<LaunchPad pad={launch.pad} />
			<RemainingSections launch={launch} formatDate={formatDate} />
		</div>
	);
}
