import type { Metadata } from "next";

export const metadata: Metadata = { title: "資料室 — Does a Banana Need a Reason?" };

export default function RoomB() {
  return (
    <main className="maze">
      <div className="maze-inner">
        <p className="maze-kicker">資料室</p>
        <h1>資料室</h1>
        <p className="maze-text">棚に同じ背表紙が並んでいる。どれも「バナナを食べる理由・第一版」。開くと、どれも白紙だった。奥に、もう一つ扉がある。</p>
        <ol className="maze-doors">
          <li><a href="/corridor/"><span>→</span>奥の扉</a></li>
          <li><a href="https://debate.kyotomalmal25.workers.dev/" rel="noreferrer"><span>※</span>一冊だけ背表紙の違う綴じ込み</a></li>
        </ol>
      </div>
    </main>
  );
}
