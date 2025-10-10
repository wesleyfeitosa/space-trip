import translate from 'google-translate-api-x';

// Translation configuration
const FROM_LANG = 'en';
const TO_LANG = 'pt';
const ENABLE_TRANSLATION =
	process.env.NEXT_PUBLIC_ENABLE_TRANSLATION !== 'false';

// Cache for translated strings to improve performance and reduce API calls
const translationCache = new Map<string, string>();

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

// Proper nouns that should NOT be translated (company names, rockets, locations, etc.)
const PROPER_NOUNS = new Set([
	// Companies / Agencies
	'SpaceX',
	'Space Exploration Technologies',
	'Blue Origin',
	'NASA',
	'Rocket Lab',
	'United Launch Alliance',
	'ULA',
	'Arianespace',
	'Roscosmos',
	'ISRO',
	'JAXA',
	'ESA',
	'CNSA',
	'Virgin Galactic',
	'Virgin Orbit',
	'Relativity Space',
	'Firefly Aerospace',
	'Astra',
	'Amazon',
	'Project Kuiper',
	'Kuiper Systems',
	'Starlink',
	'OneWeb',
	// Rockets
	'Falcon',
	'Falcon 9',
	'Falcon Heavy',
	'Starship',
	'Dragon',
	'Crew Dragon',
	'Cargo Dragon',
	'Atlas',
	'Atlas V',
	'Delta',
	'Delta IV',
	'Vulcan',
	'Centaur',
	'Electron',
	'Neutron',
	'New Glenn',
	'New Shepard',
	'Ariane',
	'Vega',
	'Soyuz',
	'Proton',
	'Long March',
	'PSLV',
	'GSLV',
	'H-IIA',
	'H-IIB',
	'H3',
	'Antares',
	'Cygnus',
	'Terran',
	'Alpha',
	'LauncherOne',
	// Launch Sites & Locations
	'Kennedy Space Center',
	'Cape Canaveral',
	'Cape Canaveral Space Force Station',
	'Vandenberg',
	'Vandenberg Space Force Base',
	'Baikonur',
	'Kourou',
	'Wallops',
	'Mahia',
	'Mahia Peninsula',
	'Kodiak',
	'Tanegashima',
	'Xichang',
	'Jiuquan',
	'Wenchang',
	'Satish Dhawan',
	'Plesetsk',
	'Boca Chica',
	'Hawthorne',
	'California',
	'Texas',
	'Florida',
	'New Zealand',
	'SLC-40',
	'SLC-4E',
	'LC-39A',
	'East Coast',
	'West Coast',
	'Mars',
	'Earth',
	// Engines
	'Rutherford',
	'Merlin',
	'Raptor',
	'Kestrel',
	'BE-4',
	'RS-25',
	'RL10',
	'RD-180',
	'RD-191',
	// People
	'Elon Musk',
	'Jeff Bezos',
	'Peter Beck',
	'Tory Bruno',
	// Other
	'Space Exploration Technologies Corp.',
	'Space Exploration Technologies',
]);

