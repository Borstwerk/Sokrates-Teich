/* Zu zweit: Funkelpost – zwei geheime Briefhälften, nur zusammen lösbar. Ein Gerät wird weitergegeben. */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.funkelpost;
  var $ = function (id) { return document.getElementById(id); };
  var FARBEN = ["blau", "gelb"];

  function stand() { var s = T.abenteuer("funkelpost"); s.geloest = s.geloest || []; return s; }
  function ort(brief, id) { var o = brief.orte.find(function (x) { return x[0] === id; }); return { id: o[0], name: o[1], bild: o[2] }; }
  function blase(saetze) { T.absaetze($("fp-blase"), saetze); T.pop($("fp-blase").parentNode); }

  // Eine Briefhälfte, offen (mit Hinweisen) oder verdeckt
  function karte(brief, farbe, offen) {
    var sp = I.spieler[farbe];
    var k = T.el("div", { class: "fp-karte " + farbe + (offen ? " offen" : " zu") }, [
      T.el("p", { class: "fp-kopf" }, [T.bild(sp.bild), T.fuelle(I.karteVon, { name: sp.name })])
    ]);
    if (offen) k.appendChild(T.el("ul", { class: "fp-hinweise" }, brief[farbe].map(function (h) { return T.el("li", { class: "lesen", text: h.text }); })));
    else k.appendChild(T.el("p", { class: "fp-geheim" }, [T.bild("i-gluehwurm"), I.geheim]));
    return k;
  }

  function zeigeListe() {
    $("fp-ende").textContent = "";
    blase(I.intro);
    var box = $("fp-spiel");
    box.textContent = "";
    var s = stand();
    box.appendChild(T.el("h2", { class: "lesen", text: s.geloest.length >= I.briefe.length ? I.alleGeloest : I.waehle }));
    var liste = T.el("ul", { class: "zentrale-liste" });
    I.briefe.forEach(function (b) {
      var fertig = s.geloest.indexOf(b.id) >= 0;
      liste.appendChild(T.el("li", {}, [T.el("button", { type: "button", class: "mission-knopf" + (fertig ? " fertig" : ""), onclick: function () { aufdecken(b, 0); } }, [
        T.bild("i-karte"), T.el("span", { text: b.titel }),
        fertig ? T.bild("i-ja", "haken", "gelöst") : T.el("span", { class: "alarm-start", text: b.orte.length + " Möglichkeiten" })
      ])]));
    });
    box.appendChild(liste);
    T.nacheinander(liste);
  }

  // Schritt 1 und 2: jede Person schaut allein auf ihre Hälfte
  function aufdecken(brief, nr) {
    var farbe = FARBEN[nr], andere = FARBEN[1 - nr];
    var box = $("fp-spiel");
    box.textContent = "";
    $("fp-ende").textContent = "";
    blase([brief.frage]);
    var platz = T.el("div", { class: "fp-platz" }, [karte(brief, farbe, false)]);
    var titel = T.el("h2", { class: "lesen", tabindex: "-1", text: T.fuelle(I.schautAllein, { name: I.spieler[farbe].name }) });
    var knopf = T.el("button", { type: "button", class: "knopf haupt", text: T.fuelle(I.aufdecken, { name: I.spieler[farbe].name }) });
    var offen = false;
    knopf.addEventListener("click", function () {
      if (!offen) {
        offen = true;
        platz.textContent = "";
        var k = karte(brief, farbe, true);
        platz.appendChild(k);
        T.pop(k);
        knopf.textContent = I.verdecken;
        return;
      }
      if (nr === 0) aufdecken(brief, 1); else brett(brief);
    });
    box.appendChild(titel);
    box.appendChild(T.el("p", { class: "lesen fp-weg", text: T.fuelle(I.wegschauen, { andere: I.spieler[andere].name }) }));
    box.appendChild(platz);
    box.appendChild(T.el("div", { class: "knoepfe" }, [knopf]));
    box.appendChild(T.el("p", { class: "leise", text: I.spaeter }));
    titel.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: "auto", block: "start" });
  }

  // Welche Hälfte schließt diesen Ort schon allein aus?
  function werWeiss(brief, id) {
    for (var i = 0; i < FARBEN.length; i++) {
      if (brief[FARBEN[i]].some(function (h) { return h.nicht.indexOf(id) >= 0; })) return FARBEN[i];
    }
    return null;
  }

  // Schritt 3: gemeinsames Brett
  function brett(brief) {
    var box = $("fp-spiel");
    box.textContent = "";
    blase([I.brettTipp]);
    var meldung = T.el("p", { class: "raetsel-meldung", "aria-live": "polite" });
    var titel = T.el("h2", { class: "lesen", tabindex: "-1", text: brief.frage });
    var liste = T.el("ul", { class: "fp-orte" });
    brief.orte.forEach(function (o) {
      o = ort(brief, o[0]);
      var li = T.el("li", { class: "fp-ort" });
      var streichen = T.el("button", { type: "button", class: "knopf klein fp-streichen", "aria-pressed": "false", "aria-label": T.fuelle(I.durchstreichen, { name: o.name }) }, [T.bild("i-nein")]);
      var hier = T.el("button", { type: "button", class: "knopf klein haupt fp-hier", "aria-label": T.fuelle(I.hierLabel, { name: o.name }), text: I.hier });
      streichen.addEventListener("click", function () {
        var an = streichen.getAttribute("aria-pressed") !== "true";
        streichen.setAttribute("aria-pressed", String(an));
        li.classList.toggle("gestrichen", an);
      });
      hier.addEventListener("click", function () {
        if (o.id === brief.loesung) { geloest(brief); return; }
        var wer = werWeiss(brief, o.id);
        meldung.textContent = wer ? T.fuelle(I.falschEine, { name: o.name, adj: I.spieler[wer].adj }) : T.fuelle(I.falschBeide, { name: o.name });
        streichen.setAttribute("aria-pressed", "true");
        li.classList.add("gestrichen");
        T.pop(li, "wackeln");
      });
      li.appendChild(T.el("span", { class: "fp-ort-bild" }, [T.bild(o.bild)]));
      li.appendChild(T.el("b", { class: "lesen", text: o.name }));
      li.appendChild(T.el("span", { class: "fp-ort-knoepfe" }, [streichen, hier]));
      liste.appendChild(li);
    });
    box.appendChild(titel);
    box.appendChild(liste);
    box.appendChild(meldung);
    box.appendChild(T.el("div", { class: "knoepfe fp-nochmal" }, FARBEN.map(function (farbe) {
      return T.el("button", { type: "button", class: "knopf " + farbe, onclick: function () {
        T.dialog({ titel: T.fuelle(I.nurFuer, { name: I.spieler[farbe].name }), inhalt: [karte(brief, farbe, true)], knoepfe: [{ text: I.verdecken, haupt: true }] });
      } }, [T.bild(I.spieler[farbe].bild), T.fuelle(I.nochmalAnsehen, { name: I.spieler[farbe].name })]);
    })));
    box.appendChild(T.el("div", { class: "knoepfe" }, [
      T.el("button", { type: "button", class: "knopf klein", text: I.drucken, onclick: function () { drucke(brief); } }),
      T.el("button", { type: "button", class: "knopf klein", text: I.andere, onclick: zeigeListe })
    ]));
    titel.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: "auto", block: "start" });
  }

  function geloest(brief) {
    var s = stand();
    var erstesMal = s.geloest.indexOf(brief.id) < 0;
    if (erstesMal) { s.geloest.push(brief.id); T.abenteuerSpeichern("funkelpost", s); }
    $("fp-spiel").querySelectorAll("button").forEach(function (k) { k.disabled = true; });
    var o = ort(brief, brief.loesung);
    T.spielEnde($("fp-ende"), {
      titel: I.geschafft,
      text: [brief.ende, I.zusammen],
      extra: T.el("div", { class: "fp-beide" }, [T.el("span", { class: "fp-loesung" }, [T.bild(o.bild), o.name]), karte(brief, "blau", true), karte(brief, "gelb", true)]),
      fund: erstesMal ? undefined : null,
      nochmal: zeigeListe, nochmalText: I.andere
    });
  }

  function drucke(brief) {
    var orte = T.el("ul", { class: "fp-orte druck" }, brief.orte.map(function (x) {
      var o = ort(brief, x[0]);
      return T.el("li", { class: "fp-ort" }, [T.el("span", { class: "fp-ort-bild" }, [T.bild(o.bild)]), T.el("b", { text: o.name })]);
    }));
    T.drucke([T.el("div", { class: "fp-blatt" }, [
      T.el("h1", { text: T.fuelle(I.druckTitel, { titel: brief.titel }) }),
      T.el("p", { text: I.druckHinweis }),
      karte(brief, "blau", true),
      T.el("p", { class: "fp-schnitt", text: I.schnitt }),
      T.el("h2", { text: brief.frage }),
      orte,
      T.el("p", { class: "fp-schnitt", text: I.schnitt }),
      karte(brief, "gelb", true)
    ])], "fp-druck");
  }

  T.funkelpostWerWeiss = werWeiss;   // für Tests

  T.ansichten["spiel-funkelpost"] = { zeige: zeigeListe };
})(window.Teich);
