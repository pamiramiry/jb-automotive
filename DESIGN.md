---
name: JB Automotive
description: Quiet luxury workshop. Black and white bands, muted colour photographs, customers' words set large.
colors:
  carbon-black: "#000000"
  gallery-white: "#FFFFFF"
  ash-grey: "#A3A39E"
  slate-grey: "#5C5C57"
  pale-steel: "#D4D4CF"
  graphite-ink: "#2B2B28"
  fog: "#F3F3F0"
  char: "#141414"
  hairline-light: "#E2E1DC"
  error-coral: "#FF9F8E"
typography:
  display:
    fontFamily: "Marcellus, Times New Roman, serif"
    fontSize: "clamp(2.6rem, 1.2rem + 5.6vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Marcellus, Times New Roman, serif"
    fontSize: "clamp(2rem, 1.3rem + 2.6vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Marcellus, Times New Roman, serif"
    fontSize: "clamp(1.3rem, 1.15rem + 0.5vw, 1.6rem)"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "0.02em"
  figures:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 2rem + 6vw, 6.5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontFeature: "\"tnum\" 1, \"lnum\" 1"
rounded:
  hair: "2px"
spacing:
  gutter-phone: "20px"
  gutter: "40px"
  section: "clamp(72px, 9vw, 136px)"
  group: "clamp(64px, 8vw, 112px)"
  max-width: "1240px"
components:
  button-solid-on-black:
    backgroundColor: "{colors.gallery-white}"
    textColor: "{colors.carbon-black}"
    rounded: "{rounded.hair}"
    padding: "14px 26px"
    height: "52px"
  button-solid-on-white:
    backgroundColor: "{colors.carbon-black}"
    textColor: "{colors.gallery-white}"
    rounded: "{rounded.hair}"
    padding: "14px 26px"
    height: "52px"
  button-line:
    textColor: "{colors.gallery-white}"
    rounded: "{rounded.hair}"
    padding: "14px 26px"
    height: "52px"
  input-on-black:
    backgroundColor: "{colors.char}"
    textColor: "{colors.gallery-white}"
    rounded: "{rounded.hair}"
    padding: "12px 14px"
    height: "50px"
---

# Design System: JB Automotive

## Overview

**Creative North Star: "The Quiet Workshop"**

A family repair shop presented the way a high-end service house presents itself: silence, black and white, and nothing on the page that is not doing a job. Trust comes from restraint. The shop does not shout about honesty; the page is calm enough that customers' own words, set large in a flared serif, carry the argument.

The page alternates full black and full white bands. Each band holds one idea, set wide, with a lot of empty space around it. Photography is the only texture and the only warmth: every photo carries the same muted colour grade (about 60% saturation, a slightly warm cast, a touch of shadow depth), and each screen gets at most one decisive frame, either full width or cropped beside text. The interface itself has no accent colour; emphasis comes from size, the serif, and white on black.

Motion has two authored moments: the hero opening (the letterbox opens from the centre, the photo settles from a slow push-in, the headline words rise in turn), and the odometer digits rolling into place. On desktop a muted, graded video loop then fades in behind the hero, with a visible pause button. Everything else answers a visitor's own action (a button press, the menu, an FAQ answer, a form error).

**Key Characteristics:**
- True black and white bands, two greys, no accent colour.
- Marcellus for every heading and every customer quote; Hanken Grotesk for reading and controls.
- Muted colour photography (about 60% saturation, slightly warm), square-edged, never under text.
- A cinematic 2.39:1 hero with static film grain and a soft vignette.
- Hairline rules (1px) are the only structure: no cards, no boxes, no shadows on content.
- Buttons are near-square solid blocks (2px corners).

## Colors

A monochrome palette: two grounds, two greys per ground for hierarchy, and one functional error colour.

