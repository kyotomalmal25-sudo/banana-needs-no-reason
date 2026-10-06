import type { Metadata } from "next";
import { LockedDoor } from "./locked-door";

export const metadata: Metadata = { title: "廊下 — Does a Banana Need a Reason?" };

export default function CorridorPage() {
  return (
    <main className="maze">
      <div className="maze-inner">
        <p className="maze-kicker">04号室の外 / 廊下</p>
        <h1>廊下</h1>
        <p className="maze-text">蛍光灯が一本だけ点いている。床に黄色い線が引かれていて、三つの扉に続いている。来た道は、もう見えない。</p>
        <ol className="maze-doors">
          <li><a href="/corridor/a/"><span>01</span>応接室</a></li>
          <li><a href="/corridor/b/"><span>02</span>資料室</a></li>
          <li><a href="/corridor/c/"><span>03</span>倉庫</a></li>
          <LockedDoor />
        </ol>
      </div>
    </main>
  );
}
