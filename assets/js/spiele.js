/* Spiele – Übersicht und gemeinsames Spiel-Ende */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.spiele;
  var $ = function (id) { return document.getElementById(id); };
  var szene;

  // Ende eines Spiels: Sokrates freut sich, findet etwas für den Teich, und es geht weiter
  // opts: { titel, text: [Sätze], nochmal: fn, nochmalText, fund (statt eines zufälligen Fundes), extra: Node }
  T.spielEnde = function (ziel, opts) {
    ziel.textContent = "";
    var figur = T.sokratesFigur(1, "lebendig");
    var text = T.el("div", { class: "lesen" });
    T.absaetze(text, opts.text || []);
    var box = T.el("div", { class: "spiel-ende" }, [
      T.el("div", { class: "spiel-ende-bild" }, [figur]),
      T.el("div", {}, [
        T.el("h2", { class: "lesen", tabindex: "-1", text: opts.titel }),
        text,
        opts.extra || null,
        T.fundHinweis(opts.fund !== undefined ? opts.fund : T.findeEtwas("spiel")),
        T.el("div", { class: "knoepfe" }, [
          T.el("button", { type: "button", class: "knopf haupt", text: opts.nochmalText || I.nochmal, onclick: opts.nochmal }),
          T.el("a", { class: "knopf", href: "#spiele", text: I.andere }),
          T.el("a", { class: "knopf", href: "#mein-teich", text: I.zumTeich })
        ])
      ])
    ]);
    ziel.appendChild(box);
    T.pop(box);
    setTimeout(function () {
      if (!T.wenigBewegung()) { figur.classList.add("freut"); setTimeout(function () { figur.classList.remove("freut"); }, 950); }
    }, 200);
    var h = box.querySelector("h2");
    h.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: T.wenigBewegung() ? "auto" : "smooth", block: "center" });
  };

  // Gespeicherter Stand eines Abenteuers (Kopie) und Speichern
  T.abenteuer = function (name) {
    var alle = T.speicher.get("abenteuer") || {};
    return JSON.parse(JSON.stringify(alle[name] || {}));
  };
  T.abenteuerSpeichern = function (name, stand) {
    T.speicher.aendere("abenteuer", function (alle) { alle = alle || {}; alle[name] = stand; return alle; });
  };

  // Zahlen mischen (Fisher-Yates)
  T.mische = function (liste) {
    var a = liste.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };

  // Kleiner Vorlese-Knopf neben einem Text (nur wenn Vorlesen an ist)
  T.vorleseKnopf = function (text) {
    if (!T.vorlesen.verfuegbar() || !T.speicher.get("vorlesen")) return null;
    return T.el("button", {
      type: "button", class: "knopf klein mini-vorlesen", "aria-label": "Vorlesen",
      onclick: function () { T.vorlesen.sprich(typeof text === "function" ? text() : text); }
    }, [T.bild("i-lautsprecher")]);
  };

  T.ansichten.spiele = {
    zeige: function () {
      if (!szene) {
        szene = T.szene({ level: 1, libelle: true });
        $("spiele-szene").appendChild(szene);
      }
      T.absaetze($("spiele-blase"), I.intro);
      T.pop($("spiele-blase"));
      T.nicken(szene.sokrates);
      var liste = $("spiele-liste");
      liste.textContent = "";
      I.liste.forEach(function (s) {
        liste.appendChild(T.el("li", {}, [T.el("a", { class: "ort", href: "#" + s.id }, [
          T.el("span", { class: "bild" }, [T.bild(s.bild)]),
          T.el("span", {}, [T.el("b", { text: s.name }), T.el("span", { text: s.unter })])
        ])]));
      });
      T.nacheinander(liste);

      // Abenteuer mit Fortschritt
      var A = T.inhalt.abenteuer, F = A.fortschritt;
      var truhe = T.abenteuer("truhe"), zentrale = T.abenteuer("zentrale"), fall = T.abenteuer("fall");
      var stand = {
        "spiel-truhe": truhe.fertig ? F.truheFertig : T.fuelle(F.truhe, { anzahl: (truhe.offen || []).length }),
        "spiel-zentrale": T.fuelle(F.zentrale, { anzahl: (zentrale.geschafft || []).length, von: T.inhalt.zentrale.missionen.length }),
        "spiel-fall": fall.geloest ? F.fallFertig : T.fuelle(F.fall, { anzahl: (fall.hinweise || []).length })
      };
      var aliste = $("abenteuer-liste");
      aliste.textContent = "";
      A.liste.forEach(function (s) {
        aliste.appendChild(T.el("li", {}, [T.el("a", { class: "ort abenteuer", href: "#" + s.id }, [
          T.el("span", { class: "bild" }, [T.bild(s.bild)]),
          T.el("span", {}, [T.el("b", { text: s.name }), T.el("span", { text: s.unter }), T.el("span", { class: "stand", text: stand[s.id] })])
        ])]));
      });
      T.nacheinander(aliste);
    }
  };
})(window.Teich);
