'use client';

import { useState, useRef, useEffect } from 'react';

import { useLanguage } from '@/contexts/language-context';

import styles from './language-selector.module.css';

const languages = [
	{ code: 'en', name: 'English', flag: '🇺🇸', shortCode: 'EN' },
	{ code: 'pt', name: 'Português', flag: '🇧🇷', shortCode: 'PT' },
];

export function LanguageSelector() {
	const { language, setLanguage } = useLanguage();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const currentLanguage = languages.find((lang) => lang.code === language);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleLanguageChange = (code: string) => {
		setLanguage(code as 'en' | 'pt');
		setIsOpen(false);
	};

	return (
		<div className={styles.container} ref={dropdownRef}>
			<button
				type="button"
				className={styles.selector}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
				aria-label="Select language"
				aria-expanded={isOpen}
			>
				<span className={styles.flag}>{currentLanguage?.flag}</span>
				<span className={styles.languageName}>
					{currentLanguage?.name}{' '}
					<span className={styles.shortCode}>
						({currentLanguage?.shortCode})
					</span>
				</span>
				<span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
			</button>

			{isOpen && (
				<div className={styles.dropdown}>
					{languages.map((lang) => (
						<button
							key={lang.code}
							type="button"
							className={`${styles.option} ${
								language === lang.code ? styles.optionActive : ''
							}`}
							onClick={() => {
								handleLanguageChange(lang.code);
							}}
						>
							<span className={styles.flag}>{lang.flag}</span>
							<span className={styles.languageName}>
								{lang.name}{' '}
								<span className={styles.shortCode}>({lang.shortCode})</span>
							</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
