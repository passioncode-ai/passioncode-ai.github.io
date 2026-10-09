Contract: brand-contract v1

<!-- Generated from de/dashboards/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Dashboards | Deine lokalen Agentendienste an einem Ort

Ein Mac-Fenster für deine lokalen Agentendienste. Sieh, was Aufmerksamkeit braucht, öffne Dashboards und lass deine Agenten dieselben Tools über MCP nutzen.

Zum Inhalt springen

PassionCode

.ai

Vision

Für dich

Für Organisationen

Die Tools

Über das Projekt

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

Download

↓

FABRIC DASHBOARDS · macOS

# Deine Agentendienste

# Alles an einem Ort

Sieh, was läuft, was Aufmerksamkeit braucht und was zuletzt passiert ist – mit dem eigenen Dashboard jedes Dienstes in einer Mac-App

IN DER FAMILIE Zustand, Ausgaben und Steuerung: jeder Agentendienst mit seinem Status, seinen Ausgaben und seinen Updates in einem Fenster. Die ganze Familie

Für macOS herunterladen ↓

Quellcode ansehen ↗

Release 0.6.7 · macOS 13+ · Apple silicon + Intel

DEINE LOKALEN DIENSTE / AN EINEM ORT

DAS FENSTER

## Alle Agentendienste

## auf einem Bildschirm

Was bereit ist, was dich braucht und was es kostet – die nächste Aktion ist nur einen Klick entfernt. Jeder Dienst öffnet sein eigenes Dashboard direkt in der App.

Die echte App aus ihrem Entwicklungs-Build · Beispieldienste aus dem Kit des Fabric Agent Adapter, keine echten Daten

Das eigene Dashboard eines Dienstes, in der App geöffnet

01 / DIE ARBEIT IM BLICK

## Einblick in

## die Tools, die die Arbeit erledigen

Fabric Dashboards findet kompatible Dienste auf deinem Mac. Jeder Dienst behält seine eigene Aufgabe; du bekommst einen gemeinsamen Ort, um sie zu prüfen und zu steuern.

### Sieh, was dich braucht

Dienststatus, letzte Aktivität und alles, was Aufmerksamkeit braucht, stehen zusammen. Eine langsame Prüfung gilt nicht sofort als Ausfall.

### Öffne das echte Dashboard

Die eigene Oberfläche jedes Dienstes öffnet sich in der App, bereits angemeldet. Project Observatory ist ein kompatibler Dienst, den du heute schon nutzen kannst.

### Erledige den nächsten Schritt

Starte, stoppe oder starte einen Dienst neu, sieh dir seine Logs an und nutze die Aktionen, die sein Vertrag freigibt. Wenn du Dashboards beendest, laufen deine Dienste weiter.

IN 0.6

## Ausgaben, eine Konsole

## und Updates, denen du vertrauen kannst

Was die Releases 0.6 hinzugefügt haben, von 0.6.0 am 6. Oktober bis 0.6.5 am 8. Oktober 2026.

### Alle Limits auf der Seite Spend

Die Seite Spend listet die Limits auf, die jeder Agent anwendet: Das Limit, das dich am dringendsten braucht, wird rot, wenn es die Arbeit gestoppt oder seine Grenze überschritten hat, und gelb bei 80 %. Ein Agent lässt sich aufklappen und zeigt dann jedes Limit mit seinem Zeitfenster und dem bisher Verbrauchten. Dein Agent liest dieselbe Liste über MCP.

### Eine Agentenkonsole neben dem Dashboard

Neben dem Dashboard eines Dienstes öffnet sich ein echtes Terminal, in dem Claude Code, Codex oder eine andere Runtime im Repository dieses Agenten läuft. Wo Fabric Switchboard den Ordner einem Projekt zuordnet, startet die Sitzung mit dem Account dieses Projekts.

### Updates, die zuerst geprüft werden

