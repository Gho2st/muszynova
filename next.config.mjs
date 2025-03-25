import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/park-rekreacyjno-sportowy",
        destination: "/park",
        permanent: true,
      },
      {
        source: "/silownia",
        destination: "/park/silownia",
        permanent: true,
      },
      {
        source: "/fitness",
        destination: "/park/fitness",
        permanent: true,
      },
      {
        source: "/sala-zabaw",
        destination: "/park/sala-zabaw",
        permanent: true,
      },
      {
        source: "/sala-gier",
        destination: "/park/sala-gier",
        permanent: true,
      },
      {
        source: "/sala-multimedialna",
        destination: "/park/sala-multimedialna",
        permanent: true,
      },
      {
        source: "/mini-kregielnia",
        destination: "/park/mini-kregielnia",
        permanent: true,
      },
      {
        source: "/scianka-wspinaczkowa",
        destination: "/park/wspinaczkowa",
        permanent: true,
      },
      {
        source: "/squash",
        destination: "/park/squash",
        permanent: true,
      },
      {
        source: "/hala-sportowa",
        destination: "/park/hala-sportowa",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
};

export default withNextIntl(nextConfig);
