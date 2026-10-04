/* Ruhe-Ecke – Atmen mit Sokrates und Panzer-Pause */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.ruheEcke;
  var $ = function (id) { return document.getElementById(id); };
  var uhren = [];
  var pauseSzene;

  function spaeter(fn, ms) { uhren.push(setTimeout(fn, ms)); }
  function alleStoppen() { uhren.forEach(clearTimeout); uhren = []; }
  function ansagen(text) { if ($("atem-stimme").checked) T.vorlesen.sprich(text); }

  // ---------- Atmen ----------
  function balken(prozent, sekunden) {
    var b = $("atem-balken");
    // auch bei „weniger Bewegung“ soll sich der Balken füllen – er trägt die Information
    b.style.setProperty("transition", "width " + sekunden + "s linear", "important");
    b.style.width = prozent + "%";
  }

  function atemZuruecksetzen() {
    var k = $("atem-kreis");
    k.style.transitionDuration = "0s";
    k.classList.remove("gross", "atmet");
    k.textContent = I.bereit;
    balken(0, 0);
    $("atem-zaehler").textContent = "";
    $("atem-start").hidden = false;
    $("atem-stopp").hidden = true;
  }

  function atmen() {
    alleStoppen();
    T.vorlesen.stopp();
    $("atem-ende").hidden = true;
    $("atem-start").hidden = true;
    $("atem-stopp").hidden = false;
    var k = $("atem-kreis");
    var ein = I.einSekunden, aus = I.ausSekunden, n = I.atemzuege;
    k.classList.add("atmet");

    function zug(i) {
      if (i >= n) return fertig();
      $("atem-zaehler").textContent = "Atemzug " + (i + 1) + " von " + n;
      k.style.transitionDuration = ein + "s";
      k.classList.add("gross");
      k.textContent = I.ein;
      balken(100, ein);
      ansagen(I.ein);
      spaeter(function () {
        k.style.transitionDuration = aus + "s";
        k.classList.remove("gross");
        k.textContent = I.aus;
        balken(0, aus);
        ansagen(I.aus);
        spaeter(function () { zug(i + 1); }, aus * 1000);
      }, ein * 1000);
    }

    function fertig() {
      atemZuruecksetzen();
      k.textContent = "Gut gemacht!";
      $("atem-start").textContent = "Noch mal";
      var ende = $("atem-ende");
      ende.textContent = "";
      ende.appendChild(T.el("p", { class: "lesen", style: "width:100%;font-weight:700", text: I.ende }));
      ende.appendChild(T.el("a", { class: "knopf", href: "#panzer-meter", text: "Zum Panzer-Meter" }));
      ende.appendChild(T.el("a", { class: "knopf", href: "#teich", text: "Zurück zum Teich" }));
      ende.hidden = false;
      ansagen(I.ende);
    }

    zug(0);
  }

  // ---------- Panzer-Pause ----------
  function pause() {
    alleStoppen();
    var knopf = $("pause-start");
    knopf.disabled = true;
    var zahl = $("pause-zahl");
    var schritt = T.wenigBewegung() ? 0 : 700;
    var t = 0;
    [2, 3, 4, 5].forEach(function (l) { t += schritt; spaeter(function () { pauseSzene.stelle(l); }, t); });
    t += 900;
    for (var i = 1; i <= 5; i++) {
      (function (i) {
        spaeter(function () { zahl.textContent = String(i); ansagen(String(i)); }, t);
      })(i);
      t += 1600;
    }
    spaeter(function () { zahl.textContent = ""; }, t);
    [4, 3, 2, 1].forEach(function (l) { t += schritt; spaeter(function () { pauseSzene.stelle(l); }, t); });
    spaeter(function () {
      $("pause-text").textContent = I.pauseZurueck;
      ansagen(I.pauseZurueck);
      knopf.disabled = false;
      knopf.textContent = "Noch eine Panzer-Pause";
    }, t + 300);
  }

  $("atem-start").addEventListener("click", atmen);
  $("atem-stopp").addEventListener("click", function () { alleStoppen(); T.vorlesen.stopp(); atemZuruecksetzen(); });
  $("pause-start").addEventListener("click", pause);
  $("atem-stimme").addEventListener("change", function (e) { T.speicher.set("atemStimme", e.target.checked); });

  // Schwimmender Sokrates
  $("ruhe-sokrates").replaceWith(T.sokratesFigur(1, "schwimmt lebendig"));

  T.ansichten["ruhe-ecke"] = {
    zeige: function () {
      T.absaetze($("atem-intro"), I.atemIntro);
      if (!pauseSzene) {
        pauseSzene = T.szene({ level: 1 });
        $("pause-szene").appendChild(pauseSzene);
      }
      pauseSzene.stelle(1);
      $("pause-text").textContent = I.pauseText;
      $("pause-zahl").textContent = "";
      $("pause-start").disabled = false;
      $("pause-start").textContent = "Panzer-Pause machen";
      $("atem-start").textContent = "Los geht's";
      $("atem-ende").hidden = true;
      $("atem-stimme").checked = !!T.speicher.get("atemStimme");
      $("atem-stimme-wahl").hidden = !T.vorlesen.verfuegbar();
      atemZuruecksetzen();
    },
    verlasse: function () { alleStoppen(); }
  };
})(window.Teich);
