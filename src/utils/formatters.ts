/**
 * Formats a date string according to the specified locale
 * @param dateString - ISO date string
 * @param locale - Locale code (e.g., 'en-US', 'pt-BR')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale = 'en-US'): string {
	return new Date(dateString).toLocaleDateString(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short',
	});
}

/**
 * Formats a number as USD currency
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
	}).format(amount);
}
