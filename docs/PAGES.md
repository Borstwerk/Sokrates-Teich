# PAGES.md – Seitenstruktur (Greybox)

Status: **freigegeben und umgesetzt** · Methode: KI-Regeln `greybox`
Texte im Detail: [`INHALT.md`](INHALT.md)

## Übersicht

```text
Der Teich
├─ Sokrates erzählt – Einstieg in der Begrüßung
├─ Was hilft mir gerade?
│  ├─ Panzer-Meter
│  ├─ Ruhe-Ecke
│  ├─ Karten-Kiste
│  └─ Mut-Steine
├─ Spielen und sammeln
│  ├─ Spiele – Kleine Spiele / Knobeln / Abenteuer / Selber gestalten
│  ├─ Dein Teich
│  └─ Mut-Schatz
└─ Für Erwachsene – eigene Weiter-Karte
```

Reihenfolge-Empfehlung beim ersten Besuch: **Geschichte → Panzer-Meter → Ruhe-Ecke → Mut-Steine**.
Danach frei wählbar. Nichts ist gesperrt.

## Feste Elemente auf jeder Unterseite

```text
┌──────────────────────────────────────────────────────────┐
│ [← Zurück]                                 [🔊 Vorlesen] │
│                                                          │
│                Titel des Ortes                           │
│                                                          │
│     (Sokrates-Bild)   ( Sprechblase mit 2–4 Sätzen )     │
│                                                          │
│              [ Hauptaktion ]                             │
└──────────────────────────────────────────────────────────┘
```

Der Rückweg führt aus Spielen zur Spieleübersicht, aus „Für Lehrkräfte“ zu „Für Erwachsene“ und sonst zum Teich.

---

## 1. Der Teich (Start) – `#teich`

- **Zweck:** Ankommen, sich orientieren, einen Ort wählen.
- **Primärinhalt:** Illustration eines Teichs; Sokrates sitzt am Ufer. Begrüßung in der Sprechblase.
- **Einstieg:** „Sokrates erzählt“ direkt in der Begrüßung. Beim ersten Besuch als Hauptaktion mit „Fang hier an!“.
- **Weitere Orte:** „Was hilft mir gerade?“ (Panzer-Meter, Ruhe-Ecke, Karten-Kiste, Mut-Steine) und
  „Spielen und sammeln“ (Spiele, Dein Teich, Mut-Schatz). Alle acht Orte bleiben frei erreichbar.
- **Spiele ausgeschaltet:** Spiele und Dein Teich verschwinden; der zweite Bereich heißt „Mut sammeln“.
- **Sekundär:** Weiter-Karte „Für Erwachsene“ ganz unten.
- **Mobil/schmal:** Orte als Liste untereinander statt Karte.

## 2. Sokrates erzählt – `#geschichte`

- **Zweck:** Psychoedukation: Was passiert in mir? Nicht meine Schuld. Kleine Schritte helfen.
- **Primärinhalt:** 9 kurze Bilder-Seiten (wie ein Bilderbuch), je 1 Bild + 2–4 Sätze.
- **Hauptaktion:** [Weiter →] / [← Zurück]; Fortschrittspunkte (●●●○○…).
- **Ende:** „Kommst du mit?“ → Buttons zu Panzer-Meter und Mut-Steinen.

## 3. Panzer-Meter – `#panzer-meter` *(Signature)*

- **Zweck:** Gefühl zeigen, ohne zu sprechen (Angst-Thermometer als Schildkröte).
- **Primärinhalt:** großer Sokrates, darunter 5 Stufen-Buttons (Bild + Wort + Zahl).
  Wahl → Sokrates gleitet in die passende Pose, Alarmanlage leuchtet ab Stufe 3.
- **Antwort von Sokrates:** passend zur Stufe, immer annehmend. Ab Stufe 4 Angebot: „Willst du mit mir
  atmen?“ → Ruhe-Ecke.
