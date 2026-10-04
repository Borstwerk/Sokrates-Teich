/* Spiel: Gefühle-Memory – Paare mit Sokrates-Gesichtern finden, ohne Zeit und ohne Zählen */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.memory;
  var $ = function (id) { return document.getElementById(id); };
  var TINTE = "#2E3A2F";
  var gebaut = false, paare = 4, offen = [], sperre = false, gefunden = 0, uhr = null;

  // Sokrates' Gesicht für jedes Gefühl (viewBox 0 0 100 100)
  function gesicht(art) {
    var augenPunkt = '<circle cx="37" cy="46" r="5" fill="' + TINTE + '"/><circle cx="63" cy="46" r="5" fill="' + TINTE + '"/>';
    var augenGross = '<circle cx="37" cy="45" r="9" fill="#fff" stroke="' + TINTE + '" stroke-width="3"/><circle cx="63" cy="45" r="9" fill="#fff" stroke="' + TINTE + '" stroke-width="3"/><circle cx="37" cy="46" r="4" fill="' + TINTE + '"/><circle cx="63" cy="46" r="4" fill="' + TINTE + '"/>';
    var linie = function (d, w) { return '<path d="' + d + '" fill="none" stroke="' + TINTE + '" stroke-width="' + (w || 4) + '" stroke-linecap="round" stroke-linejoin="round"/>'; };
    var teile = {
      froh: augenPunkt + linie("M32 62 Q50 80 68 62"),
      mutig: augenPunkt + linie("M27 33 L44 38") + linie("M73 33 L56 38") + linie("M36 66 Q50 74 64 66"),
      aufgeregt: augenGross + linie("M33 68 Q39 61 45 68 Q51 75 57 68 Q63 61 67 68", 3.5) + '<path d="M84 22 C80 30 80 34 84 34 C88 34 88 30 84 22 Z" fill="#5FA8C7" stroke="' + TINTE + '" stroke-width="2"/>',
      muede: linie("M29 48 Q37 53 45 48") + linie("M55 48 Q63 53 71 48") + '<ellipse cx="50" cy="68" rx="6" ry="5" fill="#8A4434" stroke="' + TINTE + '" stroke-width="2.5"/>' +
        '<text x="78" y="28" font-family="Andika, sans-serif" font-weight="700" font-size="18" fill="#2F6F7E">z</text><text x="86" y="16" font-family="Andika, sans-serif" font-weight="700" font-size="13" fill="#2F6F7E">z</text>',
      stolz: linie("M29 48 Q37 40 45 48") + linie("M55 48 Q63 40 71 48") + linie("M30 60 Q50 82 70 60") +
        '<polygon points="84,8 87,16 95,16 89,21 91,29 84,24 77,29 79,21 73,16 81,16" fill="#F2B544" stroke="' + TINTE + '" stroke-width="2" stroke-linejoin="round"/>',
      ruhig: linie("M29 46 Q37 52 45 46") + linie("M55 46 Q63 52 71 46") + linie("M40 66 Q50 72 60 66"),
      traurig: augenPunkt + linie("M28 36 L43 31") + linie("M72 36 L57 31") + linie("M36 72 Q50 62 64 72") + '<path d="M33 54 C30 60 30 63 33 63 C36 63 36 60 33 54 Z" fill="#5FA8C7" stroke="' + TINTE + '" stroke-width="1.5"/>',
      ueberrascht: augenGross + linie("M28 30 Q37 24 45 30", 3) + linie("M55 30 Q63 24 72 30", 3) + '<ellipse cx="50" cy="69" rx="7" ry="9" fill="#8A4434" stroke="' + TINTE + '" stroke-width="2.5"/>'
    };
    return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><circle cx="50" cy="52" r="40" fill="#9CC27A" stroke="' + TINTE + '" stroke-width="3.5"/>' +
      '<circle cx="24" cy="62" r="6" fill="#E89A86" opacity=".45"/><circle cx="76" cy="62" r="6" fill="#E89A86" opacity=".45"/>' + (teile[art] || teile.froh) + "</svg>";
  }

  function blase(saetze) {
    T.absaetze($("memory-blase"), saetze);
    T.pop($("memory-blase").parentNode);
  }

  function karte(g, nr) {
    var vorne = T.el("span", { class: "vorne" });
    vorne.innerHTML = gesicht(g[0]);
    vorne.appendChild(T.el("span", { class: "wort", text: g[1] }));
    var hinten = T.el("span", { class: "hinten" }, [T.bild("i-seerose")]);
    var knopf = T.el("button", { type: "button", class: "memory-karte", "data-gefuehl": g[0], "aria-label": "Karte " + (nr + 1) + ", verdeckt" },
      [T.el("span", { class: "innen" }, [hinten, vorne])]);
    knopf.addEventListener("click", function () { drehe(knopf, g, nr); });
    return T.el("li", {}, [knopf]);
  }

  function drehe(knopf, g, nr) {
    if (sperre || knopf.classList.contains("offen") || knopf.classList.contains("paar")) return;
    knopf.classList.add("offen");
    knopf.setAttribute("aria-label", "Karte " + (nr + 1) + ": " + g[1]);
    offen.push({ knopf: knopf, g: g, nr: nr });
    if (offen.length < 2) return;

    var a = offen[0], b = offen[1];
    offen = [];
    if (a.g[0] === b.g[0]) {
      [a, b].forEach(function (k) {
        k.knopf.classList.add("paar");
        k.knopf.setAttribute("aria-label", "Paar gefunden: " + k.g[1]);
      });
      gefunden++;
      blase([a.g[2]]);
      if (gefunden === paare) {
        uhr = setTimeout(function () {
          T.spielEnde($("memory-ende"), { titel: I.endeTitel, text: I.ende, nochmal: starte });
        }, 600);
      }
    } else {
      // Kein Fehler: Die Karten drehen sich einfach in Ruhe wieder um
      sperre = true;
      uhr = setTimeout(function () {
        [a, b].forEach(function (k) {
          k.knopf.classList.remove("offen");
          k.knopf.setAttribute("aria-label", "Karte " + (k.nr + 1) + ", verdeckt");
        });
        sperre = false;
      }, 1300);
    }
  }

  function starte() {
    clearTimeout(uhr);
    $("memory-ende").textContent = "";
    offen = []; sperre = false; gefunden = 0;
    var auswahl = T.mische(I.gefuehle).slice(0, paare);
    var deck = T.mische(auswahl.concat(auswahl));
    var liste = $("memory");
    liste.textContent = "";
    liste.dataset.paare = paare;
    deck.forEach(function (g, i) { liste.appendChild(karte(g, i)); });
    T.nacheinander(liste);
    blase(I.intro);
    $("memory-wahl").querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(Number(b.dataset.paare) === paare)); });
  }

  function baue() {
    [[4, I.leicht], [6, I.schwer]].forEach(function (w) {
      $("memory-wahl").appendChild(T.el("button", { type: "button", class: "knopf", "data-paare": w[0], "aria-pressed": "false",
        onclick: function () { paare = w[0]; starte(); } }, [w[1]]));
    });
    gebaut = true;
  }

  T.gesicht = gesicht;

  T.ansichten["spiel-memory"] = {
    zeige: function () {
      if (!gebaut) baue();
      starte();
    },
    verlasse: function () { clearTimeout(uhr); }
  };
})(window.Teich);
