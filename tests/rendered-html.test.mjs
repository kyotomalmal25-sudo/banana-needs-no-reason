import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the exhibition home", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Does a Banana Need a Reason\?<\/title>/i);
  assert.match(
    html,
    /<meta name="google-site-verification" content="WtmBq6xK9s63O5KMQPDL45AZ1nWgr3TP4rAk8PxqBJg"\s*\/?>/i,
  );
  assert.match(html, /バナナを食べるのに理由がいるのか。/);
  assert.match(html, /The Fourth Monkey/);
  assert.match(html, /Banana Protocol/);
  assert.match(html, /PeelDial BP-08/);
  assert.match(html, /Primate/);
  assert.match(html, /Operating Manual/);
  assert.match(html, /Forest Office/);
  assert.match(html, /世界の動物園/);
  assert.match(html, /zoo\.sandiegozoo\.org/);
  assert.match(html, /mandai\.com\/en\/singapore-zoo/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders every exhibition room", async () => {
  const expectations = [
    ["/profile", /第四の猿/],
    ["/protocol", /理由はいらない。ただし手順はある。/],
    ["/phone", /BananaPhone Ω/],
  ];
  for (const [pathname, expected] of expectations) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(await response.text(), expected);
  }
});
