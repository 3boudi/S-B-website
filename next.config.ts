import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  turbopack: {
    root: 'C:/Users/SURFUCE/Pictures/coiffer/barber_web'
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
