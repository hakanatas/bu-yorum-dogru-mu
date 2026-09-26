/* SAHNE 5 — ÜÇ SORU (72–82 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 5, start: 72, end: 82, name: 'Three questions', nameTr: 'Üç soru', concept: 'Who was asked? Is the graph right? Do the numbers fit?', conceptTr: 'Kime soruldu? Grafik doğru mu? Sayılar uyuyor mu?', render });
})(window.LI = window.LI || {});
