/*
 * Alle Texte für das Kind an einer Stelle.
 * Ändern ist ausdrücklich erwünscht – einfach Text zwischen den Anführungszeichen anpassen.
 * {name} wird durch den Namen aus den Einstellungen ersetzt (leer = Texte ohne Namen).
 * Schreibregeln: kurze Sätze, bekannte Wörter, nie „du musst“. Siehe INHALT.md.
 */
window.Teich = window.Teich || {};

Teich.inhalt = {
  teich: {
    gruss: "Hallo {name}!",
    text: [
      "Schön, dass du da bist.",
      "Ich bin Sokrates. Ich wohne hier am Teich.",
      "Schau dich ruhig um. Du kannst nichts falsch machen."
    ],
    startHier: "Fang hier an!",
    gruppen: [
      { id: "hilfen", titel: "Was hilft mir gerade?", orte: ["panzer-meter", "koerper", "ruhe-ecke", "karten", "mut-steine", "stimmen-karte"] },
      { id: "sammeln", titel: "Spielen und sammeln", ohneSpiele: "Mut sammeln", orte: ["spiele", "mein-teich", "mut-schatz"] }
    ]
  },

  orte: [
    { id: "geschichte",   name: "Sokrates erzählt", unter: "Warum versteckt sich meine Stimme?", bild: "i-buch" },
    { id: "panzer-meter", name: "Panzer-Meter",     unter: "Wie geht es dir gerade?",           bild: "sokrates-3" },
    { id: "koerper",      name: "Mein Körper",      unter: "Wo spürst du die Alarmanlage?",      bild: "i-koerper" },
    { id: "mut-steine",   name: "Mut-Steine",       unter: "Kleine mutige Schritte",             bild: "i-steine" },
    { id: "stimmen-karte", name: "Meine Stimmen-Karte", unter: "Wo ist deine Stimme schon zu Hause?", bild: "i-ort" },
    { id: "ruhe-ecke",    name: "Ruhe-Ecke",        unter: "Ganz ruhig atmen",                   bild: "i-seerose" },
    { id: "karten",       name: "Karten-Kiste",     unter: "Karten zum Zeigen",                  bild: "i-kiste" },
    { id: "mut-schatz",   name: "Mut-Schatz",       unter: "Hier sammelst du deinen Mut",        bild: "i-glas" },
    { id: "spiele",       name: "Spiele",           unter: "Spiel mit Sokrates",                 bild: "i-spiel", spiel: true },
    { id: "mein-teich",   name: "Dein Teich",       unter: "Hier wohnen deine Schätze",          bild: "i-frosch", spiel: true }
  ],

  // Bild: level = Sokrates-Pose 1–5, lampe = Alarmanlage (null = nicht zeigen, 0–1 = Leuchtstärke)
  geschichte: [
    { titel: "Hallo, ich bin Sokrates",
      text: ["Ich bin eine Schildkröte.", "Ich habe einen festen Panzer.", "Er ist wie ein Haus, das ich immer dabei habe."],
      bild: { level: 1 } },
    { titel: "Meine Alarmanlage",
      text: ["In meinem Kopf wohnt eine Alarmanlage.", "Sie passt auf mich auf.", "Wenn Gefahr kommt, ruft sie: „Schnell, in den Panzer!“"],
      bild: { level: 1, lampe: 0 } },
    { titel: "Manchmal piept sie zu früh",
      text: ["Meine Alarmanlage ist sehr vorsichtig.", "Manchmal piept sie, obwohl alles sicher ist.", "Zum Beispiel, wenn ich jemanden noch nicht kenne.", "Oder wenn ganz viele Tiere da sind.", "Oder an einem Ort, wo ich noch nie war."],
      bild: { level: 3, lampe: 0.5, deko: [["i-person", "Jemand Neues"], ["i-gruppe", "Ganz viele"], ["i-ort", "Neuer Ort"]] } },
    { titel: "Dann versteckt sich meine Stimme",
      text: ["Wenn die Alarmanlage piept, ziehe ich den Kopf ein.", "Dann bleibt meine Stimme im Panzer.", "Ich will etwas sagen. Aber die Wörter kommen nicht raus.", "Das fühlt sich doof an."],
      bild: { level: 4, lampe: 0.75 } },
    { titel: "Mein Körper merkt es auch",
      text: ["Wenn die Alarmanlage piept, merkt das auch mein Körper.", "Mein Bauch zwickt. Mein Kopf brummt. Mein Herz klopft schnell.", "Das Weh ist echt. Und es ist nicht gefährlich.", "Wenn die Alarmanlage leiser wird, wird es meistens auch im Körper besser."],
      bild: { level: 3, lampe: 0.5, deko: [["i-kopfweh", "Kopf"], ["i-herz", "Herz"], ["i-bauchweh", "Bauch"]] } },
    { titel: "Das ist nicht meine Schuld",
      text: ["Ich bin nicht frech. Ich mache das nicht mit Absicht.", "Meine Alarmanlage ist nur zu laut eingestellt.", "Viele Kinder kennen das. Du bist nicht allein."],
      bild: { level: 2, deko: [["i-herz", ""]] } },
    { titel: "Zuhause ist es leise",
      text: ["Zuhause piept meine Alarmanlage nicht.", "Da rede ich ganz viel!", "Da bin ich ganz ich selbst."],
      bild: { level: 1, lampe: 0, deko: [["i-haus", "Zuhause"]] } },
    { titel: "Langsam ist auch mutig",
      text: ["Schildkröten sind langsam. Das ist gut so!", "Ich mache nur kleine Schritte.", "Erst gucke ich. Dann nicke ich. Dann zeige ich auf etwas.", "Jeder kleine Schritt zählt."],
      bild: { level: 1, spaziert: true, deko: [["i-auge", "gucken"], ["i-nicken", "nicken"], ["i-zeigen", "zeigen"]] } },
    { titel: "Meine Alarmanlage lernt dazu",
      text: ["Jedes Mal, wenn ich etwas Mutiges mache, merkt sich meine Alarmanlage:", "„Hier ist es sicher.“", "Dann piept sie ein bisschen leiser.", "Ganz langsam. Schritt für Schritt."],
      bild: { level: 2, lampe: 0.15 } },
    { titel: "Kommst du mit?",
      text: ["Willst du mit mir üben, {name}?", "Du bestimmst, wie schnell wir gehen."],
      bild: { level: 1 },
      knoepfe: [["panzer-meter", "Wie geht es dir gerade?"], ["mut-steine", "Zu den Mut-Steinen"]] }
  ],

  panzerMeter: {
    frage: "Wie geht es dir gerade, {name}?",
    stufen: [
      { name: "Ganz draußen",              text: "Schön! Du fühlst dich wohl. Ich auch.", lampe: 0 },
      { name: "Ein bisschen kribbelig",    text: "Ein bisschen Kribbeln ist okay. Das kenne ich gut.", lampe: 0.15 },
      { name: "Die Alarmanlage piept",     text: "Deine Alarmanlage ist wach. Sie will dich beschützen. Du bist trotzdem sicher.", lampe: 0.5 },
      { name: "Nur die Augen gucken raus", text: "Das ist ganz schön viel gerade. Willst du mit mir atmen?", lampe: 0.75, ruhe: true },
      { name: "Ganz im Panzer",            text: "Im Panzer ist es sicher. Bleib so lange, wie du brauchst. Ich warte hier.", lampe: 0.95, ruhe: true }
    ],
    zurRuhe: "Zur Ruhe-Ecke",
    zumKoerper: "Spürst du es im Körper?"
  },

  mutSteine: {
    intro: [
      "Das hier sind meine Mut-Steine.",
      "Jeder Stein ist ein kleiner mutiger Schritt.",
      "Du suchst aus, welcher Stein als Nächstes dran ist."
    ],
    start: "Hier bin ich",
    ziel: "Mein Ziel",
    frage: "Hast du diesen Schritt geschafft?",
    geschafft: "Hab ich geschafft!",
    nochNicht: "Noch nicht",
    lob: ["Super! Das war mutig. Der Stein leuchtet jetzt.", "Wow, ein mutiger Schritt! Ich bin stolz auf dich.", "Geschafft! Deine Alarmanlage hat etwas gelernt."],
    oft: "Du kannst jeden Stein so oft machen, wie du willst.",
    wege: [
      { id: "neu", name: "Jemand Neues", bild: "i-person", steine: [
        "Ich schaue mir die Person an, wenn Mama oder Papa dabei ist.",
        "Ich bleibe im selben Raum wie die Person.",
        "Ich lächle oder winke kurz.",
        "Ich nicke oder schüttle den Kopf, wenn sie etwas fragt.",
        "Ich zeige auf etwas oder gebe ihr etwas.",
        "Ich zeige eine Karte aus der Karten-Kiste.",
        "Ich mache ein Geräusch, zum Beispiel „Mhm“.",
        "Ich flüstere Mama oder Papa etwas zu, während die Person in der Nähe ist.",
        "Ich flüstere der Person ein Wort zu.",
        "Ich sage ein Wort, zum Beispiel „Ja“ oder „Hallo“."
      ] },
      { id: "viele", name: "Viele Menschen", bild: "i-gruppe", steine: [
        "Ich schaue mir viele Menschen von weitem an.",
        "Ich gehe mit Mama oder Papa kurz in die Nähe.",
        "Ich bleibe ein bisschen länger dort.",
        "Ich lächle jemandem zu.",
        "Ich zeige auf etwas, das ich möchte.",
        "Ich flüstere Mama oder Papa etwas zu, während andere in der Nähe sind.",
        "Ich mache bei einem Spiel mit, ohne zu reden.",
        "Ich sage ein Wort zu Mama oder Papa, auch wenn andere es hören könnten."
      ] },
      { id: "ort", name: "Ein neuer Ort", bild: "i-ort", steine: [
        "Ich schaue mir Bilder von dem Ort an.",
        "Ich gehe mit Mama oder Papa zu dem Ort und schaue ihn mir von draußen an.",
        "Ich gehe kurz hinein.",
        "Ich bleibe länger und schaue mich um.",
        "Ich flüstere Mama oder Papa dort etwas zu.",
        "Ich spreche dort leise mit Mama oder Papa.",
        "Ich spreche dort ganz normal mit Mama oder Papa."
      ] },
      { id: "eigen", name: "Mein eigener Weg", bild: "i-stern", steine: [] }
    ],
    eigenIntro: "Hier kannst du mit Mama oder Papa deine eigenen Mut-Steine bauen.",
    eigenLeer: "Noch keine Steine. Schreib unten deinen ersten Mut-Schritt hin."
  },

  ruheEcke: {
    atemIntro: [
      "Manchmal kribbelt es im Bauch. Dann atme ich ganz langsam.",
      "Schau auf den Kreis im Wasser.",
      "Wird er größer: einatmen. Wird er kleiner: ausatmen."
    ],
    ein: "Einatmen …",
    aus: "Und ausatmen …",
    bereit: "Bereit?",
    atemzuege: 5,
    einSekunden: 4,
    ausSekunden: 6,
    ende: "Gut gemacht. Wie fühlt sich dein Bauch jetzt an?",
    pauseText: "Ich ziehe mich jetzt gemütlich in meinen Panzer zurück. Willst du mitmachen? Mach die Augen zu. Zähl langsam bis 5. Dann komme ich wieder raus.",
    pauseZurueck: "Hallo, da bin ich wieder! Das war schön ruhig."
  },

  karten: {
    intro: [
      "Wenn sich deine Stimme versteckt, kannst du eine Karte zeigen.",
      "Tipp eine Karte an, dann wird sie ganz groß."
    ],
    liste: [
      ["i-ja", "Ja"],
      ["i-nein", "Nein"],
      ["i-klo", "Ich muss aufs Klo."],
      ["i-hilfe", "Ich brauche Hilfe."],
      ["i-frage", "Ich verstehe das nicht."],
      ["i-weissnicht", "Ich weiß es nicht."],
      ["i-durst", "Ich habe Durst."],
      ["i-nichtgut", "Mir geht es nicht gut."],
      ["i-bauchweh", "Ich habe Bauchweh."],
      ["i-kopfweh", "Ich habe Kopfweh."],
      ["i-uebel", "Mir ist übel."],
      ["i-warten", "Bitte warte kurz."],
      ["i-mitmachen", "Ich möchte mitmachen."],
      ["sokrates-4", "Meine Stimme versteckt sich gerade. Ich höre dir aber zu."]
    ],
    eigenTitel: "Eigene Karte machen",
    eigenText: "Was soll auf der Karte stehen?",
    eigenBild: "Welches Bild passt?"
  },

  /*
   * Material für Lehrkräfte und andere Erwachsene.
   * {kind} = Name des Kindes (oder „das Kind“), {Kind} = am Satzanfang.
   * Inhalte beruhen auf recherche/01-synthese.md (T1–T4, T7).
   */
  lehrkraefte: {
    intro: "Material für Lehrkräfte, Hort, Sport- oder Musikvereine – kurz, verständlich und auf {kind} zugeschnitten. Einfach ausdrucken und bei einem ersten Gespräch mitgeben.",
    blattTitel: "{Kind} und die versteckte Stimme",
    blattUnter: "Infoblatt für Lehrkräfte und Betreuer:innen",
    abschnitte: [
      { titel: "Was ist selektiver Mutismus?", bild: "sokrates-4", punkte: [
        "Eine Angststörung (DSM-5, ICD-11) – kein Trotz, keine Schüchternheit, keine Erziehungsfrage.",
        "{Kind} möchte sprechen, kann es in bestimmten Situationen aber nicht. Die Angst lässt {kind} erstarren.",
        "Zuhause und mit vertrauten Menschen spricht {kind} ganz normal.",
        "Betrifft etwa 1 von 100 Kindern. Mit Geduld und kleinen Schritten wird es bei den meisten deutlich besser."
      ] },
      { titel: "Die Karten", bild: "i-karte", punkte: [
        "{Kind} hat Karten dabei, z. B. „Ja“, „Nein“, „Ich muss aufs Klo“, „Ich brauche Hilfe“.",
        "Eine gezeigte Karte ist eine echte Antwort. Bitte so annehmen wie ein gesprochenes Wort.",
        "Auch Nicken, Zeigen und Aufschreiben sind vollwertige Beiträge.",
        "Bitte nicht vor der Klasse auf die Karten aufmerksam machen."
      ] },
      { titel: "So helfen Sie", bild: "i-ja", punkte: [
        "Freundlich ansprechen – ohne eine gesprochene Antwort zu erwarten.",
        "Ja/Nein- oder Wahlfragen stellen („Möchtest du Rot oder Blau?“).",
        "Nach einer Frage in Ruhe warten (mindestens 5 Sekunden).",
        "Ein vertrautes Kind als Partner; lieber Kleingruppe als ganze Klasse.",
        "Kurz und ruhig loben, gern unter vier Augen oder mit einem Lächeln."
      ] },
      { titel: "Bitte vermeiden", bild: "i-nein", punkte: [
        "Zum Sprechen auffordern oder überreden („Sag doch mal …“, „Nur ein Wort!“).",
        "Das Schweigen vor anderen ansprechen oder bewerten.",
        "Bezeichnungen wie „schüchtern“ oder „die spricht nicht“.",
        "Belohnungen an Sprechen knüpfen („Wenn du sprichst, darfst du …“)."
      ] },
      { titel: "Wenn {kind} erstarrt", bild: "i-warten", punkte: [
        "Das ist eine Angstreaktion, kein Ungehorsam.",
        "Aufmerksamkeit nicht auf {kind} lenken, ruhig weitermachen.",
        "Eine Möglichkeit ohne Worte anbieten: nicken, zeigen, Karte.",
        "Später unter vier Augen freundlich nachfragen – mit Ja/Nein-Fragen."
      ] },
      { titel: "Wenn {kind} spricht", bild: "i-sprechen", punkte: [
        "Kein Aufhebens machen – ganz normal auf den Inhalt antworten.",
        "Kein „Oh, du sprichst ja!“, keine Ankündigung vor der Klasse.",
        "Ein kurzes „Danke“ und weitermachen ist das beste Lob."
      ] },
      { titel: "Im Unterricht", bild: "i-buch", punkte: [
        "Toilette: vorher eine Regel ausmachen (Karte oder ohne Fragen gehen). Bauch- oder Kopfweh kann Angst sein – bitte ernst nehmen.",
        "Mündliche Beteiligung auch schriftlich, nonverbal oder geflüstert ermöglichen.",
        "Mündliche Leistungen: Ein Nachteilsausgleich ist möglich (z. B. schriftlich, 1:1, Aufnahme von zu Hause). Bitte mit Eltern und Schulleitung absprechen.",
        "Schriftliche Leistungen sind in der Regel nicht betroffen."
      ] }
    ],
    kontaktTitel: "Kontakt und Absprachen",
    fussnote: "Erstellt mit „Sokrates' Teich“. Grundlage: Fachübersichten 2023/2025, Leitlinien des Interdisziplinären Mutismus Forums, SMIRA, Child Mind Institute, Selective Mutism Association.",
    vorstellung: {
      titel: "Hallo, ich bin {kind}!",
      text: [
        "Manchmal versteckt sich meine Stimme. Das ist Angst – kein Trotz.",
        "Ich höre dir trotzdem gut zu.",
        "Ich kann nicken, zeigen oder eine Karte zeigen.",
        "Bitte gib mir Zeit und frag mich Ja/Nein-Fragen.",
        "Danke!"
      ]
    }
  },

  mutSchatz: {
    intro: ["Hier sammelst du deinen Mut.", "Mut hat viele Formen. Alles zählt!"],
    zaehler: "{anzahl} von {ziel} Mut-Steinchen im Glas",
    voll: "Dein Glas ist voll! Du warst so oft mutig.",
    belohnung: "Ausgemacht ist: {belohnung}",
    neuesGlas: "Neues Glas anfangen",
    frage: "Was hast du gemacht?",
    lob: "Ein neues Mut-Steinchen für dein Glas! Ich bin stolz auf dich.",
    leer: "Noch leer. Jeder mutige Moment kommt hier hinein.",
    arten: [
      ["i-auge", "geguckt"],
      ["i-fuss", "hingegangen"],
      ["i-laecheln", "gelächelt"],
      ["i-winken", "gewinkt"],
      ["i-nicken", "genickt"],
      ["i-zeigen", "gezeigt"],
      ["i-karte", "eine Karte gezeigt"],
      ["i-fluestern", "geflüstert"],
      ["i-sprechen", "gesprochen"],
      ["i-stern", "etwas anderes"]
    ],
    stein: "Mut-Stein: {text}"
  },

  /*
   * Teich-Schätze: Sokrates findet sie bei Spielen (spiel) und für echten Mut (mut).
   * [id, Bild, Name, „Sokrates hat … gefunden“]
   */
  funde: {
    spiel: [
      ["seerose", "i-seerose", "Seerose", "eine Seerose"],
      ["frosch", "i-frosch", "Frosch", "einen Frosch"],
      ["fisch", "i-fisch", "Fisch", "einen Fisch"],
      ["ente", "i-ente", "Ente", "eine Ente"],
      ["schnecke", "i-schnecke", "Schnecke", "eine Schnecke"],
      ["schmetterling", "i-schmetterling", "Schmetterling", "einen Schmetterling"],
      ["blume", "i-blume", "Blume", "eine Blume"],
      ["schilf", "i-schilf", "Schilf", "Schilf"],
      ["pilz", "i-pilz", "Pilz", "einen Pilz"],
      ["muschel", "i-muschel", "Muschel", "eine Muschel"],
      ["boot", "i-boot", "Papierboot", "ein Papierboot"],
      ["sonne", "i-sonne", "Sonne", "eine Sonne"],
      ["wolke", "i-wolke", "Wolke", "eine Wolke"]
    ],
    mut: [
      ["gluehwurm", "i-gluehwurm", "Glühwürmchen", "ein Glühwürmchen"],
      ["goldstein", "i-goldstein", "Goldstein", "einen Goldstein"],
      ["stern", "i-stern", "Stern", "einen Stern"],
      ["regenbogen", "i-regenbogen", "Regenbogen", "einen Regenbogen"]
    ],
    abenteuer: [
      ["kristall", "i-kristall", "Kristall", "einen Kristall"],
      ["laterne", "i-laterne", "Laterne", "eine Laterne"],
      ["kompass", "i-kompass", "Kompass", "einen Kompass"]
    ],
    gefundenSpiel: "Sokrates hat {was} für deinen Teich gefunden!",
    gefundenMut: "Für deinen Mut hat Sokrates {was} gefunden!",
    ansehen: "Zu deinem Teich",
    teichText: [
      "Das ist dein Teich. Alles, was wir finden, darf hier wohnen.",
      "Tipp auf etwas in der Schatzkiste. Dann zieh es mit dem Finger dahin, wo es wohnen soll."
    ],
    kisteLeer: "Die Schatzkiste ist gerade leer.",
    nochNichts: "Noch ist nichts gefunden. Spiel ein Spiel oder sei mutig. Dann findet Sokrates etwas für dich.",
    zaehler: "{anzahl} Schätze gefunden",
    ausgewaehlt: "Du hast {name} ausgewählt.",
    ziehTipp: "Zieh es mit dem Finger. Oder tipp auf eine Stelle im Teich.",
    zurKiste: "Zurück in die Kiste",
    neu: "Neu!"
  },

  spiele: {
    intro: [
      "Hier können wir zusammen spielen.",
      "Niemand muss sprechen. Und verlieren kann man auch nicht.",
      "Nach jedem Spiel finde ich etwas für deinen Teich."
    ],
    liste: [
      { id: "spiel-boot",    name: "Seerosen-Boot",          unter: "Mit deinem Atem über den Teich", bild: "i-boot" },
      { id: "spiel-alarm",   name: "Alarmanlagen-Detektiv",  unter: "Wie laut ist deine Alarmanlage?", bild: "i-lampe" },
      { id: "spiel-zeichen", name: "Ohne Worte",             unter: "Antworten mit Daumen und Zeigen", bild: "i-mitmachen" },
      { id: "spiel-suchen",  name: "Wo ist Sokrates?",       unter: "Such mich im Bild",               bild: "i-auge" },
      { id: "spiel-memory",  name: "Gefühle-Memory",         unter: "Finde die Paare",                 bild: "i-laecheln" }
    ],
    nochmal: "Noch mal spielen",
    andere: "Andere Spiele",
    zumTeich: "Zu deinem Teich"
  },

  boot: {
    intro: [
      "Ich fahre mit meinem Seerosen-Boot über den Teich. Dein Atem ist der Wind.",
      "Halte den Knopf gedrückt und atme dabei langsam ein.",
      "Lass los und atme langsam aus. Dann fährt das Boot weiter."
    ],
    halten: "Gedrückt halten",
    ein: "Einatmen …",
    loslassen: "Jetzt loslassen und ausatmen",
    aus: "Ausatmen … ganz langsam",
    kurz: "Halte den Knopf ein bisschen länger. Ganz in Ruhe.",
    bereit: "Bereit für den nächsten Atemzug?",
    zaehler: "Atemzug {nr} von {von}",
    atemzuege: 5,
    einSekunden: 4,
    ausSekunden: 5,
    endeTitel: "Wir sind angekommen!",
    ende: ["Fünf Glühwürmchen leuchten für dich.", "Wie fühlt sich dein Bauch jetzt an?"]
  },

  alarm: {
    intro: [
      "Du bist jetzt Detektivin oder Detektiv!",
      "Ich zeige dir Karten. Wie laut ist deine Alarmanlage da?",
      "Es gibt kein Richtig und kein Falsch. Es ist ja deine Alarmanlage."
    ],
    start: "Los geht's",
    frage: "Wie laut ist deine Alarmanlage hier?",
    karte: "Karte {nr} von {von}",
    weiter: "Nächste Karte →",
    fertig: "Fertig! →",
    proRunde: 6,
    stufen: [
      { id: "leise",  name: "Leise",  level: 1, lampe: 0,    antwort: "Schön. Da ist es ruhig in dir." },
      { id: "mittel", name: "Mittel", level: 3, lampe: 0.5,  antwort: "Ein bisschen Kribbeln. Das kenne ich gut." },
      { id: "laut",   name: "Laut",   level: 5, lampe: 0.95, antwort: "Da piept sie laut. Danke, dass du es mir zeigst." }
    ],
    weissNicht: "Weiß nicht",
    weissNichtAntwort: "Das ist auch okay. Manchmal weiß man es nicht.",
    situationen: [
      ["i-haus", "Zuhause mit Mama oder Papa spielen"],
      ["i-person", "Eine neue Lehrerin kommt in die Klasse"],
      ["i-gruppe", "Ein Geburtstag mit vielen Kindern"],
      ["i-broetchen", "Beim Bäcker ein Brötchen kaufen"],
      ["i-ball", "Auf einen neuen Spielplatz gehen"],
      ["i-herz", "Mit der besten Freundin oder dem besten Freund spielen"],
      ["i-arzt", "Zum Arzt gehen"],
      ["i-telefon", "Mit Oma oder Opa telefonieren"],
      ["i-tafel", "Vor der Klasse etwas vorlesen"],
      ["i-seerose", "In der Ruhe-Ecke mit Sokrates atmen"],
      ["i-frage", "Ein Kind aus der Klasse fragt mich etwas"],
      ["i-ort", "In einen Laden gehen, den ich nicht kenne"]
    ],
    endeTitel: "Super Detektiv-Arbeit!",
    endeLeise: "Schau mal: An {anzahl} Orten ist deine Alarmanlage leise. Das ist toll!",
    endeLaut: "Für die lauten Orte gibt es die Mut-Steine. Ganz langsam, Schritt für Schritt.",
    endeAlle: "Danke, dass du mir das gezeigt hast."
  },

  zeichen: {
    intro: [
      "Ich stelle dir Fragen.",
      "Du antwortest ohne Worte: mit dem Daumen oder indem du auf etwas zeigst."
    ],
    start: "Los geht's",
    weiter: "Nächste Frage →",
    fertig: "Fertig! →",
    frage: "Frage {nr} von {von}",
    proRunde: 6,
    ja: "Ja", nein: "Nein", weissNicht: "Weiß nicht",
    verstanden: ["Ich habe dich verstanden!", "Alles klar!", "Danke für deine Antwort!"],
    weissNichtAntwort: "Das ist okay. Man muss nicht alles wissen.",
    gezeigt: "Du hast auf {was} gezeigt. Ich habe dich verstanden!",
    // Ja/Nein-Fragen: [Frage, Antwort bei Ja, Antwort bei Nein]
    jaNein: [
      ["Magst du Eis?", "Ich auch! Am liebsten Erdbeer-Eis.", "Okay! Dann essen wir lieber etwas anderes."],
      ["Kann eine Schildkröte fliegen?", "Hihi! Ich probiere es mal … Nein, klappt nicht.", "Genau! Ich bleibe lieber auf dem Boden."],
      ["Hast du heute schon gelacht?", "Wie schön!", "Vielleicht ja gleich. Ich mache mal ein lustiges Gesicht."],
      ["Ist ein Elefant klein?", "Hihi, ein ganz kleiner Elefant? Lustig!", "Stimmt! Ein Elefant ist riesig."],
      ["Magst du Regen?", "Dann springen wir zusammen in Pfützen!", "Okay! Dann bleiben wir bei Regen drinnen."],
      ["Schlafen Schildkröten im Winter?", "Richtig! Viele Schildkröten machen einen Winterschlaf.", "Doch, viele schon! Sie machen einen Winterschlaf."],
      ["Möchtest du mit mir spielen?", "Juhu! Das machen wir gerade.", "Okay. Wir können auch einfach zusammen am Teich sitzen."]
    ],
    // Zeige-Fragen: [Frage, [[Bild oder Farbe, Name], …]]
    zeigen: [
      ["Welche Farbe magst du am liebsten?", [["#E46F4F", "Rot"], ["#5FA8C7", "Blau"], ["#8CC063", "Grün"], ["#F2B544", "Gelb"], ["#A98BC9", "Lila"]]],
      ["Welches Wetter magst du am liebsten?", [["i-sonne", "Sonne"], ["i-regen", "Regen"], ["i-schnee", "Schnee"]]],
      ["Wer soll mich am Teich besuchen?", [["i-frosch", "Frosch"], ["i-ente", "Ente"], ["i-fisch", "Fisch"], ["i-schnecke", "Schnecke"]]],
      ["Wo bist du am liebsten?", [["i-haus", "Zuhause"], ["i-ball", "Spielplatz"], ["i-seerose", "Am Teich"]]],
      ["Was soll in meinen Teich?", [["i-blume", "Blume"], ["i-boot", "Papierboot"], ["i-muschel", "Muschel"]]],
      ["Was isst du lieber?", [["i-broetchen", "Brötchen"], ["i-pilz", "Pilze"]]]
    ],
    endeTitel: "Ich habe alles verstanden!",
    ende: ["Du hast mir {anzahl} Antworten gegeben. Ganz ohne Worte.", "Daumen, Nicken und Zeigen sind echte Antworten."]
  },

  suchen: {
    intro: ["Ich habe mich versteckt! Findest du mich?", "Such auch die anderen Dinge. Lass dir Zeit."],
    sokrates: "Sokrates",
    tipp: "Tipp",
    tippDa: "Da ist es!",
    gefunden: "gefunden",
    super: ["Gefunden! Super!", "Du hast gute Augen!", "Da war es!"],
    endeTitel: "Alles gefunden!",
    ende: ["Du hast mich gefunden. Und alles andere auch!", "Willst du ein anderes Bild ansehen?"]
  },

  memory: {
    intro: ["Finde immer zwei gleiche Karten.", "Tipp eine Karte an. Dann noch eine."],
    leicht: "4 Paare",
    schwer: "6 Paare",
    // [id, Name, Satz von Sokrates]
    gefuehle: [
      ["froh", "Froh", "Froh: Mir ist warm im Bauch, und ich lache."],
      ["mutig", "Mutig", "Mutig: Ich habe ein bisschen Angst und mache es trotzdem."],
      ["aufgeregt", "Aufgeregt", "Aufgeregt: Es kribbelt im Bauch. Das kennen alle."],
      ["muede", "Müde", "Müde: Ich brauche eine Pause. Das ist okay."],
      ["stolz", "Stolz", "Stolz: Ich habe etwas geschafft!"],
      ["ruhig", "Ruhig", "Ruhig: Alles ist leise in mir."],
      ["traurig", "Traurig", "Traurig: Dann tut eine Umarmung gut."],
      ["ueberrascht", "Überrascht", "Überrascht: Oh! Damit habe ich nicht gerechnet."]
    ],
    endeTitel: "Alle Paare gefunden!",
    ende: ["Alle Gefühle sind okay. Auch die schwierigen.", "Welches Gefühl kennst du gut?"]
  },

  /*
   * Abenteuer: größere Spiele für Kinder ab etwa 8 Jahren.
   * Die versunkene Truhe (Rätsel), Alarmzentrale (Strategie), Detektiv-Fall (Geschichte).
   */
  abenteuer: {
    titel: "Abenteuer",
    unter: "Größere Spiele zum Knobeln und Entdecken",
    liste: [
      { id: "spiel-truhe",    name: "Die versunkene Truhe", unter: "Vier Schlösser, vier Rätsel",          bild: "i-truhe" },
      { id: "spiel-zentrale", name: "Alarmzentrale",        unter: "Mach es für Sokrates leichter",         bild: "i-lampe" },
      { id: "spiel-fall",     name: "Detektiv Sokrates",    unter: "Wo ist das kleine Glühwürmchen?",       bild: "i-lupe" }
    ],
    fortschritt: {
      truhe: "{anzahl} von 4 Schlössern offen",
      truheFertig: "Geöffnet!",
      zentrale: "{anzahl} von {von} Missionen geschafft",
      fall: "{anzahl} Hinweise gefunden",
      fallFertig: "Fall gelöst!"
    },
    belohnung: "Für dieses Abenteuer bekommst du {was}!"
  },

  truhe: {
    intro: [
      "Unter dem alten Steg habe ich eine Truhe gefunden!",
      "Sie hat vier Schlösser. Zu jedem Schloss gehört ein Rätsel.",
      "Du kannst anfangen, wo du willst. Und du kannst jederzeit aufhören. Ich merke mir, welche Schlösser schon offen sind."
    ],
    schloesser: [
      { id: "zaehlen", name: "Zahlen-Schloss", bild: "i-frosch" },
      { id: "muster",  name: "Muster-Schloss", bild: "i-stern" },
      { id: "logik",   name: "Stein-Schloss",  bild: "i-steine" },
      { id: "schiebe", name: "Bild-Schloss",   bild: "sokrates-1" }
    ],
    offen: "Klick! Das {name} ist offen.",
    nochZu: "Welches Schloss willst du dir ansehen?",
    zaehlen: {
      aufgabe: "Auf dem Schloss steht: Zähle die Tiere im Teich. Das ist der Code.",
      falsch: "Noch nicht ganz. Zähl die {name} noch mal in Ruhe.",
      tipp: "Tipp",
      oeffnen: "Schloss öffnen"
    },
    muster: {
      aufgabe: "Welche Bilder fehlen? Schau, wie die Reihe weitergeht.",
      runde: "Reihe {nr} von {von}",
      falsch: "Hmm, das passt hier noch nicht. Schau noch mal.",
      gut: "Genau!"
    },
    logik: {
      aufgabe: "Die Tiere wollen auf den Steinen sitzen. Lies die Hinweise. Tipp erst ein Tier an, dann einen Stein.",
      steine: ["links", "in der Mitte", "rechts"],
      pruefen: "Sitzen alle richtig?",
      falsch: "Fast! Schau noch mal auf den Hinweis, der markiert ist.",
      leer: "Es sitzen noch nicht alle Tiere auf einem Stein."
    },
    schiebe: {
      aufgabe: "Schieb die Teile, bis das Bild wieder stimmt. Tipp auf ein Teil neben der Lücke.",
      zahlen: "Zahlen zeigen",
      ohneZahlen: "Zahlen verstecken",
      mischen: "Neu mischen"
    },
    endeTitel: "Die Truhe ist offen!",
    ende: ["In der Truhe glitzert ein Kristall. Und darunter liegt ein alter Schlüssel.", "Wofür der wohl ist? Vielleicht braucht Detektiv Sokrates ihn noch …"],
    nochmal: "Neue Rätsel"
  },

  zentrale: {
    intro: [
      "Willkommen in der Alarmzentrale!",
      "Bei jeder Mission ist meine Alarmanlage ganz schön laut. Du darfst bis zu drei Hilfen aussuchen.",
      "Probier aus, was die Alarmanlage leiser macht. Es gibt immer mehrere gute Wege."
    ],
    waehle: "Such dir eine Mission aus:",
    hilfen: "Hilfen: {anzahl} von {von}",
    alarm: "Alarm: {wert} von 10",
    los: "Los, Sokrates!",
    zuLaut: "Schon leiser! Aber noch etwas laut. Probier eine andere Hilfe aus.",
    geschafft: "Aha! Das hat mir geholfen:",
    gelernt: "Situationen kann man verändern. Dann wird es leichter.",
    naechste: "Nächste Mission",
    alle: "Alle Missionen",
    zurueck: "← Alle Missionen",
    alleGeschafft: "Du hast alle Missionen geschafft!",
    faktorenTitel: "Was macht die Alarmanlage laut?",
    hilfenTitel: "Deine Hilfen",
    werkzeugGruppen: [
      { titel: "Zusammen", hilfen: ["freund", "eltern", "kennenlernen", "gruppe"] },
      { titel: "Vorbereiten und zeigen", hilfen: ["hingehen", "zeigen", "aufschreiben", "ueben"] },
      { titel: "Zeit und Ruhe", hilfen: ["rand", "zeit", "atmen"] }
    ],
    maxHilfen: 3,
    ziel: 3,
    faktoren: {
      fremd:   ["i-person", "Jemand Unbekanntes"],
      neu:     ["i-ort", "Ein neuer Ort"],
      viele:   ["i-gruppe", "Viele Menschen"],
      frage:   ["i-frage", "Jemand fragt mich etwas"],
      schauen: ["i-auge", "Alle schauen her"],
      zeit:    ["i-warten", "Es muss schnell gehen"],
      laut:    ["i-lautsprecher", "Laut und trubelig"]
    },
    // wirkt: { faktor: wie viel leiser }, gesamt: macht alles etwas leiser
    werkzeuge: [
      { id: "freund",       bild: "i-herz",      name: "Freundin oder Freund dabei",      wirkt: { fremd: 1, viele: 1, schauen: 1 } },
      { id: "eltern",       bild: "i-haus",      name: "Mama oder Papa dabei",            wirkt: { fremd: 2, neu: 1 } },
      { id: "kennenlernen", bild: "i-winken",    name: "Die Person vorher kurz treffen",  wirkt: { fremd: 2 } },
      { id: "hingehen",     bild: "i-fuss",      name: "Den Ort vorher anschauen",        wirkt: { neu: 2 } },
      { id: "zeigen",       bild: "i-zeigen",    name: "Antworten darf ich zeigen",       wirkt: { frage: 2 } },
      { id: "aufschreiben", bild: "i-stift",     name: "Aufschreiben ist erlaubt",        wirkt: { frage: 2 } },
      { id: "gruppe",       bild: "i-gruppe",    name: "Kleine Gruppe statt alle",        wirkt: { viele: 2, schauen: 1 } },
      { id: "rand",         bild: "i-seerose",   name: "Ein ruhiger Platz am Rand",       wirkt: { laut: 1, schauen: 1, viele: 1 } },
      { id: "zeit",         bild: "i-warten",    name: "Genug Zeit lassen",               wirkt: { zeit: 2, frage: 1 } },
      { id: "ueben",        bild: "i-steine",    name: "Zu Hause vorher üben",            wirkt: { frage: 1, neu: 1 } },
      { id: "atmen",        bild: "sokrates-1",  name: "Vorher mit Sokrates atmen",       gesamt: 1 }
    ],
    missionen: [
      { id: "lehrerin",   bild: "i-person",    titel: "Eine neue Lehrerin kommt in die Klasse", faktoren: { fremd: 3, viele: 2, frage: 2, schauen: 2 } },
      { id: "baecker",    bild: "i-broetchen", titel: "Beim Bäcker ein Brötchen kaufen",        faktoren: { fremd: 2, frage: 2, zeit: 2, laut: 1 } },
      { id: "geburtstag", bild: "i-gruppe",    titel: "Geburtstag bei einem Kind aus der Klasse", faktoren: { neu: 2, viele: 3, laut: 2, fremd: 1 } },
      { id: "arzt",       bild: "i-arzt",      titel: "Zum Arzt gehen",                         faktoren: { fremd: 2, neu: 2, frage: 3 } },
      { id: "training",   bild: "i-ball",      titel: "Das erste Training im Sportverein",      faktoren: { fremd: 2, neu: 2, viele: 2, schauen: 2 } },
      { id: "vorne",      bild: "i-tafel",     titel: "Vor der Klasse etwas zeigen",            faktoren: { schauen: 3, viele: 2, frage: 2 } },
      { id: "restaurant", bild: "i-durst",     titel: "Im Restaurant etwas bestellen",          faktoren: { fremd: 2, frage: 2, laut: 1, viele: 1, schauen: 1 } },
      { id: "museum",     bild: "i-ort",       titel: "Ein Ausflug ins Museum",                 faktoren: { neu: 3, viele: 2, laut: 1, fremd: 1 } }
    ]
  },

  fall: {
    titel: "Das verschwundene Glühwürmchen",
    intro: [
      "Heute Morgen war es am Teich so dunkel.",
      "Funkel, das kleinste Glühwürmchen, ist verschwunden!",
      "Hilfst du mir, Funkel zu finden? Wir untersuchen verschiedene Orte und sammeln Hinweise."
    ],
    karte: "Wohin gehen wir?",
    akte: "Deine Akte",
    akteLeer: "Noch keine Hinweise.",
    untersuchen: "Untersuch das Bild. Irgendwo ist ein Hinweis versteckt.",
    tipp: "Tipp",
    gefunden: "Ein Hinweis!",
    fragen: "Wie fragt Sokrates?",
    fragenText: "Es gibt viele Wege. Alle funktionieren.",
    wege: [
      { id: "freund",       bild: "i-herz",      name: "Freundin fragt mit",  vorher: "Sokrates' Freundin fragt für ihn. {Person} antwortet:" },
      { id: "karte",        bild: "i-karte",     name: "Karte zeigen",         vorher: "{Person} liest die Karte „Hast du Funkel gesehen?“ und nickt:" },
      { id: "aufschreiben", bild: "i-stift",     name: "Aufschreiben",         vorher: "{Person} liest den Zettel und sagt:" },
      { id: "zeigen",       bild: "i-zeigen",    name: "Auf ein Bild zeigen",  vorher: "Sokrates zeigt ein Bild von Funkel. {Person} versteht sofort:" },
      { id: "fluestern",    bild: "i-fluestern", name: "Flüstern",             vorher: "Sokrates flüstert seiner Freundin etwas zu. Sie fragt weiter. {Person} sagt:" },
      { id: "sprechen",     bild: "i-sprechen",  name: "Selbst fragen",        vorher: "Sokrates fragt leise. {Person} lächelt:" }
    ],
    orte: [
      { id: "teich", name: "Am Teich", bild: "i-seerose",
        person: { name: "Die Ente", bild: "i-ente" },
        antwort: "„Gestern Abend ist Funkel Richtung Schulhof geflogen.“",
        suche: { bild: "i-stern", x: 600, y: 300, text: "Glitzerstaub auf einer Seerose. Funkel war hier." } },
      { id: "schulhof", name: "Schulhof", bild: "i-tafel",
        person: { name: "Der Hausmeister", bild: "person:8" },
        antwort: "„Ich habe gestern Abend ein kleines Licht gesehen. Neben ihm kroch eine Schnecke.“",
        suche: { bild: "i-schnecke", x: 700, y: 470, text: "Eine glitzernde Schleimspur. Sie führt zum Markt." } },
      { id: "markt", name: "Markt", bild: "i-broetchen",
        person: { name: "Die Bäckerin", bild: "person:1" },
        antwort: "„Die kleine Schnecke hatte sich verlaufen. Funkel hat ihr den Weg geleuchtet.“",
        suche: { bild: "i-karte", x: 430, y: 496, text: "Ein Zettel mit einer Zeichnung: ein kleines Haus aus Holz am Wasser." } },
      { id: "spielplatz", name: "Spielplatz", bild: "i-ball",
        person: { name: "Der Junge vom Spielplatz", bild: "person:3" },
        antwort: "„Die kleine Schnecke wohnt bei der alten Bootshütte am Teich!“",
        suche: { bild: "i-gluehwurm", x: 365, y: 470, text: "Leuchtpunkte im Sand. Sie zeigen zurück zum Teich." } }
    ],
    huette: { id: "huette", name: "Alte Bootshütte", bild: "i-schluessel" },
    frageWo: "Wo ist Funkel? Schau in deine Akte.",
    optionen: [["schulhof", "Auf dem Schulhof"], ["markt", "Auf dem Markt"], ["spielplatz", "Auf dem Spielplatz"], ["huette", "In der alten Bootshütte"]],
    nichtDa: "Hmm, das passt noch nicht zu allen Hinweisen. Schau noch mal in die Akte.",
    richtig: "Ja! Alle Hinweise zeigen zur alten Bootshütte.",
    mehrHinweise: "Sammle noch ein paar Hinweise. Dann können wir überlegen, wo Funkel ist.",
    ueberlegen: "Wo ist Funkel?",
    zu: "Die Tür ist abgeschlossen. Ein alter Schlüssel würde passen … Vielleicht liegt einer in der versunkenen Truhe?",
    zurTruhe: "Zur versunkenen Truhe",
    aufschliessen: "Mit dem Schlüssel aufschließen",
    endeTitel: "Fall gelöst!",
    ende: [
      "Da ist Funkel! Und die kleine Schnecke mit ihrer Familie.",
      "Die Tür ist gestern zugefallen. Funkel kam nicht mehr heraus.",
      "Danke, Detektivin oder Detektiv! Heute Abend leuchtet es am Teich wieder."
    ],
    nochmal: "Fall noch mal spielen"
  },

  /* ---------- Meine Stimmen-Karte (Sprech-Landkarte) ---------- */
  stimmenKarte: {
    intro: [
      "Das ist deine Stimmen-Karte. Hier zeigst du, wo deine Stimme schon zu Hause ist.",
      "Es gibt kein Richtig und kein Falsch. Die Karte zeigt nur, wie es gerade ist. Jeder Platz ist in Ordnung.",
      "Tipp auf einen Namen im Korb. Dann tipp auf das Feld, das passt."
    ],
    zonen: [
      { id: "sprechen",  titel: "Hier spreche ich",       unter: "ganz normal, laut oder leise", bild: "i-sprechen" },
      { id: "fluestern", titel: "Hier flüstere ich",      unter: "oder spreche ganz leise",      bild: "i-fluestern" },
      { id: "zeigen",    titel: "Hier zeige oder nicke ich", unter: "oder zeige eine Karte",     bild: "i-zeigen" },
      { id: "still",     titel: "Hier bin ich noch still", unter: "Das ist okay. Mein Panzer passt auf mich auf.", bild: "sokrates-5" }
    ],
    korb: "Mein Korb",
    korbLeer: "Alles ist auf der Karte. Du kannst jederzeit etwas verschieben.",
    korbText: "Tipp auf einen Namen. Dann auf das passende Feld.",
    gewaehlt: "Wohin gehört „{name}“? Tipp auf ein Feld.",
    zurueckInKorb: "Zurück in den Korb",
    hierhin: "{name} hierhin legen",
    hierhinKurz: "Hierhin legen",
    vorschlaege: [
      { text: "Mama", bild: "i-herz" }, { text: "Papa", bild: "i-herz" }, { text: "Geschwister", bild: "i-gruppe" },
      { text: "Oma und Opa", bild: "i-haus" }, { text: "Beste Freundin oder bester Freund", bild: "i-laecheln" },
      { text: "Lehrerin oder Lehrer", bild: "i-tafel" }, { text: "Kinder in der Klasse", bild: "i-gruppe" },
      { text: "Hort oder Betreuung", bild: "i-person" }, { text: "Ärztin oder Arzt", bild: "i-arzt" },
      { text: "Im Laden", bild: "i-broetchen" }, { text: "Trainerin oder Trainer", bild: "i-ball" }, { text: "Am Telefon", bild: "i-telefon" }
    ],
    eigenTitel: "Fehlt jemand?",
    eigenFeld: "Name oder Ort",
    eigenBeispiel: "z. B. Tante Uli, Musikschule",
    eigenDazu: "Dazulegen",
    entfernen: "Von der Karte nehmen",
    entfernenFrage: "„{name}“ ganz von der Karte nehmen?",
    naeher: [
      "Wow! „{name}“ ist auf deiner Karte ein Stück näher gerückt.",
      "Das ist ein mutiger Schritt. Die Alarmanlage hat etwas gelernt."
    ],
    weiter: "Okay. Manchmal ist es an einem Tag schwerer. Das ist in Ordnung.",
    gleich: "Gut, dass du es zeigst.",
    ideeTitel: "Eine Mut-Stein-Idee",
    ideen: {
      still: "{name}: Ich nicke oder zeige, wenn ich etwas gefragt werde.",
      zeigen: "{name}: Ich mache ein Geräusch oder flüstere ein Wort.",
      fluestern: "{name}: Ich sage ein Wort mit meiner normalen Stimme."
    },
    ideeKnopf: "Als Mut-Stein merken",
    ideeGemerkt: "Liegt jetzt bei den Mut-Steinen unter „Mein eigener Weg“.",
    ideeHinweis: "Nur, wenn du magst. Du bestimmst das Tempo.",
    drucken: "Karte drucken",
    druckTitel: "Meine Stimmen-Karte",
    druckDatum: "Stand: {datum}",
    erwachseneTitel: "Für Erwachsene",
    erwachsene: "Die Stimmen-Karte ist eine Sprech-Landkarte: Sie zeigt, mit wem und wo das Kind spricht, flüstert, sich ohne Worte verständigt oder noch still ist. So findet ihr den Ausgangspunkt für kleine Schritte. Änderungen werden mit Datum gespeichert und erscheinen unter „Für Erwachsene“ und im Steckbrief.",
    verlaufTitel: "Stimmen-Karte: Was sich bewegt hat",
    verlaufLeer: "Noch keine Änderungen.",
    verlaufZeile: "{name}: {von} → {nach}"
  },

  /* ---------- Für Erwachsene: Was ihr selbst tun könnt ---------- */
  selbstTun: {
    intro: "Eine Therapie lässt sich nicht ersetzen. Aber viele Bausteine, mit denen Therapeutinnen und Therapeuten arbeiten, können Eltern schon jetzt im Alltag nutzen – vorsichtig, in kleinen Schritten und ohne Druck.",
    evidenz: "Dass Eltern so wirksam helfen können, ist für Ängste im Kindesalter belegt: In einer Studie erholten sich Kinder deutlich häufiger, wenn ihre Eltern mit fachlicher Anleitung verhaltenstherapeutische Grundsätze im Alltag anwendeten. Für selektiven Mutismus selbst ist die Studienlage kleiner. Holt euch deshalb, sobald es geht, fachliche Begleitung dazu.",
    grundsaetzeTitel: "Drei Grundsätze",
    grundsaetze: [
      ["i-herz", "Erst Sicherheit, dann Schritte.", "Das Kind muss sich wohlfühlen, bevor es etwas Neues wagt."],
      ["i-steine", "Ein Schritt, der leicht ist.", "Lieber zu klein als zu groß. Erst weiter, wenn der Schritt sicher klappt."],
      ["i-stern", "Mut bemerken.", "Jeden Schritt – auch Nicken oder Zeigen – freundlich und konkret anerkennen."]
    ],
    bausteine: [
      { id: "spielzeit", bild: "i-spiel", titel: "Spielzeit ohne Fragen", text: "Täglich 5 bis 10 Minuten, in denen das Kind bestimmt, was gespielt wird. Ziel: Nähe und Sicherheit, kein Sprechen. Das ist die erste Phase einer bewährten Eltern-Kind-Therapie (PCIT).",
        tun: ["Konkret loben: „Du hast den Turm ganz vorsichtig gebaut.“", "Beschreiben, was das Kind tut: „Du malst die Sonne gelb.“", "Wiederholen, was es sagt – und Mitspielen, Nachmachen, Freude zeigen."],
        lassen: ["Fragen („Was baust du?“)", "Anweisungen („Mach mal …“)", "Kritik oder Verbesserungen"] },
      { id: "karte", bild: "i-ort", titel: "Den Ausgangspunkt finden", text: "Schaut gemeinsam auf die Stimmen-Karte: Mit wem und wo spricht, flüstert oder zeigt das Kind? Der nächste Schritt liegt immer am Rand des Gewohnten – zum Beispiel bei einer Person, bei der das Kind schon nickt.",
        link: ["stimmen-karte", "Zur Stimmen-Karte"] },
      { id: "schritte", bild: "i-steine", titel: "Kleine Schritte zum Sprechen", text: "Kommunikation wächst in Stufen. Jede Stufe zählt – das Kind muss nicht sofort sprechen.",
        stufen: ["Da sein, ohne etwas zu müssen", "Nicken, zeigen, Karte zeigen", "Geräusche, Lachen, „Mhm“", "Flüstern zu einer vertrauten Person, während andere in der Nähe sind", "Einzelne Wörter, vorhersehbare Antworten (zählen, Farben, Ja/Nein)", "Kurze Sätze, dann freieres Sprechen"],
        nachsatz: "Plant die Schritte mit dem Kind, zum Beispiel als eigenen Weg bei den Mut-Steinen. Ein Schritt wird so oft wiederholt, bis er leicht ist.",
        link: ["mut-steine", "Zu den Mut-Steinen"] },
      { id: "sliding", bild: "i-person", titel: "Eine neue Person langsam dazunehmen", text: "Diese Methode heißt „Sliding-in“ (auf Deutsch etwa: hineingleiten). Das Kind spricht mit einer vertrauten Person, und eine neue Person kommt Schritt für Schritt dazu. Gut geeignet für Großeltern, Babysitter oder später die Lehrkraft.",
        stufen: ["Kind und Mama oder Papa spielen in einem ruhigen Raum ein Spiel mit kurzen, vorhersehbaren Antworten (zählen, Farben benennen, Memory-Karten benennen).", "Die neue Person ist in Hörweite, beschäftigt sich mit etwas anderem und schaut nicht hin.", "Sie kommt mit der Zeit näher und setzt sich schließlich dazu – ohne das Kind anzusprechen.", "Sie macht beim Spiel mit. Das Kind spricht weiter zu Mama oder Papa.", "Das Kind antwortet im Spiel auch der neuen Person – erst mit einem Wort, dann mehr.", "Mama oder Papa ziehen sich langsam zurück."],
        nachsatz: "Kurze Einheiten (10 bis 15 Minuten), lieber oft als lang. Erst zum nächsten Schritt, wenn der vorige entspannt klappt. Geht etwas schief: einen Schritt zurück, ohne Kommentar." },
      { id: "fragen", bild: "i-frage", titel: "Fragen, die leicht zu beantworten sind", text: "Wie man fragt, macht einen großen Unterschied.",
        tun: ["Wahlfragen: „Apfel oder Banane?“", "Nach einer Frage mindestens 5 Sekunden warten.", "Nonverbale Antworten freundlich annehmen."],
        lassen: ["Für das Kind antworten", "„Sag doch mal …“, überreden oder bitten", "Offene Fragen in angespannten Momenten"] },
      { id: "lob", bild: "i-glas", titel: "Mut sichtbar machen", text: "Mut wird gestärkt, wenn er bemerkt wird.",
        tun: ["Nach einem geschafften Schritt konkret und ruhig loben – gern unter vier Augen.", "Kleine Belohnungen für vereinbarte Schritte, zum Beispiel über den Mut-Schatz.", "Sprechen, wenn es passiert, ganz normal aufnehmen – ohne großes Aufheben."],
        lassen: ["Belohnungen vorher als Druckmittel versprechen („Wenn du sprichst, …“)", "Enttäuschung zeigen, wenn es nicht klappt"],
        link: ["mut-schatz", "Zum Mut-Schatz"] },
      { id: "umfeld", bild: "i-gruppe", titel: "Familie und Freunde einweihen", text: "Gut gemeinte Sätze wie „Na, hast du deine Zunge verschluckt?“ machen es schwerer. Ein kurzes Blatt für Großeltern, Verwandte, Nachbarn und Freunde hilft.",
        druck: true }
    ],
    umfeldBlatt: {
      knopf: "Blatt für Familie und Freunde drucken",
      titel: "Wenn ein Kind manchmal nicht spricht",
      untertitel: "Ein paar Sätze für Familie, Freunde und Nachbarn",
      absaetze: [
        "Das Kind hat selektiven Mutismus. Das ist eine Angst, keine Schüchternheit und kein Trotz. Zu Hause spricht es ganz normal. Bei anderen Menschen bleibt die Stimme manchmal weg, obwohl es gern sprechen würde.",
        "Was hilft: freundlich begrüßen, ohne eine Antwort zu erwarten. Fragen stellen, die man mit Nicken oder Zeigen beantworten kann. Geduldig warten. Nicken, Zeigen und Lächeln sind echte Antworten.",
        "Was es schwerer macht: zum Sprechen auffordern („Sag doch mal Hallo“), das Schweigen kommentieren, das Kind „schüchtern“ nennen oder vor anderen auf das Schweigen ansprechen.",
        "Und wenn das Kind doch spricht: ganz normal antworten und nicht staunen. Das ist das beste Lob.",
        "Danke, dass ihr mithelft!"
      ]
    },
    warnTitel: "Bitte nicht allein lassen",
    warn: [
      "Wenn das Kind auch zu Hause verstummt, sich stark zurückzieht, kaum noch isst oder schläft oder sehr traurig wirkt: zeitnah zur Kinderärztin oder zum Kinderarzt oder in die Kinder- und Jugendpsychiatrie.",
      "Wenn ihr euch Sorgen um die Sicherheit des Kindes macht: Notruf 112."
    ],
    elternTitel: "Und ihr?",
    eltern: [
      "Ihr seid nicht schuld. Selektiver Mutismus hat viele Ursachen, und niemand hat ihn „anerzogen“.",
      "Rückschläge gehören dazu. Ein schwerer Tag macht keinen Fortschritt zunichte.",
      "Austausch hilft: Selbsthilfegruppen und Elternkreise gibt es online und in vielen Städten (siehe Wegweiser)."
    ],
    tunTitel: "Hilft",
    lassenTitel: "Lieber lassen",
    stufenTitel: "Schritt für Schritt"
  },

  /* ---------- Für Erwachsene: Wegweiser „Hilfe finden“ ---------- */
  wegweiser: {
    intro: "Ein Therapieplatz für ein Kind mit selektivem Mutismus ist oft schwer zu finden. Hier stehen die Wege, die es in Deutschland gibt, und Werkzeuge für die Suche: eine Liste für eure Anfragen, ein Brief an Praxen und ein Steckbrief für das Erstgespräch.",
    stand: "Stand: Oktober 2026 · für gesetzlich Versicherte in Deutschland",
    wichtigTitel: "Gut zu wissen",
    wichtig: [
      "Dass ein Kind nicht spricht, ist kein Grund gegen eine Therapie. Es ist der Ausgangspunkt. Mutismus-Therapie beginnt bewusst ohne Sprechen: erst Vertrauen und nonverbale Antworten, dann kleine Schritte – ohne Sprechdruck.",
      "Sagt eine Praxis deshalb ab, fehlt dort meist die Erfahrung mit Mutismus. Fragt gezielt nach Mutismus-Erfahrung und sucht weiter. Ihr macht nichts falsch."
    ],
    wegeTitel: "Die Wege im Überblick",
    wege: [
      { bild: "i-arzt", titel: "Kinderärztin oder Kinderarzt", punkte: [
        "Erste Anlaufstelle: Hören, Sprachentwicklung und andere Ursachen abklären lassen.",
        "Kann ein Rezept für Sprachtherapie (Logopädie) ausstellen und an ein Sozialpädiatrisches Zentrum (SPZ) oder die Kinder- und Jugendpsychiatrie überweisen.",
        "Tipp: Brief und Steckbrief von dieser Seite ausdrucken und mitnehmen."
      ] },
      { bild: "i-sprechen", titel: "Logopädie mit Mutismus-Schwerpunkt", punkte: [
        "Viele Mutismus-Konzepte kommen aus der Sprachtherapie, zum Beispiel KoMut, DortMuT oder SYMUT. Fragt gezielt nach Praxen, die damit arbeiten.",
        "Verordnet wird mit einem Heilmittel-Rezept. Aber: Mutismus selbst steht nicht im Heilmittelkatalog, die Kostenübernahme ist nicht einheitlich geregelt. Bittet die Ärztin oder den Arzt, sich an den Hinweisen für Ärzt:innen von StillLeben e.V. zu orientieren, und fragt vorher bei eurer Krankenkasse nach.",
        "Kinder und Jugendliche unter 18 Jahren zahlen für Heilmittel nichts zu."
      ] },
      { bild: "i-herz", titel: "Psychotherapie für Kinder und Jugendliche", punkte: [
        "Erster Schritt ist eine psychotherapeutische Sprechstunde. Einen Termin vermittelt die Terminservicestelle: Telefon 116117 oder 116117.de.",
        "Nach der Sprechstunde bekommt ihr das Formular PTV 11. Es hält fest, ob eine Behandlung nötig ist (und ob sie dringend ist). Gut aufheben!",
        "Parallel auf mehrere Wartelisten setzen lassen und jede Anfrage unten in „Unsere Therapieplatz-Suche“ notieren.",
        "Gut passt eine Praxis, die schrittweise arbeitet (meist Verhaltenstherapie) und Eltern und Schule einbezieht."
      ] },
      { bild: "i-kiste", titel: "Kein Kassenplatz? Kostenerstattung", punkte: [
        "Findet ihr in zumutbarer Zeit keinen Kassenplatz, kann die Krankenkasse eine Therapie bei einer approbierten Privatpraxis bezahlen (Kostenerstattung nach § 13 Abs. 3 SGB V).",
        "Dafür braucht ihr meist: das PTV 11, eine Liste eurer Anfragen mit Absagen und Wartezeiten (oft reichen 5 bis 10) und eine Privatpraxis, die einen Platz anbietet.",
        "Den Antrag vor Beginn der Therapie bei der Krankenkasse stellen. Die Liste unten lässt sich dafür ausdrucken.",
        "Kassen entscheiden unterschiedlich. Gegen eine Ablehnung könnt ihr Widerspruch einlegen."
      ] },
      { bild: "i-haus", titel: "SPZ oder Kinder- und Jugendpsychiatrie", punkte: [
        "Mit Überweisung: gründliche Abklärung durch ein Team aus Ärzt:innen, Psycholog:innen und Therapeut:innen.",
        "Eine Diagnose von hier braucht ihr oft für Anträge beim Jugendamt.",
        "Viele Kliniken haben Ambulanzen, die auch ambulant behandeln."
      ] },
      { bild: "i-gruppe", titel: "Erziehungsberatung und Schulpsychologie", punkte: [
        "Erziehungsberatungsstellen sind kostenlos und ohne Überweisung erreichbar. Sie beraten Eltern und kennen oft Angebote in der Nähe.",
        "Der schulpsychologische Dienst berät Schule und Eltern, etwa zu Absprachen im Unterricht und zum Nachteilsausgleich bei mündlichen Leistungen."
      ] },
      { bild: "i-hand", titel: "Jugendamt: Eingliederungshilfe", punkte: [
        "Schränkt der Mutismus die Teilhabe deutlich ein – etwa in der Schule – und voraussichtlich länger als sechs Monate, kann Eingliederungshilfe nach § 35a SGB VIII beantragt werden, zum Beispiel eine Schulbegleitung.",
        "Nötig sind ein schriftlicher Antrag und eine fachliche Stellungnahme (z. B. Kinder- und Jugendpsychiatrie oder SPZ), oft auch eine Stellungnahme der Schule.",
        "Die Jugendämter entscheiden unterschiedlich. Lasst euch dabei beraten, zum Beispiel von einer Selbsthilfe-Organisation."
      ] },
      { bild: "i-ort", titel: "Selbsthilfe und Fachleute-Listen", punkte: [
        "Mutismus Selbsthilfe Deutschland e.V. (mutismus.de) und StillLeben e.V. (selektiver-mutismus.de) bieten Informationen, Ansprechpersonen und Hinweise auf Fachleute.",
        "Austausch mit anderen Eltern entlastet – und sie kennen oft Praxen in eurer Gegend."
      ] }
    ],
    wartenTitel: "Während ihr wartet",
    warten: [
      "Die Wartezeit ist nicht verloren. Druck herausnehmen, nonverbale Antworten annehmen, kleine Mut-Schritte gehen: Das sind dieselben Grundsätze, mit denen auch eine Therapie arbeitet.",
      "Mit Schule oder Kita sprechen und das Infoblatt mitgeben.",
      "Mut-Steine und Mut-Schatz nutzen. Was das Kind dort geschafft hat, erscheint im Steckbrief und hilft der Therapie beim Einstieg."
    ],
    hinweis: "Sorgfältig recherchiert, aber keine Rechts- oder Sozialberatung. Krankenkassen und Ämter entscheiden im Einzelfall. In Österreich und der Schweiz gelten andere Wege.",

    suche: {
      titel: "Unsere Therapieplatz-Suche",
      text: "Notiert jede Anfrage, auch wenn niemand zurückruft. So behaltet ihr den Überblick, und für eine Kostenerstattung habt ihr die Liste gleich parat. Die Einträge bleiben auf diesem Gerät.",
      praxis: "Praxis oder Name", art: "Art", datum: "Datum", weg: "Wie angefragt", antwort: "Antwort", wartezeit: "Genannte Wartezeit", notiz: "Notiz",
      arten: ["Psychotherapie", "Logopädie", "SPZ oder Klinik", "Beratung", "Sonstiges"],
      wege: ["Telefon", "E-Mail", "Anrufbeantworter", "Persönlich", "Online-Formular"],
      antworten: ["Absage", "Warteliste", "Kein Rückruf", "Termin angeboten", "Noch offen"],
      eintragen: "Anfrage eintragen",
      fehltPraxis: "Bitte mindestens die Praxis oder den Namen eintragen.",
      leer: "Noch keine Anfragen notiert.",
      zaehler: "{anzahl} Anfragen · davon {absagen} Absagen oder ohne Rückruf",
      loeschen: "Löschen",
      loeschenFrage: "Diesen Eintrag löschen?",
      drucken: "Liste drucken",
      druckTitel: "Kontaktprotokoll: Suche nach einem Therapieplatz",
      druckFelder: ["Kind (Name, Geburtsdatum)", "Versichert bei / Versichertennummer", "PTV 11 vom"],
      druckFuss: "Erstellt mit „Sokrates' Teich“.",
      unterschrift: "Ort, Datum, Unterschrift"
    },

    brief: {
      titel: "Brief an Praxen",
      text: "Zum Ausdrucken oder als Text für eine E-Mail. Er erklärt kurz, warum Nicht-Sprechen kein Hindernis für eine Therapie ist. Name und Kontakt kommen aus den Feldern hier und aus „Für Lehrkräfte“.",
      alter: "Alter des Kindes", alterBeispiel: "z. B. 9 Jahre",
      absender: "Unterschrift (Eltern)", kontakt: "Telefon oder E-Mail",
      drucken: "Brief drucken", kopieren: "Text kopieren", kopiert: "Kopiert – jetzt in eine E-Mail einfügen.",
      kopierenGeht: "Kopieren ging nicht. Bitte den Text unten markieren und kopieren.",
      betreff: "Anfrage Therapieplatz – selektiver Mutismus",
      anrede: "Sehr geehrte Damen und Herren,",
      absaetze: [
        "wir suchen einen Therapieplatz für unser Kind{name}{alter}. Unser Kind hat selektiven Mutismus: Zu Hause spricht es normal, in der Schule und bei fremden Menschen bleibt die Stimme aus Angst aus.",
        "Selektiver Mutismus ist eine Angststörung (ICD-10 F94.0, ICD-11 6B06). Dass unser Kind in Ihrer Praxis anfangs nicht sprechen wird, gehört zum Störungsbild. Es ist der Ausgangspunkt der Behandlung, kein Hindernis: Bewährte Ansätze beginnen ohne Sprechanforderung, lassen nonverbale Antworten zu und bauen das Sprechen in kleinen Schritten auf (schrittweise Annäherung, Stimulus Fading, Shaping), möglichst unter Einbezug von Eltern und Schule.",
        "Wir unterstützen die Therapie gern aktiv und bringen Beobachtungen mit: wo und mit wem unser Kind spricht, flüstert oder sich ohne Worte verständigt.",
        "Haben Sie Erfahrung mit selektivem Mutismus oder einen Platz auf Ihrer Warteliste? Bitte geben Sie uns auch bei einer Absage kurz Bescheid. Das hilft uns bei der weiteren Suche."
      ],
      gruss: "Mit freundlichen Grüßen",
      quellen: "Fachliche Grundlage u. a.: ASHA Practice Portal „Selective Mutism“; Hipolito et al. (2023), systematische Übersicht zu Interventionen bei selektivem Mutismus; Leitlinien des Interdisziplinären Mutismus-Forums."
    },

    steckbrief: {
      titel: "Steckbrief für Therapie und Ärztin",
      text: "Fasst zusammen, was ihr beobachtet und was das Kind auf dieser Seite selbst gezeigt hat. Das spart beim Erstgespräch Zeit, gerade wenn das Kind dort noch nicht spricht. Alle Felder sind freiwillig.",
      felder: [
        ["wgSprichtMit", "Spricht mit …", "z. B. Eltern, Bruder, Oma – zu Hause, im Auto"],
        ["wgFluestert", "Flüstert oder spricht leise mit …", "z. B. beste Freundin, nur wenn niemand zuhört"],
        ["wgZeigt", "Verständigt sich ohne Worte (nicken, zeigen, schreiben) mit …", "z. B. Klassenlehrerin, Trainer"],
        ["wgStill", "Bleibt ganz still bei …", "z. B. Ärztinnen, Verkäufer, vor der Klasse"],
        ["wgSeit", "Seit wann fällt es auf?", "z. B. seit dem Kita-Start mit 3 Jahren"],
        ["wgHilft", "Was hilft?", "z. B. Wahlfragen, vertraute Person dabei, Zeit"],
        ["wgSchwer", "Was ist besonders schwer?", "z. B. Toilette in der Schule, Telefonieren"],
        ["wgBisher", "Bisherige Hilfe", "z. B. Diagnostik im SPZ, Logopädie, Absprachen mit der Schule"]
      ],
      ausSeite: "Aus „Sokrates' Teich“",
      ausSeiteText: "Vom Kind selbst gewählt oder eingetragen – Gesprächsanlässe, keine Messwerte.",
      mutSchatz: "Mutige Momente im Mut-Schatz",
      mutSteine: "Geschaffte Mut-Steine",
      keineSteine: "noch keine",
      koerper: "Körper-Notizen (wo die Alarmanlage gespürt wird)",
      alarm: "Laute Alarmanlage (Alarmanlagen-Detektiv)",
      hilfen: "Häufig gewählte Hilfen (Alarmzentrale)",
      karte: "Stimmen-Karte",
      nichts: "–",
      drucken: "Steckbrief drucken",
      druckTitel: "Steckbrief: selektiver Mutismus",
      druckUnter: "Von den Eltern ausgefüllt. Zum Erstgespräch mitbringen."
    }
  },

  /* ---------- Navigation: Rückweg je nach Bereich ---------- */
  navi: {
    teich: "← Zum Teich",
    spiele: "← Zu den Spielen",
    erwachsene: "← Für Erwachsene",
    weiter: {
      erwachsene: { bild: "i-buch", titel: "Für Erwachsene", unter: "Wissen, Einstellungen, Material für die Schule" },
      lehrkraefte: { bild: "i-tafel", titel: "Für Lehrkräfte", unter: "Infoblatt und Erklär-Karten zum Ausdrucken" },
      wegweiser: { bild: "i-hand", titel: "Hilfe finden: der Wegweiser", unter: "Wege zur Therapie, Liste für die Suche, Brief an Praxen" },
      "selbst-tun": { bild: "i-haus", titel: "Was ihr selbst tun könnt", unter: "Bausteine aus der Therapie für den Alltag" },
      "stimmen-karte": { bild: "i-ort", titel: "Meine Stimmen-Karte", unter: "Wo ist deine Stimme schon zu Hause?" },
      "mut-steine": { bild: "i-steine", titel: "Mut-Steine", unter: "Kleine mutige Schritte" },
      teich: { bild: "i-frosch", titel: "Dein Teich", unter: "Hier wohnen deine Schätze" },
      spiele: { bild: "i-spiel", titel: "Spiele", unter: "Noch etwas spielen?" },
      "spiel-werkstatt": { bild: "i-stern", titel: "In die Werkstatt", unter: "Gestalte etwas Eigenes für deinen Teich" }
    }
  },

  /* ---------- Bereiche auf der Spiele-Seite ---------- */
  spielGruppen: [
    { id: "klein", titel: "Kleine Spiele", unter: "Kurz, ruhig und ohne Verlieren" },
    { id: "knobeln", titel: "Knobeln", unter: "Rätsel, Codes und Wege" },
    { id: "abenteuer", titel: "Abenteuer", unter: "Größere Spiele zum Entdecken. Du kannst jederzeit aufhören und später weitermachen." },
    { id: "zuzweit", titel: "Zu zweit", unter: "Für dich und eine zweite Person. Wie ihr euch Hinweise gebt, ist egal: zeigen, malen, schreiben oder sagen." },
    { id: "gestalten", titel: "Selber gestalten", unter: "Deine Ideen haben hier Platz. Es gibt keine Aufgabe." }
  ],
  knobeln: [
    { id: "spiel-raetselbuch", name: "Teich-Rätselbuch",   unter: "Jeden Tag drei neue Rätsel",      bild: "i-buch" },
    { id: "spiel-code",        name: "Geheime Zeichen",     unter: "Botschaften entschlüsseln",       bild: "i-schluessel" },
    { id: "spiel-weg",         name: "Über den großen Teich", unter: "Plane deinen Weg",             bild: "i-steine" },
    { id: "spiel-werwarwo",    name: "Wer war wo?",         unter: "Ein Logik-Gitter für Profis",     bild: "i-lupe" },
    { id: "spiel-bruecke",     name: "Teich-Ingenieur",     unter: "Bau eine Brücke, die hält",       bild: "i-bruecke" },
    { id: "spiel-licht",       name: "Lichtzeichen im Schilf", unter: "Funkels Lichtsprache lernen",  bild: "i-gluehwurm" }
  ],
  zuzweit: [
    { id: "spiel-funkelpost",  name: "Funkelpost",          unter: "Zwei geheime Briefhälften – nur zusammen lösbar", bild: "i-karte" }
  ],
  mehrKlein: [
    { id: "spiel-gefuehle", name: "Wer fühlt was?", unter: "Beobachten und Möglichkeiten entdecken", bild: "i-nichtgut" }
  ],
  mehrAbenteuer: [
    { id: "spiel-teichfest", name: "Das Teichfest", unter: "Du entscheidest, wie es weitergeht", bild: "i-laterne" }
  ],
  gestalten: [
    { id: "spiel-werkstatt", name: "Sokrates’ Werkstatt", unter: "Eigene Dinge für deinen Teich gestalten", bild: "i-stern" },
    { id: "spiel-comic",     name: "Comic-Werkstatt",     unter: "Dein eigener Teich-Comic",        bild: "i-stift" }
  ],

  /* ---------- Zu zweit: Funkelpost ---------- */
  funkelpost: {
    intro: [
      "Funkel bringt Post! Aber jeder Brief ist in zwei Hälften geteilt.",
      "Eine Person bekommt die blaue Hälfte, die andere die gelbe. Jede Hälfte ist geheim.",
      "Nur wenn ihr eure Hinweise zusammenlegt, findet ihr die Lösung. Wie ihr sie euch verratet, ist egal: zeigen, malen, aufschreiben oder sagen."
    ],
    waehle: "Welchen Brief wollt ihr öffnen?",
    alleGeloest: "Alle Briefe gelöst! Ihr könnt jeden noch einmal spielen – tauscht doch mal die Farben.",
    spieler: {
      blau: { name: "Blau", adj: "blauen", bild: "i-seerose" },
      gelb: { name: "Gelb", adj: "gelben", bild: "i-stern" }
    },
    karteVon: "Briefhälfte für {name}",
    geheim: "Geheim!",
    schautAllein: "Jetzt schaut nur {name}.",
    wegschauen: "{andere}, bitte kurz wegschauen.",
    aufdecken: "Ich bin {name}: aufdecken",
    verdecken: "Gemerkt? Karte verdecken",
    spaeter: "Keine Sorge: Ihr könnt eure Karte später noch einmal ansehen.",
    brettTipp: "Verratet euch eure Hinweise. Streicht durch, was nicht sein kann. Dann tippt auf „Hier!“.",
    nochmalAnsehen: "{name}: Karte ansehen",
    nurFuer: "Nur für {name}",
    durchstreichen: "{name} durchstreichen",
    hier: "Hier!",
    hierLabel: "Hier ist es: {name}",
    falschEine: "{name} kann es nicht sein. Auf der {adj} Karte steht ein Hinweis dazu.",
    falschBeide: "{name} kann es nicht sein. Dafür braucht ihr beide Karten zusammen.",
    geschafft: "Gelöst – zusammen!",
    zusammen: "So haben eure Hälften zusammengepasst:",
    andere: "Anderen Brief öffnen",
    drucken: "Diesen Brief zum Ausdrucken",
    druckTitel: "Funkelpost: {titel}",
    druckHinweis: "An der Linie durchschneiden. Jede Person bekommt eine Hälfte und hält sie geheim. Die Orte in der Mitte dürfen beide sehen.",
    schnitt: "✂ hier durchschneiden",
    briefe: [
      { id: "ball", titel: "Der versteckte Ball", frage: "Wo hat Quaki seinen Ball versteckt?",
        orte: [["steg", "Bootssteg", "i-boot"], ["schilf", "Schilf", "i-schilf"], ["wiese", "Blumenwiese", "i-blume"], ["pilz", "Pilzwald", "i-pilz"]],
        loesung: "schilf",
        blau: [{ text: "Der Ball ist nicht am Bootssteg.", nicht: ["steg"] }, { text: "Der Ball ist nicht im Pilzwald.", nicht: ["pilz"] }],
        gelb: [{ text: "Der Ball ist nicht auf der Blumenwiese.", nicht: ["wiese"] }, { text: "Quaki sagt: Es ist ein super Versteck!", nicht: [] }],
        ende: "Im Schilf! Quaki freut sich – und wirft den Ball gleich wieder weg." },
      { id: "funkel", titel: "Wo schläft Funkel?", frage: "Wo schläft Funkel heute?",
        orte: [["steg", "Bootssteg", "i-boot"], ["schilf", "Schilf", "i-schilf"], ["wiese", "Blumenwiese", "i-blume"], ["pilz", "Pilzwald", "i-pilz"]],
        loesung: "steg",
        blau: [{ text: "Funkel schläft beim Frosch.", nicht: [] }, { text: "Funkel schläft nicht im Schilf.", nicht: ["schilf"] }],
        gelb: [{ text: "Der Frosch war heute nur an zwei Orten: am Bootssteg und im Schilf.", nicht: [] }, { text: "Die Ente schläft auf der Blumenwiese.", nicht: [] }],
        ende: "Am Bootssteg! Funkel kuschelt sich neben Quaki und leuchtet ganz leise." },
      { id: "schal", titel: "Der rote Schal", frage: "Wo hat Sokrates seinen roten Schal verloren?",
        orte: [["steg", "Bootssteg", "i-boot"], ["wiese", "Blumenwiese", "i-blume"], ["pilz", "Pilzwald", "i-pilz"], ["muschel", "Muschelbank", "i-muschel"], ["seerose", "Seerosenfeld", "i-seerose"]],
        loesung: "muschel",
        blau: [{ text: "Der Schal liegt dort, wo die Schnecke heute war.", nicht: [] }, { text: "Im Pilzwald liegt er nicht.", nicht: ["pilz"] }],
        gelb: [{ text: "Die Schnecke war heute im Pilzwald, auf der Blumenwiese und auf der Muschelbank.", nicht: [] }, { text: "Auf der Blumenwiese hat Quaki schon alles abgesucht. Da ist nichts.", nicht: ["wiese"] }],
        ende: "Auf der Muschelbank! Die Schnecke hat gut auf den Schal aufgepasst." },
      { id: "brief", titel: "Wer hat den Brief?", frage: "Wer hat Sokrates’ Brief?",
        orte: [["frosch", "Quaki, der Frosch", "i-frosch"], ["ente", "Die Ente", "i-ente"], ["fisch", "Der Fisch", "i-fisch"], ["schnecke", "Die Schnecke", "i-schnecke"], ["schmetterling", "Der Schmetterling", "i-schmetterling"], ["funkel", "Funkel", "i-gluehwurm"]],
        loesung: "schmetterling",
        blau: [{ text: "Wer den Brief hat, kann fliegen.", nicht: ["frosch", "fisch", "schnecke"] }, { text: "Funkel war es nicht.", nicht: ["funkel"] }],
        gelb: [{ text: "Die Ente hat heute keinen Brief gesehen.", nicht: ["ente"] }, { text: "Der Fisch hat nasse Flossen.", nicht: [] }],
        ende: "Der Schmetterling! Er hat den Brief nur kurz als Sonnenschirm benutzt." },
      { id: "lampe", titel: "Funkels Lampe", frage: "Wo liegt Funkels kleine Lampe?",
        orte: [["steg", "Bootssteg", "i-boot"], ["schilf", "Schilf", "i-schilf"], ["wiese", "Blumenwiese", "i-blume"], ["pilz", "Pilzwald", "i-pilz"], ["muschel", "Muschelbank", "i-muschel"], ["seerose", "Seerosenfeld", "i-seerose"]],
        loesung: "wiese",
        blau: [{ text: "Die Lampe liegt bei dem Tier, das sein Haus auf dem Rücken trägt.", nicht: [] }, { text: "Neben der Lampe wachsen keine Pilze.", nicht: ["pilz"] }],
        gelb: [{ text: "Die Schnecke wohnt im Pilzwald. Ihre Schwester wohnt auf der Blumenwiese.", nicht: [] }, { text: "Der Fisch schwimmt beim Seerosenfeld.", nicht: [] }],
        ende: "Auf der Blumenwiese, bei der Schnecken-Schwester! Sie hat die Lampe als Nachtlicht benutzt." },
      { id: "club", titel: "Der Geheimclub", frage: "Wo trifft sich heute der Geheimclub?",
        orte: [["steg", "Bootssteg", "i-boot"], ["schilf", "Schilf", "i-schilf"], ["wiese", "Blumenwiese", "i-blume"], ["pilz", "Pilzwald", "i-pilz"], ["muschel", "Muschelbank", "i-muschel"], ["seerose", "Seerosenfeld", "i-seerose"]],
        loesung: "steg",
        blau: [{ text: "Der Club trifft sich dort, wo Quaki nie hingeht.", nicht: [] }, { text: "Im Pilzwald ist es dafür zu dunkel.", nicht: ["pilz"] }],
        gelb: [{ text: "Quaki, der Frosch, geht jeden Tag zum Schilf, zum Seerosenfeld und zur Muschelbank.", nicht: [] }, { text: "Auf der Blumenwiese ist es abends zu windig.", nicht: ["wiese"] }],
        ende: "Am Bootssteg! Das Passwort für den Club: zweimal kurz blinken. Frag mal Funkel, was das heißt." }
    ]
  },

  /* ---------- Knobeln: Wer war wo? ---------- */
  werwarwo: {
    intro: [
      "Hier brauchst du deinen Detektiv-Kopf.",
      "Lies die Hinweise. Trag im Gitter ein, was nicht sein kann (✗) und was sein muss (✓).",
      "Tipp auf ein Feld: einmal für ✗, zweimal für ✓, dreimal ist es wieder leer."
    ],
    waehle: "Such dir ein Rätsel aus. Sie werden immer kniffliger.",
    alleGeloest: "Alle Rätsel gelöst! Du denkst wie eine echte Detektivin oder ein echter Detektiv.",
    hinweiseTitel: "Die Hinweise",
    abhaken: "Hinweis {nr} abhaken",
    gitterTitel: "Dein Gitter",
    gitterInfo: "Jede Figur war an genau einem Ort. An jedem Ort war genau eine Figur.",
    helfer: "Kreuze automatisch setzen",
    helferInfo: "Wenn du ein ✓ setzt, kommen in dieselbe Reihe und Spalte automatisch ✗.",
    pruefen: "Stimmt alles bis jetzt?",
    tipp: "Tipp, bitte",
    leeren: "Gitter leeren",
    alle: "Alle Rätsel",
    allesGut: "Alles, was du eingetragen hast, stimmt! Weiter so.",
    nochNichts: "Trag erst etwas ein. Dann schaue ich nach.",
    fehler1: "Ein Feld passt noch nicht zu den Hinweisen. Es ist rot umrandet.",
    fehlerN: "{anzahl} Felder passen noch nicht zu den Hinweisen. Sie sind rot umrandet.",
    tippText: "Tipp: {wer} war {wo}.",
    zelle: { leer: "leer", nein: "war nicht dort", ja: "war dort", auto: "kann nicht sein" },
    wasser: "am Wasser",
    weg: "Die Orte liegen an einem Weg – genau in dieser Reihenfolge:",
    geschafft: "Rätsel gelöst!",
    loesung: "So war es:",
    naechstes: "Nächstes Rätsel →",
    figuren: {
      sokrates: ["Sokrates", "sokrates-1", "Sokrates"], quaki: ["Quaki", "i-frosch", "Quaki"], ente: ["Ente", "i-ente", "Die Ente"],
      schnecke: ["Schnecke", "i-schnecke", "Die Schnecke"], funkel: ["Funkel", "i-gluehwurm", "Funkel"], fisch: ["Fisch", "i-fisch", "Der Fisch"],
      schmetterling: ["Schmetterling", "i-schmetterling", "Der Schmetterling"]
    },
    orte: {
      steg: ["Bootssteg", "i-boot", "am Bootssteg", true], schilf: ["Schilf", "i-schilf", "im Schilf", true],
      wiese: ["Wiese", "i-blume", "auf der Wiese", false], pilz: ["Pilzwald", "i-pilz", "im Pilzwald", false],
      seerose: ["Seerose", "i-seerose", "auf der Seerose", true], huette: ["Hütte", "i-haus", "in der Hütte", false],
      markt: ["Markt", "i-broetchen", "auf dem Markt", false], schule: ["Schule", "i-tafel", "in der Schule", false]
    },
    raetsel: [
      { id: "picknick", titel: "Das Picknick", frage: "Wer hat wo gepicknickt?",
        figuren: ["sokrates", "quaki", "ente"], orte: ["steg", "schilf", "wiese"],
        hinweise: [
          { text: "Quaki war nicht auf der Wiese.", logik: [["nicht", "quaki", "wiese"]] },
          { text: "Die Ente war am Bootssteg.", logik: [["ist", "ente", "steg"]] }
        ],
        loesung: { ente: "steg", quaki: "schilf", sokrates: "wiese" } },
      { id: "schlafen", titel: "Gute Nacht!", frage: "Wer hat wo geschlafen?",
        figuren: ["sokrates", "schnecke", "funkel"], orte: ["pilz", "seerose", "huette"],
        hinweise: [
          { text: "Funkel schlief weder im Pilzwald noch auf der Seerose.", logik: [["nicht", "funkel", "pilz"], ["nicht", "funkel", "seerose"]] },
          { text: "Die Schnecke kann nicht schwimmen. Die Seerose liegt mitten im Teich.", logik: [["nicht", "schnecke", "seerose"]] }
        ],
        loesung: { funkel: "huette", schnecke: "pilz", sokrates: "seerose" } },
      { id: "schultag", titel: "Ein Tag am Teich", frage: "Wer war heute Vormittag wo?",
        figuren: ["sokrates", "quaki", "ente", "schnecke"], orte: ["steg", "markt", "schule", "schilf"],
        hinweise: [
          { text: "Sokrates war nicht am Bootssteg und nicht im Schilf.", logik: [["nicht", "sokrates", "steg"], ["nicht", "sokrates", "schilf"]] },
          { text: "Die Ente war dort, wo kein Wasser ist.", logik: [["oder", "ente", ["markt", "schule"]]] },
          { text: "Die Schnecke war weder am Bootssteg noch in der Schule.", logik: [["nicht", "schnecke", "steg"], ["nicht", "schnecke", "schule"]] },
          { text: "Die Ente hat heute nichts gelernt. In der Schule lernt man aber immer etwas.", logik: [["nicht", "ente", "schule"]] }
        ],
        loesung: { ente: "markt", sokrates: "schule", schnecke: "schilf", quaki: "steg" } },
      { id: "verstecken", titel: "Verstecken spielen", frage: "Wer hat sich wo versteckt?",
        figuren: ["quaki", "funkel", "fisch", "schmetterling"], orte: ["seerose", "steg", "wiese", "pilz"],
        hinweise: [
          { text: "Der Fisch hat sich im Wasser versteckt.", logik: [["oder", "fisch", ["seerose", "steg"]]] },
          { text: "Der Schmetterling mag Blüten. Er war auf der Wiese oder auf der Seerose.", logik: [["oder", "schmetterling", ["wiese", "seerose"]]] },
          { text: "Funkel war auf dem Land, nicht am Wasser.", logik: [["oder", "funkel", ["wiese", "pilz"]]] },
          { text: "Funkel leuchtet. Im dunklen Pilzwald hätte man Funkel sofort entdeckt. Deshalb war Funkel nicht dort.", logik: [["nicht", "funkel", "pilz"]] }
        ],
        loesung: { funkel: "wiese", schmetterling: "seerose", fisch: "steg", quaki: "pilz" } },
      { id: "geschenke", titel: "Geschenke fürs Teichfest", frage: "Wer hat wo ein Geschenk versteckt?",
        figuren: ["sokrates", "quaki", "ente", "funkel"], orte: ["markt", "schule", "steg", "schilf"],
        hinweise: [
          { text: "Quaki und die Ente waren beide am Wasser.", logik: [["oder", "quaki", ["steg", "schilf"]], ["oder", "ente", ["steg", "schilf"]]] },
          { text: "Sokrates war nicht in der Schule.", logik: [["nicht", "sokrates", "schule"]] },
          { text: "Die Ente war nicht im Schilf. Dort kitzelt es sie immer am Bauch.", logik: [["nicht", "ente", "schilf"]] }
        ],
        loesung: { ente: "steg", quaki: "schilf", sokrates: "markt", funkel: "schule" } },
      { id: "spaziergang", titel: "Der Abendspaziergang", frage: "Wer stand wo am Weg?", weg: true,
        figuren: ["sokrates", "schnecke", "funkel", "quaki"], orte: ["steg", "schilf", "wiese", "pilz"],
        hinweise: [
          { text: "Die Schnecke war an einem Ende des Weges.", logik: [["oder", "schnecke", ["steg", "pilz"]]] },
          { text: "Funkel war direkt neben der Schnecke.", logik: [["neben", "funkel", "schnecke"]] },
          { text: "Quaki war am Wasser.", logik: [["oder", "quaki", ["steg", "schilf"]]] },
          { text: "Sokrates stand nicht neben Funkel.", logik: [["nichtNeben", "sokrates", "funkel"]] }
        ],
        loesung: { schnecke: "pilz", funkel: "wiese", sokrates: "steg", quaki: "schilf" } },
      { id: "grosses", titel: "Das große Teich-Rätsel", frage: "Wer war wo am langen Weg?", weg: true,
        figuren: ["sokrates", "quaki", "ente", "schnecke", "funkel"], orte: ["markt", "schule", "wiese", "schilf", "steg"],
        hinweise: [
          { text: "Funkel war ganz am Anfang oder ganz am Ende des Weges.", logik: [["oder", "funkel", ["markt", "steg"]]] },
          { text: "Quaki war am Wasser.", logik: [["oder", "quaki", ["schilf", "steg"]]] },
          { text: "Die Ente war direkt neben Quaki.", logik: [["neben", "ente", "quaki"]] },
          { text: "Sokrates war weder in der Schule noch auf der Wiese.", logik: [["nicht", "sokrates", "schule"], ["nicht", "sokrates", "wiese"]] },
          { text: "Funkel war nicht neben Quaki.", logik: [["nichtNeben", "funkel", "quaki"]] }
        ],
        loesung: { funkel: "markt", schnecke: "schule", ente: "wiese", quaki: "schilf", sokrates: "steg" } }
    ]
  },

  /* ---------- Knobeln: Teich-Ingenieur ---------- */
  bruecke: {
    intro: [
      "Ich will über das Wasser. Baust du mir eine Brücke?",
      "Wähl unten ein Bauteil. Dann tipp auf einen Punkt im Bild. Bretter und Seile reichen von dort nach rechts.",
      "Wenn du fertig bist: Probefahrt! Dann sehen wir, ob alles hält."
    ],
    waehle: "Such dir eine Baustelle aus.",
    alleGeschafft: "Alle Brücken stehen! Du bist eine echte Teich-Ingenieurin oder ein echter Teich-Ingenieur.",
    regelnTitel: "So hält eine Brücke",
    regeln: [
      ["i-steine", "Ein Brett braucht an beiden Enden eine Stütze: Ufer, Insel oder Stein."],
      ["i-regen", "Steine passen nur ins flache Wasser. Im tiefen Wasser gehen sie unter."],
      ["i-schilf", "Das Seil braucht an beiden Enden einen festen Pfosten: am Ufer oder auf einer Insel."]
    ],
    teile: {
      kurz: { name: "Kurzes Brett", laenge: 2, info: "reicht 2 Felder weit" },
      lang: { name: "Langes Brett", laenge: 3, info: "reicht 3 Felder weit" },
      seil: { name: "Seilbrücke", laenge: 4, info: "reicht 4 Felder weit" },
      stein: { name: "Stein", info: "für flaches Wasser" }
    },
    uebrig: "noch {anzahl}",
    punkt: "Punkt {nr}",
    punktArt: { L: "Ufer", I: "Insel", s: "flaches Wasser", t: "tiefes Wasser" },
    mitStein: "mit Stein",
    erstWaehlen: "Wähl zuerst unten ein Bauteil.",
    keinsMehr: "Davon hast du keins mehr.",
    zuTief: "Hier ist das Wasser zu tief. Der Stein würde untergehen.",
    keinWasser: "Hier ist kein Wasser. Da braucht man keinen Stein.",
    zuWeit: "So weit reicht das Teil nicht. Es würde über das Ufer hinausragen.",
    schonBelegt: "Hier liegt schon etwas.",
    gebautTitel: "Gebaut",
    nochNichts: "Noch nichts gebaut.",
    vonBis: "{name} von Punkt {von} bis {bis}",
    steinBei: "Stein bei Punkt {nr}",
    abbauen: "abbauen",
    allesAbbauen: "Alles abbauen",
    probefahrt: "Probefahrt!",
    wischen: "Wisch über das Bild, um die ganze Baustelle zu sehen.",
    nochmalBauen: "Weiterbauen",
    alle: "Alle Baustellen",
    wer: { sokrates: "Sokrates", schnecke: "Die Schnecke", quaki: "Quaki" },
    werKommt: "Diesmal wollen hinüber:",
    fehler: {
      luecke: "Platsch! Bei Punkt {nr} fehlt ein Stück Weg.",
      brettEnde: "Platsch! Das Brett bei Punkt {nr} hat am anderen Ende keine Stütze.",
      seilPfosten: "Das Seil bei Punkt {nr} braucht an beiden Enden einen festen Pfosten: am Ufer oder auf einer Insel.",
      schneckeSeil: "Die Schnecke traut sich nicht auf das wackelige Seil. Sie braucht feste Bretter."
    },
    hinueber: "{wer} ist drüben!",
    geschafft: "Die Brücke hält!",
    teileGebraucht: "Du hast {anzahl} Teile gebraucht.",
    profi: "Profi-Stern: Mit weniger Teilen geht es nicht!",
    profiTipp: "Profi-Rätsel: Es geht sogar mit {anzahl} Teilen. Findest du den Weg?",
    naechste: "Nächste Baustelle →",
    level: [
      { id: "bach", titel: "Der kleine Bach", punkte: "LssssL", wanderer: ["sokrates"], teile: { kurz: 1, lang: 1, stein: 1 },
        text: "Ein kleiner Bach. Das Wasser ist überall flach." },
      { id: "insel", titel: "Die Felsen-Insel", punkte: "LsssIssL", wanderer: ["sokrates"], teile: { kurz: 2, lang: 1, stein: 1 },
        text: "In der Mitte liegt eine Felsen-Insel. Sie kann ein Brett tragen." },
      { id: "tief", titel: "Tiefes Wasser", punkte: "LtttIsL", wanderer: ["sokrates"], teile: { kurz: 1, lang: 1, seil: 1 },
        text: "Vorne ist das Wasser sehr tief. Hier hilft nur ein Seil." },
      { id: "schnecke", titel: "Die Schnecke kommt mit", punkte: "LstsIsssL", wanderer: ["sokrates", "schnecke"], teile: { kurz: 1, lang: 2, seil: 1, stein: 2 },
        text: "Die Schnecke will auch hinüber. Auf ein wackeliges Seil traut sie sich nicht." },
      { id: "quaki", titel: "Quaki hüpft", punkte: "LsstsL", wanderer: ["quaki"], teile: { kurz: 1, stein: 3 },
        text: "Quaki kann hüpfen: von einem Stein auf den nächsten, wenn er direkt daneben liegt. Bretter mag er auch." },
      { id: "finale", titel: "Die große Brücke", punkte: "LsstsIttIsL", wanderer: ["sokrates", "schnecke", "quaki"], teile: { kurz: 2, lang: 2, seil: 1, stein: 2 },
        text: "Alle wollen zum Teichfest auf die andere Seite. Teil dir die Bauteile gut ein!" }
    ]
  },

  /* ---------- Knobeln: Lichtzeichen im Schilf ---------- */
  licht: {
    intro: [
      "Nachts sprechen die Glühwürmchen mit Licht.",
      "Kurz blinken und lang leuchten – daraus wird eine ganze Sprache. Funkel bringt sie dir bei.",
      "Lass dir jedes Zeichen so oft zeigen, wie du willst. Es gibt keine Eile."
    ],
    funkel: "Funkel",
    laterne: "Deine Laterne",
    kurz: "kurz",
    lang: "lang",
    kurzKnopf: "Kurz",
    langKnopf: "Lang",
    loeschen: "Zurück",
    senden: "Senden",
    zeigen: "Noch mal zeigen",
    alsZeichen: "Als Zeichen zeigen",
    deineFolge: "Deine Lichtfolge",
    nochLeer: "Tipp auf Kurz oder Lang.",
    aufgabe: "Aufgabe {nr} von {von}",
    arten: {
      nach: "Funkel blinkt dir etwas vor. Mach es nach!",
      blind: "Jetzt ohne Hilfe: Schau genau hin und mach es nach.",
      lesen: "Was sagt Funkel? Schau im Lexikon nach.",
      schreiben: "Sag es Funkel mit Licht: „{text}“"
    },
    richtig: ["Genau so!", "Funkel blinkt vor Freude.", "Du sprichst Licht!"],
    falsch: "Fast! Schau noch mal genau hin.",
    falschLesen: "Hmm, das hat Funkel nicht gesagt. Lass es dir noch mal zeigen.",
    weiter: "Nächstes Lichtzeichen →",
    endeTitel: "Du sprichst Glühwürmchen!",
    ende: ["Du kannst jetzt alle Lichtzeichen lesen und senden.", "Unten kannst du Funkel frei Nachrichten schicken."],
    lexikonTitel: "Das Lichter-Lexikon",
    lexikonText: "Diese Zeichen kennt jedes Glühwürmchen am Teich. Die Geheime Zeichen-Schrift ist für den Tag – das Licht ist für die Nacht.",
    freiTitel: "Frei funken",
    freiText: "Schick Funkel ein Zeichen aus dem Lexikon. Funkel antwortet dir.",
    unbekannt: "Dieses Zeichen kenne ich noch nicht! Vielleicht erfindest du eine neue Bedeutung dafür?",
    drucken: "Lexikon zum Ausdrucken",
    druckTitel: "Das Lichter-Lexikon vom Teich",
    druckText: "Funkt mit einer Taschenlampe! Kurz: einmal kurz an und aus. Lang: so lange an, wie man langsam bis zwei zählt. Zwischen den Zeichen eine kleine Pause.",
    zeichen: [
      { id: "l",   text: "Ja!",                bild: "i-ja",      antwort: "l",  sagt: "Ja!" },
      { id: "kk",  text: "Hallo!",             bild: "i-winken",  antwort: "kk", sagt: "Hallo zurück!" },
      { id: "ll",  text: "Gute Nacht!",        bild: "i-stern",   antwort: "ll", sagt: "Gute Nacht! Schlaf gut." },
      { id: "kl",  text: "Komm mit!",          bild: "i-zeigen",  antwort: "l",  sagt: "Ja, ich komme mit!" },
      { id: "lk",  text: "Ich bin hier.",      bild: "i-ort",     antwort: "kk", sagt: "Da bist du ja! Hallo!" },
      { id: "kkk", text: "Alles gut?",         bild: "i-frage",   antwort: "l",  sagt: "Ja, alles gut. Danke, dass du fragst." },
      { id: "klk", text: "Danke!",             bild: "i-herz",    antwort: "kk", sagt: "Gern geschehen!" },
      { id: "lkl", text: "Ich brauche Hilfe.", bild: "i-hilfe",   antwort: "lk", sagt: "Ich bin hier! Hilfe holen ist mutig." },
      { id: "lkk", text: "Pause, bitte.",      bild: "i-stopp",   antwort: "l",  sagt: "Klar. Wir machen Pause." },
      { id: "kll", text: "Spielst du mit?",    bild: "i-ball",    antwort: "l",  sagt: "Ja! Fang mich doch!" }
    ],
    stufen: [
      ["nach", "kk"], ["nach", "kl"], ["nach", "klk"],
      ["blind", "lk"], ["blind", "kkk"], ["blind", "lkl"],
      ["lesen", "kk"], ["lesen", "klk"], ["lesen", "lkl"],
      ["schreiben", "ll"], ["schreiben", "kll"], ["schreiben", "lkk"]
    ]
  },

  /* ---------- Gestalten: Comic-Werkstatt ---------- */
  comic: {
    intro: [
      "Hier machst du deinen eigenen Teich-Comic. Drei Bilder, deine Geschichte.",
      "Wähl einen Ort, Figuren und Blasen. Figuren können sagen, denken, flüstern, eine Karte zeigen oder etwas zeigen.",
      "Alles darf lustig, leise oder ganz verrückt sein."
    ],
    titelFeld: "Titel von deinem Comic",
    titelBeispiel: "z. B. Quaki und die Muffins",
    bild: "Bild {nr}",
    bearbeiten: "Bild {nr} bearbeiten",
    ortTitel: "Wo spielt das Bild?",
    links: "Figur links",
    rechts: "Figur rechts",
    figurTitel: "Wer ist da?",
    stimmung: "Wie geht es Sokrates?",
    blaseTitel: "Was macht die Figur?",
    textFeld: "Text",
    gesteTitel: "Was zeigt die Figur?",
    vorlagenTitel: "Neu anfangen",
    vorlageFrage: "Womit willst du anfangen? Dein jetziger Comic wird ersetzt. Wenn du ihn behalten willst, leg ihn vorher ins Comic-Heft.",
    neu: "Neuer Comic",
    ablegen: "Ins Comic-Heft legen",
    abgelegt: "Liegt jetzt in deinem Comic-Heft!",
    drucken: "Drucken",
    heftTitel: "Mein Comic-Heft",
    heftLeer: "Noch leer. Leg deinen ersten Comic hinein!",
    oeffnen: "Öffnen",
    loeschen: "Löschen",
    loeschenFrage: "Diesen Comic wirklich löschen?",
    ohneTitel: "Mein Comic",
    voll: "Das Comic-Heft ist voll (20 Comics). Lösch einen alten, dann passt wieder einer hinein.",
    orte: [
      { id: "teich", name: "Teich", bild: "i-seerose" }, { id: "markt", name: "Markt", bild: "i-broetchen" },
      { id: "schule", name: "Schule", bild: "i-tafel" }, { id: "wiese", name: "Wiese", bild: "i-blume" },
      { id: "nacht", name: "Nacht", bild: "i-stern" }
    ],
    figuren: [
      { id: "", name: "Niemand", bild: "i-nein" }, { id: "sokrates", name: "Sokrates", bild: "sokrates-1" },
      { id: "quaki", name: "Quaki", bild: "i-frosch" }, { id: "ente", name: "Ente", bild: "i-ente" },
      { id: "schnecke", name: "Schnecke", bild: "i-schnecke" }, { id: "funkel", name: "Funkel", bild: "i-gluehwurm" },
      { id: "fisch", name: "Fisch", bild: "i-fisch" }
    ],
    stimmungen: [{ id: 1, name: "fröhlich" }, { id: 3, name: "unsicher" }, { id: 5, name: "im Panzer" }],
    blasen: [
      { id: "", name: "Nichts" }, { id: "sagt", name: "sagt" }, { id: "denkt", name: "denkt" },
      { id: "fluestert", name: "flüstert" }, { id: "karte", name: "zeigt eine Karte" }, { id: "zeigt", name: "zeigt etwas" }
    ],
    gesten: [
      { id: "i-zeigen", name: "Zeigen" }, { id: "i-winken", name: "Winken" }, { id: "i-nicken", name: "Nicken" },
      { id: "i-ja", name: "Ja" }, { id: "i-nein", name: "Nein" }, { id: "i-herz", name: "Herz" }, { id: "i-frage", name: "Frage" }
    ],
    vorlagen: [
      { id: "baecker", name: "Beim Bäcker", titel: "Kuchen ohne Worte", bilder: [
        { ort: "markt", links: { wer: "sokrates", lvl: 3, art: "denkt", text: "Ich will Kuchen …" }, rechts: { wer: "ente", art: "sagt", text: "Was möchtest du?" } },
        { ort: "markt", links: { wer: "sokrates", lvl: 3, art: "zeigt", geste: "i-zeigen" }, rechts: { wer: "ente", art: "sagt", text: "Erdbeer? Kommt sofort!" } },
        { ort: "markt", links: { wer: "sokrates", lvl: 1, art: "denkt", text: "Lecker! Geschafft!" }, rechts: { wer: "quaki", art: "fluestert", text: "Ich nehm drei Muffins." } }
      ] },
      { id: "schule", name: "Neu in der Schule", titel: "Der erste Tag", bilder: [
        { ort: "schule", links: { wer: "sokrates", lvl: 5, art: "denkt", text: "So viele Leute …" }, rechts: { wer: "schnecke", art: "sagt", text: "Ich bin auch neu." } },
        { ort: "schule", links: { wer: "sokrates", lvl: 3, art: "karte", text: "Ich bin Sokrates." }, rechts: { wer: "schnecke", art: "sagt", text: "Sitzen wir zusammen?" } },
        { ort: "wiese", links: { wer: "sokrates", lvl: 1, art: "zeigt", geste: "i-nicken" }, rechts: { wer: "schnecke", art: "denkt", text: "Ein neuer Freund!" } }
      ] },
      { id: "leer", name: "Leere Seiten", titel: "", bilder: [{ ort: "teich" }, { ort: "wiese" }, { ort: "nacht" }] }
    ]
  },

  /* ---------- Geheime Zeichen ---------- */
  code: {
    intro: [
      "Ich habe dir geheime Botschaften geschrieben!",
      "Jedes Zeichen steht für einen Buchstaben. Im Schlüssel siehst du, welcher es ist.",
      "Tipp im Schlüssel auf das passende Zeichen. Dann erscheint der Buchstabe."
    ],
    botschaft: "Botschaft {nr} von {von}",
    schluessel: "Der Schlüssel",
    falsch: "Schau genau: Form und Zeichen müssen gleich sein.",
    geloest: "Entschlüsselt!",
    weiter: "Nächste Botschaft →",
    botschaften: [
      ["MUT", "Genau! Mut hat viele Formen."],
      ["HALLO", "Hallo zurück! Ganz ohne Worte."],
      ["DU BIST TOLL", "Das meine ich ernst."],
      ["ZEIGEN ZAEHLT AUCH", "Zeigen ist eine echte Antwort."],
      ["LANGSAM IST AUCH MUTIG", "Schildkröten wissen das."],
      ["SOKRATES MAG DICH", "Und das bleibt so."]
    ],
    endeTitel: "Alle Botschaften entschlüsselt!",
    ende: ["Du bist jetzt eine echte Code-Knackerin oder ein echter Code-Knacker.", "Schreib doch selbst eine geheime Botschaft!"],
    eigenTitel: "Deine eigene Geheimbotschaft",
    eigenText: "Schreib eine Botschaft. Sie wird in geheime Zeichen verwandelt. Dann kannst du sie ausdrucken und jemandem geben, der sie mit dem Schlüssel entschlüsselt.",
    eigenFeld: "Deine Botschaft",
    eigenBeispiel: "z. B. Spielst du mit mir?",
    drucken: "Botschaft mit Schlüssel drucken",
    druckTitel: "Eine geheime Botschaft für dich",
    druckHinweis: "Jedes Zeichen ist ein Buchstabe. Der Schlüssel unten verrät, welcher."
  },

  /* ---------- Teich-Rätselbuch ---------- */
  raetselbuch: {
    intro: ["Such dir ein Rätsel aus.", "Auch ein Rätsel ist genug. Du kannst jederzeit aufhören.", "Jeden Tag gibt es neue. Probier in deinem Tempo."],
    heute: "Drei Rätsel zum Aussuchen ({datum})",
    auswahl: "Drei Rätsel zum Aussuchen",
    extra: "Ein Extra-Rätsel",
    extraKnopf: "Noch ein Rätsel, bitte!",
    titel: { sudoku: "Teich-Sudoku", rechnen: "Tier-Rechnung", reihe: "Zahlen-Reihe" },
    sudoku: "Jedes Tier darf in jeder Reihe, jeder Spalte und jedem Viererfeld nur einmal vorkommen. Tipp ein leeres Feld an, dann ein Tier.",
    sudokuDoppelt: "Hier kommt ein Tier doppelt vor. Die Felder sind markiert.",
    sudokuLeer: "Es sind noch Felder leer.",
    rechnen: "Jedes Tier steht für eine Zahl. Welche Zahl ist es?",
    reihe: "Welche Zahl kommt als Nächstes?",
    pruefen: "Prüfen",
    falsch: "Noch nicht. Probier es in Ruhe noch einmal.",
    richtig: "Richtig!",
    fertig: "Gelöst",
    alleHeute: "Alle Rätsel von heute gelöst! Morgen gibt es neue.",
    zaehler: "Gelöste Rätsel bisher: {anzahl}"
  },

  /* ---------- Über den großen Teich ---------- */
  weg: {
    intro: [
      "Ich will über den großen Teich zur Insel mit der Seerose.",
      "Manche Steine sind schwierig. Dafür brauche ich etwas aus meinem Rucksack.",
      "Pack zuerst den Rucksack. Dann tippst du auf den Stein, zu dem ich gehen soll."
    ],
    levelText: "Weg {nr} von {von}",
    packen: "Pack den Rucksack: {anzahl} von {von} Sachen",
    los: "Los geht's!",
    neu: "Rucksack neu packen",
    rucksack: "Im Rucksack:",
    leer: "leer",
    braucht: "Hier bräuchte ich: {was}. Pack den Rucksack neu oder nimm einen anderen Weg.",
    benutzt: "{was} hat geholfen!",
    angekommen: "Angekommen! Gut geplant.",
    weiter: "Nächster Weg →",
    zuWeit: "Ich gehe immer nur einen Stein weiter: nach oben, unten, links oder rechts.",
    endeTitel: "Alle Wege geschafft!",
    ende: ["Vorher planen hilft. Dann sind auch schwierige Steine machbar.", "Was würdest du in deinen echten Rucksack packen?"],
    // Feld: [Bild, Name, braucht Sache]
    felder: {
      w: ["i-herz", "Wackelstein", "freund"],
      n: ["i-wolke", "Nebel", "karte"],
      l: ["i-lautsprecher", "Lauter Stein", "pause"],
      f: ["i-frage", "Frage-Stein", "antwort"]
    },
    sachen: {
      freund: ["i-herz", "Freundin"],
      karte: ["i-ort", "Wegkarte"],
      pause: ["i-seerose", "Pause"],
      antwort: ["i-karte", "Antwort-Karte"]
    },
    erklaerung: {
      w: "Wackelsteine schaffe ich mit einer Freundin an meiner Seite.",
      n: "Im Nebel hilft die Wegkarte.",
      l: "Auf lauten Steinen hilft eine kleine Pause.",
      f: "Auf Frage-Steinen fragt mich jemand etwas. Mit der Antwort-Karte kann ich antworten."
    },
    // S = Start, Z = Ziel, o = Stein, . = Wasser, w/n/l/f = besondere Steine
    level: [
      { platz: 1, karte: ["Soo...", "..o...", "..wooZ"] },
      { platz: 2, karte: ["Sooo..", "...n..", ".ooooo", ".w...l", ".oooZo"] },
      { platz: 2, karte: ["Soofo.", "o...o.", "n...l.", "wooooZ"] },
      { platz: 2, karte: ["Sooo..", "f..w..", "o..oo.", "l...n.", "oooooZ"] },
      { platz: 3, karte: ["So.ooo", "of.o.n", "lo.w.o", "oooo.o", ".....Z"] }
    ]
  },

  /* ---------- Wer fühlt was? ---------- */
  gefuehleSpiel: {
    intro: ["Was sehen wir? Was vermuten wir?", "Gefühle können wir nicht sicher von außen erkennen.", "Oft gibt es mehrere Möglichkeiten."],
    bildZaehler: "Szene {nr} von {von}",
    beobachtungFrage: "Was sehen wir wirklich?",
    beobachtet: "Das sehen wir in der Szene.",
    vermutet: "Das ist eine Vermutung. Es könnte so sein.",
    frage: "Was könnte {wer} fühlen?",
    hilfeFrage: "Was könnte {wem} helfen?",
    vielleicht: "Vielleicht ist {wer} {gefuehl}.",
    unsicher: "Ich weiß es noch nicht",
    unsicherAntwort: "Das ist okay. Wir wissen noch nicht, wie es dem Tier geht.",
    gesehenTitel: "Das sehen wir",
    vermutungTitel: "Das vermuten wir",
    offenTitel: "Das wissen wir noch nicht",
    keineVermutung: "Noch keine Vermutung.",
    offen: "Wie sich {wer} wirklich fühlt, wissen wir noch nicht.",
    fragen: "Wir können freundlich fragen – auch mit einer Karte.",
    weiter: "Nächstes Bild →",
    fertig: "Fertig! →",
    proRunde: 5,
    endeTitel: "Gut beobachtet!",
    ende: ["Beobachten und Vermuten sind zwei verschiedene Dinge.", "Ein Zeichen kann zu mehreren Gefühlen passen.", "Freundlich fragen geht auch mit einer Karte."],
    // wer, wem, bild, Text, Auswahl möglicher Gefühle, Beobachtung, Vermutung, Hilfen [Text, Antwort]
    bilder: [
      { wer: "die Ente", wem: "der Ente", bild: "i-ente", text: "Erster Tag in der neuen Gruppe. Die Ente steht am Rand. Sie schaut auf den Boden. Ihre Flügel zittern ein bisschen.",
        auswahl: ["aufgeregt", "froh", "traurig", "stolz"], hinweis: "Die Ente steht am Rand. Ihre Flügel zittern.", vermutung: "Die Ente ist traurig.",
        hilfen: [["Mich neben sie stellen und lächeln", "Die Ente lächelt vorsichtig zurück."], ["Ihr eine Karte zeigen: „Spielst du mit?“", "Die Ente nickt. Sie kommt mit."], ["Sie in Ruhe ankommen lassen", "Nach einer Weile schaut die Ente sich neugierig um."]] },
      { wer: "der Frosch", wem: "dem Frosch", bild: "i-frosch", text: "Der Frosch ist beim Weitsprung am weitesten gesprungen. Er grinst und hüpft auf und ab.",
        auswahl: ["muede", "froh", "stolz", "traurig"], hinweis: "Der Frosch grinst und hüpft.", vermutung: "Der Frosch ist stolz.",
        hilfen: [["Ihm einen Daumen hoch zeigen", "Der Frosch zeigt den Daumen zurück."], ["Mit ihm zusammen hüpfen", "Jetzt hüpfen beide. Was für ein Spaß!"], ["Ihm einen Stern malen", "Der Frosch hängt den Stern an seine Seerose."]] },
      { wer: "der Fisch", wem: "dem Fisch", bild: "i-fisch", text: "Der Lieblingsstein des Fisches ist weg. Er schwimmt ganz langsam und schaut nach unten.",
        auswahl: ["traurig", "ueberrascht", "froh", "mutig"], hinweis: "Der Fisch schwimmt langsam und schaut nach unten.", vermutung: "Der Fisch ist traurig.",
        hilfen: [["Beim Suchen helfen", "Zusammen finden sie den Stein unter einem Blatt!"], ["Neben ihm schwimmen", "Der Fisch fühlt sich nicht mehr so allein."], ["Ihm einen neuen Stein schenken", "Der Fisch freut sich. Jetzt hat er zwei Lieblingssteine."]] },
      { wer: "die Schnecke", wem: "der Schnecke", bild: "i-schnecke", text: "Alle reden gleichzeitig ganz laut. Die Schnecke zieht sich in ihr Haus zurück.",
        auswahl: ["stolz", "aufgeregt", "froh", "muede"], hinweis: "Bei dem Lärm zieht sich die Schnecke zurück.", vermutung: "Die Schnecke ist müde.",
        hilfen: [["Mit ihr an einen ruhigen Platz gehen", "Dort kommt die Schnecke langsam wieder heraus."], ["Leiser sein und warten", "Die Schnecke streckt vorsichtig die Fühler raus."], ["Ihr die Ruhe-Ecke zeigen", "Die Schnecke atmet mit. Ein, aus."]] },
      { wer: "Sokrates", wem: "Sokrates", bild: "sokrates-1", text: "Sokrates hat sich getraut: Beim Bäcker hat er auf das Brötchen gezeigt, das er möchte.",
        auswahl: ["mutig", "traurig", "stolz", "muede"], hinweis: "Sokrates hat auf ein Brötchen gezeigt.", vermutung: "Sokrates ist stolz.",
        hilfen: [["Ihm sagen: „Das war mutig!“", "Sokrates strahlt."], ["Ein Mut-Steinchen ins Glas legen", "Klack! Das Glas ist wieder ein bisschen voller."], ["Zusammen das Brötchen essen", "Mmh. Mut macht hungrig."]] },
      { wer: "die Ente", wem: "der Ente", bild: "i-ente", text: "Die Ente öffnet die Tür. Alle Freunde sind da und rufen: „Überraschung! Alles Gute zum Geburtstag!“",
        auswahl: ["ueberrascht", "muede", "froh", "traurig"], hinweis: "Die Freunde rufen: „Überraschung!“", vermutung: "Die Ente ist froh.",
        hilfen: [["Ihr kurz Zeit zum Staunen lassen", "Die Ente atmet durch und lacht dann."], ["Ihr ein Geschenk geben", "Die Ente packt es sofort aus."], ["Ein Geburtstagslied singen oder summen", "Die Ente wippt im Takt."]] },
      { wer: "der Frosch", wem: "dem Frosch", bild: "i-frosch", text: "Nach dem langen Ausflug gähnt der Frosch. Seine Augen fallen fast zu.",
        auswahl: ["muede", "aufgeregt", "ruhig", "stolz"], hinweis: "Der Frosch gähnt. Seine Augen fallen fast zu.", vermutung: "Der Frosch ist müde.",
        hilfen: [["Ihm eine Decke bringen", "Der Frosch kuschelt sich ein."], ["Leise sein", "Der Frosch schläft lächelnd ein."], ["Gute Nacht winken", "Der Frosch winkt müde zurück."]] },
      { wer: "der Fisch", wem: "dem Fisch", bild: "i-fisch", text: "Der Fisch liegt im warmen Wasser in der Sonne. Seine Augen sind halb zu. Er lächelt.",
        auswahl: ["ruhig", "aufgeregt", "froh", "ueberrascht"], hinweis: "Der Fisch lächelt. Seine Augen sind halb zu.", vermutung: "Der Fisch ist ruhig.",
        hilfen: [["Dazulegen und mitentspannen", "Jetzt liegen beide in der Sonne. Herrlich."], ["Ihn in Ruhe lassen", "Der Fisch genießt die Ruhe."], ["Ihm später etwas erzählen", "Der Fisch freut sich schon darauf."]] }
    ]
  },

  /* ---------- Sokrates’ Werkstatt ---------- */
  werkstatt: {
    intro: ["Hier ist Platz für deine Ideen.", "Gestalte einen Lampion, ein Boot oder ein Schild.", "Es gibt keine Aufgabe und keine richtige Lösung."],
    formTitel: "Was möchtest du gestalten?",
    farbeTitel: "Welche Farbe?",
    musterTitel: "Welches Muster?",
    symbolTitel: "Welches Zeichen?",
    textTitel: "Worte auf deinem Schild (freiwillig)",
    textTipp: "Bis zu 24 Zeichen. Ein Schild ohne Worte geht auch.",
    vorschau: "Dein Entwurf",
    beschreibung: "{form}, {farbe}, {muster}, {symbol}",
    beschriftung: "Aufschrift: {text}",
    neu: "Etwas Neues gestalten",
    ablegen: "In die Schatzkiste legen",
    aendern: "Änderungen behalten",
    abgelegt: "Dein Werkstück liegt in der Schatzkiste.",
    geaendert: "Deine Änderungen sind gespeichert.",
    nurHier: "Im Moment klappt das Speichern nicht. Lass die Seite offen.",
    zumTeich: "In deinen Teich",
    eigene: "Deine Werkstücke",
    leer: "Hier ist Platz für deine Werkstücke.",
    bearbeiten: "Weitergestalten: {name}",
    imTeichBearbeiten: "In der Werkstatt ändern",
    formen: [{ id: "lampion", name: "Lampion" }, { id: "boot", name: "Boot" }, { id: "schild", name: "Schild" }],
    farben: [{ id: "moos", name: "Moosgrün", wert: "#A4C675" }, { id: "sonne", name: "Sonnengelb", wert: "#F2B544" }, { id: "wasser", name: "Wasserblau", wert: "#90C4CE" }, { id: "koralle", name: "Korallenrosa", wert: "#E6A28C" }],
    muster: [{ id: "ohne", name: "Ohne Muster" }, { id: "punkte", name: "Punkte" }, { id: "streifen", name: "Streifen" }],
    symbole: [{ id: "ohne", name: "Ohne Zeichen" }, { id: "stern", name: "Stern", bild: "i-stern" }, { id: "seerose", name: "Seerose", bild: "i-seerose" }, { id: "herz", name: "Herz", bild: "i-herz" }, { id: "frosch", name: "Frosch", bild: "i-frosch" }]
  },

  /* ---------- Das Teichfest (Entscheidungsgeschichte) ---------- */
  teichfest: {
    titel: "Das Teichfest",
    intro: "Du entscheidest, was Sokrates macht. Jeder Weg ist ein guter Weg.",
    enden: "Enden entdeckt: {anzahl} von {von}",
    nochmal: "Noch einmal von vorn",
    neuesEnde: "Ein neues Ende entdeckt!",
    jederWeg: "Jeder Weg war ein guter Weg.",
    // Bild: level = Sokrates-Pose, deko = Bilder in der Szene
    seiten: {
      start: { level: 2, deko: [["i-laterne", ""], ["i-broetchen", ""]], text: ["Heute ist Teichfest! Es gibt Lampions, Kuchen und Musik.", "Sokrates möchte hin. Aber es kribbelt ein bisschen im Bauch."],
        wahl: [["Mit Freundin Ente hingehen", "mitEnte"], ["Mit Papa hingehen", "mitPapa"], ["Erst mal von weitem schauen", "weitem"]] },
      mitEnte: { level: 1, deko: [["i-ente", "Ente"]], text: ["Die Ente holt Sokrates ab. Sie watschelt, er krabbelt.", "Zusammen ist der Weg gar nicht so lang."], wahl: [["Weiter zum Eingang", "eingang"]] },
      mitPapa: { level: 1, deko: [["i-haus", "Papa"]], text: ["Papa geht neben Sokrates her. Ganz langsam, im Schildkröten-Tempo.", "Das fühlt sich gut an."], wahl: [["Weiter zum Eingang", "eingang"]] },
      weitem: { level: 2, deko: [["i-laterne", ""], ["i-auge", ""]], text: ["Sokrates setzt sich auf einen Stein am Ufer und schaut zu.", "Die Lampions leuchten. Nach einer Weile kribbelt es weniger."],
        wahl: [["Jetzt näher rangehen", "eingang"], ["Heute nur von hier schauen", "endeWeitem"]] },
      eingang: { level: 3, lampe: 0.5, deko: [["i-gruppe", ""]], text: ["Am Eingang sind viele Tiere. Es ist laut.", "Sokrates' Alarmanlage piept ein bisschen."],
        wahl: [["Einen ruhigen Platz am Rand suchen", "rand"], ["Kurz atmen wie in der Ruhe-Ecke", "atmen"], ["Gleich zur Kuchen-Bude", "kuchen"]] },
      atmen: { level: 1, lampe: 0.1, deko: [["i-seerose", ""]], text: ["Ein … und aus. Ein … und aus.", "Der Panzer fühlt sich wieder gemütlich an. Die Alarmanlage wird leiser."],
        wahl: [["Zur Kuchen-Bude", "kuchen"], ["Zum Lampion-Basteln", "basteln"]] },
      rand: { level: 1, deko: [["i-blume", ""]], text: ["Am Rand ist es leiser. Von hier sieht Sokrates alles.", "Die Musik klingt von hier sogar schön."],
        wahl: [["Zum Lampion-Basteln", "basteln"], ["Zur Kuchen-Bude", "kuchen"], ["Hier bleiben bis zum Feuerwerk", "endeFeuerwerk"]] },
      kuchen: { level: 2, deko: [["i-broetchen", "Kuchen"]], text: ["An der Kuchen-Bude steht ein Igel. Er fragt freundlich: „Was möchtest du?“"],
        wahl: [["Auf den Erdbeerkuchen zeigen", "kuchenZeigen"], ["Eine Karte zeigen", "kuchenKarte"], ["Leise „Erdbeer“ sagen", "kuchenSagen"]] },
      kuchenZeigen: { level: 1, deko: [["i-zeigen", ""], ["i-broetchen", ""]], text: ["Sokrates zeigt auf den Erdbeerkuchen. Der Igel nickt und gibt ihm ein großes Stück.", "Zeigen hat geklappt!"],
        wahl: [["Zum Lampion-Basteln", "basteln"], ["Mit dem Kuchen ans Ufer setzen", "endeUfer"]] },
      kuchenKarte: { level: 1, deko: [["i-karte", ""], ["i-broetchen", ""]], text: ["Sokrates zeigt seine Karte. Der Igel liest und lächelt: „Kommt sofort!“", "Die Karte hat geklappt!"],
        wahl: [["Zum Lampion-Basteln", "basteln"], ["Mit dem Kuchen ans Ufer setzen", "endeUfer"]] },
      kuchenSagen: { level: 1, deko: [["i-fluestern", ""], ["i-broetchen", ""]], text: ["„Erdbeer“, sagt Sokrates ganz leise. Der Igel nickt und gibt ihm ein Stück.", "Das hat geklappt!"],
        wahl: [["Zum Lampion-Basteln", "basteln"], ["Mit dem Kuchen ans Ufer setzen", "endeUfer"]] },
      basteln: { level: 2, deko: [["i-laterne", ""], ["i-frosch", "?"]], text: ["Beim Lampion-Basteln sitzt ein Frosch, den Sokrates nicht kennt.", "Der Frosch sucht den Kleber. Er liegt direkt vor Sokrates."],
        wahl: [["Den Kleber zum Frosch schieben", "frosch"], ["Weiterbasteln und kurz lächeln", "froschLaecheln"]] },
      frosch: { level: 1, deko: [["i-frosch", ""], ["i-herz", ""]], text: ["Der Frosch strahlt. „Danke!“", "Ab jetzt reicht er Sokrates immer die Schere. Ohne viele Worte."], wahl: [["Weiter", "endeFreund"]] },
      froschLaecheln: { level: 1, deko: [["i-frosch", ""], ["i-laecheln", ""]], text: ["Der Frosch lächelt zurück.", "Am Ende halten beide stolz ihre Lampions hoch."], wahl: [["Weiter", "endeLampion"]] },
      endeWeitem: { ende: "Der stille Beobachter", level: 1, deko: [["i-laterne", ""], ["i-stern", ""]], text: ["Sokrates bleibt heute am Ufer. Von hier sieht er die Lampions über dem Wasser leuchten.", "Auch das ist ein schöner Abend. Vielleicht geht er nächstes Mal näher ran."] },
      endeFeuerwerk: { ende: "Das Feuerwerk", level: 1, deko: [["i-stern", ""], ["i-stern", ""], ["i-sonne", ""]], text: ["Bumm! Bunte Sterne leuchten über dem Teich.", "Vom ruhigen Platz am Rand sieht Sokrates das schönste Feuerwerk."] },
      endeUfer: { ende: "Kuchen am Ufer", level: 1, deko: [["i-broetchen", ""], ["i-seerose", ""]], text: ["Sokrates sitzt mit seinem Kuchen am Ufer. Die Musik klingt leise herüber.", "Was für ein leckerer Abend."] },
      endeFreund: { ende: "Ein neuer Freund", level: 1, deko: [["i-frosch", ""], ["i-herz", ""]], text: ["Der Frosch heißt Quaki. Er fragt, ob Sokrates morgen wieder an den Teich kommt.", "Sokrates nickt. Ein neuer Freund!"] },
      endeLampion: { ende: "Der leuchtende Lampion", level: 1, deko: [["i-laterne", ""], ["i-laterne", ""]], text: ["Auf dem Heimweg leuchtet Sokrates' Lampion.", "Er denkt: Heute war ich mutig. Ganz in meinem Tempo."] }
    }
  },

  /* ---------- Mein Körper: Wo spürst du die Alarmanlage? ---------- */
  koerper: {
    intro: [
      "Wenn meine Alarmanlage piept, merkt das auch mein Körper.",
      "Manchmal zwickt mein Bauch. Oder mein Kopf brummt.",
      "Das Weh ist echt. Und es ist nicht gefährlich.",
      "Wo spürst du es? Tipp auf die Stelle."
    ],
    frage: "Wo spürst du die Alarmanlage?",
    soFuehlt: "So kann es sich anfühlen:",
    warum: "Warum?",
    hilft: "Das kann helfen:",
    karteZeigen: "Als Karte zeigen",
    merken: "Für Mama oder Papa merken",
    gemerkt: "Gemerkt! Mama oder Papa sehen es unter „Für Erwachsene“.",
    erwachsene: "Wenn es oft oder sehr weh tut, zeig es Mama oder Papa – mit Worten, einer Karte oder einem Zeichen. Dann kann auch eine Ärztin oder ein Arzt nachschauen. Das ist gut so.",
    zurRuhe: "Zur Ruhe-Ecke",
    // id, Name, Karte (Bild, Text), Gefühl, Warum, Hilfen [Text, Link]
    stellen: [
      { id: "kopf", name: "Im Kopf", karte: ["i-kopfweh", "Ich habe Kopfweh."],
        fuehlt: ["Der Kopf tut weh oder brummt.", "Mir ist schwindelig.", "Ich kann nicht gut denken."],
        warum: "Die Alarmanlage macht die Muskeln fest – auch im Nacken und am Kopf. Dann kann der Kopf wehtun.",
        hilft: [["Schultern hoch zu den Ohren – und fallen lassen.", null], ["Einen Schluck Wasser trinken.", null], ["Langsam atmen in der Ruhe-Ecke.", "ruhe-ecke"]] },
      { id: "hals", name: "Im Hals", karte: ["sokrates-4", "Meine Stimme versteckt sich gerade. Ich höre dir aber zu."],
        fuehlt: ["Ein Kloß im Hals.", "Die Stimme steckt fest.", "Schlucken fühlt sich komisch an."],
        warum: "Die Alarmanlage hält die Stimme fest. Das ist nicht deine Schuld.",
        hilft: [["Eine Karte zeigen statt sprechen.", "karten"], ["Einen Schluck Wasser trinken.", null], ["Ganz langsam ausatmen.", "ruhe-ecke"]] },
      { id: "herz", name: "Im Herz", karte: ["i-nichtgut", "Mir geht es nicht gut."],
        fuehlt: ["Das Herz klopft ganz schnell.", "Ich atme schnell.", "Die Brust fühlt sich eng an."],
        warum: "Die Alarmanlage macht den Körper bereit zum Wegrennen. Dafür klopft das Herz schneller. Das ist nicht gefährlich.",
        hilft: [["Eine Hand auf den Bauch legen. Atmen, bis der Bauch rund wird wie ein Ballon.", "ruhe-ecke"], ["Langsam bis fünf zählen.", null]] },
      { id: "bauch", name: "Im Bauch", karte: ["i-bauchweh", "Ich habe Bauchweh."],
        fuehlt: ["Bauchweh oder Kribbeln im Bauch.", "Mir ist übel.", "Ich muss dringend aufs Klo.", "Ich habe keinen Hunger."],
        warum: "Bauch und Kopf sind eng verbunden. Wenn die Alarmanlage piept, merkt das der Bauch sofort.",
        hilft: [["Eine warme Hand oder eine Wärmflasche auf den Bauch.", null], ["Bauch-Ballon-Atmen.", "ruhe-ecke"], ["Die Klo-Karte zeigen.", "karten"]] },
      { id: "haende", name: "In den Händen", karte: ["i-nichtgut", "Mir geht es nicht gut."],
        fuehlt: ["Die Hände zittern.", "Die Hände schwitzen oder sind kalt."],
        warum: "Die Alarmanlage schickt viel Kraft in Arme und Beine. Dann zittern die Hände manchmal.",
        hilft: [["Fäuste fest machen – und wieder locker lassen.", "ruhe-ecke"], ["Die Hände aneinander warm reiben.", null]] },
      { id: "beine", name: "In den Beinen", karte: ["i-warten", "Bitte warte kurz."],
        fuehlt: ["Die Beine sind wackelig.", "Ich fühle mich wie festgeklebt.", "Ich kann mich nicht bewegen."],
        warum: "Manchmal macht die Alarmanlage den Körper ganz starr – wie eine Schildkröte, die sich nicht rührt. Das heißt Erstarren. Es geht vorbei.",
        hilft: [["Die Füße fest auf den Boden drücken.", null], ["Die Zehen bewegen.", null], ["Wenn es geht: kurz laufen oder hüpfen.", null]] },
      { id: "muede", name: "Ganz müde", karte: ["i-warten", "Bitte warte kurz."],
        fuehlt: ["Nach der Schule bin ich ganz müde.", "Ich kann schlecht einschlafen.", "Ich will nur noch meine Ruhe."],
        warum: "Wenn die Alarmanlage lange an war, braucht der Körper danach viel Pause. Das ist ganz normal.",
        hilft: [["Eine Panzer-Pause machen.", "ruhe-ecke"], ["Etwas Ruhiges machen: malen, kuscheln, lesen.", null], ["Früh ins Bett gehen.", null]] }
    ]
  },

  /* ---------- Ruhe-Ecke: Fest und locker ---------- */
  festLocker: {
    titel: "Fest und locker",
    intro: "Erst mache ich mich ganz fest, wie im Panzer. Dann lasse ich ganz locker. Danach fühlt sich der Körper oft warm und ruhig an.",
    start: "Fest und locker machen",
    nochmal: "Noch einmal",
    fest: "Ganz fest …",
    locker: "Und ganz locker.",
    ende: "Gut gemacht! Wie fühlt sich dein Körper jetzt an?",
    teile: [
      ["Hände", "Mach Fäuste. Ganz fest!", "Lass die Hände locker hängen."],
      ["Schultern", "Zieh die Schultern hoch bis zu den Ohren.", "Lass die Schultern fallen."],
      ["Gesicht", "Kneif das Gesicht zusammen wie eine Schildkröte im Panzer.", "Mach das Gesicht ganz weich."],
      ["Füße", "Kralle die Zehen fest ein.", "Lass die Zehen locker."]
    ]
  }
};
