import styles from './tooltip.module.css';

interface TooltipProps {
	readonly description: string;
	readonly children?: React.ReactNode;
}

export function Tooltip({ description, children }: TooltipProps) {
	return (
		<div className={styles.tooltip}>
			{children}
			<div>
				<span className={styles.tooltipText}>{description}</span>
			</div>
		</div>
	);
}
