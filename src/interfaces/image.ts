export interface ImageLicense {
	id: number;
	name: string;
	priority: number;
	link: string;
}

export interface Image {
	id: number;
	name: string;
	image_url: string;
	thumbnail_url: string;
	credit: string;
	license: ImageLicense;
	single_use: boolean;
	variants: unknown[];
}
