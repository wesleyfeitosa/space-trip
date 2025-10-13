# Proper Nouns Protection in Translation

## ✅ Fixed: Company Names Stay in English!

Company names, rocket names, and other proper nouns now remain in their original language during translation.

## How It Works

### Before

```
"SpaceX" → "EspaçoX" ❌
"Falcon 9" → "Falcão 9" ❌
"Kennedy Space Center" → "Centro Espacial Kennedy" ❌
```

### After (Fixed!)

```
"SpaceX" → "SpaceX" ✅
"Falcon 9" → "Falcon 9" ✅
"Kennedy Space Center" → "Kennedy Space Center" ✅
```

## Protected Proper Nouns

The translation service now protects these categories:

### 🏢 Companies & Agencies

- SpaceX, Blue Origin, Rocket Lab
- NASA, ESA, JAXA, ISRO, Roscosmos
- Amazon, Project Kuiper, Starlink
- Virgin Galactic, Virgin Orbit
- United Launch Alliance (ULA)
- Arianespace, Firefly, Astra, Relativity Space

### 🚀 Rockets & Spacecraft

- Falcon 9, Falcon Heavy, Starship
- Dragon, Crew Dragon, Cargo Dragon
- Atlas V, Delta IV, Vulcan
- Electron, Neutron
- New Glenn, New Shepard
- Ariane, Vega, Soyuz
- Long March, PSLV, GSLV
- H-IIA, H-IIB, H3
- Antares, Cygnus, Terran, Alpha

### 🏗️ Launch Sites

- Kennedy Space Center
- Cape Canaveral, Vandenberg
- Baikonur, Kourou
- Wallops, Mahia, Kodiak
- Tanegashima, Xichang, Jiuquan, Wenchang
- Satish Dhawan, Plesetsk

### 🔧 Engines & Components

- Rutherford, Merlin, Raptor
- BE-4, RS-25, RL10
- RD-180, RD-191

## Technical Implementation

### 1. Protection Phase

Before translation, proper nouns are replaced with placeholders:

```
"SpaceX launched Falcon 9"
    ↓
"__PROPERNOUN0__ launched __PROPERNOUN1__"
```

### 2. Translation Phase

The protected text is translated normally:

```
"__PROPERNOUN0__ launched __PROPERNOUN1__"
    ↓
"__PROPERNOUN0__ lançou __PROPERNOUN1__"
```

### 3. Restoration Phase

Placeholders are replaced with original names:

```
"__PROPERNOUN0__ lançou __PROPERNOUN1__"
    ↓
"SpaceX lançou Falcon 9" ✅
```

## Examples

### Full Sentences

**Input:**

```
"SpaceX's Falcon 9 rocket will launch from Kennedy Space Center"
```

**Output:**

```
"O foguete Falcon 9 da SpaceX será lançado do Kennedy Space Center"
```

✅ SpaceX stays SpaceX  
✅ Falcon 9 stays Falcon 9  
✅ Kennedy Space Center stays Kennedy Space Center  
✅ Rest is translated to Portuguese

### Mission Descriptions

**Input:**

```
"Rocket Lab's Electron will deploy satellites for Project Kuiper"
```

**Output:**

```
"O Electron da Rocket Lab implantará satélites para o Project Kuiper"
```

✅ Rocket Lab stays Rocket Lab  
✅ Electron stays Electron  
✅ Project Kuiper stays Project Kuiper

## Adding New Proper Nouns

Need to protect a new name? Add it to the list:

```typescript
// src/services/translation-service.ts
const PROPER_NOUNS = new Set([
	// Companies / Agencies
	'SpaceX',
	'Your New Company', // Add here!

	// Rockets
	'Falcon 9',
	'Your New Rocket', // Add here!

	// etc...
]);
```

## Features

✅ **Case Insensitive**: Works with "SpaceX", "SPACEX", "spacex"  
✅ **Word Boundaries**: Won't match partial words  
✅ **Longest First**: Handles overlapping names correctly  
✅ **Preserved Casing**: Maintains original capitalization  
✅ **Automatic**: No configuration needed

## Testing

The protection works automatically. Just check your app and you'll see:

- Company names in English
- Rocket names in English
- Location names in English
- Everything else translated to Portuguese

## Performance

- **Minimal overhead**: Regex matching is fast
- **Cached results**: Translated strings are cached
- **Smart matching**: Only searches for names in the text

## Limitations

### Currently Protected

✅ Major space companies  
✅ Popular rockets  
✅ Main launch sites  
✅ Common engines

### Add as Needed

If you see a name being translated that shouldn't be, just add it to the `PROPER_NOUNS` set in the translation service!

## Quick Reference

| Category  | Examples                     | Status       |
| --------- | ---------------------------- | ------------ |
| Companies | SpaceX, Blue Origin, NASA    | ✅ Protected |
| Rockets   | Falcon 9, Starship, Electron | ✅ Protected |
| Locations | Kennedy, Cape Canaveral      | ✅ Protected |
| Engines   | Merlin, Raptor, BE-4         | ✅ Protected |
| Projects  | Kuiper, Starlink             | ✅ Protected |

---

## 🎉 Result

Your translation now intelligently preserves proper nouns while translating everything else to Portuguese!

**No more "EspaçoX"!** 🚀
