// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Or whatever your existing config is
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '', // Optional, defaults to '' (empty string) for http/https
        pathname: '/dnlczwmgv/image/upload/**', // Your Cloudinary cloud name and standard path
                                              // The double asterisk (**) is a wildcard for any subpaths
      },
      // You can add other patterns here if you use other external image hosts
      // For example, if you were still using Unsplash placeholders:
      // {
      //   protocol: 'https',
      //   hostname: 'images.unsplash.com',
      // },
    ],
  },
  // ... any other configurations you have
};

module.exports = nextConfig;