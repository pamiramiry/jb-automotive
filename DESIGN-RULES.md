# JB Automotive: Design Rules (read before every change)

- One-page site. Vanilla HTML/CSS/JS. No frameworks.
- Direction: "garage at night" with a dark, dark, light rhythm (2026-10-16). Sections marked `.tone-light` (second opinion, symptoms, how it works, about, quote) switch to cream tokens; every other section is dark, alternating --bg and --panel. Cream --paper also appears on the letter from John and the two services work-order sheets, which sit on dark sections. NEVER put text over a photo.
- Four colourways, each a full token set in styles.css (dark tokens on `:root[data-theme]`, light tokens on `.tone-light`): Steel blue is the DEFAULT (set with `<html data-theme="steel">`, chosen by the user 2026-10-16). Brass (gunmetal #121417, cream #F4EFE4, brass fill #D4A24C with ink text), Oxblood (#15110F, cream #F3EEE6, fill #8E2A30 with white text), Navy workwear (#0F1A2E, cream #F5F1E8, brick fill #B4492A with white text, used sparingly), Steel blue (#0F141A, off-white #EEF0F0, fill #346E95 with white text). Rust and the all-dark Brass were removed at the user's request. Each colourway uses one accent only.
- Every colour must come from a token so all four colourways stay complete; never hard-code a hex in a component rule. The bottom-left switcher, the inline theme script in <head> and the switcher block in main.js are PREVIEW ONLY: once the shop picks one, delete them and make the chosen tokens the defaults. Link straight to one with `?theme=brass`, `?theme=oxblood` or `?theme=navy` (no parameter = Steel blue).
- Three accent tokens: `--brass` is the fill (buttons, badge, step markers, banner, tags) and `--on-brass` is the text on it (ink for Brass, white for the others). `--accent` is for text, icons, links and lines: a light shade on dark sections, a darker shade on cream so it holds AA. Never use bright Brass fill as text on cream.
- Brass is never text on the cream paper; on paper, ink carries text, links and focus rings. On dark, brass carries eyebrows, links, icons, stars, numerals and quote marks. Primary CTA = brushed brass pill (gradient over a solid brass base colour) with ink text. Secondary = outlined bone pill.
- Fonts locked: Bitter (headings, pull-quotes), Work Sans (body/UI). Headings in title/sentence case, never uppercase H2s.
- Radius 6px on images, panels and buttons (squared, signage-like). No pill buttons, no glossy gradients, no glows. Shadows only where a paper sheet lifts off the page.
- Anti-template: no split hero with a text panel beside a photo, no uniform card grids, no review carousel, no sticky numbered list, no 4-column comparison table, no icon "blurb" cards anywhere.
- Signature elements stay: work-order sheets (perforated edge, "No. 922"), brass rubber stamp badge, ruled-paper letter from John, brass quote marks, odometer numbers (digits roll up on scroll-in; final values shown instantly under reduced motion; real values kept in .sr-only).
- Images: stock only from Unsplash, Pexels or Pixabay (no attribution needed), fresh to this site, warm light, no brand logos, plates or other businesses' signage, every one logged in images/IMAGE-SOURCES.md. Shop and people photos stay as placeholders until the client sends real ones. No credits shown on the site.
- Exact-match phrase "Auto Repair in Mississauga" must appear identically (same words, same order) in: title tag, H1, first sentence, meta description, OG/Twitter tags, hero alt, JSON-LD description. Title = keyword first | brand last. Never reword it.
- Exactly one H1.
- Every H2 contains "Auto Repair", "Mechanic" or "Car Repair", and most also contain "Mississauga". Never rewrite H2s to drop the keyword.
- The signature offer appears in the hero, trust ribbon, dealer comparison, FAQ #1 and pre-footer banner.
- The CTA pair (Call + Get a Quote) appears only at key moments: hero, second opinion, services, reviews, how it works, plus the big call button on the quote ticket. Other sections end with a plain text call line or nothing (loosened 2026-10-16 so the page reads hand-built, not templated).
- Eyebrow labels on at most 3 or 4 sections (now: hero, second opinion, symptoms), set as an italic Bitter line, never the uppercase-with-bar template label. Keep uppercase letter-spaced text to the work-order headers only.
- Headings are left-aligned. Body copy uses --body (brighter than --muted); --muted is for secondary text only.
- Sticky mobile bottom bar (Call / Quote) always present.
- Name in copy: "JB Automotive". Legal name "JB Automotive Ltd" only in the footer © and JSON-LD legalName.
- Never invent facts. Unknowns use a highlighted [CONFIRM] placeholder. Second-opinion savings and long-time loyalty are customer experiences, never promises. Don't promise walk-ins; closed weekends.
- Never quote or reference negative reviews. No absolute claims ("every customer", "they all come back").
- No "AI-sounding" copy (see banned phrase list in the build prompt). No em dashes or en dashes anywhere: not in copy, comments or docs. Write ranges as "Mon-Fri 8-6" or "8 to 6".
- Brand line "We tell you what's really wrong. Then we fix it so it stays fixed." appears under the hero CTAs, at the end of the Note from the shop, and in the footer.
- Copy follows the section 4b voice + persuasion playbook: John's voice, specifics over adjectives, honest framing, risk removed. If a paragraph could sit on any other shop's site unchanged, rewrite it.
- Never name a competitor, chain or dealership brand, including inside review excerpts. Never call dealers dishonest.
- Don't state how John and Chris are related unless confirmed.
- No car-brand logos. Text only.
- No aggregateRating in schema.
- Do not mention languages spoken or anyone's heritage.
- Do not reference or copy any other project or previous site.

## Working notes

- Section backgrounds, top to bottom: hero dark, ribbon panel, second opinion LIGHT, letter section panel (cream letter), services dark (cream sheets), symptoms LIGHT, reviews dark, comparison panel, how it works LIGHT, family panel, numbers dark, about LIGHT, area dark, FAQ panel, quote ticket LIGHT, offer banner fill, footer deep. Classes: .bg-dark / .bg-panel, .tone-light, .paper.
- The FAQPage JSON-LD is generated from the FAQ HTML. Edit the `<details>` blocks, then run `node tools/sync-faq.js`.
- `node tools/verify.js` runs the rendered checks (contrast and the accent-on-paper rule run in both colourways) (keyword placement, headings, schema, overflow at 5 widths, contrast, dashes, banned words, images, form). It must stay green.
- Preview with a local server (`npx serve .` or `python -m http.server`), not by opening index.html from disk.
