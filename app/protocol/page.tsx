import { BananaExplodedScroll, ProtocolConsole } from "../interactions";
import { SiteShell } from "../site-shell";

export default function ProtocolPage() {
  return <SiteShell current="protocol" plate="ROOM 02 / MANUAL">
    <section className="page-intro manual-intro"><div><p className="kicker">Standard operating procedure / BP-06</p><h1>Banana<br />Protocol</h1></div><div className="manual-summary"><span>DOCUMENT CLASS / PUBLIC</span><span>REVISION / 08.08.2026</span><span>RISK / ACCEPTABLY YELLOW</span></div></section>
    <BananaExplodedScroll />
    <section className="manual-sheet"><header><div><span>操作対象</span><strong>バナナ / 1本</strong></div><div><span>所要時間</span><strong>理由より短い</strong></div><div><span>承認</span><strong>不要</strong></div></header><ProtocolConsole /></section>
    <section className="warning-band"><span className="status-light" /><strong>理由はいらない。ただし手順はある。</strong><span>Deviation from protocol may result in an unpeeled banana.</span></section>
  </SiteShell>;
}
