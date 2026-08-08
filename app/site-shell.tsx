import type { ReactNode } from "react";

const links = [
  { id: "top", href: "/", label: "Top" },
  { id: "profile", href: "/profile", label: "Profile" },
  { id: "protocol", href: "/protocol", label: "Protocol" },
  { id: "phone", href: "/phone", label: "Phone" },
];

export function SiteShell({ children, current, plate }: { children: ReactNode; current: string; plate: string }) {
  return (
    <main>
      <header className="site-header">
        <a className="site-mark" href="/" aria-label="トップへ"><span className="mark-dot" /><span>DABNR?</span></a>
        <nav aria-label="主要ページ">
          {links.map((link) => <a href={link.href} key={link.id} className={current === link.id ? "active" : undefined} aria-current={current === link.id ? "page" : undefined}>{link.label}</a>)}
        </nav>
        <span className="header-plate">{plate}</span>
      </header>
      {children}
      <footer className="site-footer"><span>Does a Banana Need a Reason?</span><span>バナナについては、譲歩しない。</span><span>2026 / FOREST OFFICE</span></footer>
    </main>
  );
}
