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
		home: language === 'pt' ? 'Início' : 'Home',
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
				<nav
					className={styles.nav}
					onClick={() => {
						router.push('/');
					}}
				>
					<b className={styles.navLink}>{labels.home}</b>
				</nav>
				<nav
					className={styles.nav}
					onClick={() => {
						router.push('/news');
					}}
				>
					<b className={styles.navLink}>{labels.news}</b>
				</nav>
				<nav
					className={styles.nav}
					onClick={() => {
						router.push('/about');
					}}
				>
					<b className={styles.navLink}>{labels.about}</b>
				</nav>
			</div>

			<LanguageSelector />
		</header>
	);
}
