export interface Pad {
	id: number;
	name: string;
	description: string;
	latitude: number;
	longitude: number;
	location: {
		name: string;
	};
	country: {
		name: string;
	};
}
