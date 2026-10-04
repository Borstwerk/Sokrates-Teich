/* Knobeln: Über den großen Teich – Rucksack packen, Weg planen, Stein für Stein zum Ziel */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.weg;
  var $ = function (id) { return document.getElementById(id); };
  var nr = 0, rucksack = [], pos = null, besucht = {}, phase = "packen";

  function blase(saetze) { T.absaetze($("weg-blase"), saetze); T.pop($("weg-blase").parentNode); }
  function gespeichert() { return Math.min(Number(T.abenteuer("weg").level) || 0, I.level.length - 1); }
  function karte() { return I.level[nr].karte; }
  function feld(r, c) { var k = karte(); return r >= 0 && r < k.length && c >= 0 && c < k[r].length ? k[r][c] : "."; }
  function sacheName(id) { return I.sachen[id][1]; }

  function start() {
    var k = karte();
    for (var r = 0; r < k.length; r++) for (var c = 0; c < k[r].length; c++) if (k[r][c] === "S") return [r, c];
  }

  function zeige() {
    var box = $("weg-spiel");
    box.textContent = "";
    var L = I.level[nr];
    box.appendChild(T.el("p", { class: "leise", text: T.fuelle(I.levelText, { nr: nr + 1, von: I.level.length }) }));

    // Welche besonderen Steine gibt es hier?
    var arten = [];
    karte().join("").split("").forEach(function (t) { if (I.felder[t] && arten.indexOf(t) < 0) arten.push(t); });
    box.appendChild(T.el("ul", { class: "weg-legende" }, arten.map(function (t) {
      return T.el("li", {}, [T.el("span", { class: "weg-feld klein " + t }, [T.bild(I.felder[t][0])]), T.el("span", { class: "lesen", text: I.erklaerung[t] })]);
    })));

    if (phase === "packen") {
      var zaehler = T.el("p", { class: "lesen", style: "font-weight:700" });
      var sachen = T.el("div", { class: "weg-sachen" });
      var los = T.el("button", { type: "button", class: "knopf haupt", text: I.los, onclick: function () {
        phase = "gehen"; pos = start(); besucht = {}; besucht[pos.join()] = true;
        blase([I.rucksack + " " + (rucksack.length ? rucksack.map(sacheName).join(", ") : I.leer)]);
        zeige();
        var n = $("weg-spiel").querySelector(".weg-feld.nah"); if (n) n.focus();
      } });
      function aktualisiere() {
        zaehler.textContent = T.fuelle(I.packen, { anzahl: rucksack.length, von: L.platz });
        sachen.querySelectorAll("button").forEach(function (b) {
          var an = rucksack.indexOf(b.dataset.id) >= 0;
          b.setAttribute("aria-pressed", String(an));
          b.disabled = !an && rucksack.length >= L.platz;
        });
      }
      Object.keys(I.sachen).forEach(function (id) {
        sachen.appendChild(T.el("button", { type: "button", class: "werkzeug", "data-id": id, onclick: function () {
          var i = rucksack.indexOf(id);
          if (i >= 0) rucksack.splice(i, 1); else if (rucksack.length < L.platz) rucksack.push(id);
          aktualisiere();
        } }, [T.bild(I.sachen[id][0]), I.sachen[id][1]]));
      });
      box.appendChild(zaehler);
      box.appendChild(sachen);
      box.appendChild(T.el("div", { class: "knoepfe" }, [los]));
      aktualisiere();
    } else {
      box.appendChild(T.el("p", { class: "weg-rucksack" }, [T.el("b", { text: I.rucksack + " " }),
        rucksack.length ? T.el("span", {}, rucksack.map(function (id) { return T.el("span", { class: "sache" }, [T.bild(I.sachen[id][0]), sacheName(id)]); })) : I.leer]));
    }

    // Die Karte
    var k = karte();
    var gitter = T.el("div", { class: "weg-karte" + (phase === "packen" ? " vorschau" : ""), style: "grid-template-columns: repeat(" + k[0].length + ", 1fr)" });
    k.forEach(function (zeile, r) {
      zeile.split("").forEach(function (t, c) {
        if (t === ".") { gitter.appendChild(T.el("span", { class: "weg-wasser", "aria-hidden": "true" })); return; }
        var hier = pos && pos[0] === r && pos[1] === c;
        var nah = phase === "gehen" && pos && Math.abs(pos[0] - r) + Math.abs(pos[1] - c) === 1;
        var name = t === "S" ? "Start" : t === "Z" ? "Ziel" : I.felder[t] ? I.felder[t][1] : "Stein";
        var inhalt = [];
        if (hier) inhalt.push(T.bild("sokrates-1"));
        else if (t === "Z") inhalt.push(T.bild("i-seerose"));
        else if (I.felder[t]) inhalt.push(T.bild(I.felder[t][0]));
        var knopf = T.el("button", { type: "button", class: "weg-feld " + t + (hier ? " hier" : "") + (nah ? " nah" : "") + (besucht[r + "," + c] ? " besucht" : ""),
          "aria-label": name + (hier ? ", hier bin ich" : ""), disabled: phase !== "gehen" || hier,
          onclick: function () { gehe(r, c); } }, inhalt);
        gitter.appendChild(knopf);
      });
    });
    box.appendChild(gitter);
    if (phase === "gehen") {
      box.appendChild(T.el("div", { class: "knoepfe" }, [T.el("button", { type: "button", class: "knopf klein", text: I.neu, onclick: function () {
        phase = "packen"; rucksack = []; pos = null; blase(I.intro.slice(2)); zeige();
      } })]));
    }
  }

  function gehe(r, c) {
    if (Math.abs(pos[0] - r) + Math.abs(pos[1] - c) !== 1) { blase([I.zuWeit]); return; }
    var t = feld(r, c);
    if (I.felder[t]) {
      var braucht = I.felder[t][2];
      var i = rucksack.indexOf(braucht);
      if (i < 0) { blase([T.fuelle(I.braucht, { was: sacheName(braucht) })]); return; }
      rucksack.splice(i, 1);
      blase([T.fuelle(I.benutzt, { was: sacheName(braucht) })]);
    }
    pos = [r, c];
    besucht[r + "," + c] = true;
    if (t === "Z") return angekommen();
    zeige();
    var n = $("weg-spiel").querySelector(".weg-feld.nah"); if (n) n.focus();
  }

  function angekommen() {
    phase = "fertig";
    var weiter = Math.max(gespeichert(), nr + 1);
    T.abenteuerSpeichern("weg", { level: weiter });
    zeige();
    blase([I.angekommen]);
    var box = $("weg-spiel");
    if (nr + 1 >= I.level.length) {
      T.spielEnde($("weg-ende"), { titel: I.endeTitel, text: I.ende, nochmal: function () { nr = 0; neu(); } });
      return;
    }
    var k = T.el("button", { type: "button", class: "knopf haupt", text: I.weiter, onclick: function () { nr++; neu(); } });
    box.appendChild(T.el("div", { class: "knoepfe" }, [k]));
    k.focus();
  }

  function neu() {
    phase = "packen"; rucksack = []; pos = null; besucht = {};
    $("weg-ende").textContent = "";
    blase(nr ? [T.fuelle(I.levelText, { nr: nr + 1, von: I.level.length })].concat(I.intro.slice(2)) : I.intro);
    zeige();
  }

  T.ansichten["spiel-weg"] = {
    zeige: function () { nr = gespeichert(); neu(); }
  };
})(window.Teich);