### Neutral
- **Carbon Black** (#000000): the ground of the dark bands, the header, the footer and the phone call bar. Also the solid button on white bands.
- **Gallery White** (#FFFFFF): the ground of the light bands; headings, quotes and the solid button on black bands.
- **Pale Steel** (#D4D4CF): body text on black.
- **Graphite Ink** (#2B2B28): body text on white.
- **Ash Grey** (#A3A39E): secondary text on black (labels, captions, the dealer column), 8.0:1.
- **Slate Grey** (#5C5C57): secondary text on white, 6.7:1.
- **Char** (#141414): quiet surfaces on black (form fields, odometer cells).
- **Fog** (#F3F3F0): quiet surfaces on white (odometer cells).
- **Hairline** (white at 16% on black; #E2E1DC on white): every rule and divider.

### Functional
- **Error Coral** (#FF9F8E): form error messages and the invalid field's border only, on black. It is the one hue on the site and only appears when something needs fixing.

### Named Rules
**The No Accent Rule.** Nothing in the interface is coloured except form errors; the photographs carry the only warmth. Emphasis is size, the serif, or white on black.

**The Two Grounds Rule.** Bands alternate full black and full white, never two of the same tone side by side, except the quote band and the footer, which a hairline separates. Every component reads its colours from the band it sits in.

## Typography

**Display Font:** Marcellus (with Times New Roman, serif)
**Body Font:** Hanken Grotesk (with system-ui, sans-serif)

**Character:** Marcellus has flared, engraved-plaque strokes: formal without being stiff, like lettering on a service-house door. Hanken Grotesk is plain and quiet, so the serif carries all the personality.

### Hierarchy
- **Display** (400, clamp 2.6rem to 6rem, 1.02): the single H1, one line on desktop.
- **Headline** (400, clamp 2rem to 3.5rem, 1.1): section headings, max 20ch.
- **Title** (400, clamp 1.3rem to 1.6rem, 1.25): sub-headings, step titles, FAQ questions, the offer line.
- **Quote** (Marcellus 400, clamp 1.45rem to 2.35rem, 1.35): customer quotes set as display text, max 34ch.
- **Body** (Hanken 400, 17px, 1.65): reading text, max 64ch.
- **Label** (Hanken 600, 14 to 15px): captions, buttons, table row labels. Sentence case, never uppercase.
- **Figures** (Hanken 400, clamp 3.5rem to 6.5rem, tabular lining figures): the odometer stats, step numbers, phone numbers.

### Named Rules
**The Lining Figures Rule.** Marcellus has old-style figures (the 7 and 9 drop below the line). Any number that must read cleanly (stats, steps, phone numbers) is set in Hanken Grotesk with tabular lining figures.

**The Serif Speaks Rule.** Headings and customers' words use the serif; everything a visitor operates uses the sans.

## Layout

A centred container (max 1240px) with a 20px gutter on phones and 40px from 768px. Bands have generous vertical space (72px to 136px). Inside a band, the common pattern is a two-up split from 900px: a heading or lead on the left, supporting text on the right, aligned to the bottom edge. Groups inside a band are separated by 64px to 112px, often with a hairline above.

Full-width photo bands break the container edge to edge. Below 1024px the navigation moves into a menu and a two-button call bar (Call Now, Get a Quote) is fixed to the bottom of the screen.

## Elevation & Depth

Flat. Depth comes from the black and white bands and from photography, never from shadows on content. The only shadow-like effect is the inner fade on odometer cells, which sells the rolling wheel.

### Named Rules
**The Hairline Rule.** Structure is 1px rules. No cards, no boxed panels, no drop shadows.

## Shapes

Square-edged photographs with no rounding. Buttons, fields and the odometer cells have a 2px corner, just enough to stop them looking sharp. Lists, tables and steps are open: rules between rows, no containers.

## Components

### Buttons
- **Shape:** near-square (2px).
- **Solid:** the band's opposite colour (white on black, black on white), Hanken 600 15px, 52px tall. Used for Call (905) 276-2732, always with the phone icon.
- **Line:** transparent with a 1px border in the band's text colour, same size. Used for Get a Quote.
- **Text link:** in the first viewport, Get a Quote is a plain underlined link beside the solid Call button, so there is one button above the fold.
- **States:** press scales to 0.97 (140ms); hover (mouse only) greys the solid fill or fills the line button; 2px focus outline in the band's text colour.

### Inputs / Fields
- **Style:** Char fill, 1px border at 30% white, 2px corners, 50px tall, 16px text. Labels sit above in Hanken 600 14px.
- **Focus:** 2px white outline.
- **Error:** Error Coral message under the field, 2px Error Coral border, linked with aria-describedby.

### Navigation
- **Desktop:** wordmark ("JB Automotive" in Marcellus) left, four grey sans links, then the phone number after a hairline.
- **Phone:** wordmark, phone icon, and a two-line menu icon that cross-fades to an X; the menu opens as a black panel with Marcellus links. A fixed bottom bar carries Call Now (white) and Get a Quote (black).

### Odometer (signature)
Stats roll into place like a car odometer when the band scrolls into view: one 1.15em cell per digit on a quiet surface with an inner fade, digits in Hanken tabular figures, the rightmost wheel first. Reduced motion shows the final values.

### Cinematic hero (signature)
A letterboxed 2.39:1 photo on desktop (4:3 on phones), capped by the screen height so the headline and Call button stay in the first screen. Static film grain at 14% (overlay) and a soft radial vignette sit over the photo, never over text. The opening plays once on load (about 2 seconds, then holds still). On desktop only, a 12-second muted video loop fades in over the photo after the opening, pauses when scrolled away, and has a visible Pause/Play button. Phones, reduced motion and data-saver visitors keep the still photo.

### Review row
The featured review is a full-width Marcellus quote. The rest sit in a swipeable row: each review is an open column under a 1px rule in the band's text colour, with arrow buttons that step one review at a time. No autoplay.

## Do's and Don'ts

### Do:
- **Do** give every photograph the same muted colour grade (saturation 0.6, a slight warm cast, linear 1.05 / -6) and each screen one decisive frame.
- **Do** alternate black and white bands, and let components read their colours from the band.
- **Do** set customer quotes large in Marcellus; they are the page's evidence.
- **Do** use Hanken tabular lining figures for every number that has to read cleanly.
- **Do** keep one solid button in the first viewport (Call), with Get a Quote as a text link.

### Don't:
- **Don't** add an accent colour, a gradient or a tint to the interface; colour lives in the photographs and the form error only.
- **Don't** put text over a photograph.
- **Don't** box content into cards or add drop shadows; use hairline rules.
- **Don't** add eyebrow labels above headings or uppercase tracked labels.
- **Don't** use Marcellus for numbers in stats or phone numbers.
- **Don't** add scroll-triggered fade-ins to sections; the hero opening and the odometer are the only authored moments.
- **Don't** autoplay any other media, and never ship the hero video without its pause button.
