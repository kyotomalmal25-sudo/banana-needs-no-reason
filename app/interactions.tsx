"use client";

import { useEffect, useRef, useState } from "react";

const monkeyStates = [
  { id: "see", number: "01", ja: "見ざる", en: "SEE NO EVIL", note: "視界から理由を除外する。", image: "/monkey-see-pop-v1.png", poster: { rail: "UNSEEN", top: "HISTORY / CULTURE", major: "POLITICS", mid: "LOOK AWAY", bottom: "BETTER LEFT UNSEEN", mini: "PUBLIC MEMORY / ARCHIVE CLOSED" } },
  { id: "hear", number: "02", ja: "聞かざる", en: "HEAR NO EVIL", note: "説明要求を受信しない。", image: "/monkey-hear-pop-v2.png", poster: { rail: "UNHEARD", top: "POLITICS / CULTURE", major: "HISTORY", mid: "TURN IT DOWN", bottom: "BETTER LEFT UNHEARD", mini: "PUBLIC NOISE / IGNORE THE RUMOR" } },
  { id: "speak", number: "03", ja: "言わざる", en: "SPEAK NO EVIL", note: "弁明を出力しない。", image: "/monkey-speak-pop-v2.png", poster: { rail: "UNSAID", top: "POLITICS / HISTORY", major: "CULTURE", mid: "NO COMMENT", bottom: "BETTER LEFT UNSAID", mini: "OFF THE RECORD / WORDS MATTER" } },
  { id: "eat", number: "04", ja: "食べる", en: "EAT THE BANANA", note: "残された唯一の操作を実行する。", image: "/banana-screenprint.png" },
];

export function MonkeyStates() {
  const [active, setActive] = useState(monkeyStates[3]);
  return <div className="state-console">
    <div className="state-buttons" role="tablist" aria-label="第四の猿の動作状態" onMouseLeave={() => setActive(monkeyStates[3])}>
      {monkeyStates.map((state) => {
        const selected = active.id === state.id;
        return <button
          type="button"
          role="tab"
          aria-selected={selected}
          aria-controls="state-readout"
          className={[selected ? "selected" : "", state.id === "eat" ? "eat-state" : ""].filter(Boolean).join(" ") || undefined}
          onMouseEnter={() => setActive(state)}
          onFocus={() => setActive(state)}
          onClick={() => setActive(state)}
          key={state.id}
        >
          <span className="state-number">{state.number}</span>
          <span className={["state-art", state.id !== "eat" ? "monkey-state-art" : ""].filter(Boolean).join(" ")} aria-hidden="true">
            {state.id === "eat" ? <span className="banana-hover-art">
              <img className="banana-art banana-intact" src={state.image} alt="" />
              <img className="banana-art banana-peel" src="/banana-peel-screenprint.png" alt="" />
            </span> : <>
              {state.poster && <span className="state-type-collage">
                <span className="type-rail">{state.poster.rail}</span>
                <span className="type-top">{state.poster.top}</span>
                <span className={`type-major type-major-${state.id}`}>{state.poster.major}</span>
                <span className="type-mid">{state.poster.mid}</span>
                <span className="type-bottom">{state.poster.bottom}</span>
                <span className="type-mini">{state.poster.mini}</span>
              </span>}
              <img className="monkey-pop-art" src={state.image} alt="" />
            </>}
          </span>
          <strong>{state.ja}</strong>
        </button>;
      })}
    </div>
    <div className={["state-readout", active.id !== "eat" ? "monkey-readout" : ""].filter(Boolean).join(" ")} id="state-readout" role="tabpanel" aria-live="polite"><span className="status-light" /><p>{active.en}</p><strong>{active.note}</strong></div>
  </div>;
}

const protocolSteps = [
  { n: "01", ja: "観察", en: "OBSERVE", note: "対象がバナナであることを確認する。" },
  { n: "02", ja: "茎部確認", en: "LOCATE", note: "茎部を発見する。議論は開始しない。" },
  { n: "03", ja: "把持", en: "GRIP", note: "利き手で保持。非利き手は沈黙を担当。" },
  { n: "04", ja: "皮むき", en: "PEEL", note: "外皮を三方向へ展開する。" },
  { n: "05", ja: "摂取", en: "CONSUME", note: "理由の提出前に摂取を開始する。" },
  { n: "06", ja: "沈黙", en: "SILENCE", note: "完了後、成果を過剰に語らない。" },
];

const explodedLayers = [
  { id: "01", name: "OUTER PEEL / LEFT", clip: "inset(0 72% 0 0)", x: -170, y: 44, rotate: -11 },
  { id: "02", name: "FLESH CORE / A", clip: "inset(0 48% 0 24%)", x: -58, y: -38, rotate: -3 },
  { id: "03", name: "FLESH CORE / B", clip: "inset(0 24% 0 48%)", x: 58, y: -64, rotate: 4 },
  { id: "04", name: "OUTER PEEL / RIGHT", clip: "inset(0 0 0 72%)", x: 176, y: 36, rotate: 12 },
];

