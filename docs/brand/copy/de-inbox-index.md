Contract: brand-contract v1

<!-- Generated from de/inbox/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Inbox | Mail, bei der das Wichtige zuerst kommt · Desktop-Vorschau | PassionCode.ai

Fabric Inbox ist das Mail-Tool von Fabric und funktioniert eigenständig: Gmail- und Cloudflare-Postfächer in einer Liste, wichtige Mails zuerst, und Agenten auf deinen eigenen Adressen. Entwicklungsvorschau für macOS, Windows und Linux.

Zum Inhalt springen

PassionCode

.ai

Produkte

Switchboard

Observatory

Inbox

Fabric

Deutsch

English

Русский

Français

Polski

한국어

Español

Português (Brasil)

简体中文

日本語

Einrichten

↓

FABRIC INBOX · ENTWICKLUNGSVORSCHAU

# Deine Mail

# Wichtiges zuerst

Bring Gmail- und Cloudflare-Postfächer in eine Liste, wichtige Mails zuerst. Agenten für deine eigenen Domains beantworten, was du erlaubst, und lassen den Rest als Entwurf liegen

IM TOOLKIT Mail: die Adressen, die Agenten lesen und im Rahmen deiner Richtlinie beantworten. Schritt 5 in „So funktioniert es“. Alle Tools

Alles mit einem Befehl einrichten →

Für macOS herunterladen

↓

Ansehen, was es kann

↓

Entwicklungsvorschau 0.77.3 · macOS 12+ · Windows · Linux · Open Source unter AGPL-3.0

FABRIC INBOX / MAIL + AGENTEN

WICHTIG

+

BEANTWORTET

NEU IN 0.15

## Dein Coding-Agent

## arbeitet in Inbox

Mit Release 0.15 arbeitet Claude Code oder Codex neben deiner Mail und richtet Inbox für dich ein. Die Konsole funktioniert ab 0.15.1: In 0.15.0 startete sie nicht. So verbindet sich ein Agent ↓

AGENT-KONSOLE

### Dein Agent in einer Seitenleiste

Claude Code oder Codex läuft rechts im Mailfenster, schon mit diesem Inbox verbunden, und kann alles, was die App kann. Öffne die Konsole mit der Schaltfläche in der Symbolleiste, View → Agent Console oder ⌃⌘T (Strg+Umschalt+T unter Windows und Linux). Jede Sitzung bekommt einen eigenen Schlüssel mit der Stufe, die du wählst; er wird widerrufen, wenn die Sitzung endet. Die Version aus dem Mac App Store hat die Konsole nicht.

VON DEINEM AGENTEN EINGERICHTET

### Keine Adresse, kein Secret zum Kopieren

Dein Coding-Agent erstellt den Server in deinem Cloudflare-Account und verbindet sich dann selbst, sobald du es in der App erlaubst. Du fügst das Token ein, meldest dich an und wählst Allow. Der Willkommensbildschirm bietet Use the server your agent set up.

NICHT ANGENOMMENE MAIL

### Mail, die der Server nicht annehmen konnte

Wenn eine Nachricht weder angenommen noch abgelehnt werden konnte, zeigen die Einstellungen der Domain, für wen sie war, wann und warum. Ihr Absender hat vielleicht eine Unzustellbarkeitsmeldung bekommen, also weißt du, wen du fragen kannst.

01 / WAS ES KANN

## Weniger zu lesen

## Weniger zu beantworten

Inbox sortiert jeden Account auf dieselbe Weise und gibt den Adressen deiner Domains jemanden, der sie beantwortet.

WICHTIGES ZUERST

### Was dich braucht, oben

Ungelesene Mails von Personen, Sicherheits- und Anmelde-Mails, Monitoring-Alarme, Ablehnungen bei App-Reviews, fehlgeschlagene Zahlungen und fehlgeschlagene Builds kommen zuerst. Newsletter, Benachrichtigungen, Abrechnungen und der Rest stehen in eingeklappten Gruppen mit Zählern. Jede Zeile sagt, warum sie dort steht.

DEINE DOMAINS

### Jede Adresse an einem Ort

Aktiviere Mail für eine Domain deines Cloudflare-Accounts, übernimm die Adressen, die sie schon hat, und lege neue an. Jede bestehende Adresse leitet weiterhin eine Kopie dorthin weiter, wohin sie vorher ging. Mail an eine Adresse ohne Postfach wird aufgelistet, nie verworfen.

AGENTEN, IN DEINEN REGELN

### Sendet nur, was er darf

Ein Agent hat eigene Anweisungen, eigenes Wissen und eigene Tools und kann mehrere Adressen bedienen. Er sendet eine Antwort nur, wenn sie auf seinem Wissen beruht, zu einem von dir erlaubten Thema passt und sein Tageslimit einhält. Alles andere wartet als Entwurf samt Begründung.

Alle Posteingänge · Beispieladressen und -mails, keine echten Accounts

FABRIC INBOX HOLEN

## Eine Entwicklungsvorschau

## für Mac, Windows und Linux

Neueste Vorschau: 0.77.3. Die App erstellt ihren Mailserver in deinem eigenen Cloudflare-Account und öffnet ihn; deine Mail bleibt bei deinen Accounts.

⌘

### macOS

Universal · Apple silicon + Intel · macOS 12 oder neuer
DMG-Installer · mit Developer ID signiert und von Apple notarisiert

Für macOS herunterladen

↓

Öffne das DMG und ziehe Fabric Inbox in den Ordner „Programme“.

Eine Mac-Kopie älter als 0.15.2 kann sich nicht selbst aktualisieren: Lade 0.15.2 einmal herunter und installiere es über die alte. Spätere Releases installieren sich wieder selbst.

