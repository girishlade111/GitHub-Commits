/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: the app runs 100% in the browser — the old /api route was
  // replaced with direct GitHub API calls from the client using the user's
  // own token. Deployable to GitHub Pages / any static host.
  output: 'export',
  images: { unoptimized: true },
};

module.exports = nextConfig;
