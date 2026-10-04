/* Abenteuer: Alarmzentrale – Situationen verändern, bis Sokrates' Alarmanlage leiser wird */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.zentrale;
  var $ = function (id) { return document.getElementById(id); };
  var szene = null;

  function stand() {
    var s = T.abenteuer("zentrale");
    s.geschafft = s.geschafft || [];
    s.hilfen = s.hilfen || {};
    return s;
  }
  function werkzeug(id) { return I.werkzeuge.find(function (w) { return w.id === id; }); }

  // Rest-Werte je Faktor und Gesamt-Alarm (0–10)
  function berechne(mission, gewaehlt) {
    var rest = {}, gesamt = 0, leiser = 0;
    Object.keys(mission.faktoren).forEach(function (f) { rest[f] = mission.faktoren[f]; });
    gewaehlt.forEach(function (id) {
      var w = werkzeug(id);
      Object.keys(w.wirkt || {}).forEach(function (f) { if (rest[f] !== undefined) rest[f] = Math.max(0, rest[f] - w.wirkt[f]); });
      leiser += w.gesamt || 0;
    });
    Object.keys(rest).forEach(function (f) { gesamt += rest[f]; });
    return { rest: rest, wert: Math.max(0, Math.min(10, gesamt - leiser)) };
  }
  function pose(wert) { return wert <= 2 ? 1 : wert <= 4 ? 2 : wert <= 6 ? 3 : wert <= 8 ? 4 : 5; }

  function meter(wert) {
    var m = T.el("div", { class: "alarm-meter", "aria-hidden": "true" });
    for (var i = 1; i <= 10; i++) {
      m.appendChild(T.el("span", { class: (i <= wert ? "an " : "") + (i <= I.ziel ? "gruen" : i <= 6 ? "gelb" : "rot") }));
    }
    return m;
  }

  function zeigeListe() {
    $("zentrale-mission").hidden = true;
    $("zentrale-mission").textContent = "";
    $("zentrale-start").hidden = false;
    T.absaetze($("zentrale-intro"), I.intro);
    var s = stand();
    $("zentrale-waehle").textContent = s.geschafft.length >= I.missionen.length ? I.alleGeschafft : I.waehle;
    var liste = $("zentrale-liste");
    liste.textContent = "";
    I.missionen.forEach(function (m) {
      var fertig = s.geschafft.indexOf(m.id) >= 0;
      liste.appendChild(T.el("li", {}, [T.el("button", { type: "button", class: "mission-knopf" + (fertig ? " fertig" : ""), onclick: function () { zeigeMission(m); } }, [
        T.bild(m.bild), T.el("span", { text: m.titel }),
        fertig ? T.bild("i-ja", "haken", "geschafft") : T.el("span", { class: "alarm-start", text: berechne(m, []).wert + "/10" })
      ])]));
    });
    T.nacheinander(liste);
  }

  function zeigeMission(m) {
    var gewaehlt = [];
    var box = $("zentrale-mission");
    $("zentrale-start").hidden = true;
    box.hidden = false;
    box.textContent = "";
    szene = T.szene({ level: 1, lampe: 0 });

    var anzeige = T.el("div", { class: "zentrale-anzeige" });
    var wertText = T.el("p", { class: "alarm-wert", "aria-live": "polite" });
    var faktorListe = T.el("ul", { class: "faktoren" });
    var zaehler = T.el("p", { class: "leise hilfen-zaehler" });
    var werkzeuge = T.el("div", { class: "hilfen-gruppen" });
    var meldung = T.el("div", { class: "zentrale-meldung", "aria-live": "polite" });
    var los = T.el("button", { type: "button", class: "knopf haupt", text: I.los, onclick: pruefe });

    function aktualisiere() {
      var b = berechne(m, gewaehlt);
      szene.stelle(pose(b.wert), Math.min(1, b.wert / 10));
      anzeige.textContent = "";
      anzeige.appendChild(meter(b.wert));
      wertText.textContent = T.fuelle(I.alarm, { wert: b.wert });
      faktorListe.textContent = "";
      Object.keys(m.faktoren).forEach(function (f) {
        var info = I.faktoren[f], punkte = T.el("span", { class: "faktor-punkte", "aria-hidden": "true" });
        for (var i = 0; i < m.faktoren[f]; i++) punkte.appendChild(T.el("span", { class: i < b.rest[f] ? "punkt" : "punkt weg" }));
        faktorListe.appendChild(T.el("li", { class: b.rest[f] < m.faktoren[f] ? "leiser" : "" }, [
          T.bild(info[0]), T.el("span", { class: "faktor-name", text: info[1] }), punkte,
          T.el("span", { class: "nur-vorleser", text: ": " + b.rest[f] + " von " + m.faktoren[f] })
        ]));
      });
      zaehler.textContent = T.fuelle(I.hilfen, { anzahl: gewaehlt.length, von: I.maxHilfen });
      werkzeuge.querySelectorAll("button").forEach(function (k) {
        var an = gewaehlt.indexOf(k.dataset.id) >= 0;
        k.setAttribute("aria-pressed", String(an));
        k.disabled = !an && gewaehlt.length >= I.maxHilfen;
      });
    }

    I.werkzeugGruppen.forEach(function (gruppe) {
      var liste = T.el("ul", { class: "werkzeuge" });
      gruppe.hilfen.forEach(function (id) {
        var w = werkzeug(id);
        liste.appendChild(T.el("li", {}, [T.el("button", { type: "button", class: "werkzeug", "data-id": w.id, "aria-pressed": "false",
          onclick: function () {
            var i = gewaehlt.indexOf(w.id);
            if (i >= 0) gewaehlt.splice(i, 1); else if (gewaehlt.length < I.maxHilfen) gewaehlt.push(w.id);
            meldung.textContent = "";
            aktualisiere();
          } }, [T.bild(w.bild), w.name])]));
      });
      werkzeuge.appendChild(T.el("section", { class: "hilfen-gruppe" }, [
        T.el("h4", { class: "lesen", text: gruppe.titel }), liste
      ]));
    });

    function pruefe() {
      var b = berechne(m, gewaehlt);
      meldung.textContent = "";
      if (b.wert > I.ziel) {
        meldung.appendChild(T.el("p", { class: "lesen", text: I.zuLaut }));
        T.pop(meldung);
        return;
      }
      var s = stand();
      var erstesMal = s.geschafft.indexOf(m.id) < 0;
      if (erstesMal) s.geschafft.push(m.id);
      gewaehlt.forEach(function (id) { s.hilfen[id] = (s.hilfen[id] || 0) + 1; });
      var kompass = null;
      if (s.geschafft.length >= I.missionen.length && !s.kompass) { s.kompass = true; kompass = T.findeEtwas("abenteuer", "kompass"); }
      T.abenteuerSpeichern("zentrale", s);

      werkzeuge.querySelectorAll("button").forEach(function (k) { k.disabled = true; });
      los.hidden = true;
      if (!T.wenigBewegung()) { szene.sokrates.classList.add("freut"); setTimeout(function () { szene.sokrates.classList.remove("freut"); }, 950); }
      var naechste = I.missionen.find(function (x) { return stand().geschafft.indexOf(x.id) < 0; }) ||
        I.missionen[(I.missionen.indexOf(m) + 1) % I.missionen.length];
      meldung.appendChild(T.el("div", { class: "spiel-ende" }, [
        T.el("div", { class: "spiel-ende-bild" }, [T.sokratesFigur(1, "lebendig")]),
        T.el("div", {}, [
          T.el("h2", { class: "lesen", tabindex: "-1", text: I.geschafft }),
          T.el("ul", { class: "geholfen" }, gewaehlt.map(function (id) { var w = werkzeug(id); return T.el("li", {}, [T.bild(w.bild), w.name]); })),
          T.el("p", { class: "lesen", text: I.gelernt }),
          erstesMal ? T.fundHinweis(T.findeEtwas("spiel")) : null,
          kompass ? T.fundHinweis(kompass) : null,
          kompass ? T.el("p", { class: "lesen", style: "font-weight:700", text: I.alleGeschafft }) : null,
          T.el("div", { class: "knoepfe" }, [
            T.el("button", { type: "button", class: "knopf haupt", text: I.naechste, onclick: function () { zeigeMission(naechste); } }),
            T.el("button", { type: "button", class: "knopf", text: I.alle, onclick: zeigeListe })
          ])
        ])
      ]));
      var h = meldung.querySelector("h2");
      h.focus({ preventScroll: true });
      meldung.scrollIntoView({ behavior: T.wenigBewegung() ? "auto" : "smooth", block: "center" });
    }

    box.appendChild(T.el("button", { type: "button", class: "knopf klein", text: I.zurueck, onclick: zeigeListe }));
    var titel = T.el("h2", { class: "lesen", tabindex: "-1", text: m.titel });
    box.appendChild(T.el("div", { class: "zentrale-oben" }, [
      T.el("div", {}, [szene, anzeige, wertText]),
      T.el("div", { class: "spiel-karte situation" }, [T.bild(m.bild), titel,
        T.el("details", { class: "abenteuer-details" }, [T.el("summary", { text: I.faktorenTitel }), faktorListe])
      ])
    ]));
    box.appendChild(T.el("h3", { class: "lesen", text: I.hilfenTitel }));
    box.appendChild(zaehler);
    box.appendChild(werkzeuge);
    box.appendChild(meldung);
    box.appendChild(T.el("div", { class: "knoepfe" }, [los]));
    aktualisiere();
    titel.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: "auto", block: "start" });
  }

  T.zentraleBerechne = berechne;   // für Tests

  T.ansichten["spiel-zentrale"] = { zeige: zeigeListe };
})(window.Teich);
