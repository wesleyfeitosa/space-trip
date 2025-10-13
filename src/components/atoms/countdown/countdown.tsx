'use client';

import { useEffect, useState } from 'react';

import { useLanguage } from '@/contexts/language-context';

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
	const { language } = useLanguage();

	const labels = {
		days: language === 'pt' ? 'Dias' : 'Days',
		hours: language === 'pt' ? 'Horas' : 'Hours',
		minutes: language === 'pt' ? 'Mins' : 'Mins',
		seconds: language === 'pt' ? 'Segs' : 'Secs',
	};

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
				<p>{labels.days}</p>
			</div>
			<p className={styles.timerPrefix}>:</p>
			<div className={styles.timerContainer}>
				<p className={styles.timer}>{hours}</p>
				<p>{labels.hours}</p>
			</div>
			<p className={styles.timerPrefix}>:</p>
			<div className={styles.timerContainer}>
				<p className={styles.timer}>{minutes}</p>
				<p>{labels.minutes}</p>
			</div>
			<p className={styles.timerPrefix}>:</p>
			<div className={styles.timerContainer}>
				<p className={styles.timer}>{seconds}</p>
				<p>{labels.seconds}</p>
			</div>{' '}
		</div>
	);
}
