"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

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

export function ProtocolConsole() {
  return <div className="protocol-console protocol-plate" aria-label="空の白い四角形" />;
}

export function Banana3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const modeRef = useRef(0);
  const [mode, setMode] = useState(0);
  const liquidModes = [
    { n: "01", label: "DRIFT", value: 0 },
    { n: "02", label: "CURVE", value: 1 },
    { n: "03", label: "BANANA", value: 2 },
    { n: "04", label: "DISSOLVE", value: 3 },
  ];

  useEffect(() => { modeRef.current = mode; }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const vertexSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    const fragmentSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform vec2 u_pointer;
      uniform float u_time;
      uniform float u_mode;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), f.x), f.y);
      }
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p = p * 2.03 + 17.17;
          amplitude *= 0.5;
        }
        return value;
      }
      float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
      }
      mat2 rotate2d(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }
      float liquidField(vec2 p, float t) {
        vec2 drift = u_pointer * 0.11;
        vec2 a = vec2(-0.24 + sin(t * 0.61) * 0.17, 0.03 + cos(t * 0.43) * 0.14) + drift;
        vec2 b = vec2(0.15 + cos(t * 0.37) * 0.19, -0.03 + sin(t * 0.53) * 0.16) + drift * 0.4;
        vec2 c = vec2(0.02 + sin(t * 0.29 + 2.0) * 0.25, 0.18 + cos(t * 0.47) * 0.09) - drift * 0.3;
        float d = length((p - a) * vec2(0.88, 1.12)) - 0.34;
        d = smin(d, length((p - b) * vec2(1.15, 0.87)) - 0.31, 0.30);
        d = smin(d, length((p - c) * vec2(0.92, 1.18)) - 0.27, 0.26);
        return d;
      }
      float bananaField(vec2 p) {
        p = rotate2d(-0.18) * (p - vec2(-0.04, -0.01));
        p *= vec2(0.93, 1.07);
        float outer = length(p - vec2(0.0, -0.05)) - 0.67;
        float inner = length(p - vec2(0.03, 0.28)) - 0.57;
        float crescent = max(outer, -inner);
        float taper = abs(p.x) - 0.70 + smoothstep(-0.42, 0.32, p.y) * 0.10;
        return max(crescent, taper);
      }
      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
        p.x += 0.15;
        float t = u_time;
        float phase = mod(t, 10.0);
        float reveal = smoothstep(2.1, 4.4, phase) * (1.0 - smoothstep(6.0, 8.8, phase));
        if (u_mode > 0.5 && u_mode < 1.5) reveal = 0.48;
        if (u_mode > 1.5 && u_mode < 2.5) reveal = 1.0;
        if (u_mode > 2.5) reveal = 0.12 + 0.12 * sin(t * 1.7);

        float liquid = liquidField(p, t);
        float banana = bananaField(p);
        float turbulence = (fbm(p * 3.2 + vec2(t * 0.08, -t * 0.05)) - 0.5) * mix(0.115, 0.038, reveal);
        float d = mix(liquid, banana, reveal) + turbulence;
        float body = smoothstep(0.035, -0.028, d);
        float edge = exp(-abs(d) * 23.0);
        float aura = exp(-max(abs(d) - 0.01, 0.0) * 7.0);

        float texture = fbm(p * 5.5 - vec2(t * 0.05, t * 0.09));
        float sweep = 0.5 + 0.5 * sin(p.x * 3.4 - p.y * 2.1 + t * 0.72);
        vec3 deep = vec3(0.31, 0.17, 0.005);
        vec3 gold = vec3(0.94, 0.60, 0.0);
        vec3 lemon = vec3(1.0, 0.88, 0.20);
        vec3 fluid = mix(deep, gold, smoothstep(0.12, 0.86, texture));
        fluid = mix(fluid, lemon, smoothstep(0.62, 1.0, sweep) * 0.72);
        fluid *= 0.74 + 0.42 * reveal;

        vec3 background = vec3(0.008, 0.007, 0.001);
        background += vec3(0.055, 0.031, 0.0) * aura * 0.42;
        vec3 color = mix(background, fluid, body);
        color += vec3(1.0, 0.68, 0.08) * edge * (0.28 + reveal * 0.52);
        float glint = smoothstep(0.76, 1.0, noise(p * 9.0 + t * 0.2)) * edge;
        color += vec3(1.0, 0.92, 0.42) * glint * 0.65;
        float vignette = 1.0 - smoothstep(0.45, 1.18, length(p));
        color *= 0.76 + 0.24 * vignette;
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, "u_resolution");
    const pointer = gl.getUniformLocation(program, "u_pointer");
    const time = gl.getUniformLocation(program, "u_time");
    const modeUniform = gl.getUniformLocation(program, "u_mode");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const draw = (now: number) => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      gl.uniform2f(resolution, width, height);
      gl.uniform2f(pointer, pointerRef.current.x, pointerRef.current.y);
      gl.uniform1f(time, reduceMotion ? 4.8 : now * 0.001);
      gl.uniform1f(modeUniform, modeRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
    };
  };

  return <section className="banana-3d-section banana-liquid-section">
    <div className="banana-3d-layout">
      <div className="banana-3d-stage banana-liquid-stage" onPointerMove={handlePointerMove} onPointerLeave={() => { pointerRef.current = { x: 0, y: 0 }; }} aria-label="黄色い液体が一瞬バナナの形になる抽象アニメーション">
        <canvas ref={canvasRef} className="banana-liquid-canvas" aria-hidden="true" />
        <div className="banana-liquid-meta" aria-hidden="true"><span>YELLOW MATTER / 01</span><span>FORM IS TEMPORARY</span></div>
        <div className="banana-liquid-axis" aria-hidden="true"><span /><span /></div>
      </div>
      <aside className="banana-menu banana-liquid-menu" aria-label="液体バナナの形状メニュー">
        <div className="banana-menu-readout"><span>SUBSTANCE / 01</span><p>LIQUID BANANA TRACE</p><strong>黄色い流体は漂い、曲がり、一瞬だけバナナとして認識される。</strong></div>
        <div className="banana-menu-controls" role="group" aria-label="流体の状態を選択">
          {liquidModes.map((item) => <button type="button" key={item.n} onClick={() => setMode(item.value)} className={mode === item.value ? "active" : undefined}><span>{item.n}</span><strong>{item.label}</strong></button>)}
        </div>
        <button className="banana-menu-action" type="button" onClick={() => setMode((value) => (value + 1) % liquidModes.length)}><span>次の形状</span><span aria-hidden="true">→</span></button>
      </aside>
    </div>
    <p className="banana-3d-hint">MOVE POINTER / WAIT FOR THE BANANA / LOOP 10 SEC</p>
  </section>;
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
