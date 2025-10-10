import styles from './spinner.module.css';

interface SpinnerProps {
	size?: 'small' | 'medium' | 'large';
	color?: 'primary' | 'secondary' | 'white';
}

export function Spinner({ size = 'medium', color = 'primary' }: SpinnerProps) {
	return (
		<div
			className={`${styles.spinner} ${styles[size]} ${styles[color]}`}
			role="status"
			aria-label="Carregando"
		>
			<span className={styles.srOnly}>Carregando...</span>
		</div>
	);
}

