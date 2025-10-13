export interface Update {
	id: number;
	profile_image: string;
	comment: string;
	info_url: string;
	created_by: string;
	created_on: string;
}

export interface UpdatesResponse {
	count: number;
	next: string | undefined;
	previous: string | undefined;
	results: Update[];
}
