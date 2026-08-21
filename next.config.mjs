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
  async headers() {
    return [
      {
        source: '/mountain.mp4',
        headers: [
          { key: 'Content-Type', value: 'video/mp4' },
          { key: 'Accept-Ranges', value: 'bytes' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;