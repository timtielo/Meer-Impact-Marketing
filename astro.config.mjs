import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';

// SSR on Netlify — production stack for Meer Impact Marketing.
// Content collections, React islands, SEO + sitemap integrations are wired in
// during the full migration (after the design direction is picked).
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  site: 'https://www.meerimpactmarketing.nl',
  vite: {
    plugins: [tailwindcss()],
  },
});
