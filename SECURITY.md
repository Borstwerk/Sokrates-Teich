# Sicherheit

## Worum es geht

Sokrates' Teich ist eine statische Webseite: kein Server, kein Konto, keine externen Skripte, keine
Datenübertragung. Fortschritt und Einstellungen liegen nur im Browser des Geräts (`localStorage`).

Trotzdem können Fehler sicherheitsrelevant sein, zum Beispiel:

- eingegebener Text (eigene Karten, eigene Mut-Steine, Kontaktfelder) wird als Code ausgeführt;
- eine manipulierte Sicherungsdatei („Sicherung laden“) richtet Schaden an;
- die Seite lädt oder sendet unerwartet Daten über das Internet;
- gespeicherte Angaben über das Kind werden für andere sichtbar.

## Eine Sicherheitslücke melden

Bitte **nicht** als öffentliches Issue melden, sondern vertraulich über GitHub:

**Reiter „Security“ → „Report a vulnerability“** (Private Vulnerability Reporting).

Hilfreich sind: betroffene Datei oder Funktion, Schritte zum Nachstellen, Browser und Betriebssystem.
Bitte keine echten Daten von Kindern mitschicken.

## Was ihr erwarten könnt

Das Projekt wird ehrenamtlich gepflegt. Wir bestätigen Meldungen so bald wie möglich und beheben
bestätigte Lücken mit Vorrang. Wer eine Lücke meldet, wird auf Wunsch im Changelog genannt.

## Unterstützte Version

Es wird nur der aktuelle Stand des Branches `main` gepflegt.
