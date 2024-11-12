/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
                formats: ['image/avif', 'image/webp'],
                remotePatterns: [
                    {
                        protocol: 'https',
                        hostname: 'static.nationalgeographicbrasil.com',
                        port:'',
                        pathname: '/files/**',
                    },
                    {
                        protocol: 'https',
                        hostname: 'img.daisyui.com',
                        port:'',
                        pathname: '/images/**',
                    },
                ],
            },

};

export default nextConfig;
