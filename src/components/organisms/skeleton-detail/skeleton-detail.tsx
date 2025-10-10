import styles from './skeleton-detail.module.css';

export function SkeletonDetail() {
	return (
		<div className={styles.container}>
			{/* Hero Section Skeleton */}
			<div className={styles.hero}>
				<div className={styles.heroImage} />
				<div className={styles.heroContent}>
					<div className={`${styles.skeleton} ${styles.badge}`} />
					<div className={`${styles.skeleton} ${styles.title}`} />
					<div className={`${styles.skeleton} ${styles.subtitle}`} />
					<div className={styles.heroDetails}>
						<div className={`${styles.skeleton} ${styles.detail}`} />
						<div className={`${styles.skeleton} ${styles.detail}`} />
					</div>
				</div>
			</div>

			{/* Mission Details Skeleton */}
			<div className={styles.section}>
				<div className={`${styles.skeleton} ${styles.sectionTitle}`} />
				<div className={styles.sectionContent}>
					<div className={`${styles.skeleton} ${styles.text}`} />
					<div className={`${styles.skeleton} ${styles.text}`} />
					<div className={`${styles.skeleton} ${styles.textShort}`} />
				</div>
			</div>

			{/* Two Column Grid Skeleton */}
			<div className={styles.detailsGrid}>
				{/* Launch Provider Skeleton */}
				<div className={styles.card}>
					<div className={`${styles.skeleton} ${styles.cardTitle}`} />
					<div className={styles.cardContent}>
						<div className={`${styles.skeleton} ${styles.text}`} />
						<div className={`${styles.skeleton} ${styles.text}`} />
						<div className={`${styles.skeleton} ${styles.textShort}`} />
					</div>
				</div>

				{/* Rocket Info Skeleton */}
				<div className={styles.card}>
					<div className={`${styles.skeleton} ${styles.cardTitle}`} />
					<div className={styles.cardContent}>
						<div className={`${styles.skeleton} ${styles.text}`} />
						<div className={`${styles.skeleton} ${styles.text}`} />
						<div className={`${styles.skeleton} ${styles.textShort}`} />
					</div>
				</div>
			</div>

			{/* Launch Window Skeleton */}
			<div className={styles.section}>
				<div className={`${styles.skeleton} ${styles.sectionTitle}`} />
				<div className={styles.sectionContent}>
					<div className={`${styles.skeleton} ${styles.text}`} />
					<div className={`${styles.skeleton} ${styles.textShort}`} />
				</div>
			</div>

			{/* Launch Pad Skeleton */}
			<div className={styles.section}>
				<div className={`${styles.skeleton} ${styles.sectionTitle}`} />
				<div className={styles.sectionContent}>
					<div className={`${styles.skeleton} ${styles.text}`} />
					<div className={`${styles.skeleton} ${styles.text}`} />
					<div className={`${styles.skeleton} ${styles.textShort}`} />
				</div>
			</div>
		</div>
	);
}
