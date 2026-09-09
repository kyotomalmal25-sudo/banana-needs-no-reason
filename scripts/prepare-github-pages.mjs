import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "dist", "client");
const output = path.join(root, "site");
const snapshots = path.join(root, "github-pages-snapshots");
const baseName = "banana-needs-no-reason";
const assetVersion = process.env.GITHUB_SHA?.slice(0, 12) || "dev";

await rm(output, { recursive: true, force: true });
await cp(source, output, { recursive: true });

for (const route of ["profile", "protocol", "phone"]) {
  const html = await readFile(path.join(snapshots, `${route}.html`), "utf8");
  const directory = path.join(output, route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html);
}

// Keep JavaScript bundles byte-for-byte intact. Rewriting their source text can
// corrupt regex literals and stop hydration before client interactions mount.
const textExtensions = new Set([".html", ".css"]);
async function rewrite(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewrite(file);
      continue;
    }
    if (!textExtensions.has(path.extname(entry.name))) continue;
    const original = await readFile(file, "utf8");
    // Rewrite root-relative URLs while leaving HTML/XML closing and self-closing
    // syntax intact (for example `"/>` must never become an attribute value).
    const withBase = original.replace(/(["'`(])\/(?![\/>])/g, (match, prefix, offset, whole) => {
      const rest = whole.slice(offset + match.length);
      return rest.startsWith(`${baseName}/`) ? match : `${prefix}/${baseName}/`;
    });
    const rewritten = entry.name.endsWith(".html")
      ? withBase.replace(/(\/banana-needs-no-reason\/_next\/[^"'\\s<>]+)(?=["'])/g, (match) => match.includes("?") ? match : `${match}?v=${assetVersion}`)
      : withBase;
    if (rewritten !== original) await writeFile(file, rewritten);
  }
}
await rewrite(output);
await writeFile(path.join(output, ".nojekyll"), "");
