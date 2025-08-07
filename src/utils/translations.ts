// Translation utilities for Space Trip application
// Provides Portuguese translations for API data

type StatusTranslation = { title: string; description: string };
type OrbitTranslation = { name: string; abbrev: string };
type TimelineTranslation = { abbrev: string; description: string };

// Status translations (already implemented in badge-status component, keeping here for reference)
export const statusTranslations: Record<number, StatusTranslation> = {
	1: { title: 'GO', description: 'Lançamento confirmado' },
	2: { title: 'TBD', description: 'A ser determinado' },
	3: { title: 'Sucesso', description: 'Lançamento realizado com sucesso' },
	4: { title: 'Falha', description: 'Lançamento falhou' },
	5: { title: 'Hold', description: 'Lançamento em espera' },
	6: { title: 'Em voo', description: 'Lançamento em andamento' },
	7: { title: 'Falha parcial', description: 'Lançamento falhou parcialmente' },
	8: { title: 'TBC', description: 'Lançamento a ser confirmado' },
};

// Mission type translations
export const missionTypeTranslations: Record<string, string> = {
	'Government/Top Secret': 'Governamental/Ultra Secreto',
	'Earth Science': 'Ciências da Terra',
	'Technology Demonstration': 'Demonstração Tecnológica',
	Communications: 'Comunicações',
	'Earth Observation': 'Observação da Terra',
	Navigation: 'Navegação',
	Resupply: 'Reabastecimento',
	'Test Flight': 'Voo de Teste',
	'Planetary Science': 'Ciências Planetárias',
	Astrophysics: 'Astrofísica',
	'Human Exploration': 'Exploração Humana',
	'Robotic Exploration': 'Exploração Robótica',
	'National Defence': 'Defesa Nacional',
	'Dedicated Rideshare': 'Carona Dedicada',
	Commercial: 'Comercial',
	Technology: 'Tecnologia',
	Unknown: 'Desconhecido',
};

// Orbit type translations
export const orbitTranslations: Record<string, OrbitTranslation> = {
	'Low Earth Orbit': { name: 'Órbita Terrestre Baixa', abbrev: 'LEO' },
	'Medium Earth Orbit': { name: 'Órbita Terrestre Média', abbrev: 'MEO' },
	'Geostationary Orbit': { name: 'Órbita Geoestacionária', abbrev: 'GEO' },
	'Geosynchronous Orbit': { name: 'Órbita Geossíncrona', abbrev: 'GSO' },
	'Sun-Synchronous Orbit': { name: 'Órbita Heliosíncrona', abbrev: 'SSO' },
	'Polar Orbit': { name: 'Órbita Polar', abbrev: 'PO' },
	'Highly Elliptical Orbit': {
		name: 'Órbita Altamente Elíptica',
		abbrev: 'HEO',
	},
	'Heliocentric Orbit': { name: 'Órbita Heliocêntrica', abbrev: 'HCO' },
	'Lunar Orbit': { name: 'Órbita Lunar', abbrev: 'LO' },
	'Mars Orbit': { name: 'Órbita Marciana', abbrev: 'MO' },
	'Trans Lunar Injection': { name: 'Injeção Trans-Lunar', abbrev: 'TLI' },
	Interplanetary: { name: 'Interplanetária', abbrev: 'IP' },
	Suborbital: { name: 'Suborbital', abbrev: 'SO' },
};

