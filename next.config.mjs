/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "*.r2.cloudflarestorage.com",
      "arweave.net",
      "ipfs.io",
      "nftstorage.link",
      "shdw-drive.genesysgo.net",
    ],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  // Vercel specific
  output: 'standalone',
  distDir: '.next',
  // Allow all hosts in development
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
