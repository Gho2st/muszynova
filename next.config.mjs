/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/park-rekreacyjno-sportowy", // Stary URL
        destination: "/park", // Nowy URL
        permanent: true, // Stałe przekierowanie (301)
      },
      {
        source: "/silownia", // Stary URL
        destination: "/park/silownia", // Kolejny nowy URL
        permanent: true, // Stałe przekierowanie (301)
      },
      {
        source: "/fitness", // Stary URL
        destination: "/park/fitness", // Kolejny nowy URL
        permanent: true, // Stałe przekierowanie (301)
      },
      {
        source: "/sala-zabaw", // Stary URL
        destination: "/park/sala-zabaw", // Kolejny nowy URL
        permanent: true, // Stałe przekierowanie (301)
      },
      {
        source: "/sala-gier", // Stary URL
        destination: "/park/sala-gier", // Kolejny nowy URL
        permanent: true, // Stałe przekierowanie (301)
      },
      {
        source: "/sala-multimedialna", // Stary URL
        destination: "/park/sala-multimedialna", // Kolejny nowy URL
        permanent: true, // Stałe przekierowanie (301)
      },
      {
        source: "/mini-kregielnia", // Stary URL
        destination: "/park/mini-kregielnia", // Kolejny nowy URL
        permanent: true, // Stałe przekierowanie (301)
      },
      {
        source: "/scianka-wspinaczkowa", // Stary URL
        destination: "/park/wspinaczkowa", // Kolejny nowy URL
        permanent: true, // Stałe przekierowanie (301)
      },
      {
        source: "/squash", // Stary URL
        destination: "/park/squash", // Kolejny nowy URL
        permanent: true, // Stałe przekierowanie (301)
      },
      {
        source: "/hala-sportowa", // Stary URL
        destination: "/park/hala-sportowa", // Kolejny nowy URL
        permanent: true, // Stałe przekierowanie (301)
      },
    ];
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
