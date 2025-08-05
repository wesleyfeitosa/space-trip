export interface Rocket {
	configuration: {
		id: number;
		name: string;
		full_name: string;
		description: string;
		manufacturer: {
			name: string;
			abbrev: string;
		};
		maiden_flight: string;
		launch_cost?: number;
		leo_capacity?: number;
		length?: number;
		diameter?: number;
	};
}
