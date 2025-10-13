import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';

// Firebase configuration using environment variables
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase (singleton pattern)
let app: FirebaseApp;
let analytics: Analytics | undefined;

export function getFirebaseApp(): FirebaseApp {
	if (getApps().length > 0) {
		app = getApps()[0];
	} else {
		app = initializeApp(firebaseConfig);
	}

	return app;
}

// Analytics should only be initialized on the client side
export function getFirebaseAnalytics(): Analytics | undefined {
	if (typeof window !== 'undefined' && !analytics) {
		const app = getFirebaseApp();
		analytics = getAnalytics(app);
	}

	return analytics;
}

export { app, analytics };
