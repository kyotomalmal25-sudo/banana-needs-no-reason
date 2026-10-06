import { MonkeyStates } from "../interactions";
import { SiteShell } from "../site-shell";

export default function ProfilePage() {
  return <SiteShell current="profile" plate="ROOM 01 / PROFILE">
    <section className="page-intro compact-intro"><div><p className="kicker">Profile / Operating states</p><h1>The Fourth<br />Monkey</h1></div><p className="intro-copy">見ざる。聞かざる。言わざる。<br /><strong>そして、食べる。</strong></p></section>
    <section className="subject-dossier" aria-labelledby="subject-name">
      <div className="subject-index">
        <p className="kicker">Subject / specimen 04</p>
        <a className="subject-door" href="/corridor/" aria-label="04号室"><strong aria-hidden="true">04</strong></a>
        <div className="subject-index-meta"><span>PRIMATES</span><span>CHIMPANZEE</span></div>
      </div>
      <div className="subject-record">
        <div className="subject-summary"><p className="kicker">Classification</p><h2 id="subject-name">CHIMPANZEE</h2></div>
        <div className="subject-data"><dl className="catalog-specs"><div><dt>Role</dt><dd>Banana Phone Developer</dd></div><div><dt>Base</dt><dd>Forest Office</dd></div><div><dt>Method</dt><dd>Eat. Think later.</dd></div><div><dt>Diet</dt><dd>Banana</dd></div><div><dt>Reason</dt><dd>Not required.</dd></div></dl></div>
      </div>
    </section>
    <section className="states-section states-section-minimal"><header className="states-heading-minimal"><p className="kicker">Four states / operating index</p><span>Hover / tap to observe</span></header><MonkeyStates /></section>
  </SiteShell>;
}
