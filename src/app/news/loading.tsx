import { Spinner } from '@/components/atoms/spinner/spinner';

import styles from './loading.module.css';

export default function Loading() {
	return (
		<div className={styles.container}>
			<Spinner />
			<p className={styles.text}>Loading news...</p>
		</div>
	);
}
