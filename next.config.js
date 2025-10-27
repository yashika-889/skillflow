/** @type {import('next').NextConfig} */
const nextConfig = {
    // Set to false to avoid double-renders in development,
    // which can be confusing with wallet popups.
    reactStrictMode: false, 
  
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'api.dicebear.com',
        },
        {
          protocol: 'https',
          hostname: 'picsum.photos',
        }
      ],
    },
  };
  
export default nextConfig;