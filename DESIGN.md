---
name: JB Automotive
description: The quiet workshop. Graphite and concrete, condensed shop lettering, muted colour photographs, one machine-green Call button.
colors:
  graphite: "#1B1C1E"
  concrete: "#ECEAE6"
  shop-white: "#F4F3F0"
  ink: "#141517"
  steel-grey: "#A7A5A0"
  slate-grey: "#5B5A56"
  pale-steel: "#D6D4CF"
  graphite-text: "#2D2E30"
  fog: "#E2DFD9"
  char: "#26272A"
  hairline-light: "#D1CDC6"
  machine-green: "#6FA383"
  machine-green-deep: "#5E9273"
  error-coral: "#FF9F8E"
typography:
  display:
    fontFamily: "Mona Sans, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.2rem + 5.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 75"
  headline:
    fontFamily: "Mona Sans, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.6vw, 3.5rem)"
    fontWeight: 750
    lineHeight: 1.04
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 80"
  title:
    fontFamily: "Mona Sans, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 1.15rem + 0.5vw, 1.6rem)"
    fontWeight: 700
    lineHeight: 1.28
    fontVariation: "\"wdth\" 88"
  quote:
    fontFamily: "Mona Sans, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 1.05rem + 1.5vw, 2.35rem)"
    fontWeight: 500
    lineHeight: 1.35
    fontVariation: "\"wdth\" 96"
  body:
    fontFamily: "Mona Sans, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Mona Sans, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    letterSpacing: "0.01em"
    fontVariation: "\"wdth\" 92"
  figures:
    fontFamily: "Mona Sans, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 2rem + 6vw, 6.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontFeature: "\"tnum\" 1, \"lnum\" 1"
    fontVariation: "\"wdth\" 75"
rounded:
  hair: "1px"
spacing:
  gutter-phone: "20px"
  gutter: "40px"
  section: "clamp(72px, 9vw, 136px)"
  group: "clamp(64px, 8vw, 112px)"
  max-width: "1240px"
components:
  button-call:
    backgroundColor: "{colors.machine-green}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hair}"
    padding: "14px 26px"
    height: "52px"
  button-call-hover:
    backgroundColor: "{colors.machine-green-deep}"
  button-line:
    textColor: "{colors.shop-white}"
    rounded: "{rounded.hair}"
    padding: "14px 26px"
    height: "52px"
  input-on-graphite:
    backgroundColor: "{colors.char}"
    textColor: "{colors.shop-white}"
    rounded: "{rounded.hair}"
    padding: "12px 14px"
    height: "50px"
---

# Design System: JB Automotive

## Overview

**Creative North Star: "The Quiet Workshop"**

A family repair shop presented with the calm of a high-end service house, but built from the materials of a real workshop: graphite and concrete grounds, condensed lettering like the labels on a tool case or the headings in a service manual, and photographs of hands at work. Trust comes from restraint and specifics. The page does not shout about honesty; customers' own words carry the argument.

The page alternates graphite and concrete bands, each holding one idea with room around it. Photography is the only texture and most of the warmth: every photo carries the same muted colour grade (about 60% saturation, a slightly warm cast, a touch of shadow depth). The interface has exactly one colour, machine green (the grey-green of lathes and old toolboxes), and it only ever appears on the Call action.

Motion has two authored moments: the hero opening (the letterbox opens from the centre, the photo settles from a slow push-in, the headline words rise in turn), and the odometer digits rolling into place. On desktop a muted, graded video loop then fades in behind the hero, with a visible pause button. Everything else answers a visitor's own action.

**Key Characteristics:**
- Graphite and concrete bands, steel greys, one machine-green accent for Call only.
- Mona Sans throughout: condensed and heavy for headings, near normal width for reading.
- Muted colour photography (about 60% saturation, slightly warm), square-edged, never under text.
- A cinematic 2.39:1 hero with static film grain and a soft vignette.
- Hairline rules (1px) are the only structure: no cards, no boxes, no shadows on content.

