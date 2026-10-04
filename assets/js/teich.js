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
      blase.textContent = "";
      blase.appendChild(T.el("span", { class: "titel lesen", text: T.mitName(I.gruss) }));
      var text = T.el("div", { class: "lesen" });
      T.absaetze(text, I.text);
      blase.appendChild(text);
      T.pop(blase);

      var orte = document.getElementById("orte");
      orte.textContent = "";
      var neu = !T.speicher.get("geschichteGelesen");
      T.inhalt.orte.forEach(function (ort) {
        var link = T.el("a", { class: "ort", href: "#" + ort.id }, [
          T.el("span", { class: "bild" }, [T.bild(ort.bild)]),
          T.el("span", {}, [T.el("b", { text: ort.name }), T.el("span", { text: ort.unter })])
        ]);
        if (neu && ort.id === "geschichte") link.appendChild(T.el("span", { class: "marke", text: I.startHier }));
        orte.appendChild(T.el("li", {}, [link]));
      });
      T.nacheinander(orte);
    }
  };
})(window.Teich);
