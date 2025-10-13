'use client';

import { useLanguage } from '@/contexts/language-context';

import styles from './page.module.css';

export default function AboutPage() {
	const { language } = useLanguage();

	const content = {
		en: {
			title: 'About Space Trip',
			subtitle: 'Your Gateway to Space Exploration',
			mission: {
				title: 'Our Mission',
				description:
					"Space Trip is dedicated to bringing you the latest and most comprehensive information about space launches from around the world. We believe that space exploration is one of humanity's greatest adventures, and everyone should have access to real-time updates about launches, missions, and the incredible technology that makes it all possible.",
			},
			features: {
				title: 'What We Offer',
				items: [
					{
						title: 'Real-Time Launch Data',
						description:
							'Access up-to-date information about upcoming launches from agencies worldwide, powered by The Space Devs API.',
					},
					{
						title: 'Detailed Mission Information',
						description:
							'Learn about the rockets, launch providers, mission objectives, and the technology behind each launch.',
					},
					{
						title: 'Bilingual Support',
						description:
							'Experience the site in English or Portuguese, making space exploration accessible to more people.',
					},
					{
						title: 'Beautiful Design',
						description:
							'Enjoy a modern, intuitive interface that makes exploring space launches a delightful experience.',
					},
				],
			},
			technology: {
				title: 'Built With',
				description:
					'Space Trip is built using cutting-edge web technologies including Next.js 15, React 19, TypeScript, and modern CSS. The application features server-side rendering for optimal performance and SEO.',
			},
			dataSource: {
				title: 'Data Source',
				description:
					'All launch data is provided by The Space Devs, a non-profit organization dedicated to providing spaceflight data and services to the global space community.',
			},
			contact: {
				title: 'Get in Touch',
				description:
					'This project is open source and maintained with love by developers passionate about space exploration. Feel free to contribute or reach out!',
			},
		},
		pt: {
			title: 'Sobre o Space Trip',
			subtitle: 'Seu Portal para a Exploração Espacial',
			mission: {
				title: 'Nossa Missão',
				description:
					'O Space Trip é dedicado a trazer as informações mais recentes e abrangentes sobre lançamentos espaciais de todo o mundo. Acreditamos que a exploração espacial é uma das maiores aventuras da humanidade, e todos devem ter acesso a atualizações em tempo real sobre lançamentos, missões e a incrível tecnologia que torna tudo isso possível.',
			},
			features: {
				title: 'O Que Oferecemos',
				items: [
					{
						title: 'Dados de Lançamento em Tempo Real',
						description:
							'Acesse informações atualizadas sobre próximos lançamentos de agências de todo o mundo, alimentado pela API The Space Devs.',
					},
					{
						title: 'Informações Detalhadas da Missão',
						description:
							'Aprenda sobre os foguetes, provedores de lançamento, objetivos das missões e a tecnologia por trás de cada lançamento.',
					},
					{
						title: 'Suporte Bilíngue',
						description:
							'Experimente o site em inglês ou português, tornando a exploração espacial acessível a mais pessoas.',
					},
					{
						title: 'Design Bonito',
						description:
							'Desfrute de uma interface moderna e intuitiva que torna a exploração de lançamentos espaciais uma experiência agradável.',
					},
				],
			},
			technology: {
				title: 'Construído Com',
				description:
					'O Space Trip é construído usando tecnologias web de ponta, incluindo Next.js 15, React 19, TypeScript e CSS moderno. A aplicação possui renderização no servidor para desempenho e SEO ideais.',
			},
			dataSource: {
				title: 'Fonte de Dados',
				description:
					'Todos os dados de lançamento são fornecidos pelo The Space Devs, uma organização sem fins lucrativos dedicada a fornecer dados e serviços de voos espaciais para a comunidade espacial global.',
			},
			contact: {
				title: 'Entre em Contato',
				description:
					'Este projeto é de código aberto e mantido com amor por desenvolvedores apaixonados pela exploração espacial. Sinta-se à vontade para contribuir ou entrar em contato!',
			},
		},
	};

	const text = content[language];

	return (
		<main className={styles.main}>
			<section className={styles.hero}>
				<h1 className={styles.title}>{text.title}</h1>
				<p className={styles.subtitle}>{text.subtitle}</p>
			</section>

			<section className={styles.section}>
				<h2 className={styles.sectionTitle}>{text.mission.title}</h2>
				<p className={styles.description}>{text.mission.description}</p>
			</section>

			<section className={styles.section}>
				<h2 className={styles.sectionTitle}>{text.features.title}</h2>
				<div className={styles.featuresGrid}>
					{text.features.items.map((feature, index) => (
						<div key={index} className={styles.featureCard}>
							<h3 className={styles.featureTitle}>{feature.title}</h3>
							<p className={styles.featureDescription}>{feature.description}</p>
						</div>
					))}
				</div>
			</section>

			<section className={styles.section}>
				<h2 className={styles.sectionTitle}>{text.technology.title}</h2>
				<p className={styles.description}>{text.technology.description}</p>
				<div className={styles.techStack}>
					<span className={styles.techBadge}>Next.js 15</span>
					<span className={styles.techBadge}>React 19</span>
					<span className={styles.techBadge}>TypeScript</span>
					<span className={styles.techBadge}>CSS Modules</span>
				</div>
			</section>

			<section className={styles.section}>
				<h2 className={styles.sectionTitle}>{text.dataSource.title}</h2>
				<p className={styles.description}>{text.dataSource.description}</p>
				<a
					href="https://thespacedevs.com/"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.link}
				>
					The Space Devs →
				</a>
			</section>

			<section className={styles.section}>
				<h2 className={styles.sectionTitle}>{text.contact.title}</h2>
				<p className={styles.description}>{text.contact.description}</p>
			</section>
		</main>
	);
}
