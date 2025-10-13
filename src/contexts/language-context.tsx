'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import { type Language, getLanguageFromCookies } from '@/utils/language';

// Re-export for convenience
export { getLanguageFromCookies };
export type { Language };

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguageState] = useState<Language>('en');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// Read from cookie on mount
		const savedLanguage = getCookie('language') as Language | undefined;
		if (savedLanguage) {
			setLanguageState(savedLanguage);
		}

		setMounted(true);
	}, []);

	const setLanguage = (lang: Language) => {
		setLanguageState(lang);
		setCookie('language', lang);
		// Trigger page reload to re-fetch data with new language
		window.location.reload();
	};

	// Don't render until mounted to avoid hydration mismatch
	if (!mounted) {
		return null;
	}

	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error('useLanguage must be used within a LanguageProvider');
	}

	return context;
}

// Cookie helper functions
function setCookie(name: string, value: string) {
	document.cookie = `${name}=${value}; path=/; max-age=31536000`; // 1 year
}

function getCookie(name: string): string | undefined {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return parts.pop()?.split(';').shift() ?? undefined;
	}

	return undefined;
}
