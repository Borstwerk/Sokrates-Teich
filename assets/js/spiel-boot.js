/* Spiel: Seerosen-Boot – gedrückt halten = einatmen, loslassen = ausatmen, das Boot fährt */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.boot;
  var $ = function (id) { return document.getElementById(id); };
  var gebaut = false, boot, lichter = [];
  var phase = "bereit", zug = 0, start = 0, rahmen = null, uhren = [];

  function spaeter(fn, ms) { uhren.push(setTimeout(fn, ms)); }
  function alleStoppen() { uhren.forEach(clearTimeout); uhren = []; if (rahmen) cancelAnimationFrame(rahmen); rahmen = null; }
  function ansagen(text) { if ($("boot-stimme").checked) T.vorlesen.sprich(text); }
  function status(text) { $("boot-status").textContent = text; }
  function fortschritt(p) { $("boot-knopf").style.setProperty("--p", p.toFixed(3)); }
  function knopfText(text) { $("boot-knopf").querySelector("span").textContent = text; }
  function zaehler() { $("boot-zaehler").textContent = T.fuelle(I.zaehler, { nr: Math.min(zug + 1, I.atemzuege), von: I.atemzuege }); }
  function bootPosition() { boot.style.left = (3 + zug * 11) + "%"; }

  function baue() {
    var t = $("boot-teich");
    var reihe = T.el("div", { class: "gw-reihe", "aria-hidden": "true" });
    for (var i = 0; i < I.atemzuege; i++) {
      var gw = T.bild("i-gluehwurm", "gw");
      lichter.push(gw);
      reihe.appendChild(gw);
    }
    t.appendChild(reihe);
    var wellen = T.el("div", { class: "wellen", "aria-hidden": "true" });
    wellen.innerHTML =
      '<svg class="welle hinten" viewBox="0 0 2400 80" preserveAspectRatio="none"><path d="M0 30 Q150 10 300 30 T600 30 T900 30 T1200 30 T1500 30 T1800 30 T2100 30 T2400 30 V80 H0 Z" fill="rgba(47,111,126,.22)"/></svg>' +
      '<svg class="welle vorne" viewBox="0 0 2400 80" preserveAspectRatio="none"><path d="M0 40 Q200 22 400 40 T800 40 T1200 40 T1600 40 T2000 40 T2400 40 V80 H0 Z" fill="rgba(47,111,126,.38)"/></svg>';
    t.appendChild(wellen);
    t.appendChild(T.el("div", { class: "boot-ziel", "aria-hidden": "true" }, [T.bild("i-schilf"), T.bild("i-blume")]));
    var blatt = T.el("span", { class: "seerosenblatt", "aria-hidden": "true" });
    blatt.innerHTML = '<svg viewBox="0 0 220 44"><path d="M110 22 L214 14 C220 30 170 42 110 42 C40 42 2 34 4 22 C6 8 60 2 110 2 C150 2 190 6 206 10 Z" fill="#9CC27A" stroke="#2E3A2F" stroke-width="3" stroke-linejoin="round"/><path d="M110 22 L60 12 M110 22 L150 34 M110 22 L60 34" stroke="#6F9A52" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>';
    boot = T.el("div", { class: "boot" }, [T.sokratesFigur(1, "lebendig"), blatt]);
    t.appendChild(boot);

    var knopf = $("boot-knopf");
    knopf.addEventListener("pointerdown", function (e) {
      if (e.button !== undefined && e.button > 0) return;
      e.preventDefault();
      try { knopf.setPointerCapture(e.pointerId); } catch (err) { /* ältere Browser */ }
      einatmen();
    });
    knopf.addEventListener("pointerup", ausatmen);
    knopf.addEventListener("pointercancel", ausatmen);
    knopf.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    knopf.addEventListener("keydown", function (e) {
      if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); einatmen(); }
    });
    knopf.addEventListener("keyup", function (e) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); ausatmen(); }
    });
    $("boot-stimme").addEventListener("change", function (e) { T.speicher.set("atemStimme", e.target.checked); });
    gebaut = true;
  }

  function einatmen() {
    if (phase !== "bereit") return;
    phase = "ein";
    start = performance.now();
    boot.classList.add("hebt");
    knopf().classList.add("gedrueckt");
    status(I.ein);
    ansagen(I.ein);
    var gesagt = false;
    (function schritt() {
      var p = Math.min(1, (performance.now() - start) / (I.einSekunden * 1000));
      fortschritt(p);
      if (p >= 1 && !gesagt) { gesagt = true; status(I.loslassen); knopfText("Loslassen"); }
      if (phase === "ein") rahmen = requestAnimationFrame(schritt);
    })();
  }
  function knopf() { return $("boot-knopf"); }

  function ausatmen() {
    if (phase !== "ein") return;
    if (rahmen) cancelAnimationFrame(rahmen);
    rahmen = null;
    boot.classList.remove("hebt");
    knopf().classList.remove("gedrueckt");
    var dauer = performance.now() - start;
    if (dauer < 900) {
      // aus Versehen kurz getippt – kein Fehler, nur ein freundlicher Hinweis
      phase = "bereit";
      fortschritt(0);
      knopfText(I.halten);
      status(I.kurz);
      return;
    }
    phase = "aus";
    zug++;
    bootPosition();
    lichter[zug - 1].classList.add("an");
    status(I.aus);
    ansagen("Und ausatmen");
    knopfText("Ausatmen …");
    knopf().setAttribute("aria-disabled", "true");
    var von = Math.min(1, dauer / (I.einSekunden * 1000)), s0 = performance.now();
    (function runter() {
      var q = Math.min(1, (performance.now() - s0) / (I.ausSekunden * 1000));
      fortschritt(von * (1 - q));
      if (q < 1 && phase === "aus") rahmen = requestAnimationFrame(runter);
    })();
    spaeter(function () {
      knopf().removeAttribute("aria-disabled");
      fortschritt(0);
      if (zug >= I.atemzuege) return fertig();
      phase = "bereit";
      knopfText(I.halten);
      status(I.bereit);
      zaehler();
    }, I.ausSekunden * 1000);
  }

  function fertig() {
    phase = "fertig";
    knopf().hidden = true;
    status("");
    $("boot-zaehler").textContent = "";
    ansagen(I.endeTitel);
    T.spielEnde($("boot-ende"), { titel: I.endeTitel, text: I.ende, nochmal: neu });
  }

  function neu() {
    alleStoppen();
    phase = "bereit";
    zug = 0;
    $("boot-ende").textContent = "";
    lichter.forEach(function (l) { l.classList.remove("an"); });
    boot.classList.remove("hebt");
    bootPosition();
    var k = knopf();
    k.hidden = false;
    k.removeAttribute("aria-disabled");
    k.classList.remove("gedrueckt");
    fortschritt(0);
    knopfText(I.halten);
    status("");
    zaehler();
  }

  T.ansichten["spiel-boot"] = {
    zeige: function () {
      if (!gebaut) baue();
      T.absaetze($("boot-intro"), I.intro);
      $("boot-stimme").checked = !!T.speicher.get("atemStimme");
      $("boot-stimme-wahl").hidden = !T.vorlesen.verfuegbar();
      neu();
    },
    verlasse: function () { alleStoppen(); phase = "bereit"; }
  };
})(window.Teich);
