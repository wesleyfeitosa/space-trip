import { type LaunchStatus } from './launch-status';
import { type LaunchMission } from './launch-mission';

export class UpcomingLaunch {
	id: string;
	url: string;
	slug: string;
	name: string;
	status: LaunchStatus;
	last_updated: string;
	net: string;
	net_precision: {
		id: number;
		name: string;
		abbrev: string;
		description: string;
	};
	window_end: string;
	window_start: string;
	lsp_name: string;
	mission: LaunchMission;
	mission_type: string;
	pad: string;
	location: string;
	landing: string;
	landing_success: number;
	launcher: string;
	orbit: string;
	image: string;
	type: string;

	constructor({
		id,
		url,
		slug,
		name,
		status,
		last_updated,
		net,
		net_precision,
		window_end,
		window_start,
		lsp_name,
		mission,
		mission_type,
		pad,
		location,
		landing,
		landing_success,
		launcher,
		orbit,
		image,
		type,
	}: UpcomingLaunch) {
		this.id = id;
		this.url = url;
		this.slug = slug;
		this.name = name;
		this.status = status;
		this.last_updated = last_updated;
		this.net = net;
		this.net_precision = net_precision;
		this.window_end = window_end;
		this.window_start = window_start;
		this.lsp_name = lsp_name;
		this.mission = mission;
		this.mission_type = mission_type;
		this.pad = pad;
		this.location = location;
		this.landing = landing;
		this.landing_success = landing_success;
		this.launcher = launcher;
		this.orbit = orbit;
		this.image = image;
		this.type = type;
	}
}
