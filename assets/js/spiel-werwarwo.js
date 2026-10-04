/* Knobeln: Wer war wo? – Logik-Gitter mit ✗ und ✓. Jede Figur war an genau einem Ort. */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.werwarwo;
  var $ = function (id) { return document.getElementById(id); };
  var LEER = 0, NEIN = 1, JA = 2;

  function stand() {
    var s = T.abenteuer("werwarwo");
    s.geloest = s.geloest || [];
    s.gitter = s.gitter || {};
    if (s.helfer === undefined) s.helfer = true;
    return s;
  }
  function blase(saetze) { T.absaetze($("ww-blase"), saetze); T.pop($("ww-blase").parentNode); }
  function figur(id) { var f = I.figuren[id]; return { id: id, name: f[0], bild: f[1], satz: f[2] }; }
  function ort(id) { var o = I.orte[id]; return { id: id, name: o[0], bild: o[1], bei: o[2], wasser: o[3] }; }

  function zeigeListe() {
    $("ww-ende").textContent = "";
    blase(I.intro);
    var box = $("ww-spiel");
    box.textContent = "";
    var s = stand();
    box.appendChild(T.el("h2", { class: "lesen", text: s.geloest.length >= I.raetsel.length ? I.alleGeloest : I.waehle }));
    var liste = T.el("ul", { class: "zentrale-liste" });
    I.raetsel.forEach(function (r, i) {
      var fertig = s.geloest.indexOf(r.id) >= 0;
      liste.appendChild(T.el("li", {}, [T.el("button", { type: "button", class: "mission-knopf" + (fertig ? " fertig" : ""), onclick: function () { spiele(r); } }, [
        T.bild(i < 2 ? "i-lupe" : i < 6 ? "i-stern" : "i-kristall"), T.el("span", { text: r.titel }),
        fertig ? T.bild("i-ja", "haken", "gelöst") : T.el("span", { class: "alarm-start", text: r.figuren.length + " × " + r.orte.length })
      ])]));
    });
    box.appendChild(liste);
    T.nacheinander(liste);
  }

  function spiele(r) {
    var s = stand();
    var n = r.figuren.length;
    var gitter = (s.gitter[r.id] && s.gitter[r.id].length === n) ? s.gitter[r.id] : r.figuren.map(function () { return r.orte.map(function () { return LEER; }); });
    var abgehakt = {};
    var box = $("ww-spiel");
    box.textContent = "";
    $("ww-ende").textContent = "";
    blase([r.frage]);

    function speichere() {
      var st = stand();
      st.gitter[r.id] = gitter;
      T.abenteuerSpeichern("werwarwo", st);
    }

    // Automatische Kreuze: leere Felder in Reihe/Spalte eines ✓
    function auto(z, sp) {
      if (!stand().helfer || gitter[z][sp] !== LEER) return false;
      for (var i = 0; i < n; i++) {
        if (i !== sp && gitter[z][i] === JA) return true;
        if (i !== z && gitter[i][sp] === JA) return true;
      }
      return false;
    }

    var titel = T.el("h2", { class: "lesen", tabindex: "-1", text: r.titel });
    box.appendChild(T.el("button", { type: "button", class: "knopf klein", text: "← " + I.alle, onclick: zeigeListe }));
    box.appendChild(titel);

    // Hinweise
    var hinweise = T.el("ol", { class: "ww-hinweise" });
    r.hinweise.forEach(function (h, i) {
      var li = T.el("li", {}, [
        T.el("button", { type: "button", class: "ww-haken", "aria-pressed": "false", "aria-label": T.fuelle(I.abhaken, { nr: i + 1 }), onclick: function (e) {
          abgehakt[i] = !abgehakt[i];
          e.currentTarget.setAttribute("aria-pressed", String(abgehakt[i]));
          li.classList.toggle("erledigt", abgehakt[i]);
        } }, [T.bild("i-ja")]),
        T.el("span", { class: "lesen", text: h.text }),
        T.vorleseKnopf(h.text)
      ]);
      hinweise.appendChild(li);
    });
    var hinweisBox = T.el("section", { class: "ww-hinweis-box" }, [T.el("h3", { class: "lesen", text: I.hinweiseTitel })]);
    if (r.weg) {
      hinweisBox.appendChild(T.el("p", { class: "leise", text: I.weg }));
      hinweisBox.appendChild(T.el("ol", { class: "ww-weg" }, r.orte.map(function (id) { var o = ort(id); return T.el("li", {}, [T.bild(o.bild), o.name]); })));
    }
    hinweisBox.appendChild(hinweise);

    // Gitter
    var tabelle = T.el("table", { class: "ww-gitter n" + n });
    var kopf = T.el("tr", {}, [T.el("td", { class: "ww-ecke" })]);
    r.orte.forEach(function (id) {
      var o = ort(id);
      kopf.appendChild(T.el("th", { scope: "col" }, [T.bild(o.bild), T.el("span", { text: o.name }), o.wasser ? T.el("span", { class: "ww-wasser", text: I.wasser }) : null]));
    });
    tabelle.appendChild(T.el("thead", {}, [kopf]));
    var koerper = T.el("tbody");
    var zellen = [];
    r.figuren.forEach(function (fid, z) {
      var f = figur(fid);
      var tr = T.el("tr", {}, [T.el("th", { scope: "row" }, [T.bild(f.bild), T.el("span", { text: f.name })])]);
      zellen[z] = [];
      r.orte.forEach(function (oid, sp) {
        var knopf = T.el("button", { type: "button", class: "ww-feld", onclick: function () {
          gitter[z][sp] = (gitter[z][sp] + 1) % 3;
          meldung.textContent = "";
          zeichne();
          speichere();
          pruefeFertig();
        } });
        zellen[z][sp] = knopf;
        tr.appendChild(T.el("td", {}, [knopf]));
      });
      koerper.appendChild(tr);
    });
    tabelle.appendChild(koerper);

    function zeichne() {
      zellen.forEach(function (reihe, z) {
        reihe.forEach(function (k, sp) {
          var w = gitter[z][sp], a = auto(z, sp);
          k.className = "ww-feld" + (w === NEIN ? " nein" : w === JA ? " ja" : a ? " nein auto" : "");
          k.textContent = w === NEIN || a ? "✗" : w === JA ? "✓" : "";
          k.setAttribute("aria-label", figur(r.figuren[z]).name + ", " + ort(r.orte[sp]).name + ": " + I.zelle[w === NEIN ? "nein" : w === JA ? "ja" : a ? "auto" : "leer"]);
        });
      });
    }

    var meldung = T.el("p", { class: "raetsel-meldung", "aria-live": "polite" });
    var helfer = T.el("input", { type: "checkbox", id: "ww-helfer" });
    helfer.checked = stand().helfer;
    helfer.addEventListener("change", function () { var st = stand(); st.helfer = helfer.checked; T.abenteuerSpeichern("werwarwo", st); zeichne(); });

    function falsche() {
      var liste = [];
      gitter.forEach(function (reihe, z) {
        reihe.forEach(function (w, sp) {
          var richtig = r.loesung[r.figuren[z]] === r.orte[sp];
          if ((w === JA && !richtig) || (w === NEIN && richtig)) liste.push([z, sp]);
        });
      });
      return liste;
    }

    function pruefeFertig() {
      var fertig = r.figuren.every(function (fid, z) { return gitter[z][r.orte.indexOf(r.loesung[fid])] === JA; });
      if (fertig) geloest();
    }

    function geloest() {
      var st = stand();
      var erstesMal = st.geloest.indexOf(r.id) < 0;
      if (erstesMal) st.geloest.push(r.id);
      delete st.gitter[r.id];
      T.abenteuerSpeichern("werwarwo", st);
      tabelle.querySelectorAll("button").forEach(function (k) { k.disabled = true; });
      werkzeuge.querySelectorAll("button").forEach(function (k) { k.disabled = true; });
      var naechstes = I.raetsel.find(function (x) { return stand().geloest.indexOf(x.id) < 0; });
      T.spielEnde($("ww-ende"), {
        titel: I.geschafft,
        text: [I.loesung],
        extra: T.el("ul", { class: "ww-loesung" }, r.figuren.map(function (fid) {
          var f = figur(fid), o = ort(r.loesung[fid]);
          return T.el("li", {}, [T.bild(f.bild), T.el("span", { text: f.satz + " war " + o.bei + "." })]);
        })),
        fund: erstesMal ? undefined : null,
        nochmal: naechstes ? function () { spiele(naechstes); } : zeigeListe,
        nochmalText: naechstes ? I.naechstes : I.alle
      });
    }

    var werkzeuge = T.el("div", { class: "knoepfe" }, [
      T.el("button", { type: "button", class: "knopf", text: I.pruefen, onclick: function () {
        tabelle.querySelectorAll(".falsch").forEach(function (k) { k.classList.remove("falsch"); });
        var leer = gitter.every(function (reihe) { return reihe.every(function (w) { return w === LEER; }); });
        if (leer) { meldung.textContent = I.nochNichts; return; }
        var f = falsche();
        f.forEach(function (p) { zellen[p[0]][p[1]].classList.add("falsch"); });
        meldung.textContent = !f.length ? I.allesGut : f.length === 1 ? I.fehler1 : T.fuelle(I.fehlerN, { anzahl: f.length });
      } }),
      T.el("button", { type: "button", class: "knopf", text: I.tipp, onclick: function () {
        // Ein noch fehlendes ✓ verraten (zuerst falsch gesetzte Felder entfernen)
        falsche().forEach(function (p) { gitter[p[0]][p[1]] = LEER; });
        var offen = r.figuren.filter(function (fid, z) { return gitter[z][r.orte.indexOf(r.loesung[fid])] !== JA; });
        if (!offen.length) return;
        var fid = offen[0], z = r.figuren.indexOf(fid), sp = r.orte.indexOf(r.loesung[fid]);
        gitter[z][sp] = JA;
        meldung.textContent = T.fuelle(I.tippText, { wer: figur(fid).satz, wo: ort(r.loesung[fid]).bei });
        zeichne();
        speichere();
        T.pop(zellen[z][sp]);
        pruefeFertig();
      } }),
      T.el("button", { type: "button", class: "knopf", text: I.leeren, onclick: function () {
        gitter.forEach(function (reihe) { reihe.forEach(function (w, i) { reihe[i] = LEER; }); });
        meldung.textContent = "";
        tabelle.querySelectorAll(".falsch").forEach(function (k) { k.classList.remove("falsch"); });
        zeichne();
        speichere();
      } })
    ]);

    var gitterBox = T.el("section", { class: "ww-gitter-box" }, [
      T.el("h3", { class: "lesen", text: I.gitterTitel }),
      T.el("p", { class: "leise", text: I.gitterInfo }),
      T.el("div", { class: "ww-gitter-rahmen" }, [tabelle]),
      T.el("p", { class: "ww-helfer" }, [helfer, T.el("label", { for: "ww-helfer", text: I.helfer })]),
      T.el("p", { class: "leise", text: I.helferInfo }),
      meldung,
      werkzeuge
    ]);
    box.appendChild(T.el("div", { class: "ww-platz" }, [hinweisBox, gitterBox]));
    zeichne();
    titel.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: "auto", block: "start" });
  }

  T.ansichten["spiel-werwarwo"] = { zeige: zeigeListe };
})(window.Teich);
