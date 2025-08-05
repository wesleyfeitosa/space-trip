'use client';

import { useEffect, useState } from 'react';

import styles from './countdown.module.css';

interface CountdownProps {
	readonly net: string;
}

export function Countdown({ net }: CountdownProps) {
	const [days, setDays] = useState('00');
	const [hours, setHours] = useState('00');
	const [minutes, setMinutes] = useState('00');
	const [seconds, setSeconds] = useState('00');
	const [isBefore, setIsBefore] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date().getTime();
			const distance = new Date(net).getTime() - now;

			const days = Math.floor(Math.abs(distance / (1000 * 60 * 60 * 24)));
			const hours = Math.floor(
				Math.abs((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
			);
			const minutes = Math.floor(
				Math.abs((distance % (1000 * 60 * 60)) / (1000 * 60)),
			);
			const seconds = Math.floor(Math.abs((distance % (1000 * 60)) / 1000));

			setDays(days.toString().padStart(2, '0'));
			setHours(hours.toString().padStart(2, '0'));
			setMinutes(minutes.toString().padStart(2, '0'));
			setSeconds(seconds.toString().padStart(2, '0'));
			setIsBefore(distance > 0);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [net]);

	return (
		<div className={styles.countdownContainer}>
			<p className={styles.timerPrefix}>T{isBefore ? '-' : '+'}</p>
			<div className={styles.timerContainer}>
				<p className={styles.timer}>{days}</p>
				<p>Dias</p>
			</div>
			<p className={styles.timerPrefix}>:</p>
			<div className={styles.timerContainer}>
				<p className={styles.timer}>{hours}</p>
				<p>Horas</p>
			</div>
			<p className={styles.timerPrefix}>:</p>
			<div className={styles.timerContainer}>
				<p className={styles.timer}>{minutes}</p>
				<p>Mins</p>
			</div>
			<p className={styles.timerPrefix}>:</p>
			<div className={styles.timerContainer}>
				<p className={styles.timer}>{seconds}</p>
				<p>Segs</p>
			</div>{' '}
		</div>
	);
}
