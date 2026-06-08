# Tucson Honey Badgers — Project Context

*Last updated: June 6, 2026. This is the living context document for the Honey Badgers website project. Update it as decisions are made.*

## What this is

Website for **Tucson Honey Badgers Basketball**, an independent youth **club** basketball team in Tucson, AZ — powered by (sponsored by) **Tucson Badger Electric (TBE)**. Domain: **tucsonhoneybadgers.com**, hosted on **Vercel**. Instagram: **@tuchoneybadgers**.

**IMPORTANT (2026-06-06): NOT an AAU team.** All AAU references were removed from the site — never describe the team as AAU. The old `/aau-basketball-tucson.html` URL 301-redirects to `/club-basketball-tucson.html` via `vercel.json`; the html file itself was deleted by Jose (2026-06-07).

Site goals, in order: (1) hype/brand showcase, (2) schedule & roster hub, (3) recruit players via tryouts, (4) tie visibly to TBE as sponsor, (5) give guidance for the kids (the Badger Code).

## Brand & design

- **Theme:** heavy honey/honeycomb. Hex-grid textures, honey-drip dividers, hexagon accents, golden honey (#f7a900) on near-black (#0a0a0a), cream (#f4ecd8).
- **Type:** Anton (display), Barlow Condensed (UI/labels), Inter (body).
- **Voice:** "Honey Badger Don't Care," "Tucson Tough," "Protect The Hive," "Pound For Pound."
- **Logos (in this folder, exact filenames matter — case-sensitive on Vercel):**
  - `Badger-on-Badge.PNG` — fierce badger-head shield crest → nav logo, favicon, schema.org logo
  - `Badger-and-Text-NO-OUTLINE.PNG` — full lockup (head + wordmark + claws) → homepage hero, og:image on all pages
  - `Text-ONLY-NO-PAWS-NO-OUTLINE.PNG` — clean wordmark → footer on all pages
  - `Text-ONLY.PNG` — wordmark with claws → unused; reserved for merch/banners
- **RULE: never invent/generate mascot art for this brand.** Only Jose's real logo files.

## Site structure (10 pages + shared assets)

| File | Purpose / SEO target |
|---|---|
| `index.html` | Home — "youth club basketball Tucson"; SportsTeam schema |
| `program.html` | The program — training, season structure |
| `badger-code.html` | The Badger Code — 6 rules of guidance for the kids |
| `schedule.html` | Games & tournaments; SportsEvent schema (sample data) |
| `roster.html` | Players + coaches (placeholder cards) |
| `tryouts.html` | Tryout info + form + FAQ; FAQPage schema |
| `club-basketball-tucson.html` | SEO landing — "club basketball Tucson" (old aau-…html redirects here) |
| `youth-basketball-tucson.html` | SEO landing — parent's guide, "youth basketball Tucson" |
| `sponsor.html` | TBE sponsorship story + become-a-sponsor pitch |
| `contact.html` | Contact form + IG; Organization schema |
| `styles.css` | Shared theme (single stylesheet for all pages) |
| `robots.txt`, `sitemap.xml` | SEO infrastructure |

All pages: unique title/description, canonical, Open Graph + Twitter cards, breadcrumbs + BreadcrumbList schema (subpages), favicon, Vercel Analytics snippet.

## Deploy & operations

- Deploys to Vercel; site confirmed live and working (mobile menu verified 2026-06-06).
- **CACHE-BUST RULE:** every time `styles.css` changes, bump the `?v=` stamp in the stylesheet `<link>` on ALL pages (currently `?v=20260606d`). CDN + phones cache CSS hard; without the bump, deploys won't visibly update.
- **TBE links:** "Powered by Tucson Badger Electric" (homepage hero) and "Visit TBE" (homepage sponsor band) link to `https://tucsonbadgerelectric.com` — **UNCONFIRMED URL, Jose must verify** (single find-replace if different).
- **Interactive Code lessons:** Badger Code tiles on homepage + badger-code.html expand on click/Enter (aria-expanded, keyboard accessible) revealing a short life lesson + weekly "try this" challenge per rule.
- Homepage hero CTAs: Join the Pack (tryouts) / Support the Pack (sponsor) / Live the Code (code page).
- **TBE logo = `Badger.png`** (red/black badger in honeycomb hard hat, "Tucson Badger Electric LLC") — wired 2026-06-07 into all 3 TBE spots: homepage sponsor band, sponsor-wall founding-sponsor card, sponsor page hex spot. Each img has an onerror fallback to the dashed placeholder if the file is ever missing.
- Vercel **Web Analytics**: snippet (`/_vercel/insights/script.js`) on all 10 pages; must be enabled in Vercel dashboard → project → Analytics. Only collects on the deployed site (404s locally — normal).
- After domain is pointed: submit `sitemap.xml` in Google Search Console.

## Forms system (built 2026-06-06)

Six forms, all wired to Formspree with hidden `form-type` field to tell them apart in the inbox, honeypot spam field, and redirect to `thanks.html`:

| Form | Page | form-type |
|---|---|---|
| Tryout request (intake) | `tryouts.html` + `index.html` | tryout |
| Contact | `contact.html` | contact |
| Player bio (families, parent+player together) | `player-bio.html` — **INVITE-ONLY** (unlisted + code gate, see below) | player-bio |
| Coach bio | `coach-bio.html` — **INVITE-ONLY** (same) | coach-bio |

**Invite gate (added 2026-06-06):** bio forms are hidden behind a team-code gate. Invite links with `?key=CODE` unlock automatically; the code can also be typed manually. Codes are verified as SHA-256 hashes in page source (plaintext codes never appear in deployed code) and the entered code rides along in each submission (`invite-code` field) so fakes are obvious. Codes are intentionally NOT written in this file — Jose has them; ask him or check the assistant's private memory. To rotate a code: pick a new one, hash it (SHA-256, uppercase input), replace the HASH constant in the page script. Note: the gate is a strong filter, not bank-grade security — appropriate for keeping forms invite-only, and unknown submissions can simply be ignored. `crypto.subtle` requires HTTPS, so test the gate on the deployed site, not by opening the file locally. CONTEXT.md itself is excluded from deploys via `.vercelignore`.
| Back the Pack (sponsors/supporters) | `sponsor.html#back-the-pack` | sponsor |

Player bio form includes: display-name preference (first name + last initial default for minors), media-release consent checkbox (required), Badger Code alignment question, "reach out and we'll talk it through together — parent and player both involved" note. Photos are collected SEPARATELY (Jose handles) — forms say so explicitly.

**TO ACTIVATE (waiting on Jose):** Jose is getting the team "badger email" address. Once he has it: (1) create free Formspree account with that email, (2) create a form, copy its ID, (3) find-and-replace `YOUR_FORM_ID` across all HTML files (6 form tags in 6 files). Submissions then land in the badger inbox. Until then, forms show but submissions go nowhere.

**Flow for profiles:** bio forms come in by email → build public player/coach profile pages from them → roster cards link to profiles (click a player card → player page). Profiles use display-name preference; first name + last initial is the default for minors.

## Backlog

1. **Activate forms:** badger email → Formspree ID → replace `YOUR_FORM_ID` (see Forms system above).
2. **Player/coach profile pages:** as bios arrive, build profile pages and link roster cards to them.
3. **Real content drops** (slots are built and labeled, swap-in ready):
   - Team/action photo (homepage About hex spot)
   - Player headshots, names, numbers (roster cards)
   - Coach names + bios (roster page)
   - Real schedule dates/venues (replace sample games + SportsEvent schema)
   - TBE logo (sponsor band hex spot on homepage + sponsor page)
   - Real TBE website URL ("Visit TBE" buttons currently href="#")
4. **Vercel Speed Insights** (optional) — add `/_vercel/speed-insights/script.js` to all pages.
5. **og-image** (optional) — purpose-built 1200×630 social card instead of the raw lockup PNG.
6. **Instagram feed integration** (later) — surface @tuchoneybadgers posts on the site.

## Decision log

- Jose likes the current layout; iterate visually, don't restructure without asking.
- Hand-drawn/AI mascot art was rejected — real logos only (provided 2026-06-06).
- Honeycomb/honey theming direction confirmed by Jose ("honey combs or actual honey and spots to put the logos").
- Badger Code exists because the site "has to give guidance for the kids to follow."
- Domain choice: tucsonhoneybadgers.com (own domain, not a TBE subpath).

## Related

- Sister project: Tucson Badger Electric website + quote app (same owner, badger brand family, also on Vercel).
