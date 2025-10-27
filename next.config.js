// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    // Keep this if you want to allow warnings/double-renders in dev
    reactStrictMode: false, 
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.dicebear.com', // Dicebear is now a separate, valid object
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            }
            // If you had a third pattern that was supposed to be '*' 
            // but resulted in the syntax error, it's safer to just list 
            // the specific hosts like above.
        ],
    },
};

export default nextConfig;