# Sokrates' Teich auf dem iPad

Auf dem PC startet die Seite per Doppelklick auf `index.html`. Das iPad kann das nicht: Safari führt
heruntergeladene Dateien mit JavaScript nicht aus. Deshalb ist Sokrates' Teich zusätzlich eine
**Web-App**: einmal über eine Internetadresse öffnen, aufs **Home-Bildschirm** legen – danach startet sie
wie eine App und läuft **auch ohne Internet**.

Damit dafür **kein Impressum** nötig ist, wird die Adresse mit einer Anmeldung geschützt: Nur eure Familie
kommt hinein. Die Seite dient dann ausschließlich familiären Zwecken. (Das ist eine Einordnung, keine
Rechtsberatung.)

Alles hier ist **kostenlos**. Zeitaufwand einmalig etwa 20–30 Minuten.

---

## Überblick

```text
GitHub-Repo          →  Cloudflare Workers (stellt die Seite bereit, Einstellungen in wrangler.jsonc)
                      →  Cloudflare Access (nur eure E-Mail-Adressen dürfen hinein)
                      →  iPad: Safari → „Zum Home-Bildschirm“ → offline nutzbar
```

Die Bezeichnungen in der Cloudflare-Oberfläche ändern sich gelegentlich; sinngemäß bleiben die Schritte gleich.

Was hochgeladen wird, steht in `wrangler.jsonc` und `.assetsignore`: nur die App selbst (`index.html`,
`sw.js`, `manifest.webmanifest`, `assets/`). Doku, `.git` und `.github` bleiben draußen.

## 1. Seite bereitstellen (Cloudflare Workers)

1. Kostenloses Konto anlegen: <https://dash.cloudflare.com/sign-up>.
2. Links **Workers & Pages** → **Erstellen / Create** → **Import a repository** (Git verbinden).
3. GitHub verbinden. Bei der Frage, welche Repos Cloudflare sehen darf: **nur dieses eine Repo** auswählen.
4. Im Formular **Create an app**:

   | Feld | Eintrag |
   | --- | --- |
   | **Project name** | `sokrates-teich` – muss genau dem `name` in `wrangler.jsonc` entsprechen |
   | **Build command** | leer lassen |
   | **Deploy command** | `npx wrangler deploy` (Vorgabe) |
   | **Non-production branch deploy command** / **Preview command** | Vorgabe lassen |
   | **Enable Preview builds** | **aus** – sonst entstehen zusätzliche Adressen für jeden Branch |
   | **Protect with Cloudflare Access** | **an** – Anmeldung nur für eure Familie (Schritt 2) |
   | **Advanced settings** | nichts ändern; Root directory bleibt `/` |

5. **Deploy.** Cloudflare baut den Standard-Branch (`main`). Nach etwa einer Minute gibt es eine Adresse wie
   `https://sokrates-teich.<euer-konto>.workers.dev`.

## 2. Zugang auf eure Familie beschränken (Cloudflare Access)

Mit dem Schalter **Protect with Cloudflare Access** hat Cloudflare schon eine Access-Anwendung angelegt.
Jetzt noch festlegen, **wer** hinein darf:

1. Im Cloudflare-Dashboard **Zero Trust** öffnen. Falls gefragt: den **kostenlosen Plan** (Free, bis
   50 Personen) wählen. Je nach Land fragt Cloudflare nach einer Zahlungsart; der Free-Plan kostet trotzdem
   nichts.
2. **Access → Applications** → die Anwendung für `sokrates-teich…workers.dev` öffnen → **Edit**.
   (Fehlt sie: **Add an application → Self-hosted**, Domain = eure Adresse aus Schritt 1.)
3. **Policies:** Aktion **Allow**, Regel **Include → Emails** (nicht „Emails ending in“): die vollständigen
   E-Mail-Adressen, z. B. `mama@example.de`. Eine Regel wie „Everyone“ oder eine ganze E-Mail-Domain wie
   `gmail.com` **entfernen**.
4. **Session duration:** `1 month` – dann muss man sich nur selten neu anmelden.
5. **Login-Methode One-time PIN** (Code per E-Mail, kein Passwort, kein Cloudflare-Konto nötig):
   - *Zero Trust → Integrations → Identity providers* (ältere Oberfläche: *Settings → Authentication →
     Login methods*) → **Add new** → **One-time PIN** → speichern.
   - In der Access-App unter **Authentication**: „Accept all available identity providers“ **aus**,
     bei „Choose available identity providers“ nur **One-time PIN** auswählen, „Apply instant
     authentication“ **an**. Dann erscheint direkt das Feld für die E-Mail-Adresse.
   - Ohne diesen Schritt bietet die Anmeldeseite nur „Cloudflare“ an – das verlangt ein Cloudflare-Konto.
