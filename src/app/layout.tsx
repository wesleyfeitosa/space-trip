import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import './globals.css';
import styles from './layout.module.css';

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
					<header className={styles.header}>
						<nav>
							<b>Space Trip</b>
						</nav>
						<nav className={styles.centerHeader}>
							{/* <b>Mais dados</b>
							<b>Notícias</b> */}
						</nav>
						<nav>
							<b>Github</b>
						</nav>
					</header>
					{children}
				</div>
			</body>
		</html>
	);
}
