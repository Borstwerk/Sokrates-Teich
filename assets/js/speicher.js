/* Speichert Fortschritt und Einstellungen im Browser (localStorage).
 * Anwendungsdaten bleiben lokal; Online-Vorlesestimmen sind davon getrennt und werden in vorlesen.js behandelt.
 */
(function (T) {
  var SCHLUESSEL = "sokrates-teich-v1";
  var BACKUP_VERSION = 1;

  function standard() {
    return {
      backupVersion: BACKUP_VERSION,
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
      koerperNotizen: [],  // [{ zeit, stelle }] – was das Kind unter „Mein Körper“ gemerkt hat
      stimmenKarte: null,  // { eintraege: [{ id, text, bild, zone, eigen }], verlauf: [{ zeit, id, von, nach }] }
      suchListe: [],       // Wegweiser: [{ id, praxis, art, datum, weg, antwort, wartezeit, notiz }]
      wgAlter: "", wgSprichtMit: "", wgFluestert: "", wgZeigt: "", wgStill: "",
      wgSeit: "", wgHilft: "", wgSchwer: "", wgBisher: ""
    };
  }

  // Sicherungen können persönliche Angaben enthalten. Beim Laden akzeptieren wir nur bekannte
  // Top-Level-Felder und begrenzen Größe/Tiefe von Werten, damit kaputte oder manipulierte Dateien
  // nicht unkontrolliert in den Anwendungsspeicher gelangen.
  function sauberWert(wert, tiefe) {
    if (tiefe > 8) return null;
    if (wert === null || typeof wert === "boolean") return wert;
    if (typeof wert === "string") return wert.slice(0, 2000);
    if (typeof wert === "number") return Number.isFinite(wert) ? Math.max(-1000000, Math.min(1000000, wert)) : 0;
    if (Array.isArray(wert)) return wert.slice(0, 500).map(function (v) { return sauberWert(v, tiefe + 1); });
    if (typeof wert === "object") {
      var aus = {};
      Object.keys(wert).slice(0, 150).forEach(function (k) {
        if (k === "__proto__" || k === "prototype" || k === "constructor" || k.length > 100) return;
        aus[k] = sauberWert(wert[k], tiefe + 1);
      });
      return aus;
    }
    return null;
  }

  function bereinige(obj) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) throw new Error("ungültige Sicherung");
    var basis = standard();
    Object.keys(basis).forEach(function (k) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) basis[k] = sauberWert(obj[k], 0);
    });
    basis.backupVersion = BACKUP_VERSION;
    return basis;
  }

  function istSicherung(obj) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
    // Alte Sicherungen hatten noch keine Versionsnummer. Mindestens zwei typische Strukturen
    // müssen vorhanden sein, damit nicht irgendeine JSON-Datei akzeptiert wird.
    return Array.isArray(obj.schatz) &&
      (obj.backupVersion === undefined || Number(obj.backupVersion) >= 1) &&
      (obj.steine === undefined || (obj.steine && typeof obj.steine === "object" && !Array.isArray(obj.steine)));
  }

  var daten = standard();
  var funktioniert = true;

  try {
    var roh = window.localStorage.getItem(SCHLUESSEL);
    if (roh) daten = bereinige(JSON.parse(roh));
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
    istSicherung: istSicherung,
    ersetze: function (obj) { daten = bereinige(obj); sichern(); },
    zuruecksetzen: function () { daten = standard(); sichern(); },
    funktioniert: function () { return funktioniert; }
  };
})(window.Teich = window.Teich || {});
