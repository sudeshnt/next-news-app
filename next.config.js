/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/news',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
