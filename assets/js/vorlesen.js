/*
 * Vorlesen mit den Stimmen des Browsers – die Seite spricht, das Kind muss nie.
 *
 * Ohne Auswahl nimmt die Seite die natürlichste deutsche Stimme, z. B.
 * „Microsoft Katja/Amala/Conrad Online (Natural)“ in Edge oder „Google Deutsch“ in Chrome.
 * Eine im Elternbereich gewählte Stimme wird immer benutzt.
 */
(function (T) {
  var synth = window.speechSynthesis || null;
  var stimmen = [];
  var aktiv = false;
  var lauf = 0;          // erhöht sich bei jedem Start/Stopp – alte Abläufe brechen dann ab
  var beobachter = [];

  // Je natürlicher, desto höher
  function rang(v) {
    var n = v.name || "", r = 0;
    if (/natural/i.test(n)) r += 100;
    if (/online/i.test(n)) r += 60;
    if (/google/i.test(n)) r += 45;
    if (/neural|premium|enhanced|siri/i.test(n)) r += 40;
    if (/desktop/i.test(n)) r -= 10;
    if (/de-DE/i.test(v.lang)) r += 10;
    if (v.localService === false) r += 5;
    return r;
  }

  function melde() { beobachter.forEach(function (fn) { fn(); }); }

  function ladeStimmen() {
    if (!synth) return;
    stimmen = synth.getVoices()
      .filter(function (v) { return /^de/i.test(v.lang); })
      .sort(function (a, b) { return rang(b) - rang(a); });
    melde();
  }
  if (synth) {
    ladeStimmen();
    if (synth.addEventListener) synth.addEventListener("voiceschanged", ladeStimmen);
    else synth.onvoiceschanged = ladeStimmen;
  }

  function stimme() {
    var gewaehlt = T.speicher.get("stimme");
    return stimmen.find(function (v) { return v.name === gewaehlt; }) || stimmen[0] || null;
  }

  function normalisiere(text) { return String(text).replace(/\s+/g, " ").trim(); }

  function sprichAbschnitt(text, weiter) {
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    var s = stimme();
    if (s) u.voice = s;
    u.rate = Number(T.speicher.get("tempo")) || 0.9;
    u.onend = function () { weiter(); };
    u.onerror = function () { weiter(); };
    synth.speak(u);
  }

  T.vorlesen = {
    verfuegbar: function () { return !!synth; },
    stimmen: function () { return stimmen.slice(); },
    aktuelleStimme: function () { var s = stimme(); return s ? s.name : ""; },
    laeuft: function () { return aktiv; },
    beobachte: function (fn) { beobachter.push(fn); },

    // Liest mehrere Abschnitte nacheinander, mit kleiner Pause dazwischen
    liesFolge: function (abschnitte, fertig) {
      T.vorlesen.stopp();
      if (!synth) return;
      var liste = abschnitte.map(normalisiere).filter(Boolean);
      if (!liste.length) return;
      var meinLauf = ++lauf;
      var i = 0;
      aktiv = true; melde();

      function naechster() {
        if (meinLauf !== lauf) return;
        if (i >= liste.length) { aktiv = false; melde(); if (fertig) fertig(); return; }
        sprichAbschnitt(liste[i++], function () {
          if (meinLauf === lauf) setTimeout(naechster, 200);
        });
      }
      naechster();
    },

    sprich: function (text, fertig) { T.vorlesen.liesFolge([text], fertig); },

    stopp: function () {
      lauf++;
      if (synth) synth.cancel();
      if (aktiv) { aktiv = false; melde(); }
    }
  };
})(window.Teich = window.Teich || {});
