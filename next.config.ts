/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'de-just-creatives-site.vercel.app',
          },
        ],
        destination: 'https://www.dejustcreative.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;