// Rendered quality checks for the JB Automotive preview.
// Usage: node tools/verify.js   (needs puppeteer; on this machine it lives in C:/Users/user/node_modules)
// Every check prints PASS or FAIL. Exit code 1 if anything fails.
const fs = require("fs");
const path = require("path");
const http = require("http");
const puppeteer = require("puppeteer");

const ROOT = path.join(__dirname, "..");
const PHRASE = "Auto Repair in Mississauga";
const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find((p) => fs.existsSync(p));

let fails = 0;
const check = (ok, label, detail = "") => {
  if (!ok) fails++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? "  " + detail : ""}`);
};

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".webp": "image/webp", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain" };
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  const file = path.join(ROOT, url === "/" ? "index.html" : url);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    if (d.name === "node_modules" || d.name.startsWith(".")) return [];
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

(async () => {
  await new Promise((r) => server.listen(0, r));
  const base = `http://127.0.0.1:${server.address().port}/`;
  const browser = await puppeteer.launch({ headless: true, executablePath: CHROME, protocolTimeout: 120000 });
  const page = await browser.newPage();
  // Keep the run offline and fast: block third-party requests (fonts, map).
  await page.setRequestInterception(true);
  page.on("request", (r) => (r.url().startsWith(base) || r.url().startsWith("data:") ? r.continue() : r.abort()));
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(base, { waitUntil: "load" });

  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

  // ---- 1. Exact-match phrase placement
  console.log("\n# Exact-match phrase");
  const meta = await page.evaluate(() => {
    const m = (sel) => (document.querySelector(sel) || {}).content || "";
    const h1 = document.querySelectorAll("h1");
    let first = h1[0] && h1[0].nextElementSibling;
    while (first && first.tagName !== "P") first = first.nextElementSibling;
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent);
    return {
      title: document.title, h1count: h1.length, h1: h1[0] ? h1[0].textContent.trim() : "",
      first: first ? first.textContent.trim() : "",
      desc: m('meta[name="description"]'), ogt: m('meta[property="og:title"]'), ogd: m('meta[property="og:description"]'),
      twt: m('meta[name="twitter:title"]'), twd: m('meta[name="twitter:description"]'),
      heroAlt: document.querySelector(".hero-media img").alt, ld,
      finalH2: document.getElementById("quote-title").textContent.trim(),
    };
  });
  check(meta.title === `${PHRASE} | JB Automotive`, "title tag", JSON.stringify(meta.title));
  check(meta.h1count === 1, "exactly one H1", String(meta.h1count));
  check(meta.h1 === PHRASE, "H1 text", JSON.stringify(meta.h1));
  check(meta.first.startsWith(PHRASE + ","), "first sentence after H1 starts with phrase");
  check(meta.desc.startsWith(PHRASE + "."), "meta description starts with phrase");
  check(meta.ogt === meta.title && meta.twt === meta.title, "og:title and twitter:title equal title");
  check(meta.ogd === meta.desc && meta.twd === meta.desc, "og:description and twitter:description equal meta description");
  check(meta.heroAlt.startsWith(PHRASE), "hero alt contains phrase", JSON.stringify(meta.heroAlt));
  check(meta.finalH2 === `Book ${PHRASE}`, "final CTA H2", JSON.stringify(meta.finalH2));

  // ---- 2. JSON-LD
  console.log("\n# Structured data");
  let biz, faq;
  try {
    const parsed = meta.ld.map((t) => JSON.parse(t));
    biz = parsed.find((o) => o["@type"] === "AutoRepair");
    faq = parsed.find((o) => o["@type"] === "FAQPage");
    check(true, `all ${parsed.length} JSON-LD blocks parse`);
  } catch (e) { check(false, "JSON-LD parses", e.message); }
  check(biz && biz.description === meta.desc, "AutoRepair description equals meta description");
  check(biz && biz.name === "JB Automotive" && biz.legalName === "JB Automotive Ltd", "name and legalName");
  check(biz && biz.address.streetAddress === "922 Dundas St E, Unit 9" && biz.priceRange === "$$", "address and priceRange");
  check(biz && biz.openingHoursSpecification[0].opens === "08:00" && biz.openingHoursSpecification[0].closes === "18:00" && biz.openingHoursSpecification[0].dayOfWeek.length === 5, "opening hours Mo-Fr 08:00-18:00");
  check(!/aggregateRating/i.test(html), "no aggregateRating anywhere");
  const domFaq = await page.evaluate(() => [...document.querySelectorAll(".faq details")].map((d) => ({
    q: d.querySelector("summary").textContent.replace(/\s+/g, " ").trim(),
    a: d.querySelector(".faq-a").textContent.replace(/\s+/g, " ").trim(),
  })));
  const faqMatch = faq && faq.mainEntity.length === domFaq.length && faq.mainEntity.every((q, i) => q.name === domFaq[i].q && q.acceptedAnswer.text === domFaq[i].a);
  check(faqMatch, `FAQPage schema matches visible FAQ 1:1 (${domFaq.length} questions)`);
  check(domFaq[0] && /cost/i.test(domFaq[0].q), "cost question is first");

  // ---- 3. Headings
  console.log("\n# Headings");
  const h2s = await page.evaluate(() => [...document.querySelectorAll("h2")].map((h) => h.textContent.trim()));
  const kw = h2s.filter((t) => /Auto Repair|Mechanic|Car Repair/.test(t));
  check(kw.length === h2s.length, `every H2 has Auto Repair / Mechanic / Car Repair (${kw.length}/${h2s.length})`, h2s.filter((t) => !kw.includes(t)).join(" | "));
  const withCity = h2s.filter((t) => /Mississauga/.test(t)).length;
  check(withCity > h2s.length / 2, `most H2s mention Mississauga (${withCity}/${h2s.length})`);
  const upperH2 = await page.evaluate(() => [...document.querySelectorAll("h2")].filter((h) => getComputedStyle(h).textTransform === "uppercase").length);
  check(upperH2 === 0, "no uppercase H2s");

  // ---- 4. Copy rules
  console.log("\n# Copy rules");
  const files = walk(ROOT).filter((f) => /\.(html|css|js|md|txt|xml)$/.test(f));
  const dashRe = new RegExp("[\\u2013\\u2014]|&" + "mdash;|&" + "ndash;");
  const dashFiles = files.filter((f) => dashRe.test(fs.readFileSync(f, "utf8")));
  check(dashFiles.length === 0, "no em or en dashes in any file", dashFiles.map((f) => path.relative(ROOT, f)).join(", "));
  const ourText = await page.evaluate(() => {
    const clone = document.body.cloneNode(true);
    clone.querySelectorAll("blockquote, script, .short-sweet").forEach((n) => n.remove());
    return clone.textContent.replace(/\s+/g, " ");
  });
  const allText = await page.evaluate(() => document.body.textContent.replace(/\s+/g, " "));
  const banned = ["look no further", "in today's world", "elevate", "seamless", "unparalleled", "top-notch", "one-stop shop", "we pride ourselves", "state-of-the-art", "peace of mind", "hassle-free", "like family", "#1", "best in mississauga", "cheapest", "free diagnosis", "same-day", "dealer-level", "certified"];
  const hits = banned.filter((b) => ourText.toLowerCase().includes(b));
  check(hits.length === 0, "no banned phrases in our copy", hits.join(", "));
  const absolutes = ["every customer", "all come back", "they all", "100% satisfaction", "guaranteed", "walk-in", "walk in", "open saturday", "open sunday", "weekend hours"];
  const absHits = absolutes.filter((b) => allText.toLowerCase().includes(b));
  check(absHits.length === 0, "no absolute claims, walk-ins or weekend hours", absHits.join(", "));
  const brands = ["canadian tire", "midas", "mr. lube", "mr lube", "jiffy", "speedy", "kal tire", "ok tire", "active green", "pep boys", "firestone", "goodyear", "costco", "walmart", "meineke", "monro", "honda dealer", "ford dealer", "nissan dealer", "autonation"];
  const brandHits = brands.filter((b) => allText.toLowerCase().includes(b));
  check(brandHits.length === 0, "no competitor, chain or dealership brand named", brandHits.join(", "));
  check(!/JB Auto\b(?!motive)|JB's/.test(allText), "never \"JB Auto\" or \"JB's\"");
  const legal = (allText.match(/JB Automotive Ltd/g) || []).length;
  check(legal === 1 && /JB Automotive Ltd/.test(await page.$eval(".footer-base", (n) => n.textContent)), "legal name only in the footer ©");
  check(!/languages?|speaks? (english|punjabi|hindi|urdu|tamil|arabic|portuguese|italian)|heritage/i.test(ourText), "no languages or heritage mentioned");
  check(!/negative|one star|1-star|bad review/i.test(allText), "no reference to negative reviews");

  const offerSections = await page.evaluate(() => {
    const has = (sel) => { const n = document.querySelector(sel); return !!n && /signature offer/.test(n.textContent); };
    return { hero: has(".hero .offer"), ribbon: has(".ribbon"), compare: has("#compare .cmp-jb"), faq1: has(".faq details:first-child"), banner: has(".offer-banner") };
  });
  check(Object.values(offerSections).every(Boolean), "signature offer in hero, ribbon, comparison, FAQ #1, banner", JSON.stringify(offerSections));
  const brandLine = "We tell you what's really wrong. Then we fix it so it stays fixed.";
  const bl = await page.evaluate((t) => [".hero", "#why-us .letter", ".site-footer"].map((s) => [...document.querySelectorAll(s + " .brand-line")].some((n) => n.textContent.trim() === t)), brandLine);
  check(bl.every(Boolean), "brand line under hero CTAs, end of letter, footer", JSON.stringify(bl));
  const ctaGaps = await page.evaluate(() => ["#second-opinion", "#services", "#reviews", "#how"]
    .filter((s) => { const p = document.querySelector(s + " .cta-pair"); return !p || !p.querySelector('a[href^="tel:"]') || !p.querySelector('a[href="#quote"]'); }));
  check(ctaGaps.length === 0, "key sections end with the Call + Get a Quote pair", ctaGaps.join(", "));

  // ---- 5. Images
  console.log("\n# Images");
  const imgs = await page.evaluate(() => [...document.querySelectorAll("img")].map((i) => ({
    src: i.getAttribute("src"), alt: i.getAttribute("alt"), w: i.getAttribute("width"), h: i.getAttribute("height"),
    lazy: i.getAttribute("loading"), prio: i.getAttribute("fetchpriority"),
  })));
  const badImgs = imgs.filter((i) => !i.alt || i.alt.length < 15 || !i.w || !i.h || !/^images\/[a-z0-9-]+\.webp$/.test(i.src) || !fs.existsSync(path.join(ROOT, i.src)));
  check(badImgs.length === 0, `${imgs.length} images: kebab-case webp, alt text, width/height, loaded`, badImgs.map((i) => i.src).join(", "));
  check(imgs[0].prio === "high" && !imgs[0].lazy && imgs.slice(1).every((i) => i.lazy === "lazy"), "hero fetchpriority=high, everything else lazy");
  const sources = fs.readFileSync(path.join(ROOT, "images/IMAGE-SOURCES.md"), "utf8");
  const unlogged = fs.readdirSync(path.join(ROOT, "images")).filter((f) => f.endsWith(".webp") && !sources.includes(f));
  check(unlogged.length === 0, "every stock photo logged in IMAGE-SOURCES.md", unlogged.join(", "));
  check([...sources.matchAll(/https:\/\/www\.(pexels|unsplash|pixabay)\.com\/photo/g)].length >= 7, "sources are Pexels / Unsplash / Pixabay links");
  const phs = await page.$$eval("figure.ph", (f) => f.length);
  check(phs === 4, `4 placeholder slots (3 photos + 1 video): ${phs}`);

  // ---- 6. Layout at five widths
  console.log("\n# Layout");
  for (const w of [360, 390, 768, 1024, 1440]) {
    await page.setViewport({ width: w, height: 800 });
    await new Promise((r) => setTimeout(r, 150));
    const r = await page.evaluate(() => {
      const sw = document.documentElement.scrollWidth;
      const wide = [...document.querySelectorAll("body *")].filter((n) => { const b = n.getBoundingClientRect(); return b.width && b.right > window.innerWidth + 1 && !n.closest(".sprite") && getComputedStyle(n).position !== "fixed"; }).slice(0, 4).map((n) => n.tagName + "." + (typeof n.className === "string" ? n.className : "svg") + "@" + Math.round(n.getBoundingClientRect().right));
      const bar = document.querySelector(".mobile-bar");
      const tooSmall = [...document.querySelectorAll("a.btn, button, .mobile-bar a")].filter((n) => { const b = n.getBoundingClientRect(); return b.width && b.height < 44; }).length;
      return { sw, iw: window.innerWidth, wide, bar: getComputedStyle(bar).display !== "none", pad: parseFloat(getComputedStyle(document.body).paddingBottom), barH: bar.offsetHeight, tooSmall };
    });
    check(r.sw <= r.iw, `no horizontal scroll at ${w}px`, r.sw > r.iw ? `${r.sw} > ${r.iw}: ${r.wide.join(", ")}` : "");
    if (w < 1024) check(r.bar && r.pad >= r.barH, `mobile bar visible and body padded at ${w}px`);
    else check(!r.bar, `mobile bar hidden at ${w}px`);
    check(r.tooSmall === 0, `buttons at least 44px tall at ${w}px`, String(r.tooSmall));
  }
  await page.setViewport({ width: 1440, height: 900 });

  const defaultTheme = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  check(defaultTheme === "steel", "Steel blue is the default colourway", String(defaultTheme));
  // ---- 7. Contrast (every text node against its nearest solid background)
  console.log("\n# Contrast");
  const contrastFn = () => {
    const parse = (c) => { const m = c.match(/[\d.]+/g); return m ? m.map(Number) : [0, 0, 0, 0]; };
    const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const blend = (fg, bg) => { const a = fg[3] === undefined ? 1 : fg[3]; return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)); };
    const bgOf = (el) => {
      const stack = [];
      for (let n = el; n; n = n.parentElement) {
        const c = parse(getComputedStyle(n).backgroundColor);
        if ((c[3] === undefined ? 1 : c[3]) > 0) { stack.push(c); if ((c[3] === undefined ? 1 : c[3]) === 1) break; }
      }
      let bg = [255, 255, 255];
      for (let i = stack.length - 1; i >= 0; i--) bg = blend(stack[i], bg);
      return bg;
    };
    const out = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    while (walker.nextNode()) {
      const el = walker.currentNode.parentElement;
      if (!walker.currentNode.textContent.trim() || seen.has(el) || el.closest(".sprite, svg, .skip-link, noscript, option")) continue;
      seen.add(el);
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none" || !el.getClientRects().length) continue;
      const bg = bgOf(el);
      const fg = blend(parse(cs.color), bg);
      const L1 = lum(fg), L2 = lum(bg);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight, 10) >= 700;
      const need = size >= 24 || (bold && size >= 18.66) ? 3 : 4.5;
      if (ratio < need) out.push(`${el.tagName}.${el.className} "${el.textContent.trim().slice(0, 30)}" ${ratio.toFixed(2)}`);
    }
    return out;
  };
  const brassFn = () => {
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--brass-rgb").trim().split(/\s+/).join(", ");
    const out = [];
    document.querySelectorAll("body *").forEach((el) => {
      if (getComputedStyle(el).color !== `rgb(${accent})` || !el.textContent.trim()) return;
      const light = el.closest(".paper") || el.closest(".tone-light");
      if (light) out.push(el.className || el.tagName);
    });
    return out;
  };
  for (const theme of ["brass", "oxblood", "navy", "steel"]) {
    await page.evaluate((t) => document.querySelector(`[data-theme-choice="${t}"]`).click(), theme);
    await new Promise((r) => setTimeout(r, 300));
    const state = await page.evaluate(() => ({ attr: document.documentElement.getAttribute("data-theme"), pressed: document.querySelector('[aria-pressed="true"]').getAttribute("data-theme-choice"), meta: document.querySelector('meta[name="theme-color"]').content }));
    check(state.pressed === theme && (theme === "brass" ? state.attr === null : state.attr === theme), `switcher applies the ${theme} colourway`, JSON.stringify(state));
    const low = await page.evaluate(contrastFn);
    check(low.length === 0, `all text meets WCAG AA contrast (${theme})`, low.slice(0, 8).join(" | "));
    // Bright brass is the only fill too light to read as text on cream; the other fills are dark and the contrast walk covers them
    const bop = theme === "brass" ? await page.evaluate(brassFn) : [];
    check(bop.length === 0, `bright brass is never text on a light background (${theme})`, bop.join(", "));
  }
  const saved = await page.evaluate(() => localStorage.getItem("jb-theme"));
  await page.reload({ waitUntil: "load" });
  const kept = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  check(saved === "steel" && kept === "steel", "colourway choice survives a reload");
  await page.evaluate(() => { localStorage.removeItem("jb-theme"); document.querySelector('[data-theme-choice="brass"]').click(); });


  // ---- 7b. Odometer numbers
  console.log("\n# Odometer");
  const readOdo = () => page.evaluate(() => [...document.querySelectorAll("[data-odometer]")].map((num) => {
    const shown = [...num.querySelectorAll(".odo > span")].map((part) => {
      if (!part.classList.contains("odo-col")) return part.textContent;
      const strip = part.querySelector(".odo-strip");
      const y = new DOMMatrix(getComputedStyle(strip).transform).m42;
      return String(Math.round(-y / strip.firstElementChild.getBoundingClientRect().height));
    }).join("");
    return { want: num.getAttribute("data-odometer"), shown, sr: num.querySelector(".sr-only").textContent };
  }));
  await page.setViewport({ width: 1440, height: 900 });
  const before = await page.evaluate(() => { const n = document.getElementById("numbers"); return n.getBoundingClientRect().top > innerHeight; });
  await page.evaluate(() => document.getElementById("numbers").scrollIntoView({ behavior: "instant", block: "center" }));
  await new Promise((r) => setTimeout(r, 2600));
  const odo = await readOdo();
  check(before && odo.length === 3 && odo.every((o) => o.shown === o.want), "odometer rolls to 4.7 / 41 / ~20 on scroll-in", JSON.stringify(odo.map((o) => o.shown)));
  check(odo.every((o) => /\d/.test(o.sr)), "screen-reader text holds the real values");
  const rm = await browser.newPage();
  await rm.setRequestInterception(true);
  rm.on("request", (r) => (r.url().startsWith(base) ? r.continue() : r.abort()));
  await rm.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await rm.goto(base, { waitUntil: "load" });
  const rmOdo = await rm.evaluate(() => [...document.querySelectorAll(".odo-strip")].every((s) => getComputedStyle(s).transform !== "none" || s.getAttribute("data-digit") === "0"));
  check(rmOdo, "reduced motion shows final values without scrolling");
  await rm.close();

  // ---- 8. Interaction
  console.log("\n# Interaction");
  await page.evaluate(() => document.querySelector("#quote-form button[type=submit]").click());
  const errMsg = await page.$eval("#form-msg", (n) => n.textContent);
  check(/highlighted/.test(errMsg), "empty form submit shows inline error");
  await page.type("#f-name", "Test Driver");
  await page.type("#f-phone", "4165550100");
  await page.type("#f-car", "2014 Nissan Juke");
  await page.type("#f-issue", "Check engine light came back on");
  await page.evaluate(() => { document.querySelector('input[name="has_quote"][value="yes"]').checked = true; document.getElementById("f-contact").value = "phone"; document.querySelector("#quote-form button[type=submit]").click(); });
  const okMsg = await page.$eval("#form-msg", (n) => n.textContent);
  check(/Got it/.test(okMsg) && page.url().startsWith(base), "valid form shows success without navigating");
  const labelled = await page.evaluate(() => [...document.querySelectorAll("#quote-form input, #quote-form select, #quote-form textarea")].filter((i) => i.type !== "radio" && !document.querySelector(`label[for="${i.id}"]`)).length);
  check(labelled === 0, "every form field has a label");
  const today = await page.evaluate(() => document.querySelectorAll("#hours li.is-today").length);
  check(today === 1, "today's hours row highlighted");
  await page.setViewport({ width: 390, height: 800 });
  await page.evaluate(() => document.querySelector(".menu-toggle").click());
  const menu = await page.evaluate(() => ({ open: document.getElementById("main-nav").classList.contains("is-open"), exp: document.querySelector(".menu-toggle").getAttribute("aria-expanded") }));
  check(menu.open && menu.exp === "true", "hamburger opens the menu and sets aria-expanded");
  for (const w of [1440, 390]) {
    await page.setViewport({ width: w, height: 800 });
    await page.evaluate(() => { document.getElementById("main-nav").classList.remove("is-open"); window.scrollTo({ top: document.documentElement.scrollHeight / 2, behavior: "instant" }); });
    await new Promise((r) => setTimeout(r, 200));
    await page.evaluate(() => document.querySelector(".site-header .wordmark").click());
    // Smooth scroll from mid-page takes a few seconds in headless Chrome: wait until it settles
    let y = -1;
    for (let i = 0; i < 40 && y !== 0; i++) { await new Promise((r) => setTimeout(r, 200)); y = await page.evaluate(() => window.scrollY); }
    check(y === 0, `logo link returns to the very top at ${w}px`, `scrollY=${y}`);
  }
  check(errors.length === 0, "no JavaScript errors", errors.join(" | "));

  await browser.close();
  server.close();
  console.log(`\n${fails === 0 ? "ALL CHECKS PASSED" : fails + " CHECK(S) FAILED"}`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
