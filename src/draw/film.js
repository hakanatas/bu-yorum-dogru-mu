/* ─────────────────────────────────────────────────────────────
   The film's continuous state as pure functions of time.
   Three claims based on categorical data are checked one by one:
   accept (the numbers support it), refute (misleading axis), refute (biased sample).
   ───────────────────────────────────────────────────────────── */
(function (LI) {
  'use strict';
  const { seg, clamp, lerp, outBack, outCubic, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, Ink = LI.Ink;

  /** the three claims we examine */
  const CLAIMS = [
    { src: 'Okul gazetesi', text: ['“Çoğumuz okula yürüyerek geliyor.”'], textV: ['“Çoğumuz okula', 'yürüyerek geliyor.”'], t0: 10.4, t1: 30.0, ok: true, tv: 24.8 },
    { src: 'Afiş', text: ['“Kırmızıyı sevenler, maviyi sevenlerin iki katı!”'], textV: ['“Kırmızıyı sevenler,', 'maviyi sevenlerin iki katı!”'], t0: 30.4, t1: 52.0, ok: false, tv: 47.0 },
    { src: 'Duyuru', text: ['“Okulumuzun en sevdiği spor: basketbol!”'], textV: ['“Okulumuzun en sevdiği', 'spor: basketbol!”'], t0: 52.4, t1: 72.0, ok: false, tv: 67.0 },
  ];
  const T = (ctx, s, x, y, o = {}) => A.text(ctx, s, x, y, Object.assign({ size: 48 }, o));
  const AMB = { color: A.amber };

  /** a small ink dot with eyes (a student); ring: amber ring alpha; fade: how faint */
  function student(ctx, x, y, k, a, ring = 0) {
    if (k <= 0 || a <= 0) return;
    const r = 14 * outBack(clamp(k));
    ctx.fillStyle = `rgba(${LI.INK_RGB},${0.82 * a})`; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(${LI.PAPER_RGB},${a})`;
    [-5, 5].forEach((dx) => { ctx.beginPath(); ctx.arc(x + dx * k, y - 3, 2.8 * k, 0, Math.PI * 2); ctx.fill(); });
    if (ring > 0) { ctx.strokeStyle = `rgba(${LI.AMBER_RGB},${ring * a})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r + 6, 0, Math.PI * 2); ctx.stroke(); }
  }

  /** a rubber stamp: "KABUL" (amber) or "ÇÜRÜTÜLDÜ" (ink), tilted, popping in at t0 */
  function stamp(ctx, x, y, ok, t, t0, a = 1) {
    const k = seg(t, t0, t0 + 0.35); if (k <= 0 || a <= 0) return;
    const s = ok ? 'KABUL' : 'ÇÜRÜTÜLDÜ', size = 50, sc = 1.6 - 0.6 * outBack(k);
    ctx.save(); ctx.translate(x, y); ctx.rotate(-0.16); ctx.scale(sc, sc);
    const w = width(ctx, s, size) + 44, h = size * 1.35, col = ok ? LI.AMBER_RGB : LI.INK_RGB;
    ctx.fillStyle = `rgba(${LI.PAPER_RGB},${0.85 * a * k})`; ctx.fillRect(-w / 2, -h / 2, w, h);
    Ink.path(ctx, [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2]], { w: 7, color: col, alpha: a * k, seed: ok ? 11 : 12, taper: [0, 0], wob: 0.2, dry: 0.5 });
    T(ctx, s, 0, 2, { size, alpha: a * k, color: (x) => `rgba(${col},${x})` });
    ctx.restore();
  }

  /** a bar chart: vals, labels; axis from vmin; px per unit u; o.hi = index to highlight */
  function bars(ctx, env, t, o) {
    const L = KD.L(env), C = L.CH, a = o.alpha; if (a <= 0) return;
    const xs = o.xs || C.xs, right = xs[xs.length - 1] + C.bw / 2 + 50, top = C.by - C.h - 30;
    Ink.path(ctx, [[C.ax, top], [C.ax, C.by], [right, C.by]], { w: 6, p: o.axisP ?? 1, alpha: a, seed: 81, taper: [0.05, 0.05] });
    const vmin = o.vmin ?? 0, u = o.u, step = o.step ?? 2;
    for (let v = Math.ceil(vmin); v <= o.vmax; v++) {
      const y = C.by - (v - vmin) * u; if (y < top - 1) break;
      Ink.path(ctx, [[C.ax - 8, y], [C.ax + 8, y]], { w: 3, alpha: 0.7 * a * (o.tickA ?? 1), seed: 90 + v, taper: [0, 0] });
      if (v % step === 0 || (o.labelMin && v === Math.ceil(vmin))) T(ctx, String(v), C.ax - 18, y, Object.assign({ size: 28, alpha: a * (o.tickA ?? 1), align: 'right' }, o.axisAmber ? AMB : {}));
    }
    o.vals.forEach((v, k) => {
      const x = xs[k], g = o.grow ? o.grow(k) : 1, h = Math.max(0, (v - vmin) * u) * g;
      T(ctx, o.labels[k], x, C.ly, { size: C.ls, alpha: a });
      if (g <= 0) return;
      const strong = o.hi === k ? (o.hiA ?? 1) : 0;
      if (o.color && o.color[k]) ctx.fillStyle = o.color[k](a);
      else ctx.fillStyle = `rgba(${LI.AMBER_RGB},${(0.3 + 0.35 * strong) * a})`;
      ctx.fillRect(x - C.bw / 2, C.by - h, C.bw, h);
      Ink.path(ctx, [[x - C.bw / 2, C.by], [x - C.bw / 2, C.by - h], [x + C.bw / 2, C.by - h], [x + C.bw / 2, C.by]], { w: 5, alpha: a, seed: 100 + k, taper: [0, 0], wob: 0.05 });
      const va = seg(g, 0.9, 1) * a;
      if (va > 0 && o.values !== false) T(ctx, String(v), x, C.by - h - 32, Object.assign({ size: 44, alpha: va }, strong > 0 ? AMB : {}));
    });
  }

  /** a hand-drawn check mark at (x, y) */
  function tick(ctx, x, y, p, a = 1) {
    if (p <= 0 || a <= 0) return;
    Ink.path(ctx, [[x, y], [x + 12, y + 14], [x + 38, y - 20]], { w: 7, p, alpha: a, color: LI.AMBER_RGB, seed: 401, taper: [0.05, 0.3] });
  }
  /** text width in the brush font */
  function width(ctx, s, size) { ctx.save(); ctx.font = `${size}px "LI Brush", "Comic Sans MS", cursive`; const w = ctx.measureText(s).width; ctx.restore(); return w; }

  /** Nokta, as a function of time */
  function nokta(t, env) {
    const L = KD.L(env);
    const p = { x: L.nx, y: L.gy, s: L.s, mouth: 0.4, brow: 0.1 };
    const g = outCubic(seg(t, 1.3, 2.3));
    p.born = { body: lerp(0.3, 1, g), legs: outCubic(seg(t, 2.0, 2.6)), arms: outCubic(seg(t, 2.3, 2.8)), tuft: outBack(seg(t, 2.5, 2.9)) };
    if (t < 3.0) { p.sq = lerp(0.4, 1, clamp(LI.E.spring(seg(t, 1.3, 3.0) * 2, 8, 3.4), 0, 1.3)); p.drop = 1 - g; p.wobble = 1 - seg(t, 1.3, 2.8); }
    p.eyeOpen = outCubic(seg(t, 2.8, 3.1));
    KD.look(p, [L.Q.x, L.Q.y]);
    if (t > 10 && t < 13 || t > 30.2 && t < 33 || t > 52.2 && t < 55) KD.look(p, [(L.K.x0 + L.K.x1) / 2, L.K.ty[0]]);
    if (t > 36 && t < 44) KD.look(p, [L.CH.xs[0], L.CH.by - 120]);
    if (t > 56 && t < 63) KD.look(p, [L.P.x + 80, L.P.y + 40]);
    if (t > 72) KD.look(p, [L.CL.x + 200, L.CL.y[1]]);
    if (t > 2.9 && t < 5.6) { p.hold = 'brush'; p.brushAng = -0.8 + 0.3 * Math.sin(t * 9); p.hands = { R: [1.35, -0.2 + 0.15 * Math.sin(t * 9)] }; }
    const pointing = (a, b) => { if (t > a && t < b) { p.point = 'R'; p.hands = { L: [-1.2, 0.55], R: [1.5, -0.35] }; } };
    pointing(16.0, 19.0); pointing(36.2, 39.6); pointing(58.0, 62.4); pointing(73.0, 76.0);
    const think = seg(t, 11.6, 12.0) * (1 - seg(t, 14.6, 14.9)) + seg(t, 32.0, 32.4) * (1 - seg(t, 35.4, 35.7)) + seg(t, 54.0, 54.4) * (1 - seg(t, 57.4, 57.7));
    if (think > 0) { p.hands = { L: [-1.2, 0.55], R: [0.75, -1.05 + 0.08 * Math.sin(t * 14)] }; p.brow = -0.5 * think; p.mouth = 0; p.lookY -= 0.3; }
    if (t > 41.8 && t < 43.4 || t > 61.0 && t < 62.4) { p.mouthOpen = 0.55; p.eyeScale = 1.1; }
    if (t > 47.2 && t < 49.6 || t > 67.2 && t < 69.6) { p.brow = -0.3; p.mouth = -0.3; }
    const joy = (a, b) => { if (t > a && t < b) { p.squint = 1; p.mouth = 1; p.sq = 1 + 0.1 * hump(t, a, a + 0.6); p.y -= 26 * hump(t, a, a + 0.6); p.hands = { L: [-1.3, -0.35], R: [1.3, -0.35] }; } };
    joy(25.2, 26.8); joy(79.0, 80.6);
    if (t > 84.0) {
      const j = (t - 84.0) % 1.4;
      p.squint = 1; p.mouth = 1; p.turn = 0.15; p.lookX = 0.3; p.lookY = 0;
      p.sq = 1 + 0.1 * Math.sin(Math.PI * clamp(j / 0.6)); p.y -= 40 * Math.sin(Math.PI * clamp(j / 0.6));
      p.hands = { L: [-1.35, -0.6 - 0.2 * Math.sin(t * 6)], R: [1.35, -0.6 + 0.2 * Math.sin(t * 6)] };
      if (t > 89.2) { p.squint = 0; p.lookX = 0; p.lookY = 0.2; p.turn = 0; p.y = L.gy; p.sq = 1; p.hands = { L: [-1.2, 0.55], R: [1.2, -1.0 + 0.25 * Math.sin(t * 10)] }; }
    }
    p.blink = Math.max(hump(t, 5.8, 5.95), hump(t, 21.0, 21.15), hump(t, 29.0, 29.15), hump(t, 45.0, 45.15), hump(t, 64.0, 64.15), hump(t, 77.0, 77.15));
    return p;
  }

  function base(ctx, env, t, cam, drawBefore) {
    const L = KD.L(env);
    LI.Ambient.specks(ctx, env, cam, t, { alpha: 0.22, n: 18, depth: 0.4, seed: 21 });
    LI.Camera.apply(ctx, env, cam);
    KD.ground(ctx, env, L.nx, L.gy);
    if (drawBefore) drawBefore();
    LI.Nokta.draw(ctx, LI.Nokta.follow((tt) => nokta(tt, env), t), t);
    if (t < 1.35 && t > 0.3) { const f = seg(t, 0.3, 1.3); Ink.dot(ctx, L.nx, lerp(-700, L.gy - 14, f * f), 15, { seed: 2, bleed: 0 }); }
    if (t > 1.3) Ink.drops(ctx, L.nx, L.gy - 4, t - 1.3, { n: 9, seed: 5, ground: L.gy + 4, scale: 0.8, alpha: 1 - seg(t, 4, 8) * 0.6 });
    return L;
  }

  LI.Film = { CLAIMS, T, AMB, student, stamp, bars, tick, width, nokta, base };
})(window.LI = window.LI || {});
