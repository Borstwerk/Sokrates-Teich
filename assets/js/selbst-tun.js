/* Für Erwachsene: Was ihr selbst tun könnt – Bausteine aus der Therapie für den Alltag (ersetzt keine Therapie) */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.selbstTun;
  var $ = function (id) { return document.getElementById(id); };
  var gebaut = false;

  function liste(punkte, klasse) { return T.el(klasse === "ol" ? "ol" : "ul", { class: klasse === "ol" ? "st-stufen" : klasse || null }, punkte.map(function (p) { return T.el("li", { text: p }); })); }

  function baustein(b, nr) {
    var teile = [
      T.el("h2", {}, [T.bild(b.bild, "e-icon"), T.el("span", { text: (nr + 1) + ". " + b.titel })]),
      T.el("p", { text: b.text })
    ];
    if (b.stufen) teile.push(T.el("h3", { text: I.stufenTitel }), liste(b.stufen, "ol"));
    if (b.nachsatz) teile.push(T.el("p", { text: b.nachsatz }));
    if (b.tun || b.lassen) {
      teile.push(T.el("div", { class: "st-tun" }, [
        b.tun ? T.el("div", { class: "st-spalte tun" }, [T.el("h3", {}, [T.bild("i-ja"), I.tunTitel]), liste(b.tun)]) : null,
        b.lassen ? T.el("div", { class: "st-spalte lassen" }, [T.el("h3", {}, [T.bild("i-nein"), I.lassenTitel]), liste(b.lassen)]) : null
      ]));
    }
    if (b.link) teile.push(T.el("p", {}, [T.el("a", { class: "knopf klein", href: "#" + b.link[0], text: b.link[1] + " →" })]));
    if (b.druck) teile.push(T.el("div", { class: "knoepfe" }, [T.el("button", { type: "button", class: "knopf", text: I.umfeldBlatt.knopf, onclick: druckeUmfeld })]));
    return T.el("section", { class: "e-abschnitt", id: "st-" + b.id, tabindex: "-1" }, teile);
  }

  function umfeldBlatt() {
    var U = I.umfeldBlatt;
    return T.el("article", { class: "blatt st-blatt" }, [
      T.el("header", { class: "lk-titel" }, [T.bild("sokrates-4"), T.el("div", {}, [T.el("h2", { text: U.titel }), T.el("p", { text: U.untertitel })])]),
      T.el("div", {}, U.absaetze.map(function (a) { return T.el("p", { text: a }); })),
      T.el("p", { class: "lk-fuss", text: "Erstellt mit „Sokrates' Teich“." })
    ]);
  }
  function druckeUmfeld() { T.drucke([umfeldBlatt()], "wg-druck st-druck"); }

  function baue() {
    $("st-intro").textContent = I.intro;
    $("st-evidenz").textContent = I.evidenz;
    $("st-grund-titel").textContent = I.grundsaetzeTitel;
    $("st-grund").textContent = "";
    I.grundsaetze.forEach(function (g) {
      $("st-grund").appendChild(T.el("li", {}, [T.bild(g[0]), T.el("span", {}, [T.el("b", { text: g[1] }), " " + g[2]])]));
    });
    var box = $("st-bausteine");
    box.textContent = "";
    I.bausteine.forEach(function (b, i) { box.appendChild(baustein(b, i)); });
    var navi = $("st-navi");
    navi.textContent = "";
    I.bausteine.forEach(function (b) {
      navi.appendChild(T.el("button", { type: "button", class: "knopf klein", text: b.titel, onclick: function () {
        var ziel = $("st-" + b.id);
        ziel.scrollIntoView({ behavior: T.wenigBewegung() ? "auto" : "smooth", block: "start" });
        ziel.focus({ preventScroll: true });
      } }));
    });
    $("st-warn-titel").textContent = I.warnTitel;
    $("st-warn").textContent = "";
    I.warn.forEach(function (w) { $("st-warn").appendChild(T.el("li", { text: w })); });
    $("st-eltern-titel").textContent = I.elternTitel;
    $("st-eltern").textContent = "";
    I.eltern.forEach(function (w) { $("st-eltern").appendChild(T.el("li", { text: w })); });
  }

  T.ansichten["selbst-tun"] = {
    zeige: function () { if (!gebaut) { baue(); gebaut = true; } }
  };
})(window.Teich);
