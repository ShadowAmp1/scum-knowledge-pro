/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: process.env.NODE_ENV === "production",
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Fix for standalone mode
  assetPrefix: process.env.NODE_ENV === "production" ? "" : undefined,
  basePath: "",
  trailingSlash: false,
  experimental: {
    // Ensure static files are properly handled in standalone
    outputFileTracingIncludes: {
      '*': ['./public/**/*', './src/**/*']
    },
  },
};

export default nextConfig;
