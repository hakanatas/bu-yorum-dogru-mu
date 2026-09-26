/* SAHNE 1 — BU YORUM DOĞRU MU? (0–10 s)  Before believing a claim, check the data.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut, outBack } = LI.E;
  const KD = LI.KD, F = () => LI.Film, Ink = LI.Ink, A = LI.Ang;

  function intro(ctx, env, t) {
    const f = F(), i = seg(t, 3.4, 4.2) * (1 - seg(t, 9.6, 10.2)); if (i <= 0) return;
    const x = env.V ? 0 : 60, y = env.V ? -600 : -170;
    f.T(ctx, 'Bir yorum duyunca sor:', x, y, { size: env.V ? 56 : 64, alpha: i, p: seg(t, 3.4, 5.0) });
    f.T(ctx, 'Bu yorum doğru mu?', x, y + (env.V ? 110 : 130), Object.assign({ size: (env.V ? 70 : 84) * outBack(seg(t, 5.4, 6.0)), alpha: i }, f.AMB));
  }

  /** the claim card, the strike-through and the stamp */
  function cards(ctx, env, t) {
    const L = KD.L(env), K = L.K, f = F();
    f.CLAIMS.forEach((c) => {
      const a = seg(t, c.t0, c.t0 + 0.6) * (1 - seg(t, c.t1 - 0.6, c.t1)); if (a <= 0) return;
      const P = [[K.x0, K.y1], [K.x1, K.y1], [K.x1, K.y0], [K.x0, K.y0]];
      Ink.path(ctx, P.concat([P[0]]), { w: 5, p: seg(t, c.t0, c.t0 + 0.8), alpha: a, seed: 31, taper: [0, 0], wob: 0.15 });
      f.T(ctx, c.src + ':', K.sx, K.sy, Object.assign({ size: K.ss, alpha: a, align: 'left' }, f.AMB));
      const lines = env.V ? c.textV : c.text, cx = (K.x0 + K.x1) / 2;
      lines.forEach((s, k) => {
        f.T(ctx, s, cx, K.ty[k], { size: K.ts, alpha: a, p: seg(t, c.t0 + 0.5 + k * 0.8, c.t0 + 1.8 + k * 0.8) });
        if (!c.ok) {
          const w = f.width(ctx, s, K.ts);
          Ink.path(ctx, [[cx - w / 2 - 10, K.ty[k] + 4], [cx + w / 2 + 10, K.ty[k] - 4]], { w: 6, p: seg(t, c.tv - 0.6 + k * 0.2, c.tv - 0.1 + k * 0.2), alpha: a, seed: 140 + k, taper: [0.1, 0.1] });
        }
      });
      f.stamp(ctx, K.st[0], K.st[1], c.ok, t, c.tv, a);
    });
  }

  /** lines of reasoning next to the chart */
  function lines(ctx, env, t, list, a) {
    const L = KD.L(env), Q = L.Q, f = F();
    list.forEach(([s, t0, amber, tk]) => {
      if (t < t0) return;
      const y = Q.y + Q.dy * list.indexOf(list.find((x) => x[0] === s));
      f.T(ctx, s, Q.x, y, Object.assign({ size: Q.size, p: seg(t, t0, t0 + 1.0), alpha: a, halo: true }, amber ? f.AMB : {}));
      if (tk) f.tick(ctx, Q.x + f.width(ctx, s, Q.size) / 2 + 24, y, seg(t, t0 + 1.0, t0 + 1.5), a);
    });
  }

  /** claim 1: the numbers support it */
  function claim1(ctx, env, t) {
    const L = KD.L(env), C = L.CH, f = F(), a = seg(t, 12.6, 13.2) * (1 - seg(t, 29.4, 30.0)); if (a <= 0) return;
    const u = C.h / 17;
    f.bars(ctx, env, t, { alpha: a, vals: [16, 9, 5], labels: ['yürüyerek', 'servis', 'araba'], u, vmax: 17, step: 4, axisP: seg(t, 12.6, 13.4),
      grow: (k) => seg(t, 13.4 + k * 0.5, 14.4 + k * 0.5), hi: 0, hiA: seg(t, 22.2, 22.8) });
    const h = seg(t, 19.6, 20.6) * a;
    if (h > 0) {
      const y = C.by - 15 * u, x1 = C.xs[2] + C.bw / 2 + 30;
      for (let x = C.ax; x < lerp(C.ax, x1, h); x += 26) Ink.path(ctx, [[x, y], [Math.min(x + 14, x1), y]], { w: 4, color: LI.AMBER_RGB, alpha: a, seed: 150 + x, taper: [0, 0] });
      f.T(ctx, 'yarısı: 15', x1 + 10, y, Object.assign({ size: 38, alpha: h, align: 'left' }, f.AMB));
    }
    lines(ctx, env, t, [['toplam: 16 + 9 + 5 = 30', 16.2], ['yarısı: 30 ÷ 2 = 15', 19.2], ['16 > 15: çoğu yürüyor', 22.2, true, true]], a);
  }

  /** claim 2: a bar graph whose axis does not start at 0 */
  function claim2(ctx, env, t) {
    const L = KD.L(env), C = L.CH, f = F(), a = seg(t, 32.4, 33.0) * (1 - seg(t, 51.4, 52.0)); if (a <= 0) return;
    const vmin = lerp(10, 0, inOut(seg(t, 39.8, 42.0))), u = C.h / (12.6 - vmin);
    f.bars(ctx, env, t, { alpha: a, vals: [12, 11], xs: [C.xs[0], C.xs[1]], labels: ['kırmızı', 'mavi'], u, vmin, vmax: 13, step: vmin > 4 ? 1 : 2, labelMin: true,
      axisP: seg(t, 32.4, 33.2), grow: (k) => seg(t, 33.0 + k * 0.5, 34.0 + k * 0.5) });
    const r = seg(t, 35.4, 35.9) * (1 - seg(t, 39.6, 40.0)) * a;
    if (r > 0) {
      A.arc(ctx, [C.ax - 30, C.by], 34, 0, 360 * seg(t, 35.4, 36.2), { alpha: r, w: 5, seed: 160 });
      f.T(ctx, '10’dan başlıyor!', C.ax - 60, C.by + 100, Object.assign({ size: 38, alpha: r, align: 'left', halo: true }, f.AMB));
    }
    lines(ctx, env, t, [['kırmızı 12, mavi 11', 33.6], ['eksen 10’dan başlıyor!', 35.4, true], ['0’dan başlatalım', 39.0], ['12 ile 11: neredeyse eşit', 43.0, true]], a);
  }

  /** claim 3: only the basketball team was asked */
  function claim3(ctx, env, t) {
    const L = KD.L(env), P = L.P, f = F(), a = seg(t, 54.4, 55.0) * (1 - seg(t, 71.4, 72.0)); if (a <= 0) return;
    const dim = 1 - 0.65 * seg(t, 58.2, 59.0);
    for (let i = 0; i < P.cols * P.rows; i++) {
      const c = i % P.cols, r = Math.floor(i / P.cols), asked = c < 4 && r < 3;
      const x = P.x + c * P.dx, y = P.y + r * P.dy + 2 * Math.sin(t * 2 + i);
      f.student(ctx, x, y, seg(t, 54.6 + i * 0.015, 55.0 + i * 0.015), a * (asked ? 1 : dim), asked ? seg(t, 56.4, 56.9) : 0);
    }
    const lp = seg(t, 60.6, 61.6) * a;
    if (lp > 0) {
      const cx = P.x + 1.5 * P.dx, cy = P.y + P.dy, rx = 2.6 * P.dx, ry = 1.9 * P.dy, pts = [];
      for (let k = 0; k <= 40; k++) { const th = -Math.PI / 2 + (k / 40) * Math.PI * 2.05; pts.push([cx + rx * Math.cos(th), cy + ry * Math.sin(th)]); }
      Ink.path(ctx, pts, { w: 5, p: lp, alpha: a, color: LI.AMBER_RGB, seed: 170, taper: [0.1, 0.1] });
      f.T(ctx, 'basketbol takımı', cx, cy + ry + 38, Object.assign({ size: 38, alpha: seg(t, 61.2, 61.8) * a, halo: true }, f.AMB));
    }
    lines(ctx, env, t, [['sorulan: 12 kişi', 57.0], ['12’si de: basketbol', 58.6], ['hepsi basketbol takımından!', 61.0, true], ['okulda 60 kişi var', 63.4]], a);
  }

  /** the checklist (72–92 s) */
  const ASK = ['Kime, kaç kişiye soruldu?', 'Grafik doğru çizilmiş mi?', 'Sayılar yorumu destekliyor mu?'];
  const CHIPS = [['gazete: KABUL', true], ['afiş: ÇÜRÜTÜLDÜ', false], ['duyuru: ÇÜRÜTÜLDÜ', false]];
  function checklist(ctx, env, t) {
    const L = KD.L(env), CL = L.CL, f = F(); if (t < 72.2) return;
    f.T(ctx, 'Bir yorumu okurken sor:', CL.x - 60, CL.ty, { size: CL.ts, p: seg(t, 72.4, 73.6), align: 'left' });
    ASK.forEach((s, k) => {
      const b = seg(t, 73.6 + k * 0.9, 74.2 + k * 0.9); if (b <= 0) return;
      const y = CL.y[k], x = CL.x;
      Ink.path(ctx, [[x - 50, y - 18], [x - 14, y - 18], [x - 14, y + 18], [x - 50, y + 18], [x - 50, y - 18]], { w: 4, alpha: b, seed: 180 + k, taper: [0, 0] });
      f.T(ctx, s, x + 10, y + 2, { size: CL.s, alpha: b, align: 'left' });
      f.tick(ctx, x - 48, y - 2, seg(t, 77.0 + k * 0.5, 77.4 + k * 0.5), b);
    });
    CHIPS.forEach(([s, ok], k) => {
      const b = seg(t, 82.4 + k * 0.6, 82.9 + k * 0.6); if (b <= 0) return;
      f.T(ctx, s, CL.chip.x[k], CL.chip.y[k], Object.assign({ size: env.V ? 42 : 50, alpha: b, halo: true }, ok ? f.AMB : {}));
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { intro(ctx, env, t); claim1(ctx, env, t); claim2(ctx, env, t); claim3(ctx, env, t); cards(ctx, env, t); checklist(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'Is it right?', nameTr: 'Doğru mu?', concept: 'Check claims with data', conceptTr: 'Yorumları veriyle kontrol et', render });
})(window.LI = window.LI || {});
