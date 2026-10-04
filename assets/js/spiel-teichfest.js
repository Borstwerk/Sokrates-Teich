/* Abenteuer: Das Teichfest – eine Geschichte, in der das Kind entscheidet. Jeder Weg führt zu einem guten Ende. */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.teichfest;
  var $ = function (id) { return document.getElementById(id); };
  var weg = [];

  function enden() { return Object.keys(I.seiten).filter(function (id) { return I.seiten[id].ende; }); }
  function gefunden() { return T.abenteuer("teichfest").enden || []; }

  function maleEnden() {
    var box = $("tf-enden");
    box.textContent = "";
    var g = gefunden();
    box.appendChild(T.el("p", { class: "leise", text: T.fuelle(I.enden, { anzahl: g.length, von: enden().length }) }));
    box.appendChild(T.el("ul", { class: "tf-enden" }, enden().map(function (id) {
      var da = g.indexOf(id) >= 0;
      return T.el("li", { class: da ? "da" : "" }, [da ? T.bild("i-stern") : T.el("span", { class: "fragezeichen", text: "?" }), da ? I.seiten[id].ende : "Noch nicht entdeckt"]);
    })));
  }

  function seite(id) {
    var s = I.seiten[id];
    weg.push(id);
    var bild = $("tf-bild");
    bild.textContent = "";
    var szene = T.szene({ level: s.level || 1, lampe: s.lampe, deko: s.deko });
    bild.appendChild(szene);
    var text = $("tf-text");
    text.textContent = "";
    if (s.ende) text.appendChild(T.el("span", { class: "titel lesen", text: s.ende }));
    var p = T.el("div", { class: "lesen" });
    T.absaetze(p, s.text);
    text.appendChild(p);
    T.pop(text.parentNode);
    T.pop($("tf-buch"), "blaettert-vor");

    var wahl = $("tf-wahl");
    wahl.textContent = "";
    $("tf-ende").textContent = "";
    if (s.ende) return ende(id);
    s.wahl.forEach(function (w) {
      wahl.appendChild(T.el("button", { type: "button", class: "knopf tf-knopf", onclick: function () {
        seite(w[1]);
        var k = $("tf-wahl").querySelector("button");
        if (k) k.focus(); else $("tf-buch").focus();
      } }, [w[0], " →"]));
    });
  }

  function ende(id) {
    var g = gefunden();
    var neu = g.indexOf(id) < 0;
    if (neu) T.abenteuerSpeichern("teichfest", { enden: g.concat([id]) });
    maleEnden();
    T.spielEnde($("tf-ende"), {
      titel: neu ? I.neuesEnde : I.seiten[id].ende,
      text: [I.jederWeg, T.fuelle(I.enden, { anzahl: gefunden().length, von: enden().length })],
      fund: neu ? T.findeEtwas("spiel") : null,
      nochmal: starte, nochmalText: I.nochmal
    });
  }

  function starte() {
    weg = [];
    $("tf-intro").textContent = I.intro;
    maleEnden();
    seite("start");
  }

  T.ansichten["spiel-teichfest"] = { zeige: starte };
})(window.Teich);
