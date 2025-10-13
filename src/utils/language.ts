export type Language = 'en' | 'pt';

/**
 * Helper function to get language from cookies (for server-side use)
 * This function is server-safe and can be used in Server Components
 */
export function getLanguageFromCookies(cookieString?: string): Language {
	if (!cookieString) {
		return 'en';
	}

	const cookies = cookieString
		.split(';')
		.reduce<Record<string, string>>((acc, cookie) => {
			const [key, value] = cookie.trim().split('=');
			acc[key] = value;
			return acc;
		}, {});

	return (cookies.language as Language) || 'en';
}
