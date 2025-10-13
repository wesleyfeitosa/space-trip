'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { logEvent } from 'firebase/analytics';

import { getFirebaseAnalytics } from '@/lib/firebase/config';

export function FirebaseAnalytics() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const analytics = getFirebaseAnalytics();

		if (analytics) {
			// Log page view
			logEvent(analytics, 'page_view', {
				page_path: pathname,
				page_search: searchParams?.toString(),
				page_title: document.title,
			});
		}
	}, [pathname, searchParams]);

	return null;
}
