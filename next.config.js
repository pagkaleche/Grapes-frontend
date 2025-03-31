/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["40.233.78.121"],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',  
        destination: 'https://40.233.78.121/api/:path*', 
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
