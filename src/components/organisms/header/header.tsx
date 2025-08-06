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
			<nav className={styles.centerHeader}>
				{/* <b>Mais dados</b>
				<b>Notícias</b> */}
			</nav>
			<nav className={styles.nav}>
				<b>Github</b>
			</nav>
		</header>
	);
}
