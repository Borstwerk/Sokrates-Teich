/* Panzer-Meter – Gefühle zeigen ohne Worte */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.panzerMeter;
  var szene, gewaehlt = 0;
  var $ = function (id) { return document.getElementById(id); };

  function waehle(i) {
    gewaehlt = i;
    var s = I.stufen[i];
    szene.stelle(i + 1, s.lampe);
    $("meter-titel").textContent = s.name;
    $("meter-text").textContent = T.mitName(s.text);
    var extra = $("meter-extra");
    extra.textContent = "";
    if (s.ruhe) extra.appendChild(T.el("a", { class: "knopf haupt", href: "#ruhe-ecke", text: I.zurRuhe }));
    if (s.lampe >= 0.5) extra.appendChild(T.el("a", { class: "knopf", href: "#koerper" }, [T.bild("i-koerper"), I.zumKoerper]));
    if (extra.children.length) extra.className = "knoepfe";
    $("stufen").querySelectorAll(".stufe").forEach(function (b, j) { b.setAttribute("aria-pressed", String(i === j)); });
    T.pop($("meter-titel").parentNode);
    if (i === 0) T.nicken(szene.sokrates);
  }

  T.ansichten["panzer-meter"] = {
    zeige: function () {
      if (!szene) {
        szene = T.szene({ level: 1, lampe: 0 });
        $("meter-szene").appendChild(szene);
        I.stufen.forEach(function (s, i) {
          $("stufen").appendChild(T.el("li", {}, [T.el("button", {
            type: "button", class: "stufe", "aria-pressed": "false",
            onclick: function () { waehle(i); }
          }, [T.bild("sokrates-" + (i + 1)), T.el("span", { class: "nr", text: String(i + 1) }), s.name])]));
        });
        T.nacheinander($("stufen"));
      }
      $("meter-frage").textContent = T.mitName(I.frage);
      waehle(gewaehlt);
    }
  };
})(window.Teich);
