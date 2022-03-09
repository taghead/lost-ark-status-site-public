/** @type {import('next').NextConfig} */

const productionHeaders =
  process.env.NODE_ENV === "development"
    ? [
        {
          key: "Content-Security-Policy",
          value: "undefined",
        },
      ]
    : [
        {
          key: "Content-Security-Policy",
          value: "default-src 'self'",
        },
      ];

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
  },
  images: {
    domains: ["storage.ko-fi.com", "cdn.buymeacoffee.com"],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin",
          },
          ...productionHeaders,
        ],
      },
    ];
  },
};

module.exports = nextConfig;
