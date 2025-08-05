import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import { Header } from '@/components/organisms/header/header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Space Trip',
	description: 'Últimas notícias sobre os espaço e viagens espaciais.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div>
					<Header />
					{children}
				</div>
			</body>
		</html>
	);
}
