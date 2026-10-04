/* Für Lehrkräfte – Infoblatt (A4) und Erklär-Karten, auf das Kind zugeschnitten */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.lehrkraefte;
  var $ = function (id) { return document.getElementById(id); };
  var FELDER = [["lk-eltern", "lkEltern"], ["lk-kontakt", "lkKontakt"], ["lk-vertrauen", "lkVertrauen"], ["lk-hilft", "lkHilft"]];
  var KARTEN_BILDER = ["i-ja", "i-nein", "i-klo", "i-hilfe", "i-frage", "i-warten"];

  function hatName() { return !!String(T.speicher.get("name") || "").trim(); }

  function punkte(liste) {
    return T.el("ul", {}, liste.map(function (p) { return T.el("li", { text: T.kind(p) }); }));
  }

  function abschnitt(a, mitKartenBildern) {
    var kopf = T.el("div", { class: "lk-kopf" }, [T.bild(a.bild), T.el("h3", { text: T.kind(a.titel) })]);
    var kinder = [kopf, punkte(a.punkte)];
    if (mitKartenBildern && a.bild === "i-karte") {
      kinder.push(T.el("div", { class: "lk-mini-karten", "aria-hidden": "true" }, KARTEN_BILDER.map(function (b) { return T.bild(b); })));
    }
    return T.el("section", { class: "lk-abschnitt" }, kinder);
  }

  function vorstellungsText() {
    return hatName() ? T.kind(I.vorstellung.titel) : "Hallo!";
  }

  function kontaktZeile(label, wert) {
    return T.el("div", { class: "lk-zeile" }, [T.el("span", { class: "lk-label", text: label }), T.el("span", { class: "lk-wert" + (wert ? "" : " leer"), text: wert || "" })]);
  }

  // ---------- Infoblatt ----------
  function infoblatt() {
    var s = T.speicher;
    var blatt = T.el("article", { class: "blatt" }, [
      T.el("header", { class: "lk-titel" }, [
        T.bild("sokrates-1"),
        T.el("div", {}, [T.el("h2", { text: T.kind(I.blattTitel) }), T.el("p", { text: I.blattUnter })])
      ]),
      T.el("div", { class: "lk-spalten" }, I.abschnitte.map(function (a) { return abschnitt(a, true); })),
      T.el("section", { class: "lk-abschnitt lk-kontakt" }, [
        T.el("div", { class: "lk-kopf" }, [T.bild("i-haus"), T.el("h3", { text: I.kontaktTitel })]),
        kontaktZeile("Ansprechpartner:in", s.get("lkEltern")),
        kontaktZeile("Telefon / E-Mail", s.get("lkKontakt")),
        kontaktZeile("Vertrauensperson", s.get("lkVertrauen")),
        kontaktZeile(T.kind("Was {kind} hilft"), s.get("lkHilft"))
      ]),
      T.el("footer", { class: "lk-fuss", text: I.fussnote })
    ]);
    return blatt;
  }

  // ---------- Erklär-Karten ----------
  function erklaerKarten() {
    var vorstellung = T.el("article", { class: "erklaerkarte vorstellung" }, [
      T.bild("sokrates-4"),
      T.el("h3", { text: vorstellungsText() }),
      T.el("div", {}, I.vorstellung.text.map(function (t) { return T.el("p", { text: T.kind(t) }); }))
    ]);
    var rest = I.abschnitte.map(function (a) {
      return T.el("article", { class: "erklaerkarte" }, [
        T.el("div", { class: "lk-kopf" }, [T.bild(a.bild), T.el("h3", { text: T.kind(a.titel) })]),
        punkte(a.punkte)
      ]);
    });
    return [vorstellung].concat(rest);
  }

  function male() {
    $("lk-intro").textContent = T.kind(I.intro);
    $("lk-hilft-label").textContent = T.kind("Was {kind} besonders hilft");
    var blatt = $("lk-blatt");
    blatt.textContent = "";
    blatt.appendChild(infoblatt());
    var liste = $("lk-karten");
    liste.textContent = "";
    erklaerKarten().forEach(function (k) { liste.appendChild(T.el("li", {}, [k])); });
  }

  FELDER.forEach(function (f) {
    $(f[0]).addEventListener("input", function (e) { T.speicher.set(f[1], e.target.value); male(); });
  });
  function druckInfo() {
    $("lk-druck-info").textContent = T.druckInfo(I.abschnitte.length + 1, T.speicher.get("lkProSeite"), T.speicher.get("lkSkalierung"));
  }
  $("lk-pro-seite").addEventListener("change", function (e) { T.speicher.set("lkProSeite", Number(e.target.value)); druckInfo(); });
  $("lk-skalierung").addEventListener("input", function (e) {
    var v = Number(e.target.value);
    if (v >= 50 && v <= 150) { T.speicher.set("lkSkalierung", v); druckInfo(); }
  });
  $("lk-skalierung").addEventListener("change", function (e) {
    var v = Math.max(50, Math.min(150, Math.round(Number(e.target.value) || 100)));
    e.target.value = v; T.speicher.set("lkSkalierung", v); druckInfo();
  });
  $("lk-blatt-drucken").addEventListener("click", function () { T.drucke([infoblatt()], "blatt-druck"); });
  $("lk-karten-drucken").addEventListener("click", function () {
    T.druckeKarten(erklaerKarten(), T.speicher.get("lkProSeite"), "erwachsen", T.speicher.get("lkSkalierung"));
  });

  T.ansichten.lehrkraefte = {
    zeige: function () {
      FELDER.forEach(function (f) { $(f[0]).value = T.speicher.get(f[1]) || ""; });
      $("lk-pro-seite").value = String(T.speicher.get("lkProSeite"));
      $("lk-skalierung").value = T.speicher.get("lkSkalierung");
      male();
      druckInfo();
    }
  };
})(window.Teich);
