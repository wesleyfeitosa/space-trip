import styles from './page.module.css';

export default function Loading() {
	return (
		<main className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>🚀 Starship Dashboard</h1>
				<p className={styles.subtitle}>Loading dashboard data...</p>
			</div>

			<div className={styles.grid}>
				{[1, 2, 3, 4].map((i) => (
					<section key={i} className={styles.section}>
						<div
							style={{
								height: '2rem',
								width: '200px',
								background: 'rgba(255, 255, 255, 0.1)',
								borderRadius: '8px',
								marginBottom: '1.5rem',
								animation: 'pulse 1.5s ease-in-out infinite',
							}}
						/>
						<div
							style={{
								height: '150px',
								background: 'rgba(255, 255, 255, 0.05)',
								borderRadius: '12px',
								animation: 'pulse 1.5s ease-in-out infinite',
							}}
						/>
					</section>
				))}
			</div>

			<style>{`
				@keyframes pulse {
					0%,
					100% {
						opacity: 1;
					}
					50% {
						opacity: 0.5;
					}
				}
			`}</style>
		</main>
	);
}

