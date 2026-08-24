"use client";

import { useState } from "react";

const monkeyStates = [
  { id: "see", number: "01", ja: "見ざる", en: "SEE NO EVIL", note: "視界から理由を除外する。", image: "/monkey-see-line.png" },
  { id: "hear", number: "02", ja: "聞かざる", en: "HEAR NO EVIL", note: "説明要求を受信しない。", image: "/monkey-hear-line.png" },
  { id: "speak", number: "03", ja: "言わざる", en: "SPEAK NO EVIL", note: "弁明を出力しない。", image: "/monkey-speak-line.png" },
  { id: "eat", number: "04", ja: "食べる", en: "EAT THE BANANA", note: "残された唯一の操作を実行する。", image: null },
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
          className={selected ? "selected" : undefined}
          onMouseEnter={() => setActive(state)}
          onFocus={() => setActive(state)}
          onClick={() => setActive(state)}
          key={state.id}
        >
          <span className="state-number">{state.number}</span>
          <span className="state-art" aria-hidden="true">
            {state.image ? <img src={state.image} alt="" /> : <span className="banana-line-art" />}
          </span>
          <strong>{state.ja}</strong>
        </button>;
      })}
    </div>
    <div className="state-readout" id="state-readout" role="tabpanel" aria-live="polite"><span className="status-light" /><p>{active.en}</p><strong>{active.note}</strong></div>
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
