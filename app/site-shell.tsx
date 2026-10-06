import type { ReactNode } from "react";

const links = [
  { id: "top", href: "/", label: "Top" },
  { id: "profile", href: "/profile", label: "Profile" },
  { id: "protocol", href: "/protocol", label: "Protocol" },
  { id: "phone", href: "/phone", label: "Phone" },
  { id: "museum", href: "https://chimpanzee-museum-v2.pages.dev/", label: "Museum", external: true },
];

const fieldLinks = [
  { href: "https://zoo.sandiegozoo.org/", label: "Subject Archive", meta: "San Diego" },
  { href: "https://www.mandai.com/en/singapore-zoo.html", label: "Banana Affairs", meta: "Singapore" },
  { href: "https://www.zoo-berlin.de/en", label: "Field Relations", meta: "Berlin" },
  { href: "https://www.taronga.org.au/sydney-zoo", label: "Return to Forest", meta: "Sydney" },
];

export function SiteShell({ children, current, plate }: { children: ReactNode; current: string; plate: string }) {
  return (
    <main>
      <header className="site-header">
        <a className="site-mark" href="/" aria-label="DBNR / トップへ">
          <span className="mark-emblem" aria-hidden="true"><img src="/chimpanzee-heart-mark.png" alt="" /></span>
          <span className="mark-word">DBNR</span>
        </a>
        <nav aria-label="主要ページ">
          {links.map((link) => link.external
            ? <a href={link.href} key={link.id} target="_blank" rel="noreferrer">{link.label}<span aria-hidden="true"> ↗</span></a>
            : <a href={link.href} key={link.id} className={current === link.id ? "active" : undefined} aria-current={current === link.id ? "page" : undefined}>{link.label}</a>)}
        </nav>
        <span className="header-plate">{plate}</span>
      </header>
      {children}
      <footer className="forest-footer">
        <div className="forest-footer-lead">
          <div className="footer-brand" aria-label="DBNR">
            <span className="footer-brand-disc" aria-hidden="true">04</span>
            <span>DBNR</span>
          </div>
          <p className="kicker">Private primate operations / est. 2026</p>
          <h2>Forest Office</h2>
          <p className="forest-statement">A private operational unit for banana handling, primate observation, and unnecessary certainty.</p>
          <p className="forest-statement-ja">黄色い物体と、それを操作せずにはいられない生き物との、静かな関係を維持しています。</p>
        </div>
        <div className="forest-directory">
          <p className="directory-title">Field network / 世界の動物園</p>
          <nav aria-label="世界の動物園">
            {fieldLinks.map((link) => (
              <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                <span>{link.label}</span><small>{link.meta}</small><b aria-hidden="true">↗</b>
              </a>
            ))}
          </nav>
        </div>
        <div className="forest-footer-base">
          <span>Does a Banana Need a Reason?</span>
          <span>NO PUBLIC SERVICE IS CURRENTLY AVAILABLE.</span>
          <span>2026 / FOREST OFFICE</span>
        </div>
        <div className="footer-attribution">
          <div className="attribution-item">
            <a className="attribution-icon" href="https://banana-needs-no-reason.kyotomalmal25.chatgpt.site/" target="_blank" rel="noreferrer" aria-label="GPT 版のサイトを開く"><img src="/footer-gpt.png" alt="" width="44" height="44" /></a>
            <div>
              <span className="kicker">制作</span>
              <p>このサイトは「ふざけてるけど真面目」をテーマに、OpenAI GPT が作りました。</p>
            </div>
          </div>
          <div className="attribution-item">
            <a className="attribution-icon" href="https://pan-tool-standards.kyotomalmal25.workers.dev/" target="_blank" rel="noreferrer" aria-label="姉妹サイトを開く"><img src="/footer-claude.png" alt="" width="44" height="44" /></a>
            <div>
              <span className="kicker">姉妹サイト</span>
              <p><a href="https://pan-tool-standards.kyotomalmal25.workers.dev/" target="_blank" rel="noreferrer">同じテーマで Anthropic Claude が作ったものが姉妹サイトです。</a></p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
