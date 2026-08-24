import { SiteShell } from "./site-shell";

const rooms = [
  { number: "01", href: "/profile", title: "The Fourth Monkey", ja: "第四の猿 / 食べる", note: "Profile and operating states" },
  { number: "02", href: "/protocol", title: "Banana Protocol", ja: "標準皮むき手順", note: "Observation through silence" },
  { number: "03", href: "/phone", title: "PeelDial BP-08", ja: "バナナ電話 / 開発中", note: "Reasonless contact unit" },
];

const operatingNotes = [
  { number: "01", glyph: "◎", title: "Subject 04", body: "Maintain eye contact. The specimen is already awake.", signal: "ATTENTIVE" },
  { number: "02", glyph: "⌁", title: "Banana Unit", body: "Rotate the yellow object. Do not request a reason.", signal: "OPERATIONAL" },
  { number: "03", glyph: "▤", title: "Forest Office", body: "Proceed without permission. Return when the signal disappears.", signal: "UNSUPERVISED" },
  { number: "04", glyph: "↯", title: "Silence Mode", body: "Answers remain optional. Observation continues without comment.", signal: "LOW NOISE" },
  { number: "05", glyph: "◇", title: "Return Signal", body: "Follow the peel. The shortest route is rarely a straight line.", signal: "NO REASON" },
];

export default function Home() {
  return (
    <SiteShell current="top" plate="EXHIBITION 08 / 2026">
      <section className="top-exhibit">
        <div className="hero-registration" aria-hidden="true"><span>●</span><span>●</span><span className="yellow-dot">●</span></div>
        <div className="hero-copy">
          <p className="kicker">A question for good banana practice</p>
          <h1>Does a Banana<br />Need a Reason?</h1>
          <p className="hero-japanese">バナナを食べるのに理由がいるのか。</p>
          <p className="hero-answer">NO REASON REQUIRED. / 2026</p>
        </div>
        <div className="presence-strip" aria-label="チンパンジーの肖像断片">
          <img src="/chimpanzee-profile.png" alt="黒いインクと黄緑で描かれたチンパンジーの正面肖像の断片" />
          <div className="presence-caption"><span>SUBJECT 04</span><strong>CHIMPANZEE</strong><span>STATUS / ATTENTIVE</span></div>
        </div>
        <aside className="hero-note"><span className="status-light" /><p>黄色は装飾ではない。<br />判断と作動のためにある。</p></aside>
      </section>
      <section className="manifesto-band" aria-label="ステートメント">
        <p>バナナに関しては、譲歩しない。</p><span>No concession on banana matters.</span>
      </section>
      <section className="room-index" aria-labelledby="room-index-title">
        <header><p className="kicker">Exhibition rooms</p><h2 id="room-index-title">Three rooms. One banana.</h2></header>
        <div className="room-list">
          {rooms.map((room) => (
            <a className="room-link" href={room.href} key={room.href}>
              <span className="room-number">{room.number}</span>
              <span><strong>{room.title}</strong><small>{room.ja}</small></span>
              <span className="room-note">{room.note}</span><span className="room-arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </section>
      <section className="operating-manual" aria-labelledby="operating-manual-title">
        <div className="paper-layer paper-layer-back" aria-hidden="true" />
        <div className="paper-layer paper-layer-middle" aria-hidden="true" />
        <div className="manual-field">
          <header className="manual-field-header">
            <div>
              <p className="kicker">Unnecessary instructions / DBNR 04</p>
              <h2 id="operating-manual-title">Primate<br />Operating Manual</h2>
            </div>
            <p className="manual-field-note">A small collection of procedures for an animal already capable of ignoring them.</p>
          </header>
          <div className="operating-grid">
            {operatingNotes.map((note) => (
              <article className="operating-note" key={note.number}>
                <div className="operating-icon" aria-hidden="true"><span>{note.glyph}</span></div>
                <div className="operating-copy">
                  <p className="operating-label">{note.number} / {note.signal}</p>
                  <h3>{note.title}</h3>
                  <p>{note.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="manual-stamp" aria-hidden="true"><strong>DBNR</strong><span>FOREST APPROVED</span></div>
        </div>
      </section>
    </SiteShell>
  );
}
