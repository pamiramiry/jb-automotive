// Rebuilds the FAQPage JSON-LD in index.html from the FAQ <details> blocks,
// so the schema always matches the visible questions and answers word for word.
// Usage: node tools/sync-faq.js
const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "..", "index.html");
let html = fs.readFileSync(file, "utf8");

const decode = (s) => s
  .replace(/<[^>]+>/g, "")
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/\s+/g, " ").trim();

const faqBlock = html.slice(html.indexOf('<div class="faq">'), html.indexOf("</section>", html.indexOf('<div class="faq">')));
const items = [...faqBlock.matchAll(/<summary>([\s\S]*?)<\/summary>\s*<div class="faq-a">([\s\S]*?)<\/div>/g)]
  .map((m) => ({
    "@type": "Question",
    name: decode(m[1]),
    acceptedAnswer: { "@type": "Answer", text: decode(m[2]) }
  }));
if (!items.length) throw new Error("No FAQ items found");

const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items };
const json = JSON.stringify(schema, null, 2).replace(/</g, "\u003c");
html = html.replace(
  /(<script type="application\/ld\+json" id="faq-schema">)[\s\S]*?(<\/script>)/,
  `$1\n${json}\n$2`
);
fs.writeFileSync(file, html);
console.log(`FAQPage schema synced: ${items.length} questions`);
