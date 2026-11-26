import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const IMMUTABLE_CACHE = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=31536000, immutable',
  },
];

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      'framer-motion',
      '@radix-ui/react-tooltip',
    ],
  },
  async headers() {
    return [
      { source: '/videos/:path*', headers: IMMUTABLE_CACHE },
      { source: '/loading.gif', headers: IMMUTABLE_CACHE },
      { source: '/logo.png', headers: IMMUTABLE_CACHE },
      { source: '/download/:path*', headers: IMMUTABLE_CACHE },
    ];
  },
};

export default withNextIntl(nextConfig);
