/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HOSTNAME: process.env.HOSTNAME,
  },
  images: {
    domains: ["storage.ko-fi.com", "cdn.buymeacoffee.com"],
  },
};

module.exports = nextConfig;
