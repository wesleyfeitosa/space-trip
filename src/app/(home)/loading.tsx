import { SkeletonCard } from '@/components/molecules/skeleton-card/skeleton-card';
import styles from './page.module.css';

export default function Loading() {
	return (
		<main className={styles.main}>
			<h2 className={styles.title}>Próximos lançamentos</h2>
			<ul>
				{Array.from({ length: 5 }).map((_, index) => (
					<SkeletonCard key={index} />
				))}
			</ul>
		</main>
	);
}
