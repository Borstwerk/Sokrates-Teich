/* Für Erwachsene: Wegweiser „Hilfe finden“ – Wege zur Therapie, Anfragen-Liste, Brief an Praxen, Steckbrief.
   Alle Eingaben bleiben im Browser (wie der Rest der Seite) und sind in der Sicherung enthalten. */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.wegweiser;
  var $ = function (id) { return document.getElementById(id); };
  var gebaut = false;

  function rein(t, n) { return Array.from(String(t || "").replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, " ")).slice(0, n).join(""); }
  function datumText(iso) {
    if (!iso) return "";
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    return m ? m[3] + "." + m[2] + "." + m[1] : iso;
  }
  function heute() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }

  function feld(id, label, eingabe) {
    return T.el("div", { class: "feld" }, [T.el("label", { for: id, text: label }), eingabe]);
  }
  function textFeld(id, wert, max, beispiel) {
    var f = T.el("input", { type: "text", id: id, maxlength: String(max), autocomplete: "off", placeholder: beispiel || null });
    f.value = wert || "";
    return f;
  }
  function auswahl(id, liste) {
    return T.el("select", { id: id }, liste.map(function (x) { return T.el("option", { value: x, text: x }); }));
  }

  // ---------- Wege ----------
  function baueWege() {
    $("wg-intro").textContent = I.intro;
    $("wg-stand").textContent = I.stand;
    var w = $("wg-wichtig");
    w.textContent = "";
    w.appendChild(T.el("p", {}, [T.el("strong", { text: I.wichtigTitel })]));
    I.wichtig.forEach(function (t) { w.appendChild(T.el("p", { text: t })); });
    $("wg-wege-titel").textContent = I.wegeTitel;
    var liste = $("wg-wege-liste");
    liste.textContent = "";
    I.wege.forEach(function (weg) {
      liste.appendChild(T.el("li", { class: "wg-weg" }, [
        T.el("div", { class: "lk-kopf" }, [T.bild(weg.bild), T.el("h3", { text: weg.titel })]),
        T.el("ul", {}, weg.punkte.map(function (p) { return T.el("li", { text: p }); }))
      ]));
    });
    $("wg-warten-titel").textContent = I.wartenTitel;
    var warten = $("wg-warten");
    warten.textContent = "";
    I.warten.forEach(function (t) { warten.appendChild(T.el("li", { text: t })); });
    $("wg-hinweis").textContent = I.hinweis;
  }

  // ---------- Anfragen-Liste ----------
  var S = I.suche;
  function anfragen() { return (T.speicher.get("suchListe") || []).filter(function (e) { return e && typeof e === "object"; }); }

  function tabelle(mitLoeschen) {
    var liste = anfragen().slice().sort(function (a, b) { return String(a.datum).localeCompare(String(b.datum)); });
    var kopf = [S.datum, S.praxis, S.art, S.weg, S.antwort, S.wartezeit, S.notiz];
    return T.el("table", { class: "tabelle wg-tabelle" }, [
      T.el("thead", {}, [T.el("tr", {}, kopf.map(function (k) { return T.el("th", { scope: "col", text: k }); })
        .concat(mitLoeschen ? [T.el("th", { scope: "col" }, [T.el("span", { class: "nur-vorleser", text: S.loeschen })])] : []))]),
      T.el("tbody", {}, liste.map(function (e) {
        var zellen = [datumText(e.datum), e.praxis, e.art, e.weg, e.antwort, e.wartezeit, e.notiz].map(function (t) { return T.el("td", { text: t || "" }); });
        if (mitLoeschen) zellen.push(T.el("td", {}, [T.el("button", { type: "button", class: "knopf klein gefahr", "aria-label": S.loeschen + ": " + e.praxis, onclick: function () {
          T.dialog({ titel: S.loeschenFrage, inhalt: [T.el("p", { text: e.praxis + " (" + datumText(e.datum) + ")" })], knoepfe: [
            { text: S.loeschen, gefahr: true, aktion: function () { T.speicher.aendere("suchListe", function (a) { return (a || []).filter(function (x) { return x.id !== e.id; }); }); zeigeListe(); } },
            { text: "Behalten", haupt: true }
          ] });
        } }, [S.loeschen])]));
        return T.el("tr", {}, zellen);
      }))
    ]);
  }

  function zeigeListe() {
    var box = $("wg-suche-liste");
    box.textContent = "";
    var liste = anfragen();
    var absagen = liste.filter(function (e) { return e.antwort === S.antworten[0] || e.antwort === S.antworten[2]; }).length;
    $("wg-suche-zaehler").textContent = liste.length ? T.fuelle(S.zaehler, { anzahl: liste.length, absagen: absagen }) : "";
    if (!liste.length) { box.appendChild(T.el("p", { class: "leise", text: S.leer })); return; }
    box.appendChild(tabelle(true));
    box.appendChild(T.el("div", { class: "knoepfe" }, [T.el("button", { type: "button", class: "knopf", text: S.drucken, onclick: druckeListe })]));
  }

  function druckeListe() {
    T.drucke([T.el("div", { class: "wg-blatt" }, [
      T.el("h1", { text: S.druckTitel }),
      T.el("div", { class: "wg-druck-felder" }, S.druckFelder.map(function (f, i) {
        var wert = i === 0 ? String(T.speicher.get("name") || "") : "";
        return T.el("div", { class: "lk-zeile" }, [T.el("span", { class: "lk-label", text: f }), T.el("span", { class: "lk-wert" + (wert ? "" : " leer"), text: wert })]);
      })),
      tabelle(false),
      T.el("div", { class: "lk-zeile wg-unterschrift" }, [T.el("span", { class: "lk-label", text: S.unterschrift }), T.el("span", { class: "lk-wert leer" })]),
      T.el("p", { class: "lk-fuss", text: S.druckFuss })
    ])], "wg-druck");
  }

  function baueSuche() {
    $("wg-suche-titel").textContent = S.titel;
    $("wg-suche-text").textContent = S.text;
    var form = $("wg-suche-form");
    form.textContent = "";
    var praxis = textFeld("wg-praxis", "", 80);
    var art = auswahl("wg-art", S.arten);
    var datum = T.el("input", { type: "date", id: "wg-datum" });
    datum.value = heute();
    var weg = auswahl("wg-weg", S.wege);
    var antwort = auswahl("wg-antwort", S.antworten);
    var wartezeit = textFeld("wg-wartezeit", "", 40, "z. B. 9 Monate");
    var notiz = textFeld("wg-notiz", "", 120);
    form.appendChild(T.el("div", { class: "wg-raster" }, [
      feld("wg-praxis", S.praxis, praxis), feld("wg-art", S.art, art), feld("wg-datum", S.datum, datum),
      feld("wg-weg", S.weg, weg), feld("wg-antwort", S.antwort, antwort), feld("wg-wartezeit", S.wartezeit, wartezeit)
    ]));
    form.appendChild(feld("wg-notiz", S.notiz, notiz));
    form.appendChild(T.el("div", { class: "knoepfe" }, [T.el("button", { type: "button", class: "knopf haupt", text: S.eintragen, onclick: function () {
      var meldung = $("wg-suche-meldung");
      if (!praxis.value.trim()) { meldung.textContent = S.fehltPraxis; praxis.focus(); return; }
      var eintrag = {
        id: T.neueId(), praxis: rein(praxis.value.trim(), 80), art: art.value, datum: /^\d{4}-\d{2}-\d{2}$/.test(datum.value) ? datum.value : heute(),
        weg: weg.value, antwort: antwort.value, wartezeit: rein(wartezeit.value.trim(), 40), notiz: rein(notiz.value.trim(), 120)
      };
      T.speicher.aendere("suchListe", function (a) { return (a || []).concat([eintrag]); });
      meldung.textContent = "";
      praxis.value = ""; wartezeit.value = ""; notiz.value = "";
      zeigeListe();
      praxis.focus();
    } })]));
    zeigeListe();
  }

  // ---------- Brief an Praxen ----------
  var B = I.brief;
  function briefDaten() {
    var name = String(T.speicher.get("name") || "").trim();
    var alter = String(T.speicher.get("wgAlter") || "").trim();
    return {
      absaetze: B.absaetze.map(function (a, i) {
        return i === 0 ? a.replace("{name}", name ? " " + name : "").replace("{alter}", alter ? " (" + alter + ")" : "") : a;
      }),
      eltern: String(T.speicher.get("lkEltern") || "").trim(),
      kontakt: String(T.speicher.get("lkKontakt") || "").trim()
    };
  }
  function briefText() {
    var d = briefDaten();
    return ["Betreff: " + B.betreff, "", B.anrede, ""].concat(d.absaetze.join("\n\n").split("\n")).concat(["", B.gruss, d.eltern, d.kontakt, "", B.quellen]).join("\n").replace(/\n{3,}/g, "\n\n").trim();
  }
  function briefBlatt() {
    var d = briefDaten();
    return T.el("article", { class: "blatt wg-brief" }, [
      T.el("p", { class: "wg-betreff", text: B.betreff }),
      T.el("p", { text: B.anrede })
    ].concat(d.absaetze.map(function (a) { return T.el("p", { text: a }); })).concat([
      T.el("p", { class: "wg-gruss" }, [B.gruss, T.el("br"), d.eltern || "", d.eltern ? T.el("br") : null, d.kontakt || ""]),
      T.el("p", { class: "lk-fuss", text: B.quellen })
    ]));
  }
  function zeigeBrief() { var v = $("wg-brief-vorschau"); v.textContent = ""; v.appendChild(briefBlatt()); }

  function baueBrief() {
    $("wg-brief-titel").textContent = B.titel;
    $("wg-brief-text").textContent = B.text;
    var form = $("wg-brief-form");
    form.textContent = "";
    var felder = [["wg-alter", "wgAlter", B.alter, 20, B.alterBeispiel], ["wg-eltern", "lkEltern", B.absender, 60], ["wg-kontakt", "lkKontakt", B.kontakt, 60]];
    form.appendChild(T.el("div", { class: "wg-raster" }, felder.map(function (f) {
      var eingabe = textFeld(f[0], T.speicher.get(f[1]), f[3], f[4]);
      eingabe.addEventListener("input", function () { T.speicher.set(f[1], eingabe.value); zeigeBrief(); });
      return feld(f[0], f[2], eingabe);
    })));
    $("wg-brief-drucken").textContent = B.drucken;
    $("wg-brief-kopieren").textContent = B.kopieren;
    zeigeBrief();
  }
  $("wg-brief-drucken").addEventListener("click", function () { T.drucke([briefBlatt()], "wg-druck"); });
  $("wg-brief-kopieren").addEventListener("click", function () {
    var text = briefText(), meldung = $("wg-brief-meldung");
    function ersatz() {
      meldung.textContent = B.kopierenGeht;
      var feldText = T.el("textarea", { class: "wg-kopie", rows: "12", "aria-label": B.kopieren, readonly: true });
      feldText.value = text;
      var alt = $("wg-brief-vorschau").parentNode.querySelector(".wg-kopie");
      if (alt) alt.remove();
      $("wg-brief-vorschau").parentNode.insertBefore(feldText, $("wg-brief-vorschau"));
      feldText.focus(); feldText.select();
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { meldung.textContent = B.kopiert; }, ersatz);
      else ersatz();
    } catch (e) { ersatz(); }
  });

  // ---------- Steckbrief ----------
  var K = I.steckbrief;
  function ausDerSeite() {
    var zeilen = [];
    zeilen.push([K.mutSchatz, String((T.speicher.get("schatz") || []).length)]);
    // Mut-Steine: jeder mindestens einmal geschaffte Stein
    var steine = T.speicher.get("steine") || {}, geschafft = [];
    T.inhalt.mutSteine.wege.forEach(function (weg) {
      var liste = weg.id === "eigen" ? (T.speicher.get("eigenerWeg") || []).map(function (s) { return [s.id, s.text]; }) : weg.steine.map(function (t, i) { return [String(i), t]; });
      liste.forEach(function (s) { if ((steine[weg.id] || {})[s[0]] > 0) geschafft.push(s[1]); });
    });
    zeilen.push([K.mutSteine, geschafft.length ? geschafft : K.keineSteine]);
    // Körper
    var zaehl = {};
    (T.speicher.get("koerperNotizen") || []).forEach(function (n) { zaehl[n.stelle] = (zaehl[n.stelle] || 0) + 1; });
    var koerper = Object.keys(zaehl).sort(function (a, b) { return zaehl[b] - zaehl[a]; }).map(function (id) {
      var st = T.koerperStelle && T.koerperStelle(id); return (st ? st.name : id) + " (" + zaehl[id] + "×)";
    });
    zeilen.push([K.koerper, koerper.length ? koerper.join(", ") : K.nichts]);
    // Alarmanlagen-Detektiv: laute Situationen der letzten Runde
    var runden = T.speicher.get("alarmRunden") || [], letzte = runden[runden.length - 1];
    var laut = letzte ? letzte.antworten.filter(function (a) { return a.stufe === "laut"; }).map(function (a) { return a.text; }) : [];
    zeilen.push([K.alarm, laut.length ? laut : K.nichts]);
    // Alarmzentrale
    var hilfen = ((T.speicher.get("abenteuer") || {}).zentrale || {}).hilfen || {};
    var oft = Object.keys(hilfen).sort(function (a, b) { return hilfen[b] - hilfen[a]; }).slice(0, 3).map(function (id) {
      var w = T.inhalt.zentrale.werkzeuge.find(function (x) { return x.id === id; }); return w ? w.name : id;
    });
    zeilen.push([K.hilfen, oft.length ? oft.join(", ") : K.nichts]);
    // Stimmen-Karte (vom Kind gelegt)
    if (T.stimmenKarteZonen) T.stimmenKarteZonen().forEach(function (g) {
      zeilen.push([K.karte + ": " + g.zone.titel, g.namen.length ? g.namen.join(", ") : K.nichts]);
    });
    return zeilen;
  }

  function steckbriefBlatt() {
    var name = String(T.speicher.get("name") || "").trim(), alter = String(T.speicher.get("wgAlter") || "").trim();
    var kopf = T.el("header", { class: "lk-titel" }, [T.bild("sokrates-1"), T.el("div", {}, [
      T.el("h2", { text: K.druckTitel + (name ? ": " + name : "") + (alter ? " (" + alter + ")" : "") }),
      T.el("p", { text: K.druckUnter })
    ])]);
    var beobachtet = T.el("section", { class: "lk-abschnitt" }, K.felder.map(function (f) {
      var wert = String(T.speicher.get(f[0]) || "").trim();
      return T.el("div", { class: "lk-zeile" }, [T.el("span", { class: "lk-label", text: f[1] }), T.el("span", { class: "lk-wert" + (wert ? "" : " leer"), text: wert })]);
    }));
    var seite = T.el("section", { class: "lk-abschnitt" }, [
      T.el("div", { class: "lk-kopf" }, [T.bild("i-stern"), T.el("h3", { text: K.ausSeite })]),
      T.el("p", { class: "leise", text: K.ausSeiteText })
    ].concat(ausDerSeite().map(function (z) {
      var wert = Array.isArray(z[1]) ? T.el("ul", {}, z[1].map(function (t) { return T.el("li", { text: t }); })) : T.el("span", { class: "lk-wert", text: z[1] });
      return T.el("div", { class: "lk-zeile wg-seite-zeile" }, [T.el("span", { class: "lk-label", text: z[0] }), wert]);
    })));
    return T.el("article", { class: "blatt wg-steckbrief" }, [kopf, beobachtet, seite, T.el("p", { class: "lk-fuss", text: S.druckFuss })]);
  }
  function zeigeSteckbrief() { var v = $("wg-steck-vorschau"); v.textContent = ""; v.appendChild(steckbriefBlatt()); }

  function baueSteckbrief() {
    $("wg-steck-titel").textContent = K.titel;
    $("wg-steck-text").textContent = K.text;
    var form = $("wg-steck-form");
    form.textContent = "";
    K.felder.forEach(function (f) {
      var id = "wg-f-" + f[0];
      var eingabe = T.el("textarea", { id: id, rows: "2", maxlength: "300", placeholder: f[2] });
      eingabe.value = T.speicher.get(f[0]) || "";
      eingabe.addEventListener("input", function () { T.speicher.set(f[0], eingabe.value); zeigeSteckbrief(); });
      form.appendChild(feld(id, f[1], eingabe));
    });
    $("wg-steck-drucken").textContent = K.drucken;
    zeigeSteckbrief();
  }
  $("wg-steck-drucken").addEventListener("click", function () { T.drucke([steckbriefBlatt()], "wg-druck blatt-druck"); });

  T.wegweiserBriefText = briefText;   // für Tests

  T.ansichten.wegweiser = {
    zeige: function () {
      if (!gebaut) { baueWege(); gebaut = true; }
      baueSuche();
      baueBrief();
      baueSteckbrief();
    }
  };
})(window.Teich);