// Timeline event translations
export const timelineEventTranslations: Record<string, TimelineTranslation> = {
	Startup: {
		abbrev: 'Inicialização',
		description:
			'O computador de bordo assume o controle da contagem regressiva e executa as últimas verificações',
	},
	Ignition: {
		abbrev: 'Ignição',
		description: 'Início da sequência de ignição do motor',
	},
	Liftoff: {
		abbrev: 'Decolagem',
		description: 'Primeiro movimento ascendente do foguete',
	},
	Supersonic: {
		abbrev: 'Supersônico',
		description: 'Veículo está supersônico',
	},
	'Max-Q': { abbrev: 'Max-Q', description: 'Pressão dinâmica máxima' },
	MECO: { abbrev: 'MECO', description: 'Desligamento do motor principal' },
	'Stage 2 Separation': {
		abbrev: 'Separação do 2º Estágio',
		description: 'Separação do segundo estágio do primeiro',
	},
	SES: { abbrev: 'IMS', description: 'Início do segundo motor' },
	'Fairing Separation': {
		abbrev: 'Separação da Carenagem',
		description: 'Separação da carenagem de carga útil',
	},
	'Battery Hotswap': {
		abbrev: 'Troca de Bateria',
		description:
			'O segundo estágio do Electron muda para um novo conjunto de baterias e ejeta as esgotadas',
	},
	SECO: { abbrev: 'SECO', description: 'Desligamento do segundo motor' },
	'Kick Stage Separation': {
		abbrev: 'Separação do Estágio Kick',
		description: 'Separação do estágio kick do estágio anterior',
	},
	'Kick Stage Ignition': {
		abbrev: 'Ignição do Estágio Kick',
		description: 'Início do motor do estágio kick',
	},
	'Kick Stage Cut-off': {
		abbrev: 'Desligamento do Estágio Kick',
		description: 'Desligamento do motor do estágio kick',
	},
	'Payload Separation': {
		abbrev: 'Separação da Carga Útil',
		description: 'Liberação final da carga útil do foguete',
	},
};

// Common technical terms translations
export const technicalTermsTranslations: Record<string, string> = {
	'Launch Service Provider': 'Provedor de Serviço de Lançamento',
	Rocket: 'Foguete',
	Mission: 'Missão',
	'Launch Pad': 'Plataforma de Lançamento',
	'Launch Window': 'Janela de Lançamento',
	Timeline: 'Cronograma',
	Updates: 'Atualizações',
	Videos: 'Vídeos',
	'Mission Details': 'Detalhes da Missão',
	'NET (No Earlier Than)': 'NET (Não Antes De)',
	'Window Start': 'Início da Janela',
	'Window End': 'Fim da Janela',
	Manufacturer: 'Fabricante',
	'First Flight': 'Primeiro Voo',
	Length: 'Comprimento',
	Diameter: 'Diâmetro',
	'LEO Capacity': 'Capacidade LEO',
	'Launch Cost': 'Custo de Lançamento',
	Founded: 'Fundada',
	'Total Launches': 'Lançamentos Totais',
	Successful: 'Sucessos',
	Failed: 'Falhas',
	Location: 'Local',
	Country: 'País',
	Coordinates: 'Coordenadas',
	Type: 'Tipo',
	Orbit: 'Órbita',
	'Official Webcast': 'Transmissão Oficial',
	'See more': 'Ver mais',
	'Image credit': 'Crédito da imagem',
	'Last updated': 'Última atualização',
};

// Video type translations
export const videoTypeTranslations: Record<string, string> = {
	'Official Webcast': 'Transmissão Oficial',
	'Launch Highlights': 'Destaques do Lançamento',
	'Press Conference': 'Coletiva de Imprensa',
	'Mission Overview': 'Visão Geral da Missão',
	Documentary: 'Documentário',
	Interview: 'Entrevista',
	'Live Stream': 'Transmissão ao Vivo',
};

// Translation functions
export function translateMissionType(missionType: string): string {
	return missionTypeTranslations[missionType] ?? missionType;
}

export function translateOrbit(
	orbitName: string,
	abbrev?: string,
): OrbitTranslation {
	const translation = orbitTranslations[orbitName];
	if (translation) {
		return translation;
	}

	return {
		name: orbitName,
		abbrev: abbrev ?? '',
	};
}

export function translateTimelineEvent(eventType: string): TimelineTranslation {
	const translation = timelineEventTranslations[eventType];
	if (translation) {
		return translation;
	}

	return {
		abbrev: eventType,
		description: eventType,
	};
}

export function translateTechnicalTerm(term: string): string {
	return technicalTermsTranslations[term] ?? term;
}

