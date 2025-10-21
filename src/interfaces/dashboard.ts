export interface DashboardUpdate {
	id: number;
	profile_image: string;
	comment: string;
	info_url: string;
	created_by: string;
	created_on: string;
}

export interface LiveStream {
	title: string;
	description: string;
	image: string;
	url: string;
}

export interface RoadClosure {
	id: number;
	title: string;
	status: {
		id: number;
		name: string;
	};
	window_start: string;
	window_end: string;
}

export interface Notice {
	id: number;
	type: {
		id: number;
		name: string;
	};
	date: string;
	url: string;
}

export interface VehicleImage {
	id: number;
	name: string;
	image_url: string;
	thumbnail_url: string;
	credit: string;
}

export interface Vehicle {
	id: number;
	url: string;
	flight_proven: boolean;
	serial_number: string;
	status: {
		id: number;
		name: string;
	};
	image: VehicleImage;
	details: string;
	successful_landings: number;
	attempted_landings: number;
	flights: number;
	last_launch_date: string;
	first_launch_date: string;
	fastest_turnaround: string;
	launcher_config: {
		id: number;
		name: string;
		full_name: string;
	};
}

export interface Orbiter {
	id: number;
	url: string;
	name: string;
	serial_number: string;
	image: VehicleImage;
	in_space: boolean;
	time_in_space: string;
	time_docked: string;
	flights_count: number;
	status: {
		id: number;
		name: string;
	};
	description: string;
	spacecraft_config: {
		id: number;
		name: string;
	};
}

export interface UpcomingLaunch {
	id: string;
	url: string;
	name: string;
	slug: string;
	status: {
		id: number;
		name: string;
		abbrev: string;
	};
	net: string;
	window_start: string;
	window_end: string;
	image: VehicleImage;
	mission?: {
		name: string;
		description: string;
		type: string;
	};
}

export interface StarshipDashboard {
	updates: DashboardUpdate[];
	live_streams: LiveStream[];
	road_closures: RoadClosure[];
	notices: Notice[];
	vehicles: Vehicle[];
	orbiters: Orbiter[];
	upcoming: {
		launches: UpcomingLaunch[];
	};
}

