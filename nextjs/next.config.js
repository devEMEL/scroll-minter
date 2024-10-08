/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== 'production';
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
        };
        return config;
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    // basePath: "/github-pages",
    exportPathMap: function () {
        // /Next-React-Components
        return {
            '/': { page: '/' },
            '/faucet': { page: '/faucet' },
        };
    },
    images: {
        domains: ['maroon-major-crawdad-175.mypinata.cloud'], // Add your hostname here
    },
};

module.exports = nextConfig;
