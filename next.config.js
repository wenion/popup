/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",

  // // Optional: Change the output directory `out` -> `dist`
  // distDir: "dist",

  // // Make all asset URLs include /dist so they work when popup is dist/index.html
  // assetPrefix: "/dist",
  // basePath: "/dist",
  // reactStrictMode: true,
  // images: { unoptimized: true },
  publicRuntimeConfig: {
    homepage: "http://127.0.0.1:3000/",
    loginPage: "http://127.0.0.1:3000/login",
  },
};

module.exports = nextConfig;
