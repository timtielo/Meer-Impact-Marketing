# Architectuur

## Overzicht

Astro SSR-site op Netlify. Pagina's zijn `.astro`-bestanden in `src/pages/`; herbruikbare stukken zijn
componenten in `src/components/`; herhalende content (artikelen, cases, diensten) zijn markdown-
collecties in `src/content/`. Styling is een hand-geschreven token + component-systeem (geen framework-UI).

## Mappen

```
src/
  layouts/
    SiteLayout.astro      # <html>/<head> (SEO, favicon, theme-color) + fonts + tokens + system + enhance.js
  components/ui/
    Navbar.astro          # sticky nav, mega-dropdown (Diensten), mobiel menu
    Footer.astro          # nieuwsbrief, kolommen, groot wordmark, dynamisch jaartal
    ReviewSource.astro    # Google/Werkspot-logo + rating bij reviews
  content/
    config.ts             # schema's (zod) voor blog, cases, services
    blog/                 # kennisbank-artikelen (.md)
    cases/                # succesverhalen (.md), gekoppeld aan diensten
    services/             # dienstpagina's (.md)
  pages/                  # routes (index, diensten, cases, kennisbank, contact, ...)
  styles/
    tokens.css            # design tokens (single source of truth)
    system.css            # componenten (.mi-*)
    sections.css          # marketing-section-blokken
    styleguide.css        # alleen voor /stijlgids
  scripts/
    enhance.js            # progressive enhancement (count-up, reveal, dropdown, menu, ...)
netlify/functions/
    submit-lead.js        # lead-form proxy naar Make (server-only env vars)
public/                   # logo's, favicon-set, statische assets
astro.config.mjs          # output: 'server', Netlify-adapter, site-URL (sitemap)
netlify.toml              # build + functions + PostHog /ph-proxy
```

## Rendering

`output: 'server'` (SSR) via `@astrojs/netlify`. Marketing-pagina's mogen `export const prerender = true`
krijgen waar dynamiek niet nodig is (sneller + betere caching); de kennisbank-zoek (Pagefind) werkt op
geprerenderde pagina's.

## Formulieren

Browser → `POST /.netlify/functions/submit-lead` → validatie (verplichte velden, honeypot, timing) →
door naar de juiste Make-webhook. Webhook-URL's staan als **server-only env vars** in Netlify
(`MAKE_ANALYSE_WEBHOOK`, `MAKE_GUIDE_WEBHOOK`), nooit in de client-bundle. Zie `netlify/functions/submit-lead.js`.

## Analytics

PostHog (cookieless, EU), geladen in `SiteLayout` en reverse-proxied via `/ph` (zie `netlify.toml`).
Key staat in `PUBLIC_POSTHOG_KEY` (Netlify env).

## SEO

Per pagina een unieke `title` + `description`, één `<h1>`, en schema.org via `astro-seo-schema`
(LocalBusiness op home, Service op dienstpagina's, Article op artikelen). Sitemap + robots via de
Astro-integraties; `public/llms.txt` voor AI-crawlers.

## Deploy

Push naar `main` → Netlify build (`npm run build`) → productie. Branches krijgen een deploy-preview.
Lokaal: `npm run dev`.
