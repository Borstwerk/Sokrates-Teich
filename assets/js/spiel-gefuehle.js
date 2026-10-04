/* Wer fühlt was? – Beobachtung und Vermutung unterscheiden, mögliche Gefühle erkunden. */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.gefuehleSpiel;
  var $ = function (id) { return document.getElementById(id); };
  var bilder = [], nr = 0;

  function gefuehl(id) { return T.inhalt.memory.gefuehle.find(function (g) { return g[0] === id; }); }
  function blase(saetze) { T.absaetze($("gf-blase"), saetze); T.pop($("gf-blase").parentNode); }

  function zeige() {
    var b = bilder[nr];
    var box = $("gf-spiel");
    box.textContent = "";
    var karte = T.el("div", { class: "spiel-karte gf-karte" }, [
      T.el("p", { class: "leise", text: T.fuelle(I.bildZaehler, { nr: nr + 1, von: bilder.length }) }),
      T.bild(b.bild),
      T.el("p", { class: "spiel-karte-text lesen", text: b.text }),
      T.vorleseKnopf(b.text)
    ]);
    box.appendChild(karte);

    var beobachtung = T.el("div", { class: "gf-beobachtung" });
    var spur = T.el("p", { class: "antwort lesen", "aria-live": "polite" });
    var gefuehle = T.el("div", { hidden: true });
    beobachtung.appendChild(T.el("h2", { class: "lesen gf-frage", text: I.beobachtungFrage }));
    var aussagen = T.el("div", { class: "gf-hilfen" });
    T.mische([{ text: b.hinweis, gesehen: true }, { text: b.vermutung, gesehen: false }]).forEach(function (a) {
      aussagen.appendChild(T.el("button", { type: "button", class: "knopf", "aria-pressed": "false", "data-gesehen": String(a.gesehen), text: a.text, onclick: function (e) {
        aussagen.querySelectorAll("button").forEach(function (k) { k.setAttribute("aria-pressed", String(k === e.currentTarget)); });
        spur.textContent = (a.gesehen ? I.beobachtet : I.vermutet) + " " + I.gesehenTitel + ": " + b.hinweis;
        gefuehle.hidden = false;
      } }));
    });
    beobachtung.appendChild(aussagen);
    beobachtung.appendChild(spur);
    box.appendChild(beobachtung);

    var frage = T.el("h2", { class: "lesen gf-frage", text: T.fuelle(I.frage, { wer: b.wer }) });
    var meldung = T.el("p", { class: "raetsel-meldung", "aria-live": "polite" });
    var wahl = T.el("div", { class: "gf-wahl" });
    var spuren = T.el("div", { class: "gf-spuren lesen", hidden: true });
    var schritt2 = T.el("div");
    function waehle(knopf, vermutung) {
      gefuehle.querySelectorAll("[data-gefuehl]").forEach(function (k) { k.setAttribute("aria-pressed", String(k === knopf)); });
      meldung.textContent = vermutung || I.unsicherAntwort;
      spuren.hidden = false;
      spuren.textContent = "";
      spuren.appendChild(T.el("dl", {}, [
        T.el("dt", { text: I.gesehenTitel }), T.el("dd", { text: b.hinweis }),
        T.el("dt", { text: I.vermutungTitel }), T.el("dd", { text: vermutung || I.keineVermutung }),
        T.el("dt", { text: I.offenTitel }), T.el("dd", { text: T.fuelle(I.offen, { wer: b.wer }) })
      ]));
      spuren.appendChild(T.el("p", { text: I.fragen }));
      if (!schritt2.children.length) zeigeHilfen(b, schritt2);
    }
    b.auswahl.forEach(function (id) {
      var g = gefuehl(id);
      var knopf = T.el("button", { type: "button", class: "knopf gf-knopf", "data-gefuehl": id, "aria-pressed": "false" }, [T.el("span", { class: "gf-gesicht" }), g[1]]);
      knopf.firstChild.innerHTML = T.gesicht(id);
      knopf.addEventListener("click", function () {
        waehle(knopf, T.fuelle(I.vielleicht, { wer: b.wer, gefuehl: g[1].toLowerCase() }));
      });
      wahl.appendChild(knopf);
    });
    gefuehle.appendChild(frage);
    gefuehle.appendChild(wahl);
    gefuehle.appendChild(T.el("button", { type: "button", class: "knopf gf-unsicher", "data-gefuehl": "weiss-nicht", "aria-pressed": "false", text: I.unsicher, onclick: function (e) { waehle(e.currentTarget, null); } }));
    gefuehle.appendChild(meldung);
    gefuehle.appendChild(spuren);
    gefuehle.appendChild(schritt2);
    box.appendChild(gefuehle);
  }

  function zeigeHilfen(b, ziel) {
    ziel.appendChild(T.el("h2", { class: "lesen gf-frage", text: T.fuelle(I.hilfeFrage, { wem: b.wem }) }));
    var antwort = T.el("p", { class: "antwort", "aria-live": "polite", hidden: true });
    var wahl = T.el("div", { class: "gf-hilfen" });
    b.hilfen.forEach(function (h) {
      wahl.appendChild(T.el("button", { type: "button", class: "knopf", "aria-pressed": "false", text: h[0], onclick: function (e) {
        wahl.querySelectorAll("button").forEach(function (k) { k.setAttribute("aria-pressed", String(k === e.currentTarget)); });
        antwort.hidden = false;
        antwort.textContent = h[1];
        T.pop(antwort);
        if (!ziel.querySelector(".weiter")) {
          var letzte = nr === bilder.length - 1;
          var w = T.el("button", { type: "button", class: "knopf haupt weiter", text: letzte ? I.fertig : I.weiter, onclick: function () {
            nr++;
            if (nr < bilder.length) { zeige(); var k = $("gf-spiel").querySelector(".gf-beobachtung button"); if (k) k.focus(); }
            else fertig();
          } });
          ziel.appendChild(T.el("div", { class: "knoepfe" }, [w]));
        }
      } }));
    });
    ziel.appendChild(wahl);
    ziel.appendChild(antwort);
  }

  function fertig() {
    $("gf-spiel").textContent = "";
    T.spielEnde($("gf-ende"), { titel: I.endeTitel, text: I.ende, nochmal: starte });
  }

  function starte() {
    $("gf-ende").textContent = "";
    bilder = T.mische(I.bilder).slice(0, I.proRunde).map(function (b) { return Object.assign({}, b, { auswahl: T.mische(b.auswahl) }); });
    nr = 0;
    blase(I.intro);
    zeige();
  }

  T.ansichten["spiel-gefuehle"] = { zeige: starte };
})(window.Teich);
