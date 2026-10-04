/* Knobeln: Teich-Rätselbuch – jeden Tag drei neue Rätsel (Sudoku, Tier-Rechnung, Zahlen-Reihe) */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.raetselbuch;
  var $ = function (id) { return document.getElementById(id); };
  var TIERE = [["i-frosch", "Frosch"], ["i-fisch", "Fisch"], ["i-ente", "Ente"], ["i-seerose", "Seerose"]];

  // Zufall mit Startwert: gleiches Datum → gleiche Rätsel
  function zufallszahlen(text) {
    var h = 1779033703 ^ text.length;
    for (var i = 0; i < text.length; i++) { h = Math.imul(h ^ text.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    var a = h >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function ganz(z, min, max) { return min + Math.floor(z() * (max - min + 1)); }
  function mischeMit(z, liste) {
    var a = liste.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(z() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function heute() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  // ---------- Sudoku 4×4 ----------
  function sudokuLoesungen(feld, grenze) {
    var leer = feld.indexOf(-1);
    if (leer < 0) return 1;
    var r = Math.floor(leer / 4), c = leer % 4, anzahl = 0;
    for (var v = 0; v < 4 && anzahl < grenze; v++) {
      if (erlaubt(feld, r, c, v)) { feld[leer] = v; anzahl += sudokuLoesungen(feld, grenze - anzahl); feld[leer] = -1; }
    }
    return anzahl;
  }
  function erlaubt(feld, r, c, v) {
    for (var i = 0; i < 4; i++) {
      if (feld[r * 4 + i] === v || feld[i * 4 + c] === v) return false;
    }
    var br = r - (r % 2), bc = c - (c % 2);
    for (var y = br; y < br + 2; y++) for (var x = bc; x < bc + 2; x++) if (feld[y * 4 + x] === v) return false;
    return true;
  }
  function erzeugeSudoku(z) {
    var basis = [[0, 1, 2, 3], [2, 3, 0, 1], [1, 0, 3, 2], [3, 2, 1, 0]];
    var sym = mischeMit(z, [0, 1, 2, 3]);
    var zeilen = (z() < 0.5 ? [0, 1] : [1, 0]).concat(z() < 0.5 ? [2, 3] : [3, 2]);
    if (z() < 0.5) zeilen = zeilen.slice(2).concat(zeilen.slice(0, 2));
    var spalten = (z() < 0.5 ? [0, 1] : [1, 0]).concat(z() < 0.5 ? [2, 3] : [3, 2]);
    if (z() < 0.5) spalten = spalten.slice(2).concat(spalten.slice(0, 2));
    var loesung = [];
    zeilen.forEach(function (r) { spalten.forEach(function (c) { loesung.push(sym[basis[r][c]]); }); });
    var raetsel = loesung.slice();
    mischeMit(z, Array.apply(null, Array(16)).map(function (_, i) { return i; })).forEach(function (i) {
      if (raetsel.filter(function (x) { return x >= 0; }).length <= 7) return;
      var alt = raetsel[i];
      raetsel[i] = -1;
      if (sudokuLoesungen(raetsel.slice(), 2) !== 1) raetsel[i] = alt;
    });
    return { loesung: loesung, start: raetsel };
  }

  function sudoku(ziel, z, fertig) {
    var r = erzeugeSudoku(z);
    var feld = r.start.slice(), gewaehlt = null;
    var gitter = T.el("div", { class: "sudoku", role: "group", "aria-label": "Teich-Sudoku" });
    var meldung = T.el("p", { class: "raetsel-meldung", "aria-live": "polite" });
    var palette = T.el("div", { class: "sudoku-palette" });
    function male() {
      gitter.textContent = "";
      feld.forEach(function (v, i) {
        var fest = r.start[i] >= 0;
        var k = T.el("button", { type: "button", class: "sudoku-feld" + (fest ? " fest" : "") + (gewaehlt === i ? " gewaehlt" : ""),
          "aria-label": "Reihe " + (Math.floor(i / 4) + 1) + ", Spalte " + (i % 4 + 1) + ": " + (v >= 0 ? TIERE[v][1] : "leer") + (fest ? " (vorgegeben)" : ""),
          disabled: fest,
          onclick: function () { gewaehlt = i; meldung.textContent = ""; male(); var b = palette.querySelector("button"); if (b) b.focus(); } },
          v >= 0 ? [T.bild(TIERE[v][0])] : []);
        gitter.appendChild(k);
      });
    }
    function pruefe() {
      if (feld.indexOf(-1) >= 0) return;
      var doppelt = {};
      for (var i = 0; i < 16; i++) {
        var v = feld[i]; feld[i] = -1;
        if (!erlaubt(feld, Math.floor(i / 4), i % 4, v)) doppelt[i] = true;
        feld[i] = v;
      }
      if (Object.keys(doppelt).length) {
        meldung.textContent = I.sudokuDoppelt;
        gitter.querySelectorAll(".sudoku-feld").forEach(function (k, i) { k.classList.toggle("doppelt", !!doppelt[i]); });
        return;
      }
      gitter.querySelectorAll("button").forEach(function (k) { k.disabled = true; });
      palette.remove();
      fertig();
    }
    TIERE.forEach(function (t, v) {
      palette.appendChild(T.el("button", { type: "button", class: "knopf", "aria-label": t[1], onclick: function () {
        if (gewaehlt === null) { meldung.textContent = "Tipp zuerst ein leeres Feld an."; return; }
        feld[gewaehlt] = v;
        var war = gewaehlt;
        gewaehlt = null;
        male();
        var k = gitter.children[war]; if (k) k.focus();
        pruefe();
      } }, [T.bild(t[0])]));
    });
    palette.appendChild(T.el("button", { type: "button", class: "knopf klein", text: "Leeren", onclick: function () {
      if (gewaehlt !== null) { feld[gewaehlt] = -1; male(); }
    } }));
    ziel.appendChild(T.el("p", { class: "lesen", text: I.sudoku }));
    ziel.appendChild(gitter);
    ziel.appendChild(palette);
    ziel.appendChild(meldung);
    male();
  }

  // ---------- Tier-Rechnung ----------
  function zahlenWahl(ziel, richtig, fertig, bis) {
    var meldung = T.el("p", { class: "raetsel-meldung", "aria-live": "polite" });
    var wahl = T.el("div", { class: "zahlen-wahl" });
    for (var n = 0; n <= bis; n++) {
      (function (n) {
        wahl.appendChild(T.el("button", { type: "button", class: "knopf", text: String(n), onclick: function (e) {
          if (n !== richtig) { meldung.textContent = I.falsch; T.pop(e.currentTarget, "wackeln"); return; }
          e.currentTarget.setAttribute("aria-pressed", "true");
          wahl.querySelectorAll("button").forEach(function (k) { k.disabled = true; });
          meldung.textContent = I.richtig;
          fertig();
        } }));
      })(n);
    }
    ziel.appendChild(wahl);
    ziel.appendChild(meldung);
  }
  function rechnen(ziel, z, fertig) {
    var tiere = mischeMit(z, TIERE);
    var a = ganz(z, 1, 5), b = ganz(z, 1, 8);
    var art = ganz(z, 0, 2);
    var zeilen;
    // [[Bilder], Ergebnis]
    if (art === 0) zeilen = [[[0, 0], 2 * a], [[0, 1], a + b]];
    else if (art === 1) { a = ganz(z, 1, 3); zeilen = [[[0, 0, 0], 3 * a], [[1, 0], a + b]]; }
    else zeilen = [[[0, 0], 2 * a], [[1, 1, 0], 2 * b + a]];
    ziel.appendChild(T.el("p", { class: "lesen", text: I.rechnen }));
    var box = T.el("div", { class: "rechnung" });
    zeilen.forEach(function (zl) {
      var zeile = T.el("p", { class: "rechen-zeile" });
      zl[0].forEach(function (t, i) {
        if (i) zeile.appendChild(T.el("span", { class: "op", text: "+" }));
        zeile.appendChild(T.bild(tiere[t][0], null, tiere[t][1]));
      });
      zeile.appendChild(T.el("span", { class: "op", text: "= " + zl[1] }));
      box.appendChild(zeile);
    });
    box.appendChild(T.el("p", { class: "rechen-zeile frage" }, [T.bild(tiere[1][0], null, tiere[1][1]), T.el("span", { class: "op", text: "= ?" })]));
    ziel.appendChild(box);
    zahlenWahl(ziel, b, fertig, 10);
  }

  // ---------- Zahlen-Reihe ----------
  function reihe(ziel, z, fertig) {
    var art = ganz(z, 0, 4), zahlen = [], s;
    if (art === 0) { var k = ganz(z, 2, 5); s = ganz(z, 1, 10); for (var i = 0; i < 5; i++) zahlen.push(s + i * k); }
    else if (art === 1) { var k2 = ganz(z, 2, 4); s = ganz(z, 20, 30); for (var j = 0; j < 5; j++) zahlen.push(s - j * k2); }
    else if (art === 2) { s = ganz(z, 1, 3); for (var m = 0; m < 5; m++) zahlen.push(s * Math.pow(2, m)); }
    else if (art === 3) { s = ganz(z, 1, 5); var x = s; for (var n = 0; n < 5; n++) { zahlen.push(x); x += n + 1; } }
    else { s = ganz(z, 1, 6); var a = ganz(z, 2, 4), b = ganz(z, 1, a - 1), y = s; for (var p = 0; p < 5; p++) { zahlen.push(y); y += p % 2 ? -b : a; } }
    var richtig = zahlen[4];
    var auswahl = [richtig];
    [richtig + 1, richtig - 1, richtig + 2, zahlen[3] + (zahlen[3] - zahlen[2]), richtig + 3].forEach(function (v) {
      if (auswahl.length < 4 && v >= 0 && auswahl.indexOf(v) < 0) auswahl.push(v);
    });
    ziel.appendChild(T.el("p", { class: "lesen", text: I.reihe }));
    ziel.appendChild(T.el("p", { class: "zahlenreihe", "aria-label": zahlen.slice(0, 4).join(", ") + ", und dann?" }, zahlen.slice(0, 4).map(function (v) { return T.el("span", { text: String(v) }); }).concat([T.el("span", { class: "frage", text: "?" })])));
    var meldung = T.el("p", { class: "raetsel-meldung", "aria-live": "polite" });
    var wahl = T.el("div", { class: "zahlen-wahl" });
    mischeMit(z, auswahl).forEach(function (v) {
      wahl.appendChild(T.el("button", { type: "button", class: "knopf", text: String(v), onclick: function (e) {
        if (v !== richtig) { meldung.textContent = I.falsch; T.pop(e.currentTarget, "wackeln"); return; }
        e.currentTarget.setAttribute("aria-pressed", "true");
        wahl.querySelectorAll("button").forEach(function (k) { k.disabled = true; });
        meldung.textContent = I.richtig;
        fertig();
      } }));
    });
    ziel.appendChild(wahl);
    ziel.appendChild(meldung);
  }

  // ---------- Seite ----------
  var ARTEN = [["sudoku", sudoku], ["rechnen", rechnen], ["reihe", reihe]];

  function stand() {
    var s = T.abenteuer("raetselbuch");
    s.tage = s.tage || {};
    s.geloest = s.geloest || 0;
    return s;
  }

  function zeigeSatz(ziel, saat, tag) {
    ziel.textContent = "";
    var s = stand();
    var erledigt = tag ? (s.tage[tag] || []) : [];
    ARTEN.forEach(function (a) {
      var karte = T.el("section", { class: "spiel-karte raetsel-karte" + (erledigt.indexOf(a[0]) >= 0 ? " geloest" : "") });
      var kopf = T.el("h3", { class: "lesen" }, [I.titel[a[0]]]);
      karte.appendChild(kopf);
      if (erledigt.indexOf(a[0]) >= 0) {
        karte.appendChild(T.el("p", { class: "geloest-text" }, [T.bild("i-ja"), I.fertig]));
      } else {
        a[1](karte, zufallszahlen(saat + a[0]), function () {
          var st = stand();
          st.geloest++;
          var fund = null;
          if (tag) {
            st.tage[tag] = (st.tage[tag] || []).concat([a[0]]);
            Object.keys(st.tage).sort().slice(0, -14).forEach(function (alt) { delete st.tage[alt]; });
            if (st.tage[tag].length === ARTEN.length && st.fundTag !== tag) { st.fundTag = tag; fund = T.findeEtwas("spiel"); }
          }
          T.abenteuerSpeichern("raetselbuch", st);
          karte.classList.add("geloest");
          kopf.appendChild(T.bild("i-ja", "haken", I.fertig));
          $("rb-zaehler").textContent = T.fuelle(I.zaehler, { anzahl: st.geloest });
          if (tag && st.tage[tag].length === ARTEN.length) {
            var box = $("rb-heute-fertig");
            box.textContent = "";
            box.appendChild(T.el("p", { class: "lesen", style: "font-weight:700", text: I.alleHeute }));
            if (fund) box.appendChild(T.fundHinweis(fund));
          }
        });
      }
      ziel.appendChild(karte);
    });
  }

  T.ansichten["spiel-raetselbuch"] = {
    zeige: function () {
      var tag = heute();
      T.absaetze($("rb-blase"), I.intro);
      var datum = new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long" });
      $("rb-heute-titel").textContent = T.fuelle(I.heute, { datum: datum });
      $("rb-heute-fertig").textContent = "";
      zeigeSatz($("rb-heute"), tag, tag);
      $("rb-extra").textContent = "";
      $("rb-zaehler").textContent = T.fuelle(I.zaehler, { anzahl: stand().geloest });
      var knopf = $("rb-extra-knopf");
      knopf.textContent = I.extraKnopf;
      knopf.onclick = function () {
        var box = $("rb-extra");
        box.textContent = "";
        box.appendChild(T.el("h2", { class: "lesen", text: I.extra }));
        var satz = T.el("div", { class: "raetsel-satz" });
        box.appendChild(satz);
        zeigeSatz(satz, "extra" + Date.now(), null);
        box.scrollIntoView({ behavior: T.wenigBewegung() ? "auto" : "smooth", block: "start" });
      };
    }
  };
  T.raetselSudoku = function (saat) { return erzeugeSudoku(zufallszahlen(saat)); };   // für Tests
})(window.Teich);
