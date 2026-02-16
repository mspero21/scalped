import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Turbopack with empty config (Next.js 16 default)
  turbopack: {},
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push({
      canvas: 'commonjs canvas',
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'r2.thesportsdb.com',
      },
      {
        protocol: 'https',
        hostname: 'www.thesportsdb.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'commons.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
};

export default nextConfig;
