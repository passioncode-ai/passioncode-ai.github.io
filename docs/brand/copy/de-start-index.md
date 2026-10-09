Contract: brand-contract v1

<!-- Generated from de/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Loslegen | Installiere deinen Arbeitsplatz für KI-Agenten | PassionCode.ai

Installiere die PassionCode.ai-Skills, füge Fabric hinzu, erstelle mit Claude Code oder Codex deinen ersten Fabric-Agenten, wandle ein bestehendes Projekt um, lass es in Fabric Dashboards laufen und füge den nächsten Agenten derselben Familie hinzu. Kostenlos und Open Source.

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

Tools herunterladen

↓

Loslegen · kostenlos und Open Source

# Vom leeren Mac zu deinem ersten Agenten

Schluss mit Agenten, die verrotten und nicht miteinander reden. Fünf Schritte, etwa zwanzig Minuten, vom ersten Agenten bis zu einer Familie, die du sehen kannst. Jeder Schritt ist für sich nützlich, also hör dort auf, wo das Ergebnis reicht

Braucht Node.js 18+ und Claude Code oder Codex Fabric braucht macOS auf Apple silicon

01

Skills installieren

02

Fabric hinzufügen

03

Agenten erstellen oder umwandeln

04

Laufen lassen und ansehen

05

Den nächsten Agenten hinzufügen

+

Mitwirken

## Schritte

01

### Skills installieren

Der PassionCode.ai-Launcher installiert die Skills des Fabric Agent Adapter, Observatory Log und die Arbeitsregeln in Claude Code, Codex und andere unterstützte Agenten. Ohne Account und ohne Schlüssel.

npx @passioncode-ai/passioncode@latest update

Launcher 0.1.31 · er installiert die Mitglieder der Familie in den Versionen, die er festlegt · starte deinen Agenten danach neu. Automatische Updates sind standardmäßig an; schalte sie ab, wenn du das lieber möchtest.

02

### Fabric hinzufügen

Fabric ist der CEO-KI-Agent: Jedes Projekt bekommt ein Zuhause für Zweck, Board, Entscheidungen und Releases. Es ist eine frühe Vorschau: Es braucht Docker und die Supabase CLI, und seine Unterhaltung speichert Nachrichten, antwortet aber noch nicht.

Fabric herunterladen

0.3.3

für macOS

↓

Voraussetzungen und Einschränkungen

Apple silicon · signiert und notarisiert · SHA-256 88922ad23da5190cb330bee837b23e687fdac0f039d1fef13e5d80ddee492446 · Release Notes

03

### Agenten erstellen oder umwandeln

Bitte in Claude Code oder Codex um das, was du brauchst. Der Skill des Fabric Agent Adapter baut einen Fabric-kompatiblen Dienst: einen Vertrag, ein Dashboard, Tests und eine Konformitätsprüfung.

neu Erstelle einen Fabric-Agenten, der jeden Morgen unsere App-Store-Rezensionen prüft und Antworten entwirft

umwandeln Passe dieses Repository an Fabric an

Ein bestehender Agent, MCP-Server oder ein Kommandozeilen-Tool behält seinen Code; der Adapter fügt drumherum hinzu, was Fabric braucht. Schnellstart des Adapters · den Vertrag

04

### Laufen lassen und ansehen

Fabric Dashboards zeigt jeden lokalen Agentendienst in einem Fenster; dein Agent kann sie über MCP starten, stoppen und öffnen.

Fabric Dashboards herunterladen

0.6.7

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Füge dann hinzu, was deine Arbeit verlangt: Fabric Switchboard wenn Agenten mehrere Accounts brauchen, Project Observatory um zu sehen, was sich über Projekte hinweg geändert hat, Fabric Inbox für Mail.

05

### Den nächsten Agenten hinzufügen und die Familie sehen

Wenn die Arbeit es verlangt, baue den nächsten Agenten auf dieselbe Weise und gib ihm dasselbe Projekt in Fabric. Claude Code, Kilo Code und Hermes Agent, die von Fabric aus gestartet wurden, teilen Board, Gedächtnis und Übergaben dieses Projekts, sodass einer dort weitermacht, wo der andere aufgehört hat. Fabric Dashboards zeigt beide mit Zustand und Ausgaben in einem Fenster.

als Nächstes Erstelle einen Fabric-Agenten, der die entworfenen Antworten auf Rezensionen zu einer Wochenzusammenfassung für das Board verdichtet

Jeder neue Agent tritt einer Familie bei, die du schon sehen kannst, statt ein weiteres Skript zu werden, das man sich merken muss. Wie die Familie wächst · welche Agenten sich heute verbinden

EIN TOOL, DAS WIR EMPFEHLEN

## Agenten, die zu Ende bringen,

## was sie anfangen

Für die Änderungen, die deine Agenten vornehmen, empfehlen wir die task-pipeline– ein eigenständiger Open-Source-Skill aus der Familie sshlg-skills Familie. Sie führt eine Änderung durch Stufen mit Gates, vom Briefing und Plan über Tests und Deployment bis zur Abnahme, und geht erst weiter, wenn jedes Gate bestanden ist.

npx sshlg-skills install

task-pipeline auf GitHub · der Skill gehört nicht zu PassionCode.ai und braucht nichts davon

MITWIRKEN

## Etwas gefunden, das repariert werden sollte?

## Sende einen Pull Request

Jedes Produkt-Repository ist öffentlich. Jedes nennt seinen Testbefehl in AGENTS.md und seinen Schnellstart in der README; dein Coding-Agent kann beides lesen und den Rest erledigen.

### Wähle ein Repository

Forke das Produkt, das du nutzt, oder stöbere in der Organisation. Issues mit einem Label sind ein guter Einstieg.

### Lass das Gate laufen

Lies die AGENTS.md und die der Organisation CONTRIBUTING.md, nimm deine Änderung vor und führe den Testbefehl aus, bis er besteht.

### Öffne den Pull Request

Mit dem Öffnen stimmst du dem CLA.mddes Repositorys zu; es gibt kein Kästchen zum Anhaken. Wir prüfen jeden Pull Request und antworten.

fabric

fabric-switchboard

fabric-dashboards

fabric-inbox

project-observatory-dashboard

fabric-agent-adapter

fabric-agent-contract

passioncode

okolos

fabric-vr

passioncode-ai.github.io

Einige Repositories sind intern und nur für Mitarbeitende sichtbar: die Wissensbasis des Teams und die Organisationskarte. Willst du dem Team beitreten? Schreib an Sergey.

FÜR ORGANISATIONEN

## Du willst es für dein

## ganzes Team laufen lassen?

Wir erfassen deine Prozesse, schätzen, was Agenten übernehmen können, und richten es mit dir oder für dich ein.

Schätzung und Anfrage

→

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
