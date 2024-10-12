/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ccludjxpajiclxpwhtub.supabase.co'
            }
        ],
        domains: ['cdn.pixabay.com'], // Add your allowed image domains here
    },
};

export default nextConfig;
