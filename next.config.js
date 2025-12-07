/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // Optional: Change the output directory `out` -> `dist`
  distDir: "dist",

  // Make all asset URLs include /dist so they work when popup is dist/index.html
  assetPrefix: "/dist",
  basePath: "/dist",
  reactStrictMode: true,
  images: { unoptimized: true },
  publicRuntimeConfig: {
    homepage: "https://colam.kmass.cloud.edu.au/",
    loginPage: "https://colam.kmass.cloud.edu.au/login",
  },
};

module.exports = nextConfig;