## Colors

Workshop neutrals with one working colour.

### Primary
- **Machine Green** (#6FA383): the Call button and the phone call bar, always with Ink text (5.9:1). Hover deepens to Machine Green Deep (#5E9273). Never text, never decoration.

### Neutral
- **Graphite** (#1B1C1E): dark bands, header, footer.
- **Concrete** (#ECEAE6): light bands.
- **Shop White** (#F4F3F0): headings and quotes on graphite.
- **Ink** (#141517): headings on concrete and text on the green button.
- **Pale Steel** (#D6D4CF) / **Graphite Text** (#2D2E30): body text on graphite / on concrete.
- **Steel Grey** (#A7A5A0) / **Slate Grey** (#5B5A56): secondary text on graphite / on concrete.
- **Char** (#26272A) / **Fog** (#E2DFD9): quiet surfaces (fields, odometer cells) on graphite / on concrete.
- **Hairline** (white at 14% on graphite; #D1CDC6 on concrete): every rule and divider.

### Functional
- **Error Coral** (#FF9F8E): form errors only, on graphite.

### Named Rules
**The One Working Colour Rule.** Machine green means "call the shop". The only other places it appears are two quiet hero signals the user asked for (2026-10-27): the faint opening quotation mark on the hero review (55% opacity) and the "Open now" status dot. The Google badge stars are Google gold (#FBBC04), the only non-neutral colour outside photos and errors.

**The Two Grounds Rule.** Bands alternate graphite and concrete, never two of the same tone side by side, except the quote band and the footer, which a hairline separates. Components read their colours from the band.

## Typography

**Font:** Mona Sans (one variable family, widths 75 to 125%, weights 400 to 800), with Arial Narrow and the system sans as fallbacks.

**Character:** condensed, heavy headings feel like shop signage and manual headings; the same family at normal width keeps reading easy, so the page has one voice.

### Hierarchy
- **Display** (800, width 75%, clamp 2.6rem to 6rem, 0.98): the single H1. Wraps rather than overflowing if the font is slow to load.
- **Headline** (750, width 80%, clamp 2rem to 3.5rem, 1.04): section headings, max 20ch.
- **Title** (700, width 88%, clamp 1.3rem to 1.6rem, 1.28): sub-headings, step titles, FAQ questions; statement lines (the hook, the offer, the comparison close) use 700 at 88%.
- **Quote** (500, width 96%, clamp 1.45rem to 2.35rem, 1.35): customer quotes.
- **Body** (400, normal width, 17px, 1.65): reading text, max 64ch.
- **Label** (700, width 92%, 14 to 15px): buttons, captions, table row labels. Sentence case.
- **Figures** (700, width 75%, tabular lining): odometer stats, step numbers, phone numbers.
- **Wordmark** ("JB AUTOMOTIVE", 800, width 75%, uppercase, 0.04em tracking): the only uppercase text.

### Named Rules
**The Shop Lettering Rule.** Headings are condensed and heavy; reading text is not. Never set paragraphs or quotes below 92% width.

## Layout

A centred container (max 1240px) with a 20px gutter on phones and 40px from 768px. Bands have 72px to 136px of vertical space. Inside a band the common pattern is a two-up split from 900px: heading or lead on the left, supporting text on the right. Groups are separated by 64px to 112px, often with a hairline above.

The hero photo is 2.39:1 on desktop and 4:3 on phones, capped by the screen height so the headline and the Call button stay in the first screen on laptops from 1280x720 up. Full-width photo bands run edge to edge. Below 1024px the navigation moves into a menu and a fixed bottom bar carries Call Now (green) and Get a Quote.

## Elevation & Depth

Flat. Depth comes from the two grounds and from photography. The only depth effects are the hero's film grain and vignette and the inner fade on odometer cells.

### Named Rules
**The Hairline Rule.** Structure is 1px rules. No cards, no boxed panels, no drop shadows.

## Shapes

Square-edged photographs. Buttons, fields and odometer cells have a 1px corner: effectively square, like machined parts. Lists, tables and steps are open, with rules between rows.

## Components

### Buttons
- **Call:** machine green with Ink text, Mona Sans 700 at 92% width, 52px tall, with the phone icon.
- **Line:** transparent with a 1px border in the band's text colour, same size. Used for Get a Quote.
- **Text link:** in the first viewport, Get a Quote is an underlined link beside the Call button.
- **States:** press scales to 0.97; hover (mouse only) deepens the green or fills the line button; 2px focus outline in the band's text colour.

### Inputs / Fields
- **Style:** Char fill, 1px border at 30% white, 1px corners, 50px tall, 16px text, labels above.
- **Error:** Error Coral message under the field and a 2px Error Coral border, linked with aria-describedby.

### Navigation
- **Desktop:** the uppercase condensed wordmark left, four steel-grey links, then the phone number after a hairline.
- **Phone:** wordmark, phone icon and a two-line menu icon that cross-fades to an X; the menu opens as a graphite panel with condensed links. A fixed bottom bar carries Call Now (green) and Get a Quote.

### Cinematic hero (signature)
Full-bleed (user brief, 2026-10-27, replaces the banner described next): the photo fills the hero behind the copy, min(88svh, 760px) tall, under a graphite shade that runs from clear at the top to 92% at the bottom. Copy is anchored to the bottom: a small green address eyebrow ("922 Dundas St E · Mississauga"), the H1 at clamp(2.6rem, 11vw, 4.5rem) / 0.95, a 1.05rem subhead (max 34ch) that does not repeat the keyword, then Call (green fill) and Get a Quote (green outline) side by side, 50/50 on phones, then the trust row. The review sits bottom-right over the photo from 1280px and under the photo below that. Phones get a 3:4 portrait crop. The phone call bar stays hidden while the hero is on screen. This is the one place text sits over a photograph and the one eyebrow on the page.

Earlier banner version: A short cinematic banner: clamp(180px, 28vh, 260px) tall from 768px, 160px on phones, so the headline, subcopy, Call button and trust row all fit in the first screen of a 1366x768 laptop. The pause button sits vertically centred on the right. Under the Call button, a trust row (live open/closed status in shop time, Family-run shop, Same mechanics every visit); in the right column, a Google rating badge (4.7, 41 reviews) above a smaller testimonial quote. Static film grain at 14% (overlay) and a soft radial vignette sit over the photo, never over text. The opening plays once on load (about 2 seconds, then holds still). On desktop only, a 12-second muted video loop fades in over the photo after the opening, pauses when scrolled away, and has a small round Pause/Play button (44px, label kept for screen readers). Phones, reduced motion and data-saver visitors keep the still photo.

### Odometer (signature)
Stats roll into place like a dashboard counter when the band scrolls into view: one 1.15em cell per digit on a quiet surface with an inner fade, digits in Mona Sans 700 at 75% width with tabular figures, the rightmost wheel first. Reduced motion shows the final values.

### Review row
The featured review is a full-width quote. The rest sit in a swipeable row under a 1px rule in the band's text colour, with arrow buttons that step one review at a time. No autoplay.

## Do's and Don'ts

### Do:
- **Do** give every photograph the same muted colour grade (saturation 0.6, a slight warm cast, linear 1.05 / -6) and each screen one decisive frame.
- **Do** alternate graphite and concrete bands, and let components read their colours from the band.
- **Do** set headings condensed and heavy, and reading text near normal width.
- **Do** keep the Call button inside the first screen.

### Don't:
- **Don't** use machine green for anything but Call actions.
- **Don't** put text over a photograph.
- **Don't** box content into cards or add drop shadows; use hairline rules.
- **Don't** add eyebrow labels above headings or uppercase labels (the wordmark is the only uppercase).
- **Don't** add scroll-triggered fade-ins to sections; the hero opening and the odometer are the only authored moments.
- **Don't** autoplay any other media, and never ship the hero video without its pause button.
