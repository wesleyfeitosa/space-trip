# Translation Implementation Guide

## Overview

This application now uses automatic translation to convert all API data from English to Portuguese using the `google-translate-api-x` library.

## How It Works

### 1. Translation Service

The translation service (`src/services/translation-service.ts`) automatically:

- Translates all string values in the API responses from English to Portuguese
- Excludes technical fields (IDs, URLs, dates, numbers, etc.) from translation
- Caches translated strings to improve performance and reduce API calls
- Handles errors gracefully with retry logic
- Falls back to original data if translation fails

### 2. Excluded Fields

The following types of fields are NOT translated to preserve technical accuracy:

- IDs and URLs
- Dates and timestamps
- Coordinates and numerical values
- Image URLs and media links
- Technical abbreviations
- Configuration values
- Launch statistics

### 3. Integration

The translation is automatically applied in:

- Home page (`src/app/(home)/page.tsx`) - Translates the list of upcoming launches
- Launch details page (`src/app/launch/details/[id]/page.tsx`) - Translates detailed launch information

## Configuration

### Enable/Disable Translation

You can control translation using environment variables:

**.env.local:**

```bash
# Enable translation (default)
NEXT_PUBLIC_ENABLE_TRANSLATION=true

# Disable translation (useful for development or if experiencing SSL issues)
NEXT_PUBLIC_ENABLE_TRANSLATION=false
```

### SSL Certificate Issues

If you're behind a corporate proxy or experiencing SSL certificate errors, you have two options:

1. **Disable translation temporarily:**

   ```bash
   NEXT_PUBLIC_ENABLE_TRANSLATION=false
   ```

2. **Configure Node.js to ignore SSL errors (NOT recommended for production):**
   ```bash
   NODE_TLS_REJECT_UNAUTHORIZED=0 npm run dev
   ```

## Performance Considerations

### Caching

The translation service includes a built-in cache that:

- Stores previously translated strings in memory
- Prevents redundant API calls
- Significantly improves performance for repeated content

### Cache Statistics

You can check cache statistics:

```typescript
import { getTranslationStats } from '@/services/translation-service';

const stats = getTranslationStats();
console.log(`Cache size: ${stats.cacheSize} entries`);
console.log(`Translation enabled: ${stats.enabled}`);
```

### Clear Cache

If needed, you can clear the translation cache:

```typescript
import { clearTranslationCache } from '@/services/translation-service';

clearTranslationCache();
```

## Usage Examples

### Basic Usage

```typescript
import { translateApiData } from '@/services/translation-service';

// Fetch data from API
const response = await fetch('https://api.example.com/data');
const data = await response.json();

// Translate the entire response
const translatedData = await translateApiData(data);
```

### In Server Components

```typescript
async function fetchLaunches() {
	const response = await fetch(`${serverUrl}/launches/upcoming?limit=10`);
	const launchesData = await response.json();

	// Translate the data
	const translatedData = await translateApiData(launchesData);

	return translatedData.results;
}
```

## Migration from Pattern-Based Translation

### Old Approach (utils/translations.ts)

The old system used pattern matching and manual translations:

- Required maintaining large translation dictionaries
- Couldn't handle dynamic content well
- Needed constant updates for new content

### New Approach (services/translation-service.ts)

The new system:

- Automatically translates any new content
- No manual dictionary maintenance required
- More accurate with context-aware translation
- Handles complex sentences better

### Keeping Both Systems

You can keep the old translation utilities for:

- UI labels and static content
- Technical terms requiring specific translations
- Fallback when automatic translation is disabled

## Troubleshooting

### Translation Not Working

1. Check if translation is enabled:

   ```bash
   echo $NEXT_PUBLIC_ENABLE_TRANSLATION
   ```

2. Check for SSL errors in console

3. Verify network connectivity

4. Check if the translation service is imported correctly

### Slow Performance

1. Translation happens on first request (cache miss)
2. Subsequent requests use cached translations
3. Consider pre-translating common content
4. Monitor cache size with `getTranslationStats()`

### Incorrect Translations

For fields that require specific translations:

1. Add the field name to `EXCLUDE_FIELDS` in `translation-service.ts`
2. Use manual translations from `utils/translations.ts`
3. Create custom translation rules if needed

## Future Improvements

Potential enhancements:

- Support for multiple languages (Spanish, French, etc.)
- Integration with professional translation APIs (DeepL, Azure Translator)
- Pre-translation and storage of static content
- Translation quality feedback system
- A/B testing for translation accuracy

## Dependencies

- **google-translate-api-x**: Free Google Translate API wrapper
  - No API key required
  - Usage limits apply
  - Consider upgrading to paid API for production use

## Best Practices

1. **Always handle errors gracefully** - Return original data if translation fails
2. **Cache aggressively** - Reduce API calls and improve performance
3. **Exclude technical fields** - Maintain data integrity
4. **Monitor performance** - Track cache hits and translation times
5. **Test thoroughly** - Verify translations in different contexts

## Support

For issues or questions:

1. Check the console for error messages
2. Verify environment configuration
3. Test with translation disabled
4. Review the translation service logs
