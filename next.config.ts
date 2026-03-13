import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['mini-instagram-api.mistcloud.workers.dev'], // Add your API domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placeholdit.com',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