⊞

### Windows und Linux

Release 0.77.3 enthält außerdem einen Windows-Installer für x64 und arm64, der keine Administratorrechte braucht und seit 0.14.1 mit Authenticode signiert ist, sowie ein Linux-AppImage und ein .deb für x64 und arm64.

Downloads für Windows und Linux

↗

Die Windows-App und das AppImage aktualisieren sich selbst; eine aus dem .deb installierte Kopie nicht, installiere also das nächste .deb. Unter Linux bewahrt die App deine Anmeldung im Secret Service (GNOME Keyring oder KWallet) auf und startet ohne ihn nicht.

☰

### Bevor du es öffnest

Wähle beim ersten Öffnen Create my server on Cloudflare. Wenn dein Coding-Agent den Server erstellt hat, wähle stattdessen Use the server your agent set up.

Ein Cloudflare-Account; der kostenlose Tarif reicht

Ein API-Token, den du in dessen Dashboard erstellst, mit den Berechtigungen, die die App auflistet

Für Gmail: ein OAuth-Client aus deinem eigenen Google-Cloud-Projekt

Die Einrichtungsanleitung listet jede Einstellung auf.

macOS-DMG · SHA-256

eb118f3a0a9eefc337b045c0ebfcaddee83ecdeedb9343f5681bf6c6376923dd

Vor dem Öffnen vergleichen: shasum -a 256 im Terminal. Ein abweichender Wert bedeutet eine andere Datei; lade sie erneut herunter.

Release-Notes und Prüfsumme

↗

Installationshinweise

↗

Alle Releases

↗

Das ist eine Entwicklungsvorschau. Antworten von Agenten wurden noch nicht mit einem echten Modellaufruf ausprobiert, und Gmail wurde noch nicht an einem echten Account abgenommen. Allgemeine IMAP- und Outlook-Unterstützung sind geplant; beides wird heute nicht als funktionierende Integration angeboten.

FÜR AGENTEN

## Alles, was die App kann,

## kann auch ein Agent

Dein Server spricht das Model Context Protocol unter /mcp. Jede Funktion der App ist auch ein MCP-Tool, sodass Claude Code oder ein anderer MCP-Client Mails lesen, sortieren und senden und Adressen verwalten kann – im Rahmen der Stufe seines Schlüssels.

01

### Gib deinem Agenten einen Satz

Öffne in der App Einstellungen → Agent-Zugriff. Dort steht zuerst der Satz für deinen Coding-Agenten. Der Agent erstellt den Server in deinem Cloudflare-Account und verbindet sich selbst, sobald du Allow wählst; du kopierst keine Adresse und kein Secret. Die Schritte des Agenten stehen in der Einrichtungsanleitung für Agenten.

02

### Oder erstelle selbst einen Schlüssel

Wähle auf demselben Bildschirm einen Namen, eine Stufe (read, mail oder admin) und ob er senden darf. Das Secret wird nur einmal angezeigt.

03

### Deinen Agenten verbinden

Für einen selbst erstellten Schlüssel gibt die App den ganzen Befehl aus: claude mcp add --transport http fabric-inbox https://<your-server>/mcp mit den beiden Headern des Schlüssels. Dann frag nach list_accounts.

02 / DAS PASSIONCODE-TOOLKIT

## Ein Tool mit eigener Aufgabe

Inbox kümmert sich um Mail. Switchboard verwaltet Accounts für Claude Code und Codex. Project Observatory behält die Projekte im Blick, an denen diese Agenten arbeiten. Fabric, in früher Vorschau, ist das Zuhause für deine Projekte und ihre Agenten.

Switchboard entdecken

↗

Observatory entdecken

↗

Fabric kennenlernen

↗

BEVOR DU LOSLEGST

## Wo Inbox steht

Wohin geht meine Mail?

Auf den Server, den die App in deinem eigenen Cloudflare-Account erstellt. Gmail-Accounts verbinden sich über einen OAuth-Client aus deinem eigenen Google-Cloud-Projekt.

Beantwortet es meine Mail von allein?

Nur auf Adressen, denen du einen Agenten gibst, und nur mit Antworten, die seine Regeln erlauben. Automatische Mails, Massenmails und No-Reply-Mails werden nie beantwortet, und jeder Lauf hält genau fest, was gesendet wurde.

Unterstützt es jeden Mail-Account?

Noch nicht. In der Vorschau funktionieren Cloudflare-Postfächer und Gmail. Allgemeine IMAP- und Outlook-Unterstützung sind geplant.

Ist der Quellcode öffentlich?

Ja. Fabric Inbox ist Open Source unter der GNU AGPL-3.0. Für eine Nutzung, die die AGPL nicht abdeckt, ist eine kommerzielle Lizenz erhältlich über passioncode.ai/business. Es begann als Cloudflares Vorlage Agentic Inbox, die ihren eigenen Apache-2.0-Hinweis behält. Das Repository enthält den Quellcode, die Tests und die Release-Notes.

Ist Inbox der Fabric-Agent?

Nein. Inbox ist ein Mailprogramm; seine Agenten beantworten deine Adressen im Rahmen der Regeln, die du festlegst. Fabric, in früher Vorschau, ist das Zuhause für deine Projekte und ihre Agenten. Sie gehören zum selben Toolkit und haben unterschiedliche Rollen.

PassionCode

.ai

Vom Vibe Coding zum Passion Coding

Loslegen

Vision

Für Organisationen

Switchboard

Observatory

Inbox

Dashboards

Fabric

GitHub und Quellcode

Über das Projekt

Investoren

Mitwirken

Presse

Designsystem

Datenschutz

commercial@passioncode.ai

X

↗
