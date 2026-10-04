/* Speichert Fortschritt und Einstellungen im Browser (localStorage). Verlässt nie den Computer. */
(function (T) {
  var SCHLUESSEL = "sokrates-teich-v1";

  function standard() {
    return {
      name: "",
      vorlesen: true,
      tempo: 0.9,
      stimme: "",
      atemStimme: false,
      steine: {},          // { wegId: { schrittIndex: anzahl } }
      eigenerWeg: [],      // [{ id, text }]
      schatz: [],          // [{ zeit, bild, text }]
      ziel: 20,
      belohnung: "",
      glasStart: 0,
      volleGlaeser: 0,
      eigeneKarten: [],    // [{ id, bild, text }]
      geschichteGelesen: false,
      letzterWeg: "neu",
      kartenGroesse: "mittel",
      kartenProSeite: 4,
      lkProSeite: 4,
      kartenSkalierung: 100,
      lkSkalierung: 100,
      lkEltern: "",
      lkKontakt: "",
      lkVertrauen: "",
      lkHilft: "",
      bewegung: "auto",  // auto | normal | ruhig
      spieleAn: true,
      funde: [],           // [{ id, art, x, y, zeit }] – x/y in Prozent, null = noch in der Schatzkiste
      alarmRunden: [],     // [{ zeit, antworten: [{ text, stufe }] }] – die letzten Runden
      abenteuer: {},       // { truhe: {…}, zentrale: {…}, fall: {…} }
      koerperNotizen: []   // [{ zeit, stelle }] – was das Kind unter „Mein Körper“ gemerkt hat
    };
  }

  var daten = standard();
  var funktioniert = true;

  try {
    var roh = window.localStorage.getItem(SCHLUESSEL);
    if (roh) daten = Object.assign(standard(), JSON.parse(roh));
  } catch (e) {
    funktioniert = false;
  }

  function sichern() {
    try {
      window.localStorage.setItem(SCHLUESSEL, JSON.stringify(daten));
      funktioniert = true;
    } catch (e) {
      funktioniert = false;
    }
  }

  T.speicher = {
    get: function (k) { return daten[k]; },
    set: function (k, wert) { daten[k] = wert; sichern(); },
    aendere: function (k, fn) { daten[k] = fn(daten[k]); sichern(); },
    alles: function () { return JSON.parse(JSON.stringify(daten)); },
    ersetze: function (obj) { daten = Object.assign(standard(), obj); sichern(); },
    zuruecksetzen: function () { daten = standard(); sichern(); },
    funktioniert: function () { return funktioniert; }
  };
})(window.Teich = window.Teich || {});
