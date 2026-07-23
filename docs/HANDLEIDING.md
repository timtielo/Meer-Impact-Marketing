# Handleiding, voor de eigenaar van de site

Deze site is gebouwd door Tielo Digital en draait op jouw eigen repo. Je kunt zelf teksten,
artikelen en cases aanpassen, ook zonder programmeerkennis. Deze handleiding legt uit hoe alles
in elkaar zit en wat je beter niet aanraakt.

Snel iets weten? Vraag het Claude Code met **`/uitleg-website`**.

---

## 1. Wat is dit voor site

Een Astro-website die op Netlify draait. In gewone taal:

- De teksten van artikelen, cases en diensten staan als losse **markdown-bestanden** in de map
  `src/content/`. Eén bestand erbij is één pagina erbij.
- De vormgeving zit in een **designsysteem** (kleuren, lettertypes, knoppen, kaarten). Dat is één
  vaste set bouwstenen, zodat de site overal hetzelfde oogt.
- De formulieren gaan via een klein stukje servercode naar jouw mailbox.

## 2. De site lokaal bekijken (preview)

Je hebt eenmalig Node.js nodig (nodejs.org, de LTS-versie). Daarna in de map van het project:

```bash
npm install
npm run dev
```

Open dan **http://localhost:4321** in je browser. Wijzigingen die je opslaat zie je meteen.
Stoppen doe je met `Ctrl + C` in hetzelfde venster.

Voordat je iets deelt of live zet, controleer altijd of het bouwt:

```bash
npm run build
```

Geen foutmelding betekent dat de site het doet.

## 3. Teksten en pagina's aanpassen

### Artikel toevoegen (kennisbank)
Maak een bestand in `src/content/blog/`, bijvoorbeeld `mijn-artikel.md`:

```markdown
---
title: "Titel van het artikel"
description: "Eén zin die samenvat waar het over gaat."
category: "Instructie"
publishDate: 2026-07-23
author: "Lars"
draft: false
---

Je tekst hier.
```

Zet `draft: true` zolang je nog schrijft. De pagina, het overzicht en de zoekfunctie regelen zichzelf.

### Case toevoegen
Zelfde principe in `src/content/cases/`. De velden staan uitgelegd in
[CONTENT.md](CONTENT.md). Belangrijk: het veld `service` koppelt de case aan een dienst, zodat
dienst en case naar elkaar verwijzen.

> De cases die er nu staan zijn **voorbeelden met verzonnen cijfers**. Vervang die door echte
> resultaten voordat de site live gaat.

### Dienst aanpassen
Diensten staan in `src/content/services/`. Pas de samenvatting of de tekst aan; het overzicht en
de detailpagina volgen automatisch.

### Vaste pagina's
Home, contact en dergelijke staan in `src/pages/`. Zoek de zin op en pas 'm aan, of vraag Claude
Code: "pas op de homepage de zin X aan naar Y".

## 4. Merk, logo's en beeld

Alles wat met vormgeving te maken heeft staat op één plek. Zie [DESIGN.md](DESIGN.md) voor het
volledige overzicht. In het kort:

- **Kleuren en lettertypes**: `src/styles/tokens.css`. Oranje `#f2600c` is de actiekleur en wordt
  bewust spaarzaam gebruikt. Diep navy `#0b1f3a` draagt de structuur, blauw hoort bij cijfers en
  grafieken. Lettertypes zijn Space Grotesk (koppen en cijfers) en Instrument Sans (tekst).
- **Bouwstenen** (knoppen, kaarten, formulieren, grafiek-elementen): `src/styles/system.css`.
- **Logo's** staan in `public/`:
  - `logo-horizontal.png`, het echte logo met transparante achtergrond, voor lichte vlakken.
  - `logo-horizontal-white.png`, de witte versie voor donkere vlakken zoals de footer.
- **Favicon** (het icoontje in het browsertabblad) is de hexagon-mark, in alle formaten aanwezig
  plus `site.webmanifest`.
- **Social-share-plaatjes (OG-images)** worden automatisch gemaakt: elke pagina, elk artikel en elke
  case krijgt zijn eigen plaatje met het echte logo en de paginatitel. Daar hoef je niks voor te doen.

Wil je de vormgeving zelf bekijken? Start de preview en ga naar **`/stijlgids`** (alle bouwstenen)
en **`/blokken`** (alle paginasecties).

## 5. Formulieren en e-mail

