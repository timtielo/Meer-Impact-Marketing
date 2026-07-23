import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';

// SSR on Netlify — production stack for Meer Impact Marketing.
// Marketing pages are prerendered. Kennisbank search is client-side (see
// src/pages/kennisbank/index.astro); full-text Pagefind is a later option if we
// move to static output.
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  site: 'https://www.meerimpactmarketing.nl',
  vite: {
    plugins: [tailwindcss()],
  },
});