export function translateVideoType(videoType: string): string {
	return videoTypeTranslations[videoType] ?? videoType;
}

// Common mission description translations
const missionDescriptionTranslations: Record<string, string> = {
	'Synthetic aperture radar Earth observation satellite for Japanese Earth imaging company iQPS.':
		'Satélite de observação da Terra com radar de abertura sintética para a empresa japonesa de imagens terrestres iQPS.',
	'Technology demonstration mission': 'Missão de demonstração tecnológica',
	'Communications satellite': 'Satélite de comunicações',
	'Earth observation satellite': 'Satélite de observação da Terra',
	'Navigation satellite': 'Satélite de navegação',
	'Weather satellite': 'Satélite meteorológico',
	'Scientific research mission': 'Missão de pesquisa científica',
	'Commercial satellite deployment': 'Lançamento de satélite comercial',
	'Resupply mission to the International Space Station':
		'Missão de reabastecimento para a Estação Espacial Internacional',
	// New translations from real API data
	'Kuiper Systems LLC': 'Kuiper Systems LLC',
	'Kennedy Space Center': 'Centro Espacial Kennedy',
	'Cape Canaveral Space Force Station':
		'Estação da Força Espacial de Cabo Canaveral',
	'Vandenberg Space Force Base': 'Base da Força Espacial de Vandenberg',
	'polar launches': 'lançamentos polares',
	'Go for Launch': 'Autorizado para Lançamento',
	'Falcon 9': 'Falcon 9',
	'Falcon 9 Block 5': 'Falcon 9 Block 5',
	Private: 'Privada',
	Commercial: 'Comercial',
	'United States of America': 'Estados Unidos da América',
	'satellite internet constellation': 'constelação de satélites de internet',
	'low Earth orbit': 'órbita terrestre baixa',
	'low earth orbit': 'órbita terrestre baixa',
	'satellites are on board': 'satélites estão a bordo',
	'broadband internet connectivity': 'conectividade de internet banda larga',
	'low-latency broadband': 'banda larga de baixa latência',
	'Details TBD': 'Detalhes a serem determinados',
	'Details to be determined': 'Detalhes a serem determinados',
	'Project Kuiper': 'Projeto Kuiper',
	'Amazon Kuiper': 'Amazon Kuiper',
	'subsidiary of Amazon': 'subsidiária da Amazon',
	'established in 2019': 'estabelecida em 2019',
	'to deploy a large': 'para implementar uma grande',
	'to provide': 'para fornecer',
};

// Common agency description translations
const agencyDescriptionTranslations: Record<string, string> = {
	'Rocket Lab is an American aerospace manufacturer with a wholly owned New Zealand subsidiary.':
		'A Rocket Lab é uma fabricante aeroespacial americana com uma subsidiária integral da Nova Zelândia.',
	'The company develops lightweight, cost-effective commercial rocket launch services.':
		'A empresa desenvolve serviços comerciais de lançamento de foguetes leves e econômicos.',
	'SpaceX designs, manufactures and launches advanced rockets and spacecraft.':
		'A SpaceX projeta, fabrica e lança foguetes e naves espaciais avançados.',
	// Additional SpaceX description
	'Space Exploration Technologies Corp., known as SpaceX, is an American aerospace manufacturer and space transport services company headquartered in Hawthorne, California. It was founded in 2002 by entrepreneur Elon Musk with the goal of reducing space transportation costs and enabling the colonization of Mars.':
		'Space Exploration Technologies Corp., conhecida como SpaceX, é uma empresa americana de fabricação aeroespacial e serviços de transporte espacial com sede em Hawthorne, Califórnia. Foi fundada em 2002 pelo empresário Elon Musk com o objetivo de reduzir os custos de transporte espacial e permitir a colonização de Marte.',
	// Kuiper description
	'Kuiper Systems LLC, also known as Project Kuiper, is a subsidiary of Amazon that was established in 2019 to deploy a large satellite internet constellation to provide low-latency broadband internet connectivity.':
		'Kuiper Systems LLC, também conhecido como Projeto Kuiper, é uma subsidiária da Amazon que foi estabelecida em 2019 para implementar uma grande constelação de satélites de internet para fornecer conectividade de internet banda larga de baixa latência.',
	// Common phrases
	'aerospace manufacturer': 'fabricante aeroespacial',
	'space transport services': 'serviços de transporte espacial',
	'reducing space transportation costs':
		'reduzir custos de transporte espacial',
	'enabling the colonization of Mars': 'permitir a colonização de Marte',
	'subsidiary of Amazon': 'subsidiária da Amazon',
	'established in 2019': 'estabelecida em 2019',
	'to deploy a large': 'para implementar uma grande',
	'satellite internet constellation': 'constelação de satélites de internet',
	'low-latency broadband': 'banda larga de baixa latência',
	'broadband internet connectivity': 'conectividade de internet banda larga',
};