- **Optional:** „Wo bist du gerade in Gedanken?“ – Bilder: Zuhause · Schule · Viele Menschen · Neuer Ort.
- **Nichts wird gespeichert**, außer das Kind will es im Mut-Schatz festhalten (später entscheiden).

## 3b. Mein Körper – `#koerper` (seit Version 1.4)

- **Zweck:** Körperliche Angstzeichen verstehen und zeigen können (Bauch-, Kopfweh, Kloß im Hals, Herzklopfen,
  Zittern, Erstarren, Müdigkeit). Grundlage: [`recherche/02-koerper.md`](recherche/02-koerper.md).
- **Primärinhalt:** Kinderfigur mit sieben beschrifteten Stellen (Kopf, Hals, Herz, Bauch, Hände, Beine,
  Ganz müde). Antippen → Stelle leuchtet, Sprechblase: „So kann es sich anfühlen“, „Warum?“, „Das kann helfen“
  (teils mit Link zur Ruhe-Ecke oder Karten-Kiste).
- **Aktionen:** „Als Karte zeigen“ (große Karte, z. B. „Ich habe Bauchweh.“) und „Für Mama oder Papa merken“
  (lokale Notiz mit Zeitpunkt; sichtbar und druckbar unter *Für Erwachsene*).
- **Einstieg:** Startseite („Was hilft mir gerade?“) und Panzer-Meter ab Stufe 3 („Spürst du es im Körper?“).
- **Sprache:** „Das Weh ist echt. Und es ist nicht gefährlich.“ Keine Diagnosebegriffe, keine Heilversprechen.
  Hinweis für Erwachsene: bei häufigen oder starken Beschwerden ärztlich nachschauen lassen.

## 4. Mut-Steine – `#mut-steine` *(Signature)*

- **Zweck:** Mut-Leiter / kleine Schritte sichtbar machen.
- **Primärinhalt:** Ein Teich mit Trittsteinen vom Ufer „Hier bin ich“ zum Ufer „Mein Ziel“.
- **Drei vorbereitete Wege** passend zu ihren Situationen (Texte in `INHALT.md`):
  1. „Jemand Neues“ (z. B. neue Lehrerin/neuer Lehrer)
  2. „Viele Menschen“
  3. „Ein neuer Ort“
- **Eigener Weg:** Steine selbst beschriften (mit Mama/Papa).
- **Hauptaktion:** Stein antippen → „Hab ich geschafft!“ → Stein leuchtet, Stern in den Mut-Schatz.
- **Wichtig:** Steine kann man beliebig oft machen. Man kann nicht „zurückfallen“. Kein Stein *muss*
  Sprechen enthalten; die ersten Steine sind immer nonverbal.
- **Hinweis für Erwachsene** (aufklappbar): Wege gemeinsam festlegen, kleine Schritte, später mit
  Therapeut:in abgleichen.

## 5. Ruhe-Ecke – `#ruhe-ecke`

