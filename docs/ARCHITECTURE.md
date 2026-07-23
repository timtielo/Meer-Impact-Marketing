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

Browser → `POST /.netlify/functions/submit-lead` → validatie (verplichte velden, honeypot `_hp`,
timing `_ts`, `_form`-router) → **altijd een e-mail** naar `LEAD_EMAIL_TO` via Resend → **optioneel**
ook doorsturen naar een webhook als `MAKE_ANALYSE_WEBHOOK` / `MAKE_GUIDE_WEBHOOK` gezet is.

Waarom zo: de e-mail is het pad dat niet kan omvallen en dat de eigenaar zelf bezit. De webhook is
een doorgifte voor Make, Zapier of een CRM, aan en uit te zetten met alleen een env-var. Faalt de
e-mail, dan geeft de functie een 502 zodat de bezoeker een foutmelding ziet en opnieuw kan proberen,
in plaats van dat de lead stil verdwijnt. Faalt alleen de webhook terwijl de mail wel aankwam, dan
blijft het een succes (er wordt gelogd).

Alle keys en webhook-URL's zijn **server-only env vars** in Netlify, nooit in de client-bundle.
Zie `netlify/functions/submit-lead.js` en `.env.example`.

**Overdracht:** de mailstroom loopt nu via het Resend-account van Tielo Digital. Overzetten naar het
eigen Resend-account van Meer Impact is later alleen `RESEND_API_KEY` en `LEAD_EMAIL_FROM` vervangen,
geen codewijziging.

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
