/* Meine Stimmen-Karte – eine Sprech-Landkarte: Wo spricht, flüstert, zeigt das Kind, wo ist es noch still?
   Kein Richtig und kein Falsch. Änderungen werden mit Datum gemerkt (für Erwachsene und den Steckbrief). */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.stimmenKarte;
  var $ = function (id) { return document.getElementById(id); };
  var ZONEN = I.zonen.map(function (z) { return z.id; });
  var szene = null, gewaehlt = null;

  function rein(t, n) { return Array.from(String(t || "").replace(/[\u0000-\u001f\u007f]/g, " ")).slice(0, n).join("").trim(); }

  // Gespeicherter Stand (beim ersten Mal mit Vorschlägen im Korb)
  function stand() {
    var s = T.speicher.get("stimmenKarte");
    if (!s || !Array.isArray(s.eintraege)) {
      s = { eintraege: I.vorschlaege.map(function (v, i) { return { id: "v" + i, text: v.text, bild: v.bild, zone: null, eigen: false }; }), verlauf: [] };
    }
    s = JSON.parse(JSON.stringify(s));
    s.eintraege = s.eintraege.filter(function (e) { return e && e.id && e.text; }).map(function (e) {
      return { id: String(e.id), text: rein(e.text, 40), bild: /^i-[a-z]+$/.test(e.bild) ? e.bild : "i-person", zone: ZONEN.indexOf(e.zone) >= 0 ? e.zone : null, eigen: !!e.eigen };
    });
    s.verlauf = Array.isArray(s.verlauf) ? s.verlauf : [];
    return s;
  }
  function speichere(s) { T.speicher.set("stimmenKarte", s); }
  function zone(id) { return I.zonen.find(function (z) { return z.id === id; }); }
  function blase(saetze) { T.absaetze($("sk-blase"), saetze); T.pop($("sk-blase").parentNode); }

  function chip(e, ort) {
    var k = T.el("button", { type: "button", class: "sk-chip" + (e.zone ? " " + e.zone : ""), "aria-pressed": String(gewaehlt === e.id), "data-id": e.id, onclick: function () {
      gewaehlt = gewaehlt === e.id ? null : e.id;
      zeichne();
      if (gewaehlt) blase([T.fuelle(I.gewaehlt, { name: e.text })]);
      var neu = document.querySelector('.sk-chip[data-id="' + e.id + '"]');
      if (neu) neu.focus();
    } }, [T.bild(e.bild), T.el("span", { text: e.text })]);
    return T.el("li", {}, [k]);
  }

  function lege(id, ziel) {
    var s = stand();
    var e = s.eintraege.find(function (x) { return x.id === id; });
    if (!e) return;
    var von = e.zone;
    e.zone = ziel;
    if (von !== ziel) s.verlauf.push({ zeit: Date.now(), id: e.id, text: e.text, von: von, nach: ziel });
    s.verlauf = s.verlauf.slice(-200);
    speichere(s);
    gewaehlt = null;
    // Rückmeldung: näher (kleinere Zonen-Nummer) wird gefeiert, alles andere ruhig angenommen
    if (von && ziel && ZONEN.indexOf(ziel) < ZONEN.indexOf(von)) {
      blase(I.naeher.map(function (t) { return T.fuelle(t, { name: e.text }); }));
      if (szene) T.nicken(szene.sokrates);
    } else if (von && ziel && ZONEN.indexOf(ziel) > ZONEN.indexOf(von)) {
      blase([I.weiter]);
    } else {
      blase([I.gleich]);
    }
    zeichne();
  }

  function zeigeIdee(e) {
    var box = $("sk-idee");
    box.textContent = "";
    if (!e || !e.zone || !I.ideen[e.zone]) return;
    var text = T.fuelle(I.ideen[e.zone], { name: e.text });
    var meldung = T.el("p", { class: "leise", "aria-live": "polite" });
    box.appendChild(T.el("div", { class: "sk-idee" }, [
      T.el("h3", { class: "lesen" }, [T.bild("i-steine"), I.ideeTitel]),
      T.el("p", { class: "lesen", text: text }),
      T.el("p", { class: "leise lesen", text: I.ideeHinweis }),
      T.el("div", { class: "knoepfe" }, [T.el("button", { type: "button", class: "knopf klein", text: I.ideeKnopf, onclick: function (ev) {
        T.speicher.aendere("eigenerWeg", function (weg) {
          weg = weg || [];
          if (!weg.some(function (x) { return x.text === text; })) weg.push({ id: T.neueId(), text: text });
          return weg;
        });
        meldung.textContent = I.ideeGemerkt;
        ev.currentTarget.disabled = true;
      } })]),
      meldung
    ]));
  }

  function zeichne() {
    var s = stand();
    var e = s.eintraege.find(function (x) { return x.id === gewaehlt; });
    // Korb
    var korb = $("sk-korb");
    korb.textContent = "";
    var imKorb = s.eintraege.filter(function (x) { return !x.zone; });
    imKorb.forEach(function (x) { korb.appendChild(chip(x)); });
    $("sk-korb-text").textContent = imKorb.length ? I.korbText : I.korbLeer;
    // Zonen
    var karte = $("sk-karte");
    karte.textContent = "";
    I.zonen.forEach(function (z) {
      var drin = s.eintraege.filter(function (x) { return x.zone === z.id; });
      var liste = T.el("ul", { class: "sk-chips" }, drin.map(function (x) { return chip(x); }));
      var ablegen = e && e.zone !== z.id ? T.el("button", { type: "button", class: "knopf klein haupt sk-ablegen", "aria-label": T.fuelle(I.hierhin, { name: e.text }) + ": " + z.titel, onclick: function () { lege(e.id, z.id); } }, [I.hierhinKurz]) : null;
      karte.appendChild(T.el("section", { class: "sk-zone " + z.id + (e && e.zone !== z.id ? " ziel" : "") }, [
        T.el("div", { class: "sk-zone-kopf" }, [T.bild(z.bild), T.el("div", {}, [T.el("h2", { class: "lesen", text: z.titel }), T.el("p", { class: "leise lesen", text: z.unter })])]),
        liste,
        ablegen
      ]));
    });
    // Aktionen für den gewählten Eintrag
    var aktionen = [];
    if (e && e.zone) aktionen.push(T.el("button", { type: "button", class: "knopf klein", text: I.zurueckInKorb, onclick: function () { lege(e.id, null); } }));
    if (e) aktionen.push(T.el("button", { type: "button", class: "knopf klein gefahr", text: I.entfernen, onclick: function () {
      T.dialog({ titel: T.fuelle(I.entfernenFrage, { name: e.text }), knoepfe: [
        { text: I.entfernen, gefahr: true, aktion: function () { var st = stand(); st.eintraege = st.eintraege.filter(function (x) { return x.id !== e.id; }); speichere(st); gewaehlt = null; zeichne(); } },
        { text: "Behalten", haupt: true }
      ] });
    } }));
    if (aktionen.length) karte.appendChild(T.el("div", { class: "knoepfe sk-aktionen" }, aktionen));
    zeigeIdee(e && e.zone ? e : null);
  }

  function baueEigen() {
    var form = $("sk-eigen");
    form.textContent = "";
    var feld = T.el("input", { type: "text", id: "sk-eigen-text", maxlength: "40", autocomplete: "off", placeholder: I.eigenBeispiel });
    form.appendChild(T.el("p", { class: "werkzeug-titel lesen", text: I.eigenTitel }));
    form.appendChild(T.el("div", { class: "sk-eigen-zeile" }, [
      T.el("label", { for: "sk-eigen-text", class: "nur-vorleser", text: I.eigenFeld }),
      feld,
      T.el("button", { type: "button", class: "knopf klein", text: I.eigenDazu, onclick: function () {
        var text = rein(feld.value, 40);
        if (!text) { feld.focus(); return; }
        var s = stand();
        var neu = { id: T.neueId(), text: text, bild: "i-person", zone: null, eigen: true };
        s.eintraege.push(neu);
        speichere(s);
        feld.value = "";
        gewaehlt = neu.id;
        zeichne();
        blase([T.fuelle(I.gewaehlt, { name: text })]);
      } })
    ]));
  }

  // Für Erwachsene und den Steckbrief: Namen je Zone und der Verlauf
  T.stimmenKarteZonen = function () {
    var s = stand();
    return I.zonen.map(function (z) { return { zone: z, namen: s.eintraege.filter(function (e) { return e.zone === z.id; }).map(function (e) { return e.text; }) }; });
  };
  T.stimmenKarteVerlauf = function () {
    function name(z) { return z ? zone(z).titel : I.korb; }
    return stand().verlauf.slice().reverse().map(function (v) {
      return { zeit: v.zeit, text: T.fuelle(I.verlaufZeile, { name: v.text, von: name(v.von), nach: name(v.nach) }), naeher: !!(v.von && v.nach && ZONEN.indexOf(v.nach) < ZONEN.indexOf(v.von)) };
    });
  };

  function drucke() {
    var datum = new Date().toLocaleDateString("de-DE");
    T.drucke([T.el("div", { class: "sk-blatt" }, [
      T.el("h1", { text: I.druckTitel }),
      T.el("p", { text: T.fuelle(I.druckDatum, { datum: datum }) }),
      T.el("div", { class: "sk-karte" }, T.stimmenKarteZonen().map(function (g) {
        return T.el("section", { class: "sk-zone " + g.zone.id }, [
          T.el("div", { class: "sk-zone-kopf" }, [T.bild(g.zone.bild), T.el("h2", { text: g.zone.titel })]),
          T.el("ul", {}, g.namen.map(function (n) { return T.el("li", { text: n }); }))
        ]);
      }))
    ])], "sk-druck");
  }

  $("sk-drucken").addEventListener("click", drucke);

  T.ansichten["stimmen-karte"] = {
    zeige: function () {
      if (!szene) { szene = T.szene({ level: 1 }); $("sk-szene").appendChild(szene); }
      $("sk-korb-titel").textContent = I.korb;
      $("sk-drucken").textContent = I.drucken;
      $("sk-erw-titel").textContent = I.erwachseneTitel;
      $("sk-erw-text").textContent = I.erwachsene;
      gewaehlt = null;
      blase(I.intro);
      baueEigen();
      zeichne();
    }
  };
})(window.Teich);
