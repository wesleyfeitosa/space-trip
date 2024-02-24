'use client';

import styles from './button.module.css';

type ButtonProps = {
	readonly title: string;
	readonly onClick: () => void;
};

export function Button({ title, onClick }: ButtonProps) {
	return (
		<button onClick={onClick} className={styles.button}>
			{title}
		</button>
	);
}
