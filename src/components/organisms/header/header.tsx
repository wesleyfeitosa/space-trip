'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useLanguage } from '@/contexts/language-context';

import { Logo } from '../../atoms/logo/logo';
import { LanguageSelector } from '../../atoms/language-selector/language-selector';
import styles from './header.module.css';

export function Header() {
	const router = useRouter();
	const { language } = useLanguage();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const labels = {
		home: language === 'pt' ? 'Início' : 'Home',
		news: language === 'pt' ? 'Notícias' : 'News',
		dashboard: language === 'pt' ? 'Starship' : 'Starship',
		about: language === 'pt' ? 'Sobre' : 'About',
	};

	const handleNavigation = (path: string) => {
		router.push(path);
		setIsMenuOpen(false);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<nav
					className={styles.logo}
					onClick={() => {
						router.push('/');
					}}
				>
					<Logo />
				</nav>

				{/* Desktop Navigation */}
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
							router.push('/dashboard/starship');
						}}
					>
						<b className={styles.navLink}>{labels.dashboard}</b>
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

				<div className={styles.rightSection}>
					<LanguageSelector />

					{/* Hamburger Menu Button */}
					<button
						className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
						onClick={toggleMenu}
						aria-label="Toggle menu"
						aria-expanded={isMenuOpen}
					>
						<span className={styles.hamburgerLine}></span>
						<span className={styles.hamburgerLine}></span>
						<span className={styles.hamburgerLine}></span>
					</button>
				</div>
			</div>

			{/* Mobile Navigation Menu */}
			<nav
				className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}
			>
				<div
					className={styles.mobileNavItem}
					onClick={() => {
						handleNavigation('/');
					}}
				>
					<b className={styles.mobileNavLink}>{labels.home}</b>
				</div>
				<div
					className={styles.mobileNavItem}
					onClick={() => {
						handleNavigation('/news');
					}}
				>
					<b className={styles.mobileNavLink}>{labels.news}</b>
				</div>
				<div
					className={styles.mobileNavItem}
					onClick={() => {
						handleNavigation('/dashboard/starship');
					}}
				>
					<b className={styles.mobileNavLink}>{labels.dashboard}</b>
				</div>
				<div
					className={styles.mobileNavItem}
					onClick={() => {
						handleNavigation('/about');
					}}
				>
					<b className={styles.mobileNavLink}>{labels.about}</b>
				</div>
			</nav>

			{/* Overlay for mobile menu */}
			{isMenuOpen && (
				<div
					className={styles.overlay}
					onClick={() => {
						setIsMenuOpen(false);
					}}
				/>
			)}
		</header>
	);
}
