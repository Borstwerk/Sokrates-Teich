/* Abenteuer: Die versunkene Truhe – vier Schlösser, vier Rätsel (Zählen, Muster, Logik, Schiebebild) */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.truhe;
  var $ = function (id) { return document.getElementById(id); };
  var TINTE = "#2E3A2F";
  var gebaut = false, truheSvg = null, aktuell = null;

  function stand() {
    var s = T.abenteuer("truhe");
    s.offen = s.offen || [];
    return s;
  }
  function speichere(s) { T.abenteuerSpeichern("truhe", s); }

  function blase(saetze) {
    T.absaetze($("truhe-blase"), saetze);
    T.pop($("truhe-blase").parentNode);
  }

  // ---------- Die Truhe ----------
  function schlossSvg(x, y, offen) {
    return '<g class="schloss' + (offen ? " offen" : "") + '" transform="translate(' + x + ' ' + y + ')">' +
      '<path class="buegel" d="M-7 0 V-9 A7 7 0 0 1 7 -9 V0" fill="none" stroke="' + TINTE + '" stroke-width="4" stroke-linecap="round"/>' +
      '<rect x="-11" y="-1" width="22" height="18" rx="3" fill="' + (offen ? "#8CC063" : "#F2B544") + '" stroke="' + TINTE + '" stroke-width="2.5"/>' +
      '<circle cx="0" cy="7" r="2.6" fill="' + TINTE + '"/></g>';
  }

  function maleTruhe() {
    var s = stand();
    var schloesser = I.schloesser.map(function (sl, i) { return schlossSvg(126 + i * 36, 150, s.offen.indexOf(sl.id) >= 0); }).join("");
    var svg = '<svg viewBox="0 0 360 240" class="truhe-svg' + (s.fertig ? " offen" : "") + '" role="img" aria-label="Eine alte Truhe mit vier Schlössern">' +
      '<rect width="360" height="240" fill="#DCEFF2"/>' +
      '<path d="M0 214 Q90 200 180 214 T360 212 V240 H0 Z" fill="rgba(47,111,126,.3)"/>' +
      '<g stroke="' + TINTE + '" stroke-width="3"><rect x="-4" y="-4" width="368" height="40" fill="#C9944A"/><path d="M60 -4 V36 M140 -4 V36 M220 -4 V36 M300 -4 V36" stroke-width="2.5"/>' +
      '<rect x="40" y="36" width="14" height="190" fill="#8C6230"/><rect x="306" y="36" width="14" height="190" fill="#8C6230"/></g>' +
      '<g class="schatz-glanz"><circle cx="180" cy="100" r="62" fill="#F2B544" opacity=".35"/>' +
      '<use href="#i-kristall" x="150" y="52" width="60" height="60"/><use href="#i-schluessel" x="196" y="78" width="44" height="44"/></g>' +
      '<g stroke="' + TINTE + '" stroke-width="3" stroke-linejoin="round"><rect x="90" y="112" width="180" height="88" rx="8" fill="#8C6230"/>' +
      '<path d="M120 112 V200 M240 112 V200" stroke="#55624F" stroke-width="6"/></g>' +
      '<g class="deckel"><path d="M90 116 V94 C90 64 120 52 180 52 C240 52 270 64 270 94 V116 Z" fill="#C9944A" stroke="' + TINTE + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M120 56 V116 M240 56 V116" stroke="#55624F" stroke-width="6"/></g>' +
      schloesser + '</svg>';
    $("truhe-bild").innerHTML = svg;
    truheSvg = $("truhe-bild").firstChild;
  }

  function maleSchlossWahl() {
    var s = stand();
    var box = $("truhe-schloesser");
    box.textContent = "";
    I.schloesser.forEach(function (sl) {
      var offen = s.offen.indexOf(sl.id) >= 0;
      box.appendChild(T.el("button", {
        type: "button", class: "knopf" + (offen ? " erledigt" : ""), "aria-pressed": String(aktuell === sl.id),
        onclick: function () { zeigeRaetsel(sl.id); }
      }, [T.bild(offen ? "i-ja" : sl.bild), sl.name, offen ? T.el("span", { class: "nur-vorleser", text: " (offen)" }) : null]));
    });
  }

  function schlossOffen(id) {
    var s = stand();
    if (s.offen.indexOf(id) < 0) s.offen.push(id);
    speichere(s);
    var sl = I.schloesser.find(function (x) { return x.id === id; });
    aktuell = null;
    $("truhe-raetsel").textContent = "";
    maleTruhe();
    maleSchlossWahl();
    if (s.offen.length >= I.schloesser.length) return truheAuf();
    blase([T.fuelle(I.offen, { name: sl.name }), I.nochZu]);
    var b = $("truhe-schloesser").querySelector("button:not(.erledigt)");
    if (b) b.focus();
  }

  function truheAuf() {
    var s = stand();
    var fund = null;
    if (!s.belohnt) { fund = T.findeEtwas("abenteuer", "kristall"); s.belohnt = true; }
    s.fertig = true;
    s.schluessel = true;
    speichere(s);
    maleTruhe();
    maleSchlossWahl();
    blase([I.endeTitel]);
    var schluessel = T.el("p", { class: "fund schluessel" }, [T.el("span", { class: "fund-bild" }, [T.bild("i-schluessel")]), T.el("span", { class: "lesen", text: "Du hast einen alten Schlüssel gefunden." })]);
    T.spielEnde($("truhe-ende"), { titel: I.endeTitel, text: I.ende, fund: fund, extra: schluessel, nochmal: neueRaetsel, nochmalText: I.nochmal });
  }

  function neueRaetsel() {
    var s = stand();
    s.offen = [];
    s.fertig = false;
    speichere(s);
    $("truhe-ende").textContent = "";
    aktuell = null;
    $("truhe-raetsel").textContent = "";
    maleTruhe();
    maleSchlossWahl();
    blase(I.intro);
  }

  function zeigeRaetsel(id) {
    var s = stand();
    var sl = I.schloesser.find(function (x) { return x.id === id; });
    if (s.offen.indexOf(id) >= 0) { blase([T.fuelle(I.offen, { name: sl.name }), I.nochZu]); return; }
    aktuell = id;
    maleSchlossWahl();
    var ziel = $("truhe-raetsel");
    ziel.textContent = "";
    var kopf = T.el("h2", { class: "lesen", tabindex: "-1", text: sl.name });
    ziel.appendChild(kopf);
    ({ zaehlen: zaehlen, muster: muster, logik: logik, schiebe: schiebe })[id](ziel, function () { schlossOffen(id); });
    kopf.focus({ preventScroll: true });
    ziel.scrollIntoView({ behavior: T.wenigBewegung() ? "auto" : "smooth", block: "start" });
  }

  // ---------- Rätsel 1: Zählen ----------
  var ZAEHL = [["frosch", "i-frosch", "Frösche"], ["fisch", "i-fisch", "Fische"], ["seerose", "i-seerose", "Seerosen"]];
  function zaehlen(ziel, fertig) {
    var Z = I.zaehlen;
    var anzahl = ZAEHL.map(function () { return 2 + Math.floor(Math.random() * 6); });
    var zellen = T.mische(Array.apply(null, Array(40)).map(function (_, i) { return i; }));
    var dinge = [];
    ZAEHL.forEach(function (z, i) { for (var k = 0; k < anzahl[i]; k++) dinge.push(z); });
    dinge.push(["ente", "i-ente"], ["blume", "i-blume"]);
    var svg = '<svg viewBox="0 0 600 270" class="zaehl-bild" role="img" aria-label="Ein Teich mit Fröschen, Fischen und Seerosen"><rect width="600" height="270" rx="18" fill="#DCEFF2"/>';
    dinge.forEach(function (d, i) {
      var z = zellen[i], x = (z % 10) * 60 + 6 + Math.random() * 6, y = Math.floor(z / 10) * 66 + 6 + Math.random() * 6;
      svg += '<use class="z-' + d[0] + '" href="#' + d[1] + '" x="' + x.toFixed(0) + '" y="' + y.toFixed(0) + '" width="48" height="48"/>';
    });
    svg += "</svg>";
    var bild = T.el("div", { class: "zaehl-rahmen" });
    bild.innerHTML = svg;

    var werte = [0, 0, 0];
    var raeder = T.el("div", { class: "zahlraeder" });
    var ausgaben = [];
    ZAEHL.forEach(function (z, i) {
      var aus = T.el("output", { class: "zahl", "aria-live": "polite", text: "0" });
      ausgaben.push(aus);
      function setze(d) { werte[i] = (werte[i] + d + 10) % 10; aus.textContent = String(werte[i]); }
      raeder.appendChild(T.el("div", { class: "zahlrad" }, [
        T.bild(z[1], null, z[2]),
        T.el("button", { type: "button", class: "knopf klein", "aria-label": z[2] + ": eins mehr", text: "+", onclick: function () { setze(1); } }),
        aus,
        T.el("button", { type: "button", class: "knopf klein", "aria-label": z[2] + ": eins weniger", text: "−", onclick: function () { setze(-1); } })
      ]));
    });
    var meldung = T.el("p", { class: "raetsel-meldung", "aria-live": "polite" });
    function ersterFehler() { for (var i = 0; i < 3; i++) if (werte[i] !== anzahl[i]) return i; return -1; }
    ziel.appendChild(T.el("p", { class: "lesen", text: Z.aufgabe }));
    ziel.appendChild(bild);
    ziel.appendChild(raeder);
    ziel.appendChild(meldung);
    ziel.appendChild(T.el("div", { class: "knoepfe" }, [
      T.el("button", { type: "button", class: "knopf haupt", text: Z.oeffnen, onclick: function () {
        var f = ersterFehler();
        if (f < 0) return fertig();
        meldung.textContent = T.fuelle(Z.falsch, { name: ZAEHL[f][2] });
        T.pop(meldung);
      } }),
      T.el("button", { type: "button", class: "knopf klein", text: Z.tipp, onclick: function () {
        var f = ersterFehler();
        if (f < 0) f = 0;
        bild.querySelectorAll("use").forEach(function (u) { u.classList.toggle("markiert", u.classList.contains("z-" + ZAEHL[f][0])); });
      } })
    ]));
  }

  // ---------- Rätsel 2: Muster ----------
  var MUSTER_BILDER = ["i-frosch", "i-fisch", "i-seerose", "i-ente", "i-stern", "i-herz", "i-sonne", "i-schnecke"];
  var MUSTER = [["AB", "ABC"], ["AAB", "ABB", "ABCB"], ["ABAC", "AABC", "ABCC"]];
  function muster(ziel, fertig) {
    var M = I.muster, runde = 0, runden = 3;
    var bereich = T.el("div");
    var meldung = T.el("p", { class: "raetsel-meldung", "aria-live": "polite" });
    ziel.appendChild(T.el("p", { class: "lesen", text: M.aufgabe }));
    ziel.appendChild(bereich);
    ziel.appendChild(meldung);

    function neueRunde() {
      var form = T.zufall(MUSTER[runde]);
      var buchstaben = form.split("").filter(function (b, i, a) { return a.indexOf(b) === i; });
      var bilder = T.mische(MUSTER_BILDER);
      var zuordnung = {};
      buchstaben.forEach(function (b, i) { zuordnung[b] = bilder[i]; });
      var laenge = form.length === 4 ? 9 : 8;
      var reihe = [];
      for (var i = 0; i < laenge; i++) reihe.push(zuordnung[form[i % form.length]]);
      var luecken = T.mische(Array.apply(null, Array(laenge - 2)).map(function (_, i) { return i + 2; })).slice(0, 2).sort(function (a, b) { return a - b; });
      var auswahl = T.mische(bilder.slice(0, 4));   // die richtigen Bilder plus Ablenker, immer 4
      var welche = 0;

      bereich.textContent = "";
      meldung.textContent = "";
      bereich.appendChild(T.el("p", { class: "leise", text: T.fuelle(M.runde, { nr: runde + 1, von: runden }) }));
      var ol = T.el("ol", { class: "musterreihe", "aria-label": "Reihe" });
      reihe.forEach(function (bild, i) {
        var luecke = luecken.indexOf(i) >= 0;
        ol.appendChild(T.el("li", { class: luecke ? "luecke" + (i === luecken[0] ? " jetzt" : "") : "" }, [luecke ? T.el("span", { text: "?" }) : T.bild(bild)]));
      });
      bereich.appendChild(ol);
      var opt = T.el("div", { class: "muster-auswahl" });
      auswahl.forEach(function (bild) {
        var knopf = T.el("button", { type: "button", class: "knopf muster-knopf", "aria-label": bildName(bild) }, [T.bild(bild)]);
        knopf.addEventListener("click", function () {
          var pos = luecken[welche];
          if (reihe[pos] !== bild) {
            meldung.textContent = M.falsch;
            T.pop(knopf, "wackeln");
            return;
          }
          var li = ol.children[pos];
          li.className = "gefuellt";
          li.textContent = "";
          li.appendChild(T.bild(bild));
          T.pop(li);
          welche++;
          meldung.textContent = M.gut;
          if (welche < luecken.length) { ol.children[luecken[welche]].classList.add("jetzt"); return; }
          runde++;
          if (runde >= runden) return setTimeout(fertig, 500);
          setTimeout(neueRunde, 700);
        });
        opt.appendChild(knopf);
      });
      bereich.appendChild(opt);
    }
    neueRunde();
  }
  function bildName(bild) {
    var namen = { "i-frosch": "Frosch", "i-fisch": "Fisch", "i-seerose": "Seerose", "i-ente": "Ente", "i-stern": "Stern", "i-herz": "Herz", "i-sonne": "Sonne", "i-schnecke": "Schnecke" };
    return namen[bild] || bild;
  }

  // ---------- Rätsel 3: Logik (Wer sitzt auf welchem Stein?) ----------
  var TIERE = [
    { id: "frosch", bild: "i-frosch", nom: "Der Frosch", dat: "dem Frosch", von: "vom Frosch" },
    { id: "ente", bild: "i-ente", nom: "Die Ente", dat: "der Ente", von: "von der Ente" },
    { id: "fisch", bild: "i-fisch", nom: "Der Fisch", dat: "dem Fisch", von: "vom Fisch" },
    { id: "schnecke", bild: "i-schnecke", nom: "Die Schnecke", dat: "der Schnecke", von: "von der Schnecke" }
  ];
  function permutationen(n) {
    if (n === 1) return [[0]];
    var erg = [];
    permutationen(n - 1).forEach(function (p) {
      for (var i = 0; i <= p.length; i++) erg.push(p.slice(0, i).concat([n - 1]).concat(p.slice(i)));
    });
    return erg;
  }
  // Hinweise erzeugen, bis genau eine Lösung bleibt. platz[tier] = Steinnummer
  function erzeugeLogik(tiere) {
    var orte = I.logik.steine, n = tiere.length;
    var alle = permutationen(n);
    for (var versuch = 0; versuch < 80; versuch++) {
      var ziel = T.zufall(alle);
      var kandidaten = [];
      tiere.forEach(function (a, ai) {
        orte.forEach(function (o, p) {
          kandidaten.push({ text: a.nom + " sitzt " + o + ".", gewicht: 3, pruefe: function (pl) { return pl[ai] === p; } });
          kandidaten.push({ text: a.nom + " sitzt nicht " + o + ".", gewicht: 1, pruefe: function (pl) { return pl[ai] !== p; } });
        });
        tiere.forEach(function (b, bi) {
          if (ai === bi) return;
          kandidaten.push({ text: a.nom + " sitzt links " + b.von + ".", gewicht: 1, pruefe: function (pl) { return pl[ai] < pl[bi]; } });
          kandidaten.push({ text: a.nom + " sitzt neben " + b.dat + ".", gewicht: 1, pruefe: function (pl) { return Math.abs(pl[ai] - pl[bi]) === 1; } });
          if (ai < bi) kandidaten.push({ text: a.nom + " sitzt nicht neben " + b.dat + ".", gewicht: 1, pruefe: function (pl) { return Math.abs(pl[ai] - pl[bi]) !== 1; } });
        });
      });
      kandidaten = kandidaten.filter(function (k) { return k.pruefe(ziel); });
      // „sitzt links/rechts“ (zu leicht) eher ans Ende
      kandidaten = T.mische(kandidaten).sort(function (a, b) { return a.gewicht - b.gewicht; });
      var rest = alle.slice(), hinweise = [];
      for (var i = 0; i < kandidaten.length && rest.length > 1; i++) {
        var k = kandidaten[i];
        var neu = rest.filter(k.pruefe);
        if (neu.length < rest.length) { hinweise.push(k); rest = neu; }
      }
      if (rest.length === 1 && hinweise.length <= n) return { ziel: ziel, hinweise: T.mische(hinweise) };
    }
    return null;
  }
  function logik(ziel, fertig) {
    var L = I.logik;
    var tiere = T.mische(TIERE).slice(0, 3);
    var raetsel = erzeugeLogik(tiere);
    while (!raetsel) { tiere = T.mische(TIERE).slice(0, 3); raetsel = erzeugeLogik(tiere); }
    var platz = [null, null, null];   // platz[stein] = tierIndex
    var gewaehlt = null;
    var meldung = T.el("p", { class: "raetsel-meldung", "aria-live": "polite" });
    var liste = T.el("ol", { class: "hinweise" });
    raetsel.hinweise.forEach(function (h) { liste.appendChild(T.el("li", { class: "lesen", text: h.text })); });
    var ablage = T.el("div", { class: "tier-ablage" });
    var steine = T.el("div", { class: "logik-steine" });

    function male() {
      ablage.textContent = "";
      tiere.forEach(function (t, ti) {
        if (platz.indexOf(ti) >= 0) return;
        ablage.appendChild(T.el("button", { type: "button", class: "knopf tier", "aria-pressed": String(gewaehlt === ti),
          onclick: function () { gewaehlt = gewaehlt === ti ? null : ti; male(); } }, [T.bild(t.bild), t.nom.split(" ")[1]]));
      });
      if (!ablage.children.length) ablage.appendChild(T.el("span", { class: "leise", text: "Alle Tiere sitzen." }));
      steine.textContent = "";
      L.steine.forEach(function (o, si) {
        var ti = platz[si];
        steine.appendChild(T.el("button", { type: "button", class: "logik-stein", "aria-label": "Stein " + o + (ti !== null ? ": " + tiere[ti].nom : ": frei"),
          onclick: function () {
            if (gewaehlt !== null) {
              var alt = platz.indexOf(gewaehlt);
              if (alt >= 0) platz[alt] = null;
              platz[si] = gewaehlt;
              gewaehlt = null;
            } else if (ti !== null) {
              platz[si] = null;
            }
            meldung.textContent = "";
            liste.querySelectorAll("li").forEach(function (li) { li.classList.remove("nicht"); });
            male();
          } }, [ti !== null ? T.bild(tiere[ti].bild) : T.el("span", { class: "frei", "aria-hidden": "true" }), T.el("span", { class: "stein-name", text: o })]));
      });
    }

    ziel.appendChild(T.el("p", { class: "lesen", text: L.aufgabe }));
    ziel.appendChild(liste);
    ziel.appendChild(ablage);
    ziel.appendChild(steine);
    ziel.appendChild(meldung);
    ziel.appendChild(T.el("div", { class: "knoepfe" }, [T.el("button", { type: "button", class: "knopf haupt", text: L.pruefen, onclick: function () {
      if (platz.indexOf(null) >= 0) { meldung.textContent = L.leer; return; }
      var pl = [];
      platz.forEach(function (ti, si) { pl[ti] = si; });
      var falsch = false;
      raetsel.hinweise.forEach(function (h, i) {
        var ok = h.pruefe(pl);
        liste.children[i].classList.toggle("nicht", !ok);
        if (!ok) falsch = true;
      });
      if (falsch) { meldung.textContent = L.falsch; T.pop(meldung); return; }
      fertig();
    } })]));
    male();
  }

  // ---------- Rätsel 4: Schiebebild ----------
  var BILD = '<rect width="300" height="300" fill="#DCEFF2"/><rect y="228" width="300" height="72" fill="#EBD9B4"/>' +
    '<use href="#i-sonne" x="222" y="12" width="66" height="66"/><use href="#i-seerose" x="18" y="34" width="62" height="62"/>' +
    '<use href="#i-schmetterling" x="120" y="22" width="52" height="52"/>' +
    '<g class="sokrates lvl-1"><use href="#sokrates" x="6" y="104" width="288" height="178"/></g>' +
    '<use href="#i-frosch" x="236" y="232" width="54" height="54"/>';
  function schiebe(ziel, fertig) {
    var S = I.schiebe;
    var feld = [0, 1, 2, 3, 4, 5, 6, 7, 8];   // feld[position] = teil; 8 = Lücke
    var zahlen = false;
    function nachbarn(p) {
      var r = Math.floor(p / 3), c = p % 3, n = [];
      if (r > 0) n.push(p - 3); if (r < 2) n.push(p + 3); if (c > 0) n.push(p - 1); if (c < 2) n.push(p + 1);
      return n;
    }
    function mische() {
      feld = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      var leer = 8, vorher = -1;
      for (var i = 0; i < 90 || geloest(); i++) {
        var n = nachbarn(leer).filter(function (x) { return x !== vorher; });
        var z = T.zufall(n);
        feld[leer] = feld[z]; feld[z] = 8; vorher = leer; leer = z;
      }
    }
    function geloest() { return feld.every(function (t, i) { return t === i; }); }
    var gitter = T.el("ul", { class: "schiebe" });
    function male() {
      gitter.textContent = "";
      gitter.classList.toggle("mit-zahlen", zahlen);
      var leer = feld.indexOf(8);
      feld.forEach(function (t, p) {
        if (t === 8) { gitter.appendChild(T.el("li", { class: "leer", "aria-label": "Lücke" })); return; }
        var svg = '<svg viewBox="' + (t % 3) * 100 + " " + Math.floor(t / 3) * 100 + ' 100 100" aria-hidden="true">' + BILD + "</svg>";
        var knopf = T.el("button", { type: "button", class: "schiebe-teil", "aria-label": "Teil " + (t + 1) + (nachbarn(leer).indexOf(p) >= 0 ? ", kann geschoben werden" : "") });
        knopf.innerHTML = svg;
        knopf.appendChild(T.el("span", { class: "nr", "aria-hidden": "true", text: String(t + 1) }));
        knopf.addEventListener("click", function () {
          var l = feld.indexOf(8);
          if (nachbarn(l).indexOf(p) < 0) return;
          feld[l] = t; feld[p] = 8;
          male();
          var k = gitter.children[l];
          if (k && k.focus) k.focus();
          if (geloest()) setTimeout(fertig, 500);
        });
        gitter.appendChild(T.el("li", {}, [knopf]));
      });
    }
    var zahlKnopf = T.el("button", { type: "button", class: "knopf klein", text: S.zahlen, onclick: function () {
      zahlen = !zahlen; zahlKnopf.textContent = zahlen ? S.ohneZahlen : S.zahlen; male();
    } });
    ziel.appendChild(T.el("p", { class: "lesen", text: S.aufgabe }));
    var vorlage = T.el("div", { class: "schiebe-vorlage", "aria-hidden": "true" });
    vorlage.innerHTML = '<svg viewBox="0 0 300 300">' + BILD + "</svg>";
    ziel.appendChild(T.el("div", { class: "schiebe-bereich" }, [gitter, vorlage]));
    ziel.appendChild(T.el("div", { class: "knoepfe" }, [zahlKnopf, T.el("button", { type: "button", class: "knopf klein", text: S.mischen, onclick: function () { mische(); male(); } })]));
    mische();
    male();
  }

  T.ansichten["spiel-truhe"] = {
    zeige: function () {
      gebaut = true;
      aktuell = null;
      $("truhe-raetsel").textContent = "";
      $("truhe-ende").textContent = "";
      maleTruhe();
      maleSchlossWahl();
      var s = stand();
      if (s.fertig) {
        blase([I.endeTitel, I.ende[1]]);
        $("truhe-raetsel").appendChild(T.el("div", { class: "knoepfe" }, [T.el("button", { type: "button", class: "knopf haupt", text: I.nochmal, onclick: neueRaetsel })]));
      } else {
        blase(s.offen.length ? [I.nochZu] : I.intro);
      }
    }
  };
  T.truheErzeugeLogik = erzeugeLogik;   // für Tests
})(window.Teich);
