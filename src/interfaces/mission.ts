import { type Agency } from './agency';

interface CelestialBody {
	response_mode: string;
	id: number;
	name: string;
}

interface Orbit {
	id: number;
	name: string;
	abbrev: string;
	celestial_body: CelestialBody;
}

export interface Mission {
	id: number;
	name: string;
	type: string;
	description: string;
	image?: string;
	orbit: Orbit;
	agencies: Agency[];
	info_urls: unknown[];
	vid_urls: unknown[];
}
