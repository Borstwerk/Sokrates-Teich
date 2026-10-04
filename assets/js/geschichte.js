/* Sokrates erzählt – Bilderbuch in 9 Seiten */
(function (T) {
  T.ansichten = T.ansichten || {};
  var seiten = T.inhalt.geschichte;
  var nr = 0;
  var $ = function (id) { return document.getElementById(id); };

  function male(richtung) {
    var s = seiten[nr];
    $("geschichte-seite").textContent = "Seite " + (nr + 1) + " von " + seiten.length;
    $("geschichte-titel").textContent = T.mitName(s.titel);
    T.absaetze($("geschichte-text"), s.text);

    var bild = $("geschichte-bild");
    bild.textContent = "";
    var szene = T.szene(s.bild);
    if (s.bild.spaziert) szene.sokrates.classList.add("spaziert", "laeuft");
    bild.appendChild(szene);

    var buch = document.querySelector(".buchseite");
    buch.classList.remove("blaettert-vor", "blaettert-zurueck");
    if (richtung) { void buch.offsetWidth; buch.classList.add(richtung > 0 ? "blaettert-vor" : "blaettert-zurueck"); }

    var ende = $("geschichte-ende");
    ende.textContent = "";
    ende.hidden = !s.knoepfe;
    (s.knoepfe || []).forEach(function (k, i) {
      ende.appendChild(T.el("a", { class: "knopf" + (i === 0 ? " haupt" : ""), href: "#" + k[0], text: k[1] }));
    });

    var punkte = $("geschichte-punkte");
    punkte.textContent = "";
    seiten.forEach(function (_, i) { punkte.appendChild(T.el("li", { class: (i <= nr ? "da" : "") + (i === nr ? " jetzt" : "") })); });

    $("geschichte-zurueck").disabled = nr === 0;
    $("geschichte-zurueck").style.visibility = nr === 0 ? "hidden" : "visible";
    $("geschichte-weiter").textContent = nr === seiten.length - 1 ? "Noch mal von vorn" : "Weiter →";

    if (nr === seiten.length - 1) T.speicher.set("geschichteGelesen", true);
  }

  function blaettere(richtung) {
    T.vorlesen.stopp();
    if (richtung > 0 && nr === seiten.length - 1) nr = 0;
    else nr = Math.max(0, Math.min(seiten.length - 1, nr + richtung));
    male(richtung);
  }

  $("geschichte-weiter").addEventListener("click", function () { blaettere(1); });
  $("geschichte-zurueck").addEventListener("click", function () { blaettere(-1); });
  document.addEventListener("keydown", function (e) {
    if (document.body.dataset.ansicht !== "geschichte") return;
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || document.querySelector("dialog[open]")) return;
    if (e.key === "ArrowRight") blaettere(1);
    if (e.key === "ArrowLeft") blaettere(-1);
  });

  T.ansichten.geschichte = { zeige: function () { nr = 0; male(); } };
})(window.Teich);
