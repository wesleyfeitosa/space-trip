// Translation utilities for Space Trip application
// Enhanced with intelligent pattern matching for better API data handling

type StatusTranslation = { title: string; description: string };
type OrbitTranslation = { name: string; abbrev: string };
type TimelineTranslation = { abbrev: string; description: string };

// Simple caching for better performance
const translationCache = new Map<string, string>();

// Enhanced pattern matching function
function applySmartPatterns(text: string): string {
	let result = text;

	// Amazon Kuiper patterns
	result = result
		.replace(
			/(\d+)\s+satellites?\s+are\s+on\s+board/gi,
			'$1 satélites estão a bordo',
		)
		.replace(/(Amazon'?s?\s+)?Project\s+Kuiper/gi, 'Projeto Kuiper')
		.replace(
			/low\s+Earth\s+orbit\s+satellite\s+internet\s+constellation/gi,
			'constelação de satélites de internet em órbita terrestre baixa',
		)
		.replace(
			/satellite\s+internet\s+constellation/gi,
			'constelação de satélites de internet',
		)
		.replace(
			/broadband\s+internet\s+connectivity/gi,
			'conectividade de internet banda larga',
		)
		.replace(/low-latency\s+broadband/gi, 'banda larga de baixa latência')
		.replace(
			/for\s+(Amazon|SpaceX|NASA)/gi,
			(match, company) => `para a ${company}`,
		);

	// Launch contract patterns
	result = result.replace(
		/(\w+)\s+of\s+a\s+(\w+)\s+launches?\s+contract/gi,
		(match, ordinal, total) => {
			const ordinalMap: Record<string, string> = {
				First: 'Primeira',
				Second: 'Segunda',
				Third: 'Terceira',
				Fourth: 'Quarta',
				Fifth: 'Quinta',
			};
			const totalMap: Record<string, string> = {
				two: 'duas',
				three: 'três',
				four: 'quatro',
				five: 'cinco',
			};
			return `${ordinalMap[ordinal] || ordinal} de ${totalMap[total] || total} missões contratadas`;
		},
	);

	// Satellite and mission patterns
	result = result
		.replace(
			/earth\s+observation\s+satellite/gi,
			'satélite de observação da Terra',
		)
		.replace(/communications?\s+satellite/gi, 'satélite de comunicações')
		.replace(/navigation\s+satellite/gi, 'satélite de navegação')
		.replace(/weather\s+satellite/gi, 'satélite meteorológico')
		.replace(/technology\s+demonstration/gi, 'demonstração tecnológica')
		.replace(
			/commercial\s+satellite\s+deployment/gi,
			'lançamento de satélite comercial',
		)
		.replace(
			/scientific\s+research\s+mission/gi,
			'missão de pesquisa científica',
		)
		.replace(/low\s+earth\s+orbit/gi, 'órbita terrestre baixa');

	return result;
}

// Advanced pattern matching system
interface TranslationPattern {
	pattern: RegExp;
	replacement: string | ((match: string, ...groups: string[]) => string);
	priority: number;
}

const missionPatterns: TranslationPattern[] = [
	{
		pattern: /(\d+)\s+satellites?\s+are\s+on\s+board/gi,
		replacement: '$1 satélites estão a bordo',
		priority: 1,
	},
	{
		pattern: /(Amazon'?s?\s+)?Project\s+Kuiper/gi,
		replacement: 'Projeto Kuiper',
		priority: 1,
	},
	{
		pattern: /low\s+Earth\s+orbit\s+satellite\s+internet\s+constellation/gi,
		replacement:
			'constelação de satélites de internet em órbita terrestre baixa',
		priority: 1,
	},
	{
		pattern: /satellite\s+internet\s+constellation/gi,
		replacement: 'constelação de satélites de internet',
		priority: 2,
	},
	{
		pattern: /(\w+)\s+of\s+a\s+(\w+)\s+launches?\s+contract/gi,
		replacement(match, ordinal, total) {
			const ordinalMap: Record<string, string> = {
				First: 'Primeira',
				Second: 'Segunda',
				Third: 'Terceira',
				Fourth: 'Quarta',
				Fifth: 'Quinta',
			};
			const totalMap: Record<string, string> = {
				two: 'duas',
				three: 'três',
				four: 'quatro',
				five: 'cinco',
			};
			return `${ordinalMap[ordinal] || ordinal} de ${totalMap[total] || total} missões contratadas`;
		},
		priority: 1,
	},
	{
		pattern: /for\s+(Amazon|SpaceX|NASA|Blue\s+Origin)/gi,
		replacement: (match, company) => `para a ${company}`,
		priority: 2,
	},
	{
		pattern: /broadband\s+internet\s+connectivity/gi,
		replacement: 'conectividade de internet banda larga',
		priority: 2,
	},
	{
		pattern: /low-latency\s+broadband/gi,
		replacement: 'banda larga de baixa latência',
		priority: 2,
	},
];

const agencyPatterns: TranslationPattern[] = [
	{
		pattern: /(\w+)\s+is\s+an?\s+American\s+aerospace\s+manufacturer/gi,
		replacement: (match, company) =>
			`A ${company} é uma fabricante aeroespacial americana`,
		priority: 1,
	},
	{
		pattern: /subsidiary\s+of\s+(\w+)/gi,
		replacement: (match, parent) => `subsidiária da ${parent}`,
		priority: 1,
	},
	{
		pattern: /established\s+in\s+(\d{4})/gi,
		replacement: 'estabelecida em $1',
		priority: 1,
	},
	{
		pattern: /founded\s+in\s+(\d{4})\s+by\s+(.+)/gi,
		replacement: 'fundada em $1 por $2',
		priority: 1,
	},
	{
		pattern: /headquartered\s+in\s+(.+?),\s+(.+)/gi,
		replacement: 'com sede em $1, $2',
		priority: 2,
	},
];

// Enhanced translation function with pattern matching
function translateWithPatterns(
	text: string,
	exactTranslations: Record<string, string>,
	patterns: TranslationPattern[],
	cacheKey: string,
): string {
	// Check cache first
	const cached = translationCache.get(cacheKey);
	if (cached) {
		return cached;
	}

	// Check exact matches first
	if (exactTranslations[text]) {
		const result = exactTranslations[text];
		translationCache.set(cacheKey, result);
		return result;
	}

	// Apply patterns by priority
	const sortedPatterns = patterns.sort((a, b) => a.priority - b.priority);
	let result = text;

	for (const { pattern, replacement } of sortedPatterns) {
		if (pattern.test(text)) {
			if (typeof replacement === 'string') {
				result = text.replace(pattern, replacement);
			} else {
				result = text.replace(pattern, replacement);
			}

			translationCache.set(cacheKey, result);
			return result;
		}
	}

	// Fallback to common term replacement
	result = applyCommonTermFallback(text);
	if (result !== text) {
		translationCache.set(cacheKey, result);
	}

	return result;
}

// Common term fallback system
function applyCommonTermFallback(text: string): string {
	const commonTerms: Record<string, string> = {
		'low earth orbit': 'órbita terrestre baixa',
		'low Earth orbit': 'órbita terrestre baixa',
		'satellite internet': 'internet por satélite',
		'broadband internet': 'internet banda larga',
		constellation: 'constelação',
		satellites: 'satélites',
		satellite: 'satélite',
		deployment: 'implantação',
		observation: 'observação',
		communication: 'comunicação',
		navigation: 'navegação',
		technology: 'tecnologia',
		demonstration: 'demonstração',
		commercial: 'comercial',
		scientific: 'científico',
		research: 'pesquisa',
		mission: 'missão',
		launch: 'lançamento',
		rocket: 'foguete',
		spacecraft: 'nave espacial',
		payload: 'carga útil',
		orbit: 'órbita',
		space: 'espacial',
		international: 'internacional',
		station: 'estação',
	};

	let result = text;
	for (const [english, portuguese] of Object.entries(commonTerms)) {
		const regex = new RegExp(`\\b${english}\\b`, 'gi');
		result = result.replace(regex, portuguese);
	}

	return result;
}

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

// Enhanced utility function to translate mission descriptions
export function translateMissionDescription(description: string): string {
	// Check for exact matches first
	if (missionDescriptionTranslations[description]) {
		return missionDescriptionTranslations[description];
	}

	// Apply smart pattern matching for better API data handling
	const smartResult = applySmartPatterns(description);
	if (smartResult !== description) {
		return smartResult;
	}

	// Handle specific Amazon Kuiper descriptions with additional patterns
	if (
		(description.includes('Amazon') && description.includes('Kuiper')) ||
		description.includes('Project Kuiper')
	) {
		const translatedDescription = description
			.replace(/Amazon's Kuiper/g, 'Amazon Kuiper')
			.replace(/for Amazon/g, 'para a Amazon');

		return translatedDescription;
	}

	// Check for partial matches and replace common phrases (existing logic)
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

// Enhanced utility function to translate agency descriptions
export function translateAgencyDescription(description: string): string {
	// Check cache first
	const cacheKey = `agency:${description}`;
	const cached = translationCache.get(cacheKey);
	if (cached) {
		return cached;
	}

	// Check for exact matches first
	if (agencyDescriptionTranslations[description]) {
		const result = agencyDescriptionTranslations[description];
		translationCache.set(cacheKey, result);
		return result;
	}

	// Enhanced pattern matching for agency descriptions
	const result = description
		.replace(
			/(\w+)\s+is\s+an?\s+American\s+aerospace\s+manufacturer/gi,
			(match, company) =>
				`A ${company} é uma fabricante aeroespacial americana`,
		)
		.replace(
			/subsidiary\s+of\s+(\w+)/gi,
			(match, parent) => `subsidiária da ${parent}`,
		)
		.replace(/established\s+in\s+(\d{4})/gi, 'estabelecida em $1')
		.replace(/founded\s+in\s+(\d{4})\s+by\s+(.+)/gi, 'fundada em $1 por $2')
		.replace(/headquartered\s+in\s+(.+?),\s+(.+)/gi, 'com sede em $1, $2')
		.replace(/aerospace manufacturer/gi, 'fabricante aeroespacial')
		.replace(/space transport services/gi, 'serviços de transporte espacial')
		.replace(
			/reducing space transportation costs/gi,
			'reduzir custos de transporte espacial',
		)
		.replace(/enabling the colonization/gi, 'permitir a colonização')
		.replace(
			/broadband internet connectivity/gi,
			'conectividade de internet banda larga',
		)
		.replace(/low-latency broadband/gi, 'banda larga de baixa latência');

	// If pattern matching changed the text, cache and return
	if (result !== description) {
		translationCache.set(cacheKey, result);
		return result;
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

	// Apply common terms as fallback
	if (translatedDescription === description) {
		translatedDescription = applyCommonTermFallback(description);
	}

	// Cache the result if it changed
	if (translatedDescription !== description) {
		translationCache.set(cacheKey, translatedDescription);
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
