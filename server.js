// Minimal static server for the droplet: the page at /, a health check at /api/health.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOSTNAME || "0.0.0.0";
const APP_NAME = process.env.APP_NAME || "montessori-checkerboard-math";
const page = fs.readFileSync(path.join(__dirname, "dist", "index.html"));

http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  if (url.pathname === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    res.end(req.method === "HEAD" ? undefined : JSON.stringify({ app: APP_NAME, status: "ok" }));
    return;
  }
  if (url.pathname === "/" || url.pathname === "/index.html") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" });
    res.end(req.method === "HEAD" ? undefined : page);
    return;
  }
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
}).listen(PORT, HOST, () => console.log(`${APP_NAME} listening on ${HOST}:${PORT}`));
