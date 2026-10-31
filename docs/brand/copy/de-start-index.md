Contract: brand-contract v1

<!-- Generated from de/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Loslegen | Installiere deinen Arbeitsplatz für KI-Agenten | PassionCode.ai

Richte PassionCode.ai mit einem Befehl ein oder mit einem Prompt für Claude Code oder Codex: die Tools, ihre MCP-Server und die Skills. Derselbe Befehl prüft und repariert eine Einrichtung, die du schon hast. Kostenlos und Open Source.

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

Einrichten

↓

Loslegen · kostenlos und Open Source

# Vom leeren Computer zu deinem ersten Agenten

Baue Agenten, die weiterarbeiten und wissen, was die anderen getan haben. Ein Befehl richtet die Tools ein, und derselbe Befehl prüft sie später

Braucht Node.js 18+ und Claude Code oder Codex Fabric braucht auf jedem System Docker und die Supabase CLI

→

Ein Befehl

01

Einen Agenten erstellen oder anpassen

02

Laufen lassen und ansehen

03

Den nächsten Agenten hinzufügen

+

Mitwirken

EIN BEFEHL

## Alles einrichten

## oder prüfen, was du hast

Auf macOS installiert ein Befehl die Tools deiner Wahl aus ihren signierten Releases, verbindet ihre MCP-Server mit Claude Code, Codex, Gemini CLI und Kimi Code und fügt die Skills hinzu. Unter Windows und Linux lädst du die Apps von ihren Seiten herunter und führst dann denselben Befehl für die Skills und die MCP-Server aus. Auf einem Computer, der schon eingerichtet ist, prüft derselbe Befehl alles, repariert, was nicht stimmt, und zeigt, was sich geändert hat.

### Selbst ausführen

npx @passioncode-ai/passioncode@latest setup

Benötigt Node.js 18+ · der Befehl installiert nichts, dessen Signatur, Prüfsumme oder Notarisierung nicht stimmt · starte danach deinen Coding-Agenten neu · nur prüfen, ohne etwas zu ändern:

npx @passioncode-ai/passioncode@latest doctor

### Oder lass deinen Coding-Agenten das erledigen

Kopiere diesen Prompt in Claude Code, Codex oder einen anderen Coding-Agenten. Er führt den Befehl aus, erledigt, was er kann, und gibt dir eine kurze Liste dessen, was nur du tun kannst: dich anmelden, Zugriff erlauben, einen Schlüssel in das eigene Eingabefeld des Tools eingeben.

Richte PassionCode.ai auf diesem Computer ein, oder prüfe und repariere es, falls es schon eingerichtet ist. Führe npx --yes @passioncode-ai/passioncode@latest setup --yes --json aus (es braucht Node 18 oder neuer) und lies sein JSON: Auf macOS installiert es die fehlenden Apps aus ihren signierten Releases, unter Windows und Linux nennt es stattdessen die Download-Seite jeder App; überall installiert es die Skills und jeden MCP-Server, repariert, was nicht stimmt, und prüft alles noch einmal. Lade nichts von Hand herunter, installiere nichts von Hand und stoppe oder beende nie eine laufende App. Führe dann jeden aufgeführten Onboarding-Schritt eines Produkts aus, den ein Agent ausführen darf, frag mich im Chat nie nach einem Schlüssel oder Passwort (die Tools öffnen dafür ihre eigenen verdeckten Eingabefelder) und schließe mit npx --yes @passioncode-ai/passioncode@latest doctor ab. Sag mir kurz, was du eingerichtet oder repariert hast, was noch fehlschlägt, und die nummerierten Schritte, die nur ich erledigen kann, etwa die Anmeldung oder unter Windows und Linux die Apps von ihren Seiten zu installieren und den Befehl erneut auszuführen, und erinnere mich daran, dich neu zu starten, damit die neuen Skills und MCP-Server geladen werden.

Fabric ist eine frühe Vorschau und braucht auf jedem System Docker und die Supabase CLI. Auf macOS installiert der Befehl es, wenn beides auf deinem Computer ist, und sagt dir sonst, was fehlt; unter Windows und Linux lädst du es zuerst von der Fabric-Seite herunter und installierst es.

Lieber von Hand?

01

### Fabric hinzufügen

Fabric ist das Zuhause für deine Projekte und ihre Agenten: Jedes Projekt hält dort Zweck, Board, Entscheidungen und Releases. Der erste Bildschirm bietet vier Aktionen: einen Agenten erstellen, einen vorhandenen anpassen, ein Projekt öffnen oder eines erstellen. Es ist eine frühe Vorschau: Es braucht Docker und die Supabase CLI, und seine Unterhaltung speichert Nachrichten, antwortet aber noch nicht.

Fabric herunterladen

0.3.15

für macOS

↓

Für Windows und Linux

Voraussetzungen und Einschränkungen

Apple silicon und Intel · signiert und notarisiert · SHA-256 7c592d39b54e0350ada2cd110e861f5789bc33aa9af0dc6b055cd0b54dd3596d · Release Notes

02

### Fabric Dashboards hinzufügen

Fabric Dashboards zeigt jeden lokalen Agentendienst in einem Fenster. Lade es herunter und verbinde es dann über MCP mit deinem Coding-Agenten.

Fabric Dashboards herunterladen

0.8.17

↓

Für Windows und Linux

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Switchboard, Project Observatory und Fabric Inbox haben jeweils ihren eigenen Download: Switchboard · Observatory · Inbox

## Nächste Schritte

01

### Einen Agenten erstellen oder anpassen

Bitte in Claude Code oder Codex um das, was du brauchst, oder starte in Fabric mit den Aktionen zum Erstellen und Anpassen; die Arbeit läuft in beiden Fällen in der Konsole deines Coding-Agenten. Der Skill des Fabric Agent Adapter stellt zuerst seine Fragen und zeigt seinen Plan, bevor er etwas ändert; das Anpassen läuft auf einem neuen Branch fabric-adapter. Du bekommst einen Vertrag, ein Dashboard, Tests und einen Konformitätsbericht.

neu Erstelle einen Fabric-Agenten, der jeden Morgen unsere App-Store-Rezensionen prüft und Antworten entwirft

anpassen Passe dieses Repository an Fabric an

02

### Laufen lassen und ansehen

Fabric Dashboards zeigt jeden lokalen Agentendienst in einem Fenster; dein Agent kann sie über MCP starten, stoppen und öffnen. Der eine Befehl installiert es auf macOS und verbindet es mit deinem Coding-Agenten.

03

### Den nächsten Agenten zum selben Projekt hinzufügen

Baue den nächsten Agenten genauso und gib ihm dasselbe Projekt in Fabric. Mit Fabric verbundene Agenten teilen Board, Gedächtnis und Übergaben eines Projekts, sodass einer dort weitermacht, wo der andere aufgehört hat. Welche Agenten sich heute verbinden

Für die Änderungen deiner Agenten empfehlen wir task-pipeline, einen eigenen Open-Source-Skill: was er tut und wie du ihn installierst

MITWIRKEN

## Etwas gefunden, das repariert werden sollte?

## Sende einen Pull Request

Jedes Produkt-Repository ist öffentlich und nennt seinen Testbefehl in AGENTS.md. Befolge die Regeln der Organisation in CONTRIBUTING.md und öffne einen Pull Request; das Öffnen ist deine Zustimmung zur Datei CLA.md.

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

Investoren

Mitwirken

Presse

Designsystem

Datenschutz

commercial@passioncode.ai

X

↗
