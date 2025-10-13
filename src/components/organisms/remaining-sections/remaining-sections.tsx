'use client';

import {
	translateTimelineEvent,
	translateVideoType,
} from '@/utils/translations';
import { formatDate } from '@/utils/formatters';
import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import { useLanguage } from '@/contexts/language-context';

import styles from './remaining-sections.module.css';

interface RemainingSectionsProps {
	launch: UpcomingLaunchDetail;
}

export function RemainingSections({ launch }: RemainingSectionsProps) {
	const { language } = useLanguage();

	const locale = language === 'pt' ? 'pt-BR' : 'en-US';
	const labels = {
		timeline: language === 'pt' ? 'Cronograma da Missão' : 'Mission Timeline',
		videos: language === 'pt' ? 'Vídeos' : 'Videos',
		updates: language === 'pt' ? 'Atualizações' : 'Updates',
		seeMore: language === 'pt' ? 'Ver mais' : 'See more',
	};

	return (
		<>
			{/* Timeline */}
			{launch.timeline && launch.timeline.length > 0 && (
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>{labels.timeline}</h2>
					<div className={styles.timeline}>
						{launch.timeline.map((event, index) => {
							const translatedEvent = translateTimelineEvent(event.type.abbrev);
							return (
								<div key={index} className={styles.timelineEvent}>
									<div className={styles.timelineTime}>
										{event.relative_time}
									</div>
									<div className={styles.timelineContent}>
										<h4>{translatedEvent.abbrev}</h4>
										<p>{translatedEvent.description}</p>
									</div>
								</div>
							);
						})}
					</div>
				</section>
			)}

			{/* Videos */}
			{launch.vid_urls && launch.vid_urls.length > 0 && (
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>{labels.videos}</h2>
					<div className={styles.videosGrid}>
						{launch.vid_urls.map((video, index) => (
							<div key={index} className={styles.videoCard}>
								<a href={video.url} target="_blank" rel="noopener noreferrer">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={video.feature_image}
										alt={video.title}
										className={styles.videoThumbnail}
									/>
									<div className={styles.videoInfo}>
										<h4>{video.title}</h4>
										<p className={styles.videoType}>
											{translateVideoType(video.type.name)}
										</p>
									</div>
								</a>
							</div>
						))}
					</div>
				</section>
			)}

			{/* Updates */}
			{launch.updates && launch.updates.length > 0 && (
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>{labels.updates}</h2>
					<div className={styles.updatesList}>
						{launch.updates.slice(0, 5).map((update) => (
							<div key={update.id} className={styles.updateCard}>
								<div className={styles.updateHeader}>
									<span className={styles.updateAuthor}>
										{update.created_by}
									</span>
									<span className={styles.updateDate}>
										{formatDate(update.created_on, locale)}
									</span>
								</div>
								<p className={styles.updateContent}>{update.comment}</p>
								{update.info_url && (
									<a
										href={update.info_url}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.updateLink}
									>
										{labels.seeMore}
									</a>
								)}
							</div>
						))}
					</div>
				</section>
			)}
		</>
	);
}
