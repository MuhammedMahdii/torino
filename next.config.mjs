/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "6500",
        pathname: "/static/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "6501",
        pathname: "/static/**",
      },
    ],
  },
};

export default nextConfig;
