# DESIGN.md – Sokrates' Teich

Status: **freigegeben und umgesetzt** · Grundlage: [`recherche/01-synthese.md`](recherche/01-synthese.md)
Methode: KI-Regeln `frontend-design` → `design-system` → `motion-design` (Contract-Ebene)

---

## 1. Designbrief (`frontend-design`)

### Produkt und Zielgruppe

- **Was:** Eine lokale, interaktive Webseite (läuft offline per Doppelklick auf `index.html`).
- **Für wen:** Kinder im Grundschulalter (etwa 7–10 Jahre) mit selektivem Mutismus. Texte für Leseanfänger
  (etwa Anfang 3. Klasse). Typische Situationen, in denen sich die Stimme versteckt: **unbekannte Personen**
  (z. B. eine neue Lehrkraft), **viele Menschen**, **außerhalb des Zuhauses**, **unbekannte Orte**.
  Erklärbild: die **Alarmanlage** im Kopf.
- **Zweitpublikum:** Eltern (eigener, unauffälliger Bereich „Für Erwachsene“).

### Seitenthese

> „Meine Stimme ist nicht kaputt. Sie versteckt sich, weil meine Alarmanlage mich beschützen will –
> und ich kann ihr in kleinen Schritten zeigen, dass es sicher ist.“

### Designrichtung: „Ein ruhiger Teich, in dem eine Schildkröte wohnt“

Die Begleitfigur ist **Sokrates, die Schildkröte**. Das passt besonders gut, denn die
Schildkröte *ist* das Erklärmodell:

| Schildkröte | Selektiver Mutismus |
|---|---|
| Zieht bei Gefahr den Kopf in den Panzer | Alarmanlage → Erstarren → Stimme versteckt sich |
| Der Panzer ist sicher, nicht schlimm | Rückzug ist Schutz, keine Schuld |
| Kommt langsam wieder heraus | Mut in kleinen Schritten |
| Ist langsam – und kommt trotzdem an | „Langsam ist auch mutig“, das Kind bestimmt das Tempo |
| Geht über Trittsteine durch den Teich | Mut-Leiter wird zu **Mut-Steinen** (Schildkröten klettern nicht auf Leitern) |

Die ganze Seite ist ein **Teich mit Ufer**: Jeder Bereich ist ein Ort am Teich. Das ergibt eine eigene,
zusammenhängende Welt statt einer Menüseite.

### Signature Elements

1. **Das Panzer-Meter:** Sokrates zieht sich je nach gewähltem Gefühl Stück für Stück in den Panzer zurück
   (5 Stufen). Das Kind zeigt so *ohne Worte*, wie es ihm geht – genau die nonverbale Kommunikation, die
   laut Recherche ein gültiger Schritt ist.
2. **Die Mut-Steine:** Ein Weg aus Trittsteinen über den Teich. Jeder Stein ist ein kleiner, selbst
   gewählter Mut-Schritt. Erledigte Steine leuchten.

### Typografischer Charakter

**Andika** (SIL, Open Font License) – speziell für Leseanfänger entwickelt, klare Buchstabenformen
(eindeutiges a, g, I/l). Lokal eingebunden, kein Internet nötig. Groß, ruhig, viel Zeilenabstand.

### Farb- und Flächenlogik

Warmes Papier, Moos, Teichwasser, Schildkrötenpanzer. **Natürlich und gedämpft**, nicht grell.
Keine Neonfarben, keine Verläufe als Dekoration. Flächen wie Papierschnitt: ruhige Formen, weiche Kanten,
dünne dunkle Umrisslinien wie in einem Bilderbuch.

### Rhythmus und Dichte

**Sehr wenig pro Bildschirm.** Eine Aussage, ein Bild, eine Handlung. Maximal 3–4 kurze Sätze pro Ansicht.

### Interaktionscharakter

