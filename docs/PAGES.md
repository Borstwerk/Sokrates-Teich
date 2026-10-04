# PAGES.md – Seitenstruktur (Greybox)

Status: **freigegeben und umgesetzt** · Methode: KI-Regeln `greybox`
Texte im Detail: [`INHALT.md`](INHALT.md)

## Übersicht

```text
                ┌─────────────────────────────┐
                │      🐢  DER TEICH (Start)   │
                └──────────────┬──────────────┘
   ┌──────────┬──────────┬─────┴─────┬──────────┬──────────┐
   ▼          ▼          ▼           ▼          ▼          ▼
Sokrates   Panzer-    Mut-Steine  Ruhe-Ecke  Karten-   Mut-Schatz
erzählt    Meter                             Kiste
(Geschichte)                                                    
                                              … und klein unten: „Für Erwachsene“
```

Reihenfolge-Empfehlung beim ersten Besuch: **Geschichte → Panzer-Meter → Ruhe-Ecke → Mut-Steine**.
Danach frei wählbar. Nichts ist gesperrt.

## Feste Elemente auf jeder Unterseite

```text
┌──────────────────────────────────────────────────────────┐
│ [← Zurück zum Teich]                        [🔊 Vorlesen] │
│                                                          │
│                Titel des Ortes                           │
│                                                          │
│     (Sokrates-Bild)   ( Sprechblase mit 2–4 Sätzen )     │
│                                                          │
│              [ Hauptaktion ]                             │
└──────────────────────────────────────────────────────────┘
```

---

## 1. Der Teich (Start) – `#teich`

- **Zweck:** Ankommen, sich orientieren, einen Ort wählen.
- **Primärinhalt:** Illustration eines Teichs; Sokrates sitzt am Ufer. Begrüßung in der Sprechblase.
- **Hauptaktion:** Einen der sechs Orte anklicken (Ort-Kacheln mit Bild + Name).
- **Sekundär:** kleiner Link „Für Erwachsene“ ganz unten.
- **Besonderer Zustand:** Erster Besuch → Sokrates schlägt „Sokrates erzählt“ vor (leicht hervorgehoben).
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
- **Hauptaktionen:** Karte groß anzeigen (zum Zeigen am Bildschirm) · [🖨 Drucken].
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

## 9. Dein Teich – `#mein-teich` (seit Version 1.1)

- **Zweck:** Belohnung sichtbar machen. Spiele bringen Tiere und Pflanzen, echter Mut (Mut-Steine,
  Mut-Schatz) bringt besondere, leuchtende Schätze.
- **Bedienung:** Schatz in der Schatzkiste antippen → er landet im Teich; mit dem Finger verschieben oder
  auf eine Stelle im Wasser tippen; „Zurück in die Kiste“. Tastatur: Pfeiltasten, Entf.
- Auf der Startseite zeigt „Neu!“ an, wenn etwas in der Schatzkiste wartet.

## 10. Für Erwachsene – `#erwachsene`

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
