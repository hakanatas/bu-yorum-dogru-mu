/* SAHNE 4 — DUYURU: YANLI ÖRNEKLEM (52–72 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 4, start: 52, end: 72, name: 'A biased sample', nameTr: 'Yanlı örneklem', concept: 'Only the basketball team was asked', conceptTr: 'Sadece basketbol takımına soruldu', render });
})(window.LI = window.LI || {});
