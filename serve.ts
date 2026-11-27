// NusaData — tiny static server for local development only.
// Serves app/ at http://127.0.0.1:8123/ so the site can be opened and
// screenshotted exactly as a static host would serve it. Node 22+,
// stdlib only. Run: node serve.ts [port]

import { createReadStream } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "app");
const port = Number(process.argv[2] ?? 8123);

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

createServer((req, res) => {
  const path = normalize(join(root, decodeURIComponent(req.url ?? "/").split("?")[0]));
  if (!path.startsWith(root)) { res.writeHead(403); res.end(); return; }
  const file = path.endsWith("/") ? join(path, "index.html") : path;
  createReadStream(file)
    .on("open", () => res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" }))
    .on("error", () => { res.writeHead(404, { "content-type": "text/plain" }); res.end("not found\n"); })
    .pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`NusaData dev server: http://127.0.0.1:${port}/`);
});
