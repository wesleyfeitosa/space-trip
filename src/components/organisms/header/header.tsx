'use client';

import { useRouter } from 'next/navigation';

import { useLanguage } from '@/contexts/language-context';

import { Logo } from '../../atoms/logo/logo';
import { LanguageSelector } from '../../atoms/language-selector/language-selector';
import styles from './header.module.css';

export function Header() {
	const router = useRouter();
	const { language } = useLanguage();

	const labels = {
		news: language === 'pt' ? 'Notícias' : 'News',
		about: language === 'pt' ? 'Sobre' : 'About',
	};

	return (
		<header className={styles.header}>
			<nav
				className={styles.logo}
				onClick={() => {
					router.push('/');
				}}
			>
				<Logo />
			</nav>
			<div className={styles.navigationOptions}>
				<nav className={styles.nav}>
					<b>{labels.news}</b>
				</nav>
				<nav className={styles.nav}>
					<b>{labels.about}</b>
				</nav>
			</div>

			<LanguageSelector />
		</header>
	);
}
