import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "dist", "client");
const output = path.join(root, "site");
const snapshots = path.join(root, "github-pages-snapshots");
const baseName = "banana-needs-no-reason";

await rm(output, { recursive: true, force: true });
await cp(source, output, { recursive: true });

for (const route of ["profile", "protocol", "phone"]) {
  const html = await readFile(path.join(snapshots, `${route}.html`), "utf8");
  const directory = path.join(output, route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html);
}

const textExtensions = new Set([".html", ".css", ".js", ".json", ".map"]);
async function rewrite(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewrite(file);
      continue;
    }
    if (!textExtensions.has(path.extname(entry.name))) continue;
    const original = await readFile(file, "utf8");
    const rewritten = original.replace(/(["'`(])\/(?!\/)/g, (match, prefix, offset, whole) => {
      const rest = whole.slice(offset + match.length);
      return rest.startsWith(`${baseName}/`) ? match : `${prefix}/${baseName}/`;
    });
    if (rewritten !== original) await writeFile(file, rewritten);
  }
}
await rewrite(output);
await writeFile(path.join(output, ".nojekyll"), "");