Langsam, freundlich, ohne Zeitdruck. **Nichts kann man „falsch“ machen**, es gibt keine Fehlermeldungen,
keine Punkteverluste, keine Zeitlimits. Alles per Klicken. **Kein Mikrofon, keine Sprachaufnahme, nie eine
Aufforderung zu sprechen.** Jede Seite kann sich selbst vorlesen (🔊).

### Bewusste Ausschlüsse (Anti-Patterns)

- kein Mikrofon, keine Sprech-Aufgaben, keine Bewertung von Sprechen
- keine blinkenden oder schnellen Animationen, kein hektisches „Belohnungsfeuerwerk“
- keine Diagnose-Sprache im Kinderbereich („Störung“, „krank“, „Therapie“)
- keine Punkte, die man verlieren kann; keine Ranglisten; keine Zeitlimits
- keine gruselige Darstellung der Angst; die Alarmanlage ist ein *übervorsichtiger Helfer*, kein Monster
- keine Internet-Verbindungen, kein Tracking, keine externen Schriften oder Skripte
- kein SaaS-/App-Look (Karten-Raster, Glas-Effekte, Lila-Verläufe)

### Entscheidungen

- **Name der Seite:** „Sokrates' Teich“.
- **Name des Kindes:** optional im Elternbereich; wird nur lokal im Browser gespeichert.

---

## 2. Designsystem (`design-system`, Entwurf)

### Farbrollen

| Token | Wert | Rolle | Kontrast |
|---|---|---|---|
| `--paper` | `#FBF6EC` | Seitenhintergrund (warmes Papier) | – |
| `--ink` | `#2E3A2F` | Fließtext, Umrisslinien | 11,1 : 1 auf Papier |
| `--ink-soft` | `#55624F` | Nebentexte | 6,0 : 1 auf Papier |
| `--sand` | `#EBD9B4` | Ufer, ruhige Flächen | Text darauf 8,6 : 1 |
| `--water` | `#DCEFF2` | Teichfläche | Text darauf 10,0 : 1 |
| `--water-deep` | `#2F6F7E` | Wasserakzente, Links | weißer Text 5,7 : 1 |
| `--moss` | `#3F6E3A` | Haupt-Buttons | weißer Text 6,0 : 1 |
| `--skin` | `#9CC27A` / `#6F9A52` | Sokrates' Haut (hell/dunkel) | Illustration |
| `--shell` | `#C9944A` / `#8C6230` | Sokrates' Panzer (hell/dunkel) | Illustration |
| `--star` | `#F2B544` | Mut-Sterne, erledigte Steine | Text darauf 6,5 : 1 |
| `--alarm` | `#E46F4F` | Leuchten der Alarmanlage (nur Illustration, nie als einziges Signal) | – |
| `--focus` | `#1F5F6E` | Fokusrahmen (Tastatur) | 6,7 : 1 auf Papier |

Ein bewusst **helles Thema**, kein Dunkelmodus: Die Seite soll wie ein Bilderbuch wirken.

### Typorollen (Andika)

| Rolle | Größe | Gewicht | Zeilenhöhe | Einsatz |
|---|---|---|---|---|
| Titel | 40–48 px | 700 | 1,15 | Name eines Ortes („Die Mut-Steine“) |
| Untertitel | 28 px | 700 | 1,25 | Abschnitt, Sokrates' Sprechblasen-Überschrift |
| Text | 22 px | 400 | 1,6 | Alle Kindertexte, max. ~40 Zeichen je Zeile in Sprechblasen |
| Button | 22 px | 700 | 1 | Beschriftung von Buttons |
| Klein | 18 px | 400 | 1,5 | Elternbereich, Hinweise |

### Abstände, Flächen, Formen

- Abstandsraster: 8 px (8 / 16 / 24 / 40 / 64).
- Radius: 18 px für Buttons und Sprechblasen; Steine und Seerosen sind organische Formen (SVG).
- Linien: 3 px `--ink`-Umriss für Illustrationen und Sprechblasen (Bilderbuch-Look).
- Schatten: nur ein flacher „Papierschatten“ (`0 4px 0 rgba(46,58,47,.18)`), kein Glow, kein Blur.

