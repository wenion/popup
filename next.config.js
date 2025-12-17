/**
 * Check environment variables when building
 * priority: .env.local > .env.development or .env.production > .env 
 * 
 */
function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`[env] Missing ${name}. Add it to .env.local`);
  try { new URL(v); } catch { throw new Error(`[env] ${name} must be a valid URL: ${v}`); }
}

requireEnv("NEXT_PUBLIC_HOMEPAGE");

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
};

module.exports = nextConfig;
