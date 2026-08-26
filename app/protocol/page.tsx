import { SiteShell } from "../site-shell";
import { Banana3D } from "../interactions";

export default function ProtocolPage() {
  return <SiteShell current="protocol" plate="ROOM 02 / MANUAL">
    <section className="page-intro manual-intro"><div><p className="kicker">Standard operating procedure / BP-06</p><h1>Banana<br />Protocol</h1></div><div className="manual-summary"><span>DOCUMENT CLASS / PUBLIC</span><span>REVISION / 08.08.2026</span><span>RISK / ACCEPTABLY YELLOW</span></div></section>
    <Banana3D />
  </SiteShell>;
}
