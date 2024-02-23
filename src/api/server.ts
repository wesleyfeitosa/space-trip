export const serverUrl =
	process.env.NODE_ENV === 'development'
		? process.env.SPACE_DEVS_API_URL_DEV
		: process.env.SPACE_DEVS_API_URL_PROD;
