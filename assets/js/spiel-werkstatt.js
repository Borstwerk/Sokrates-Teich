/* Freie Werkstatt: eigene SVG-Werkstücke, lokaler Entwurf und vorhandene Teich-Schatzkiste. */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.werkstatt;
  var SVG = "http://www.w3.org/2000/svg";
  var $ = function (id) { return document.getElementById(id); };
  var entwurf, bearbeiten = null;

  function eintrag(liste, id) {
    return liste.find(function (x) { return x.id === id; }) || liste[0];
  }

  // Auch ältere Sicherungen oder unvollständige Entwürfe lassen sich darstellen.
  function normalisiere(d) {
    d = d && typeof d === "object" ? d : {};
    return {
      form: eintrag(I.formen, d.form).id,
      farbe: eintrag(I.farben, d.farbe).id,
      muster: eintrag(I.muster, d.muster).id,
      symbol: eintrag(I.symbole, d.symbol).id,
      text: Array.from(String(d.text || "").replace(/[\u0000-\u001f\u007f]/g, " ")).slice(0, 24).join("")
    };
  }

  T.werkstattName = function (d) {
    d = normalisiere(d);
    return eintrag(I.formen, d.form).name + (d.form === "schild" && d.text.trim() ? ": „" + d.text.trim() + "“" : "");
  };

  function beschreibung(d) {
    d = normalisiere(d);
    return T.fuelle(I.beschreibung, {
      form: eintrag(I.formen, d.form).name, farbe: eintrag(I.farben, d.farbe).name,
      muster: eintrag(I.muster, d.muster).name, symbol: eintrag(I.symbole, d.symbol).name
    }) + (d.form === "schild" && d.text.trim() ? ". " + T.fuelle(I.beschriftung, { text: d.text.trim() }) : "");
  }

  function svgElement(tag, attrs, text) {
    var e = document.createElementNS(SVG, tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (text !== undefined) e.textContent = text;
    return e;
  }

  // Kein innerHTML: Aufschriften bleiben auch nach Sicherung/Import reiner Text.
  T.werkstattBild = function (daten, beschriftet) {
    var d = normalisiere(daten), farbe = eintrag(I.farben, d.farbe).wert;
    var svg = svgElement("svg", { viewBox: "0 0 180 180", class: "werkstueck", focusable: "false" });
    if (beschriftet) { svg.setAttribute("role", "img"); svg.setAttribute("aria-label", beschreibung(d)); }
    else svg.setAttribute("aria-hidden", "true");

    var umriss, symbolX = 70, symbolY = 54, symbolGroesse = 40;
    if (d.form === "lampion") {
      svg.appendChild(svgElement("path", { d: "M70 28 Q70 4 90 4 Q110 4 110 28 M90 144 V169 M78 162 L90 151 L102 162", fill: "none", stroke: "#2E3A2F", "stroke-width": 4, "stroke-linecap": "round" }));
      umriss = svgElement("path", { d: "M50 29 Q26 78 50 137 Q90 153 130 137 Q154 78 130 29 Q90 16 50 29 Z" });
    } else if (d.form === "boot") {
      svg.appendChild(svgElement("path", { d: "M22 160 Q38 150 54 160 T86 160 T118 160 T150 160", fill: "none", stroke: "#2F6F7E", "stroke-width": 3, "stroke-linecap": "round" }));
      svg.appendChild(svgElement("path", { d: "M80 113 V18 L138 109 Z", fill: "#FFFCF5", stroke: "#2E3A2F", "stroke-width": 4, "stroke-linejoin": "round" }));
      umriss = svgElement("path", { d: "M15 119 H165 L139 148 H42 Z" });
      symbolX = 91; symbolY = 71; symbolGroesse = 26;
    } else {
      svg.appendChild(svgElement("path", { d: "M83 121 H98 V173 H83 Z", fill: "#C7964A", stroke: "#2E3A2F", "stroke-width": 4, "stroke-linejoin": "round" }));
      umriss = svgElement("rect", { x: 10, y: 20, width: 160, height: 110, rx: 16 });
      symbolY = 30;
    }
    umriss.setAttribute("fill", farbe);
    svg.appendChild(umriss);

    var clipId = "werkstueck-" + T.neueId();
    var defs = svgElement("defs"), clip = svgElement("clipPath", { id: clipId });
    clip.appendChild(umriss.cloneNode(true)); defs.appendChild(clip); svg.appendChild(defs);
    var muster = svgElement("g", { "clip-path": "url(#" + clipId + ")", fill: "#FFFCF5", stroke: "#FFFCF5", opacity: "0.55" });
    if (d.muster === "punkte") {
      for (var y = 32; y < 160; y += 24) for (var x = 22; x < 170; x += 24) muster.appendChild(svgElement("circle", { cx: x, cy: y, r: 4, stroke: "none" }));
    } else if (d.muster === "streifen") {
      for (var n = -140; n < 190; n += 24) muster.appendChild(svgElement("path", { d: "M" + n + " 0 l180 180", "stroke-width": 8 }));
    }
    svg.appendChild(muster);
    var rand = umriss.cloneNode(true);
    rand.setAttribute("fill", "none"); rand.setAttribute("stroke", "#2E3A2F"); rand.setAttribute("stroke-width", "4"); rand.setAttribute("stroke-linejoin", "round");
    svg.appendChild(rand);
    if (d.form === "lampion") svg.appendChild(svgElement("path", { d: "M50 29 Q90 40 130 29 M50 137 Q90 126 130 137", fill: "none", stroke: "#2E3A2F", "stroke-width": 4 }));

    var symbol = eintrag(I.symbole, d.symbol);
    if (symbol.bild) {
      var zeichen = svgElement("svg", { x: symbolX, y: symbolY, width: symbolGroesse, height: symbolGroesse, viewBox: "0 0 48 48" });
      zeichen.appendChild(svgElement("use", { href: "#" + symbol.bild })); svg.appendChild(zeichen);
    }
    if (d.form === "schild" && d.text.trim()) {
      var zeichenfolge = Array.from(d.text.trim());
      [zeichenfolge.slice(0, 12).join(""), zeichenfolge.slice(12).join("")].forEach(function (zeile, i) {
        if (!zeile) return;
        var wort = svgElement("text", { x: 90, y: 91 + i * 20, "text-anchor": "middle", fill: "#2E3A2F", "font-family": "Andika, sans-serif", "font-size": 15, "font-weight": 700 }, zeile);
        // Auch eine lange Reihe breiter Buchstaben bleibt innerhalb des Schilds.
        if (Array.from(zeile).length > 10) { wort.setAttribute("textLength", 140); wort.setAttribute("lengthAdjust", "spacingAndGlyphs"); }
        svg.appendChild(wort);
      });
    }
    return svg;
  };

  function werkstuecke() {
    return (T.speicher.get("funde") || []).filter(function (f) { return f.art === "werkstatt"; });
  }

  function merkeEntwurf() {
    T.abenteuerSpeichern("werkstatt", { entwurf: normalisiere(entwurf), bearbeiten: bearbeiten });
  }

  // Ein Teich-Werkstück öffnen, ohne seine Position oder ID zu verändern.
  T.werkstattBearbeite = function (id) {
    var f = werkstuecke().find(function (x) { return x.id === id; });
    if (!f) return;
    entwurf = normalisiere(f.gestaltung); bearbeiten = f.id; merkeEntwurf();
  };

  function maleEntwurf() {
    $("wk-vorschau").textContent = "";
    $("wk-vorschau").appendChild(T.werkstattBild(entwurf, true));
    $("wk-beschreibung").textContent = beschreibung(entwurf);
    $("wk-formular").querySelectorAll("button[data-feld]").forEach(function (k) {
      k.setAttribute("aria-pressed", String(entwurf[k.dataset.feld] === k.dataset.wert));
    });
    $("wk-text-feld").hidden = entwurf.form !== "schild";
    $("wk-text").value = entwurf.text;
    $("wk-ablegen").textContent = bearbeiten ? I.aendern : I.ablegen;
  }

  function maleSammlung() {
    var liste = $("wk-sammlung"); liste.textContent = "";
    var alle = werkstuecke();
    if (!alle.length) liste.appendChild(T.el("li", { class: "leer lesen", text: I.leer }));
    alle.forEach(function (f) {
      var name = T.werkstattName(f.gestaltung);
      liste.appendChild(T.el("li", {}, [T.el("button", {
        type: "button", class: "art", "data-werkstueck": f.id,
        "aria-label": T.fuelle(I.bearbeiten, { name: name }), onclick: function () {
          T.werkstattBearbeite(f.id); maleEntwurf(); $("wk-meldung").textContent = "";
          $("wk-formular").querySelector("button").focus();
          $("wk-platz").scrollIntoView({ behavior: T.wenigBewegung() ? "auto" : "smooth", block: "start" });
        }
      }, [T.werkstattBild(f.gestaltung), name])]));
    });
  }

  function auswahl(feld, titel, liste) {
    var gruppe = T.el("fieldset", { class: "wk-gruppe" }, [T.el("legend", { class: "lesen", text: titel })]);
    var knoepfe = T.el("div", { class: "wk-wahl" });
    liste.forEach(function (a) {
      var bild = a.bild ? T.bild(a.bild) : null;
      if (feld === "form") bild = T.werkstattBild({ form: a.id });
      if (feld === "farbe") bild = T.el("span", { class: "wk-farbe", style: "background:" + a.wert, "aria-hidden": "true" });
      knoepfe.appendChild(T.el("button", {
        type: "button", class: "knopf" + (feld === "form" ? " wk-form-knopf" : ""), "data-feld": feld, "data-wert": a.id, "aria-pressed": "false",
        onclick: function () {
          entwurf[feld] = a.id; merkeEntwurf(); maleEntwurf(); $("wk-meldung").textContent = "";
        }
      }, [bild, a.name]));
    });
    gruppe.appendChild(knoepfe); return gruppe;
  }

  function baueFormular() {
    var form = $("wk-formular"); form.textContent = "";
    form.appendChild(auswahl("form", I.formTitel, I.formen));
    form.appendChild(auswahl("farbe", I.farbeTitel, I.farben));
    form.appendChild(auswahl("muster", I.musterTitel, I.muster));
    form.appendChild(auswahl("symbol", I.symbolTitel, I.symbole));
    var text = T.el("input", { id: "wk-text", type: "text", maxlength: 24, "aria-describedby": "wk-text-tipp", autocomplete: "off", oninput: function (e) {
      entwurf.text = normalisiere({ text: e.target.value }).text; merkeEntwurf(); maleEntwurf(); $("wk-meldung").textContent = "";
    } });
    form.appendChild(T.el("div", { id: "wk-text-feld" }, [
      T.el("label", { for: "wk-text", text: I.textTitel }), text,
      T.el("p", { id: "wk-text-tipp", class: "leise lesen", text: I.textTipp })
    ]));
  }

  T.ansichten["spiel-werkstatt"] = {
    zeige: function () {
      var stand = T.abenteuer("werkstatt");
      entwurf = normalisiere(stand.entwurf);
      bearbeiten = werkstuecke().some(function (f) { return f.id === stand.bearbeiten; }) ? stand.bearbeiten : null;
      T.absaetze($("wk-blase"), I.intro);
      $("wk-vorschau-titel").textContent = I.vorschau;
      $("wk-eigene-titel").textContent = I.eigene;
      $("wk-neu").textContent = I.neu; $("wk-zum-teich").textContent = I.zumTeich;
      $("wk-meldung").textContent = "";
      baueFormular(); maleEntwurf(); maleSammlung();
      $("wk-neu").onclick = function () {
        entwurf = normalisiere(); bearbeiten = null; merkeEntwurf(); maleEntwurf(); $("wk-meldung").textContent = "";
        $("wk-formular").querySelector("button").focus();
      };
      $("wk-ablegen").onclick = function () {
        var bestand = werkstuecke().find(function (f) { return f.id === bearbeiten; });
        var id = bestand ? bestand.id : T.neueId();
        T.speicher.aendere("funde", function (alle) {
          alle = alle || [];
          if (bestand) return alle.map(function (f) { return f.id === id ? Object.assign({}, f, { gestaltung: normalisiere(entwurf) }) : f; });
          return alle.concat([{ id: id, art: "werkstatt", gestaltung: normalisiere(entwurf), x: null, y: null, zeit: Date.now() }]);
        });
        bearbeiten = id; merkeEntwurf(); maleEntwurf(); maleSammlung();
        $("wk-meldung").textContent = T.speicher.funktioniert() ? (bestand ? I.geaendert : I.abgelegt) : I.nurHier;
      };
    }
  };
})(window.Teich);
