import styles from './skeleton-card.module.css';

export function SkeletonCard() {
	return (
		<li className={styles.skeletonCard}>
			<div className={styles.imageWrapper}>
				<div className={styles.skeletonImage} />
			</div>
			<div className={styles.content}>
				<div className={styles.header}>
					<div className={`${styles.skeleton} ${styles.badge}`} />
					<div className={`${styles.skeleton} ${styles.countdown}`} />
				</div>
				<div className={`${styles.skeleton} ${styles.title}`} />
				<div className={`${styles.skeleton} ${styles.subtitle}`} />
				<div className={styles.details}>
					<div className={`${styles.skeleton} ${styles.text}`} />
					<div className={`${styles.skeleton} ${styles.text}`} />
					<div className={`${styles.skeleton} ${styles.text}`} />
				</div>
			</div>
		</li>
	);
}
