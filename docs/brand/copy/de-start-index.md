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

Tools herunterladen

↓

Loslegen · kostenlos und Open Source

# Vom leeren Mac zu deinem ersten Agenten

Baue Agenten, die weiterarbeiten und wissen, was die anderen getan haben. Ein Befehl richtet die Tools ein, und derselbe Befehl prüft sie später

Braucht Node.js 18+ und Claude Code oder Codex Fabric braucht macOS auf Apple silicon oder Intel

→

Ein Befehl

01

Skills installieren

02

Fabric hinzufügen

03

Einen Agenten erstellen oder anpassen

04

Laufen lassen und ansehen

05

Den nächsten Agenten hinzufügen

+

Mitwirken

EIN BEFEHL

## Alles einrichten

## oder prüfen, was du hast

Ein Befehl installiert die Tools deiner Wahl aus ihren signierten Releases, verbindet ihre MCP-Server mit Claude Code, Codex, Gemini CLI und Kimi Code und fügt die Skills hinzu. Auf einem Computer, der schon eingerichtet ist, prüft derselbe Befehl alles, repariert, was nicht stimmt, und zeigt, was sich geändert hat.

npx @passioncode-ai/passioncode@latest setup

Benötigt Node.js 18+ · installiert die Apps auf macOS; unter Linux und Windows richtet er die Skills und MCP-Server ein · er installiert nichts, dessen Signatur, Prüfsumme oder Notarisierung nicht stimmt · nur prüfen, ohne etwas zu ändern:

npx @passioncode-ai/passioncode@latest doctor

### Oder lass deinen Coding-Agenten das erledigen

Kopiere diesen Prompt in Claude Code, Codex oder einen anderen Coding-Agenten. Er führt den Befehl aus, erledigt, was er kann, und gibt dir eine kurze Liste dessen, was nur du tun kannst: dich anmelden, Zugriff erlauben, einen Schlüssel in das eigene Eingabefeld des Tools eingeben.

Richte PassionCode.ai auf diesem Computer ein, oder prüfe und repariere es, falls es schon eingerichtet ist. Führe npx --yes @passioncode-ai/passioncode@latest setup --yes --json aus (es braucht Node 18 oder neuer) und lies sein JSON: Es installiert die fehlenden Apps aus ihren signierten Releases, die Skills und jeden MCP-Server, repariert, was nicht stimmt, und prüft alles noch einmal. Lade nichts von Hand herunter, installiere nichts von Hand und stoppe oder beende nie eine laufende App. Führe dann jeden aufgeführten Onboarding-Schritt eines Produkts aus, den ein Agent ausführen darf, frag mich im Chat nie nach einem Schlüssel oder Passwort (die Tools öffnen dafür ihre eigenen verdeckten Eingabefelder) und schließe mit npx --yes @passioncode-ai/passioncode@latest doctor ab. Sag mir kurz, was du eingerichtet oder repariert hast, was noch fehlschlägt, und die nummerierten Schritte, die nur ich erledigen kann, etwa die Anmeldung, und erinnere mich daran, dich neu zu starten, damit die neuen Skills und MCP-Server geladen werden.

Fabric ist eine frühe Vorschau: Der Befehl installiert es, wenn Docker und die Supabase CLI auf deinem Computer sind, und sagt dir sonst, was fehlt. Lieber von Hand? Die fünf Schritte unten sind dieselbe Einrichtung, ein Tool nach dem anderen.

## Schritte

01

### Skills installieren

Der PassionCode.ai-Launcher installiert die Fabric-Agent-Adapter-Skills, Observatory Log und die Arbeitsregeln in deinen Coding-Agenten. Ohne Account und ohne Schlüssel. Fabric installiert er nicht: Das ist der nächste Schritt, ein separater Download.

npx @passioncode-ai/passioncode@latest update

Launcher 0.2.1 · danach den Agenten neu starten · automatische Updates sind an; schalte sie ab,

02

### Fabric hinzufügen

Fabric ist das Zuhause für deine Projekte und ihre Agenten: Jedes Projekt hält dort Zweck, Board, Entscheidungen und Releases. Der erste Bildschirm bietet vier Aktionen: einen Agenten erstellen, einen vorhandenen anpassen, ein Projekt öffnen oder eines erstellen. Es ist eine frühe Vorschau: Es braucht Docker und die Supabase CLI, und seine Unterhaltung speichert Nachrichten, antwortet aber noch nicht.

Fabric herunterladen

0.3.5

für macOS

↓

Voraussetzungen und Einschränkungen

Apple silicon und Intel · signiert und notarisiert · SHA-256 1e54fe557f2752817bb00303a93d595c812609b355f6850420026663cf39b98b · Release Notes

03

### Einen Agenten erstellen oder anpassen

Bitte in Claude Code oder Codex um das, was du brauchst, oder starte in Fabric mit den Aktionen zum Erstellen und Anpassen; die Arbeit läuft in beiden Fällen in der Konsole deines Coding-Agenten. Der Skill des Fabric Agent Adapter stellt zuerst seine Fragen und zeigt seinen Plan, bevor er etwas ändert; das Anpassen läuft auf einem neuen Branch fabric-adapter. Du bekommst einen Vertrag, ein Dashboard, Tests und einen Konformitätsbericht.

neu Erstelle einen Fabric-Agenten, der jeden Morgen unsere App-Store-Rezensionen prüft und Antworten entwirft

anpassen Passe dieses Repository an Fabric an

04

### Laufen lassen und ansehen

Fabric Dashboards zeigt jeden lokalen Agentendienst in einem Fenster; dein Agent kann sie über MCP starten, stoppen und öffnen.

Fabric Dashboards herunterladen

0.7.9

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

05

### Den nächsten Agenten zum selben Projekt hinzufügen

Baue den nächsten Agenten genauso und gib ihm dasselbe Projekt in Fabric. Claude Code, Kilo Code und Hermes Agent, die aus Fabric gestartet werden, teilen Board, Gedächtnis und Übergaben dieses Projekts, sodass einer dort weitermacht, wo der andere aufgehört hat. Welche Agenten sich heute verbinden

EIN TOOL, DAS WIR EMPFEHLEN

## Agenten, die zu Ende bringen,

## was sie anfangen

Für die Änderungen, die deine Agenten vornehmen, empfehlen wir die task-pipeline– ein eigenständiger Open-Source-Skill aus der Sammlung sshlg-skills: Er führt jede Änderung vom Briefing bis zur Abnahme und geht erst weiter, wenn jedes Gate bestanden ist.

npx sshlg-skills install

task-pipeline auf GitHub · der Skill gehört nicht zu PassionCode.ai und braucht nichts davon

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

Designsystem

Datenschutz

commercial@passioncode.ai

X

↗
