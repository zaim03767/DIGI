/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: '10mb', // Set limit to 10 MB or adjust as needed
      },
    },
  };
export default nextConfig;
