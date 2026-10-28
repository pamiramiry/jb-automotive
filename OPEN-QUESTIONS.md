# Open questions for JB Automotive (internal, not served on the site)

The preview ships without any visible [CONFIRM] placeholders (user request, 2026-10-16). Below is what was filled in as a safe default, what was removed because it would be an invented fact, and what is still hidden in the code. Check each one with the shop before launch.

## Filled in as safe defaults (confirm or correct)
- **Signature offer**, shown in 5 places: "Bring your dealer quote. We'll give you a straight second opinion." Backed by reviews, but the shop should approve it as their headline offer.
- **Services list:** brakes, steering and suspension, cooling, electrical, A/C, exhaust, oil changes, tune-ups, timing and drive belts, seasonal tire changeovers, second opinions, pre-purchase inspections. Only diagnostics, batteries and general repair are confirmed by reviews. Remove any they don't do.
- **Appointments:** "Call first and we'll tell you when to bring it in." No walk-ins promised.
- **Weekend FAQ:** "open Monday to Friday, 8 to 6, so you can drop the car off before work."
- **Diagnostic fee FAQ:** "Ask when you call. Either way, you'll know what the diagnosis costs before we start." Replace with their actual policy.
- **Second opinion FAQ:** says yes, with no mention of a fee.
- **Makes:** "Everyday cars and older ones, including models that aren't made anymore." Add specific makes if they want.
- **How to find Unit 9:** "Can't spot us? Call and we'll talk you in." Replace with real directions (parking, back entrance, signage).
- **People:** John (diagnosis, repairs, the straight answer) and Chris (repairs and service). Not stated: owner title, how they're related, other staff.
- **Letter from John:** written in John's voice. He should read and approve it.
- **Rating:** 4.7 from 41 Google reviews is shown. Confirm they're happy showing the number.
- **Service area:** Applewood, Dixie, Cooksville, Mississauga Valleys, Lakeview, Rockwood Village, Etobicoke.
- **"Get a Quote" button wording.**
- **Reviews button** links to a Google search for the shop. Swap for their direct Google Business Profile link.
- **"The quote had six things on it. Your car needed two."** is an illustrative line, not a real case.

## Removed (would have been invented facts)
- **Year founded / years in business:** not shown anywhere (the stamp was retired in the 2026-10-27 redesign; the numbers row has 3 stats). Add back once known.
- **Founding story** sentence in About.
- **Safety inspections:** service row and FAQ removed. Only add back if they are a licensed Motor Vehicle Inspection Station.
- **Warranty FAQ:** removed. Add back with their real terms.
- **After-hours key drop:** removed.
- **Nearest major intersection:** removed from the service area line.
- **Dealer labour rate figure:** never added; the comparison says "Dealer labour rates" only.

## Still hidden in the code (not visible on the page)
- **Domain:** `CONFIRM-domain` in canonical, og:url, og:image, JSON-LD, robots.txt and sitemap.xml. Replace with the real domain.
- **Latitude / longitude:** geo meta tags and JSON-LD `geo` removed until the exact coordinates are confirmed (see the TODO comment in index.html).
- **Form endpoint:** the quote form shows a success message but doesn't send anywhere yet (`TODO: connect form endpoint`).
- **Shop photos:** the redesign shows no placeholder boxes. Three swap slots wait in HTML comments (John at the counter, John and Chris, the Unit 9 entrance); see images/IMAGE-LIST.md. The old video slot was dropped in the redesign.

- Numbers band: a fourth stat would be strongest as years in business ("Since 19XX"). Ask the shop. The third stat says almost 20 years because Aranka L.'s review says "almost 20 years": do not change it to 20+ unless a customer or the shop confirms more than 20.
- Hero trust row: the user's spec wanted "Family-run since [YEAR]" and a "[12-month / 12,000 km] warranty". Ask the shop for the founding year and their actual warranty terms; until then the row says "Family-run shop" and "Same mechanics every visit". Also confirm there are no Saturday hours (the spec's placeholder said Sat 9-2; everything we know says closed weekends).
- Google badge link: swap the reviews search URL for the shop's direct Google Maps reviews link.
