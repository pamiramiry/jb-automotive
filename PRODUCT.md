# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: drivers in Mississauga, mostly the east end (Applewood, Dixie, Cooksville, Mississauga Valleys, Lakeview, Rockwood Village) and some from Etobicoke, who have never heard of JB Automotive and arrive from a Google search for a mechanic or auto repair. They are usually on a phone, often with a specific worry: a warning light, a noise, a dealer quote they don't trust, or an older car they want to keep running. They are deciding in seconds whether this shop looks trustworthy enough to call (confirmed 2026-10-27: "mostly new Google searchers").

Secondary: John, who will decide whether to adopt the site (this is a sales preview built for the shop).

## Product Purpose

A one-page website for JB Automotive, a family-owned and family-run auto repair shop. Its job is to turn a stranger from search into a phone call to (905) 276-2732, or a quote request, by making the shop's honesty and experience credible fast. Success is a call or a submitted quote form.

## Positioning

The shop tells customers what is really wrong and fixes it so it stays fixed. The proof is customers' own words: second opinions that saved a customer from dealer upsells more than once, an older discontinued car (a Nissan Juke) kept on the road, customers who have stayed for almost 20 years, and one who drives across the city so that John and Chris do the work. You talk to the people who fix the car, and you hear the price before any work starts.

## Operating Context

- Shop: JB Automotive (legal name JB Automotive Ltd), 922 Dundas St E, Unit 9, Mississauga, ON L4Y 2B6, inside a multi-unit building.
- Phone: (905) 276-2732. Hours: Monday to Friday, 8:00 AM to 6:00 PM. Closed Saturday and Sunday.
- People customers ask for by name: John and Chris. Their roles beyond "fixing the car" and how they are related are not confirmed.
- How a visit works: call and describe the problem (bring any quote from elsewhere), the shop finds what's wrong and gives the price, the customer approves before work starts, and anything that can wait is said to wait.

## Capabilities and Constraints

- Confirmed by reviews and the listing: general repair and maintenance, engine diagnostics, batteries, second opinions on quotes.
- Listed as safe defaults, unconfirmed: brakes, steering and suspension, cooling, electrical, A/C, exhaust, oil changes, tune-ups, timing and drive belts, seasonal tire changeovers, pre-purchase inspections. Tracked in OPEN-QUESTIONS.md.
- Must not be claimed until confirmed: year founded or years in business, licensed safety inspections (MVIS), warranty terms, prices or labour rates, walk-ins, weekend hours, after-hours key drop.
- SEO: the exact phrase "Auto Repair in Mississauga" must appear identically in the title (keyword first, brand last), the single H1, the first sentence, the meta description, OG/Twitter tags, the hero image alt text and the JSON-LD description. Every H2 contains "Auto Repair", "Mechanic" or "Car Repair". AutoRepair and FAQPage JSON-LD; no aggregateRating.
- Static HTML/CSS/JS, deployed on Vercel from github.com/pamiramiry/jb-automotive. The quote form has no endpoint yet (shows an inline confirmation).
- Kept through the 2026-10-27 redesign at the user's request: the rolling odometer stats and the quote form.

## Brand Commitments

- Name in copy is "JB Automotive", never "JB Auto" or "JB's". "JB Automotive Ltd" only in the footer copyright and JSON-LD legalName.
- Brand line: "We tell you what's really wrong. Then we fix it so it stays fixed."
- Signature offer (safe default, unconfirmed): "Bring your dealer quote. We'll give you a straight second opinion."
- Voice: John talking to a regular at the counter. Plain, warm, specific, second person, short sentences.
- Never: name a competitor, chain or dealership brand; call dealers dishonest; quote or reference negative reviews; make absolute claims ("every customer"); mention languages spoken or anyone's heritage; state how John and Chris are related; use em or en dashes anywhere.

## Evidence on Hand

- Google: 4.7 stars from 41 reviews. Real review excerpts (verbatim, trimmed with an ellipsis) from Elyia M., Empire Organizing and Cleaning Services, Chris K., Joe C., Aranka L., Jason M., Gerald M., Alana F., plus short ones ("Great honest service", "Honest and reliable service.", "Simply the best", "Amazing").
- Photos: licensed Pexels stock only (logged in images/IMAGE-SOURCES.md). No real photos of the shop, John or Chris yet; they will come later. Stock must never show faces presented as John or Chris, brand badges, plates or other businesses' signage.
- No logo file exists. No founding year, certifications, warranty or prices exist; never fabricate them.

## Product Principles

1. Earn trust in the first screen: the shop's honesty and the phone number before anything else.
2. Proof over adjectives: customers' own words and specifics carry every claim.
3. Remove risk: what's wrong and the price come before any work, and nothing extra happens without the customer's OK.
4. One clear action: calling John. Everything else supports it.
5. Say nothing the shop hasn't confirmed.

## Accessibility & Inclusion

WCAG 2.1 AA: text contrast, visible keyboard focus, labelled form fields with inline errors, 44px touch targets, prefers-reduced-motion respected, no horizontal scroll from 360px up.
