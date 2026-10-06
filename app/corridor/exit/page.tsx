import type { Metadata } from "next";

export const metadata: Metadata = { title: "出口 — Does a Banana Need a Reason?" };

export default function ExitRoom() {
  return (
    <main className="maze">
      <div className="maze-inner">
        <p className="maze-kicker">奥の間</p>
        <h1>奥の間</h1>
        <p className="maze-text">壁に紙が一枚、画鋲で留めてある。</p>
        <p className="maze-text maze-notice">この先は、評価されなかったものの置き場所です。<br />ここにあるものは、誰にも平均だと気づかれないまま、公開されました。</p>
        <p className="maze-text maze-quiet">扉は二つ。どちらも、外に続いている。</p>
        <ol className="maze-doors">
          <li><a href="https://chimpanzee-museum-v2.pages.dev/" rel="noreferrer"><span>→</span>明るい方の扉</a></li>
          <li><a href="https://kyotomalmal25-sudo.github.io/wnba-failure/" rel="noreferrer"><span>※</span>貼り紙の裏の扉</a></li>
        </ol>
      </div>
    </main>
  );
}
