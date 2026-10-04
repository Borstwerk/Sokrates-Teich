/* Mut-Steine – kleine Schritte über den Teich (Mut-Leiter) */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.mutSteine;
  var szene;
  var $ = function (id) { return document.getElementById(id); };

  function aktuellerWeg() {
    var id = T.speicher.get("letzterWeg");
    return I.wege.find(function (w) { return w.id === id; }) || I.wege[0];
  }

  // Liste der Steine eines Weges: [{ schluessel, text }]
  function steineVon(weg) {
    if (weg.id === "eigen") {
      return T.speicher.get("eigenerWeg").map(function (s) { return { schluessel: s.id, text: s.text }; });
    }
    return weg.steine.map(function (text, i) { return { schluessel: String(i), text: text }; });
  }

  function anzahl(wegId, schluessel) {
    var alle = T.speicher.get("steine")[wegId] || {};
    return alle[schluessel] || 0;
  }

  function sprechblase(saetze) {
    var b = $("steine-blase");
    b.textContent = "";
    var t = T.el("div", { class: "lesen" });
    T.absaetze(t, saetze);
    b.appendChild(t);
    T.pop(b);
  }

  // Kleine Sterne fliegen aus dem geschafften Stein
  function funken(knopf) {
    if (T.wenigBewegung() || !knopf) return;
    var form = knopf.querySelector(".form");
    for (var i = 0; i < 7; i++) {
      var f = T.el("span", { class: "funke", style: "--w:" + (i * (360 / 7) + 10) + "deg", "aria-hidden": "true" }, [T.bild("i-stern")]);
      form.appendChild(f);
    }
    setTimeout(function () { form.querySelectorAll(".funke").forEach(function (f) { f.remove(); }); }, 1000);
  }

  function geschafft(weg, stein, nr) {
    T.speicher.aendere("steine", function (alle) {
      alle[weg.id] = alle[weg.id] || {};
      alle[weg.id][stein.schluessel] = (alle[weg.id][stein.schluessel] || 0) + 1;
      return alle;
    });
    var fund = T.schatzDazu ? T.schatzDazu("i-stern", T.fuelle(T.inhalt.mutSchatz.stein, { text: stein.text })) : null;
    sprechblase([T.zufall(I.lob), I.oft]);
    if (fund) $("steine-blase").appendChild(T.fundHinweis(fund));
    szene.stelle(1);
    T.nicken(szene.sokrates);
    maleWeg(nr);
  }

  function frage(weg, stein, nr) {
    var schon = anzahl(weg.id, stein.schluessel);
    T.dialog({
      titel: I.frage,
      inhalt: [
        T.el("p", { style: "font-size:26px;font-weight:700;line-height:1.35", text: stein.text }),
        schon ? T.el("p", { class: "leise", text: "Schon " + schon + "-mal geschafft." }) : null
      ].filter(Boolean),
      knoepfe: [
        { text: I.geschafft, haupt: true, aktion: function () { geschafft(weg, stein, nr); } },
        { text: I.nochNicht }
      ]
    });
  }

  function maleWeg(neuNr) {
    var weg = aktuellerWeg();
    var bereich = $("weg-bereich");
    bereich.textContent = "";

    $("weg-wahl").querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.weg === weg.id));
    });

    var steine = steineVon(weg);
    var hoechster = -1;
    steine.forEach(function (s, i) { if (anzahl(weg.id, s.schluessel) > 0) hoechster = i; });

    var liste = T.el("ol", { class: "steine", "aria-label": weg.name });
    steine.forEach(function (s, i) {
      var oft = anzahl(weg.id, s.schluessel);
      var knopf = T.el("button", {
        type: "button",
        class: "stein" + (oft ? " geschafft" : "") + (i === neuNr ? " neu" : ""),
        onclick: function () { frage(weg, s, i); }
      }, [
        T.el("span", { class: "form" }, [oft ? T.bild("i-stern", null, "geschafft") : T.el("span", { text: String(i + 1) })]),
        T.el("span", {}, [
          oft ? T.el("span", { class: "nur-vorleser", text: "Stein " + (i + 1) + ": " }) : null,
          s.text,
          oft ? T.el("span", { class: "wie-oft", text: oft === 1 ? "geschafft!" : oft + "-mal geschafft!" }) : null
        ])
      ]);
      var li = T.el("li", {}, [knopf]);
      if (i === hoechster) li.appendChild(T.bild("sokrates-1", "sitzt"));
      liste.appendChild(li);
    });

    var teich = T.el("div", { class: "teich-weg" }, [
      T.el("div", { class: "ufer-text oben" }, [T.bild("i-fuss"), I.start]),
      steine.length ? liste : T.el("p", { style: "padding:20px", text: I.eigenLeer }),
      T.el("div", { class: "ufer-text unten" }, [T.bild("i-stern"), I.ziel])
    ]);
    bereich.appendChild(teich);

    if (weg.id === "eigen") bereich.appendChild(eigenEditor());

    if (typeof neuNr !== "number") T.nacheinander(liste);
    if (typeof neuNr === "number") {
      var neu = liste.querySelectorAll(".stein")[neuNr];
      funken(neu);
      var sitzt = liste.querySelector(".sitzt");
      if (sitzt && !T.wenigBewegung()) sitzt.classList.add("hopst");
      // erst nach dem Schließen des Dialogs fokussieren
      if (neu) setTimeout(function () { neu.focus(); }, 30);
    }
  }

  function eigenEditor() {
    var steine = T.speicher.get("eigenerWeg");
    var box = T.el("div", { class: "kasten" }, [T.el("p", { class: "lesen", text: I.eigenIntro })]);
    var liste = T.el("ul", { class: "eigen-liste" });

    function verschiebe(i, um) {
      T.speicher.aendere("eigenerWeg", function (arr) {
        var j = i + um;
        if (j < 0 || j >= arr.length) return arr;
        var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        return arr;
      });
      maleWeg();
    }

    steine.forEach(function (s, i) {
      liste.appendChild(T.el("li", {}, [
        T.el("span", { text: (i + 1) + ". " + s.text }),
        T.el("button", { type: "button", class: "knopf klein", "aria-label": "Nach oben", text: "↑", disabled: i === 0, onclick: function () { verschiebe(i, -1); } }),
        T.el("button", { type: "button", class: "knopf klein", "aria-label": "Nach unten", text: "↓", disabled: i === steine.length - 1, onclick: function () { verschiebe(i, 1); } }),
        T.el("button", { type: "button", class: "knopf klein gefahr", "aria-label": "Stein löschen", text: "✕", onclick: function () {
          T.dialog({
            titel: "Stein löschen?",
            inhalt: [T.el("p", { text: s.text })],
            knoepfe: [
              { text: "Ja, löschen", gefahr: true, aktion: function () {
                T.speicher.aendere("eigenerWeg", function (arr) { return arr.filter(function (x) { return x.id !== s.id; }); });
                maleWeg();
              } },
              { text: "Nein, behalten", haupt: true }
            ]
          });
        } })
      ]));
    });
    if (steine.length) box.appendChild(liste);

    var eingabe = T.el("input", { type: "text", id: "eigen-text", maxlength: "120", placeholder: "z. B. Ich winke der Nachbarin." });
    function dazu() {
      var text = eingabe.value.trim();
      if (!text) { eingabe.focus(); return; }
      T.speicher.aendere("eigenerWeg", function (arr) { arr.push({ id: T.neueId(), text: text }); return arr; });
      maleWeg();
      var neu = $("eigen-text");
      if (neu) neu.focus();
    }
    eingabe.addEventListener("keydown", function (e) { if (e.key === "Enter") dazu(); });
    box.appendChild(T.el("label", { for: "eigen-text", class: "nur-vorleser", text: "Neuer Mut-Stein" }));
    box.appendChild(T.el("div", { class: "eigen-neu" }, [
      eingabe,
      T.el("button", { type: "button", class: "knopf haupt", text: "+ Stein dazu", onclick: dazu })
    ]));
    return box;
  }

  T.ansichten["mut-steine"] = {
    zeige: function () {
      if (!szene) {
        szene = T.szene({ level: 1 });
        $("steine-szene").appendChild(szene);
        I.wege.forEach(function (w) {
          $("weg-wahl").appendChild(T.el("button", {
            type: "button", class: "knopf", "data-weg": w.id, "aria-pressed": "false",
            onclick: function () { T.speicher.set("letzterWeg", w.id); maleWeg(); }
          }, [T.bild(w.bild), w.name]));
        });
      }
      sprechblase(I.intro);
      maleWeg();
    }
  };
})(window.Teich);
