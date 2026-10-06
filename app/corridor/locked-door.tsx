"use client";
import { useEffect, useState, type MouseEvent } from "react";

// The link is always in the HTML (so it can be followed without JavaScript);
// with JavaScript it stays shut until the four Protocol steps were all marked done.
export function LockedDoor() {
  const [open, setOpen] = useState(false);
  const [tried, setTried] = useState(false);

  useEffect(() => {
    try { setOpen(localStorage.getItem("dbnr.protocol.done") === "1"); } catch { /* storage unavailable */ }
  }, []);

  const knock = (event: MouseEvent<HTMLAnchorElement>) => {
    if (open) return;
    event.preventDefault();
    setTried(true);
  };

  return (
    <li>
      <a href="/corridor/exit/" onClick={knock} className={open ? "maze-door-open" : "maze-door-locked"}>
        <span>{open ? "→" : "04"}</span>{open ? "奥の扉" : "奥の扉(施錠)"}
      </a>
      {tried && !open ? <p className="maze-lock-note" role="status">鍵穴の横に札がある。「標準手順 全4項目の実施記録がない者は、通せません」</p> : null}
    </li>
  );
}
