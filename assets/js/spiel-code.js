/* Knobeln: Geheime Zeichen – Botschaften mit einer Zeichen-Schrift entschlüsseln und selbst schreiben */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.code;
  var $ = function (id) { return document.getElementById(id); };
  var TINTE = "#2E3A2F";
  var ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // 5 Formen × 6 Markierungen = 30 Zeichen (A–Z braucht 26)
  var FORMEN = [
    ['<circle cx="20" cy="20" r="15"', "#A8DDEB"],
    ['<rect x="6" y="6" width="28" height="28" rx="3"', "#CFE3B5"],
    ['<polygon points="20,4 36,34 4,34"', "#FCE3A6"],
    ['<polygon points="20,3 37,20 20,37 3,20"', "#F6CFC4"],
    ['<path d="M4 34 C4 10 36 10 36 34 Z"', "#DCCDEB"]
  ];
  var MARKEN = [
    "",
    '<circle cx="20" cy="23" r="3.6" fill="' + TINTE + '"/>',
    '<circle cx="14.5" cy="23" r="3.2" fill="' + TINTE + '"/><circle cx="25.5" cy="23" r="3.2" fill="' + TINTE + '"/>',
    '<path d="M11 23 H29" stroke="' + TINTE + '" stroke-width="3.5" stroke-linecap="round"/>',
    '<path d="M20 14 V30" stroke="' + TINTE + '" stroke-width="3.5" stroke-linecap="round"/>',
    '<path d="M14 17 L26 29 M26 17 L14 29" stroke="' + TINTE + '" stroke-width="3.2" stroke-linecap="round"/>'
  ];
  function zeichen(buchstabe) {
    var i = ABC.indexOf(buchstabe);
    var f = FORMEN[Math.floor(i / 6)], m = MARKEN[i % 6];
    return '<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">' + f[0] + ' fill="' + f[1] + '" stroke="' + TINTE + '" stroke-width="2.5" stroke-linejoin="round"/>' + m + "</svg>";
  }

  // Umlaute auflösen, Großbuchstaben
  function normal(text) {
    return String(text).toUpperCase().replace(/Ä/g, "AE").replace(/Ö/g, "OE").replace(/Ü/g, "UE").replace(/ß/g, "SS").replace(/\s+/g, " ").trim();
  }

  // Botschaft als Zeichen; mitLoesung = Buchstaben sichtbar
  function zeichneBotschaft(text, gefuellt) {
    var box = T.el("div", { class: "code-botschaft" });
    var nr = 0;
    normal(text).split(" ").forEach(function (wort) {
      var w = T.el("span", { class: "code-wort" });
      wort.split("").forEach(function (b) {
        if (ABC.indexOf(b) < 0) { w.appendChild(T.el("span", { class: "code-zelle satzzeichen", text: b })); return; }
        var z = T.el("span", { class: "code-zelle", "data-nr": nr++ });
        z.innerHTML = zeichen(b);
        z.appendChild(T.el("span", { class: "buchstabe", text: gefuellt ? b : "" }));
        w.appendChild(z);
      });
      box.appendChild(w);
    });
    return box;
  }

  function schluesselTabelle(buchstaben, beiKlick) {
    var liste = T.el("ul", { class: "code-schluessel" });
    buchstaben.forEach(function (b) {
      var inhalt = T.el("span", { class: "code-symbol" });
      inhalt.innerHTML = zeichen(b);
      var kind = beiKlick
        ? T.el("button", { type: "button", class: "code-taste", "aria-label": "Zeichen für " + b, onclick: function (e) { beiKlick(b, e.currentTarget); } }, [inhalt, T.el("b", { text: b })])
        : T.el("span", { class: "code-taste" }, [inhalt, T.el("b", { text: b })]);
      liste.appendChild(T.el("li", {}, [kind]));
    });
    return liste;
  }

  function stufe() { return Number(T.abenteuer("code").stufe) || 0; }

  function blase(saetze) { T.absaetze($("code-blase"), saetze); T.pop($("code-blase").parentNode); }

  function zeigeBotschaft() {
    var nr = stufe();
    var ziel = $("code-spiel");
    ziel.textContent = "";
    $("code-ende").textContent = "";
    if (nr >= I.botschaften.length) {
      ziel.appendChild(T.el("p", { class: "lesen", style: "font-weight:700", text: I.endeTitel }));
      ziel.appendChild(T.el("div", { class: "knoepfe" }, [T.el("button", { type: "button", class: "knopf", text: "Von vorn anfangen", onclick: function () { T.abenteuerSpeichern("code", { stufe: 0 }); zeigeBotschaft(); } })]));
      return;
    }
    var b = I.botschaften[nr];
    var text = normal(b[0]);
    var folge = text.replace(/[^A-Z]/g, "").split("");
    var pos = 0;
    var botschaft = zeichneBotschaft(text, false);
    var zellen = botschaft.querySelectorAll(".code-zelle[data-nr]");
    var meldung = T.el("p", { class: "raetsel-meldung", "aria-live": "polite" });
    var fortschritt = T.el("p", { class: "nur-vorleser", "aria-live": "polite" });
    function markiere() { zellen.forEach(function (z, i) { z.classList.toggle("jetzt", i === pos); }); }

    // Schlüssel: am Anfang nur die nötigen Buchstaben, später das ganze Alphabet
    var buchstaben = nr < 2 ? folge.filter(function (x, i, a) { return a.indexOf(x) === i; }).sort() : ABC.split("");
    var schluessel = schluesselTabelle(buchstaben, function (bst, knopf) {
      if (pos >= folge.length) return;
      if (bst !== folge[pos]) { meldung.textContent = I.falsch; T.pop(knopf, "wackeln"); return; }
      meldung.textContent = "";
      zellen[pos].querySelector(".buchstabe").textContent = bst;
      zellen[pos].classList.add("fertig");
      T.pop(zellen[pos]);
      pos++;
      fortschritt.textContent = bst;
      markiere();
      if (pos >= folge.length) geschafft();
    });

    function geschafft() {
      var naechste = nr + 1;
      T.abenteuerSpeichern("code", { stufe: naechste });
      blase([I.geloest, "„" + b[0] + "“", b[1]]);
      schluessel.querySelectorAll("button").forEach(function (k) { k.disabled = true; });
      if (naechste >= I.botschaften.length) {
        T.spielEnde($("code-ende"), { titel: I.endeTitel, text: I.ende, nochmal: function () { T.abenteuerSpeichern("code", { stufe: 0 }); zeigeBotschaft(); blase(I.intro); }, nochmalText: "Von vorn anfangen" });
        return;
      }
      var w = T.el("button", { type: "button", class: "knopf haupt", text: I.weiter, onclick: function () { zeigeBotschaft(); var t = $("code-spiel").querySelector(".code-taste"); if (t) t.focus(); } });
      ziel.appendChild(T.el("div", { class: "knoepfe" }, [w]));
      w.focus();
    }

    ziel.appendChild(T.el("p", { class: "leise", text: T.fuelle(I.botschaft, { nr: nr + 1, von: I.botschaften.length }) }));
    ziel.appendChild(botschaft);
    ziel.appendChild(meldung);
    ziel.appendChild(fortschritt);
    ziel.appendChild(T.el("h2", { class: "lesen code-titel", text: I.schluessel }));
    ziel.appendChild(schluessel);
    markiere();
  }

  function eigeneBotschaft() {
    var box = $("code-eigen");
    if (box.dataset.gebaut) return;
    box.dataset.gebaut = "1";
    var feld = T.el("input", { type: "text", id: "code-text", maxlength: "60", placeholder: I.eigenBeispiel, autocomplete: "off" });
    var vorschau = T.el("div", { class: "code-vorschau", "aria-live": "polite" });
    function zeige() {
      vorschau.textContent = "";
      if (feld.value.trim()) vorschau.appendChild(zeichneBotschaft(feld.value, false));
    }
    feld.addEventListener("input", zeige);
    box.appendChild(T.el("h2", { class: "lesen", text: I.eigenTitel }));
    box.appendChild(T.el("p", { class: "lesen", text: I.eigenText }));
    box.appendChild(T.el("label", { for: "code-text", class: "werkzeug-titel", text: I.eigenFeld }));
    box.appendChild(feld);
    box.appendChild(vorschau);
    box.appendChild(T.el("div", { class: "knoepfe" }, [T.el("button", { type: "button", class: "knopf", text: I.drucken, onclick: function () {
      if (!feld.value.trim()) { feld.focus(); return; }
      T.drucke([T.el("div", { class: "code-blatt" }, [
        T.el("h1", { text: I.druckTitel }),
        T.el("p", { text: I.druckHinweis }),
        zeichneBotschaft(feld.value, false),
        T.el("h2", { text: I.schluessel }),
        schluesselTabelle(ABC.split(""), null)
      ])], "code-druck");
    } })]));
  }

  T.ansichten["spiel-code"] = {
    zeige: function () {
      blase(stufe() ? [T.fuelle(I.botschaft, { nr: Math.min(stufe() + 1, I.botschaften.length), von: I.botschaften.length })] : I.intro);
      zeigeBotschaft();
      eigeneBotschaft();
    }
  };
})(window.Teich);
