'use client';

import { formatDate } from '@/utils/formatters';
import { type Update } from '@/interfaces/update';
import { useLanguage } from '@/contexts/language-context';

import styles from './update-card.module.css';

interface UpdateCardProps {
	readonly update: Update;
}

export function UpdateCard({ update }: UpdateCardProps) {
	const { language } = useLanguage();
	const locale = language === 'pt' ? 'pt-BR' : 'en-US';

	const labels = {
		readMore: language === 'pt' ? 'Leia mais' : 'Read more',
		by: language === 'pt' ? 'Por' : 'By',
	};

	return (
		<article className={styles.card}>
			<div className={styles.cardHeader}>
				{update.profile_image && (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={update.profile_image}
						alt={update.created_by}
						className={styles.profileImage}
					/>
				)}
				<div className={styles.authorInfo}>
					<p className={styles.author}>
						{labels.by} <strong>{update.created_by}</strong>
					</p>
					<time className={styles.date} dateTime={update.created_on}>
						{formatDate(update.created_on, locale)}
					</time>
				</div>
			</div>

			<div className={styles.cardContent}>
				<p className={styles.comment}>{update.comment}</p>
			</div>

			{update.info_url && (
				<div className={styles.cardFooter}>
					<a
						href={update.info_url}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.link}
					>
						{labels.readMore} →
					</a>
				</div>
			)}
		</article>
	);
}