### Basiskomponenten

- **Großer Button** (min. 64 px hoch, ≥ 200 px breit), Haupt = Moos, Neben = Papier mit Umriss.
- **Vorlese-Button** 🔊 auf jeder Seite, immer an derselben Stelle (oben rechts).
- **„Zurück zum Teich“** auf jeder Unterseite, immer an derselben Stelle (oben links).
- **Sprechblase von Sokrates** – der Haupt-Textträger für das Kind.
- **Ort-Kachel auf der Teich-Karte** – Illustration + Name; ist ein echter `<a>`-Link.

### Accessibility-Grundsätze

- Alles per Maus *und* Tastatur bedienbar, sichtbarer Fokusrahmen.
- Farbe ist nie das einzige Signal (Stufen haben Bild + Wort + Zahl).
- Bilder haben Textalternativen; die Vorlesefunktion liest den sichtbaren Text.
- `prefers-reduced-motion` wird respektiert (siehe unten).

---

## 3. Motion-Grundsätze (`motion-design`, Contract-Ebene)

Leitidee: **Schildkröten-Tempo.** Bewegung ist ruhig, langsam und erklärt etwas. Nie hektisch, nie blinkend.

| Bewegung | Zweck | Verhalten | Reduced Motion |
|---|---|---|---|
| Sokrates zieht sich zurück / kommt heraus (Panzer-Meter) | Ursache → Wirkung: Gefühl wird sichtbar | Kopf, Beine, Schwanz gleiten in ~0,7 s, weiches Ein-/Ausblenden; jederzeit unterbrechbar (neue Wahl → läuft zum neuen Ziel) | Pose wechselt direkt, ohne Gleiten |
| Alarmanlage leuchtet | Zeigt „Alarm ist an“ | Sanftes Glimmen ab Stufe 3, langsamer Puls (≥ 2 s), nie Blinken | Statisches Leuchten |
| Atem-Ballon / Wasserkreis (Ruhe-Ecke) | Gibt das Atem-Tempo vor | Wächst 4 s (ein), schrumpft 6 s (aus) | Kein Wachsen; stattdessen füllt sich ein Balken + Text „Einatmen / Ausatmen“ |
| Mut-Stein leuchtet auf | Fortschritt feiern | Stern erscheint, kurzes Aufleuchten (~0,4 s) | Stern erscheint ohne Animation |
| Sokrates blinzelt | Lebendigkeit | Selten, zufällig alle 4–8 s | Aus |
| Seitenwechsel | Orientierung | Kurzes Überblenden (0,2 s) | Kein Überblenden |

Keine Scroll-Effekte, keine Parallaxe, kein Konfetti.

### Erweiterung (Version 2): mehr Leben, gleiche Regeln

| Bewegung | Zweck | Verhalten |
|---|---|---|
| Sokrates „atmet“ (Panzer hebt sich), Kopf wippt | Figur wirkt lebendig und ruhig | 4,8 s Zyklus, sehr klein |
| Sokrates spaziert beim ersten Öffnen herein | Ankommen, Begrüßung | einmal pro Besuch, 2,8 s, Beine laufen mit |
| Sokrates spaziert (Geschichte S. 7 „Langsam ist auch mutig“) | Illustriert die Aussage | 9 s hin und her |
| Wasserringe, treibendes Seerosenblatt, Libelle (Startseite) | Teich-Atmosphäre | langsam (7–22 s), am Rand, nie im Weg |
| Schallwellen an der Alarmanlage | „Piepen“ sichtbar machen, ohne Ton | ab Stufe 3, 2,6 s, kein Blinken |
| Sprechblase „ploppt“ | Neue Aussage von Sokrates | 0,4 s |
| Inhalte erscheinen nacheinander, Seiten blättern seitlich | Orientierung | 0,45 s |
| Mut-Stein: Stern ploppt auf, kleine Sterne fliegen, Wasserring, Mini-Sokrates hüpft | Erfolg feiern | einmalig ca. 1 s |
| Mut-Schatz: Steinchen fällt ins Glas, volles Glas leuchtet | Fortschritt greifbar machen | 1 s |
| Ruhe-Ecke: Wellen, Sokrates schaukelt, Atemkreis zieht Ringe | Beruhigung | 5–24 s, gleichmäßig |
| Dialoge gleiten auf, Karten kippen leicht beim Drüberfahren | Rückmeldung | 0,3 s |

