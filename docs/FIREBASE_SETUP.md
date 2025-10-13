# Firebase Setup Guide

This guide explains how to configure Firebase in your Space Trip application.

## 📋 What's Been Set Up

The Firebase configuration has been properly structured with:

1. ✅ **Configuration file** (`/src/lib/firebase/config.ts`) - Singleton pattern with environment variables
2. ✅ **Analytics component** (`/src/components/analytics/firebase-analytics.tsx`) - Client-side only
3. ✅ **Integrated into layout** - Automatically tracks page views
4. ✅ **Environment variables** - Secure credential management

## 🔧 Setup Instructions

### Step 1: Create Environment File

Create a file named `.env.local` in the **root** of your project (same level as `package.json`):

```bash
# From project root
touch .env.local
```

### Step 2: Add Your Firebase Credentials

Add the following content to `.env.local`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

**Important Notes:**

- ✅ `.env.local` is already in `.gitignore` - it will NOT be committed
- ✅ `NEXT_PUBLIC_` prefix makes these available in the browser
- ⚠️ Never commit real API keys to git
- ⚠️ For production, set these as environment variables in Vercel/hosting

### Step 3: Restart Development Server

After creating `.env.local`, restart your dev server:

```bash
npm run dev
```

## 🎯 What Firebase Analytics Tracks

The setup automatically tracks:

- ✅ **Page Views** - Every page navigation
- ✅ **Page Path** - URL pathname
- ✅ **Page Title** - Document title
- ✅ **Search Parameters** - Query strings

### Example Events Logged:

```javascript
{
  page_view: {
    page_path: "/launch/details/123",
    page_search: "?utm_source=google",
    page_title: "SpaceX Falcon 9 | Space Trip"
  }
}
```

## 📊 Viewing Analytics Data

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `space-trip-32753`
3. Click on **Analytics** in the left sidebar
4. View real-time data and reports

## 🔒 Security Best Practices

### ✅ What's Already Secured:

1. **Environment Variables**: Credentials are in `.env.local` (not committed)
2. **Singleton Pattern**: Firebase app initializes only once
3. **Client-Side Only**: Analytics only runs in browser (not on server)
4. **Type Safety**: Full TypeScript types for Firebase

### 🛡️ Additional Security for Production:

1. **Set up Firebase Security Rules** (if using Firestore/Storage):

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read: if true;  // Adjust based on your needs
         allow write: if false; // Public write disabled
       }
     }
   }
   ```

2. **Configure App Check** (recommended):

   - Go to Firebase Console → App Check
   - Enable reCAPTCHA v3 for web
   - Protects against abuse and unauthorized access

3. **Set up API Key Restrictions**:
   - Go to Google Cloud Console
   - Find your API key
   - Add HTTP referrer restrictions (your domain only)

## 🚀 Advanced Usage

### Custom Event Tracking

Create a utility file for custom events:

```typescript
// src/lib/firebase/analytics.ts
import { logEvent } from 'firebase/analytics';
import { getFirebaseAnalytics } from './config';

export function trackLaunchView(launchId: string, launchName: string) {
	const analytics = getFirebaseAnalytics();
	if (analytics) {
		logEvent(analytics, 'launch_view', {
			launch_id: launchId,
			launch_name: launchName,
		});
	}
}

export function trackShareClick(contentType: string) {
	const analytics = getFirebaseAnalytics();
	if (analytics) {
		logEvent(analytics, 'share', {
			content_type: contentType,
		});
	}
}
```

### Use in Components:

```typescript
'use client';

import { trackLaunchView } from '@/lib/firebase/analytics';

export function LaunchDetails({ launch }) {
  useEffect(() => {
    trackLaunchView(launch.id, launch.name);
  }, [launch]);

  return <div>...</div>;
}
```

## 📦 File Structure

```
src/
├── lib/
│   └── firebase/
│       ├── config.ts          # Firebase initialization
│       └── analytics.ts        # (Optional) Custom analytics helpers
├── components/
│   └── analytics/
│       └── firebase-analytics.tsx  # Auto page view tracking
└── app/
    └── layout.tsx              # Firebase integrated here
```

## 🔍 Troubleshooting

### Analytics Not Working?

1. **Check Console**: Open browser DevTools → Console
2. **Verify Environment Variables**:

   ```bash
   npm run dev
   ```

   Check if env vars are loaded (they should appear in Network tab)

3. **Wait for Data**: Analytics can take 24-48 hours to show in Firebase Console

4. **Debug Mode**: Add this to see events in real-time:

   ```typescript
   // In firebase-analytics.tsx, add:
   import { setAnalyticsCollectionEnabled } from 'firebase/analytics';

   useEffect(() => {
   	const analytics = getFirebaseAnalytics();
   	if (analytics) {
   		setAnalyticsCollectionEnabled(analytics, true);
   	}
   }, []);
   ```

### "Firebase App Not Initialized" Error?

- Ensure `.env.local` exists and has all variables
- Restart dev server after creating `.env.local`
- Check for typos in environment variable names

### Types Error?

If you get TypeScript errors:

```bash
npm install --save-dev @types/node
```

## 🌍 Environment-Specific Configuration

### Development

Uses `.env.local` - never committed to git

### Production (Vercel)

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add each `NEXT_PUBLIC_FIREBASE_*` variable
5. Redeploy

### Production (Other Hosts)

Set environment variables in your hosting platform's dashboard.

## 📚 Additional Firebase Services

Your Firebase project supports these services (configure as needed):

- **Authentication** (`firebase/auth`)
- **Firestore** (`firebase/firestore`)
- **Storage** (`firebase/storage`)
- **Cloud Functions** (`firebase/functions`)
- **Hosting** (alternative to Vercel)

## 🎓 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js + Firebase Guide](https://firebase.google.com/docs/web/setup#next.js)
- [Firebase Analytics Events](https://firebase.google.com/docs/analytics/events)
- [Google Analytics 4 Property](https://analytics.google.com/)

## ✅ Checklist

- [ ] Created `.env.local` file
- [ ] Added Firebase credentials to `.env.local`
- [ ] Restarted development server
- [ ] Verified analytics in browser console
- [ ] Checked Firebase Console for data (wait 24-48h)
- [ ] Set up production environment variables (when deploying)
- [ ] (Optional) Configure App Check
- [ ] (Optional) Set up API restrictions
- [ ] (Optional) Add custom event tracking

---

**Last Updated**: $(date)
**Firebase Project**: space-trip-32753
**Maintained By**: Space Trip Development Team
