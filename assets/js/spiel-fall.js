/* Abenteuer: Detektiv Sokrates – Das verschwundene Glühwürmchen.
 * Orte untersuchen, Leute fragen (sechs Wege, alle funktionieren gleich gut), Hinweise sammeln, Fall lösen. */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.fall;
  var $ = function (id) { return document.getElementById(id); };
  var TINTE = "#2E3A2F";
  var HINWEISE_NOETIG = 6;

  function stand() {
    var s = T.abenteuer("fall");
    s.hinweise = s.hinweise || [];
    s.gefragt = s.gefragt || {};
    return s;
  }
  function speichere(s) { T.abenteuerSpeichern("fall", s); }
  function ort(id) { return I.orte.find(function (o) { return o.id === id; }); }

  function blase(saetze) {
    T.absaetze($("fall-blase"), saetze);
    T.pop($("fall-blase").parentNode);
  }

  // Alle Hinweise: [{ id, bild, text }]
  function alleHinweise() {
    var liste = [];
    I.orte.forEach(function (o) {
      liste.push({ id: o.id + "-frage", bild: o.person.bild, text: o.person.name + ": " + o.antwort });
      liste.push({ id: o.id + "-suche", bild: o.suche.bild, text: o.suche.text });
    });
    return liste;
  }

  function personBild(bild) {
    var m = /^person:(\d+)$/.exec(bild);
    if (!m) return T.bild(bild);
    var box = T.el("span", { class: "person-bild", "aria-hidden": "true" });
    box.innerHTML = '<svg viewBox="-40 -122 80 126">' + T.wimmel.person(0, 0, 1, Number(m[1])) + "</svg>";
    return box;
  }

  // ---------- Karte und Akte ----------
  function maleKarte() {
    var s = stand();
    var nav = $("fall-karte");
    nav.textContent = "";
    nav.appendChild(T.el("h2", { class: "lesen", text: I.karte }));
    var liste = T.el("ul");
    I.orte.forEach(function (o) {
      var anzahl = [o.id + "-frage", o.id + "-suche"].filter(function (h) { return s.hinweise.indexOf(h) >= 0; }).length;
      liste.appendChild(T.el("li", {}, [T.el("button", { type: "button", class: "knopf ort-knopf", "aria-pressed": String(s.ort === o.id),
        onclick: function () { geheZu(o.id); } }, [T.bild(o.bild), T.el("span", {}, [o.name, T.el("small", { text: anzahl + " von 2 Hinweisen" })])])]));
    });
    liste.appendChild(T.el("li", {}, [s.deduziert
      ? T.el("button", { type: "button", class: "knopf ort-knopf huette", "aria-pressed": String(s.ort === "huette"), onclick: function () { geheZu("huette"); } },
        [T.bild(I.huette.bild), T.el("span", {}, [I.huette.name, T.el("small", { text: s.geloest ? "Fall gelöst" : "Hier ist Funkel!" })])])
      : T.el("button", { type: "button", class: "knopf haupt ort-knopf", onclick: ueberlegen }, [T.bild("i-lupe"), I.ueberlegen])]));
    nav.appendChild(liste);
  }

  function maleAkte(neuId) {
    var s = stand();
    var akte = $("fall-akte");
    // Summary behalten: Öffnungszustand und Tastaturfokus bleiben bei neuen Hinweisen erhalten.
    if (!akte.querySelector("summary")) {
      akte.appendChild(T.el("summary", {}, [T.bild("i-buch"), T.el("span", { class: "akte-titel", "aria-live": "polite" })]));
      akte.appendChild(T.el("ul"));
    }
    akte.querySelector(".akte-titel").textContent = I.akte + " (" + s.hinweise.length + "/" + alleHinweise().length + ")";
    var liste = akte.querySelector("ul");
    liste.textContent = "";
    alleHinweise().forEach(function (h) {
      if (s.hinweise.indexOf(h.id) < 0) return;
      var li = T.el("li", { class: h.id === neuId ? "neu" : "" }, [personBild(h.bild), T.el("span", { text: h.text })]);
      liste.appendChild(li);
    });
    if (!liste.children.length) liste.appendChild(T.el("li", { class: "leer", text: I.akteLeer }));
  }

  function hinweisDazu(id) {
    var s = stand();
    if (s.hinweise.indexOf(id) < 0) s.hinweise.push(id);
    speichere(s);
    maleAkte(id);
    maleKarte();
  }

  // ---------- Szenen ----------
  function teichBild() {
    var h = '<rect width="800" height="500" fill="#DCEFF2"/>' + T.wimmel.icon("i-sonne", 720, 110, 80) + T.wimmel.icon("i-wolke", 160, 90, 90) +
      '<path d="M0 170 Q200 150 400 170 T800 165 V500 H0 Z" fill="#A9D3DC" stroke="' + TINTE + '" stroke-width="3"/>' +
      '<path d="M0 420 Q120 400 240 430 L240 500 H0 Z" fill="#EBD9B4" stroke="' + TINTE + '" stroke-width="3"/>' +
      '<g stroke="' + TINTE + '" stroke-width="3"><rect x="-4" y="300" width="300" height="26" fill="#C9944A"/><path d="M60 300 V326 M120 300 V326 M180 300 V326 M240 300 V326" stroke-width="2"/>' +
      '<rect x="40" y="326" width="12" height="90" fill="#8C6230"/><rect x="250" y="326" width="12" height="90" fill="#8C6230"/></g>' +
      T.wimmel.icon("i-seerose", 520, 360, 70) + T.wimmel.icon("i-seerose", 600, 316, 64) + T.wimmel.icon("i-seerose", 690, 430, 72) + T.wimmel.icon("i-seerose", 430, 470, 60) +
      T.wimmel.icon("i-ente", 380, 270, 90) + T.wimmel.icon("i-schilf", 770, 300, 80) + T.wimmel.icon("i-schilf", 30, 430, 70) +
      '<g class="sokrates lvl-1"><use href="#sokrates" x="60" y="232" width="150" height="93"/></g>';
    return h;
  }
  function huettenBild(offen) {
    return '<rect width="800" height="500" fill="#DCEFF2"/>' + T.wimmel.icon("i-wolke", 140, 90, 90) +
      '<path d="M0 260 Q200 240 400 262 T800 255 V500 H0 Z" fill="#A9D3DC" stroke="' + TINTE + '" stroke-width="3"/>' +
      '<g stroke="' + TINTE + '" stroke-width="3" stroke-linejoin="round"><rect x="-4" y="372" width="520" height="24" fill="#C9944A"/>' +
      '<rect x="60" y="396" width="12" height="90" fill="#8C6230"/><rect x="300" y="396" width="12" height="90" fill="#8C6230"/>' +
      '<path d="M460 170 L600 90 L740 170 Z" fill="#B5523A"/><rect x="480" y="168" width="240" height="210" fill="#C9944A"/>' +
      '<path d="M480 200 H720 M480 240 H720 M480 280 H720 M480 320 H720 M480 360 H720" stroke="#8C6230" stroke-width="2"/>' +
      '<rect x="640" y="200" width="54" height="46" fill="#DCEFF2"/>' +
      (offen
        ? '<rect x="540" y="250" width="70" height="128" fill="#3B2F22"/><circle cx="575" cy="320" r="46" fill="#F2B544" opacity=".45" stroke="none"/>'
        : '<rect x="540" y="250" width="70" height="128" fill="#8C6230"/><circle cx="596" cy="318" r="4" fill="#F2B544"/>' +
          '<g transform="translate(575 300)"><path d="M-8 0 V-9 A8 8 0 0 1 8 -9 V0" fill="none" stroke-width="4"/><rect x="-12" y="-1" width="24" height="20" rx="3" fill="#F2B544"/></g>') +
      "</g>" +
      (offen ? T.wimmel.icon("i-gluehwurm", 575, 330, 56) + T.wimmel.icon("i-schnecke", 556, 376, 30) + T.wimmel.icon("i-schnecke", 596, 376, 22) : "") +
      '<g class="sokrates lvl-1"><use href="#sokrates" x="300" y="282" width="150" height="93"/></g>';
  }

  // ---------- Ein Ort ----------
  function geheZu(id) {
    var s = stand();
    s.ort = id;
    speichere(s);
    maleKarte();
    if (id === "huette") return zeigeHuette();
    var o = ort(id);
    var box = $("fall-ort");
    box.textContent = "";
    var titel = T.el("h2", { class: "lesen", tabindex: "-1", text: o.name });
    box.appendChild(titel);

    // Bild mit verstecktem Hinweis
    var gefunden = s.hinweise.indexOf(o.id + "-suche") >= 0;
    var bild = T.el("div", { class: "fall-bild" });
    var hinten = o.id === "teich" ? teichBild() : T.wimmel.hintergrund(o.id);
    bild.innerHTML = '<svg viewBox="0 0 800 500" class="wimmel" role="img" aria-label="' + o.name + '">' + hinten +
      '<g class="ziel' + (gefunden ? " gefunden" : "") + '" transform="translate(' + o.suche.x + " " + o.suche.y + ')">' +
      T.wimmel.icon(o.suche.bild, 0, 0, 34) + '<circle class="treffer" cx="0" cy="-17" r="34" fill="transparent"/>' +
      '<circle class="markierung" cx="0" cy="-17" r="34" fill="none" stroke="#F2B544" stroke-width="6"/></g></svg>';
    var g = bild.querySelector(".ziel");
    function finde() {
      if (stand().hinweise.indexOf(o.id + "-suche") >= 0) return;
      g.classList.remove("tipp");
      g.classList.add("gefunden");
      g.removeAttribute("tabindex");
      tippKnopf.hidden = true;
      blase([I.gefunden, o.suche.text]);
      hinweisDazu(o.id + "-suche");
      pruefeGenug();
    }
    g.addEventListener("click", finde);
    g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); finde(); } });
    var tippKnopf = T.el("button", { type: "button", class: "knopf klein", text: I.tipp, onclick: function () {
      if (!g.classList.contains("tipp")) {
        g.classList.add("tipp");
        g.setAttribute("tabindex", "0");
        g.setAttribute("role", "button");
        g.setAttribute("aria-label", "Hinweis");
        tippKnopf.textContent = T.inhalt.suchen.tippDa;
      } else finde();
    } });
    tippKnopf.hidden = gefunden;

    // Person fragen
    var person = T.el("div", { class: "spiel-karte person" }, [personBild(o.person.bild), T.el("h3", { text: o.person.name })]);
    var antwortBox = T.el("div", { "aria-live": "polite" });
    function zeigeAntwort(wegId) {
      var weg = I.wege.find(function (w) { return w.id === wegId; });
      antwortBox.textContent = "";
      antwortBox.appendChild(T.el("p", { class: "weg-info" }, [T.bild(weg.bild), T.el("span", { class: "lesen", text: T.fuelle(weg.vorher, { Person: o.person.name }) })]));
      antwortBox.appendChild(T.el("p", { class: "antwort lesen", text: o.antwort }));
    }
    if (s.gefragt[o.id]) {
      zeigeAntwort(s.gefragt[o.id]);
    } else {
      var wege = T.el("div", { class: "wege" });
      I.wege.forEach(function (w) {
        wege.appendChild(T.el("button", { type: "button", class: "knopf weg", onclick: function () {
          var st = stand();
          st.gefragt[o.id] = w.id;
          speichere(st);
          wege.remove();
          frageText.remove();
          zeigeAntwort(w.id);
          blase([I.gefunden, o.antwort]);
          hinweisDazu(o.id + "-frage");
          pruefeGenug();
        } }, [T.bild(w.bild), w.name]));
      });
      var frageText = T.el("div", {}, [T.el("p", { class: "lesen", style: "font-weight:700;margin:0", text: I.fragen }), T.el("p", { class: "leise lesen", text: I.fragenText })]);
      person.appendChild(frageText);
      person.appendChild(wege);
    }
    person.appendChild(antwortBox);

    box.appendChild(T.el("div", { class: "fall-szene" }, [
      T.el("div", {}, [bild, T.el("p", { class: "leise lesen", text: I.untersuchen }), T.el("div", { class: "knoepfe" }, [tippKnopf])]),
      person
    ]));
    titel.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: T.wenigBewegung() ? "auto" : "smooth", block: "start" });
  }

  function pruefeGenug() {
    var s = stand();
    if (!s.deduziert && s.hinweise.length >= HINWEISE_NOETIG && !s.genugGesagt) {
      s.genugGesagt = true;
      speichere(s);
      $("fall-blase").appendChild(T.el("p", { class: "lesen", style: "font-weight:700", text: "Ich glaube, wir wissen jetzt genug. Tipp auf „" + I.ueberlegen + "“." }));
    }
  }

  // ---------- Überlegen: Wo ist Funkel? ----------
  function ueberlegen() {
    var s = stand();
    var box = $("fall-ort");
    box.textContent = "";
    if (s.hinweise.length < HINWEISE_NOETIG) { blase([I.mehrHinweise]); return; }
    var titel = T.el("h2", { class: "lesen", tabindex: "-1", text: I.frageWo });
    var meldung = T.el("p", { class: "raetsel-meldung", "aria-live": "polite" });
    var wahl = T.el("div", { class: "fall-wahl" });
    I.optionen.forEach(function (op) {
      wahl.appendChild(T.el("button", { type: "button", class: "knopf", onclick: function () {
        if (op[0] !== "huette") { meldung.textContent = I.nichtDa; T.pop(meldung); return; }
        var st = stand();
        st.deduziert = true;
        speichere(st);
        blase([I.richtig]);
        geheZu("huette");
      } }, [op[1]]));
    });
    box.appendChild(titel);
    box.appendChild(wahl);
    box.appendChild(meldung);
    titel.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: T.wenigBewegung() ? "auto" : "smooth", block: "start" });
  }

  // ---------- Die alte Bootshütte ----------
  function zeigeHuette() {
    var s = stand();
    var box = $("fall-ort");
    box.textContent = "";
    var titel = T.el("h2", { class: "lesen", tabindex: "-1", text: I.huette.name });
    var bild = T.el("div", { class: "fall-bild" });
    function male(offen) { bild.innerHTML = '<svg viewBox="0 0 800 500" class="wimmel huette-bild" role="img" aria-label="' + I.huette.name + '">' + huettenBild(offen) + "</svg>"; }
    male(!!s.geloest);
    box.appendChild(titel);
    box.appendChild(bild);
    var unten = T.el("div", { class: "knoepfe" });
    box.appendChild(unten);
    var schluessel = !!T.abenteuer("truhe").schluessel;
    if (s.geloest) {
      unten.appendChild(T.el("button", { type: "button", class: "knopf haupt", text: I.nochmal, onclick: neu }));
    } else if (!schluessel) {
      blase([I.zu]);
      unten.appendChild(T.el("a", { class: "knopf haupt", href: "#spiel-truhe" }, [T.bild("i-truhe"), I.zurTruhe]));
    } else {
      blase([I.richtig]);
      unten.appendChild(T.el("button", { type: "button", class: "knopf haupt", onclick: function () {
        male(true);
        unten.textContent = "";
        var st = stand();
        var fund = null;
        if (!st.belohnt) { fund = T.findeEtwas("abenteuer", "laterne"); st.belohnt = true; }
        st.geloest = true;
        speichere(st);
        maleKarte();
        blase([I.endeTitel]);
        T.spielEnde($("fall-ende"), { titel: I.endeTitel, text: I.ende, fund: fund, nochmal: neu, nochmalText: I.nochmal });
      } }, [T.bild("i-schluessel"), I.aufschliessen]));
    }
    titel.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: T.wenigBewegung() ? "auto" : "smooth", block: "start" });
  }

  function neu() {
    var alt = stand();
    speichere({ belohnt: alt.belohnt });
    $("fall-ende").textContent = "";
    start();
  }

  function start() {
    var s = stand();
    $("fall-ende").textContent = "";
    $("fall-ort").textContent = "";
    maleKarte();
    maleAkte();
    if (s.geloest) { blase([I.endeTitel, I.ende[2]]); geheZu("huette"); return; }
    blase(s.hinweise.length ? [I.karte] : I.intro);
    if (s.ort) geheZu(s.ort);
  }

  T.ansichten["spiel-fall"] = { zeige: start };
})(window.Teich);