// Common rocket description translations
const rocketDescriptionTranslations: Record<string, string> = {
	'Electron is a two-stage orbital expendable launch vehicle':
		'Electron é um veículo de lançamento orbital descartável de dois estágios',
	'developed by the American aerospace company Rocket Lab':
		'desenvolvido pela empresa aeroespacial americana Rocket Lab',
	'designed to launch small satellites and cubesats':
		'projetado para lançar pequenos satélites e cubesats',
	'to sun-synchronous orbit and low earth orbit':
		'para órbita heliosíncrona e órbita terrestre baixa',
};

// Utility function to translate common agency descriptions
export function translateAgencyDescription(description: string): string {
	// Check for exact matches first
	if (agencyDescriptionTranslations[description]) {
		return agencyDescriptionTranslations[description];
	}

	// Check for partial matches and replace common phrases
	let translatedDescription = description;
	for (const [english, portuguese] of Object.entries(
		agencyDescriptionTranslations,
	)) {
		if (translatedDescription.includes(english)) {
			translatedDescription = translatedDescription.replace(
				english,
				portuguese,
			);
		}
	}

	return translatedDescription;
}

// Utility function to translate mission descriptions
export function translateMissionDescription(description: string): string {
	// Check for exact matches first
	if (missionDescriptionTranslations[description]) {
		return missionDescriptionTranslations[description];
	}

	// Handle common Amazon Kuiper descriptions
	if (
		(description.includes('Amazon') && description.includes('Kuiper')) ||
		description.includes('Project Kuiper')
	) {
		const translatedDescription = description
			.replace(/Amazon's Kuiper/g, 'Amazon Kuiper')
			.replace(/Project Kuiper/g, 'Projeto Kuiper')
			.replace(
				/low Earth orbit satellite internet constellation/g,
				'constelação de satélites de internet em órbita terrestre baixa',
			)
			.replace(
				/satellite internet constellation/g,
				'constelação de satélites de internet',
			)
			.replace(/(\d+) satellites are on board/g, '$1 satélites estão a bordo')
			.replace(
				/Second of a three launches contract/g,
				'Segunda de três missões contratadas',
			)
			.replace(/for Amazon/g, 'para a Amazon')
			.replace(/low Earth orbit/g, 'órbita terrestre baixa');

		return translatedDescription;
	}

	// Check for partial matches and replace common phrases
	let translatedDescription = description;
	for (const [english, portuguese] of Object.entries(
		missionDescriptionTranslations,
	)) {
		if (translatedDescription.includes(english)) {
			translatedDescription = translatedDescription.replace(
				english,
				portuguese,
			);
		}
	}

	return translatedDescription;
}

// Utility function to translate rocket descriptions
export function translateRocketDescription(description: string): string {
	// Check for exact matches first
	if (rocketDescriptionTranslations[description]) {
		return rocketDescriptionTranslations[description];
	}

	// Check for partial matches and replace common phrases
	let translatedDescription = description;
	for (const [english, portuguese] of Object.entries(
		rocketDescriptionTranslations,
	)) {
		if (translatedDescription.includes(english)) {
			translatedDescription = translatedDescription.replace(
				english,
				portuguese,
			);
		}
	}

	return translatedDescription;
}