**Version 3 – Sokrates direkt eingezeichnet** (statt `<use>`-Kopie, damit alle Animationen zuverlässig laufen):
Panzer atmet, Kopf wippt, er schaut sich alle 12 s um (Kopf und Augen), wedelt ab und zu mit dem Schwanz,
nickt zur Begrüßung und nach einem geschafften Mut-Stein, hüpft vor Freude beim Antippen und bewegt beim
Vorlesen den Mund.

**Ruhig-Modus:** Unter „Für Erwachsene → Bewegung“ wählbar (Automatisch / Normal / Ruhig). „Automatisch“ folgt
der Systemeinstellung „Animationen reduzieren“. Im Ruhig-Modus laufen keine Animationen; nur der Atem-Balken
füllt sich weiter, weil er die Information trägt.

---

## 4. Technik

### Optischer Feinschliff (Oktober 2026)

- **Hierarchie durch Anordnung:** Geschichte als Einstieg in der Begrüßung, direkte Hilfen und
  Spielen/Sammeln als zwei beschriftete Gruppen. Gruppen erhalten keine zusätzlichen Rahmen.
- **Karten zuerst:** Die Kommunikationskarten sind der Hauptinhalt. Einstellungen folgen darunter;
  technische Druckoptionen liegen in einem aufklappbaren Erwachsenenbereich.
- **Zusatzwissen auf Wunsch:** Native `details`/`summary` für Alarmfaktoren, Fallakte und Druckoptionen.
  Der Aufklappmarker bleibt sichtbar; Summary-Bedienelemente sind mindestens 48 px hoch und nutzen
  den bestehenden Fokusrahmen. Der Hinweiszähler der Akte bleibt auch geschlossen sichtbar.
- **Abenteuer:** Drei benannte Hilfengruppen statt einer unstrukturierten Werkzeugliste. Ausgewählte
  Hilfen behalten Wort, Symbol und gedrückten Zustand. Spielmodell und Fortschrittsdaten bleiben gleich.
- **Flächen:** Ergänzende Informationen nutzen Papier oder Sand mit dünner Kontur ohne Schatten.
  Hauptaktionen und Illustrationen behalten ihre kräftigen Umrisse.
- **Responsive:** Hilfen am Start in zwei Spalten, mobil untereinander; Abenteuer-Hilfen in drei
  Spalten, mobil untereinander. Detektiv-Orte in vier, zwei oder einer Spalte je nach Breite.
- **Bewegung:** Keine neuen Animationen; die bestehende Ruhig-Einstellung gilt auch für die neuen Gruppen.

### Körper-Update (Oktober 2026) – Review nach KI-Regeln

Geprüft mit `web-design-review`, `visual-verification` und `accessibility-review` (Desktop 1280 px, iPad,
Handy 375/390 px, Ruhig-Modus, axe-core):

- **Erhalten:** Papier-Hintergrund, kräftige Tinten-Konturen, Andika, Sokrates als durchgehende Figur,
  ruhige Bewegung. Die Orts-Karten tragen Navigation und sind deshalb keine Deko-Kacheln.
- **Behoben:** „Für Erwachsene“ war eine lange, ungegliederte Textseite → Abschnitte mit Symbol-Überschrift
  und Sprungmarken. Die Ruhe-Ecke hat jetzt drei Übungen → Sprungmarken oben.
