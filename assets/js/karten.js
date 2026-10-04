/* Karten-Kiste – Karten zum Zeigen und Ausdrucken */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.karten;
  var $ = function (id) { return document.getElementById(id); };
  var BILDER_EIGEN = ["i-stern", "i-herz", "i-laecheln", "i-hand", "i-ja", "i-nein", "i-frage", "i-haus", "i-durst", "i-warten", "i-karte", "sokrates-1"];

  function alleKarten() {
    var fest = I.liste.map(function (k) { return { bild: k[0], text: k[1] }; });
    var eigene = T.speicher.get("eigeneKarten").map(function (k) { return { bild: k.bild, text: k.text, id: k.id }; });
    return fest.concat(eigene);
  }

  function druckkarte(k) {
    return T.el("div", { class: "druckkarte" }, [T.bild(k.bild), T.el("p", { text: k.text })]);
  }
  function drucke(karten) {
    T.druckeKarten(karten.map(druckkarte), T.speicher.get("kartenProSeite"), "kind", T.speicher.get("kartenSkalierung"));
  }
  function druckInfo() {
    $("karten-druck-info").textContent = T.druckInfo(alleKarten().length, T.speicher.get("kartenProSeite"), T.speicher.get("kartenSkalierung"));
  }

  function setzeGroesse(g) {
    T.speicher.set("kartenGroesse", g);
    $("karten").dataset.groesse = g;
    document.querySelectorAll("[data-groesse]").forEach(function (b) {
      if (b.tagName === "BUTTON") b.setAttribute("aria-pressed", String(b.dataset.groesse === g));
    });
  }

  function zeigeGross(karte) {
    var knoepfe = [
      { text: "Schließen", haupt: true }
    ];
    if (T.vorlesen.verfuegbar() && T.speicher.get("vorlesen")) {
      knoepfe.push({ text: "Vorlesen lassen", aktion: function () { T.vorlesen.sprich(karte.text); return false; } });
    }
    knoepfe = knoepfe.concat([
      { text: "Diese Karte drucken", aktion: function () { drucke([karte]); } }
    ]);
    if (karte.id) {
      knoepfe.push({ text: "Karte löschen", gefahr: true, aktion: function () {
        T.speicher.aendere("eigeneKarten", function (arr) { return arr.filter(function (k) { return k.id !== karte.id; }); });
        male();
      } });
    }
    T.dialog({
      breit: true,
      inhalt: [T.el("div", { class: "karte-gross" }, [T.bild(karte.bild), T.el("p", { text: karte.text })])],
      knoepfe: knoepfe
    });
  }

  function neueKarte() {
    var gewaehlt = BILDER_EIGEN[0];
    var eingabe = T.el("input", { type: "text", id: "karte-text", maxlength: "70", placeholder: "z. B. Ich möchte neben Mia sitzen." });
    var hinweis = T.el("p", { class: "leise", "aria-live": "polite" });
    var auswahl = T.el("div", { class: "knoepfe", role: "group", "aria-label": I.eigenBild });
    BILDER_EIGEN.forEach(function (b) {
      auswahl.appendChild(T.el("button", {
        type: "button", class: "knopf klein", "aria-pressed": String(b === gewaehlt), "aria-label": "Bild " + (BILDER_EIGEN.indexOf(b) + 1),
        onclick: function (e) {
          gewaehlt = b;
          auswahl.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === e.currentTarget)); });
        }
      }, [T.bild(b)]));
    });
    T.dialog({
      titel: I.eigenTitel,
      inhalt: [
        T.el("div", { class: "feld" }, [T.el("label", { for: "karte-text", text: I.eigenText }), eingabe]),
        T.el("p", { style: "font-weight:700;margin:16px 0 0", text: I.eigenBild }),
        auswahl, hinweis
      ],
      knoepfe: [
        { text: "Karte speichern", haupt: true, aktion: function () {
          var text = eingabe.value.trim();
          if (!text) { hinweis.textContent = "Bitte schreib erst etwas auf die Karte."; eingabe.focus(); return false; }
          T.speicher.aendere("eigeneKarten", function (arr) { arr.push({ id: T.neueId(), bild: gewaehlt, text: text }); return arr; });
          male();
        } },
        { text: "Abbrechen" }
      ]
    });
  }

  function male() {
    var liste = $("karten");
    liste.textContent = "";
    alleKarten().forEach(function (k) {
      liste.appendChild(T.el("li", {}, [T.el("button", {
        type: "button", class: "karte", onclick: function () { zeigeGross(k); }
      }, [T.bild(k.bild), k.text])]));
    });
    T.nacheinander(liste);
    druckInfo();
  }

  $("karten-drucken").addEventListener("click", function () { drucke(alleKarten()); });
  $("karten-pro-seite").addEventListener("change", function (e) { T.speicher.set("kartenProSeite", Number(e.target.value)); druckInfo(); });
  $("karten-skalierung").addEventListener("input", function (e) {
    var v = Number(e.target.value);
    if (v >= 30 && v <= 150) { T.speicher.set("kartenSkalierung", v); druckInfo(); }
  });
  $("karten-skalierung").addEventListener("change", function (e) {
    var v = Math.max(30, Math.min(150, Math.round(Number(e.target.value) || 100)));
    e.target.value = v; T.speicher.set("kartenSkalierung", v); druckInfo();
  });
  document.querySelectorAll("button[data-groesse]").forEach(function (b) {
    b.addEventListener("click", function () { setzeGroesse(b.dataset.groesse); });
  });
  $("karte-neu").addEventListener("click", neueKarte);

  T.ansichten.karten = {
    zeige: function () {
      T.absaetze($("karten-intro"), I.intro);
      $("karten-pro-seite").value = String(T.speicher.get("kartenProSeite"));
      $("karten-skalierung").value = T.speicher.get("kartenSkalierung");
      setzeGroesse(T.speicher.get("kartenGroesse"));
      male();
    }
  };
})(window.Teich);
