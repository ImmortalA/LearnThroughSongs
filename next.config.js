/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/LearnThroughSongs' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/LearnThroughSongs' : '',
};

module.exports = nextConfig;

