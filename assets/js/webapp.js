/*
 * Web-App: Manifest, App-Symbol und Offline-Speicher (Service Worker).
 * Nur bei Aufruf über http(s) – per Doppelklick (file://) bleibt alles wie bisher.
 */
(function () {
  if (!/^https?:$/.test(location.protocol)) return;

  function link(rel, href, extra) {
    var l = document.createElement("link");
    l.rel = rel; l.href = href;
    Object.keys(extra || {}).forEach(function (k) { l.setAttribute(k, extra[k]); });
    document.head.appendChild(l);
  }
  // Hinter einer Anmeldung (Cloudflare Access) braucht der Abruf des Manifests das Anmelde-Cookie
  link("manifest", "manifest.webmanifest", { crossorigin: "use-credentials" });
  link("apple-touch-icon", "assets/icons/apple-touch-icon.png", { sizes: "180x180" });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () { /* ohne Offline-Speicher geht es trotzdem */ });
    });
  }
})();
