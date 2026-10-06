import type { Metadata } from "next";

export const metadata: Metadata = { title: "応接室 — Does a Banana Need a Reason?" };

export default function RoomA() {
  return (
    <main className="maze">
      <div className="maze-inner">
        <p className="maze-kicker">応接室</p>
        <h1>応接室</h1>
        <p className="maze-text">ソファに誰も座っていない。机の上に紙が一枚。「理由欄」とだけ書かれていて、空欄のまま、きれいに折られている。</p>
        <p className="maze-text maze-quiet">扉は、入ってきた一つだけだった。閉まる音は、しなかった。</p>
      </div>
    </main>
  );
}
