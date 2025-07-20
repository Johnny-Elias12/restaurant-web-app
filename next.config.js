/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      // ✅ Remove empty hostname
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // optional but recommended for now
  },
};

module.exports = nextConfig;
