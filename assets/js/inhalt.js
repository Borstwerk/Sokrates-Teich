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
    startHier: "Fang hier an!"
  },

  orte: [
    { id: "geschichte",   name: "Sokrates erzählt", unter: "Warum versteckt sich meine Stimme?", bild: "i-buch" },
    { id: "panzer-meter", name: "Panzer-Meter",     unter: "Wie geht es dir gerade?",           bild: "sokrates-3" },
    { id: "mut-steine",   name: "Mut-Steine",       unter: "Kleine mutige Schritte",             bild: "i-steine" },
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
    zurRuhe: "Zur Ruhe-Ecke"
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
        "Toilette: vorher eine Regel ausmachen (Karte zeigen oder ohne Fragen gehen dürfen).",
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
  }
};
