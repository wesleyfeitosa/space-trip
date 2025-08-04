import { type Image } from './image';

interface Country {
	id: number;
	name: string;
	alpha_2_code: string;
	alpha_3_code: string;
	nationality_name: string;
	nationality_name_composed: string;
}

interface AgencyType {
	id: number;
	name: string;
}

export interface Agency {
	response_mode: string;
	id: number;
	url: string;
	name: string;
	abbrev: string;
	type: AgencyType;
	featured: boolean;
	country: Country[];
	description: string;
	administrator: string;
	founding_year: number;
	launchers: string;
	spacecraft: string;
	parent?: string;
	image: Image;
	logo: Image;
	social_logo: Image;
	total_launch_count: number;
	consecutive_successful_launches: number;
	successful_launches: number;
	failed_launches: number;
	pending_launches: number;
	consecutive_successful_landings: number;
	successful_landings: number;
	failed_landings: number;
	attempted_landings: number;
	successful_landings_spacecraft: number;
	failed_landings_spacecraft: number;
	attempted_landings_spacecraft: number;
	successful_landings_payload: number;
	failed_landings_payload: number;
	attempted_landings_payload: number;
	info_url: string;
	wiki_url: string;
	social_media_links: unknown[];
}
