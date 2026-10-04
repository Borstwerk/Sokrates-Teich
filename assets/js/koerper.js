/* Mein Körper – Wo spürst du die Alarmanlage? Körperstellen antippen, verstehen, was hilft */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.koerper;
  var $ = function (id) { return document.getElementById(id); };
  var TINTE = "#2E3A2F";
  var gebaut = false, aktiv = null;

  // Leuchtfläche je Körperstelle (im Bild) und Lage des Knopfs (in Prozent)
  var STELLEN = {
    kopf:   { glow: '<ellipse cx="110" cy="62" rx="54" ry="54"/>', x: 50, y: 10 , label: "Kopf" },
    hals:   { glow: '<ellipse cx="110" cy="112" rx="26" ry="16"/>', x: 50, y: 31 , label: "Hals" },
    herz:   { glow: '<circle cx="128" cy="150" r="24"/>', x: 64, y: 41 , label: "Herz" },
    bauch:  { glow: '<ellipse cx="110" cy="200" rx="38" ry="28"/>', x: 50, y: 56 , label: "Bauch" },
    haende: { glow: '<circle cx="36" cy="226" r="24"/><circle cx="184" cy="226" r="24"/>', x: 16, y: 63 , label: "Hände" },
    beine:  { glow: '<ellipse cx="110" cy="284" rx="50" ry="60"/>', x: 50, y: 80 , label: "Beine" },
    muede:  { glow: '<rect x="14" y="4" width="192" height="352" rx="40"/>', x: 80, y: 93 , label: "Ganz müde" }
  };

  function figur() {
    var glows = Object.keys(STELLEN).map(function (id) { return '<g class="glow" data-stelle="' + id + '">' + STELLEN[id].glow + "</g>"; }).join("");
    var arm = function (d) { return '<path d="' + d + '" stroke="' + TINTE + '" stroke-width="27" stroke-linecap="round" fill="none"/><path d="' + d + '" stroke="#9CC27A" stroke-width="21" stroke-linecap="round" fill="none"/>'; };
    return '<svg viewBox="0 0 220 360" aria-hidden="true" focusable="false">' +
      '<g class="glows">' + glows + "</g>" +
      '<g stroke="' + TINTE + '" stroke-width="3" stroke-linejoin="round">' +
      '<rect x="80" y="228" width="26" height="96" rx="12" fill="#2F6F7E"/><rect x="114" y="228" width="26" height="96" rx="12" fill="#2F6F7E"/>' +
      '<ellipse cx="90" cy="330" rx="20" ry="11" fill="#8C6230"/><ellipse cx="130" cy="330" rx="20" ry="11" fill="#8C6230"/></g>' +
      arm("M74 132 Q48 170 38 214") + arm("M146 132 Q172 170 182 214") +
      '<g stroke="' + TINTE + '" stroke-width="3" stroke-linejoin="round">' +
      '<circle cx="37" cy="225" r="13" fill="#F3D9B5"/><circle cx="183" cy="225" r="13" fill="#F3D9B5"/>' +
      '<rect x="100" y="98" width="20" height="22" fill="#F3D9B5"/>' +
      '<path d="M66 126 Q110 108 154 126 L150 234 Q110 244 70 234 Z" fill="#9CC27A"/>' +
      '<circle cx="110" cy="62" r="42" fill="#F3D9B5"/>' +
      '<path d="M68 58 C66 26 92 14 112 16 C136 18 154 34 152 58 C146 44 134 36 112 36 C92 36 76 44 68 58 Z" fill="#8C6230"/></g>' +
      '<circle cx="96" cy="66" r="4.5" fill="' + TINTE + '"/><circle cx="124" cy="66" r="4.5" fill="' + TINTE + '"/>' +
      '<circle cx="86" cy="80" r="7" fill="#E89A86" opacity=".45"/><circle cx="134" cy="80" r="7" fill="#E89A86" opacity=".45"/>' +
      '<path d="M98 84 Q110 94 122 84" fill="none" stroke="' + TINTE + '" stroke-width="3" stroke-linecap="round"/>' +
      "</svg>";
  }

  function stelle(id) { return I.stellen.find(function (s) { return s.id === id; }); }

  function zeigeStart() {
    var b = $("koerper-blase");
    b.textContent = "";
    var p = T.el("div", { class: "lesen" });
    T.absaetze(p, I.intro);
    b.appendChild(p);
    T.pop(b);
  }

  function zeigeKarte(karte) {
    var inhalt = T.el("div", { class: "karte-gross" }, [T.bild(karte[0], null, ""), T.el("p", { text: karte[1] })]);
    var knoepfe = [{ text: "Schließen", haupt: true }];
    if (T.vorlesen.verfuegbar() && T.speicher.get("vorlesen")) knoepfe.push({ text: "Vorlesen lassen", aktion: function () { T.vorlesen.sprich(karte[1]); return false; } });
    T.dialog({ inhalt: [inhalt], knoepfe: knoepfe, breit: true });
  }

  function waehle(id) {
    aktiv = id;
    var s = stelle(id);
    $("koerper-figur").querySelectorAll(".glow").forEach(function (g) { g.classList.toggle("an", g.dataset.stelle === id); });
    $("koerper-figur").querySelectorAll(".stelle-knopf").forEach(function (k) { k.setAttribute("aria-pressed", String(k.dataset.stelle === id)); });

    var b = $("koerper-blase");
    b.textContent = "";
    b.appendChild(T.el("h2", { class: "lesen", tabindex: "-1", text: s.name }));
    b.appendChild(T.el("p", { class: "unter lesen", text: I.soFuehlt }));
    b.appendChild(T.el("ul", { class: "fuehlt lesen" }, s.fuehlt.map(function (f) { return T.el("li", { text: f }); })));
    b.appendChild(T.el("p", { class: "unter lesen", text: I.warum }));
    b.appendChild(T.el("p", { class: "lesen", text: s.warum }));
    b.appendChild(T.el("p", { class: "unter lesen", text: I.hilft }));
    b.appendChild(T.el("ul", { class: "hilft" }, s.hilft.map(function (h) {
      return T.el("li", {}, [T.bild("i-stern"), h[1] ? T.el("a", { href: "#" + h[1], text: h[0] }) : T.el("span", { class: "lesen", text: h[0] })]);
    })));
    var gemerkt = T.el("p", { class: "gemerkt", "aria-live": "polite" });
    b.appendChild(T.el("div", { class: "knoepfe" }, [
      T.el("button", { type: "button", class: "knopf", onclick: function () { zeigeKarte(s.karte); } }, [T.bild(s.karte[0]), I.karteZeigen]),
      T.el("button", { type: "button", class: "knopf", onclick: function (e) {
        T.speicher.aendere("koerperNotizen", function (arr) {
          arr = (arr || []).concat([{ zeit: Date.now(), stelle: id }]);
          return arr.slice(-60);
        });
        gemerkt.textContent = I.gemerkt;
        e.currentTarget.disabled = true;
      } }, [T.bild("i-herz"), I.merken])
    ]));
    b.appendChild(gemerkt);
    T.pop(b);
    // Auf schmalen Bildschirmen steht die Erklärung unter der Figur
    if (window.matchMedia && window.matchMedia("(max-width: 760px)").matches) b.scrollIntoView({ behavior: T.wenigBewegung() ? "auto" : "smooth", block: "start" });
  }

  function baue() {
    var box = $("koerper-figur");
    box.innerHTML = figur();
    I.stellen.forEach(function (s) {
      var pos = STELLEN[s.id];
      box.appendChild(T.el("button", {
        type: "button", class: "stelle-knopf" + (s.id === "muede" ? " muede" : ""), "data-stelle": s.id, "aria-pressed": "false",
        style: "left:" + pos.x + "%;top:" + pos.y + "%", onclick: function () { waehle(s.id); }
      }, [pos.label]));
    });
    $("koerper-erwachsene").textContent = I.erwachsene;
    gebaut = true;
  }

  T.ansichten.koerper = {
    zeige: function () {
      if (!gebaut) baue();
      aktiv = null;
      $("koerper-figur").querySelectorAll(".glow").forEach(function (g) { g.classList.remove("an"); });
      $("koerper-figur").querySelectorAll(".stelle-knopf").forEach(function (k) { k.setAttribute("aria-pressed", "false"); });
      zeigeStart();
    }
  };

  T.koerperStelle = stelle;
})(window.Teich);
