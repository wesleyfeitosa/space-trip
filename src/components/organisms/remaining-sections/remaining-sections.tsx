import { type UpcomingLaunchDetail } from '@/interfaces/upcoming-launch';
import styles from './remaining-sections.module.css';

interface RemainingSectionsProps {
	launch: UpcomingLaunchDetail;
	formatDate: (dateString: string) => string;
}

export function RemainingSections({
	launch,
	formatDate,
}: RemainingSectionsProps) {
	return (
		<>
			{/* Timeline */}
			{launch.timeline && launch.timeline.length > 0 && (
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Cronograma da Missão</h2>
					<div className={styles.timeline}>
						{launch.timeline.map((event, index) => (
							<div key={index} className={styles.timelineEvent}>
								<div className={styles.timelineTime}>{event.relative_time}</div>
								<div className={styles.timelineContent}>
									<h4>{event.type.abbrev}</h4>
									<p>{event.type.description}</p>
								</div>
							</div>
						))}
					</div>
				</section>
			)}

			{/* Videos */}
			{launch.vid_urls && launch.vid_urls.length > 0 && (
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Vídeos</h2>
					<div className={styles.videosGrid}>
						{launch.vid_urls.map((video, index) => (
							<div key={index} className={styles.videoCard}>
								<a href={video.url} target="_blank" rel="noopener noreferrer">
									<img
										src={video.feature_image}
										alt={video.title}
										className={styles.videoThumbnail}
									/>
									<div className={styles.videoInfo}>
										<h4>{video.title}</h4>
										<p className={styles.videoType}>{video.type.name}</p>
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
					<h2 className={styles.sectionTitle}>Atualizações</h2>
					<div className={styles.updatesList}>
						{launch.updates.slice(0, 5).map((update) => (
							<div key={update.id} className={styles.updateCard}>
								<div className={styles.updateHeader}>
									<span className={styles.updateAuthor}>
										{update.created_by}
									</span>
									<span className={styles.updateDate}>
										{formatDate(update.created_on)}
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
										Ver mais
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
