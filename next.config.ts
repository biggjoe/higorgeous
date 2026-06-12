import type { NextConfig } from "next";
const hostnames = [
  "http://localhost/",
  "http://urum.ng",
  "http://www.urum.ng",
  "https://www.upmn.ng",
];
const nextConfig: NextConfig = {
  /* config options here */

  /*   images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  }, */
  images: {
    remotePatterns: [
      new URL("http://localhost/**"),
      new URL("https://www.cyprex.ng/**"),
      new URL("https://www.upmn.ng/**"),
      new URL("https://www.urum.ng/**"),
    ],
  } /* */,
};

export default nextConfig;
