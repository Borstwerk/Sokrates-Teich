/* Mut-Schatz – jede Form von Mut sammeln (Glas füllt sich) */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.mutSchatz;
  var $ = function (id) { return document.getElementById(id); };
  var SVG = "http://www.w3.org/2000/svg";
  var zeigeAnzahl = 15;

  // Für andere Bereiche (z. B. Mut-Steine)
  var neuesSteinchen = false;
  T.schatzDazu = function (bild, text) {
    neuesSteinchen = true;
    T.speicher.aendere("schatz", function (arr) {
      arr.push({ zeit: Date.now(), bild: bild, text: text });
      return arr;
    });
  };

  function imGlas() {
    var start = Math.min(T.speicher.get("glasStart"), T.speicher.get("schatz").length);
    return T.speicher.get("schatz").length - start;
  }
  function ziel() { return Math.max(5, Math.min(60, Number(T.speicher.get("ziel")) || 20)); }

  function svgEl(tag, attrs) {
    var e = document.createElementNS(SVG, tag);
    Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }

  // Glas mit Steinchen. Innenraum: x 44–176, y 70–262
  function maleGlas(anzahl, max) {
    var svg = svgEl("svg", { viewBox: "0 0 220 290", class: "glas", role: "img", "aria-label": "Glas mit " + anzahl + " von " + max + " Mut-Steinchen" });
    svg.appendChild(svgEl("path", { d: "M58 30 H162 V58 C188 70 196 92 196 116 V250 C196 270 184 280 164 280 H56 C36 280 24 270 24 250 V116 C24 92 32 70 58 58 Z", fill: "rgba(220,239,242,.7)", stroke: "#2E3A2F", "stroke-width": "4", "stroke-linejoin": "round" }));

    // beste Spaltenzahl für runde, große Steinchen
    var breite = 140, hoehe = 196, best = { d: 0, spalten: 4 };
    for (var spalten = 3; spalten <= 10; spalten++) {
      var reihen = Math.ceil(max / spalten);
      var d = Math.min(breite / spalten, hoehe / reihen);
      if (d > best.d) best = { d: d, spalten: spalten };
    }
    var r = best.d / 2 - 2.5;
    var g = svgEl("g", { class: "steinchen" });
    var farben = ["#F2B544", "#F5C76A", "#E9A93A"];
    for (var i = 0; i < max; i++) {
      var reihe = Math.floor(i / best.spalten), spalte = i % best.spalten;
      // kleine, feste Unregelmäßigkeit – sieht natürlicher aus, ohne zu überlappen
      var wackeln = ((i * 37) % 7 - 3) * 0.5;
      var cx = 40 + (breite - best.spalten * best.d) / 2 + best.d / 2 + spalte * best.d + wackeln;
      var cy = 270 - best.d / 2 - reihe * best.d;
      var c = svgEl("circle", {
        cx: cx.toFixed(1), cy: cy.toFixed(1), r: r.toFixed(1),
        fill: i < anzahl ? farben[i % 3] : "none",
        stroke: i < anzahl ? "#2E3A2F" : "rgba(46,58,47,.12)", "stroke-width": i < anzahl ? "2.5" : "1.5",
        "stroke-dasharray": i < anzahl ? "" : "3 3"
      });
      if (neuesSteinchen && i === anzahl - 1) c.setAttribute("class", "faellt");
      g.appendChild(c);
    }
    neuesSteinchen = false;
    if (anzahl >= max) svg.classList.add("voll");
    svg.appendChild(g);
    svg.appendChild(svgEl("rect", { x: "50", y: "14", width: "120", height: "22", rx: "6", fill: "#8C6230", stroke: "#2E3A2F", "stroke-width": "4" }));
    svg.appendChild(svgEl("path", { d: "M33 118 V180", stroke: "#fff", "stroke-width": "6", "stroke-linecap": "round", opacity: ".7" }));
    return svg;
  }

  function datum(zeit) {
    try {
      return new Date(zeit).toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "numeric" });
    } catch (e) { return ""; }
  }

  function male() {
    var anzahl = imGlas(), max = ziel();
    var glas = $("glas");
    glas.textContent = "";
    glas.appendChild(maleGlas(Math.min(anzahl, max), max));

    $("schatz-zaehler").textContent = T.fuelle(I.zaehler, { anzahl: Math.min(anzahl, max), ziel: max });

    var voll = $("schatz-voll");
    voll.textContent = "";
    if (anzahl >= max) {
      var box = T.el("div", { class: "kasten" }, [T.el("p", { class: "lesen", style: "font-weight:700", text: I.voll })]);
      var belohnung = String(T.speicher.get("belohnung") || "").trim();
      if (belohnung) box.appendChild(T.el("p", { class: "lesen", text: T.fuelle(I.belohnung, { belohnung: belohnung }) }));
      box.appendChild(T.el("button", { type: "button", class: "knopf", text: I.neuesGlas, onclick: function () {
        T.speicher.set("glasStart", T.speicher.get("schatz").length);
        T.speicher.set("volleGlaeser", (T.speicher.get("volleGlaeser") || 0) + 1);
        male();
      } }));
      voll.appendChild(box);
    }
    var gefuellt = T.speicher.get("volleGlaeser") || 0;
    if (gefuellt) voll.appendChild(T.el("p", { class: "leise", text: "Volle Gläser bisher: " + gefuellt }));

    var liste = $("schatz-liste");
    liste.textContent = "";
    var eintraege = T.speicher.get("schatz").slice().reverse();
    if (!eintraege.length) liste.appendChild(T.el("li", { text: I.leer }));
    eintraege.slice(0, zeigeAnzahl).forEach(function (e) {
      liste.appendChild(T.el("li", {}, [T.bild(e.bild), T.el("span", { text: e.text }), T.el("span", { class: "datum", text: datum(e.zeit) })]));
    });
    $("schatz-mehr-wrap").hidden = eintraege.length <= zeigeAnzahl;
  }

  function neu() {
    var raster = T.el("ul", { class: "arten" });
    I.arten.forEach(function (a) {
      raster.appendChild(T.el("li", {}, [T.el("button", {
        type: "button", class: "art", onclick: function () {
          T.schatzDazu(a[0], "Ich habe " + a[1] + ".");
          T.schliesseDialog();
          male();
          var lob = $("schatz-lob");
          lob.textContent = I.lob;
          T.pop(lob);
          setTimeout(function () { $("schatz-neu").focus(); }, 30);
        }
      }, [T.bild(a[0]), a[1]])]));
    });
    T.dialog({ titel: I.frage, breit: true, inhalt: [raster], knoepfe: [{ text: "Abbrechen" }] });
  }

  $("schatz-neu").addEventListener("click", neu);
  $("schatz-mehr").addEventListener("click", function () { zeigeAnzahl += 30; male(); });

  T.ansichten["mut-schatz"] = {
    zeige: function () {
      zeigeAnzahl = 15;
      $("schatz-lob").textContent = "";
      T.absaetze($("schatz-intro"), I.intro);
      male();
    }
  };
})(window.Teich);
