(() => {
  const stage = document.querySelector(".banana-liquid-stage");
  const canvas = document.querySelector(".banana-liquid-canvas");
  if (!stage || !canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const pointer = { x: 0, y: 0 };
  let mode = 0;
  let frame = 0;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
    canvas.height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const setMode = (next) => {
    mode = next;
    document.querySelectorAll(".banana-menu-controls button").forEach((button, index) => {
      button.classList.toggle("active", index === mode);
    });
    const readout = document.querySelector(".banana-menu-readout span");
    if (readout) readout.textContent = `FORM OBSERVATION / 0${mode + 1}`;
  };

  const drawBanana = (cx, cy, scale, alpha) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-0.18);
    ctx.scale(scale, scale);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(-145, 72);
    ctx.bezierCurveTo(-92, -118, 96, -128, 155, 20);
    ctx.bezierCurveTo(89, -28, -19, -22, -76, 111);
    ctx.bezierCurveTo(-98, 132, -126, 117, -145, 72);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(-140, -90, 145, 100);
    gradient.addColorStop(0, "#f8dc45");
    gradient.addColorStop(0.55, "#e6aa16");
    gradient.addColorStop(1, "#9a6715");
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = "rgba(85,61,17,.55)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  };

  const draw = (now) => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) {
      frame = requestAnimationFrame(draw);
      return;
    }
    const t = now * 0.001;
    const phase = (t % 10) / 10;
    const reveal = mode === 3 ? 0.88 : mode === 2 ? 0.12 : mode === 1 ? 0.5 : Math.max(0, Math.sin(phase * Math.PI * 2) * 0.5 + 0.32);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#f7f4ea";
    ctx.fillRect(0, 0, width, height);

    const cx = width * (0.5 + pointer.x * 0.035);
    const cy = height * (0.52 - pointer.y * 0.035);
    for (let i = 0; i < 18; i += 1) {
      const a = t * (0.35 + i * 0.012) + i * 1.7;
      const orbit = 22 + (i % 6) * 13;
      const x = cx + Math.cos(a) * orbit;
      const y = cy + Math.sin(a * 1.19) * orbit * 0.72;
      const radius = 35 + (i % 5) * 11;
      const blob = ctx.createRadialGradient(x - radius * 0.22, y - radius * 0.28, 1, x, y, radius);
      blob.addColorStop(0, "rgba(255,232,101,.52)");
      blob.addColorStop(0.52, "rgba(228,171,20,.22)");
      blob.addColorStop(1, "rgba(228,171,20,0)");
      ctx.fillStyle = blob;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    drawBanana(cx, cy, 0.72 + reveal * 0.1, reveal * 0.6);
    ctx.strokeStyle = "rgba(61,48,21,.18)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 22 + Math.sin(t * 1.4) * 5, 0, Math.PI * 2);
    ctx.stroke();
    frame = requestAnimationFrame(draw);
  };

  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  });
  stage.addEventListener("pointerleave", () => { pointer.x = 0; pointer.y = 0; });
  document.querySelectorAll(".banana-menu-controls button").forEach((button, index) => button.addEventListener("click", () => setMode(index)));
  document.querySelector(".banana-liquid-intro button")?.addEventListener("click", () => setMode(2));
  window.addEventListener("resize", resize);
  resize();
  setMode(0);
  frame = requestAnimationFrame(draw);
  window.addEventListener("pagehide", () => cancelAnimationFrame(frame), { once: true });
})();
