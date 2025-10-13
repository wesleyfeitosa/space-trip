import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About Us',
	description:
		'Learn more about Space Trip, your source for space launch tracking and space exploration news. Discover our mission to make space information accessible to everyone.',
	openGraph: {
		title: 'About Space Trip',
		description:
			'Learn more about Space Trip and our mission to track space launches.',
		url: 'https://space-trip.vercel.app/about',
	},
};

export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
