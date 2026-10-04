# Changelog

Alle nennenswerten Änderungen an Sokrates' Teich.

## [Unreleased]

### Neu
- **Abenteuer** für Kinder ab etwa 8: *Die versunkene Truhe* (vier Rätsel), *Alarmzentrale*
  (Situationen mit Hilfen leichter machen) und *Detektiv Sokrates* (Fall mit Orten, Hinweisen und sechs
  gleichwertigen Wegen zu fragen). Fortschritt wird gespeichert, die Abenteuer greifen ineinander
  (Schlüssel aus der Truhe öffnet die Bootshütte). Neue Teich-Schätze: Kristall, Kompass, Laterne.
- *Für Erwachsene:* häufig gewählte Hilfen aus der Alarmzentrale.
- **Spiele** (ohne Zeitdruck, ohne Verlieren, ohne Sprechen): Seerosen-Boot (Atmen), Alarmanlagen-Detektiv,
  Ohne Worte (Daumen und Zeigen), Wo ist Sokrates? (drei Suchbilder) und Gefühle-Memory.
- **Dein Teich:** Nach jedem Spiel findet Sokrates einen Schatz; echter Mut (Mut-Steine, Mut-Schatz)
  bringt besondere, leuchtende Schätze. Das Kind gestaltet damit seinen eigenen Teich.
- *Für Erwachsene:* Schalter „Spiele und Teich-Schätze anzeigen“ und die letzte Runde des
  Alarmanlagen-Detektivs.
- **Web-App (PWA)** für iPad und Tablets: Manifest, App-Symbole, Offline-Speicher (`sw.js`).
  Nur aktiv bei Aufruf über http(s); per Doppelklick (`file://`) bleibt alles wie bisher.
- Anleitung [docs/IPAD.md](docs/IPAD.md): Bereitstellung nur für die Familie (Cloudflare Workers + Access).
- `wrangler.jsonc` und `.assetsignore`: Cloudflare liefert nur die App-Dateien aus (keine Doku, kein `.git`).
- Vorlesen: erweiterte iPad-Stimmen („Erweitert“/„Premium“) werden bevorzugt.

### Behoben
- Auf Touch-Geräten blieben Drüberfahr-Effekte nach dem Antippen hängen (z. B. schief stehende Karte);
  diese Effekte gibt es jetzt nur noch mit Maus.

### Dokumentation und Evidenz
- Public-Release-Audit der zentralen fachlichen Aussagen gegen direkt zugängliche Volltexte und Fachquellen (2023/2025 Reviews, ASHA, NHS, SMA, Mutismus e.V.).
- Formulierung zur medizinischen Zweckbestimmung präzisiert: nicht zur Diagnose oder Behandlung bestimmt; nicht als Medizinprodukt entwickelt.
- Datenschutztexte zu Online-Vorlesestimmen und lokaler Speicherung konsistent formuliert.
- Hinweise zum schulischen Nachteilsausgleich als bundeslandabhängige Orientierung statt allgemeingültige Verfahrensaussage präzisiert.

## [1.0.0] – Erstveröffentlichung

### Für Kinder
- **Sokrates erzählt:** Bilderbuch in 9 Seiten über die Alarmanlage im Kopf und die versteckte Stimme.
- **Panzer-Meter:** Gefühle in 5 Stufen ohne Worte zeigen.
- **Mut-Steine:** drei vorbereitete Wege (Jemand Neues, Viele Menschen, Ein neuer Ort) und ein eigener Weg.
- **Ruhe-Ecke:** Atmen mit Sokrates und Panzer-Pause.
- **Karten-Kiste:** Karten zum Zeigen, groß anzeigen, vorlesen, eigene Karten; Druck mit Grundgröße und Skalierung.
- **Mut-Schatz:** jede Form von Mut sammeln, Glas mit vereinbarter Belohnung.

### Für Erwachsene
- Hintergrundwissen, „Was hilft – was eher nicht“, Hilfe finden, Abgrenzung („Was diese Seite nicht ist“).
- **Für Lehrkräfte:** Infoblatt (1 Seite A4) und 8 Erklär-Karten, auf das Kind zugeschnitten.
- Einstellungen: Name, Vorlesestimme und Tempo, Bewegung (Automatisch/Normal/Ruhig), Sicherung.

### Technik
- Läuft offline von der Festplatte, keine externen Ressourcen, Speicherung nur im Browser.
- Vorlesen über die Browser-Stimmen (natürlichste Stimme wird automatisch gewählt).
- Geprüft: Tastaturbedienung, Handy-Breite, Ruhig-Modus, Druck, WCAG 2 AA (axe-core).
