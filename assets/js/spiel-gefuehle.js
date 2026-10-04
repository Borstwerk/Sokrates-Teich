/* Kleines Spiel: Wer fühlt was? – Gefühle an Hinweisen erkennen und überlegen, was helfen könnte */
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
      T.el("p", { class: "leise", text: "Bild " + (nr + 1) + " von " + bilder.length }),
      T.bild(b.bild),
      T.el("p", { class: "spiel-karte-text lesen", text: b.text }),
      T.vorleseKnopf(b.text)
    ]);
    box.appendChild(karte);

    var frage = T.el("h2", { class: "lesen gf-frage", text: T.fuelle(I.frage, { wer: b.wer }) });
    var meldung = T.el("p", { class: "raetsel-meldung", "aria-live": "polite" });
    var wahl = T.el("div", { class: "gf-wahl" });
    var schritt2 = T.el("div");
    b.auswahl.forEach(function (id) {
      var g = gefuehl(id);
      var knopf = T.el("button", { type: "button", class: "knopf gf-knopf", "data-gefuehl": id }, [T.el("span", { class: "gf-gesicht" }), g[1]]);
      knopf.firstChild.innerHTML = T.gesicht(id);
      knopf.addEventListener("click", function () {
        if (b.passt.indexOf(id) < 0) {
          meldung.textContent = T.fuelle(I.eherNicht, { hinweis: b.hinweis });
          knopf.classList.add("eher-nicht");
          knopf.disabled = true;
          return;
        }
        knopf.setAttribute("aria-pressed", "true");
        meldung.textContent = I.gut + " " + g[2];
        if (!schritt2.children.length) zeigeHilfen(b, schritt2);
      });
      wahl.appendChild(knopf);
    });
    box.appendChild(frage);
    box.appendChild(wahl);
    box.appendChild(meldung);
    box.appendChild(schritt2);
  }

  function zeigeHilfen(b, ziel) {
    ziel.appendChild(T.el("h2", { class: "lesen gf-frage", text: T.fuelle(I.hilfeFrage, { wem: b.wem }) }));
    var antwort = T.el("p", { class: "antwort", "aria-live": "polite", hidden: true });
    var wahl = T.el("div", { class: "gf-hilfen" });
    b.hilfen.forEach(function (h) {
      wahl.appendChild(T.el("button", { type: "button", class: "knopf", text: h[0], onclick: function (e) {
        wahl.querySelectorAll("button").forEach(function (k) { k.setAttribute("aria-pressed", String(k === e.currentTarget)); });
        antwort.hidden = false;
        antwort.textContent = h[1];
        T.pop(antwort);
        if (!ziel.querySelector(".weiter")) {
          var letzte = nr === bilder.length - 1;
          var w = T.el("button", { type: "button", class: "knopf haupt weiter", text: letzte ? I.fertig : I.weiter, onclick: function () {
            nr++;
            if (nr < bilder.length) { zeige(); var k = $("gf-spiel").querySelector(".gf-knopf"); if (k) k.focus(); }
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
