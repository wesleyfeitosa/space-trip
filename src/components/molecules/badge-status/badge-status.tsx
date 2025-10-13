'use client';

import { useEffect, useState } from 'react';

import { type LaunchStatus } from '@/interfaces/launch-status';
import { Tooltip } from '@/components/atoms/tooltip/tooltip';

import styles from './badge-status.module.css';

interface BadgeStatusProps {
	readonly status: LaunchStatus;
}

export function BadgeStatus({ status }: BadgeStatusProps) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('gray');
	const [textColor, setTextColor] = useState('black');

	useEffect(() => {
		switch (status.id) {
			case 1:
				setTitle('GO');
				setDescription('Lançamento confirmado');
				setBackgroundColor('#4CAF50');
				setTextColor('white');
				break;
			case 2:
				setTitle('TBD');
				setDescription('A ser determinado');
				setBackgroundColor('yellow');
				setTextColor('black');
				break;
			case 3:
				setTitle('Sucesso');
				setDescription('Lançamento realizado com sucesso');
				setBackgroundColor('#4CAF50');
				setTextColor('white');
				break;
			case 4:
				setTitle('Falha');
				setDescription('Lançamento falhou');
				setBackgroundColor('red');
				setTextColor('white');
				break;
			case 5:
				setTitle('Hold');
				setDescription('Lançamento em espera');
				setBackgroundColor('orange');
				setTextColor('black');
				break;
			case 6:
				setTitle('Em voo');
				setDescription('Lançamento em andamento');
				setBackgroundColor('blue');
				setTextColor('white');
				break;
			case 7:
				setTitle('Falha parcial');
				setDescription('Lançamento falhou parcialmente');
				setBackgroundColor('red');
				setTextColor('white');
				break;
			case 8:
				setTitle('TBC');
				setDescription('Lançamento a ser confirmado');
				setBackgroundColor('yellow');
				setTextColor('black');
				break;
			default:
				setTitle('Desconhecido');
				setDescription('Status desconhecido');
				setBackgroundColor('gray');
				setTextColor('black');
				break;
		}
	}, [status]);

	return (
		<Tooltip description={description}>
			<div
				className={styles.badge}
				style={{ backgroundColor, color: textColor }}
			>
				<span>{title}</span>
			</div>
		</Tooltip>
	);
}
