/* Gestalten: Comic-Werkstatt – drei Bilder mit Ort, Figuren und Blasen (sagen, denken, flüstern, Karte, zeigen).
   Alle Texte bleiben reiner Text (kein innerHTML), Entwürfe und das Comic-Heft liegen nur auf dem Gerät. */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.comic;
  var $ = function (id) { return document.getElementById(id); };
  var MAX_TEXT = 40, MAX_TITEL = 30, MAX_HEFT = 20, SEITEN = ["links", "rechts"];
  var comic = null, aktiv = 0;

  function eintrag(liste, id) { return liste.find(function (x) { return x.id === id; }); }
  function rein(t, n) { return Array.from(String(t || "").replace(/[\u0000-\u001f\u007f]/g, " ")).slice(0, n).join(""); }

  // Auch alte oder unvollständige Daten lassen sich darstellen
  function normFigur(f) {
    f = f && typeof f === "object" ? f : {};
    return {
      wer: eintrag(I.figuren, f.wer) ? f.wer : "",
      lvl: [1, 3, 5].indexOf(Number(f.lvl)) >= 0 ? Number(f.lvl) : 1,
      art: eintrag(I.blasen, f.art) ? f.art : "",
      text: rein(f.text, MAX_TEXT),
      geste: eintrag(I.gesten, f.geste) ? f.geste : "i-zeigen"
    };
  }
  function normBild(b) { b = b && typeof b === "object" ? b : {}; return { ort: eintrag(I.orte, b.ort) ? b.ort : "teich", links: normFigur(b.links), rechts: normFigur(b.rechts) }; }
  function normComic(c) {
    c = c && typeof c === "object" ? c : {};
    var bilder = Array.isArray(c.bilder) ? c.bilder : [];
    return { titel: rein(c.titel, MAX_TITEL), bilder: [0, 1, 2].map(function (i) { return normBild(bilder[i]); }) };
  }

  function stand() { var s = T.abenteuer("comic"); s.heft = Array.isArray(s.heft) ? s.heft : []; return s; }
  function speichere() { var s = stand(); s.entwurf = comic; T.abenteuerSpeichern("comic", s); }

  function beschreibung(b, nr) {
    var teile = [T.fuelle(I.bild, { nr: nr + 1 }) + ", " + eintrag(I.orte, b.ort).name + "."];
    SEITEN.forEach(function (seite) {
      var f = b[seite];
      if (!f.wer) return;
      var name = eintrag(I.figuren, f.wer).name;
      if (f.art === "zeigt") teile.push(name + " zeigt: " + eintrag(I.gesten, f.geste).name + ".");
      else if (f.art && f.text) teile.push(name + " " + eintrag(I.blasen, f.art).name + ": „" + f.text + "“.");
      else teile.push(name + ".");
    });
    return teile.join(" ");
  }

  function bildPanel(b, nr) {
    var p = T.el("div", { class: "cm-bild ort-" + b.ort, role: "img", "aria-label": beschreibung(b, nr) });
    p.appendChild(T.el("span", { class: "cm-nr", "aria-hidden": "true", text: String(nr + 1) }));
    p.appendChild(T.el("span", { class: "cm-deko", "aria-hidden": "true" }, [T.bild(eintrag(I.orte, b.ort).bild)]));
    SEITEN.forEach(function (seite) {
      var f = b[seite];
      if (!f.wer) return;
      var spalte = T.el("div", { class: "cm-figur " + seite + (f.wer === "sokrates" ? " sokrates" : "") });
      if (f.art === "zeigt") spalte.appendChild(T.el("div", { class: "cm-geste" }, [T.bild(f.geste)]));
      else if (f.art && f.text) spalte.appendChild(T.el("p", { class: "cm-blase " + f.art, text: f.text }));
      else spalte.appendChild(T.el("span", { class: "cm-platz" }));
      spalte.appendChild(T.bild(f.wer === "sokrates" ? "sokrates-" + f.lvl : eintrag(I.figuren, f.wer).bild, "cm-wer"));
      p.appendChild(spalte);
    });
    return p;
  }

  function heftSeite(c, klein) {
    return T.el("div", { class: "cm-seite" + (klein ? " klein" : "") }, c.bilder.map(function (b, i) { return bildPanel(b, i); }));
  }

  // ---------- Bearbeiten ----------
  function wahlGruppe(titel, liste, aktuell, beiWahl, schluessel, mitBild) {
    var gruppe = T.el("div", { class: "cm-wahl", role: "group", "aria-label": titel });
    liste.forEach(function (x) {
      gruppe.appendChild(T.el("button", {
        type: "button", class: "knopf klein cm-wahl-knopf", "aria-pressed": String(x.id === aktuell), "data-key": schluessel + ":" + x.id,
        onclick: function () { beiWahl(x.id); }
      }, [mitBild ? T.bild(x.bild || x.id) : null, x.name]));
    });
    return T.el("div", { class: "cm-feld" }, [T.el("p", { class: "werkzeug-titel", text: titel }), gruppe]);
  }

  function aendere(fn) {
    fn(comic.bilder[aktiv]);
    speichere();
    zeigeHeft();
    zeigeEditor();
  }

  function figurEditor(seite) {
    var f = comic.bilder[aktiv][seite];
    var box = T.el("section", { class: "cm-figur-editor" }, [T.el("h3", { class: "lesen", text: I[seite] })]);
    box.appendChild(wahlGruppe(I.figurTitel, I.figuren, f.wer, function (id) { aendere(function (b) { b[seite].wer = id; }); }, seite + "-wer", true));
    if (!f.wer) return box;
    if (f.wer === "sokrates") box.appendChild(wahlGruppe(I.stimmung, I.stimmungen, f.lvl, function (id) { aendere(function (b) { b[seite].lvl = id; }); }, seite + "-lvl", false));
    box.appendChild(wahlGruppe(I.blaseTitel, I.blasen, f.art, function (id) { aendere(function (b) { b[seite].art = id; }); }, seite + "-art", false));
    if (f.art === "zeigt") {
      box.appendChild(wahlGruppe(I.gesteTitel, I.gesten, f.geste, function (id) { aendere(function (b) { b[seite].geste = id; }); }, seite + "-geste", true));
    } else if (f.art) {
      var id = "cm-text-" + seite;
      var feld = T.el("input", { type: "text", id: id, maxlength: String(MAX_TEXT), autocomplete: "off", value: f.text, "data-key": seite + "-text" });
      feld.addEventListener("input", function () {
        comic.bilder[aktiv][seite].text = rein(feld.value, MAX_TEXT);
        speichere();
        zeigeHeft();
      });
      box.appendChild(T.el("div", { class: "cm-feld" }, [T.el("label", { for: id, class: "werkzeug-titel", text: I.textFeld }), feld]));
    }
    return box;
  }

  function zeigeEditor() {
    var box = $("cm-editor");
    var fokus = document.activeElement && box.contains(document.activeElement) ? document.activeElement.getAttribute("data-key") : null;
    box.textContent = "";
    var b = comic.bilder[aktiv];
    box.appendChild(T.el("h2", { class: "lesen", text: T.fuelle(I.bearbeiten, { nr: aktiv + 1 }) }));
    box.appendChild(wahlGruppe(I.ortTitel, I.orte, b.ort, function (id) { aendere(function (x) { x.ort = id; }); }, "ort", true));
    box.appendChild(T.el("div", { class: "cm-figuren" }, SEITEN.map(figurEditor)));
    if (fokus) { var k = box.querySelector('[data-key="' + fokus + '"]'); if (k) k.focus({ preventScroll: true }); }
  }

  function zeigeHeft() {
    var box = $("cm-heft");
    box.textContent = "";
    comic.bilder.forEach(function (b, i) {
      box.appendChild(T.el("div", { class: "cm-zelle" + (i === aktiv ? " aktiv" : "") }, [
        bildPanel(b, i),
        T.el("button", { type: "button", class: "knopf klein", "aria-pressed": String(i === aktiv), text: T.fuelle(I.bearbeiten, { nr: i + 1 }), onclick: function () {
          aktiv = i; zeigeHeft(); zeigeEditor();
          var h = $("cm-editor").querySelector("h2"); if (h) h.scrollIntoView({ behavior: T.wenigBewegung() ? "auto" : "smooth", block: "start" });
        } })
      ]));
    });
  }

  function drucke(c) {
    T.drucke([T.el("div", { class: "cm-blatt" }, [T.el("h1", { text: c.titel || I.ohneTitel }), heftSeite(c, false)])], "cm-druck");
  }

  function zeigeSammlung() {
    var box = $("cm-sammlung");
    box.textContent = "";
    var s = stand();
    box.appendChild(T.el("h2", { class: "lesen", text: I.heftTitel }));
    if (!s.heft.length) { box.appendChild(T.el("p", { class: "leise", text: I.heftLeer })); return; }
    var liste = T.el("ul", { class: "cm-liste" });
    s.heft.slice().reverse().forEach(function (e) {
      var c = normComic(e.comic);
      liste.appendChild(T.el("li", {}, [
        T.el("h3", { text: c.titel || I.ohneTitel }),
        heftSeite(c, true),
        T.el("div", { class: "knoepfe" }, [
          T.el("button", { type: "button", class: "knopf klein", text: I.oeffnen, onclick: function () { comic = normComic(c); aktiv = 0; speichere(); zeigeAlles(); $("cm-titel").focus(); } }),
          T.el("button", { type: "button", class: "knopf klein", text: I.drucken, onclick: function () { drucke(c); } }),
          T.el("button", { type: "button", class: "knopf klein gefahr", text: I.loeschen, onclick: function () {
            T.dialog({ titel: I.loeschenFrage, knoepfe: [{ text: I.loeschen, gefahr: true, aktion: function () {
              var st = stand(); st.heft = st.heft.filter(function (x) { return x.id !== e.id; }); T.abenteuerSpeichern("comic", st); zeigeSammlung();
            } }, { text: "Behalten", haupt: true }] });
          } })
        ])
      ]));
    });
    box.appendChild(liste);
  }

  function zeigeAlles() {
    $("cm-titel").value = comic.titel;
    zeigeHeft();
    zeigeEditor();
    zeigeSammlung();
  }

  function baue() {
    var box = $("cm-spiel");
    box.textContent = "";
    var titel = T.el("input", { type: "text", id: "cm-titel", maxlength: String(MAX_TITEL), autocomplete: "off", placeholder: I.titelBeispiel });
    titel.addEventListener("input", function () { comic.titel = rein(titel.value, MAX_TITEL); speichere(); });
    var meldung = T.el("p", { class: "lesen", role: "status", "aria-live": "polite" });
    box.appendChild(T.el("div", { class: "cm-feld cm-titel-feld" }, [T.el("label", { for: "cm-titel", class: "werkzeug-titel", text: I.titelFeld }), titel]));
    box.appendChild(T.el("div", { class: "cm-heft", id: "cm-heft" }));
    box.appendChild(T.el("div", { class: "knoepfe" }, [
      T.el("button", { type: "button", class: "knopf haupt", text: I.ablegen, onclick: function () {
        var s = stand();
        if (s.heft.length >= MAX_HEFT) { meldung.textContent = I.voll; return; }
        s.heft.push({ id: T.neueId(), zeit: Date.now(), comic: normComic(comic) });
        T.abenteuerSpeichern("comic", s);
        meldung.textContent = I.abgelegt;
        zeigeSammlung();
      } }),
      T.el("button", { type: "button", class: "knopf", text: I.drucken, onclick: function () { drucke(comic); } }),
      T.el("button", { type: "button", class: "knopf", text: I.neu, onclick: function () {
        T.dialog({ titel: I.vorlagenTitel, inhalt: [T.el("p", { text: I.vorlageFrage })], knoepfe: I.vorlagen.map(function (v) {
          return { text: v.name, aktion: function () { comic = normComic(v); aktiv = 0; speichere(); meldung.textContent = ""; zeigeAlles(); } };
        }).concat([{ text: "Abbrechen", haupt: true }]) });
      } })
    ]));
    box.appendChild(meldung);
    box.appendChild(T.el("div", { class: "cm-editor", id: "cm-editor" }));
    box.appendChild(T.el("section", { class: "cm-sammlung", id: "cm-sammlung" }));
  }

  T.comicNorm = normComic;   // für Tests

  T.ansichten["spiel-comic"] = {
    zeige: function () {
      T.absaetze($("cm-blase"), I.intro);
      if (!$("cm-heft")) baue();
      var s = stand();
      comic = normComic(s.entwurf || I.vorlagen[0]);
      aktiv = Math.min(aktiv, 2);
      zeigeAlles();
    }
  };
})(window.Teich);