// Fields that should NOT be translated (technical values, IDs, URLs, etc.)
const EXCLUDE_FIELDS = new Set([
	'id',
	'url',
	'slug',
	'image_url',
	'thumbnail_url',
	'map_url',
	'info_url',
	'wiki_url',
	'video_url',
	'feature_image',
	'social_media_links',
	'alpha_2_code',
	'alpha_3_code',
	'launch_designator',
	'net',
	'window_start',
	'window_end',
	'last_updated',
	'created_on',
	'start_time',
	'end_time',
	'latitude',
	'longitude',
	'diameter',
	'length',
	'mass',
	'gravity',
	'altitude',
	'image',
	'thumbnail',
	'logo',
	'social_logo',
	'infographic',
	'license',
	'variants',
	'credit',
	'response_mode',
	'abbrev', // Keep abbreviations in original language
	'link',
	'hashtag',
	'flightclub_url',
	'failreason',
	'probability',
	'weather_concerns',
	'maiden_flight',
	'founding_year',
	'administrator',
	'launchers',
	'spacecraft',
	'parent',
	'launch_cost',
	'launch_mass',
	'leo_capacity',
	'gto_capacity',
	'geo_capacity',
	'sso_capacity',
	'to_thrust',
	'apogee',
	'total_launch_count',
	'consecutive_successful_launches',
	'successful_launches',
	'failed_launches',
	'pending_launches',
	'consecutive_successful_landings',
	'successful_landings',
	'failed_landings',
	'attempted_landings',
	'successful_landings_spacecraft',
	'failed_landings_spacecraft',
	'attempted_landings_spacecraft',
	'successful_landings_payload',
	'failed_landings_payload',
	'attempted_landings_payload',
	'total_landing_count',
	'orbital_launch_attempt_count',
	'location_launch_attempt_count',
	'pad_launch_attempt_count',
	'agency_launch_attempt_count',
	'orbital_launch_attempt_count_year',
	'location_launch_attempt_count_year',
	'pad_launch_attempt_count_year',
	'agency_launch_attempt_count_year',
	'pad_turnaround',
	'fastest_turnaround',
	'relative_time',
	'live',
	'priority',
	'single_use',
	'active',
	'featured',
	'is_placeholder',
	'reusable',
	'webcast_live',
	'atmosphere',
	'length_of_day',
	'timezone_name',
	'map_image',
	'min_stage',
	'max_stage',
	'alias',
	'families',
	'full_name',
	'variant',
	'code',
	'profile_image',
	'created_by',
	'comment',
	'info_urls',
	'vid_urls',
	'count',
	'launcher_stage',
	'spacecraft_stage',
	'payloads',
	'program',
	'agencies',
	'updates',
	'timeline',
	'mission_patches',
]);

/**
 * Checks if a field should be excluded from translation
 */
function shouldExcludeField(key: string): boolean {
	// Exclude specific fields
	if (EXCLUDE_FIELDS.has(key)) {
		return true;
	}

	// Exclude fields ending with _url, _id, or _code
	if (key.endsWith('_url') || key.endsWith('_id') || key.endsWith('_code')) {
		return true;
	}

	return false;
}

/**
 * Delay helper for retries
 */
