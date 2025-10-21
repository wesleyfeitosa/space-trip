/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'thespacedevs-prod.nyc3.digitaloceanspaces.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'i.ytimg.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
