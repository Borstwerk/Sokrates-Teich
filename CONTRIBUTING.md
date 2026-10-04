# Mitmachen

Schön, dass du helfen möchtest! Besonders willkommen sind Rückmeldungen von Betroffenen, Eltern,
Lehrkräften und Fachleuten (Psychotherapie, Logopädie, Pädagogik).

> **Bitte keine persönlichen Daten von Kindern** in Issues, Pull Requests oder Screenshots –
> keine Namen, Diagnosen, Schulen oder Fotos.

## Wege, mitzumachen

- **Fachliche Rückmeldung:** Ist eine Aussage ungenau, veraltet oder missverständlich? Bitte das Issue
  „Fachliche Rückmeldung“ nutzen und nach Möglichkeit eine Quelle nennen.
- **Fehler melden:** Issue „Fehler melden“ – mit Browser, Gerät und Schritten zum Nachstellen.
- **Ideen:** Issue „Idee oder Wunsch“.
- **Änderungen beitragen:** Pull Request (siehe unten).
- **Sicherheitslücken:** bitte vertraulich melden, siehe [SECURITY.md](SECURITY.md).

## Grundsätze, die jede Änderung einhalten muss

Diese Punkte sind der Kern des Projekts (Begründung in [`docs/recherche/01-synthese.md`](docs/recherche/01-synthese.md)):

1. **Kein Sprechdruck.** Die Seite fordert das Kind nie zum Sprechen auf und nutzt kein Mikrofon.
2. **Nonverbale Kommunikation zählt.** Zeigen, Nicken, Karten und Flüstern sind echte Schritte.
3. **Nichts kann falsch gemacht werden.** Keine Fehlermeldungen für das Kind, keine Punkte zum Verlieren,
   keine Zeitlimits, keine Ranglisten.
4. **Keine Diagnose-Sprache im Kinderbereich** („Störung“, „krank“, „schüchtern“, „stumm“).
5. **Offline und privat.** Keine externen Skripte, Schriften, Bilder oder Dienste; nichts wird gesendet.
6. **Ruhige Bewegung.** Animationen langsam und mit Zweck; der Ruhig-Modus (`body.ruhig`) muss alles abschalten.
7. **Barrierefrei.** Bedienbar per Tastatur, ausreichender Kontrast, Texte für Vorleser.
8. **Keine Therapie-Versprechen.** Die Seite begleitet, sie behandelt nicht.

## Texte für Kinder

Alle Kindertexte stehen in [`assets/js/inhalt.js`](assets/js/inhalt.js). Schreibregeln (ausführlich in
[`docs/INHALT.md`](docs/INHALT.md)):

- kurze Sätze (meist unter 10 Wörtern), ein Gedanke pro Satz, bekannte Wörter;
- Du-Ansprache, warm, nie „du musst“ oder „du sollst“;
- deutsche Anführungszeichen „…“.

Material für Erwachsene nutzt die Platzhalter `{kind}` / `{Kind}` (Name oder „das Kind“). Bitte so
formulieren, dass der Satz **mit und ohne Namen** grammatisch stimmt (also nicht „von {kind}“).

## Technik

- Reines HTML, CSS und JavaScript, **ohne Build-Schritt und ohne Abhängigkeiten**.
- Die Seite muss direkt von der Festplatte laufen (`file://`): klassische `<script>`-Dateien, keine ES-Module,
  kein `fetch` lokaler Dateien.
- Zeichnungen als SVG im Code; neue Grafiken nur selbst erstellt oder mit passender freier Lizenz
  (dann in [`THIRD-PARTY-NOTICES.md`](THIRD-PARTY-NOTICES.md) eintragen).
- Nutzereingaben nur über `textContent` ausgeben, nie über `innerHTML`.

## Vor einem Pull Request prüfen

- [ ] `index.html` im Browser geöffnet, betroffene Bereiche durchgeklickt, keine Fehler in der Konsole
- [ ] schmale Ansicht (Handy-Breite) ohne seitliches Scrollen
- [ ] Bedienung per Tastatur möglich
- [ ] Ruhig-Modus geprüft (*Für Erwachsene → Bewegung → Ruhig*)
- [ ] bei Druckänderungen: Druckvorschau geprüft
- [ ] keine externen Ressourcen hinzugefügt
- [ ] [CHANGELOG.md](CHANGELOG.md) ergänzt

## Lizenz

Mit einem Beitrag erklärst du dich einverstanden, dass er unter der [MIT-Lizenz](LICENSE) des Projekts
veröffentlicht wird.
