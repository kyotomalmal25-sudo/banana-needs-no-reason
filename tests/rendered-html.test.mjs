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
  assert.match(html, /バナナを食べるのに理由がいるのか。/);
  assert.match(html, /The Fourth Monkey/);
  assert.match(html, /Banana Protocol/);
  assert.match(html, /PeelDial BP-08/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders every exhibition room", async () => {
  const expectations = [
    ["/profile", /第四の猿/],
    ["/protocol", /理由はいらない。ただし手順はある。/],
    ["/phone", /ただし電話は必要。/],
  ];
  for (const [pathname, expected] of expectations) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(await response.text(), expected);
  }
});
