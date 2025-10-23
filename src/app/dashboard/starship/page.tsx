import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { type Metadata } from 'next';

import { getLanguageFromCookies } from '@/utils/language';
import type {
	StarshipDashboard,
	Vehicle,
	Orbiter,
	DashboardUpdate,
	LiveStream,
	RoadClosure,
	Notice,
	UpcomingLaunch,
} from '@/interfaces/dashboard';

import styles from './page.module.css';

export const metadata: Metadata = {
	title: 'Starship Dashboard | Space Trip',
	description:
		'Real-time Starship dashboard with updates, live streams, road closures, and vehicle information',
};

async function getDashboardData(): Promise<StarshipDashboard | undefined> {
	try {
		const response = await fetch(
			'https://ll.thespacedevs.com/2.3.0/dashboard/starship/',
			{
				next: { revalidate: 300 }, // Revalidate every 5 minutes
			}
		);

		if (!response.ok) {
			console.error('Failed to fetch dashboard data:', response.status);
			return undefined;
		}

		const data = await response.json() as StarshipDashboard;
		
		// Handle both array and single object responses
		if (Array.isArray(data)) {
			return data[0] as StarshipDashboard;
		}
		
		return data;
	} catch (error) {
		console.error('Error fetching dashboard data:', error);
		return undefined;
	}
}

function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(date);
}

