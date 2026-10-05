/* Knobeln: Teich-Ingenieur – Brücken aus wenigen Bauteilen bauen und mit einer Probefahrt testen */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.bruecke;
  var $ = function (id) { return document.getElementById(id); };
  var TINTE = "#2E3A2F";
  var EINHEIT = 80, RAND = 70, HOEHE = 260, DECK = 120, WASSER = 150;
  var BODEN = { s: 212, t: 252, I: 200, L: 150 };
  var BILD = { sokrates: "sokrates-1", schnecke: "i-schnecke", quaki: "i-frosch" };

  function stand() { var s = T.abenteuer("bruecke"); s.geschafft = s.geschafft || []; s.sterne = s.sterne || []; s.bau = s.bau || {}; return s; }
  function blase(saetze) { T.absaetze($("br-blase"), saetze); T.pop($("br-blase").parentNode); }

  // ---------- Regeln (ohne Bildschirm, für Spiel und Tests) ----------
  function natur(pkt, p) { return pkt[p] === "L" || pkt[p] === "I"; }
  function steineAus(bau) { var st = {}; bau.forEach(function (b) { if (b.art === "stein") st[b.von] = true; }); return st; }
  function stuetze(pkt, steine, p) { return natur(pkt, p) || !!steine[p]; }

  // Ein Wanderer läuft von links nach rechts. Ergebnis: Schritte und ggf. der Fehler.
  function laufe(level, bau, wer) {
    var pkt = level.punkte, N = pkt.length - 1, steine = steineAus(bau), p = 0, schritte = [];
    function fehler(art, b) { return { ok: false, schritte: schritte, fehler: { art: art, punkt: p, teil: b || null } }; }
    while (p < N) {
      var b = bau.find(function (x) { return x.art !== "stein" && x.von === p; });
      if (b) {
        if (b.art === "seil") {
          if (!natur(pkt, b.von) || !natur(pkt, b.bis)) return fehler("seilPfosten", b);
          if (wer === "schnecke") return fehler("schneckeSeil", b);
        } else if (!stuetze(pkt, steine, b.bis)) return fehler("brettEnde", b);
        schritte.push({ von: p, bis: b.bis, art: b.art });
        p = b.bis;
        continue;
      }
      if (wer === "quaki" && p + 1 <= N && stuetze(pkt, steine, p + 1)) { schritte.push({ von: p, bis: p + 1, art: "hopp" }); p++; continue; }
      return fehler("luecke");
    }
    return { ok: true, schritte: schritte };
  }

  // Kleinste Zahl an Teilen, mit der alle Wanderer hinüberkommen (Infinity = unlösbar)
  function minimum(level) {
    var pkt = level.punkte, N = pkt.length - 1, best = Infinity;
    var huepfen = level.wanderer.every(function (w) { return w === "quaki"; });
    var seilOk = level.wanderer.indexOf("schnecke") < 0;
    function suche(p, inv, kosten) {
      if (kosten >= best) return;
      if (p === N) { best = kosten; return; }
      [["kurz", 2], ["lang", 3], ["seil", 4], ["hopp", 1]].forEach(function (o) {
        var art = o[0], e = p + o[1];
        if (e > N || (art === "hopp" && !huepfen) || (art !== "hopp" && !(inv[art] > 0))) return;
        if (art === "seil" && (!seilOk || !natur(pkt, p) || !natur(pkt, e))) return;
        var neu = Object.assign({}, inv), k = kosten;
        if (art !== "hopp") { neu[art]--; k++; }
        if (!natur(pkt, e)) {
          if (pkt[e] !== "s" || !(neu.stein > 0)) return;
          neu.stein--; k++;
        }
        suche(e, neu, k);
      });
    }
    suche(0, Object.assign({}, level.teile), 0);
    return best;
  }

  T.brueckeLaufe = laufe;       // für Tests
  T.brueckeMinimum = minimum;   // für Tests

  // ---------- Bilder ----------
  function x(p) { return RAND + p * EINHEIT; }

  function teilBild(art) {
    var inhalt = {
      kurz: '<rect x="10" y="20" width="28" height="9" rx="2" fill="#C7964A" stroke="' + TINTE + '" stroke-width="2.5"/>',
      lang: '<rect x="3" y="20" width="42" height="9" rx="2" fill="#C7964A" stroke="' + TINTE + '" stroke-width="2.5"/>',
      seil: '<rect x="3" y="14" width="5" height="18" fill="#8C6230" stroke="' + TINTE + '" stroke-width="2"/><rect x="40" y="14" width="5" height="18" fill="#8C6230" stroke="' + TINTE + '" stroke-width="2"/><path d="M6 17 Q24 34 42 17" fill="none" stroke="#8C6230" stroke-width="4"/><path d="M6 17 Q24 34 42 17" fill="none" stroke="#F3D9B5" stroke-width="2" stroke-dasharray="3 4"/>',
      stein: '<path d="M10 40 Q8 16 24 10 Q40 16 38 40 Z" fill="#CFC8B8" stroke="' + TINTE + '" stroke-width="2.5" stroke-linejoin="round"/>'
    }[art];
    return '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">' + inhalt + "</svg>";
  }

  function szeneSvg(level, bau, kaputt) {
    var pkt = level.punkte, N = pkt.length - 1, W = x(N) + RAND, steine = steineAus(bau);
    var t = [];
    t.push('<rect x="' + x(0) + '" y="' + WASSER + '" width="' + (x(N) - x(0)) + '" height="' + (HOEHE - WASSER) + '" fill="#A9D3DC"/>');
    // Grund des Teichs
    var boden = "M" + x(0) + " " + HOEHE;
    for (var p = 0; p <= N; p++) boden += " L" + x(p) + " " + BODEN[pkt[p]];
    boden += " L" + x(N) + " " + HOEHE + " Z";
    t.push('<path d="' + boden + '" fill="#EBD9B4" stroke="' + TINTE + '" stroke-width="2.5" stroke-linejoin="round"/>');
    t.push('<path d="M' + x(0) + " " + (WASSER + 2) + " H" + x(N) + '" stroke="#2F6F7E" stroke-width="3" stroke-dasharray="14 10" stroke-linecap="round"/>');
    for (p = 1; p < N; p++) if (pkt[p] === "t") t.push('<text x="' + x(p) + '" y="' + (WASSER + 46) + '" text-anchor="middle" font-size="17" font-weight="700" fill="#FFFFFF">tief</text>');
    // Ufer
    t.push('<path d="M0 ' + DECK + " H" + (x(0) + 8) + " L" + (x(0) + 20) + " " + HOEHE + " H0 Z" + '" fill="#9CC27A" stroke="' + TINTE + '" stroke-width="3" stroke-linejoin="round"/>');
    t.push('<path d="M' + W + " " + DECK + " H" + (x(N) - 8) + " L" + (x(N) - 20) + " " + HOEHE + " H" + W + ' Z" fill="#9CC27A" stroke="' + TINTE + '" stroke-width="3" stroke-linejoin="round"/>');
    // Inseln
    for (p = 1; p < N; p++) {
      if (pkt[p] !== "I") continue;
      t.push('<path d="M' + (x(p) - 36) + " " + HOEHE + " Q" + (x(p) - 30) + " " + (DECK + 12) + " " + (x(p) - 12) + " " + DECK + " H" + (x(p) + 12) + " Q" + (x(p) + 30) + " " + (DECK + 12) + " " + (x(p) + 36) + " " + HOEHE + ' Z" fill="#B9B1A0" stroke="' + TINTE + '" stroke-width="3" stroke-linejoin="round"/>');
    }
    // Steine
    Object.keys(steine).forEach(function (q) {
      q = Number(q);
      t.push('<path d="M' + (x(q) - 18) + " " + BODEN[pkt[q]] + " Q" + (x(q) - 20) + " " + (DECK + 10) + " " + (x(q) - 10) + " " + DECK + " H" + (x(q) + 10) + " Q" + (x(q) + 20) + " " + (DECK + 10) + " " + (x(q) + 18) + " " + BODEN[pkt[q]] + ' Z" fill="#CFC8B8" stroke="' + TINTE + '" stroke-width="3" stroke-linejoin="round"/>');
    });
    // Bretter und Seile
    bau.forEach(function (b) {
      if (b.art === "stein") return;
      var rot = kaputt === b ? ' class="kaputt"' : "";
      if (b.art === "seil") {
        t.push("<g" + rot + ">" +
          '<rect x="' + (x(b.von) - 5) + '" y="' + (DECK - 34) + '" width="10" height="36" fill="#8C6230" stroke="' + TINTE + '" stroke-width="2.5"/>' +
          '<rect x="' + (x(b.bis) - 5) + '" y="' + (DECK - 34) + '" width="10" height="36" fill="#8C6230" stroke="' + TINTE + '" stroke-width="2.5"/>' +
          '<path d="M' + x(b.von) + " " + (DECK - 6) + " Q" + (x(b.von) + x(b.bis)) / 2 + " " + (DECK + 34) + " " + x(b.bis) + " " + (DECK - 6) + '" fill="none" stroke="#8C6230" stroke-width="9" stroke-linecap="round"/>' +
          '<path d="M' + x(b.von) + " " + (DECK - 6) + " Q" + (x(b.von) + x(b.bis)) / 2 + " " + (DECK + 34) + " " + x(b.bis) + " " + (DECK - 6) + '" fill="none" stroke="#F3D9B5" stroke-width="4" stroke-dasharray="6 9"/>' +
          "</g>");
      } else {
        t.push('<rect' + rot + ' x="' + (x(b.von) - 8) + '" y="' + (DECK - 12) + '" width="' + (x(b.bis) - x(b.von) + 16) + '" height="13" rx="3" fill="#C7964A" stroke="' + TINTE + '" stroke-width="3"/>');
      }
    });
    return '<svg viewBox="0 0 ' + W + " " + HOEHE + '" aria-hidden="true" focusable="false" preserveAspectRatio="none">' + t.join("") + "</svg>";
  }

  // ---------- Ansichten ----------
  function zeigeListe() {
    $("br-ende").textContent = "";
    blase(I.intro);
    var box = $("br-spiel");
    box.textContent = "";
    var s = stand();
    box.appendChild(T.el("h2", { class: "lesen", text: s.geschafft.length >= I.level.length ? I.alleGeschafft : I.waehle }));
    var liste = T.el("ul", { class: "zentrale-liste" });
    I.level.forEach(function (l) {
      var fertig = s.geschafft.indexOf(l.id) >= 0, stern = s.sterne.indexOf(l.id) >= 0;
      liste.appendChild(T.el("li", {}, [T.el("button", { type: "button", class: "mission-knopf" + (fertig ? " fertig" : ""), onclick: function () { baue(l); } }, [
        T.bild(l.wanderer.length > 1 ? "i-gruppe" : BILD[l.wanderer[0]]), T.el("span", { text: l.titel }),
        stern ? T.bild("i-stern", "haken", "Profi-Stern") : fertig ? T.bild("i-ja", "haken", "geschafft") : null
      ])]));
    });
    box.appendChild(liste);
    T.nacheinander(liste);
  }

  function baue(level) {
    var pkt = level.punkte, N = pkt.length - 1, W = x(N) + RAND;
    var s = stand();
    var bau = (s.bau[level.id] || []).slice();
    var werkzeug = null, unterwegs = false;
    var box = $("br-spiel");
    box.textContent = "";
    $("br-ende").textContent = "";
    blase([level.text]);

    function uebrig(art) { return (level.teile[art] || 0) - bau.filter(function (b) { return b.art === art; }).length; }
    function speichere() { var st = stand(); st.bau[level.id] = bau; T.abenteuerSpeichern("bruecke", st); }

    var titel = T.el("h2", { class: "lesen", tabindex: "-1", text: level.titel });
    box.appendChild(T.el("button", { type: "button", class: "knopf klein", text: "← " + I.alle, onclick: zeigeListe }));
    box.appendChild(titel);
    box.appendChild(T.el("p", { class: "br-wer" }, [T.el("span", { class: "lesen", text: I.werKommt })].concat(level.wanderer.map(function (w) {
      return T.el("span", { class: "br-wer-figur" }, [T.bild(BILD[w]), I.wer[w]]);
    }))));

    // Szene mit Punkten und Wanderern
    var bild = T.el("div", { class: "br-bild" });
    var punkte = T.el("div", { class: "br-punkte" });
    var leute = T.el("div", { class: "br-leute" });
    var platsch = T.el("div", { class: "br-platsch", "aria-hidden": "true", text: "Platsch!" });
    var szene = T.el("div", { class: "br-szene", style: "aspect-ratio: " + W + " / " + HOEHE + "; min-width: " + (N * 58 + 90) + "px; max-width: " + Math.round(W * 1.45) + "px" }, [bild, punkte, leute, platsch]);
    var knoepfe = [];
    for (var p = 0; p <= N; p++) {
      (function (p) {
        var k = T.el("button", { type: "button", class: "br-punkt " + pkt[p], style: "left:" + (x(p) / W * 100) + "%", text: String(p), onclick: function () { setze(p); } });
        knoepfe.push(k);
        punkte.appendChild(k);
      })(p);
    }
    var figuren = {};
    level.wanderer.forEach(function (w, i) {
      // Wer noch wartet, steht hintereinander am linken Ufer
      var f = T.el("div", { class: "br-figur " + w, style: "z-index:" + (5 - i) + "; margin-left:" + (-i * 18) + "px" }, [T.bild(BILD[w])]);
      figuren[w] = f;
      leute.appendChild(f);
    });
    function stelleFigur(w, p, ausblenden) {
      var f = figuren[w];
      f.style.left = (x(p) / W * 100) + "%";
      f.hidden = !!ausblenden;
    }

    // Bauteile
    var leiste = T.el("div", { class: "br-teile", role: "group", "aria-label": "Bauteile" });
    var meldung = T.el("p", { class: "raetsel-meldung", "aria-live": "polite" });
    var gebaut = T.el("ul", { class: "br-gebaut" });
    var probe = T.el("button", { type: "button", class: "knopf haupt", text: I.probefahrt, onclick: probefahrt });

    Object.keys(I.teile).forEach(function (art) {
      if (!level.teile[art]) return;
      var t = I.teile[art];
      var knopf = T.el("button", { type: "button", class: "br-teil", "data-art": art, "aria-pressed": "false", onclick: function () {
        werkzeug = werkzeug === art ? null : art;
        meldung.textContent = "";
        zeichne();
      } });
      knopf.innerHTML = teilBild(art);
      knopf.appendChild(T.el("span", { class: "br-teil-name" }, [T.el("b", { text: t.name }), T.el("span", { class: "br-teil-info", text: t.info }), T.el("span", { class: "br-anzahl" })]));
      leiste.appendChild(knopf);
    });

    function setze(p) {
      if (unterwegs) return;
      $("br-ende").textContent = "";
      if (!werkzeug) { meldung.textContent = I.erstWaehlen; return; }
      var text = "";
      if (werkzeug === "stein") {
        var da = bau.findIndex(function (b) { return b.art === "stein" && b.von === p; });
        if (da >= 0) bau.splice(da, 1);
        else if (natur(pkt, p)) text = I.keinWasser;
        else if (pkt[p] === "t") text = I.zuTief;
        else if (uebrig("stein") <= 0) text = I.keinsMehr;
        else bau.push({ art: "stein", von: p });
      } else {
        var e = p + I.teile[werkzeug].laenge;
        var belegt = bau.some(function (b) { return b.art !== "stein" && b.von < e && p < b.bis; });
        if (e > N) text = I.zuWeit;
        else if (belegt) text = I.schonBelegt;
        else if (uebrig(werkzeug) <= 0) text = I.keinsMehr;
        else bau.push({ art: werkzeug, von: p, bis: e });
      }
      meldung.textContent = text;
      if (text) T.pop(knoepfe[p], "wackeln");
      speichere();
      zeichne();
    }

    function zeichne(kaputt) {
      bild.innerHTML = szeneSvg(level, bau, kaputt);
      var steine = steineAus(bau);
      knoepfe.forEach(function (k, p) {
        k.setAttribute("aria-label", T.fuelle(I.punkt, { nr: p }) + ": " + I.punktArt[pkt[p]] + (steine[p] ? ", " + I.mitStein : ""));
        k.disabled = unterwegs;
      });
      leiste.querySelectorAll(".br-teil").forEach(function (k) {
        var art = k.dataset.art;
        k.setAttribute("aria-pressed", String(werkzeug === art));
        k.querySelector(".br-anzahl").textContent = T.fuelle(I.uebrig, { anzahl: uebrig(art) });
        k.classList.toggle("leer", uebrig(art) <= 0);
        k.disabled = unterwegs;
      });
      gebaut.textContent = "";
      if (!bau.length) gebaut.appendChild(T.el("li", { class: "leise", text: I.nochNichts }));
      bau.slice().sort(function (a, b) { return a.von - b.von; }).forEach(function (b) {
        var name = b.art === "stein" ? T.fuelle(I.steinBei, { nr: b.von }) : T.fuelle(I.vonBis, { name: I.teile[b.art].name, von: b.von, bis: b.bis });
        gebaut.appendChild(T.el("li", {}, [
          T.el("span", { text: name }),
          T.el("button", { type: "button", class: "knopf klein", "aria-label": name + " " + I.abbauen, disabled: unterwegs, onclick: function () {
            bau.splice(bau.indexOf(b), 1); meldung.textContent = ""; speichere(); zeichne();
          } }, [T.bild("i-nein"), I.abbauen])
        ]));
      });
      probe.disabled = unterwegs || !bau.length;
      if (!unterwegs) level.wanderer.forEach(function (w) { stelleFigur(w, 0); figuren[w].className = "br-figur " + w; });
    }

    function warte(ms) { return new Promise(function (r) { setTimeout(r, T.wenigBewegung() ? 0 : ms); }); }

    function probefahrt() {
      unterwegs = true;
      meldung.textContent = "";
      platsch.classList.remove("an");
      zeichne();
      var kette = Promise.resolve(), gescheitert = null;
      level.wanderer.forEach(function (w) {
        kette = kette.then(function () {
          if (gescheitert) return;
          var r = laufe(level, bau, w), f = figuren[w];
          var lauf = Promise.resolve();
          r.schritte.forEach(function (st) {
            lauf = lauf.then(function () {
              f.style.transitionDuration = (T.wenigBewegung() ? 0 : 0.45 * (st.bis - st.von)) + "s";
              f.classList.toggle("huepft", st.art === "hopp");
              stelleFigur(w, st.bis);
              return warte(450 * (st.bis - st.von) + 60);
            });
          });
          return lauf.then(function () {
            f.classList.remove("huepft");
            if (r.ok) { meldung.textContent = T.fuelle(I.hinueber, { wer: I.wer[w] }); return warte(300); }
            gescheitert = { wer: w, r: r };
            if (r.fehler.art !== "schneckeSeil") {
              f.classList.add("faellt");
              platsch.style.left = (x(r.fehler.punkt + 0.5) / W * 100) + "%";
              platsch.classList.add("an");
            }
            bild.innerHTML = szeneSvg(level, bau, r.fehler.teil);
            return warte(700);
          });
        });
      });
      kette.then(function () {
        // Bedienung wieder frei – die Figuren bleiben stehen, wo sie angekommen (oder ins Wasser gefallen) sind
        unterwegs = false;
        [].forEach.call(box.querySelectorAll("button"), function (k) { k.disabled = false; });
        if (gescheitert) meldung.textContent = T.fuelle(I.fehler[gescheitert.r.fehler.art], { nr: gescheitert.r.fehler.punkt });
        else geschafft();
      });
    }

    function geschafft() {
      var st = stand();
      var erstesMal = st.geschafft.indexOf(level.id) < 0;
      if (erstesMal) st.geschafft.push(level.id);
      var teile = bau.length, min = minimum(level), profi = teile <= min;
      if (profi && st.sterne.indexOf(level.id) < 0) st.sterne.push(level.id);
      T.abenteuerSpeichern("bruecke", st);
      var naechste = I.level.find(function (l) { return stand().geschafft.indexOf(l.id) < 0; });
      T.spielEnde($("br-ende"), {
        titel: I.geschafft,
        text: [T.fuelle(I.teileGebraucht, { anzahl: teile }), profi ? I.profi : T.fuelle(I.profiTipp, { anzahl: min })],
        fund: erstesMal ? undefined : null,
        nochmal: naechste ? function () { baue(naechste); } : function () { $("br-ende").textContent = ""; titel.focus(); },
        nochmalText: naechste ? I.naechste : I.nochmalBauen
      });
    }

    var regeln = T.el("details", { class: "abenteuer-details br-regeln", open: s.geschafft.length < 3 ? true : null }, [
      T.el("summary", { text: I.regelnTitel }),
      T.el("ul", {}, I.regeln.map(function (r) { return T.el("li", {}, [T.bild(r[0]), T.el("span", { class: "lesen", text: r[1] })]); }))
    ]);

    box.appendChild(T.el("div", { class: "br-rahmen" }, [szene]));
    box.appendChild(T.el("p", { class: "leise br-wischen", text: I.wischen }));
    box.appendChild(leiste);
    box.appendChild(meldung);
    box.appendChild(T.el("div", { class: "knoepfe" }, [probe,
      T.el("button", { type: "button", class: "knopf", text: I.allesAbbauen, onclick: function () { if (unterwegs) return; bau = []; meldung.textContent = ""; $("br-ende").textContent = ""; speichere(); zeichne(); } })
    ]));
    box.appendChild(T.el("div", { class: "br-unten" }, [
      T.el("section", {}, [T.el("h3", { class: "lesen", text: I.gebautTitel }), gebaut]),
      regeln
    ]));
    zeichne();
    titel.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: "auto", block: "start" });
  }

  T.ansichten["spiel-bruecke"] = { zeige: zeigeListe };
})(window.Teich);
