/* Der Teich – Startseite */
(function (T) {
  T.ansichten = T.ansichten || {};
  var I = T.inhalt.teich;
  var szene, angekommen = false;

  T.ansichten.teich = {
    zeige: function () {
      if (!szene) {
        szene = T.szene({ level: 1, libelle: true });
        document.getElementById("teich-szene").appendChild(szene);
      }
      // Beim ersten Öffnen spaziert Sokrates herein
      if (!angekommen && !T.wenigBewegung()) {
        szene.sokrates.classList.add("kommt-an", "laeuft");
        setTimeout(function () { szene.sokrates.classList.remove("laeuft", "kommt-an"); T.nicken(szene.sokrates); }, 2800);
      } else {
        T.nicken(szene.sokrates);
      }
      angekommen = true;
      var blase = document.getElementById("teich-blase");
      var neu = !T.speicher.get("geschichteGelesen");
      var geschichte = T.inhalt.orte.find(function (ort) { return ort.id === "geschichte"; });
      blase.textContent = "";
      blase.appendChild(T.el("span", { class: "titel lesen", text: T.mitName(I.gruss) }));
      var text = T.el("div", { class: "lesen" });
      T.absaetze(text, I.text);
      blase.appendChild(text);
      var einstieg = T.el("div", { class: "teich-start" });
      if (neu) einstieg.appendChild(T.el("p", { class: "start-hinweis lesen", text: I.startHier }));
      einstieg.appendChild(T.el("a", { class: "knopf" + (neu ? " haupt" : ""), href: "#geschichte" }, [
        T.bild(geschichte.bild), T.el("span", { text: geschichte.name })
      ]));
      blase.appendChild(einstieg);
      T.pop(blase);

      var orte = document.getElementById("orte");
      orte.textContent = "";
      var inKiste = T.speicher.get("funde").some(function (f) { return f.x === null; });
      I.gruppen.forEach(function (gruppe) {
        var liste = T.el("ul", { class: "orte" });
        gruppe.orte.forEach(function (id) {
          var ort = T.inhalt.orte.find(function (o) { return o.id === id; });
          if (ort.spiel && !T.spieleAn()) return;
          var link = T.el("a", { class: "ort", href: "#" + ort.id }, [
            T.el("span", { class: "bild" }, [T.bild(ort.bild)]),
            T.el("span", {}, [T.el("b", { text: ort.name }), T.el("span", { text: ort.unter })])
          ]);
          if (inKiste && ort.id === "mein-teich") link.appendChild(T.el("span", { class: "marke", text: T.inhalt.funde.neu }));
          liste.appendChild(T.el("li", {}, [link]));
        });
        orte.appendChild(T.el("section", { class: "teich-gruppe " + gruppe.id }, [
          T.el("h2", { class: "lesen", text: !T.spieleAn() && gruppe.ohneSpiele ? gruppe.ohneSpiele : gruppe.titel }), liste
        ]));
        T.nacheinander(liste);
      });
    }
  };
})(window.Teich);
