import { type Rocket } from './rockect';
import { type Pad } from './pad';
import { type Mission } from './mission';
import { type LaunchStatus } from './launch-status';
import { type Image } from './image';

export interface UpcomingLaunch {
	id: string;
	url: string;
	name: string;
	response_mode: string;
	slug: string;
	launch_designator?: string;
	status: LaunchStatus;
	last_updated: string;
	net: string;
	net_precision: LaunchStatus;
	window_end: string;
	window_start: string;
	image?: Image;
	infographic?: unknown;
	// Legacy fields (keeping for backward compatibility)
	lsp_name?: string;
	mission?: Mission;
	mission_type?: string;
	pad?: string;
	location?: string;
	landing?: string;
	landing_success?: number;
	launcher?: string;
	orbit?: string;
	type?: string;
}

export interface UpcomingLaunchDetail {
	id: string;
	url: string;
	name: string;
	status: LaunchStatus;
	last_updated: string;
	net: string;
	window_start: string;
	window_end: string;
	image?: Image;
	mission?: Mission;
	launch_service_provider?: {
		id: number;
		name: string;
		abbrev: string;
		description: string;
		administrator: string;
		founding_year: number;
		total_launch_count: number;
		successful_launches: number;
		failed_launches: number;
		logo?: {
			image_url: string;
			thumbnail_url: string;
		};
	};
	rocket?: Rocket;
	pad?: Pad;
	vid_urls?: Array<{
		url: string;
		title: string;
		description: string;
		feature_image: string;
		type: {
			name: string;
		};
	}>;
	updates?: Array<{
		id: number;
		comment: string;
		created_by: string;
		created_on: string;
		info_url?: string;
	}>;
	timeline?: Array<{
		type: {
			abbrev: string;
			description: string;
		};
		relative_time: string;
	}>;
}
