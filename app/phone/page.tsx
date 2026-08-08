import { PhoneConsole } from "../interactions";
import { SiteShell } from "../site-shell";

export default function PhonePage() {
  return <SiteShell current="phone" plate="ROOM 03 / PROTOTYPE">
    <section className="phone-hero"><div className="product-heading"><p className="kicker">Upcoming product / Development unit</p><h1>PeelDial<br /><span>BP-08</span></h1><p className="product-tagline">理由はいらない。<br />ただし電話は必要。</p><div className="release-status"><span className="status-light" /><strong>IN DEVELOPMENT</strong><span>RELEASE / WHEN RIPE</span></div></div><PhoneConsole /></section>
    <section className="product-specification"><header><p className="kicker">Product specification</p><h2>Reasonless Contact Unit</h2></header><dl className="spec-grid"><div><dt>MODEL</dt><dd>BP-08 / PeelDial</dd></div><div><dt>CHANNEL</dt><dd>Banana only</dd></div><div><dt>INPUT</dt><dd>12 physical keys</dd></div><div><dt>OUTPUT</dt><dd>Transferred silence</dd></div><div><dt>POWER</dt><dd>1 ripe banana</dd></div><div><dt>WARRANTY</dt><dd>Until eaten</dd></div></dl></section>
    <section className="product-close"><p>説明要求を保留し、沈黙を転送する。</p><strong>BANANA PHONE DEVELOPER / CHIMPANZEE</strong><span>Prototype photographs intentionally unavailable.</span></section>
  </SiteShell>;
}
