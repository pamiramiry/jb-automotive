# JB Automotive: Design Rules (read before every change)

Redesigned 2026-10-27 as "The Quiet Workshop" (the user's pick: Quiet Luxury Workshop), then given a shop-floor edition the same day: Mona Sans, graphite and concrete, machine-green Call. The visual system lives in DESIGN.md: read it first. PRODUCT.md holds the product truth; .impeccable/surfaces/index-html.md holds the direction contract. This file keeps the working rules that are not visual.

## Visual (summary; DESIGN.md is the authority)

- One-page site. Vanilla HTML/CSS/JS. No frameworks.
- Graphite (#1B1C1E) and concrete (#ECEAE6) bands with steel greys. One accent, machine green (#6FA383, ink text), used ONLY on Call buttons and the phone call bar (2026-10-27: the user felt the black and white serif look was too 'fine dining'; orange, red and amber are already used on other client sites). Form errors (#FF9F8E) are the only other hue. No colourway switcher.
- Mona Sans everywhere (one variable family): headings condensed and heavy (H1 800 at 75% width, H2 750 at 80%), reading text near normal width, figures condensed bold and tabular. The wordmark is the only uppercase text. Marcellus and Hanken Grotesk were retired 2026-10-27.
- Every photo gets the same muted colour grade (sharp: modulate saturation 0.6, a slight warm recomb (red x1.04, blue x0.93), then linear 1.05 / -6; changed from black and white at the user's request 2026-10-27), one decisive frame per screen, square edges, never under text.
- Structure is 1px hairline rules: no cards, no boxes, no shadows on content. Buttons and fields have 1px corners.
- One solid button in the first viewport (Call); Get a Quote is a text link there.
- Full-bleed hero (2026-10-27, latest user brief, supersedes the banner lines below): photo behind the copy at min(88svh, 760px), graphite shade 0 to 92%, copy anchored bottom, green address eyebrow (the only eyebrow), subhead must NOT repeat "Auto Repair in Mississauga" (verify checks it; the phrase stays in title, H1, meta, alt and schema), Call + green-outline Get a Quote 50/50 on phones, call bar hidden while .hero-stage is in view (IntersectionObserver). The brief's subhead began "Family-run since day one": unconfirmed history, so it says "A family-run shop."
- Hero layout spec (2026-10-27, from the user): banner clamp(180px, 28vh, 260px) desktop / 160px phones; trust row under the buttons with a live open/closed status (America/Toronto, Mon-Fri 8-6); Google badge (gold stars, real 4.7 / 41) linking to the reviews search until the Maps review URL arrives; hero quote about 28% smaller than before, off-white, with a faint green opening quote mark. verify checks the fold at 1366x768, 1440x900, 1920x1080, 1280x800, 1280x720 and 375x667. The spec asked for "Family-run since [YEAR]" and a "[12-month / 12,000 km] warranty": both are unconfirmed, so they are NOT on the site (see OPEN-QUESTIONS.md).
- Hero history (2026-10-27, user asked for cinematic and chose both options): 2.39:1 letterboxed photo with static grain and a vignette, capped by screen height so the Call button stays in the first screen (verify checks 1440x900, 1280x800, 1280x720). A once-only CSS opening (letterbox opens, photo push settles, headline words rise). Then a muted 12s video loop on desktop only, graded like the photos, with a visible Pause/Play button and off-screen pause. This bends the brief's 'no autoplay' rule at the user's explicit request; never autoplay anything else.
- Performance (2026-10-28): the hero must be fully visible on first paint (letterbox, word-rise and copy fade-ins were removed after Lighthouse returned NO_LCP); only a 1.03-to-1 photo settle remains. Never put scroll-behavior: smooth on a scroll-snap container: it animates the initial snap, Chrome treats that as a scroll and stops reporting LCP (verify checks LCP at 412px and 1350px). Content images carry 400 to 1024w copies with srcset/sizes.
- Motion: the photo settle and the odometer are the authored moments. Everything else answers a visitor action (press scale .97, menu, FAQ, form errors). --ease-out and --dur tokens only; animate transform and opacity only; hovers only inside `@media (hover: hover) and (pointer: fine)`; prefers-reduced-motion turns it all off.
- Odometer digit cells are 1.15em tall because main.js moves each strip 1.15em per digit. Change both together or the 7 lands between two numbers.
- Trust section (2026-10-28, user brief): the H2 "Trusted by Mississauga Drivers." is the one H2 without Auto Repair / Mechanic / Car Repair (user's wording; verify allows exactly this one), and "Built on trust" is the second eyebrow and the second uppercase text. The brief asked for "20+ / Years in service / Two decades of automotive experience": unverified, so the row stays ≈20 with Aranka L.'s review as the source.
- No other eyebrow labels above headings, no uppercase tracked labels, no Unicode glyphs as icons, no arrows appended to links, no middle-dot meta strings except the brief's micro-line ("Mon-Fri 8-6 · 922 Dundas St E, Unit 9 · Ask for John.").
- Images: stock only from Unsplash, Pexels or Pixabay (no attribution needed), fresh to this site, no brand logos, plates, readable signage or faces standing in for John or Chris. Log every one in images/IMAGE-SOURCES.md. No credits on the site.

## SEO (unchanged)

- Exact-match phrase "Auto Repair in Mississauga" must appear identically in: title tag, H1, meta description, OG/Twitter tags, hero alt, JSON-LD description. Title = keyword first | brand last. Never reword it.
- Exactly one H1. Every H2 contains "Auto Repair", "Mechanic" or "Car Repair", and most also contain "Mississauga".
- No aggregateRating in schema. The FAQPage JSON-LD is generated from the FAQ HTML: edit the `<details>` blocks, then run `node tools/sync-faq.js`.

## Copy and facts (unchanged)

- The signature offer ("Bring your dealer quote. We'll give you a straight second opinion.") appears in the numbers band, the second opinion, the comparison table, FAQ #1 and the quote section.
- The Call + Get a Quote pair appears at key moments only: hero, second opinion, services, how it works, reviews, plus the big call button by the form.
- Brand line "We tell you what's really wrong. Then we fix it so it stays fixed." appears at the end of John's letter and in the footer (removed from the hero at the user's request 2026-10-27).
- Sticky mobile bottom bar (Call / Quote) always present.
- Name in copy: "JB Automotive". Legal name "JB Automotive Ltd" only in the footer © and JSON-LD legalName.
- Never invent facts. No visible [CONFIRM] placeholders: unconfirmed details are safe defaults or left out, and every one is tracked in OPEN-QUESTIONS.md (not served). Never state a founding year, licence, certification, warranty or price until the shop confirms it. Second-opinion savings and loyalty are customer experiences, never promises. Don't promise walk-ins; closed weekends.
- Keep paraphrases of reviews as close to the review's own words as possible; never add details a review doesn't say.
- Never quote or reference negative reviews. No absolute claims ("every customer", "they all come back").
- No "AI-sounding" copy. No em dashes or en dashes anywhere: not in copy, comments or docs. Write ranges as "Mon-Fri 8-6" or "8 to 6".
- Voice: John talking to a regular at the counter. Specifics over adjectives, honest framing, risk removed.
- Never name a competitor, chain or dealership brand, including inside review excerpts. Never call dealers dishonest.
- Don't state how John and Chris are related unless confirmed. No car-brand logos. Do not mention languages spoken or anyone's heritage.
- Do not reference or copy any other project or previous site.
- Forms: every field has its own error message under it, linked with aria-describedby, checked on blur and on submit; the submit message says how many fields need fixing and focus moves to the first one.

## Working notes

- `node tools/verify.js` (with NODE_PATH pointing at C:/Users/user/node_modules) runs the rendered checks: keyword placement, headings, schema, overflow at 5 widths, contrast, neutral text (green is a Call fill only), dashes, banned words, images, odometer, form, menu, logo link, review row. It must stay green.
- `impeccable detect --json index.html` leaves known, intentional findings: tight leading on display headlines and buttons, and "cramped padding" false positives (sections have 72px to 136px of inset; the hero photo is flush by design).
- Preview with a local server (`npx serve .` or `python -m http.server`), not by opening index.html from disk.
- Internal files kept off the live site by .vercelignore: DESIGN-RULES.md, DESIGN.md, PRODUCT.md, OPEN-QUESTIONS.md, images/*.md, tools/, .impeccable/.
