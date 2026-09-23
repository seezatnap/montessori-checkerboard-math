// Builds the pages from checkerboard.html, the single source file (it has no <html>/<head>
// wrapper so it can also be published as a claude.ai artifact).
//   index.html       – standalone copy to open locally
//   dist/index.html  – the deployed page, with meta tags and the shared GA4 tag
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const GOOGLE_ANALYTICS_ID = "G-GW0EZ8GPTN";
const body = readFileSync(new URL("../checkerboard.html", import.meta.url), "utf8");

const head = (extra = "") => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
${extra}</head>
<body>
`;

writeFileSync(new URL("../index.html", import.meta.url), head() + body + "\n</body>\n</html>\n");

const meta = `<meta name="description" content="Multiply and divide decimals on the Montessori decimal checkerboard with bead bars, number cards and exchanges.">
<meta name="theme-color" content="#212225">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='16' height='16' fill='%235e9f3b'/%3E%3Crect x='16' width='16' height='16' fill='%23cd2f2c'/%3E%3Crect y='16' width='16' height='16' fill='%231f4c9b'/%3E%3Crect x='16' y='16' width='16' height='16' fill='%237db9e3'/%3E%3C/svg%3E">
`;
const analytics = `
<p style="max-width:1260px;margin:0 auto;padding-block:0 28px;font:14px/1.4 'Alegreya Sans',system-ui,sans-serif;color:var(--ink-soft)">This site uses Google Analytics to count visits. No names or answers are collected.</p>
<script async src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GOOGLE_ANALYTICS_ID}');
</script>
`;
mkdirSync(new URL("../dist/", import.meta.url), { recursive: true });
writeFileSync(new URL("../dist/index.html", import.meta.url), head(meta) + body + analytics + "</body>\n</html>\n");
console.log("built index.html and dist/index.html");
