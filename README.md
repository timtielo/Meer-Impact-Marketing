# Meer Impact Marketing

Website voor **meerimpactmarketing.nl** (Meta Ads en SEO voor personal trainers, sportscholen en coaches).
Gebouwd en beheerd door Tielo Digital, overdraagbaar via deze repo.

## Snel starten

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # controleer voor pushen
```

## Belangrijkste bestanden

- **[CLAUDE.md](CLAUDE.md)**, lees dit eerst. Stack, guardrails en waar alles staat.
- **[docs/DESIGN.md](docs/DESIGN.md)**, het designsysteem (kleuren, type, componenten). Single source of truth.
- **[docs/CONTENT.md](docs/CONTENT.md)**, zelf teksten, artikelen en cases toevoegen of aanpassen.
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**, hoe het project in elkaar zit.

## Live componenten bekijken

- `/stijlgids`, alle bouwstenen (kleuren, knoppen, cards, data-viz).
- `/blokken`, de volledige secties (hero, cases, pricing, footer).

## Stack

Astro SSR, Netlify, Tailwind v4 (via tokens), Space Grotesk + Instrument Sans, content collections, PostHog.

## Deploy

`main` deployt automatisch naar productie via Netlify. Werk op een branch, open een PR, check de
deploy-preview, en merge pas na akkoord van de eigenaar.
