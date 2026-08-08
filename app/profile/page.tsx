import { MonkeyStates } from "../interactions";
import { SiteShell } from "../site-shell";

export default function ProfilePage() {
  return <SiteShell current="profile" plate="ROOM 01 / PROFILE">
    <section className="page-intro compact-intro"><div><p className="kicker">Profile / Operating states</p><h1>The Fourth<br />Monkey</h1></div><p className="intro-copy">見ざる。聞かざる。言わざる。<br /><strong>そして、食べる。</strong></p></section>
    <section className="profile-plate">
      <figure className="portrait-sheet"><img src="/chimpanzee-profile.png" alt="黒いインクと黄色で描かれた、思慮深いチンパンジーの横顔" /><figcaption><span>FIG. 04</span><span>PROFILE / LEFT</span><span>2026</span></figcaption></figure>
      <div className="profile-copy"><p className="kicker">Subject identification</p><h2>CHIMPANZEE</h2><p className="short-statement">バナナのために生きる。<br />学ばない、恐れない、縛られない。<br />そして、バナナに対しては一歩も譲らない。</p>
        <dl className="catalog-specs"><div><dt>Role</dt><dd>Banana Phone Developer</dd></div><div><dt>Base</dt><dd>Forest Office / Somewhere</dd></div><div><dt>Method</dt><dd>Eat. Think later.</dd></div><div><dt>Since</dt><dd>2026</dd></div></dl><blockquote>“The Fourth Monkey Eats.”</blockquote>
      </div>
    </section>
    <section className="states-section"><header><p className="kicker">Four operational states</p><h2>人格ではない。動作状態である。</h2></header><MonkeyStates /></section>
  </SiteShell>;
}
