/* Knobeln: Lichtzeichen im Schilf – Funkels Lichtsprache aus kurzen und langen Blinkzeichen.
   Langsam und weich geblinkt (höchstens etwa ein Lichtwechsel pro Sekunde), ohne Zeitdruck. */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.licht;
  var $ = function (id) { return document.getElementById(id); };
  var DAUER = { k: 450, l: 1300, pause: 600, start: 600 };
  var MAX = 5;
  var nacht = null, funkelLicht, laterne, ansage, abspielNr = 0;

  T.lichtTempo = 1;   // Tests dürfen beschleunigen

  function stand() { var s = T.abenteuer("licht"); s.stufe = Number(s.stufe) || 0; return s; }
  function zeichen(id) { return I.zeichen.find(function (z) { return z.id === id; }); }
  function blase(saetze) { T.absaetze($("li-blase"), saetze); T.pop($("li-blase").parentNode); }
  function warte(ms) { return new Promise(function (r) { setTimeout(r, ms * T.lichtTempo); }); }
  function inWorten(folge) { return folge.split("").map(function (c) { return c === "k" ? I.kurz : I.lang; }).join(", "); }

  // Punkte und Striche als Bild, mit Text für Vorleseprogramme
  function folgeBild(folge, klasse) {
    return T.el("span", { class: "li-folge" + (klasse ? " " + klasse : ""), role: "img", "aria-label": inWorten(folge) },
      folge.split("").map(function (c) { return T.el("span", { class: c === "k" ? "li-kurz" : "li-lang" }); }));
  }

  // Ein Licht blinkt eine Folge. Eine neue Folge bricht die alte ab.
  function blinke(licht, folge) {
    var nr = ++abspielNr;
    [funkelLicht, laterne].forEach(function (l) { l.classList.remove("an"); });
    var kette = warte(DAUER.start);
    folge.split("").forEach(function (c) {
      kette = kette.then(function () {
        if (nr !== abspielNr) return;
        licht.classList.add("an");
        ansage.textContent = c === "k" ? I.kurz : I.lang;
        return warte(DAUER[c]).then(function () {
          if (nr !== abspielNr) return;
          licht.classList.remove("an");
          return warte(DAUER.pause);
        });
      });
    });
    return kette.then(function () { return nr === abspielNr; });
  }

  function baueNacht() {
    var schilf = '<svg class="li-schilf" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
      '<path d="M0 120 V92 Q150 80 300 94 T600 88 V120 Z" fill="#163042"/>' +
      [30, 70, 110, 150, 470, 510, 545, 580].map(function (xx, i) {
        var h = 40 + (i * 17) % 50;
        return '<path d="M' + xx + ' 120 Q' + (xx + 6) + " " + (100 - h / 2) + " " + (xx + (i % 2 ? 10 : -8)) + " " + (96 - h) + '" stroke="#2B4A3A" stroke-width="5" fill="none" stroke-linecap="round"/>' +
          (i % 3 === 0 ? '<rect x="' + (xx + (i % 2 ? 6 : -12)) + '" y="' + (92 - h) + '" width="9" height="24" rx="4" fill="#5A4A2E"/>' : "");
      }).join("") + "</svg>";
    funkelLicht = T.el("div", { class: "li-licht funkel" });
    laterne = T.el("div", { class: "li-licht laterne" });
    ansage = T.el("p", { class: "nur-vorleser", "aria-live": "polite" });
    var box = T.el("div", { class: "li-nacht" }, [
      T.el("div", { class: "li-sterne", "aria-hidden": "true" }),
      T.el("figure", { class: "li-wer links" }, [laterne, T.el("figcaption", { text: I.laterne })]),
      T.el("figure", { class: "li-wer rechts" }, [funkelLicht, T.el("figcaption", { text: I.funkel })]),
      ansage
    ]);
    box.insertAdjacentHTML("beforeend", schilf);
    return box;
  }

  // Eingabe aus Kurz/Lang mit Anzeige; beiSenden(folge) liefert das Ergebnis
  function eingabe(beiSenden) {
    var folge = "";
    var anzeige = T.el("div", { class: "li-eingabe-anzeige", "aria-live": "polite" });
    var senden = T.el("button", { type: "button", class: "knopf haupt", text: I.senden });
    function zeige() {
      anzeige.textContent = "";
      anzeige.appendChild(folge ? folgeBild(folge, "gross") : T.el("span", { class: "leise", text: I.nochLeer }));
      senden.disabled = !folge;
    }
    function dazu(c) { if (folge.length < MAX) { folge += c; zeige(); } }
    senden.addEventListener("click", function () {
      var f = folge;
      folge = "";
      zeige();
      box.querySelectorAll("button").forEach(function (k) { k.disabled = true; });
      blinke(laterne, f).then(function () {
        box.querySelectorAll("button").forEach(function (k) { k.disabled = false; });
        zeige();
        beiSenden(f);
      });
    });
    var box = T.el("div", { class: "li-eingabe" }, [
      T.el("p", { class: "werkzeug-titel", text: I.deineFolge }),
      anzeige,
      T.el("div", { class: "knoepfe li-tasten" }, [
        T.el("button", { type: "button", class: "knopf li-taste", onclick: function () { dazu("k"); } }, [T.el("span", { class: "li-kurz", "aria-hidden": "true" }), I.kurzKnopf]),
        T.el("button", { type: "button", class: "knopf li-taste", onclick: function () { dazu("l"); } }, [T.el("span", { class: "li-lang", "aria-hidden": "true" }), I.langKnopf]),
        T.el("button", { type: "button", class: "knopf klein", text: I.loeschen, onclick: function () { folge = folge.slice(0, -1); zeige(); } })
      ]),
      T.el("div", { class: "knoepfe" }, [senden])
    ]);
    zeige();
    return box;
  }

  function zeigeAufgabe() {
    var box = $("li-aufgabe");
    box.textContent = "";
    $("li-ende").textContent = "";
    var nr = stand().stufe;
    if (nr >= I.stufen.length) {
      box.appendChild(T.el("p", { class: "lesen li-fertig", text: I.endeTitel }));
      return;
    }
    var art = I.stufen[nr][0], ziel = zeichen(I.stufen[nr][1]);
    var meldung = T.el("p", { class: "raetsel-meldung", "aria-live": "polite" });
    var titel = T.el("h2", { class: "lesen", tabindex: "-1", text: T.fuelle(I.arten[art], { text: ziel.text }) });
    box.appendChild(T.el("p", { class: "leise", text: T.fuelle(I.aufgabe, { nr: nr + 1, von: I.stufen.length }) }));
    box.appendChild(titel);

    var hilfe = T.el("div", { class: "li-hilfe" });
    if (art === "nach") hilfe.appendChild(folgeBild(ziel.id, "gross"));
    box.appendChild(hilfe);
    var knoepfe = T.el("div", { class: "knoepfe" });
    if (art !== "schreiben") {
      knoepfe.appendChild(T.el("button", { type: "button", class: "knopf", text: I.zeigen, onclick: function () { blinke(funkelLicht, ziel.id); } }));
      if (art !== "nach") knoepfe.appendChild(T.el("button", { type: "button", class: "knopf", text: I.alsZeichen, onclick: function (e) {
        hilfe.textContent = ""; hilfe.appendChild(folgeBild(ziel.id, "gross")); e.currentTarget.disabled = true;
      } }));
    }
    box.appendChild(knoepfe);

    function geschafft() {
      var naechste = nr + 1;
      T.abenteuerSpeichern("licht", { stufe: naechste });
      meldung.textContent = "";
      blase([T.zufall(I.richtig)]);
      blinke(funkelLicht, "kk");
      box.querySelectorAll("button").forEach(function (k) { k.disabled = true; });
      if (naechste >= I.stufen.length) {
        T.spielEnde($("li-ende"), { titel: I.endeTitel, text: I.ende, nochmal: function () { T.abenteuerSpeichern("licht", { stufe: 0 }); zeigeAufgabe(); }, nochmalText: "Von vorn anfangen" });
        return;
      }
      var w = T.el("button", { type: "button", class: "knopf haupt", text: I.weiter, onclick: function () { zeigeAufgabe(); var h = $("li-aufgabe").querySelector("h2"); if (h) h.focus(); } });
      box.appendChild(T.el("div", { class: "knoepfe" }, [w]));
      w.focus();
    }

    if (art === "lesen") {
      var andere = T.mische(I.zeichen.filter(function (z) { return z.id !== ziel.id; })).slice(0, 3);
      var wahl = T.el("div", { class: "li-wahl" });
      T.mische([ziel].concat(andere)).forEach(function (z) {
        wahl.appendChild(T.el("button", { type: "button", class: "knopf li-bedeutung", onclick: function (e) {
          if (z.id === ziel.id) { geschafft(); return; }
          meldung.textContent = I.falschLesen;
          e.currentTarget.disabled = true;
          T.pop(e.currentTarget, "wackeln");
        } }, [T.bild(z.bild), z.text]));
      });
      box.appendChild(wahl);
    } else {
      box.appendChild(eingabe(function (f) {
        if (f === ziel.id) geschafft();
        else { meldung.textContent = I.falsch; if (art !== "schreiben") blinke(funkelLicht, ziel.id); }
      }));
    }
    box.appendChild(meldung);
    if (art !== "schreiben") blinke(funkelLicht, ziel.id);
  }

  function lexikon(mitDruck) {
    var liste = T.el("ul", { class: "li-lexikon" }, I.zeichen.map(function (z) {
      return T.el("li", {}, [folgeBild(z.id), T.bild(z.bild), T.el("span", { class: "lesen", text: z.text })]);
    }));
    var teile = [T.el("h2", { class: "lesen", text: I.lexikonTitel }), T.el("p", { class: "leise lesen", text: I.lexikonText }), liste];
    if (mitDruck) teile.push(T.el("div", { class: "knoepfe" }, [T.el("button", { type: "button", class: "knopf klein", text: I.drucken, onclick: function () {
      T.drucke([T.el("div", { class: "li-blatt" }, [T.el("h1", { text: I.druckTitel }), T.el("p", { text: I.druckText }), lexikon(false)])], "li-druck");
    } })]));
    return T.el("section", { class: "li-lexikon-box" }, teile);
  }

  function frei() {
    var antwort = T.el("p", { class: "lesen li-antwort", "aria-live": "polite" });
    return T.el("section", { class: "li-frei" }, [
      T.el("h2", { class: "lesen", text: I.freiTitel }),
      T.el("p", { class: "lesen", text: I.freiText }),
      eingabe(function (f) {
        var z = zeichen(f);
        antwort.textContent = "";
        if (!z) { antwort.textContent = I.unbekannt; blase([I.unbekannt]); return; }
        var a = zeichen(z.antwort);
        antwort.appendChild(T.el("span", {}, [T.bild(z.bild), "„" + z.text + "“ → "]));
        blinke(funkelLicht, a.id).then(function (fertig) {
          if (!fertig) return;
          antwort.appendChild(T.el("span", {}, [T.bild(a.bild), I.funkel + ": „" + z.sagt + "“"]));
          blase([z.sagt]);
        });
      }),
      antwort
    ]);
  }

  T.lichtZeichen = zeichen;   // für Tests

  T.ansichten["spiel-licht"] = {
    zeige: function () {
      blase(stand().stufe ? [T.fuelle(I.aufgabe, { nr: Math.min(stand().stufe + 1, I.stufen.length), von: I.stufen.length })] : I.intro);
      var box = $("li-spiel");
      box.textContent = "";
      nacht = baueNacht();
      box.appendChild(nacht);
      box.appendChild(T.el("div", { id: "li-aufgabe", class: "li-aufgabe" }));
      box.appendChild(T.el("div", { id: "li-ende" }));
      box.appendChild(T.el("div", { class: "li-unten" }, [lexikon(true), frei()]));
      zeigeAufgabe();
    },
    verlasse: function () { abspielNr++; }
  };
})(window.Teich);
