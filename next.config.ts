import type { NextConfig } from "next";

import { isIndexable } from "./src/lib/site";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@base-ui/react"],
  },
  async headers() {
    // Meta robots only covers HTML. The header also keeps images, llms.txt and
    // any other non-HTML response of a preview deployment out of the index.
    if (isIndexable) return [];

    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