export function BananaExplodedScroll() {
  const trackRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / distance)));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const separation = Math.min(1, Math.max(0, (progress - 0.08) / 0.62));
  const reveal = Math.min(1, progress * 9);
  const activeLayer = Math.min(3, Math.floor(separation * 4));
  const percent = Math.round(progress * 100).toString().padStart(2, "0");

  return <section className="explode-track" ref={trackRef} aria-label="バナナ縦断分解図">
    <div className="explode-stage">
      <div className="explode-heading">
        <p className="kicker">Scroll controlled longitudinal study / BP-X1</p>
        <h2>Peel<br />Anatomy</h2>
        <p>スクロールして、一本のバナナを四つの技術層へ分解する。</p>
      </div>

      <div className="explode-visual" aria-hidden="true">
        <div className="explode-axis explode-axis-x" />
        <div className="explode-axis explode-axis-y" />
        <img className="explode-banana-base" src="/banana-screenprint.png" alt="" style={{ opacity: 1 - reveal }} />
        {explodedLayers.map((layer, layerIndex) => <img
          className="explode-banana-layer"
          src="/banana-screenprint.png"
          alt=""
          key={layer.id}
          style={{
            clipPath: layer.clip,
            opacity: reveal,
            transform: `translate3d(${layer.x * separation}px, ${layer.y * separation}px, 0) rotate(${layer.rotate * separation}deg)`,
          }}
        />)}
        <span className="explode-origin">B-01</span>
      </div>

      <div className="explode-readout" aria-live="polite">
        <div className="explode-progress"><span style={{ width: `${percent}%` }} /></div>
        <div className="explode-percent">{percent}<small>%</small></div>
        <p>{progress < .08 ? "ASSEMBLED SPECIMEN" : progress > .82 ? "SEPARATION COMPLETE" : explodedLayers[activeLayer].name}</p>
        <strong>{progress < .08 ? "未分解" : progress > .82 ? "分解完了" : `層 ${explodedLayers[activeLayer].id} を展開中`}</strong>
        <span>SCROLL ↓</span>
      </div>
    </div>
  </section>;
}

export function ProtocolConsole() {
  const [index, setIndex] = useState(0);
  const step = protocolSteps[index];
  return <div className="protocol-console">
    <div className={`banana-diagram stage-${index + 1}`} aria-label={`手順 ${step.n}: ${step.ja}`}>
      <div className="measure">218 mm</div><div className="banana-core" /><div className="peel peel-one" /><div className="peel peel-two" /><div className="peel peel-three" />
      <span className="diagram-point point-a" /><span className="diagram-point point-b" /><div className="diagram-label">B-01 / CAVENDISH TYPE</div>
    </div>
    <div className="protocol-panel"><div className="step-readout" aria-live="polite"><span>{step.n} / 06</span><p>{step.en}</p><h2>{step.ja}</h2><strong>{step.note}</strong></div>
      <div className="step-controls" role="group" aria-label="手順を選択">{protocolSteps.map((item, itemIndex) => <button type="button" className={index === itemIndex ? "active" : undefined} onClick={() => setIndex(itemIndex)} aria-label={`${item.n} ${item.ja}`} key={item.n}>{item.n}</button>)}</div>
      <button className="advance-button" type="button" onClick={() => setIndex((index + 1) % protocolSteps.length)}><span>次工程</span><span aria-hidden="true">→</span></button>
    </div>
  </div>;
}

const phoneKeys: Record<string, string> = {
  "1": "OBSERVATION / 観察モード", "2": "GRIP / 把持を確認", "3": "PEEL / 皮むきを承認", "4": "NO ASSIGNMENT", "5": "NO ASSIGNMENT", "6": "NO ASSIGNMENT", "7": "NO ASSIGNMENT", "8": "NO ASSIGNMENT", "9": "NO ASSIGNMENT", "*": "RETURN TO BANANA / バナナに戻る", "0": "SILENCE / 沈黙を転送", "#": "REASON DECLINED / 理由の提出を拒否",
};

export function PhoneConsole() {
  const [display, setDisplay] = useState("READY / BANANA CHANNEL OPEN");
  return <div className="phone-stage">
    <div className="phone-object" aria-label="PeelDial BP-08 操作模型"><div className="phone-speaker"><span /><span /><span /><span /><span /></div><div className="phone-display" aria-live="polite">{display}</div>
      <div className="phone-keypad">{Object.keys(phoneKeys).map((key) => <button type="button" onClick={() => setDisplay(phoneKeys[key])} key={key}>{key}</button>)}</div><div className="phone-mic"><span /><span /><span /></div>
    </div>
    <div className="phone-legend"><p><span>1</span>観察</p><p><span>2</span>把持</p><p><span>3</span>皮むき</p><p><span>0</span>沈黙</p><p><span>#</span>理由を拒否</p><p><span>*</span>バナナに戻る</p></div>
  </div>;
}
