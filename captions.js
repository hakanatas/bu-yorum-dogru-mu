/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 3.6, end: 9.6, tr: 'Bir yorum duyunca sor: doğru mu?', en: 'When you hear a claim, ask: is it right?',
      note: 'Gazetelerde, afişlerde, duyurularda veriye dayanan yorumlar görürüz. Hemen inanmayalım; önce veriye bakalım.' },
    { scene: 2, start: 10.6, end: 15.8, tr: 'Okul gazetesi: “Çoğumuz okula yürüyerek geliyor.”', en: 'School paper: “Most of us walk to school.”',
      note: 'Okul gazetesi 30 öğrenciye sormuş: 16 kişi yürüyerek, 9 kişi servisle, 5 kişi arabayla geliyor. Gazete, çoğumuzun yürüyerek geldiğini yazmış.' },
    { scene: 2, start: 16.2, end: 21.8, tr: 'Kontrol edelim: 30 kişinin yarısı 15', en: 'Let’s check: half of 30 is 15',
      note: 'Çoğu demek, yarısından fazlası demek. Toplam 30 kişi; yarısı 15.' },
    { scene: 2, start: 22.2, end: 29.4, tr: '16, 15’ten fazla: yorum doğru, kabul!', en: '16 is more than 15: the claim holds, accepted!',
      note: '16, 15’ten fazla. Sayılar yorumu destekliyor; bu yorumu kabul ediyoruz.' },
    { scene: 3, start: 30.6, end: 35.2, tr: 'Afiş: “Kırmızıyı sevenler, maviyi sevenlerin iki katı!”', en: 'Poster: “Twice as many like red as like blue!”',
      note: 'Bir afişte bu grafik var: kırmızı sütun, mavi sütunun iki katı gibi görünüyor.' },
    { scene: 3, start: 35.6, end: 39.8, tr: 'Dikkat: grafiğin ekseni 10’dan başlıyor', en: 'Careful: the graph’s axis starts at 10',
      note: 'Ama dikkat! Grafiğin ekseni sıfırdan değil, 10’dan başlıyor. Bu, farkı olduğundan büyük gösteriyor.' },
    { scene: 3, start: 40.2, end: 46.2, tr: 'Eksen 0’dan başlayınca: 12 ile 11, neredeyse eşit', en: 'Start the axis at 0: 12 and 11, almost equal',
      note: 'Ekseni sıfırdan başlatalım. Kırmızı 12, mavi 11. İki katı değil, neredeyse eşit.' },
    { scene: 3, start: 46.6, end: 51.6, tr: 'Grafik yanıltıcıydı: yorum çürütüldü', en: 'The graph was misleading: claim refuted',
      note: 'Grafik yanıltıcı çizilmiş, yorum da yanlış. Bu yorumu çürütüyoruz.' },
    { scene: 4, start: 52.6, end: 57.4, tr: 'Duyuru: “Okulumuzun en sevdiği spor: basketbol!”', en: 'Notice: “Our school’s favourite sport: basketball!”',
      note: 'Bir duyuruda okulun en sevdiği sporun basketbol olduğu yazıyor. 12 kişiye sorulmuş, 12’si de basketbol demiş.' },
    { scene: 4, start: 57.8, end: 62.6, tr: 'Kime soruldu? Sadece 12 kişiye', en: 'Who was asked? Only 12 people',
      note: 'Soralım: Kime sorulmuş? Okulda 60 öğrenci var ama sadece 12 kişiye sorulmuş.' },
    { scene: 4, start: 63.0, end: 67.4, tr: 'Hepsi basketbol takımından: bu yanlılık!', en: 'All from the basketball team: that’s bias!',
      note: 'Üstelik bu 12 kişinin hepsi basketbol takımından. Böyle seçilen bir grup, bütün okulu temsil etmez. Buna yanlılık denir.' },
    { scene: 4, start: 67.8, end: 71.6, tr: 'Okulun tamamını göstermiyor: çürütüldü', en: 'It doesn’t represent the whole school: refuted',
      note: 'Bu veri bütün okul için bir şey söylemez. Yorumu çürütüyoruz.' },
    { scene: 5, start: 72.6, end: 77.2, tr: 'Bir yorumu okurken üç soru sor', en: 'Ask three questions when you read a claim',
      note: 'Bir yorumu okurken üç soru soralım.' },
    { scene: 5, start: 77.6, end: 81.8, tr: 'Kime soruldu? Grafik doğru mu? Sayılar destekliyor mu?', en: 'Who was asked? Is the graph right? Do the numbers support it?',
      note: 'Kime ve kaç kişiye soruldu? Grafik doğru çizilmiş mi? Sayılar yorumu destekliyor mu?' },
    { scene: 6, start: 82.6, end: 86.6, tr: 'Veriye bakarak kabul et ya da çürüt', en: 'Accept or refute by looking at the data',
      note: 'Cevaplara göre yorumu ya kabul ederiz ya da çürütürüz.' },
    { scene: 6, start: 87.0, end: 91.0, tr: 'Her yoruma hemen inanma, veriye bak!', en: 'Don’t believe every claim, look at the data!',
      note: 'Her yoruma hemen inanmayalım; önce veriye bakalım!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
