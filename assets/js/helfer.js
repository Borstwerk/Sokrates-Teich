/* Kleine Helfer: Elemente bauen, Bilder, Szenen, Dialog. */
(function (T) {
  var SVG = "http://www.w3.org/2000/svg";

  // el("p", { class: "x", onclick: fn }, ["Text", kindElement])
  T.el = function (tag, attrs, kinder) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v);
      else if (k === "text") e.textContent = v;
      else e.setAttribute(k, v === true ? "" : v);
    });
    [].concat(kinder || []).forEach(function (kind) {
      if (kind === null || kind === undefined) return;
      e.appendChild(typeof kind === "string" ? document.createTextNode(kind) : kind);
    });
    return e;
  };

  // Bild aus der Zeichnungs-Sammlung: "i-stern" oder "sokrates-3"
  T.bild = function (id, klasse, beschriftung) {
    var svg = document.createElementNS(SVG, "svg");
    var use = document.createElementNS(SVG, "use");
    var m = /^sokrates-(\d)$/.exec(id);
    if (m) {
      svg.setAttribute("viewBox", "0 0 420 260");
      svg.setAttribute("class", "sokrates lvl-" + m[1] + (klasse ? " " + klasse : ""));
      use.setAttribute("href", "#sokrates");
    } else {
      svg.setAttribute("viewBox", "0 0 48 48");
      if (klasse) svg.setAttribute("class", klasse);
      use.setAttribute("href", "#" + id);
    }
    if (beschriftung) {
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", beschriftung);
    } else {
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
    }
    svg.appendChild(use);
    return svg;
  };

  // Sokrates direkt eingezeichnet (statt <use>), damit alle Animationen sicher laufen
  T.sokratesFigur = function (level, klasse) {
    var svg = document.createElementNS(SVG, "svg");
    svg.setAttribute("viewBox", "0 0 420 260");
    svg.setAttribute("class", "sokrates lvl-" + (level || 1) + (klasse ? " " + klasse : ""));
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var vorlage = document.getElementById("sokrates");
    [].forEach.call(vorlage.childNodes, function (n) { svg.appendChild(n.cloneNode(true)); });
    // Antippen: Sokrates freut sich
    svg.addEventListener("click", function () {
      if (T.wenigBewegung()) return;
      svg.classList.remove("freut");
      void svg.getBoundingClientRect();
      svg.classList.add("freut");
      setTimeout(function () { svg.classList.remove("freut"); }, 950);
    });
    return svg;
  };

  // Einmal nicken (z. B. zur Begrüßung)
  T.nicken = function (figur) {
    if (!figur || T.wenigBewegung()) return;
    figur.classList.add("nickt");
    setTimeout(function () { figur.classList.remove("nickt"); }, 1200);
  };

  // Teich-Szene mit Sokrates.
  // opts: { level, lampe (null|0–1), deko: [[bild, text]], libelle, still }
  T.szene = function (opts) {
    opts = opts || {};
    var szene = T.el("div", { class: "szene" }, [
      T.el("span", { class: "ring r1", "aria-hidden": "true" }),
      T.el("span", { class: "ring r2", "aria-hidden": "true" }),
      T.el("div", { class: "ufer" })
    ]);
    if (opts.deko && opts.deko.length) {
      var deko = T.el("div", { class: "deko" });
      opts.deko.forEach(function (d) {
        deko.appendChild(T.el("figure", {}, [T.bild(d[0]), d[1] ? T.el("figcaption", { text: d[1] }) : null]));
      });
      szene.appendChild(deko);
    } else {
      szene.appendChild(T.bild("i-seerose", "treibt"));
    }
    if (opts.libelle) {
      var lib = document.createElementNS(SVG, "svg");
      lib.setAttribute("viewBox", "0 0 60 40");
      lib.setAttribute("class", "libelle");
      lib.setAttribute("aria-hidden", "true");
      var u = document.createElementNS(SVG, "use");
      u.setAttribute("href", "#libelle");
      lib.appendChild(u);
      szene.appendChild(lib);
    }
    var lampe = null;
    if (opts.lampe !== undefined && opts.lampe !== null) {
      var wellen = document.createElementNS(SVG, "svg");
      wellen.setAttribute("viewBox", "0 0 92 46");
      wellen.setAttribute("class", "wellen-alarm");
      wellen.setAttribute("aria-hidden", "true");
      wellen.innerHTML = '<path d="M20 10 Q11 23 20 36 M12 5 Q0 23 12 41 M72 10 Q81 23 72 36 M80 5 Q92 23 80 41" fill="none" stroke="#E46F4F" stroke-width="3" stroke-linecap="round"/>';
      lampe = T.el("div", { class: "alarm" }, [wellen, T.el("div", { class: "lampe" }), "Alarmanlage"]);
      szene.appendChild(lampe);
    }
    var sokrates = T.sokratesFigur(opts.level || 1, opts.still ? "" : "lebendig");
    szene.appendChild(sokrates);
    szene.sokrates = sokrates;
    szene.stelle = function (level, glow) {
      [1, 2, 3, 4, 5].forEach(function (l) { sokrates.classList.toggle("lvl-" + l, l === level); });
      if (lampe) {
        lampe.style.setProperty("--glow", glow || 0);
        lampe.classList.toggle("an", (glow || 0) >= 0.4);
      }
    };
    szene.stelle(opts.level || 1, opts.lampe);
    return szene;
  };

  // Animation neu auslösen (z. B. Sprechblase „ploppt“)
  T.pop = function (el, klasse) {
    if (!el) return;
    klasse = klasse || "pop";
    el.classList.remove(klasse);
    void el.offsetWidth;
    el.classList.add(klasse);
  };

  // Listeneinträge nacheinander einblenden
  T.nacheinander = function (liste) {
    liste.classList.add("nacheinander");
    [].forEach.call(liste.children, function (li, i) { li.style.setProperty("--i", Math.min(i, 12)); });
  };

  // {name} ersetzen. Ohne Namen fällt „, {name}“ bzw. „ {name}“ weg.
  T.mitName = function (text) {
    var name = String(T.speicher.get("name") || "").trim();
    return String(text).replace(/[ ,]*\{name\}/g, function (treffer) {
      return name ? treffer.replace("{name}", name) : "";
    });
  };

  // Für Erwachsenen-Texte: {kind} → Name oder „das Kind“, {Kind} → Name oder „Das Kind“
  T.kind = function (text) {
    var name = String(T.speicher.get("name") || "").trim();
    return String(text).replace(/\{kind\}/g, name || "das Kind").replace(/\{Kind\}/g, name || "Das Kind");
  };

  // Drucken: knoten kommen in #druck, klasse steuert das Drucklayout (siehe style.css)
  T.drucke = function (knoten, klasse) {
    var druck = document.getElementById("druck");
    druck.textContent = "";
    druck.className = klasse || "";
    [].concat(knoten).forEach(function (k) { druck.appendChild(k); });
    T.schliesseDialog();
    setTimeout(function () { window.print(); }, 60);
  };

  // Druck-Layout: Grundgröße aus „Karten pro Seite“, dann skaliert (wie im Druckmenü).
  // A4 mit 10 mm Rand → 190 × 277 mm Druckfläche (etwas Reserve: 272 mm), 4 mm Abstand.
  var BREITE = 190, HOEHE = 272, ABSTAND = 4;
  var GRUND = { 8: [93, 65], 4: [93, 134], 2: [190, 134], 1: [190, 272] };
  T.druckLayout = function (pro, prozent) {
    pro = GRUND[pro] ? Number(pro) : 4;
    var f = Math.max(0.2, Math.min(2, (Number(prozent) || 100) / 100));
    var w = Math.min(BREITE, GRUND[pro][0] * f);
    var h = Math.min(HOEHE, GRUND[pro][1] * f);
    var spalten = Math.max(1, Math.floor((BREITE + ABSTAND) / (w + ABSTAND)));
    var zeilen = Math.max(1, Math.floor((HOEHE + ABSTAND) / (h + ABSTAND)));
    // Schrift und Bilder wachsen mit der kleineren Seite mit
    var s = Math.min(w / GRUND[pro][0], h / GRUND[pro][1]);
    return { pro: pro, w: w, h: h, spalten: spalten, zeilen: zeilen, proSeite: spalten * zeilen, s: s };
  };

  // Karten auf Druckseiten verteilen
  T.druckeKarten = function (karten, pro, art, prozent) {
    var l = T.druckLayout(pro, prozent);
    var seiten = [];
    for (var i = 0; i < karten.length; i += l.proSeite) {
      seiten.push(T.el("div", {
        class: "druckseite",
        style: "grid-template-columns: repeat(" + l.spalten + ", " + l.w.toFixed(1) + "mm); grid-auto-rows: " + l.h.toFixed(1) + "mm;"
      }, karten.slice(i, i + l.proSeite)));
    }
    T.drucke(seiten, "karten-druck pro-" + l.pro + " " + (art || "kind"));
    document.getElementById("druck").style.setProperty("--s", l.s.toFixed(3));
  };

  // Text „→ 8 Karten pro Seite · 2 Seiten“
  T.druckInfo = function (anzahl, pro, prozent) {
    var l = T.druckLayout(pro, prozent);
    var seiten = Math.max(1, Math.ceil(anzahl / l.proSeite));
    return "→ " + l.proSeite + (l.proSeite === 1 ? " Karte" : " Karten") + " pro Seite · " + seiten + (seiten === 1 ? " Seite" : " Seiten") +
      " · Karte " + (l.w / 10).toFixed(1).replace(".", ",") + " × " + (l.h / 10).toFixed(1).replace(".", ",") + " cm";
  };

  T.fuelle = function (text, werte) {
    return String(text).replace(/\{(\w+)\}/g, function (_, k) { return werte[k] !== undefined ? werte[k] : ""; });
  };

  // Absätze aus einer Liste von Sätzen
  T.absaetze = function (ziel, saetze) {
    ziel.textContent = "";
    [].concat(saetze).forEach(function (s) { ziel.appendChild(T.el("p", { text: T.mitName(s) })); });
  };

  T.zufall = function (liste) { return liste[Math.floor(Math.random() * liste.length)]; };

  T.wenigBewegung = function () { return document.body.classList.contains("ruhig"); };

  // Bewegung: Einstellung „auto“ folgt dem System (prefers-reduced-motion)
  var mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  T.setzeBewegung = function () {
    var wahl = T.speicher.get("bewegung") || "auto";
    document.body.classList.toggle("ruhig", wahl === "ruhig" || (wahl === "auto" && !!(mq && mq.matches)));
  };
  if (mq) {
    if (mq.addEventListener) mq.addEventListener("change", T.setzeBewegung);
    else if (mq.addListener) mq.addListener(T.setzeBewegung);
  }

  T.neueId = function () { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); };

  // Dialog: { titel, inhalt: Node|[Node], knoepfe: [{ text, haupt, aktion }], breit }
  var dialog = null;
  T.dialog = function (opts) {
    dialog = dialog || document.getElementById("dialog");
    dialog.textContent = "";
    dialog.className = opts.breit ? "breit" : "";
    var titelId = "dialog-titel";
    dialog.setAttribute("aria-labelledby", titelId);
    if (opts.titel) dialog.appendChild(T.el("h2", { id: titelId, text: opts.titel }));
    [].concat(opts.inhalt || []).forEach(function (n) { dialog.appendChild(n); });
    var leiste = T.el("div", { class: "knoepfe" });
    (opts.knoepfe || [{ text: "Schließen", haupt: true }]).forEach(function (k) {
      leiste.appendChild(T.el("button", {
        type: "button", class: "knopf" + (k.haupt ? " haupt" : "") + (k.gefahr ? " gefahr" : ""), text: k.text,
        onclick: function () {
          var bleibOffen = k.aktion ? k.aktion() === false : false;
          if (!bleibOffen) T.schliesseDialog();
        }
      }));
    });
    dialog.appendChild(leiste);
    if (dialog.showModal) { if (!dialog.open) dialog.showModal(); }
    else dialog.setAttribute("open", "");
    var erstes = dialog.querySelector("input, button.haupt, button");
    if (erstes) erstes.focus();
    return dialog;
  };
  T.schliesseDialog = function () {
    if (!dialog) return;
    T.vorlesen.stopp();
    if (dialog.close && dialog.open) dialog.close(); else dialog.removeAttribute("open");
  };
})(window.Teich = window.Teich || {});
