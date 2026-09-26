/* Shared layout + Nokta helpers for "Bu Yorum Doğru mu?". */
(function (LI) {
  'use strict';
  const { clamp } = LI.E;
  LI.KD = {
    /** positions for 16:9 and 9:16 */
    L(env) {
      return env.V
        ? {
          K: { x0: -500, x1: 500, y0: -810, y1: -600, sx: -470, sy: -778, ss: 34, ty: [-712, -650], ts: 46, st: [300, -548] },
          CH: { ax: -430, by: -110, xs: [-280, -60, 160], bw: 120, ly: -70, ls: 34, h: 310 },
          Q: { x: 0, y: 30, dy: 72, size: 46 },
          P: { x: -225, y: -450, dx: 50, dy: 50, cols: 10, rows: 6 },
          CL: { x: -430, ty: -560, ts: 56, y: [-440, -340, -240], s: 44, chip: { x: [0, 0, 0], y: [-90, 0, 90] } },
          nx: -360, gy: 560, s: 1.15 }
        : {
          K: { x0: -640, x1: 780, y0: -500, y1: -340, sx: -610, sy: -468, ss: 38, ty: [-405], ts: 54, st: [640, -300] },
          CH: { ax: -630, by: 200, xs: [-500, -310, -120], bw: 120, ly: 248, ls: 38, h: 340 },
          Q: { x: 470, y: -190, dy: 88, size: 56 },
          P: { x: -610, y: -200, dx: 50, dy: 50, cols: 12, rows: 5 },
          CL: { x: -420, ty: -340, ts: 66, y: [-200, -90, 20], s: 58, chip: { x: [-310, 90, 500], y: [170, 170, 170] } },
          nx: -790, gy: 262, s: 1.15 };
    },
    cam(env, o = {}) { return Object.assign({ x: env.V ? 0 : -60, y: env.V ? 60 : 0, zoom: 1, rot: 0, tilt: 1 }, o); },
    /** pupils + face toward a world point */
    look(p, target) {
      const e = LI.Nokta.eyes(p)[0];
      const dx = target[0] - e[0], dy = target[1] - e[1], d = Math.hypot(dx, dy) || 1;
      p.lookX = clamp(dx / d * 1.1, -1, 1); p.lookY = clamp(dy / d * 1.1, -1, 1);
      p.turn = clamp(dx / 900, -0.5, 0.5);
      return p;
    },
    /** a short ground stroke under Nokta */
    ground(ctx, env, x, gy) { LI.Ambient.ground(ctx, x - 360, x + 360, gy + 6, { alpha: 0.32 }); },
  };
})(window.LI = window.LI || {});