function VehicleCard({
	vehicle,
	labels,
}: {
	vehicle: Vehicle;
	labels: { flights: string; landings: string };
}) {
	return (
		<div className={styles.vehicleCard}>
			{vehicle.image?.image_url && (
				<Image
					src={vehicle.image.image_url}
					alt={vehicle.serial_number}
					width={400}
					height={200}
					className={styles.vehicleImage}
				/>
			)}
			<div className={styles.vehicleContent}>
				<h3 className={styles.vehicleTitle}>{vehicle.serial_number}</h3>
				<span
					className={`${styles.vehicleStatus} ${
						vehicle.status.name === 'Active'
							? styles.statusActive
							: styles.statusInactive
					}`}
				>
					{vehicle.status.name}
				</span>
				{vehicle.details && (
					<p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
						{vehicle.details}
					</p>
				)}
				<div className={styles.vehicleStats}>
					<div className={styles.stat}>
						<div className={styles.statLabel}>{labels.flights}</div>
						<div className={styles.statValue}>{vehicle.flights}</div>
					</div>
					<div className={styles.stat}>
						<div className={styles.statLabel}>{labels.landings}</div>
						<div className={styles.statValue}>
							{vehicle.successful_landings}/{vehicle.attempted_landings}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function OrbiterCard({
	orbiter,
	labels,
}: {
	orbiter: Orbiter;
	labels: { flights: string; timeInSpace: string; inSpace: string };
}) {
	return (
		<div className={styles.vehicleCard}>
			{orbiter.image?.image_url && (
				<Image
					src={orbiter.image.image_url}
					alt={orbiter.serial_number}
					width={400}
					height={200}
					className={styles.vehicleImage}
				/>
			)}
			<div className={styles.vehicleContent}>
				<h3 className={styles.vehicleTitle}>{orbiter.serial_number}</h3>
				<span
					className={`${styles.vehicleStatus} ${
						orbiter.in_space ? styles.statusActive : styles.statusInactive
					}`}
				>
					{orbiter.in_space ? labels.inSpace : orbiter.status.name}
				</span>
				{orbiter.description && (
					<p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
						{orbiter.description}
					</p>
				)}
				<div className={styles.vehicleStats}>
					<div className={styles.stat}>
						<div className={styles.statLabel}>{labels.flights}</div>
						<div className={styles.statValue}>{orbiter.flights_count}</div>
					</div>
					{orbiter.time_in_space && (
						<div className={styles.stat}>
							<div className={styles.statLabel}>{labels.timeInSpace}</div>
							<div className={styles.statValue}>{orbiter.time_in_space}</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function UpdateCard({
	update,
	learnMoreLabel,
}: {
	update: DashboardUpdate;
	learnMoreLabel: string;
}) {
	return (
		<div className={styles.updateCard}>
			<div className={styles.updateHeader}>
				{update.profile_image && (
					<Image
						src={update.profile_image}
						alt={update.created_by}
						width={40}
						height={40}
						className={styles.updateProfile}
					/>
				)}
				<div>
					<div className={styles.updateAuthor}>{update.created_by}</div>
					<div className={styles.updateDate}>{formatDate(update.created_on)}</div>
				</div>
			</div>
			<p className={styles.updateComment}>{update.comment}</p>
			{update.info_url && (
				<a
					href={update.info_url}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.updateLink}
				>
					{learnMoreLabel} →
				</a>
			)}
		</div>
	);
}

function LiveStreamCard({ stream }: { stream: LiveStream }) {
	return (
		<a
			href={stream.url}
			target="_blank"
			rel="noopener noreferrer"
			className={styles.streamCard}
		>
			{stream.image && (
				<Image
					src={stream.image}
					alt={stream.title}
					width={400}
					height={160}
					className={styles.streamImage}
				/>
			)}
			<div className={styles.streamContent}>
				<h3 className={styles.streamTitle}>{stream.title}</h3>
				<p className={styles.streamDescription}>{stream.description}</p>
			</div>
		</a>
	);
}

function RoadClosureCard({ closure }: { closure: RoadClosure }) {
	return (
		<div className={styles.closureCard}>
			<div className={styles.closureInfo}>
				<h3 className={styles.closureTitle}>{closure.title}</h3>
				<p className={styles.closureWindow}>
					{formatDate(closure.window_start)} - {formatDate(closure.window_end)}
				</p>
			</div>
			<span
				className={`${styles.closureStatus} ${styles.statusActive}`}
				style={{
					background: 'rgba(255, 193, 7, 0.2)',
					color: '#ffc107',
					border: '1px solid rgba(255, 193, 7, 0.3)',
				}}
			>
				{closure.status.name}
			</span>
		</div>
	);
}

function NoticeCard({ notice }: { notice: Notice }) {
	return (
		<a
			href={notice.url}
			target="_blank"
			rel="noopener noreferrer"
			className={styles.noticeCard}
		>
			<div className={styles.noticeType}>{notice.type.name}</div>
			<div className={styles.noticeDate}>{formatDate(notice.date)}</div>
		</a>
	);
}

function LaunchCard({ launch }: { launch: UpcomingLaunch }) {
	return (
		<Link href={`/launch/details/${launch.id}`} className={styles.launchCard}>
			{launch.image?.image_url && (
				<Image
					src={launch.image.image_url}
					alt={launch.name}
					width={400}
					height={180}
					className={styles.launchImage}
				/>
			)}
			<div className={styles.launchContent}>
				<h3 className={styles.launchName}>{launch.name}</h3>
				<p className={styles.launchDate}>{formatDate(launch.net)}</p>
				<span
					className={`${styles.vehicleStatus} ${styles.statusActive}`}
					style={{
						background: 'rgba(33, 150, 243, 0.2)',
						color: '#2196f3',
						border: '1px solid rgba(33, 150, 243, 0.3)',
					}}
				>
					{launch.status.abbrev}
				</span>
			</div>
		</Link>
	);
}

function getLabels(language: string) {
	return {
		title: language === 'pt' ? '🚀 Painel Starship' : '🚀 Starship Dashboard',
		subtitle:
			language === 'pt'
				? 'Atualizações e informações em tempo real sobre o programa Starship da SpaceX'
				: 'Real-time updates and information about SpaceX\'s Starship program',
		errorTitle:
			language === 'pt'
				? 'Não foi possível carregar os dados do painel no momento.'
				: 'Unable to load dashboard data at this time.',
		errorSubtitle:
			language === 'pt'
				? 'Por favor, tente novamente mais tarde ou verifique sua conexão com a internet.'
				: 'Please try again later or check your internet connection.',
		recentUpdates:
			language === 'pt' ? 'Atualizações Recentes' : 'Recent Updates',
		liveStreams: language === 'pt' ? 'Transmissões ao Vivo' : 'Live Streams',
		roadClosures: language === 'pt' ? 'Fechamentos de Estradas' : 'Road Closures',
		notices: language === 'pt' ? 'Avisos' : 'Notices',
		superHeavyBoosters:
			language === 'pt' ? 'Propulsores Super Heavy' : 'Super Heavy Boosters',
		starshipVehicles:
			language === 'pt' ? 'Veículos Starship' : 'Starship Vehicles',
		upcomingLaunches:
			language === 'pt' ? 'Próximos Lançamentos' : 'Upcoming Launches',
		flights: language === 'pt' ? 'Voos' : 'Flights',
		landings: language === 'pt' ? 'Pousos' : 'Landings',
		timeInSpace: language === 'pt' ? 'Tempo no Espaço' : 'Time in Space',
		inSpace: language === 'pt' ? 'No Espaço' : 'In Space',
		learnMore: language === 'pt' ? 'Saiba mais' : 'Learn more',
	};
}

async function getLanguage() {
	const cookieStore = await cookies();
	const cookieString = cookieStore
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join('; ');
	return getLanguageFromCookies(cookieString);
}

export default async function StarshipDashboardPage() {
	const dashboard = await getDashboardData();
	const language = await getLanguage();
	const labels = getLabels(language);

	if (!dashboard) {
		return (
			<main className={styles.container}>
				<div className={styles.header}>
					<h1 className={styles.title}>{labels.title}</h1>
					<p className={styles.subtitle}>{labels.subtitle}</p>
				</div>
				<div className={styles.emptyState}>
					<p>{labels.errorTitle}</p>
					<p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
						{labels.errorSubtitle}
					</p>
				</div>
			</main>
		);
	}

	return (
		<main className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>{labels.title}</h1>
				<p className={styles.subtitle}>{labels.subtitle}</p>
			</div>

			<div className={styles.grid}>
				{/* Updates Section */}
				{dashboard.updates && dashboard.updates.length > 0 && (
					<section className={styles.section}>
						<h2 className={styles.sectionTitle}>
							<span className={styles.sectionIcon}>📢</span>
							{labels.recentUpdates}
						</h2>
						<div className={styles.updatesList}>
							{dashboard.updates.slice(0, 5).map((update) => (
								<UpdateCard
									key={update.id}
									update={update}
									learnMoreLabel={labels.learnMore}
								/>
							))}
						</div>
					</section>
				)}

				{/* Live Streams Section */}
				{dashboard.live_streams && dashboard.live_streams.length > 0 && (
					<section className={styles.section}>
						<h2 className={styles.sectionTitle}>
							<span className={styles.sectionIcon}>📹</span>
							{labels.liveStreams}
						</h2>
						<div className={styles.streamsGrid}>
							{dashboard.live_streams.map((stream, index) => (
								<LiveStreamCard key={index} stream={stream} />
							))}
						</div>
					</section>
				)}

				{/* Road Closures Section */}
				{dashboard.road_closures && dashboard.road_closures.length > 0 && (
					<section className={styles.section}>
						<h2 className={styles.sectionTitle}>
							<span className={styles.sectionIcon}>🚧</span>
							{labels.roadClosures}
						</h2>
						<div className={styles.closuresList}>
							{dashboard.road_closures.map((closure) => (
								<RoadClosureCard key={closure.id} closure={closure} />
							))}
						</div>
					</section>
				)}

				{/* Notices Section */}
				{dashboard.notices && dashboard.notices.length > 0 && (
					<section className={styles.section}>
						<h2 className={styles.sectionTitle}>
							<span className={styles.sectionIcon}>📋</span>
							{labels.notices}
						</h2>
						<div className={styles.noticesList}>
							{dashboard.notices.slice(0, 6).map((notice) => (
								<NoticeCard key={notice.id} notice={notice} />
							))}
						</div>
					</section>
				)}

				{/* Vehicles (Boosters) Section */}
				{dashboard.vehicles && dashboard.vehicles.length > 0 && (
					<section className={styles.section}>
						<h2 className={styles.sectionTitle}>
							<span className={styles.sectionIcon}>🚀</span>
							{labels.superHeavyBoosters}
						</h2>
						<div className={styles.vehiclesGrid}>
							{dashboard.vehicles.map((vehicle) => (
								<VehicleCard
									key={vehicle.id}
									vehicle={vehicle}
									labels={{
										flights: labels.flights,
										landings: labels.landings,
									}}
								/>
							))}
						</div>
					</section>
				)}

				{/* Orbiters (Starships) Section */}
				{dashboard.orbiters && dashboard.orbiters.length > 0 && (
					<section className={styles.section}>
						<h2 className={styles.sectionTitle}>
							<span className={styles.sectionIcon}>🛸</span>
							{labels.starshipVehicles}
						</h2>
						<div className={styles.vehiclesGrid}>
							{dashboard.orbiters.map((orbiter) => (
								<OrbiterCard
									key={orbiter.id}
									orbiter={orbiter}
									labels={{
										flights: labels.flights,
										timeInSpace: labels.timeInSpace,
										inSpace: labels.inSpace,
									}}
								/>
							))}
						</div>
					</section>
				)}

				{/* Upcoming Launches Section */}
				{dashboard.upcoming?.launches && dashboard.upcoming.launches.length > 0 && (
					<section className={styles.section}>
						<h2 className={styles.sectionTitle}>
							<span className={styles.sectionIcon}>🗓️</span>
							{labels.upcomingLaunches}
						</h2>
						<div className={styles.launchesList}>
							{dashboard.upcoming.launches.slice(0, 6).map((launch) => (
								<LaunchCard key={launch.id} launch={launch} />
							))}
						</div>
					</section>
				)}
			</div>
		</main>
	);
}