Alle formulieren gaan naar hetzelfde stukje servercode: `netlify/functions/submit-lead.js`.

Wat er gebeurt als iemand het formulier invult:

1. De aanvraag wordt gecontroleerd (verplichte velden, geldig e-mailadres, plus een verborgen
   veld en een tijdcontrole die spambots tegenhouden).
2. Je krijgt **altijd een e-mail** met alle ingevulde gegevens. Antwoorden gaat rechtstreeks naar
   de aanvrager, want de reply-to staat op zijn adres.
3. **Optioneel**: staat er een webhook ingesteld, dan gaat de aanvraag ook daarheen (bijvoorbeeld
   naar Make, Zapier of een CRM). Staat die niet ingesteld, dan slaat 'ie die stap gewoon over.

De e-mail is bewust het zekere pad: die blijft werken zonder dat er een extra dienst onderhouden
wordt. Lukt het versturen niet, dan krijgt de bezoeker een foutmelding zodat hij het opnieuw kan
proberen. Een aanvraag verdwijnt dus niet stilletjes.

### Instellingen (env-vars)

Deze staan in Netlify onder de omgevingsvariabelen, niet in de code:

| Naam | Wat het is |
|---|---|
| `RESEND_API_KEY` | sleutel van de mailverzender (Resend) |
| `LEAD_EMAIL_TO` | het adres dat de aanvragen ontvangt |
| `LEAD_EMAIL_FROM` | de afzender, nu `leads@mail.tielo-digital.nl` |
| `MAKE_ANALYSE_WEBHOOK` | optioneel, laat leeg als je geen webhook gebruikt |
| `MAKE_GUIDE_WEBHOOK` | optioneel |
| `PUBLIC_POSTHOG_KEY` | statistieken |

**Wil je de aanvragen naar een ander adres?** Verander alleen `LEAD_EMAIL_TO`. Geen code nodig.

**Wil je later je eigen mailaccount gebruiken?** Verifieer je domein in je eigen Resend-account en
vervang `RESEND_API_KEY` en `LEAD_EMAIL_FROM`. Ook dan verandert er niets aan de code.

## 6. Wat je beter niet aanpast

Deze dingen zijn zo gebouwd om een reden. Wil je er toch aan, overleg dan even.

1. **De formulier-backend.** Verander de veldnamen (`voornaam`, `email`, `bedrijf`) niet, en haal de
   spamcontroles niet weg. Zet nooit een webhook-adres of sleutel in code die in de browser terechtkomt.
2. **Sleutels en wachtwoorden.** Die horen alleen in de omgevingsvariabelen, nooit in de repo. Het
   bestand `.env` mag je nooit meesturen naar GitHub.
3. **Het designsysteem.** Voeg geen losse kleurtjes of lettertypes toe. Gebruik de bestaande
   bouwstenen, of vraag om een nieuwe die netjes in het systeem past.
4. **Eén hoofdkop per pagina.** Belangrijk voor Google.

## 7. De site live zetten

De site staat nu nog niet live op deze nieuwe versie. Wat er moet gebeuren:

1. De omgevingsvariabelen invullen in Netlify (zie hierboven).
2. De voorbeeldcases vervangen door echte cijfers.
3. De resterende pagina's afmaken (contact, aanvraagformulieren, algemene voorwaarden en privacy).
4. De automatische bouw op Netlify werkend maken (zie hieronder, dit is nu nog een knelpunt).
5. Pas daarna de nieuwe versie samenvoegen met `main`. Netlify zet dan automatisch live.

De huidige live site blijft ondertussen gewoon draaien; er verandert pas iets bij stap 5.

## 8. Mag ik zelf pushen en live zetten?

Kort: **ja, met een tussenstap.**

Zo werkt het: elke wijziging die in de hoofdtak (`main`) belandt, wordt door Netlify automatisch
live gezet. Dat is handig, maar ook riskant: een foutje staat meteen op de echte site.

Daarom de afspraak:

- Je werkt in een **aparte tak** (branch), niet direct in `main`.
- Je opent een **pull request**. Netlify maakt daar automatisch een testversie van met een eigen
  link, zodat je je wijziging kunt bekijken voordat iemand hem ziet.
- Ziet het er goed uit, dan wordt de pull request samengevoegd en gaat het live.

Claude Code kan die hele flow voor je doen; vraag gewoon: "zet dit op een branch en open een pull
request".

---

Vragen? Start Claude Code in deze map en typ **`/uitleg-website`**.