async function delay(ms: number): Promise<void> {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

/**
 * Protects proper nouns in text by replacing them with placeholders
 * Returns the protected text and a map of placeholders to original values
 */
function protectProperNouns(text: string): {
	protected: string;
	replacements: Map<string, string>;
} {
	let protectedText = text;
	const replacements = new Map<string, string>();
	let placeholderIndex = 0;

	// Sort by length (longest first) to avoid partial replacements
	const sortedNouns = Array.from(PROPER_NOUNS).sort(
		(a, b) => b.length - a.length,
	);

	for (const noun of sortedNouns) {
		// Case-insensitive search for the proper noun with word boundaries
		const regex = new RegExp(`\\b${escapeRegex(noun)}\\b`, 'gi');

		// Find all matches first
		let match;
		const matches: Array<{ text: string; index: number }> = [];

		// Reset regex to find all matches
		const globalRegex = new RegExp(`\\b${escapeRegex(noun)}\\b`, 'gi');
		while ((match = globalRegex.exec(protectedText)) !== null) {
			matches.push({ text: match[0], index: match.index });
		}

		// Replace matches from end to start to preserve indices
		for (let i = matches.length - 1; i >= 0; i--) {
			const matched = matches[i];
			const placeholder = `PROPERNOUM${placeholderIndex}`;
			replacements.set(placeholder, matched.text);

			protectedText =
				protectedText.substring(0, matched.index) +
				placeholder +
				protectedText.substring(matched.index + matched.text.length);

			placeholderIndex++;
		}
	}

	return { protected: protectedText, replacements };
}

/**
 * Restores proper nouns from placeholders
 */
function restoreProperNouns(
	text: string,
	replacements: Map<string, string>,
): string {
	let restoredText = text;

	for (const [placeholder, original] of replacements.entries()) {
		restoredText = restoredText.replace(placeholder, original);
	}

	return restoredText;
}

/**
 * Escapes special regex characters
 */
function escapeRegex(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Translates a single text string with retry logic
 */
async function translateString(text: string, retries = 0): Promise<string> {
	// Return original text if translation is disabled
	if (!ENABLE_TRANSLATION) {
		return text;
	}

	// Check cache first
	if (translationCache.has(text)) {
		return translationCache.get(text)!;
	}

	// Don't translate empty strings or very short strings (likely codes/abbreviations)
	if (!text || text.length < 2) {
		return text;
	}

	// Don't translate if it's just numbers or special characters
	if (/^[\d\s\-_./:]+$/.test(text)) {
		return text;
	}

	try {
		// Protect proper nouns before translation
		const { protected: protectedText, replacements } = protectProperNouns(text);

		// If the entire text is a proper noun, don't translate
		if (protectedText.trim().startsWith('PROPERNOUM')) {
			return text;
		}

		// If after protection there's nothing left to translate, return original
		if (!protectedText.replace(/PROPERNOUM\d+/g, '').trim()) {
			return text;
		}

		// Translate the protected text
		const result = await translate(protectedText, {
			from: FROM_LANG,
			to: TO_LANG,
		});
		let translatedText = result.text;

		// Restore proper nouns in the translated text
		translatedText = restoreProperNouns(translatedText, replacements);

		// Cache the result
		translationCache.set(text, translatedText);

		return translatedText;
	} catch (error) {
		// Retry logic
		if (retries < MAX_RETRIES) {
			console.warn(
				`Translation retry ${retries + 1}/${MAX_RETRIES} for "${text}"`,
			);
			await delay(RETRY_DELAY);
			return translateString(text, retries + 1);
		}

		// If all retries failed, log error and return original text
		console.error(`Translation failed for "${text}":`, error);
		return text;
	}
}

/**
 * Recursively translates an object's string values
 */
async function translateObject(obj: unknown, depth = 0): Promise<unknown> {
	// Prevent infinite recursion
	if (depth > 10) {
		return obj;
	}

	if (obj === null || obj === undefined) {
		return obj;
	}

	// Handle arrays
	if (Array.isArray(obj)) {
		const translatedArray = await Promise.all(
			obj.map(async (item: unknown) => translateObject(item, depth + 1)),
		);
		return translatedArray;
	}

	// Handle objects
	if (typeof obj === 'object') {
		const translated: Record<string, unknown> = {};
		const entries = Object.entries(obj);

		// Translate all entries sequentially to avoid too many parallel requests
		for (const [key, value] of entries) {
			// Check if this field should be excluded
			if (shouldExcludeField(key)) {
				translated[key] = value;
				continue;
			}

			// Translate string values
			if (typeof value === 'string') {
				// eslint-disable-next-line no-await-in-loop
				translated[key] = await translateString(value);
			} else if (typeof value === 'object' && value !== null) {
				// Recursively translate nested objects/arrays
				// eslint-disable-next-line no-await-in-loop
				translated[key] = await translateObject(value, depth + 1);
			} else {
				// Keep other types as is (numbers, booleans, etc.)
				translated[key] = value;
			}
		}

		return translated;
	}

	// Return primitive values as is
	return obj;
}

/**
 * Translates API data from English to Portuguese
 * @param data The JSON data to translate
 * @returns Translated JSON data
 */
export async function translateApiData<T>(data: T): Promise<T> {
	try {
		// Check if data is null or undefined
		if (!data) {
			return data;
		}

		// If translation is disabled, return original data
		if (!ENABLE_TRANSLATION) {
			console.log('Translation is disabled, returning original data');
			return data;
		}

		// Translate the data
		const translated = (await translateObject(data)) as T;

		return translated;
	} catch (error) {
		console.error('Translation error:', error);
		// Return original data if translation fails
		return data;
	}
}

/**
 * Clears the translation cache
 * Useful when proper nouns list is updated or when testing
 */
export function clearTranslationCache(): void {
	translationCache.clear();
	console.log('Translation cache cleared');
}

/**
 * Get translation statistics
 */
export function getTranslationStats() {
	return {
		cacheSize: translationCache.size,
		enabled: ENABLE_TRANSLATION,
	};
}
