---
name: uitleg-website
description: Leg uit hoe deze website in elkaar zit en hoe je 'm zelf beheert. Gebruik bij "/uitleg-website", "hoe werkt deze site", "hoe voeg ik een artikel toe", "waar staan de teksten", "hoe pas ik het logo aan", "waar gaan de formulieren heen", "hoe zet ik de site live", "hoe start ik een preview", of elke vraag van de eigenaar over het beheren van deze site.
---

# Uitleg website

De gebruiker is **de eigenaar van deze site, geen developer**. Leg dus uit in gewone taal, zonder
jargon, en geef altijd de concrete stap of het concrete bestand. Antwoord in het Nederlands.

## Eerst dit

De volledige handleiding staat in [`docs/HANDLEIDING.md`](../../../docs/HANDLEIDING.md). Lees die
voordat je antwoordt, en gebruik de andere docs alleen als de vraag daarom vraagt:

| Vraag gaat over | Lees |
|---|---|
| Alles, eerste kennismaking | `docs/HANDLEIDING.md` |
| Teksten, artikelen, cases, diensten | `docs/CONTENT.md` |
| Kleuren, lettertypes, logo's, bouwstenen | `docs/DESIGN.md` |
| Hoe het technisch in elkaar zit | `docs/ARCHITECTURE.md` |
| Regels en valkuilen | `CLAUDE.md` |

## Wat je bij `/uitleg-website` laat zien

Geef een kort overzicht (geen muur tekst) met deze zes blokken, elk twee of drie zinnen:

1. **Wat dit is**: Astro-site op Netlify. Teksten staan als markdown in `src/content/`, vormgeving
   in een vast designsysteem.
2. **Preview starten**: `npm install` dan `npm run dev`, kijk op http://localhost:4321.
3. **Zelf teksten aanpassen**: artikel of case toevoegen is één markdown-bestand erbij in
   `src/content/blog/` of `src/content/cases/`.
4. **Merk en logo's**: kleuren en fonts in `src/styles/tokens.css`, logo's in `public/`, en de
   social-share-plaatjes worden automatisch gemaakt. Bekijk `/stijlgids` en `/blokken` in de preview.
5. **Formulieren**: gaan naar `netlify/functions/submit-lead.js`, die stuurt elke aanvraag per mail
   en optioneel ook naar een webhook. Ontvanger wijzigen is alleen de env-var `LEAD_EMAIL_TO`.
6. **Live zetten**: werk op een branch, open een pull request, bekijk de Netlify-preview, en merge.
   Merge naar `main` betekent direct live.

Sluit af met: "Waar wil je meer over weten?" en bied aan het meteen samen te doen.

## Hoe je helpt bij een concrete taak

- **Artikel of case toevoegen**: maak het markdown-bestand aan met de juiste frontmatter (schema's
  staan in `src/content.config.ts`), en vertel welke URL het wordt.
- **Tekst wijzigen**: zoek de zin op met grep, pas 'm aan, en zeg op welke pagina het staat.
- **Iets aan de vormgeving**: gebruik bestaande tokens en `.mi-*` bouwstenen. Voeg nooit een los
  kleurtje of lettertype toe; breid het systeem uit en laat het zien in `/stijlgids`.
- **Publiceren**: nooit rechtstreeks naar `main` pushen. Maak een branch, commit, open een pull
  request, en noem de preview-link.

## Harde grenzen (leg uit, doe niet)

- Verander de veldnamen van de formulieren niet (`voornaam`, `email`, `bedrijf`) en haal de
  spamcontroles (honeypot, tijdcontrole) niet weg.
- Zet nooit een API-sleutel of webhook-adres in code die in de browser terechtkomt. Die horen in
  de omgevingsvariabelen van Netlify.
- Commit nooit een `.env`-bestand.
- Merge niet naar `main` zonder dat de eigenaar het gezien heeft; dat is meteen live.
- Controleer altijd `npm run build` voordat je iets voorstelt om te publiceren.