- **Zweck:** Beruhigen, wenn der Bauch kribbelt.
- **Primärinhalt:** Sokrates schwimmt im Teich; ein Wasserkreis wächst (einatmen) und schrumpft (ausatmen).
- **Hauptaktion:** [Los geht's] → 5 Atemzüge, danach [Noch mal] / [Zurück zum Teich].
- **Zweite Übung:** „Panzer-Pause“ – Sokrates zieht sich gemütlich in den Panzer zurück; Text lädt ein,
  kurz die Augen zuzumachen und bis 5 zu zählen.

## 6. Karten-Kiste – `#karten`

- **Zweck:** Nonverbale Kommunikation; Karten für Schule und unterwegs.
- **Primärinhalt:** Raster aus großen Karten (Bild + kurzer Satz).
- **Hauptaktion:** Karte groß anzeigen (zum Zeigen am Bildschirm); das Kartenraster steht direkt nach der Einleitung.
- **Anpassen:** Bildschirmgröße und eigene Karten unter dem Kartenraster.
- **Drucken:** Format, Skalierung und Druckaktion im aufklappbaren Bereich „Für Erwachsene: Karten ausdrucken“.
- **Eigene Karte:** Text eingeben (mit Erwachsenen), Symbol wählen.

## 7. Mut-Schatz – `#mut-schatz`

- **Zweck:** Jede Form von Mut sammeln und sichtbar machen (positive Verstärkung).
- **Primärinhalt:** Ein Glas am Ufer, das sich mit leuchtenden Mut-Steinchen füllt; darunter die Liste.
- **Hauptaktion:** [Heute war ich mutig!] → Was hast du gemacht? (Bild-Auswahl: geguckt · genickt · gezeigt ·
  gelächelt · hingegangen · eine Karte gezeigt · geflüstert · gesprochen · etwas anderes) → Steinchen ins Glas.
- **Optional (mit Eltern):** „Wenn das Glas voll ist, dann …“ – eine selbst gewählte Belohnung eintragen.

## 8. Spiele – `#spiele` (seit Version 1.1)

- **Zweck:** Einen Grund geben, wiederzukommen – und dabei üben, ohne Druck.
- **Leitplanken:** kein Mikrofon, keine Aufforderung zu sprechen, kein Zeitdruck, kein Verlieren, keine
  Punkte; Sokrates ist nie traurig, wenn das Kind länger nicht da war; jedes Spiel endet ruhig;
  abschaltbar unter *Für Erwachsene*.
- **Seerosen-Boot** `#spiel-boot`: Knopf gedrückt halten = einatmen (4 s), loslassen = ausatmen (5 s);
  das Boot fährt, ein Glühwürmchen leuchtet. 5 Atemzüge.
- **Alarmanlagen-Detektiv** `#spiel-alarm`: 6 Situationskarten → Leise / Mittel / Laut / Weiß nicht;
  Übersicht am Ende. Die letzte Runde sehen Eltern unter *Für Erwachsene* (nur auf diesem Gerät).
- **Ohne Worte** `#spiel-zeichen`: 6 Fragen, Antworten mit Daumen hoch/runter, „Weiß nicht“ oder Zeigen
  auf Bilder und Farben. Jede Antwort wird „verstanden“.
- **Wo ist Sokrates?** `#spiel-suchen`: drei Suchbilder (Spielplatz, Schulhof, Markt), Verstecke zufällig;
  „Tipp“ zeigt die Stelle, ein zweites Antippen zählt als gefunden (auch für Tastatur).
- **Gefühle-Memory** `#spiel-memory`: 4 oder 6 Paare mit Sokrates-Gesichtern; zu jedem Paar ein Satz.

## 8b. Abenteuer (seit Version 1.2)

Größere Spiele für Kinder ab etwa 8 Jahren. Grundidee: Der Teich soll auch ein Ort sein, an dem man
einfach Spaß hat – nicht jeder Klick ist eine Übung. Fortschritt wird gespeichert; Aufhören ist jederzeit möglich.

- **Die versunkene Truhe** `#spiel-truhe`: vier Schlösser in beliebiger Reihenfolge – Zählen (Code aus
  der Anzahl der Tiere), Muster ergänzen (3 Reihen), Logik (Tiere nach Hinweisen auf Steine setzen,
  eindeutig lösbar erzeugt), Schiebebild 3×3. Falsche Versuche geben nur freundliche Hinweise. Belohnung:
  Kristall und ein Schlüssel für den Detektivfall.
- **Alarmzentrale** `#spiel-zentrale`: 8 Missionen (z. B. neue Lehrerin, Bäcker, Arzt). Jede Situation
  besteht aus Faktoren (unbekannte Person, neuer Ort, viele Menschen, Frage, alle schauen …). Bis zu drei
  Hilfen senken einzelne Faktoren; die Alarmanzeige reagiert sofort. Ziel: Alarm höchstens 3 von 10. Jede
  Mission hat viele Lösungen; „Antworten zeigen“ und „Aufschreiben“ wirken gleich stark. Häufig gewählte
  Hilfen sehen Erwachsene unter *Für Erwachsene*. Alle Missionen geschafft: Kompass.
- **Detektiv Sokrates** `#spiel-fall`: Funkel, das kleinste Glühwürmchen, ist verschwunden. Vier Orte mit
  je einem versteckten Hinweis und einer Person zum Fragen. Sechs Wege zu fragen (Freundin fragt mit,
  Karte, Aufschreiben, Zeigen, Flüstern, selbst fragen) – **alle liefern denselben Hinweis**, damit Sprechen
  nicht zum besseren Weg wird. Ab 6 Hinweisen: „Wo ist Funkel?“ → alte Bootshütte; die Tür öffnet der
  Schlüssel aus der Truhe. Belohnung: Laterne.

## 8c. Knobeln und weitere Spiele (seit Version 1.3)

Die Spiele-Seite ist in drei Bereiche gegliedert: **Kleine Spiele**, **Knobeln**, **Abenteuer**.

- **Teich-Rätselbuch** `#spiel-raetselbuch`: jeden Tag (Datum als Startwert) drei Rätsel – Tier-Sudoku 4×4
  (eindeutig lösbar erzeugt), Tier-Rechnung, Zahlen-Reihe. „Noch ein Rätsel, bitte!“ erzeugt Extra-Rätsel.
  Ein Schatz pro Tag, wenn alle drei gelöst sind. Kein Serien-Zähler (kein Druck, täglich zu spielen).
- **Geheime Zeichen** `#spiel-code`: Zeichenschrift aus 5 Formen × 6 Markierungen. Sechs Botschaften
  entschlüsseln; eigene Botschaft schreiben und mit Schlüssel ausdrucken.
- **Über den großen Teich** `#spiel-weg`: Rucksack mit begrenztem Platz packen (Freundin, Wegkarte, Pause,
  Antwort-Karte), dann Stein für Stein gehen. Besondere Steine brauchen die passende Hilfe. Fünf Wege,
  ab Weg 2 mit mehreren richtigen Packungen. Kein Scheitern: „Rucksack neu packen“.
- **Wer fühlt was?** `#spiel-gefuehle`: Szenen mit Tieren; passende Gefühle erkennen (mehrere richtig),
  dann eine Hilfe auswählen.
- **Das Teichfest** `#spiel-teichfest`: Entscheidungsgeschichte mit fünf Enden, alle positiv; gefundene
  Enden werden gesammelt.

## Navigation

- Oben links führt der Zurück-Knopf je nach Bereich zum Teich, zu den Spielen oder zu „Für Erwachsene“.
- Statt Textlinks am Seitenende gibt es **Weiter-Karten** (Bild, Titel, Untertitel, Pfeil), z. B.
  „Für Erwachsene“ auf der Startseite oder „Für Lehrkräfte“ in der Karten-Kiste.
- In der **Alarmzentrale** sind die ausführlichen Faktoren aufklappbar. Alle elf Hilfen bleiben direkt
  wählbar, gegliedert in „Zusammen“, „Vorbereiten und zeigen“ und „Zeit und Ruhe“.
- Im **Detektivfall** zeigt die geschlossene Akte ihre Hinweiszahl. Öffnen ist jederzeit möglich; neue
  Hinweise erhalten den Öffnungszustand. Die Orte stehen in einer eigenen Zeile vor der Suchszene.

## 9. Dein Teich – `#mein-teich` (seit Version 1.1)

- **Zweck:** Belohnung sichtbar machen. Spiele bringen Tiere und Pflanzen, echter Mut (Mut-Steine,
  Mut-Schatz) bringt besondere, leuchtende Schätze.
- **Bedienung:** Schatz in der Schatzkiste antippen → er landet im Teich; mit dem Finger verschieben oder
  auf eine Stelle im Wasser tippen; „Zurück in die Kiste“. Tastatur: Pfeiltasten, Entf.
- Auf der Startseite zeigt „Neu!“ an, wenn etwas in der Schatzkiste wartet.
- Eigene Werkstücke aus der Werkstatt verwenden dieselbe Schatzkiste und dieselbe Bedienung.
  „In der Werkstatt ändern“ öffnet das gewählte Stück; Änderungen behalten dessen Teich-Position.

## 9a. Sokrates’ Werkstatt – `#spiel-werkstatt`

- Frei gestaltbare Lampions, Boote und Schilder; keine Aufgabe und keine Punkte.
- Form, Farbe, Muster und Zeichen über beschriftete Knöpfe auswählen. Schilder können bis zu
  24 Zeichen tragen; Worte sind freiwillig. Die Vorschau zeigt den aktuellen Entwurf.
- Der Entwurf wird lokal behalten. „In die Schatzkiste legen“ speichert ein neues Stück;
  anschließendes Speichern ändert dasselbe Stück. „Etwas Neues gestalten“ beginnt einen neuen Entwurf.
- Eigene Stücke sind auch direkt in der Werkstatt zum Weitergestalten erreichbar. Entwürfe liegen
  unter `abenteuer.werkstatt`, fertige Stücke mit ihrer Gestaltung unter `funde` und sind damit Teil
  von Sicherung, Import und Zurücksetzen. Bestehende Sicherungen brauchen keine Migration.
- Die Spieleübersicht hat zusätzlich zu den 13 Spielen den Bereich „Selber gestalten“.

### Beobachtungen und Möglichkeiten

- „Wer fühlt was?“ beginnt je Szene mit einer beobachtbaren Aussage und einer Gefühlsvermutung.
  Beide Antworten erklären den Unterschied und öffnen die möglichen Gefühle. Keine Antwort wird gesperrt.
- Jede Gefühlswahl und „Ich weiß es noch nicht“ öffnet dieselben Hilfen. Beobachtung und Vermutung
  bleiben sichtbar getrennt; das tatsächliche Gefühl bleibt ausdrücklich offen.
- Im Rätselbuch zeigt die Übersicht eine freie Auswahl statt „Heute: 0 von 3 gelöst“. Die
  Rätselgenerierung, gespeicherten Lösungen und bisherigen Fundregeln bleiben erhalten.

## 10. Für Erwachsene – `#erwachsene`

Seit Version 1.4 in Abschnitte gegliedert, mit Sprungmarken oben: Verstehen · Körper (Wenn der Körper Alarm
schlägt, Warnzeichen, Körper-Notizen) · Alltag · Schule · Aus den Spielen · Hilfe finden · Einstellungen · Daten.

- **Zweck:** Eltern informieren und Einstellungen.
- **Inhalt:** Was ist selektiver Mutismus (kurz) · So nutzt ihr die Seite zusammen · Hilfreich / Vermeiden ·
  Therapieplatz finden · Buchtipps · Quellen (Verweis auf Recherche).
- **Einstellungen:** Name des Kindes · Vorlesen an/aus und Tempo · Spiele und Teich-Schätze an/aus ·
  Fortschritt zurücksetzen (mit Sicherheitsabfrage).

---

## Offene Punkte

- Soll das Panzer-Meter Einträge speichern (Verlauf über Tage)? Vorschlag: **nein** für den Anfang – es ist
  ein Moment-Werkzeug, kein Tagebuch.
- Soll der Mut-Schatz eine Zielzahl haben (z. B. 20 Steinchen = Glas voll)? Vorschlag: ja, einstellbar.

## Umsetzung (Stand Erstversion)

- Umgesetzt wie oben beschrieben, mit diesen Entscheidungen: Panzer-Meter speichert nichts; Mut-Schatz-Ziel
  ist einstellbar (Standard 20); geschaffte Mut-Steine landen automatisch im Mut-Schatz.
- **Noch nicht umgesetzt:** die optionale Frage „Wo bist du gerade in Gedanken?“ im Panzer-Meter.
