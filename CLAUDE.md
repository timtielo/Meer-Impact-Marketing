# Meer Impact Marketing, website

You are working in the code for **meerimpactmarketing.nl**, a marketing-agency site
(Meta Ads and SEO for personal trainers, gyms and coaches). Built and handed over by
Tielo Digital. This file is the map and the guardrails. Read it before changing anything.

## Stack

- **Astro SSR** (`output: 'server'`) on **Netlify** (`@astrojs/netlify` adapter).
- **Tailwind v4** available via `@tailwindcss/vite`, but the design is driven by a
  hand-written token + component system (see below), not utility classes.
- Fonts: **Space Grotesk** (display + numbers) and **Instrument Sans** (body), self-hosted via `@fontsource`.
- Content: **Astro content collections** (markdown/MDX in `src/content/`). No external CMS.
- Analytics: **PostHog** (cookieless, EU), reverse-proxied via `/ph`.

## Single source of truth

| What | Where | Never |
|---|---|---|
| Design tokens (colour, type, spacing, radius, shadow) | `src/styles/tokens.css` | hardcode a hex or px, use a token |
| Components (buttons, cards, forms, data-viz, nav, etc.) | `src/styles/system.css` + `src/components/ui/` | invent a new button style, reuse `.mi-*` |
| Marketing section blocks (hero, cases, pricing, ...) | `src/styles/sections.css` | |
| Live component reference | `/stijlgids` and `/blokken` (run locally) | |
| Page content (articles, cases) | `src/content/` markdown | edit layout to change words |
| Lead-form backend | `netlify/functions/submit-lead.js` | change field names or webhook wiring |

Full docs: [`docs/DESIGN.md`](docs/DESIGN.md) · [`docs/CONTENT.md`](docs/CONTENT.md) · [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Guardrails (do not break)

1. **Forms.** Every lead form posts to the Netlify function `submit-lead`, which forwards to
   Make.com. The webhook URLs live in **server-only env vars** (`MAKE_ANALYSE_WEBHOOK`,
   `MAKE_GUIDE_WEBHOOK`), never in client code. Do not move webhook calls into the browser,
   do not rename the form fields (`voornaam`, `email`, `bedrijf`), and keep the honeypot
   (`_hp`) + timing (`_ts`) + `_form` router intact. This stops bot spam.
2. **Secrets.** Never commit `.env`. Never print or hardcode a key. `.env.example` holds placeholders.
3. **Design system.** Style with the `.mi-*` classes and CSS variables. Do not add ad-hoc colours,
   fonts or one-off components; extend `system.css`/`sections.css` and document it in `/stijlgids`.
4. **One `<h1>` per page.** Keep semantic headings and the SEO/schema wiring in the layout.
5. **Accessibility + motion.** Keep visible focus states and the `prefers-reduced-motion` handling
   in `system.css` and `src/scripts/enhance.js`.
6. **Deploy = push.** Netlify auto-deploys `main` to production. Work on a branch, open a PR, check
   the deploy preview, then merge. Ask the owner before merging to `main`.

## Local dev

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # verify before pushing
```

## Editing content (no code needed)

- **New article:** add a markdown file in `src/content/blog/`. See [`docs/CONTENT.md`](docs/CONTENT.md).
- **New case:** add a markdown file in `src/content/cases/` and link it to a service.
- **Change words on a page:** edit the matching file in `src/pages/` or `src/content/`.

## Where things live

```
src/
  layouts/SiteLayout.astro     # fonts + tokens + system + <head> (SEO, favicon)
  components/ui/               # Navbar, Footer, ReviewSource, ...
  content/                     # blog, cases, services (markdown)
  pages/                       # routes (.astro)
  styles/                      # tokens.css, system.css, sections.css
  scripts/enhance.js           # count-up, reveal, dropdown, mobile menu (progressive)
netlify/functions/submit-lead.js   # lead-form backend (do not break)
public/                        # logo, favicon set, static assets
```
