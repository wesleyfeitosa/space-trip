'use client';

import { useRouter } from 'next/navigation';

import { Logo } from '../../atoms/logo/logo';
import styles from './header.module.css';

export function Header() {
	const router = useRouter();

	return (
		<header className={styles.header}>
			<nav
				className={styles.nav}
				onClick={() => {
					router.push('/');
				}}
			>
				<Logo />
			</nav>
			<div className={styles.navigationOptions}>
				<nav className={styles.nav}>
					<b>Notícias</b>
				</nav>
				<nav className={styles.nav}>
					<b>Sobre</b>
				</nav>
			</div>
		</header>
	);
}
