/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack(config) {
    config.cache = false;
    config.watchOptions = {
      ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**', '**/*.mp4', '**/*.pdf'],
    };
    return config;
  },
};

export default nextConfig;