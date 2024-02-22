import styles from './page.module.css';

export default function Home() {
	return (
		<main className={styles.main}>
			<h1>Home</h1>
			<ul>
				<li>
					<a href="/about">About</a>
				</li>
				<li>
					<a href="/contact">Contact</a>
				</li>
			</ul>
		</main>
	);
}
