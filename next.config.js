/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]'
      }
    });
    return config;
  },
}

module.exports = nextConfig 