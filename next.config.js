/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "hifibridgedocs.s3.us-east-1.amazonaws.com",
      "hifibridgedocs.s3.amazonaws.com",
    ], // Add your image hostname here
  },
};

module.exports = nextConfig;