- **Neu, im bestehenden Stil:** „Mein Körper“ nutzt dieselbe Figurensprache (Konturen, Naturfarben), Stellen
  als beschriftete Knöpfe (min. 40–44 px), Leuchten nur als Zusatz zum gedrückten Zustand (Farbe nie einziges Signal).
- **Offen:** Die Startseite hat inzwischen viele Orte; bei weiteren Inhalten eher bündeln als neue Kacheln.

### Spielformen-Update (Oktober 2026)

- **Novelty Budget:** Neue Spiele nur mit neuer Interaktionsform (Kooperation mit geteiltem Wissen,
  Deduktion im Gitter, Konstruktion mit Probefahrt, Licht-Muster, Comic-Erzählen). Keine weiteren Memorys,
  Gefühls-Quiz, Alarm- oder Atemspiele.
- **Gleiche Bildsprache:** Papierflächen, Tinten-Konturen, Naturfarben; die Nachtszene (Lichtzeichen) ist die
  einzige dunkle Fläche und bleibt eingerahmt. Briefhälften haben eine gerissene Kante, Comic-Blasen
  skalieren mit dem Bild (Container-Einheiten).
- **Kein Zeitdruck, kein Verlieren:** Fehler führen zu einem erklärenden Satz, nie zu Punktabzug.
- **Lichtblinken:** höchstens etwa ein Lichtwechsel pro Sekunde, weicher Übergang, keine Vollflächen-Blitze;
  im Ruhig-Modus ohne Übergänge, aber weiter sichtbar (das Blinken ist Inhalt, keine Deko).
- **Behoben:** Beim Drüberfahren mit der Maus hob sich ein Knopf um 2 px; stand die Maus am unteren Rand,
  flackerte er. Die Trefferfläche wird beim Anheben jetzt nach unten verlängert.
- **Handy:** Gitter und Brücken-Szene passen auf 375 px; die Brücken-Szene darf seitlich wischen
  (mit Hinweis), damit die Bau-Punkte groß genug zum Antippen bleiben.

### Laufzeit

- **Freies Gestalten:** Die Werkstatt stellt den eigenen Entwurf vor die Sammlung. Farben tragen
  Namen und Farbfelder; Form, Muster und Zeichen sind beschriftet und zeigen den gedrückten Zustand.
  Mobile Ansichten verwenden eine Spalte. Eigene SVG-Werkstücke folgen den bestehenden Konturen und
  Naturfarben; es gibt keine neuen Animationen oder Abschlussziele.
- **Gefühle erkunden:** Beobachtung und Vermutung erhalten eigene Beschriftungen. Ausgewählte Gefühle
  bleiben Vermutungen; keine Antwort wird ausgegraut oder gesperrt. „Ich weiß es noch nicht“ ist eine
  gleichwertige Antwort.

- Reines HTML, CSS und JavaScript, **ohne Build-Schritt und ohne Internet**. Start per Doppelklick auf
  `index.html`.
- Klassische `<script>`-Dateien (keine ES-Module, da diese unter `file://` blockiert werden).
- Eine Seite mit Bereichen über `#anker` (`#teich`, `#geschichte`, `#panzer-meter` …).
- Fortschritt (Mut-Steine, Mut-Schatz, Name) im **localStorage** des Browsers. Verlässt nie den PC.
  Robust programmiert: Wenn Speichern nicht geht, funktioniert die Seite trotzdem.
- Vorlesen über die eingebaute Sprachausgabe des Browsers (`speechSynthesis`, deutsche Stimme).
  Unter Windows meist vorhanden („Microsoft Katja/Hedda“).
- Schrift Andika lokal unter `assets/fonts/` (OFL-Lizenz liegt bei).
- Alle Illustrationen als selbst gezeichnete SVG im Code – keine fremden Bilder, keine Lizenzfragen.