Die App aktualisiert sich selbst: Ein Release muss die Signatur der Organisation tragen und zu ihren Prüfsummen passen, bevor es installiert wird, und es wartet, solange eine Konsole oder ein Befehl läuft. Die automatische Installation lässt sich unter Settings abschalten.

### Die Agentenfamilie bleibt aktuell

Settings → Estate updates beobachtet den Fabric Agent Contract und die Skills von PassionCode.ai und kann die Skills im Hintergrund aktualisieren, nachdem geprüft wurde, wer sie veröffentlicht hat. Dieser Schalter ist standardmäßig aus.

### Englisch oder Russisch

Settings → Language: wie auf diesem Mac, Englisch oder Russisch. Fenster, Menü und das Symbol in der Menüleiste wechseln sofort.

02 / FABRIC DASHBOARDS HERUNTERLADEN

## Ein Download

## Deine Dienste bleiben bei dir

### macOS

Release 0.6.7. Universelles DMG für Apple silicon und Intel, macOS 13 oder neuer. Mit Developer ID signiert, notarisiert und mit angeheftetem Ticket (stapled).

Fabric Dashboards herunterladen ↓

Öffne das DMG, zieh Fabric Dashboards in „Programme“ und öffne die App. Sie startet bei der Anmeldung; das kannst du unter Settings ändern.

### Bevor du sie öffnest

Dienste werden separat installiert. Bis ein kompatibler Dienst installiert ist, ist eine leere Liste normal; Dashboards macht nicht aus jedem lokalen Prozess einen Agentendienst.

Teste Project Observatory, oder bau dir einen eigenen Dienst mit dem Fabric Agent Adapter. Die App selbst braucht weder Account noch API-Schlüssel.

SHA-256 des DMG

d0e916fc1a9ee0586446c67474eb75156e770cc37dff302a3808703b4ec42e02

Versionshinweise und Prüfsummen ↗

Installationsanleitung ↗

03 / FÜR DEINE AGENTEN

## Dieselben Dienste

## Direkt aus deinem Agenten

Registriere den MCP-Server der App in deinem Client. Ein Agent kann Dienste auflisten, Dashboard-Links abrufen und die Operationen nutzen, die die Regeln der App freigeben.

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Sobald die App in „Programme“ installiert ist, bitte deinen Agenten um einen Aufruf von list_services. Ein leeres Ergebnis bedeutet, dass noch kein Dienst installiert ist. Andere MCP-Clients können dieselbe ausführbare Datei als stdio-Server starten. Mehr dazu in der Anleitung zur MCP-Einrichtung.

04 / GUT ZU WISSEN

## Passt in dein Setup

Brauche ich Fabric?

Nein. Fabric Dashboards funktioniert eigenständig. Es ist eines der Tools von Fabric und kann kompatible Dienste anzeigen, schon bevor du die frühe Vorschauversion von Fabric nutzt.

Welche Dienste erscheinen?

Dienste mit einem veröffentlichten lokalen Deskriptor für fabric-service/0.1. Project Observatory unterstützt ihn. Der Fabric Agent Contract legt das Protokoll fest, und der Adapter hilft dir, es umzusetzen.

Ist es Open Source?

Fabric Dashboards ist Open Source unter der GNU AGPL-3.0. Eine kommerzielle Lizenz ist erhältlich: passioncode.ai/business. Release 0.1.0 bleibt unter MIT; 0.2.0 und 0.3.0 bleiben unter PolyForm Noncommercial oder Internal Use. Release 0.3.1 ist das erste unter der AGPL.

TEIL DEINER ARBEITSUMGEBUNG FÜR KI-AGENTEN

## Fang mit den Diensten an,

## die du schon nutzt

Behalte Projekte mit Observatory im Blick. Richte Accounts mit Switchboard ein. Füge nur die Tools hinzu, die deine Arbeit braucht.

Alle Tools ansehen ↗

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

Designsystem

Datenschutz

commercial@passioncode.ai

Twitter

↗
