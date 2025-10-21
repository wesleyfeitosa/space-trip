import styles from './footer.module.css';

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.content}>
				<p className={styles.copyright}>
					© {currentYear} Space Trip. Made by Wesley Feitosa.
				</p>
				<div className={styles.links}>
					<a
						href="https://ll.thespacedevs.com/docs"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.link}
						aria-label="The Space Devs API"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M12 2L2 7l10 5 10-5-10-5z" />
							<path d="M2 17l10 5 10-5" />
							<path d="M2 12l10 5 10-5" />
						</svg>
						<span style={{ marginLeft: '8px' }}>The Space Devs API</span>
					</a>
				</div>
			</div>
		</footer>
	);
}
