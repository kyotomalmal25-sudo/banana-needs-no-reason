import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const projectRoot = new URL("../", import.meta.url);
const outputRoot = new URL("../outputs/", import.meta.url);
const serverRoot = new URL("../dist/server/", import.meta.url);

const sourceFiles = [
  "chimpanzee-portfolio.html",
  "profile.html",
  "protocol.html",
  "phone.html",
  "assets/site.css",
  "assets/static.css",
  "assets/site.js",
  "assets/chimpanzee-profile.png",
  "assets/og.png",
];

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
};

const files = {};
for (const relativePath of sourceFiles) {
  const bytes = await readFile(new URL(relativePath, outputRoot));
  const extension = extname(relativePath);
  const text = [".html", ".css", ".js"].includes(extension);
  files[`/${relativePath}`] = {
    body: text ? bytes.toString("utf8") : bytes.toString("base64"),
    encoding: text ? "text" : "base64",
    type: contentTypes[extension] ?? "application/octet-stream",
  };
}

const worker = `const files = ${JSON.stringify(files)};
const aliases = {
  "/": "/chimpanzee-portfolio.html",
  "/top": "/chimpanzee-portfolio.html",
  "/profile": "/profile.html",
  "/protocol": "/protocol.html",
  "/phone": "/phone.html"
};

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let pathname = url.pathname.length > 1 && url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
    pathname = aliases[pathname] ?? pathname;

    if (pathname === "/robots.txt") {
      return new Response("User-agent: *\\nAllow: /\\nSitemap: " + url.origin + "/sitemap.xml\\n", { headers: { "content-type": "text/plain; charset=utf-8" } });
    }
    if (pathname === "/sitemap.xml") {
      const routes = ["", "/profile", "/protocol", "/phone"];
      const entries = routes.map((route) => "<url><loc>" + url.origin + route + "</loc></url>").join("");
      return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + entries + "</urlset>", { headers: { "content-type": "application/xml; charset=utf-8" } });
    }

    const file = files[pathname];
    if (!file) return new Response("Not found", { status: 404 });

    const headers = new Headers({
      "content-type": file.type,
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
      "cache-control": pathname.startsWith("/assets/") ? "public, max-age=86400" : "public, max-age=300"
    });
    let body = file.encoding === "base64" ? decodeBase64(file.body) : file.body.replaceAll("__SITE_ORIGIN__", url.origin);
    return new Response(body, { headers });
  }
};
`;

await mkdir(serverRoot, { recursive: true });
await writeFile(new URL("index.js", serverRoot), worker, "utf8");
console.log(join(new URL(".", projectRoot).pathname, "dist/server/index.js"));
