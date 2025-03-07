/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '40.233.78.121',
        port: '',
        pathname: '/media/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
