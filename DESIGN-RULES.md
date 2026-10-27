# JB Automotive: Design Rules (read before every change)

Redesigned 2026-10-27 as "The Quiet Workshop" (the user's pick: Quiet Luxury Workshop). The visual system lives in DESIGN.md: read it first. PRODUCT.md holds the product truth; .impeccable/surfaces/index-html.md holds the direction contract. This file keeps the working rules that are not visual.

## Visual (summary; DESIGN.md is the authority)

- One-page site. Vanilla HTML/CSS/JS. No frameworks.
- Black and white bands, two greys, no accent colour. The only hue is the form error red (#FF9F8E). No colourway switcher.
- Marcellus for headings and customer quotes; Hanken Grotesk for reading, controls and every number (Marcellus's old-style figures clip in the odometer and look odd in phone numbers).
- Every photo is black and white (grayscale, then sharp linear 1.08 / -8), one decisive frame per screen, square edges, never under text.
- Structure is 1px hairline rules: no cards, no boxes, no shadows on content. Buttons are near-square (2px).
- One solid button in the first viewport (Call); Get a Quote is a text link there.
- Motion: the odometer is the one authored moment. Everything else answers a visitor action (press scale .97, menu, FAQ, form errors). --ease-out and --dur tokens only; animate transform and opacity only; hovers only inside `@media (hover: hover) and (pointer: fine)`; prefers-reduced-motion turns it all off.
- Odometer digit cells are 1.15em tall because main.js moves each strip 1.15em per digit. Change both together or the 7 lands between two numbers.
- No eyebrow labels above headings, no uppercase tracked labels, no Unicode glyphs as icons, no arrows appended to links, no middle-dot meta strings except the brief's micro-line ("Mon-Fri 8-6 · 922 Dundas St E, Unit 9 · Ask for John.").
- Images: stock only from Unsplash, Pexels or Pixabay (no attribution needed), fresh to this site, no brand logos, plates, readable signage or faces standing in for John or Chris. Log every one in images/IMAGE-SOURCES.md. No credits on the site.

## SEO (unchanged)

- Exact-match phrase "Auto Repair in Mississauga" must appear identically in: title tag, H1, first sentence, meta description, OG/Twitter tags, hero alt, JSON-LD description. Title = keyword first | brand last. Never reword it.
- Exactly one H1. Every H2 contains "Auto Repair", "Mechanic" or "Car Repair", and most also contain "Mississauga".
- No aggregateRating in schema. The FAQPage JSON-LD is generated from the FAQ HTML: edit the `<details>` blocks, then run `node tools/sync-faq.js`.

## Copy and facts (unchanged)

- The signature offer ("Bring your dealer quote. We'll give you a straight second opinion.") appears in the numbers band, the second opinion, the comparison table, FAQ #1 and the quote section.
- The Call + Get a Quote pair appears at key moments only: hero, second opinion, services, how it works, reviews, plus the big call button by the form.
- Brand line "We tell you what's really wrong. Then we fix it so it stays fixed." appears under the hero actions, at the end of John's letter, and in the footer.
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

- `node tools/verify.js` (with NODE_PATH pointing at C:/Users/user/node_modules) runs the rendered checks: keyword placement, headings, schema, overflow at 5 widths, contrast, no accent colour, dashes, banned words, images, odometer, form, menu, logo link, review row. It must stay green.
- `impeccable detect --json index.html` leaves known, intentional findings: tight leading on display headlines and buttons, and "cramped padding" false positives (sections have 72px to 136px of inset; the hero photo is flush by design).
- Preview with a local server (`npx serve .` or `python -m http.server`), not by opening index.html from disk.
- Internal files kept off the live site by .vercelignore: DESIGN-RULES.md, DESIGN.md, PRODUCT.md, OPEN-QUESTIONS.md, images/*.md, tools/, .impeccable/.
