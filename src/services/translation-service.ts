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
function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Translates a single text string with retry logic
 */
async function translateString(
	text: string,
	retries = 0,
): Promise<string> {
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
		const result = await translate(text, { from: FROM_LANG, to: TO_LANG });
		const translatedText = result.text;

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
async function translateObject(obj: any, depth = 0): Promise<any> {
	// Prevent infinite recursion
	if (depth > 10) {
		return obj;
	}

	if (obj === null || obj === undefined) {
		return obj;
	}

	// Handle arrays
	if (Array.isArray(obj)) {
		return Promise.all(obj.map((item) => translateObject(item, depth + 1)));
	}

	// Handle objects
	if (typeof obj === 'object') {
		const translated: any = {};

		for (const [key, value] of Object.entries(obj)) {
			// Check if this field should be excluded
			if (shouldExcludeField(key)) {
				translated[key] = value;
				continue;
			}

			// Translate string values
			if (typeof value === 'string') {
				translated[key] = await translateString(value);
			} else if (typeof value === 'object' && value !== null) {
				// Recursively translate nested objects/arrays
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
		const translated = await translateObject(data);

		return translated as T;
	} catch (error) {
		console.error('Translation error:', error);
		// Return original data if translation fails
		return data;
	}
}

/**
 * Clears the translation cache
 */
export function clearTranslationCache(): void {
	translationCache.clear();
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
