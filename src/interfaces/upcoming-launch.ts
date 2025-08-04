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
