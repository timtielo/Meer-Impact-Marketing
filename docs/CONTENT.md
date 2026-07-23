# Content bewerken

De meeste tekst leeft als **markdown** in `src/content/`. Je hebt geen code nodig om een artikel of
case toe te voegen: maak een nieuw bestand aan met de juiste kop (frontmatter) en het verschijnt vanzelf.

## Kennisbank-artikel toevoegen

Maak `src/content/blog/mijn-artikel.md`:

```markdown
---
title: "Zo zet je de Meta Pixel goed op"
description: "Stap voor stap, zonder technische kennis."
category: "Instructie"        # Instructie | Strategie | SEO | Meta Ads
publishDate: 2026-07-22
author: "Lars"
draft: false                  # true = nog niet zichtbaar
---

Je tekst hier. Gewone markdown: **vet**, koppen met ##, lijsten met -, links met [tekst](url).
```

De site maakt automatisch de pagina `/kennisbank/mijn-artikel`, toont 'm in het overzicht en in de
zoekfunctie. Zet `draft: true` zolang je nog schrijft.

## Case toevoegen

Maak `src/content/cases/pt-studio-amsterdam.md`:

```markdown
---
client: "PT Studio Amsterdam"
segment: "Personal training"
service: "meta-ads"           # koppelt aan de dienst met deze slug
metric: "+312% leads"         # het grote cijfer op de kaart
summary: "Van 12 naar 50 aanvragen per maand."
results:                      # de cijfer-banner op de casepagina
  - label: "leads"
    value: "+312%"
  - label: "kosten per lead"
    value: "€3,20"
  - label: "ROAS"
    value: "4,1×"
before: "12 aanvragen per maand"
after: "50 aanvragen per maand"
quote: "Eindelijk marketing die gewoon leads oplevert."
quoteBy: "Mark de Vries, eigenaar"
source: "google"              # google | werkspot
rating: "5,0"
featured: true                # true = op de homepage
publishDate: 2026-07-22
---

Het verhaal van de case (uitdaging, aanpak, resultaat) in markdown.
```

De case verschijnt op `/cases`, op `/cases/pt-studio-amsterdam`, en is gekoppeld aan de dienst
(dienst → case en case → dienst). Vervang de voorbeeldcijfers door echte resultaten.

## Dienst aanpassen

Diensten staan in `src/content/services/` (bijv. `meta-ads.md`). Pas `summary`, `tagline` of de
body aan; de detailpagina en het overzicht updaten mee.

## Tekst op een vaste pagina

Home, contact, over ons enz. staan in `src/pages/`. Zoek de zin op en pas 'm aan. Twijfel je? Vraag
Claude Code: "pas de tekst X op de homepage aan naar Y" en houd je aan de guardrails in `CLAUDE.md`.

## Beeld

Zet afbeeldingen in `public/images/` en verwijs ernaar met `/images/bestand.jpg`. Tot er echte
fotografie is, gebruikt de site nette placeholders.
