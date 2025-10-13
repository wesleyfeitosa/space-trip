import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import { LanguageProvider } from '@/contexts/language-context';
import { Header } from '@/components/organisms/header/header';
import { Footer } from '@/components/organisms/footer/footer';
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
