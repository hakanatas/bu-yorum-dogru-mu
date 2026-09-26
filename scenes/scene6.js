/* SAHNE 6 — AKLINDA KALSIN (82–92 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); LI.fireworks(ctx, env, t); }
  LI.registerScene({ id: 6, start: 82, end: 92, name: 'Remember', nameTr: 'Aklında kalsın', concept: 'Look at the data before you believe', conceptTr: 'İnanmadan önce veriye bak', render });
})(window.LI = window.LI || {});
