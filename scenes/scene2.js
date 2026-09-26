/* SAHNE 2 — GAZETE: KABUL (10–30 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 2, start: 10, end: 30, name: 'Accept', nameTr: 'Kabul', concept: '16 of 30 walk: more than half', conceptTr: '30 kişiden 16’sı yürüyor: yarıdan fazla', render });
})(window.LI = window.LI || {});