6. **Destinations / Application domain** prüfen: Dort muss genau die Adresse stehen, die ihr aufruft
   (`sokrates-teich.<euer-konto>.workers.dev`). Steht dort „No destinations assigned“, ist nichts geschützt.
7. Speichern. Testen: Die Adresse in einem **privaten** Browserfenster öffnen – es muss eine
   Anmeldeseite von Cloudflare erscheinen. Mit einer **fremden** E-Mail-Adresse darf kein Code kommen.

**Die Seite geht ohne Anmeldung auf?**

- **Im normalen Fenster getestet?** Wer die Seite schon einmal geöffnet hat, bekommt sie aus dem
  Offline-Speicher der Web-App – ohne Rückfrage bei Cloudflare. Das ist gewollt (offline nutzbar). Zum Testen
  immer ein privates Fenster nehmen.
- **Schon angemeldet?** Die Anmeldung gilt bis zum Ende der Session-Dauer.
- **Zielfeld leer** (siehe Schritt 6) oder eine andere Adresse als die aufgerufene eingetragen.
- **Login-Methode fehlt:** One-time PIN hinzufügen (Schritt 5).

## 3. Auf dem iPad einrichten

1. **Safari** öffnen und eure Adresse eingeben.
2. Bei Cloudflare eure E-Mail-Adresse eingeben, den Code aus der E-Mail eintippen.
3. Wenn Sokrates' Teich erscheint: unten bzw. oben auf **Teilen** (Quadrat mit Pfeil) →
   **Zum Home-Bildschirm** → Name „Sokrates“ → **Hinzufügen**.
4. Ab jetzt über das **Sokrates-Symbol** öffnen. Beim **ersten Start** fragt Cloudflare noch einmal nach
   E-Mail und Code (die App hat ihren eigenen Speicher, getrennt von Safari). Dabei lädt die App alles
   herunter; danach funktioniert sie **auch im Flugmodus**.

**Wichtig:** Die App auf dem Home-Bildschirm hat ihren **eigenen Speicher**, getrennt von Safari.
Name und Einstellungen also in der App selbst unter *Für Erwachsene* eintragen.

## 4. Schöne Vorlesestimme auf dem iPad

iPads haben sehr natürliche deutsche Stimmen, die **offline** funktionieren:

1. **Einstellungen → Bedienungshilfen → Gesprochene Inhalte → Stimmen → Deutsch.**
2. Eine Stimme mit **„(Erweitert)“** oder **„(Premium)“** laden, z. B. *Anna (Erweitert)*.
3. In Sokrates' Teich: *Für Erwachsene → Stimme* auswählen und **Stimme testen**. Ohne Auswahl nimmt die
   App automatisch die beste vorhandene Stimme.

## 5. Fortschritt vom PC übertragen (optional)

1. Am PC: *Für Erwachsene → **Sicherung speichern***.
2. Die Datei aufs iPad bringen (AirDrop, E-Mail oder iCloud Drive).
3. In der iPad-App: *Für Erwachsene → **Sicherung laden*** → Datei in „Dateien“ auswählen.

Danach führen PC und iPad getrennt weiter – es gibt bewusst keinen automatischen Abgleich über das Internet.

## 6. Aktualisierungen

Wird das Repo geändert, baut Cloudflare die Seite automatisch neu. Damit das iPad die neue Fassung
holt, muss in `sw.js` die Zeile `var VERSION = "…"` hochgezählt werden. Beim nächsten Öffnen mit
Internet lädt die App dann neu (manchmal erst beim zweiten Öffnen).

## Gut zu wissen

- **Sicherung:** iPadOS kann bei sehr knappem Speicher Daten von Web-Apps löschen. Ab und zu eine
  Sicherung speichern.
- **Drucken** (Karten, Infoblatt) klappt am PC am zuverlässigsten.
- **Datenschutz:** Die Seite selbst sendet nichts. Cloudflare sieht, wer sich wann anmeldet und welche
  Dateien geladen werden – wie jeder Anbieter, der eine Webseite ausliefert.
- **Eigene Kopie:** Wer Texte anpassen möchte, forkt dieses Repo und verbindet Cloudflare mit dem Fork.
  Der Projektname in Cloudflare muss dem `name` in `wrangler.jsonc` entsprechen.
