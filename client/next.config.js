/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	poweredByHeader: false,
	optimizeFonts: false,
	env: {
		API_URL: process.env.API_URL,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:1999/api/:path*',
			},
			{
				source: '/uploads/:path*',
				destination: 'http://localhost:1999/:path*',
			},
		]
	},
}

module.exports = nextConfig
