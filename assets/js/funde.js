/* Teich-Schätze – Sokrates findet etwas (Spiele, Mut) und das Kind gestaltet damit seinen Teich */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.funde;
  var $ = function (id) { return document.getElementById(id); };

  // Katalog: { id, bild, name, akk, mut }
  var KATALOG = {};
  [["spiel", false], ["mut", true]].forEach(function (q) {
    I[q[0]].forEach(function (f) { KATALOG[f[0]] = { id: f[0], bild: f[1], name: f[2], akk: f[3], mut: q[1] }; });
  });
  T.fundArt = function (id) { return KATALOG[id] || KATALOG.seerose; };

  T.spieleAn = function () { return T.speicher.get("spieleAn") !== false; };

  // Sokrates findet etwas. quelle: "spiel" | "mut". Gibt { eintrag, art } zurück (oder null, wenn ausgeschaltet).
  T.findeEtwas = function (quelle) {
    if (!T.spieleAn()) return null;
    var liste = I[quelle === "mut" ? "mut" : "spiel"];
    var vorhanden = {};
    T.speicher.get("funde").forEach(function (f) { vorhanden[f.art] = true; });
    var neu = liste.filter(function (f) { return !vorhanden[f[0]]; });
    var wahl = T.zufall(neu.length ? neu : liste);
    var eintrag = { id: T.neueId(), art: wahl[0], x: null, y: null, zeit: Date.now() };
    T.speicher.aendere("funde", function (arr) { arr.push(eintrag); return arr; });
    return { eintrag: eintrag, art: T.fundArt(wahl[0]) };
  };

  // Kleiner Hinweis „Sokrates hat … gefunden!“ mit Link zum Teich
  T.fundHinweis = function (fund) {
    if (!fund) return null;
    var text = T.fuelle(fund.art.mut ? I.gefundenMut : I.gefundenSpiel, { was: fund.art.akk });
    var p = T.el("p", { class: "fund" + (fund.art.mut ? " mut" : "") }, [
      T.el("span", { class: "fund-bild" }, [T.bild(fund.art.bild)]),
      T.el("span", {}, [T.el("span", { class: "lesen", text: text }), " ", T.el("a", { href: "#mein-teich", text: I.ansehen })])
    ]);
    T.pop(p);
    return p;
  };

  // ---------- Ansicht „Dein Teich“ ----------
  var teich, figur, gewaehlt = null, zug = null;

  function funde() { return T.speicher.get("funde"); }
  function aendereFund(id, fn) {
    T.speicher.aendere("funde", function (arr) {
      return arr.map(function (f) { return f.id === id ? fn(Object.assign({}, f)) || f : f; });
    });
  }
  function begrenze(v, min, max) { return Math.max(min, Math.min(max, v)); }

  // Freie Stelle im Wasser: möglichst weit weg von den anderen Dingen und von Sokrates
  function freieStelle() {
    var belegt = funde().filter(function (f) { return f.x !== null; }).map(function (f) { return [f.x, f.y]; });
    belegt.push([18, 78]);
    var beste = [55, 40], abstand = -1;
    for (var i = 0; i < 40; i++) {
      var p = [14 + Math.random() * 78, 12 + Math.random() * 60];
      var d = Math.min.apply(null, belegt.map(function (b) { return Math.hypot(b[0] - p[0], (b[1] - p[1]) * 0.62); }));
      if (d > abstand) { abstand = d; beste = p; }
    }
    return beste;
  }

  function waehle(id, fokus) {
    gewaehlt = id;
    teich.querySelectorAll(".mt-ding").forEach(function (b) {
      var an = b.dataset.id === id;
      b.classList.toggle("gewaehlt", an);
      b.setAttribute("aria-pressed", String(an));
      if (an && fokus) b.focus();
    });
    zeigeAuswahl();
  }

  function zeigeAuswahl() {
    var box = $("mt-auswahl");
    box.textContent = "";
    var f = funde().find(function (x) { return x.id === gewaehlt && x.x !== null; });
    if (!f) { gewaehlt = null; return; }
    var art = T.fundArt(f.art);
    box.appendChild(T.el("p", {}, [T.el("strong", { text: T.fuelle(I.ausgewaehlt, { name: art.name }) }), " ", I.ziehTipp]));
    box.appendChild(T.el("button", { type: "button", class: "knopf klein", text: I.zurKiste, onclick: function () {
      aendereFund(f.id, function (x) { x.x = null; x.y = null; return x; });
      gewaehlt = null;
      male();
    } }));
  }

  function setzePosition(knopf, x, y) {
    knopf.style.left = x + "%";
    knopf.style.top = y + "%";
  }

  function prozent(e) {
    var r = teich.getBoundingClientRect();
    return [
      begrenze(((e.clientX - r.left) / r.width) * 100, 4, 96),
      begrenze(((e.clientY - r.top) / r.height) * 100, 6, 94)
    ];
  }

  function dingKnopf(f) {
    var art = T.fundArt(f.art);
    var knopf = T.el("button", {
      type: "button", class: "mt-ding" + (art.mut ? " leuchtet" : ""), "data-id": f.id,
      "aria-label": art.name, "aria-pressed": "false"
    }, [T.bild(art.bild)]);
    setzePosition(knopf, f.x, f.y);

    // Ziehen mit Finger oder Maus
    knopf.addEventListener("pointerdown", function (e) {
      if (e.button !== undefined && e.button > 0) return;
      e.preventDefault();
      waehle(f.id);
      zug = { id: f.id, knopf: knopf, x0: e.clientX, y0: e.clientY, bewegt: false, pos: [f.x, f.y] };
      try { knopf.setPointerCapture(e.pointerId); } catch (err) { /* ältere Browser */ }
      knopf.classList.add("zieht");
    });
    knopf.addEventListener("pointermove", function (e) {
      if (!zug || zug.knopf !== knopf) return;
      if (Math.hypot(e.clientX - zug.x0, e.clientY - zug.y0) > 4) zug.bewegt = true;
      if (!zug.bewegt) return;
      zug.pos = prozent(e);
      setzePosition(knopf, zug.pos[0], zug.pos[1]);
    });
    function loslassen() {
      if (!zug || zug.knopf !== knopf) return;
      knopf.classList.remove("zieht");
      if (zug.bewegt) {
        var pos = zug.pos;
        aendereFund(f.id, function (x) { x.x = pos[0]; x.y = pos[1]; return x; });
        f.x = pos[0]; f.y = pos[1];
        T.pop(knopf, "abgesetzt");
      }
      zug = null;
    }
    knopf.addEventListener("pointerup", loslassen);
    knopf.addEventListener("pointercancel", loslassen);
    knopf.addEventListener("click", function () { waehle(f.id); });

    // Tastatur: Pfeiltasten verschieben, Entf legt zurück in die Kiste
    knopf.addEventListener("keydown", function (e) {
      var d = { ArrowLeft: [-3, 0], ArrowRight: [3, 0], ArrowUp: [0, -4], ArrowDown: [0, 4] }[e.key];
      if (d) {
        e.preventDefault();
        f.x = begrenze(f.x + d[0], 4, 96); f.y = begrenze(f.y + d[1], 6, 94);
        setzePosition(knopf, f.x, f.y);
        aendereFund(f.id, function (x) { x.x = f.x; x.y = f.y; return x; });
      } else if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        aendereFund(f.id, function (x) { x.x = null; x.y = null; return x; });
        gewaehlt = null;
        male();
      }
    });
    return knopf;
  }

  function male() {
    var alle = funde();
    teich.querySelectorAll(".mt-ding").forEach(function (b) { b.remove(); });
    alle.filter(function (f) { return f.x !== null; }).forEach(function (f) { teich.appendChild(dingKnopf(f)); });

    var kiste = $("mt-kiste");
    kiste.textContent = "";
    var inKiste = alle.filter(function (f) { return f.x === null; });
    if (!alle.length) kiste.appendChild(T.el("li", { class: "leer lesen", text: I.nochNichts }));
    else if (!inKiste.length) kiste.appendChild(T.el("li", { class: "leer", text: I.kisteLeer }));
    inKiste.forEach(function (f) {
      var art = T.fundArt(f.art);
      kiste.appendChild(T.el("li", {}, [T.el("button", {
        type: "button", class: "art" + (art.mut ? " mut" : ""),
        onclick: function () {
          var p = freieStelle();
          aendereFund(f.id, function (x) { x.x = Math.round(p[0]); x.y = Math.round(p[1]); return x; });
          male();
          waehle(f.id, true);
          var neu = teich.querySelector('[data-id="' + f.id + '"]');
          if (neu) T.pop(neu, "abgesetzt");
        }
      }, [T.bild(art.bild), art.name])]));
    });
    $("mt-zaehler").textContent = alle.length ? T.fuelle(I.zaehler, { anzahl: alle.length }) : "";
    if (gewaehlt) waehle(gewaehlt); else zeigeAuswahl();
  }

  function baueTeich() {
    teich = $("mt-teich");
    teich.appendChild(T.el("span", { class: "ring r1", "aria-hidden": "true" }));
    teich.appendChild(T.el("span", { class: "ring r2", "aria-hidden": "true" }));
    teich.appendChild(T.el("div", { class: "ufer" }));
    figur = T.sokratesFigur(1, "lebendig");
    teich.appendChild(figur);
    // Tippen ins Wasser: das ausgewählte Ding dorthin legen
    teich.addEventListener("click", function (e) {
      if (!gewaehlt || e.target.closest(".mt-ding") || e.target.closest(".sokrates")) return;
      var pos = prozent(e);
      aendereFund(gewaehlt, function (x) { x.x = pos[0]; x.y = pos[1]; return x; });
      var b = teich.querySelector('[data-id="' + gewaehlt + '"]');
      if (b) { setzePosition(b, pos[0], pos[1]); T.pop(b, "abgesetzt"); }
    });
  }

  T.ansichten["mein-teich"] = {
    zeige: function () {
      if (!teich) baueTeich();
      T.absaetze($("mt-blase"), I.teichText);
      gewaehlt = null;
      male();
      T.nicken(figur);
    }
  };
})(window.Teich);
