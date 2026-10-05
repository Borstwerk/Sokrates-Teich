/* Für Erwachsene – Einstellungen, Sicherung, Zurücksetzen */
(function (T) {
  T.ansichten = T.ansichten || {};
  var $ = function (id) { return document.getElementById(id); };
  var gespeichertUhr;

  function gespeichert() {
    $("e-gespeichert").textContent = T.speicher.funktioniert() ? "Gespeichert." : "Konnte nicht speichern.";
    clearTimeout(gespeichertUhr);
    gespeichertUhr = setTimeout(function () { $("e-gespeichert").textContent = ""; }, 2500);
  }

  function stimmenListe() {
    var select = $("e-stimme");
    var stimmen = T.vorlesen.stimmen();
    select.textContent = "";
    select.appendChild(T.el("option", { value: "", text: "Automatisch (deutsche Stimme)" }));
    stimmen.forEach(function (v) {
      select.appendChild(T.el("option", { value: v.name, text: v.name + " (" + v.lang + ")" }));
    });
    select.value = T.speicher.get("stimme") || "";
    if (stimmen.length) select.options[0].textContent = "Automatisch – beste Stimme: " + stimmen[0].name;
    $("e-stimme-hinweis").textContent = !T.vorlesen.verfuegbar()
      ? "Dieser Browser kann leider nicht vorlesen."
      : (stimmen.length ? "" : "Keine deutsche Stimme gefunden. Unter Windows: Einstellungen → Zeit und Sprache → Sprache → Deutsch → Sprachpaket mit Sprachausgabe installieren.");
  }

  function fuelleFormular() {
    $("e-name").value = T.speicher.get("name") || "";
    $("e-vorlesen").checked = !!T.speicher.get("vorlesen");
    $("e-tempo").value = T.speicher.get("tempo");
    $("e-ziel").value = T.speicher.get("ziel");
    $("e-bewegung").value = T.speicher.get("bewegung") || "auto";
    $("e-spiele").checked = T.spieleAn();
    alarmErgebnis();
    zentraleErgebnis();
    stimmenErgebnis();
    koerperNotizen();
    $("e-belohnung").value = T.speicher.get("belohnung") || "";
    $("e-stimme-feld").hidden = !T.vorlesen.verfuegbar();
    $("speicher-warnung").hidden = T.speicher.funktioniert();
    stimmenListe();
  }

  // Letzte Runde im Alarmanlagen-Detektiv (nur auf diesem Gerät)
  function alarmErgebnis() {
    var box = $("e-alarm");
    box.textContent = "";
    var runden = T.speicher.get("alarmRunden") || [];
    var letzte = runden[runden.length - 1];
    if (!letzte) { box.appendChild(T.el("p", { class: "leise", text: "Noch nicht gespielt." })); return; }
    var namen = { leise: "Leise", mittel: "Mittel", laut: "Laut", weiss: "Weiß nicht" };
    var datum = "";
    try { datum = new Date(letzte.zeit).toLocaleDateString("de-DE", { day: "numeric", month: "numeric", year: "numeric" }); } catch (e) { /* egal */ }
    var zeilen = letzte.antworten.map(function (a) { return T.el("tr", {}, [T.el("td", { text: a.text }), T.el("td", { text: namen[a.stufe] || a.stufe })]); });
    box.appendChild(T.el("p", { class: "leise", text: "Letzte Runde" + (datum ? " vom " + datum : "") + ":" }));
    box.appendChild(T.el("table", { class: "tabelle" }, [
      T.el("thead", {}, [T.el("tr", {}, [T.el("th", { scope: "col", text: "Situation" }), T.el("th", { scope: "col", text: "Alarmanlage" })])]),
      T.el("tbody", {}, zeilen)
    ]));
  }

  // Häufig gewählte Hilfen in der Alarmzentrale
  // Körper-Notizen: was das Kind unter „Mein Körper“ gemerkt hat
  function koerperNotizen() {
    var box = $("e-koerper-notizen");
    box.textContent = "";
    var notizen = (T.speicher.get("koerperNotizen") || []).slice().reverse();
    if (!notizen.length) { box.appendChild(T.el("p", { class: "leise", text: "Noch keine Notizen. Unter „Mein Körper“ kann das Kind zeigen, wo es die Alarmanlage spürt, und es für euch merken." })); return; }
    function name(id) { var s = T.koerperStelle && T.koerperStelle(id); return s ? s.name : id; }
    function wann(zeit) {
      try { return new Date(zeit).toLocaleString("de-DE", { weekday: "short", day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit" }); } catch (e) { return ""; }
    }
    var tabelle = T.el("table", { class: "tabelle" }, [
      T.el("thead", {}, [T.el("tr", {}, [T.el("th", { scope: "col", text: "Wann" }), T.el("th", { scope: "col", text: "Wo im Körper" })])]),
      T.el("tbody", {}, notizen.slice(0, 30).map(function (n) { return T.el("tr", {}, [T.el("td", { text: wann(n.zeit) }), T.el("td", { text: name(n.stelle) })]); }))
    ]);
    box.appendChild(tabelle);
    box.appendChild(T.el("div", { class: "knoepfe" }, [
      T.el("button", { type: "button", class: "knopf klein", text: "Notizen drucken", onclick: function () {
        T.drucke([T.el("div", { class: "notiz-blatt" }, [T.el("h1", { text: "Körper-Notizen" }), T.el("p", { text: "Notiert in „Sokrates' Teich“. Zum Mitnehmen zu Kinderarzt oder Therapie." }), tabelle.cloneNode(true)])], "notiz-druck");
      } }),
      T.el("button", { type: "button", class: "knopf klein gefahr", text: "Notizen löschen", onclick: function () {
        T.dialog({ titel: "Alle Körper-Notizen löschen?", inhalt: [T.el("p", { text: "Die Notizen werden auf diesem Gerät gelöscht." })], knoepfe: [
          { text: "Ja, löschen", gefahr: true, aktion: function () { T.speicher.set("koerperNotizen", []); koerperNotizen(); } },
          { text: "Nein, behalten", haupt: true }
        ] });
      } })
    ]));
  }

  // Sprungmarken oben auf der Seite
  document.querySelectorAll(".e-navi [data-ziel]").forEach(function (k) {
    k.addEventListener("click", function () {
      var ziel = $(k.dataset.ziel);
      ziel.scrollIntoView({ behavior: T.wenigBewegung() ? "auto" : "smooth", block: "start" });
      ziel.focus({ preventScroll: true });
    });
  });

  // Stimmen-Karte: wer in welchem Feld liegt und was sich zuletzt bewegt hat
  function stimmenErgebnis() {
    var box = $("e-stimmen");
    box.textContent = "";
    if (!T.stimmenKarteZonen) return;
    var gruppen = T.stimmenKarteZonen(), verlauf = T.stimmenKarteVerlauf();
    if (!gruppen.some(function (g) { return g.namen.length; })) { box.appendChild(T.el("p", { class: "leise", text: "Noch nichts eingetragen." })); return; }
    box.appendChild(T.el("table", { class: "tabelle" }, [
      T.el("thead", {}, [T.el("tr", {}, [T.el("th", { scope: "col", text: "Feld" }), T.el("th", { scope: "col", text: "Personen und Orte" })])]),
      T.el("tbody", {}, gruppen.map(function (g) { return T.el("tr", {}, [T.el("td", { text: g.zone.titel }), T.el("td", { text: g.namen.join(", ") || "–" })]); }))
    ]));
    if (!verlauf.length) return;
    function wann(zeit) { try { return new Date(zeit).toLocaleDateString("de-DE"); } catch (e) { return ""; } }
    box.appendChild(T.el("p", { class: "leise", text: "Zuletzt bewegt:" }));
    box.appendChild(T.el("ul", {}, verlauf.slice(0, 10).map(function (v) {
      return T.el("li", { text: wann(v.zeit) + ": " + v.text + (v.naeher ? " ★" : "") });
    })));
  }

  function zentraleErgebnis() {
    var box = $("e-zentrale");
    box.textContent = "";
    var hilfen = ((T.speicher.get("abenteuer") || {}).zentrale || {}).hilfen || {};
    var oft = Object.keys(hilfen).sort(function (a, b) { return hilfen[b] - hilfen[a]; }).slice(0, 5);
    if (!oft.length) { box.appendChild(T.el("p", { class: "leise", text: "Noch nicht gespielt." })); return; }
    box.appendChild(T.el("p", { class: "leise", text: "Am häufigsten gewählt:" }));
    box.appendChild(T.el("ol", {}, oft.map(function (id) {
      var w = T.inhalt.zentrale.werkzeuge.find(function (x) { return x.id === id; });
      return T.el("li", { text: (w ? w.name : id) + " (" + hilfen[id] + "×)" });
    })));
  }

  $("e-spiele").addEventListener("change", function (e) { T.speicher.set("spieleAn", e.target.checked); gespeichert(); });
  $("e-name").addEventListener("input", function (e) { T.speicher.set("name", e.target.value.trim()); gespeichert(); });
  $("e-vorlesen").addEventListener("change", function (e) { T.speicher.set("vorlesen", e.target.checked); T.aktualisiereLeiste(); gespeichert(); });
  $("e-bewegung").addEventListener("change", function (e) { T.speicher.set("bewegung", e.target.value); T.setzeBewegung(); gespeichert(); });
  $("e-tempo").addEventListener("change", function (e) { T.speicher.set("tempo", Number(e.target.value)); gespeichert(); });
  $("e-stimme").addEventListener("change", function (e) { T.speicher.set("stimme", e.target.value); gespeichert(); });
  $("e-test").addEventListener("click", function () {
    T.vorlesen.sprich(T.mitName("Hallo {name}! Ich bin Sokrates. Schön, dass du da bist."));
  });
  $("e-ziel").addEventListener("change", function (e) {
    var z = Math.max(5, Math.min(60, Math.round(Number(e.target.value) || 20)));
    e.target.value = z;
    T.speicher.set("ziel", z); gespeichert();
  });
  $("e-belohnung").addEventListener("input", function (e) { T.speicher.set("belohnung", e.target.value); gespeichert(); });
  T.vorlesen.beobachte(function () {
    if (document.body.dataset.ansicht === "erwachsene" && $("e-stimme").options.length !== T.vorlesen.stimmen().length + 1) stimmenListe();
  });

  function speichereDatei(inhalt, name, typ) {
    var blob = new Blob([inhalt], { type: typ });
    var a = T.el("a", { href: URL.createObjectURL(blob), download: name });
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  $("e-export").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify(T.speicher.alles(), null, 2)], { type: "application/json" });
    var a = T.el("a", { href: URL.createObjectURL(blob), download: "sokrates-teich-sicherung-" + new Date().toISOString().slice(0, 10) + ".json" });
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  });

  $("e-import").addEventListener("change", function (e) {
    var datei = e.target.files && e.target.files[0];
    if (!datei) return;
    var leser = new FileReader();
    leser.onload = function () {
      try {
        var obj = JSON.parse(leser.result);
        if (!obj || typeof obj !== "object" || !Array.isArray(obj.schatz)) throw new Error("ungültig");
        T.dialog({
          titel: "Sicherung laden?",
          inhalt: [T.el("p", { text: "Der aktuelle Fortschritt wird durch die Sicherung ersetzt." })],
          knoepfe: [
            { text: "Ja, laden", haupt: true, aktion: function () { T.speicher.ersetze(obj); fuelleFormular(); gespeichert(); } },
            { text: "Abbrechen" }
          ]
        });
      } catch (err) {
        T.dialog({ titel: "Das hat nicht geklappt", inhalt: [T.el("p", { text: "Diese Datei ist keine gültige Sicherung von Sokrates' Teich." })] });
      }
      e.target.value = "";
    };
    leser.readAsText(datei);
  });

  $("e-reset").addEventListener("click", function () {
    T.dialog({
      titel: "Wirklich alles zurücksetzen?",
      inhalt: [T.el("p", { text: "Mut-Steine, Mut-Schatz, Teich-Schätze, Werkstücke, eigene Karten und Einstellungen werden gelöscht. Tipp: Vorher eine Sicherung speichern." })],
      knoepfe: [
        { text: "Ja, alles löschen", gefahr: true, aktion: function () { T.speicher.zuruecksetzen(); fuelleFormular(); T.aktualisiereLeiste(); T.setzeBewegung(); gespeichert(); } },
        { text: "Nein, behalten", haupt: true }
      ]
    });
  });

  T.ansichten.erwachsene = { zeige: fuelleFormular };
})(window.Teich);
