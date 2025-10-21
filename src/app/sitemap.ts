import type { MetadataRoute } from 'next';

import { serverUrl } from '@/infra/server';

interface LaunchProps {
	count: number;
	results: Array<{ id: string; last_updated: string }>;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://space-trip.vercel.app';

	// Static pages
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'hourly',
			priority: 1,
		},
		{
			url: `${baseUrl}/news`,
			lastModified: new Date(),
			changeFrequency: 'hourly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/dashboard/starship`,
			lastModified: new Date(),
			changeFrequency: 'hourly',
			priority: 0.85,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5,
		},
	];

	// Fetch dynamic launch pages
	let launchPages: MetadataRoute.Sitemap = [];
	try {
		const response = await fetch(`${serverUrl}/launches/upcoming?limit=100`, {
			next: { revalidate: 3600 },
		});

		if (response.ok) {
			const data = (await response.json()) as LaunchProps;
			launchPages = data.results.map((launch) => ({
				url: `${baseUrl}/launch/details/${launch.id}`,
				lastModified: new Date(launch.last_updated),
				changeFrequency: 'daily' as const,
				priority: 0.8,
			}));
		}
	} catch (error) {
		console.error('Error fetching launches for sitemap:', error);
	}

	return [...staticPages, ...launchPages];
}
