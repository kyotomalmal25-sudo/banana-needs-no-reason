import type { Metadata } from "next";

export const metadata: Metadata = { title: "倉庫 — Does a Banana Need a Reason?" };

export default function RoomC() {
  return (
    <main className="maze">
      <div className="maze-inner">
        <p className="maze-kicker">倉庫</p>
        <h1>倉庫</h1>
        <p className="maze-text">段ボールが積まれ、どれも黄色い。一つだけ蓋が開いていて、中に何も入っていないのに、甘い匂いがする。壁際に小さな扉。</p>
        <ol className="maze-doors">
          <li><a href="/corridor/a/"><span>→</span>小さな扉</a></li>
        </ol>
      </div>
    </main>
  );
}
