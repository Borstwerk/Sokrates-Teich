/*
 * Service Worker – macht Sokrates' Teich als Web-App offline nutzbar (z. B. auf dem iPad).
 * Wird nur aktiv, wenn die Seite über http(s) geöffnet wird, nicht per Doppelklick (file://).
 *
 * Nach Änderungen an Dateien: VERSION erhöhen, damit Geräte die neue Fassung laden.
 */
var VERSION = "sokrates-teich-1.7.0";

var DATEIEN = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/css/style.css",
  "assets/js/app.js",
  "assets/js/erwachsene.js",
  "assets/js/funde.js",
  "assets/js/geschichte.js",
  "assets/js/helfer.js",
  "assets/js/inhalt.js",
  "assets/js/karten.js",
  "assets/js/lehrkraefte.js",
  "assets/js/mut-schatz.js",
  "assets/js/mut-steine.js",
  "assets/js/koerper.js",
  "assets/js/panzer-meter.js",
  "assets/js/ruhe-ecke.js",
  "assets/js/speicher.js",
  "assets/js/spiel-alarm.js",
  "assets/js/spiel-boot.js",
  "assets/js/spiel-bruecke.js",
  "assets/js/spiel-code.js",
  "assets/js/spiel-comic.js",
  "assets/js/spiel-fall.js",
  "assets/js/spiel-funkelpost.js",
  "assets/js/spiel-gefuehle.js",
  "assets/js/spiel-licht.js",
  "assets/js/spiel-memory.js",
  "assets/js/spiel-raetselbuch.js",
  "assets/js/spiel-suchen.js",
  "assets/js/spiel-teichfest.js",
  "assets/js/spiel-truhe.js",
  "assets/js/spiel-weg.js",
  "assets/js/spiel-werkstatt.js",
  "assets/js/spiel-werwarwo.js",
  "assets/js/spiel-zeichen.js",
  "assets/js/spiel-zentrale.js",
  "assets/js/spiele.js",
  "assets/js/teich.js",
  "assets/js/vorlesen.js",
  "assets/js/webapp.js",
  "assets/fonts/andika-latin-400-normal.woff2",
  "assets/fonts/andika-latin-700-normal.woff2",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/icon-maskable-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(DATEIEN); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (namen) {
      return Promise.all(namen.filter(function (n) { return n !== VERSION; }).map(function (n) { return caches.delete(n); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Zuerst aus dem Speicher, sonst aus dem Netz – so funktioniert alles auch ohne Internet.
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (treffer) {
      if (treffer) return treffer;
      return fetch(e.request).then(function (antwort) {
        if (antwort && antwort.ok && antwort.type === "basic") {
          var kopie = antwort.clone();
          caches.open(VERSION).then(function (c) { c.put(e.request, kopie); });
        }
        return antwort;
      }).catch(function () {
        // Ohne Netz: bei Seitenaufrufen die Startseite liefern
        if (e.request.mode === "navigate") return caches.match("index.html");
        return Response.error();
      });
    })
  );
});
