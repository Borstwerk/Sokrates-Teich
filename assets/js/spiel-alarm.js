/* Spiel: Alarmanlagen-Detektiv – Wie laut ist deine Alarmanlage hier? (kein Richtig, kein Falsch) */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.alarm;
  var $ = function (id) { return document.getElementById(id); };
  var szene, karten = [], nr = 0, antworten = [];

  function blase(saetze) {
    T.absaetze($("alarm-blase"), saetze);
    T.pop($("alarm-blase").parentNode);
  }

  function lampe(stufe) {
    var l = T.el("span", { class: "mini-lampe", style: "--glow:" + stufe.lampe, "aria-hidden": "true" });
    if (stufe.lampe >= 0.4) l.classList.add("an");
    return l;
  }

  function zeigeKarte() {
    var s = karten[nr];
    var spiel = $("alarm-spiel");
    spiel.textContent = "";
    szene.stelle(1, 0);
    blase([I.frage]);

    var karte = T.el("div", { class: "spiel-karte" }, [
      T.el("p", { class: "leise", text: T.fuelle(I.karte, { nr: nr + 1, von: karten.length }) }),
      T.bild(s[0]),
      T.el("p", { class: "spiel-karte-text lesen", text: s[1] }),
      T.vorleseKnopf(s[1] + ". " + I.frage)
    ]);
    var wahl = T.el("div", { class: "alarm-wahl" });
    I.stufen.forEach(function (st) {
      wahl.appendChild(T.el("button", { type: "button", class: "knopf alarm-knopf", "data-stufe": st.id, onclick: function () { antworte(st); } }, [lampe(st), st.name]));
    });
    var weissNicht = T.el("button", { type: "button", class: "knopf klein", text: I.weissNicht, onclick: function () { antworte(null); } });
    spiel.appendChild(karte);
    spiel.appendChild(wahl);
    spiel.appendChild(T.el("div", { class: "knoepfe" }, [weissNicht]));
    T.pop(karte);
  }

  function antworte(stufe) {
    var s = karten[nr];
    antworten.push({ bild: s[0], text: s[1], stufe: stufe ? stufe.id : "weiss" });
    if (stufe) szene.stelle(stufe.level, stufe.lampe); else szene.stelle(2, 0.15);
    blase([stufe ? stufe.antwort : I.weissNichtAntwort]);
    var spiel = $("alarm-spiel");
    spiel.querySelectorAll("button").forEach(function (b) {
      b.disabled = true;
      if (stufe && b.dataset.stufe === stufe.id) b.setAttribute("aria-pressed", "true");
    });
    var letzte = nr === karten.length - 1;
    var weiter = T.el("button", { type: "button", class: "knopf haupt", text: letzte ? I.fertig : I.weiter, onclick: function () {
      nr++;
      if (nr < karten.length) { zeigeKarte(); var k = $("alarm-spiel").querySelector(".alarm-knopf"); if (k) k.focus(); }
      else fertig();
    } });
    spiel.appendChild(T.el("div", { class: "knoepfe" }, [weiter]));
    weiter.focus();
  }

  function fertig() {
    $("alarm-spiel").textContent = "";
    szene.stelle(1, 0);
    T.nicken(szene.sokrates);
    T.speicher.aendere("alarmRunden", function (arr) {
      arr = (arr || []).concat([{ zeit: Date.now(), antworten: antworten.map(function (a) { return { text: a.text, stufe: a.stufe }; }) }]);
      return arr.slice(-5);
    });

    // Übersicht: Leise · Mittel · Laut
    var spalten = T.el("div", { class: "alarm-uebersicht" });
    I.stufen.forEach(function (st) {
      var liste = T.el("ul");
      antworten.filter(function (a) { return a.stufe === st.id; }).forEach(function (a) {
        liste.appendChild(T.el("li", {}, [T.bild(a.bild), a.text]));
      });
      if (!liste.children.length) liste.appendChild(T.el("li", { class: "leer", text: "–" }));
      spalten.appendChild(T.el("div", { class: "alarm-spalte " + st.id }, [T.el("h3", {}, [lampe(st), st.name]), liste]));
    });

    var leise = antworten.filter(function (a) { return a.stufe === "leise"; }).length;
    var laut = antworten.filter(function (a) { return a.stufe === "laut" || a.stufe === "mittel"; }).length;
    var text = [];
    if (leise) text.push(T.fuelle(I.endeLeise, { anzahl: leise }));
    if (laut) text.push(I.endeLaut);
    text.push(I.endeAlle);
    blase([I.endeAlle]);

    var ende = $("alarm-ende");
    T.spielEnde(ende, { titel: I.endeTitel, text: text, nochmal: starte });
    ende.appendChild(spalten);
  }

  function starte() {
    $("alarm-ende").textContent = "";
    karten = T.mische(I.situationen).slice(0, I.proRunde);
    nr = 0;
    antworten = [];
    zeigeKarte();
    var k = $("alarm-spiel").querySelector(".alarm-knopf");
    if (k) k.focus();
  }

  T.ansichten["spiel-alarm"] = {
    zeige: function () {
      if (!szene) {
        szene = T.szene({ level: 1, lampe: 0 });
        $("alarm-szene").appendChild(szene);
      }
      szene.stelle(1, 0);
      blase(I.intro);
      $("alarm-ende").textContent = "";
      var spiel = $("alarm-spiel");
      spiel.textContent = "";
      spiel.appendChild(T.el("div", { class: "knoepfe" }, [T.el("button", { type: "button", class: "knopf haupt", text: I.start, onclick: starte })]));
    }
  };
})(window.Teich);
