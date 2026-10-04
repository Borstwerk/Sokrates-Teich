/* Spiel: Ohne Worte – Sokrates fragt, das Kind antwortet mit Daumen oder Zeigen */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.zeichen;
  var $ = function (id) { return document.getElementById(id); };
  var szene, fragen = [], nr = 0;

  function blase(titel, saetze) {
    var b = $("zeichen-blase");
    b.textContent = "";
    if (titel) b.appendChild(T.el("span", { class: "titel", text: titel }));
    (saetze || []).forEach(function (s) { b.appendChild(T.el("p", { text: s })); });
    T.pop(b.parentNode);
  }

  function bildOderFarbe(wert) {
    if (wert.charAt(0) === "#") return T.el("span", { class: "farbe", style: "background:" + wert, "aria-hidden": "true" });
    return T.bild(wert);
  }

  function zeigeFrage() {
    var f = fragen[nr];
    var spiel = $("zeichen-spiel");
    spiel.textContent = "";
    szene.stelle(1);
    blase(f.text, []);
    var kopf = T.el("div", { class: "frage-kopf" }, [
      T.el("span", { class: "leise", text: T.fuelle(I.frage, { nr: nr + 1, von: fragen.length }) }),
      T.vorleseKnopf(f.text)
    ]);
    var wahl = T.el("div", { class: "zeichen-wahl" + (f.art === "zeigen" ? " zeigen" : "") });
    if (f.art === "jaNein") {
      wahl.appendChild(T.el("button", { type: "button", class: "knopf zeichen-knopf", onclick: function (e) { antworte(f.ja, e.currentTarget); } }, [T.bild("i-mitmachen"), I.ja]));
      wahl.appendChild(T.el("button", { type: "button", class: "knopf zeichen-knopf", onclick: function (e) { antworte(f.nein, e.currentTarget); } }, [T.bild("i-mitmachen", "runter"), I.nein]));
      wahl.appendChild(T.el("button", { type: "button", class: "knopf zeichen-knopf", onclick: function (e) { antworte(I.weissNichtAntwort, e.currentTarget); } }, [T.bild("i-weissnicht"), I.weissNicht]));
    } else {
      f.optionen.forEach(function (o) {
        wahl.appendChild(T.el("button", { type: "button", class: "knopf zeichen-knopf", onclick: function (e) {
          antworte(T.fuelle(I.gezeigt, { was: o[1] }), e.currentTarget);
        } }, [bildOderFarbe(o[0]), o[1]]));
      });
    }
    spiel.appendChild(kopf);
    spiel.appendChild(wahl);
    wahl.querySelectorAll("button").forEach(function (b, i) { b.style.setProperty("--i", i); });
  }

  function antworte(text, knopf) {
    var spiel = $("zeichen-spiel");
    spiel.querySelectorAll(".zeichen-wahl button").forEach(function (b) { b.disabled = true; });
    if (knopf) knopf.setAttribute("aria-pressed", "true");
    blase(fragen[nr].text, [text, T.zufall(I.verstanden)]);
    T.nicken(szene.sokrates);
    var letzte = nr === fragen.length - 1;
    var weiter = T.el("button", { type: "button", class: "knopf haupt", text: letzte ? I.fertig : I.weiter, onclick: function () {
      nr++;
      if (nr < fragen.length) { zeigeFrage(); var k = $("zeichen-spiel").querySelector(".zeichen-knopf"); if (k) k.focus(); }
      else fertig();
    } });
    spiel.appendChild(T.el("div", { class: "knoepfe" }, [weiter]));
    weiter.focus();
  }

  function fertig() {
    $("zeichen-spiel").textContent = "";
    blase(I.endeTitel, []);
    T.spielEnde($("zeichen-ende"), {
      titel: I.endeTitel,
      text: I.ende.map(function (s) { return T.fuelle(s, { anzahl: fragen.length }); }),
      nochmal: starte
    });
  }

  function starte() {
    $("zeichen-ende").textContent = "";
    var jn = T.mische(I.jaNein).map(function (f) { return { art: "jaNein", text: f[0], ja: f[1], nein: f[2] }; });
    var zg = T.mische(I.zeigen).map(function (f) { return { art: "zeigen", text: f[0], optionen: f[1] }; });
    // Mischung: halb Daumen, halb Zeigen
    var haelfte = Math.ceil(I.proRunde / 2);
    fragen = T.mische(jn.slice(0, haelfte).concat(zg.slice(0, I.proRunde - haelfte)));
    nr = 0;
    zeigeFrage();
    var k = $("zeichen-spiel").querySelector(".zeichen-knopf");
    if (k) k.focus();
  }

  T.ansichten["spiel-zeichen"] = {
    zeige: function () {
      if (!szene) {
        szene = T.szene({ level: 1 });
        $("zeichen-szene").appendChild(szene);
      }
      szene.stelle(1);
      blase(null, I.intro);
      $("zeichen-ende").textContent = "";
      var spiel = $("zeichen-spiel");
      spiel.textContent = "";
      spiel.appendChild(T.el("div", { class: "knoepfe" }, [T.el("button", { type: "button", class: "knopf haupt", text: I.start, onclick: starte })]));
    }
  };
})(window.Teich);
