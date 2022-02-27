/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build/next",
  reactStrictMode: true,
  env: {
    HOSTNAME: process.env.HOSTNAME,
  },
  images: {
    domains: ["storage.ko-fi.com", "cdn.buymeacoffee.com"],
  },
};

module.exports = nextConfig;
