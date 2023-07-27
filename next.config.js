/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'external-content.duckduckgo.com',
        port: '',
        pathname:
          '/iu/?u=http%3A%2F%2Ftotalpixels.net%2Fwp-content%2Fuploads%2F2016%2F11%2Fcanstockphoto11484943-1600x1068.jpg&f=1&nofb=1&ipt=df1be5edefad89839b7814c3691305bc9fb3d986ad04b0ecdb7aa3428de6934f&ipo=images',
      },
    ],
  },
};

module.exports = nextConfig;
