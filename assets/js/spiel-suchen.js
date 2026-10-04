/* Spiel: Wo ist Sokrates? – ruhige Suchbilder (Spielplatz, Schulhof, Markt) ohne Zeitdruck */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.suchen;
  var $ = function (id) { return document.getElementById(id); };
  var TINTE = "#2E3A2F";
  var HAUT = ["#F3D9B5", "#E8C39E", "#C99A6E", "#8D5B3B", "#F6E0C8"];
  var HAAR = ["#4A3426", "#2E3A2F", "#C9944A", "#8C6230", "#E2C07A", "#B5523A"];
  var KLEID = ["#5FA8C7", "#E46F4F", "#8CC063", "#F2B544", "#A98BC9", "#2F6F7E", "#F4B6C2", "#D9A65C"];
  var HOSE = ["#2F6F7E", "#55624F", "#3B4A6B", "#8C6230"];
  var gebaut = false, szeneId = "spielplatz", ziele = [], status;

  // ---------- Zeichen-Bausteine (SVG als Text) ----------
  function r(liste, i) { return liste[i % liste.length]; }

  function person(x, y, s, i, opts) {
    opts = opts || {};
    var haut = r(HAUT, i * 3 + 1), haar = r(HAAR, i * 5 + 2), kleid = r(KLEID, i * 7), hose = r(HOSE, i);
    var g = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">';
    g += '<rect x="-11" y="-38" width="9" height="38" rx="4" fill="' + hose + '" stroke="' + TINTE + '" stroke-width="2.5"/>';
    g += '<rect x="2" y="-38" width="9" height="38" rx="4" fill="' + hose + '" stroke="' + TINTE + '" stroke-width="2.5"/>';
    var armR = opts.winkt ? "M13 -66 L26 -94" : "M13 -66 L24 -42";
    ["M-13 -66 L-24 -42", armR].forEach(function (d) {
      g += '<path d="' + d + '" stroke="' + TINTE + '" stroke-width="11" stroke-linecap="round"/>';
      g += '<path d="' + d + '" stroke="' + kleid + '" stroke-width="6" stroke-linecap="round"/>';
    });
    g += i % 3 === 1
      ? '<path d="M-22 -30 L-13 -72 C-8 -76 8 -76 13 -72 L22 -30 Z" fill="' + kleid + '" stroke="' + TINTE + '" stroke-width="2.5" stroke-linejoin="round"/>'
      : '<path d="M-17 -34 C-18 -62 -14 -75 0 -75 C14 -75 18 -62 17 -34 Z" fill="' + kleid + '" stroke="' + TINTE + '" stroke-width="2.5" stroke-linejoin="round"/>';
    g += '<circle cx="-24" cy="-42" r="4.5" fill="' + haut + '" stroke="' + TINTE + '" stroke-width="2"/>';
    g += opts.winkt ? '<circle cx="26" cy="-95" r="4.5" fill="' + haut + '" stroke="' + TINTE + '" stroke-width="2"/>' : '<circle cx="24" cy="-42" r="4.5" fill="' + haut + '" stroke="' + TINTE + '" stroke-width="2"/>';
    var frisur = i % 4;
    if (frisur === 1) g += '<path d="M-16 -94 V-72 H-9 V-94 Z M16 -94 V-72 H9 V-94 Z" fill="' + haar + '" stroke="' + TINTE + '" stroke-width="2"/>';
    if (frisur === 2) g += '<circle cx="15" cy="-101" r="7" fill="' + haar + '" stroke="' + TINTE + '" stroke-width="2"/>';
    g += '<circle cx="0" cy="-90" r="15" fill="' + haut + '" stroke="' + TINTE + '" stroke-width="2.5"/>';
    g += frisur === 3
      ? '<path d="M-16 -94 C-16 -110 16 -110 16 -94 Z" fill="' + r(KLEID, i + 3) + '" stroke="' + TINTE + '" stroke-width="2.5"/><path d="M10 -95 H24" stroke="' + TINTE + '" stroke-width="4" stroke-linecap="round"/>'
      : '<path d="M-15 -92 C-17 -109 17 -109 15 -92 C9 -100 -9 -100 -15 -92 Z" fill="' + haar + '" stroke="' + TINTE + '" stroke-width="2.5" stroke-linejoin="round"/>';
    g += '<circle cx="-5" cy="-89" r="1.8" fill="' + TINTE + '"/><circle cx="5" cy="-89" r="1.8" fill="' + TINTE + '"/>';
    g += '<path d="M-5 -83 Q0 -79 5 -83" fill="none" stroke="' + TINTE + '" stroke-width="2" stroke-linecap="round"/>';
    return g + "</g>";
  }

  function baum(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + TINTE + '" stroke-width="3" stroke-linejoin="round">' +
      '<rect x="-9" y="-70" width="18" height="70" rx="4" fill="#8C6230"/>' +
      '<circle cx="-30" cy="-82" r="30" fill="#6F9A52"/><circle cx="30" cy="-82" r="30" fill="#6F9A52"/><circle cx="0" cy="-112" r="40" fill="#8CC063"/></g>';
  }
  function busch(x, y, s) {
    return '<g class="vorne" transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + TINTE + '" stroke-width="3">' +
      '<circle cx="-26" cy="-16" r="20" fill="#6F9A52"/><circle cx="26" cy="-16" r="20" fill="#6F9A52"/><circle cx="0" cy="-26" r="26" fill="#8CC063"/>' +
      '<path d="M-44 -2 H44" stroke-width="3"/></g>';
  }
  function icon(id, x, y, groesse) {
    return '<use href="#' + id + '" x="' + (x - groesse / 2) + '" y="' + (y - groesse) + '" width="' + groesse + '" height="' + groesse + '"/>';
  }
  function bank(x, y) {
    return '<g stroke="' + TINTE + '" stroke-width="3" stroke-linejoin="round"><rect x="' + (x - 50) + '" y="' + (y - 34) + '" width="100" height="12" rx="3" fill="#C9944A"/>' +
      '<rect x="' + (x - 50) + '" y="' + (y - 56) + '" width="100" height="10" rx="3" fill="#C9944A"/>' +
      '<path d="M' + (x - 40) + ' ' + (y - 22) + ' V' + y + ' M' + (x + 40) + ' ' + (y - 22) + ' V' + y + '" fill="none"/></g>';
  }
  function menge(liste) {
    return liste.slice().sort(function (a, b) { return a[1] - b[1]; }).map(function (p, i) { return person(p[0], p[1], p[2], p[3] !== undefined ? p[3] : i, { winkt: p[4] }); }).join("");
  }
  function himmel(boden) {
    return '<rect width="800" height="500" fill="#DCEFF2"/>' + icon("i-sonne", 720, 110, 80) + icon("i-wolke", 120, 90, 90) + icon("i-wolke", 430, 70, 70) + boden;
  }

  // ---------- Die drei Bilder ----------
  // ziele: [{ id, name, bild (für die Liste), zeichne(x, y, s), plaetze: [{ x, y, s, vorne }] }]
  var SOKRATES = {
    id: "sokrates", name: I.sokrates, bild: "sokrates-1",
    zeichne: function (s) { return '<g class="sokrates lvl-1"><use href="#sokrates" x="' + (-45 * s) + '" y="' + (-56 * s) + '" width="' + (90 * s) + '" height="' + (56 * s) + '"/></g>'; }
  };
  function ding(id, name, bild, groesse) {
    return { id: id, name: name, bild: bild, zeichne: function (s) { return icon(bild, 0, 0, groesse * s); } };
  }

  var SZENEN = {
    spielplatz: {
      name: "Spielplatz",
      hinten: function () {
        return himmel('<path d="M0 260 Q200 230 400 255 T800 250 V500 H0 Z" fill="#CFE3B5" stroke="' + TINTE + '" stroke-width="3"/>') +
          baum(50, 330, 1.05) + baum(420, 300, 0.85) +
          // Rutsche
          '<g stroke="' + TINTE + '" stroke-linejoin="round" stroke-linecap="round"><path d="M120 432 V288 M152 432 V288" stroke-width="6" fill="none"/>' +
          '<path d="M120 320 H152 M120 350 H152 M120 380 H152 M120 410 H152" stroke-width="4"/>' +
          '<rect x="112" y="280" width="48" height="12" rx="3" fill="#C9944A" stroke-width="3"/>' +
          '<path d="M156 292 L172 292 C220 300 240 396 300 426 L286 436 C230 410 206 316 156 306 Z" fill="#E46F4F" stroke-width="3"/></g>' +
          // Schaukel
          '<g stroke="' + TINTE + '" stroke-width="6" stroke-linecap="round" fill="none"><path d="M560 252 L530 372 M560 252 L590 372 M740 252 L710 372 M740 252 L770 372"/><path d="M556 252 H744" stroke="#8C6230" stroke-width="9"/>' +
          '<path d="M612 254 V330 M642 254 V330 M672 254 V320 M702 254 V320" stroke-width="2.5"/></g>' +
          '<rect x="604" y="328" width="46" height="9" rx="3" fill="#F2B544" stroke="' + TINTE + '" stroke-width="2.5"/><rect x="664" y="318" width="46" height="9" rx="3" fill="#5FA8C7" stroke="' + TINTE + '" stroke-width="2.5"/>' +
          // Sandkasten
          '<rect x="350" y="404" width="210" height="70" rx="10" fill="#EBD9B4" stroke="' + TINTE + '" stroke-width="4"/>' +
          '<path d="M372 440 L380 420 H398 L406 440 Z" fill="#E46F4F" stroke="' + TINTE + '" stroke-width="2.5" stroke-linejoin="round"/>' +
          menge([[200, 448, 0.72], [300, 478, 0.78], [450, 446, 0.66, 4], [520, 486, 0.74], [90, 486, 1.0, 6], [700, 486, 0.76, 2, true], [610, 440, 0.68, 9], [272, 384, 0.6, 5], [770, 488, 0.98, 11], [395, 492, 0.7, 8]]);
      },
      ziele: [
        [SOKRATES, [{ x: 372, y: 366, s: 0.9, vorne: busch(330, 372, 1.05) }, { x: 470, y: 452, s: 0.75 }, { x: 765, y: 428, s: 0.75, vorne: busch(725, 436, 1) }]],
        [ding("ball", "Ball", "i-ball", 38), [{ x: 600, y: 480, s: 1 }, { x: 165, y: 470, s: 1 }, { x: 430, y: 330, s: 1 }]],
        [ding("schmetterling", "Schmetterling", "i-schmetterling", 40), [{ x: 455, y: 215, s: 1 }, { x: 680, y: 200, s: 1 }, { x: 95, y: 230, s: 1 }]],
        [ding("schnecke", "Schnecke", "i-schnecke", 36), [{ x: 250, y: 498, s: 1 }, { x: 540, y: 402, s: 1 }, { x: 28, y: 470, s: 1 }]]
      ]
    },
    schulhof: {
      name: "Schulhof",
      hinten: function () {
        var fenster = "";
        [110, 190].forEach(function (y) {
          for (var i = 0; i < 5; i++) {
            var x = 88 + i * 80;
            if (y === 190 && i === 2) continue;
            fenster += '<rect x="' + x + '" y="' + y + '" width="52" height="48" rx="3" fill="#DCEFF2" stroke="' + TINTE + '" stroke-width="3"/><path d="M' + (x + 26) + ' ' + y + ' V' + (y + 48) + ' M' + x + ' ' + (y + 24) + ' H' + (x + 52) + '" stroke="' + TINTE + '" stroke-width="2"/>';
          }
        });
        var huepf = "";
        [[570, 450], [610, 450], [590, 410], [590, 370]].forEach(function (p, i) {
          huepf += '<rect x="' + p[0] + '" y="' + p[1] + '" width="40" height="40" fill="none" stroke="#fff" stroke-width="4"/><text x="' + (p[0] + 20) + '" y="' + (p[1] + 28) + '" text-anchor="middle" font-family="Andika, sans-serif" font-size="20" font-weight="700" fill="#fff">' + (i + 1) + '</text>';
        });
        return himmel('<rect x="0" y="300" width="800" height="200" fill="#E6DFCF" stroke="' + TINTE + '" stroke-width="3"/>') +
          '<path d="M40 76 L275 20 L510 76 Z" fill="#B5523A" stroke="' + TINTE + '" stroke-width="3" stroke-linejoin="round"/>' +
          '<rect x="60" y="74" width="430" height="230" fill="#EBD9B4" stroke="' + TINTE + '" stroke-width="3"/>' + fenster +
          '<circle cx="275" cy="52" r="16" fill="#fff" stroke="' + TINTE + '" stroke-width="3"/><path d="M275 52 V42 M275 52 H283" stroke="' + TINTE + '" stroke-width="2.5" stroke-linecap="round"/>' +
          '<rect x="245" y="228" width="60" height="76" fill="#8C6230" stroke="' + TINTE + '" stroke-width="3"/>' +
          '<text x="275" y="218" text-anchor="middle" font-family="Andika, sans-serif" font-size="20" font-weight="700" fill="' + TINTE + '">Schule</text>' +
          baum(660, 300, 1.15) + huepf + bank(720, 440) +
          menge([[130, 430, 0.74], [205, 478, 0.8, 3], [330, 402, 0.7, 5, true], [380, 480, 0.8], [455, 430, 0.74, 7], [520, 492, 0.8, 10], [275, 338, 0.95, 6], [770, 492, 0.78, 2], [470, 352, 0.66, 9], [60, 486, 0.76, 1]]);
      },
      ziele: [
        [SOKRATES, [{ x: 114, y: 236, s: 0.5 }, { x: 590, y: 318, s: 0.8, vorne: busch(548, 326, 1) }, { x: 700, y: 492, s: 0.7 }]],
        [ding("buch", "Buch", "i-buch", 38), [{ x: 150, y: 480, s: 1 }, { x: 720, y: 404, s: 1 }, { x: 440, y: 340, s: 1 }]],
        [ding("stern", "Stern", "i-stern", 36), [{ x: 640, y: 352, s: 1 }, { x: 230, y: 352, s: 1 }, { x: 30, y: 420, s: 1 }]],
        [ding("blume", "Blume", "i-blume", 38), [{ x: 22, y: 304, s: 1 }, { x: 590, y: 300, s: 1 }, { x: 780, y: 320, s: 1 }]]
      ]
    },
    markt: {
      name: "Markt",
      hinten: function () {
        var streifen = "";
        for (var i = 0; i < 7; i++) {
          var x = 30 + i * 50;
          streifen += '<path d="M' + x + ' 170 H' + (x + 50) + ' L' + (x + 54) + ' 206 Q' + (x + 27) + ' 220 ' + (x - 4) + ' 206 Z" fill="' + (i % 2 ? "#fff" : "#E46F4F") + '" stroke="' + TINTE + '" stroke-width="2.5" stroke-linejoin="round"/>';
        }
        var dach = "";
        for (var k = 0; k < 5; k++) {
          var dx = 440 + k * 56;
          dach += '<path d="M' + dx + ' 196 H' + (dx + 56) + ' L' + (dx + 58) + ' 222 Q' + (dx + 28) + ' 236 ' + (dx - 2) + ' 222 Z" fill="' + (k % 2 ? "#fff" : "#8CC063") + '" stroke="' + TINTE + '" stroke-width="2.5" stroke-linejoin="round"/>';
        }
        var obst = "";
        for (var j = 0; j < 12; j++) {
          obst += '<circle cx="' + (468 + j * 20) + '" cy="' + (318 - (j % 2) * 8) + '" r="10" fill="' + ["#E46F4F", "#F2A65A", "#8CC063", "#F2D35B"][j % 4] + '" stroke="' + TINTE + '" stroke-width="2"/>';
        }
        return himmel('<rect x="0" y="330" width="800" height="170" fill="#E6DFCF" stroke="' + TINTE + '" stroke-width="3"/><path d="M0 390 H800 M0 450 H800" stroke="#D3CAB4" stroke-width="3"/>') +
          '<rect x="40" y="90" width="330" height="248" fill="#F3E3C3" stroke="' + TINTE + '" stroke-width="3"/>' +
          '<rect x="105" y="104" width="200" height="46" rx="8" fill="#fff" stroke="' + TINTE + '" stroke-width="3"/>' +
          '<text x="205" y="136" text-anchor="middle" font-family="Andika, sans-serif" font-size="26" font-weight="700" fill="' + TINTE + '">Bäckerei</text>' + streifen +
          '<rect x="58" y="226" width="172" height="92" rx="4" fill="#DCEFF2" stroke="' + TINTE + '" stroke-width="3"/>' +
          icon("i-broetchen", 96, 314, 44) + icon("i-broetchen", 150, 314, 44) + icon("i-broetchen", 200, 314, 40) +
          '<rect x="262" y="226" width="70" height="112" fill="#8C6230" stroke="' + TINTE + '" stroke-width="3"/>' +
          '<path d="M452 330 V200 M716 330 V200" stroke="' + TINTE + '" stroke-width="6" stroke-linecap="round"/>' + dach +
          person(585, 356, 0.9, 6) +
          '<rect x="440" y="326" width="290" height="22" rx="4" fill="#C9944A" stroke="' + TINTE + '" stroke-width="3"/>' + obst +
          '<path d="M460 348 V400 M710 348 V400" stroke="' + TINTE + '" stroke-width="6" stroke-linecap="round"/>' +
          baum(780, 340, 0.85) +
          menge([[230, 470, 1, 2], [305, 440, 0.95, 5], [160, 488, 0.74, 8], [380, 474, 1, 3], [520, 476, 0.95, 7], [600, 462, 0.74, 4, true], [680, 488, 1, 9], [455, 430, 0.7, 10], [60, 470, 0.95, 1]]);
      },
      ziele: [
        [SOKRATES, [{ x: 585, y: 396, s: 0.7 }, { x: 130, y: 266, s: 0.5 }, { x: 768, y: 474, s: 0.7, vorne: busch(725, 486, 0.95) }]],
        [ding("fisch", "Fisch", "i-fisch", 36), [{ x: 650, y: 324, s: 1 }, { x: 30, y: 492, s: 1 }, { x: 410, y: 496, s: 1 }]],
        [ding("blume", "Blume", "i-blume", 40), [{ x: 350, y: 336, s: 1 }, { x: 740, y: 330, s: 1 }, { x: 22, y: 336, s: 1 }]],
        [{ id: "ballon", name: "Luftballon", bild: "i-herz", zeichne: function () { return '<path d="M0 0 Q-8 -20 0 -40" stroke="' + TINTE + '" stroke-width="2" fill="none"/>' + icon("i-herz", 0, -36, 40); } },
          [{ x: 480, y: 160, s: 1 }, { x: 165, y: 80, s: 1 }, { x: 610, y: 140, s: 1 }]]
      ]
    }
  };

  // ---------- Spiel ----------
  function baueBild() {
    var sz = SZENEN[szeneId];
    var wahl = sz.ziele.map(function (z) { return { ziel: z[0], platz: T.zufall(z[1]) }; });
    var svg = '<svg viewBox="0 0 800 500" class="wimmel" role="img" aria-label="Suchbild: ' + sz.name + '">' + sz.hinten();
    wahl.forEach(function (w) {
      var p = w.platz, s = p.s || 1;
      svg += '<g class="ziel" data-ziel="' + w.ziel.id + '" transform="translate(' + p.x + ' ' + p.y + ')">' +
        w.ziel.zeichne(s) +
        '<circle class="treffer" cx="0" cy="' + (-22 * s) + '" r="' + Math.max(30, 40 * s) + '" fill="transparent"/>' +
        '<circle class="markierung" cx="0" cy="' + (-22 * s) + '" r="' + Math.max(32, 42 * s) + '" fill="none" stroke="#F2B544" stroke-width="6"/></g>';
    });
    wahl.forEach(function (w) { if (w.platz.vorne) svg += w.platz.vorne; });
    svg += "</svg>";
    var box = $("suchen-bild");
    box.innerHTML = svg;
    ziele = wahl.map(function (w) { return { id: w.ziel.id, name: w.ziel.name, bild: w.ziel.bild, gefunden: false }; });
    maleListe();
  }

  function maleListe() {
    var liste = $("suchen-liste");
    liste.textContent = "";
    ziele.forEach(function (z) {
      var tipp = T.el("button", { type: "button", class: "knopf klein", text: I.tipp, onclick: function () { hilf(z, tipp); } });
      liste.appendChild(T.el("li", { class: z.gefunden ? "gefunden" : "", "data-ziel": z.id }, [
        T.el("span", { class: "suchen-icon" }, [T.bild(z.bild)]),
        T.el("span", { class: "suchen-name" }, [z.name, z.gefunden ? T.el("span", { class: "nur-vorleser", text: " – " + I.gefunden }) : null]),
        z.gefunden ? T.bild("i-ja", "haken", I.gefunden) : tipp
      ]));
    });
  }

  function gElement(id) { return $("suchen-bild").querySelector('.ziel[data-ziel="' + id + '"]'); }

  function hilf(z, knopf) {
    var g = gElement(z.id);
    if (!g || z.gefunden) return;
    if (!g.classList.contains("tipp")) {
      g.classList.add("tipp");
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.setAttribute("aria-label", z.name);
      knopf.textContent = I.tippDa;
    } else {
      finde(z.id);
    }
  }

  function finde(id) {
    var z = ziele.find(function (x) { return x.id === id; });
    if (!z || z.gefunden) return;
    z.gefunden = true;
    var g = gElement(id);
    g.classList.remove("tipp");
    g.classList.add("gefunden");
    g.removeAttribute("tabindex");
    status.textContent = T.zufall(I.super) + " (" + z.name + ")";
    T.pop(status);
    maleListe();
    if (ziele.every(function (x) { return x.gefunden; })) {
      T.spielEnde($("suchen-ende"), { titel: I.endeTitel, text: I.ende, nochmal: neu });
    }
  }

  function neu() {
    $("suchen-ende").textContent = "";
    status.textContent = "";
    baueBild();
    $("suchen-wahl").querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.szene === szeneId)); });
  }

  function baue() {
    Object.keys(SZENEN).forEach(function (id) {
      $("suchen-wahl").appendChild(T.el("button", { type: "button", class: "knopf", "data-szene": id, "aria-pressed": "false",
        onclick: function () { szeneId = id; neu(); } }, [SZENEN[id].name]));
    });
    status = T.el("p", { class: "suchen-status", "aria-live": "polite" });
    $("suchen-bild").parentNode.insertBefore(status, $("suchen-bild").parentNode.firstChild);
    var bild = $("suchen-bild");
    bild.addEventListener("click", function (e) {
      var g = e.target.closest && e.target.closest(".ziel");
      if (g) finde(g.dataset.ziel);
    });
    bild.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("ziel")) {
        e.preventDefault();
        finde(e.target.dataset.ziel);
      }
    });
    gebaut = true;
  }

  T.ansichten["spiel-suchen"] = {
    zeige: function () {
      if (!gebaut) baue();
      T.absaetze($("suchen-intro"), I.intro);
      neu();
    }
  };
})(window.Teich);
