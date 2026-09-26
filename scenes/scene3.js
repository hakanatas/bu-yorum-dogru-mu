/* SAHNE 3 — AFİŞ: YANILTICI GRAFİK (30–52 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 3, start: 30, end: 52, name: 'A misleading graph', nameTr: 'Yanıltıcı grafik', concept: 'The axis must start at 0', conceptTr: 'Eksen 0’dan başlamalı', render });
})(window.LI = window.LI || {});
