Contract: brand-contract v1

<!-- Generated from de/observatory/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Project Observatory | Lokales Dashboard für Projekte, an denen Agenten arbeiten | PassionCode.ai

Sieh, was sich in deinen Projekten geändert hat, was Aufmerksamkeit braucht und wo bekannte API-Schlüssel eine Kopie hinterlassen haben. Project Observatory ist ein lokales Open-Source-Dashboard von PassionCode.ai, auf Englisch oder Russisch.

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

PROJECT OBSERVATORY · VON PASSIONCODE

# Deine Projekte

# Wieder im Blick

Sieh, was sich in den Projekten deiner Agenten geändert hat, was Aufmerksamkeit braucht und wo bekannte API-Schlüssel eine Kopie hinterlassen haben – in einem lokalen Dashboard auf Englisch oder Russisch

IN DER FAMILIE Gedächtnis und Belege: was sich in jedem Projekt geändert hat, was entschieden wurde und was Aufmerksamkeit braucht. Die ganze Familie

Loslegen

↓

Quellcode ansehen

↗

Open Source · macOS + Linux · Python 3.11+

EIN BLICK / DEINE PROJEKTE

PROJEKTE

+

BEFUNDE

EIN BLICK IN OBSERVATORY

## Zuerst, was Aufmerksamkeit braucht

Die echte Übersicht von Observatory, von der Engine aus den Projekten eines fiktiven Unternehmens erzeugt.

Synthetischer Demobestand · keine echten Projekte, Repositories oder Zugangsdaten

EIN LOKALES OBSERVATORIUM

## Weniger raten

## Mehr Belege auf einen Blick

01 / INVENTAR

### Wisse, was da ist

Wähle den Projektordner, den du beobachten willst. Observatory findet die Repositories darin und führt ein lokales Register, das zu jeder Verknüpfung die Regel dahinter nennt.

02 / AKTIVITÄT

### Sieh, was sich bewegt hat

Commits, Zustand des Working Tree und Arbeit, die nur auf diesem Rechner existiert – über alle erfassten Projekte hinweg, jeweils mit dem Verlauf Woche für Woche.

03 / BEFUNDE

### Fang mit dem Wichtigen an

Befunde kommen mit ihren Belegen und einem nächsten Schritt, geordnet von kritisch bis Info. Bei stummgeschalteten Befunden bleibt festgehalten, wer sie stummgeschaltet hat, wann und warum.

04 / SCHLÜSSEL

### Finde Kopien bekannter Schlüssel

Metadaten zu Zugangsdaten liegen getrennt von den Werten. Ausgewählte Transkripte, Logs und SQLite-Speicher werden mit Schlüsseln verglichen, die lokal bereits bekannt sind; Befunde wiederholen nie einen Wert.

05 / DEINE SPRACHE

### Englisch oder Russisch

Das Dashboard ist standardmäßig auf Englisch. Stell für den Workspace Russisch ein oder wechsle mit EN/RU in der Seitenleiste; Zähler verwenden die Pluralformen der jeweiligen Sprache.

06 / AGENTEN

### Gib dem nächsten Agenten Kontext

Eine CLI, MCP-Tools und ein Plugin für Claude Code greifen auf dieselben lokalen Fakten zu. Integrationen und Hintergrundjobs bleiben aus, bis du dich für sie entscheidest.

OBSERVATORY INSTALLIEREN

## Fang mit deinem eigenen Workspace an

Aktuelles Release: 0.21.0. Für die erste lokale Beobachtung brauchst du keinen API-Schlüssel. Überlass die Einrichtung deinem Coding-Agenten oder erledige sie selbst.

01

### Installiere das Release

Download project_observatory-0.21.0-py3-none-any.whl und SHA256SUMS aus Release 0.21.0, prüfe sie mit shasum -a 256 -c SHA256SUMS --ignore-missing, installiere dann in einer isolierten Umgebung mit Python 3.11+ und Unterstützung für SQLite-Erweiterungen per pip install --no-deps erst das Wheel und danach sein Extra [full] mit -c "$(project-observatory full-path)/requirements-full.lock", dem Satz an Abhängigkeiten, mit dem das Release getestet wurde. Unter macOS nimm das Python aus Homebrew.

