/* Start: Navigation zwischen den Orten und Vorlese-Knopf */
(function (T) {
  var aktuelle = null;
  var knopf = document.getElementById("vorlesen-knopf");

  // Abschnitte zum Vorlesen: jeder Absatz einzeln, mit kurzer Pause dazwischen
  function vorlesbareAbschnitte() {
    var ansicht = document.querySelector(".ansicht:not([hidden])");
    if (!ansicht) return [];
    var liste = [];
    [].forEach.call(ansicht.querySelectorAll(".lesen"), function (e) {
      if (e.offsetParent === null) return;
      var ps = e.querySelectorAll("p");
      if (ps.length) [].forEach.call(ps, function (p) { liste.push(p.textContent); });
      else liste.push(e.textContent);
    });
    return liste;
  }

  T.aktualisiereLeiste = function () {
    knopf.hidden = !T.vorlesen.verfuegbar() || !T.speicher.get("vorlesen");
    var laeuft = T.vorlesen.laeuft();
    knopf.setAttribute("aria-pressed", String(laeuft));
    knopf.querySelector("use").setAttribute("href", laeuft ? "#i-stopp" : "#i-lautsprecher");
    knopf.querySelector("span").textContent = laeuft ? "Stopp" : "Vorlesen";
    document.body.classList.toggle("spricht", laeuft);   // Sokrates bewegt beim Vorlesen den Mund
  };

  knopf.addEventListener("click", function () {
    if (T.vorlesen.laeuft()) T.vorlesen.stopp();
    else T.vorlesen.liesFolge(vorlesbareAbschnitte());
  });
  T.vorlesen.beobachte(T.aktualisiereLeiste);

  function zeige() {
    var id = decodeURIComponent(location.hash.slice(1)) || "teich";
    if (!T.ansichten[id]) id = "teich";

    T.vorlesen.stopp();
    if (aktuelle && T.ansichten[aktuelle].verlasse) T.ansichten[aktuelle].verlasse();
    if (document.getElementById("dialog").open) T.schliesseDialog();

    document.querySelectorAll(".ansicht").forEach(function (s) { s.hidden = s.dataset.ansicht !== id; });
    document.body.dataset.ansicht = id;
    var ansicht = document.getElementById("ansicht-" + id);
    if (T.ansichten[id].zeige) T.ansichten[id].zeige();
    document.title = (id === "teich" ? "" : ansicht.querySelector("h1").textContent + " · ") + "Sokrates' Teich";

    window.scrollTo(0, 0);
    if (aktuelle !== null) ansicht.querySelector("h1").focus({ preventScroll: true });
    aktuelle = id;
  }

  window.addEventListener("hashchange", zeige);
  T.setzeBewegung();
  T.aktualisiereLeiste();
  zeige();
})(window.Teich);
