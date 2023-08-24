// @ts-check

/**
 * @type {import('next').NextConfig}
 */
export default {
  experimental: {
    typedRoutes: true
  },
  output: 'export',
  basePath: '/discord-troll-tool',
  assetPrefix: '/discord-troll-tool',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};
