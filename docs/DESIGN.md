# Designsysteem, "Ad Manager"

De hele site deelt één taal: die van een advertentie-dashboard. Afleesbare cijfers, KPI-tegels,
sparklines en delta-chips. Oranje voor actie, navy voor structuur, blauw voor data.

**Bekijk het live:** `/stijlgids` (bouwstenen) en `/blokken` (secties).

## Kleuren (`src/styles/tokens.css`)

| Rol | Token | Hex |
|---|---|---|
| Actie / primair | `--mi-orange` | `#f2600c` |
| Actie hover | `--mi-orange-strong` | `#d24e08` |
| Ink / navy | `--mi-ink` | `#0b1f3a` |
| Tekst secundair | `--mi-muted` | `#5b6b82` |
| Data / grafieken | `--mi-blue` | `#2563eb` |
| Canvas (achtergrond) | `--mi-canvas` | `#eef1f6` |
| Surface (cards) | `--mi-surface` | `#ffffff` |
| Positief / negatief | `--mi-up` / `--mi-down` | `#16a34a` / `#dc2626` |

**Regel:** oranje is schaars. Alleen voor de primaire CTA, actieve staten en de belangrijkste cijfers.
Meer dan ~10% oranje in beeld en het voelt niet meer premium.

## Typografie

- **Space Grotesk** (`--font-display`), koppen en cijfers. Cijfers altijd tabulair (`.mi-num`).
- **Instrument Sans** (`--font-body`), bodytekst en UI.
- Schaal via tokens: `--fs-display`, `--fs-h1` … `--fs-caption`. Nooit een losse `font-size` in px.

## Componenten (`src/styles/system.css`)

Alles is class-based met de prefix `.mi-`. De belangrijkste:

- Knoppen: `.mi-btn` + `--primary` / `--secondary` / `--ghost` / `--link`, maten `--sm` / `--lg`.
- Labels: `.mi-badge`, `.mi-tag` (`--blue`/`--ink`), `.mi-pill`, `.mi-live`, `.mi-delta` (`--up`/`--down`).
- Formulieren: `.mi-field`, `.mi-input`, `.mi-select`, `.mi-textarea`, `.mi-search`, `.mi-check`.
- Cards: `.mi-card` (+ `--hover` / `--feature`), `.mi-stat`, `.mi-svc`, `.mi-case`, `.mi-panel` (dashboard).
- Data-viz: `.mi-kpis`, `.mi-chart` + `.mi-spark`, `.mi-meter`.
- Navigatie: `.mi-navbar` (+ `.mi-drop` dropdown), `.mi-sitefooter`, `.mi-breadcrumb`, `.mi-acc` (FAQ).
- Feedback: `.mi-alert` (`--info`/`--success`/`--warn`/`--error`), `.mi-toast`, `.mi-empty`.

Section-blokken (hero, stat-band, cases, blog, testimonials, pricing, CTA) staan in `src/styles/sections.css`
met de prefix `.mi-hero`, `.mi-statband`, `.mi-casefeat`, `.mi-plans`, `.mi-cta`, enz.

## Beweging (`src/scripts/enhance.js`)

Progressive enhancement, altijd `prefers-reduced-motion`-veilig:
count-up op cijfers (`data-count`), reveal-on-scroll (`.mi-reveal` in `[data-stagger]`), navbar
transparant→solid, mega-dropdown (hover + klik + Escape), mobiel menu, scroll-progress, magnetic CTA.
Hover: `.mi-lift`, `.mi-glow`, `.mi-arrowp` + `.mi-arrow`, `.mi-zoom`.

## Signatuur

Het herkenningspunt is de **data-viz-taal**: het dashboard-paneel in de hero, KPI-tegels met
delta-chips, sparklines en doelgroep-pills. Zet de lef daar; houd de rest rustig en strak.

## Wijzigen

Nieuwe kleur/stijl nodig? Voeg een **token** toe in `tokens.css` en een class in `system.css`,
en toon het in `/stijlgids`. Nooit een los kleurtje of eenmalig component in een pagina hardcoden.
