import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

import { LanguageProvider } from '@/contexts/language-context';
import { Header } from '@/components/organisms/header/header';
import { Footer } from '@/components/organisms/footer/footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#6366f1',
};

export const metadata: Metadata = {
	metadataBase: new URL('https://space-trip.vercel.app'),
	title: {
		default: 'Space Trip - Latest Space Launch News & Updates',
		template: '%s | Space Trip',
	},
	description:
		'Stay updated with the latest space launches, mission details, and space exploration news. Track upcoming rocket launches, get real-time updates, and explore the future of space travel.',
	keywords: [
		'space launches',
		'rocket launches',
		'space news',
		'NASA',
		'SpaceX',
		'space exploration',
		'upcoming launches',
		'mission details',
		'space travel',
		'astronomy',
	],
	authors: [{ name: 'Space Trip Team' }],
	creator: 'Space Trip',
	publisher: 'Space Trip',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		alternateLocale: 'pt_BR',
		url: 'https://space-trip.vercel.app',
		title: 'Space Trip - Latest Space Launch News & Updates',
		description:
			'Stay updated with the latest space launches, mission details, and space exploration news.',
		siteName: 'Space Trip',
		images: [
			{
				url: '/default-launch.png',
				width: 1200,
				height: 630,
				alt: 'Space Trip - Space Launch Tracker',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Space Trip - Latest Space Launch News & Updates',
		description:
			'Stay updated with the latest space launches, mission details, and space exploration news.',
		images: ['/default-launch.png'],
		creator: '@spacetrip',
	},
	alternates: {
		canonical: 'https://space-trip.vercel.app',
	},
	verification: {
		google: 'your-google-verification-code',
		// Add your actual verification codes when you have them
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="canonical" href="https://space-trip.vercel.app" />
			</head>
			<body className={inter.className}>
				<LanguageProvider>
					<div>
						<Header />
						{children}
						<Footer />
					</div>
				</LanguageProvider>
			</body>
		</html>
	);
}
