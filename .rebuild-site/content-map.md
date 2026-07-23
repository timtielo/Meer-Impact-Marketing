# Content Map — Meer Impact Marketing

Bron: `timtielo/Meer-Impact-Marketing` (Vite/React SPA + Contentful), branch `backup-vite-react`.
Doel: faithful rebuild naar Astro SSR op het Ad Manager designsysteem, met de nieuwe scope
(Meekijksessie, kennisbank + zoek, cases, nichepagina's).

## Navigatie
- Logo: Meer Impact Marketing (hexagon MI + wordmark). `/logo-horizontal.png` (transparant).
- Nav-links (nieuw): Diensten (dropdown), Cases, Kennisbank, Over ons.
- Oud (ter referentie): Gratis Guide · Marketing Analyse · Succesverhalen · Diensten ▾ · Blog · Contact.
- CTA: "Gratis analyse" (was "Contact").

## Brand (gekozen: Ad Manager)
- Primair: oranje `#f2600c` (actie). Diep navy `#0b1f3a` (ink/structuur). Data-blauw `#2563eb`.
- Canvas `#eef1f6`, surface `#ffffff`. Functioneel groen/rood/amber voor deltas & states.
- Font: Space Grotesk (display + cijfers) × Instrument Sans (body).
- Logo-kleuren: navy `#253d77` + khaki `#BCBA87` (mark). Site leidt met oranje (bewust).

## Pagina's

### Home — `/`
1. Hero: "Adverteren dat je terugziet in je agenda" + live dashboard-paneel + gratis-analyse CTA + trust (Google 4,9).
2. Logo/trust-strip (marquee).
3. Stats-band (navy, count-up): ROAS, leads/mnd, klanten, kosten/lead.
4. Diensten (bento): Meta Ads (hoofd), Meekijksessie, SEO, Email, Copywriting.
5. Uitgelichte case (results-banner + voor/na + quote).
6. Case-grid (link → dienst).
7. Testimonials (featured + wall, met Google/Werkspot-logo).
8. Kennisbank-teaser + zoek.
9. Pricing (Starter/Groei/Schaal).
10. CTA-band (navy) + footer.
> Oud: Hero, MetricsDashboard, MarketingChoices ("de meest gemaakte marketingkeuzes"), Differentiators (Garantie/Resultaat/Flexibiliteit/Specialisatie), Testimonials. Behouden waar sterk.

### Diensten-overzicht — `/diensten`
Grid van diensten met link naar detailpagina + gekoppelde case.

### Dienst-detail (collectie `services`) — `/diensten/[slug]`
- `meta-ads` (hoofddienst, oud: MetaAds.tsx — pixel-setup, platforms, proces)
- `meekijksessie` (NIEUW — done-with-you: pixel/campagnes zelf leren opzetten)
- `seo` (NIEUW als eigen dienstpagina)
- `email-marketing`, `copywriting`, `social-media-management` (oud)
Elke dienst: hero, wat/waarom, aanpak/proces, gekoppelde case(s), CTA. `Service` schema.

### Cases (collectie `cases`) — `/cases` + `/cases/[slug]`
NIEUW. Overzicht + detail (results-banner, voor/na, story, quote). Bidirectioneel gelinkt aan diensten.
Placeholder-cijfers tot Lars echte data levert.

### Kennisbank (collectie `blog`) — `/kennisbank` + `/kennisbank/[slug]`
Was: Blog (Contentful, 2 posts). Migreren naar markdown-collectie. Instructie/how-to focus + zoek (Pagefind).
Artikel-header met scroll-progress, auteur, gerelateerde posts.

### Nichepagina's (programmatisch) — `/[niche]` of `/meta-ads-voor-[niche]`
NIEUW, structuur nu klaarzetten (data-driven), later vullen. Bijv. "voor personal trainers / sportscholen / coaches".

### Lead-funnels
- `/gratis-guide` (+ `/gratis-guide-bedankt`) — form `guide` → Make.
- `/marketing-analyse` (+ `/marketing-analyse-bedankt`) — form `analyse` → Make.
- Ad-landers zonder header/footer: `/guide`, `/marketing` (voor Meta-campagnes).

### Overig
- `/contact` — form + gegevens.
- `/privacy`, `/voorwaarden` — juridisch.
- `/kaartje` (oud `/visitekaartje` + success) — QR-review-landing, form `visitekaartje` → Make.

## Backend (1:1 behouden)
- `netlify/functions/submit-lead.js` — proxy naar Make. Forms: `analyse` (voornaam/email/bedrijf),
  `guide` (voornaam/email), `visitekaartje` (voornaam/email). Honeypot `_hp` + timing `_ts` 2500ms + `_form`-router.
- Env: `MAKE_ANALYSE_WEBHOOK`, `MAKE_GUIDE_WEBHOOK` (server-only).
- PostHog via `/ph`-proxy, cookieless EU.

## Assets
- Logo: `/logo-horizontal.png` (transparant), `/logo-horizontal-white.png` (reversed), favicon-set uit de mark.
- Oude foto's: grotendeels Unsplash-URLs in de React-code (geen eigen fotografie). Placeholders (`.mi-ph`)
  tot Lars echte beeld levert. OG-image nog te genereren.
- Blog-beeld: stond in Contentful; bij migratie los ophalen of vervangen.

## Legacy URL's en redirects (kritiek voor livegang)

Alles wat vandaag live staat moet blijven werken. Status:

| Oude URL | Nieuw | Status |
|---|---|---|
| `/diensten`, `/diensten/meta-ads`, `/email-marketing`, `/copywriting`, `/social-media-management` | zelfde URL | ✅ gebouwd |
| `/blog`, `/blog/:slug` | `/kennisbank`, `/kennisbank/:slug` | ✅ redirect 301 in `netlify.toml` |
| `/testimonials` | `/cases` | ✅ redirect 301 |
| `/contact` | zelfde URL | ❌ nog bouwen |
| `/marketing-analyse` + `/marketing-analyse-bedankt` | zelfde URL | ❌ nog bouwen |
| `/gratis-guide` + `/gratis-guide-bedankt` | zelfde URL | ❌ nog bouwen |
| `/guide`, `/marketing` (ad-landers zonder header/footer) | zelfde URL | ❌ nog bouwen, **staan onder Meta-advertenties** |
| `/privacy`, `/voorwaarden` | zelfde URL | ❌ nog bouwen |
| `/visitekaartje`, `/visitekaartje-success` | zelfde URL aanhouden (QR op gedrukte kaartjes) | ❌ nog bouwen |

De pagina's zonder redirect houden bewust hun oude adres, dus die hoeven alleen gebouwd te worden.
**Niet live zetten zolang hier nog een ❌ staat**, anders breken bestaande links en advertenties.
`/visitekaartje` niet hernoemen: die URL staat op gedrukte visitekaartjes.

Een eigen 404-pagina staat er (`src/pages/404.astro`) met doorverwijzingen naar diensten, cases en
de kennisbank, zodat een verdwaalde bezoeker niet doodloopt.

## Migratie-volgorde
1. Homepage (op designsysteem). 2. Content collections (services, cases, blog) + config. 3. Diensten + cases + kennisbank + zoek. 4. Funnels + ad-landers + backend-wiring. 5. Contact/juridisch/kaartje. 6. Nichepagina-structuur. 7. SEO (astro-seo + schema + sitemap + llms.txt) + PostHog. 8. /oplever-check.