02

### Leg einen privaten Workspace an

project-observatory full init, wähle dann den Ordner, den du beobachten willst, mit full configure sources projects. Konfiguration, Schlüssel und Verlauf bleiben außerhalb des installierten Codes.

03

### Beobachten und öffnen

project-observatory full local, dann full open. Für Russisch: full configure interface locale ru.

04

### Verbinde deinen Agenten

Der MCP-Server spricht stdio: claude mcp add observatory --scope user -e OBSERVATORY_HOME="$OBSERVATORY_HOME" -- "$(python -c 'import sys; print(sys.executable)')" "$(project-observatory full-path)/mcp/server.py", dann frag nach observatory_overview.

Installationsanleitung

↗

Onboarding und Integrationen

↗

Alle Releases

↗

Mac-App: ProjectObservatory-0.21.0-macos.zip, mit einer Developer ID signiert und von Apple notarisiert, für macOS 14+. Sie öffnet sich mit dem Dashboard und nutzt die oben installierte Engine; prüfe sie anhand derselben SHA256SUMS.

Das aktuelle Release, 0.21.0, steht unter der AGPL, wie jedes Release seit 0.10.0, dem ersten unter der AGPL; 0.9.1 und früher behalten die Lizenz, mit der sie erschienen sind.

Der Abgleich bekannter Werte vergleicht ausgewählte Artefakte mit Schlüsseln, die lokal bereits bekannt sind. Er kann keine unbekannten Secrets finden und nicht beweisen, dass keine Kopie mehr existiert, und eine lokale Kopie ist kein Beleg dafür, dass jemand anderes an einen Schlüssel gelangt ist. Die Rotation bei echten Anbietern und externe MCP-Hosts liegen außerhalb der Offline-Testsuite.

BEVOR DU ANFÄNGST

## Ein paar nützliche Unterscheidungen

Lädt Observatory meine Projekte oder Schlüssel hoch?

Nein. Inventar, Verlauf und Beobachtungen liegen in deinem privaten Workspace auf deinem Rechner. Optionale Integrationen haben ihren eigenen Zugriff; jede wird separat mit deinem eigenen Account aktiviert.

Was liest Observatory?

Nur die Ordner und Quellen, die du konfigurierst. full doctor meldet, was aktiviert ist und was fehlt, und das Dashboard sagt, wenn eine Quelle nicht gemessen wurde, statt eine Null zu zeigen.

Ist das dasselbe wie Switchboard?

Nein. Switchboard verwaltet deine Accounts für Claude Code und Codex. Observatory behält die Projekte im Blick, an denen diese Agenten arbeiten. Beide sind Open-Source-Tools von PassionCode, die du heute schon nutzen kannst.

Und Fabric?

Fabric ist unser KI-Agent in der Rolle des CEO, als frühe Vorschauversion, mit dem Fokus auf die Koordination von Agenten und Projekten. Observatory ist schon jetzt als eigenständiges lokales Tool verfügbar. Mehr über Fabric.

Kann ich es selbst prüfen oder bauen?

Ja. Project Observatory ist Open Source unter der GNU AGPL-3.0. Für eine Nutzung, die die AGPL nicht abdeckt, gibt es eine kommerzielle Lizenz über passioncode.ai/business. Veröffentlichte Versionen behalten ihre Lizenz: 0.8.1 und früher unter MIT, 0.8.2 bis 0.9.1 unter PolyForm Noncommercial oder Internal Use. Das Repository enthält den Quellcode, Tests, das Sicherheitsmodell und die Versionshinweise.

OPEN SOURCE · LOKAL ZUERST

## Deine Projekte, deine Belege

Leg einen privaten Workspace an, beobachte deine eigenen Ordner und sag uns, wo es besser werden muss.

Loslegen

↑

Problem melden

↗

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
