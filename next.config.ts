import type { NextConfig } from "next";

// Preview-Deployments (VERCEL_ENV=preview) leben unter Custom-Aliases wie
// domenic-snowy.vercel.app, für die Vercels Default-noindex NICHT greift.
// Wir blocken Indexing für alles außer Production, damit Preview-Inhalt
// nicht mit heilmasseur-domenic.at um SEO konkurriert.
const isProductionDeploy = process.env.VERCEL_ENV === "production";

const nextConfig: NextConfig = {
  reactCompiler: true,
  logging: {
    browserToTerminal: true,
  },
  images: {
    qualities: [75, 85],
  },
  async headers() {
    if (isProductionDeploy) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
