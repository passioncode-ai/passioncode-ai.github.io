Contract: brand-contract v1

<!-- Generated from de/switchboard/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Switchboard | Account-Manager für Claude Code und Codex | PassionCode.ai

Verwalte Accounts für Claude Code und Codex, prüfe Nutzungslimits und wechsle verwaltete Anfragen. Lade Switchboard für macOS und Windows herunter.

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

Español

Português (Brasil)

Download

↓

FABRIC SWITCHBOARD · VON PASSIONCODE

# Deine Accounts

# Ein klarerer Wechsel

Behalte die Accounts von Claude Code und Codex CLI in einer lokalen Werkbank: gemeldete Nutzung prüfen, Arbeit und Privates trennen und entscheiden, was deine nächste Anfrage bearbeitet

IN DER FAMILIE Die Accounts: auf welchem Account jeder Agent läuft, mit seinen Nutzungslimits im Blick. Die ganze Familie

Switchboard herunterladen

↓

Quellcode ansehen

↗

Open Source · macOS + Windows · Desktop + CLI

EIN TOOL / DEINE ACCOUNTS

CLAUDE CODE

+

CODEX CLI

SWITCHBOARD HOLEN

## Wähle deine Plattform

Neuester Release: 0.6.14. Beide Downloads enthalten die Desktop-App und die switchboard CLI.

⌘

### macOS

Universal · Apple silicon + Intel
macOS 14 oder neuer · ZIP-Archiv

Für macOS herunterladen

↓

Mit Developer ID signiert und von Apple notarisiert. Öffne das ZIP, zieh Fabric Switchboard in „Programme“ und öffne die App von dort.

⊞

### Windows

x64 · Desktop-Installer + CLI
ZIP-Archiv · WebView2 erforderlich

Für Windows herunterladen

↓

Nativ unter Windows gebaut und noch nicht mit Authenticode signiert, daher kann SmartScreen eine Warnung anzeigen. Der Installer enthält die CLI.

☰

### Bevor du es öffnest

Switchboard verwaltet Accounts und startet die offiziellen CLIs. Es ersetzt sie nicht.

Claude Code oder Codex CLI, separat installiert. Switchboard enthält weder ein Anbieter-Abo noch API-Guthaben.

macOS 14 oder neuer, auf Apple silicon oder Intel.

Windows x64 mit WebView2. Der Windows-Build ist noch nicht mit Authenticode signiert.

Die App läuft nach dem Schließen ihres Fensters in der Menüleiste weiter und startet bei der Anmeldung; beende sie über ihr Menü.

macOS-ZIP · SHA-256

7daffb205c73ca65c2a279d46baf1a9e99ff7ff0a7d6226243f4cad63989f64e

Windows-ZIP · SHA-256

4bf62562c216100b4c3adf4864fa9260764b20301f952345f38aca79c34a7eac

Vergleiche vor dem Öffnen: shasum -a 256 im Terminal, Get-FileHash in PowerShell. Ein abweichender Wert bedeutet eine andere Datei; lade sie erneut herunter.

Versionshinweise und Prüfsummen

↗

Installationshinweise

↗

Alle Releases

↗

Lies die Versionshinweise, bevor du ein Upgrade machst. Die Abnahme mit echten Anbieter-Accounts auf jeder Plattform wird offen im Repository verfolgt.

DAS PROBLEM

## Limits sind erschöpft

## bevor die Arbeit erledigt ist

Eine lange Sitzung kann mitten in einer Aufgabe das Nutzungslimit eines Accounts erreichen. Dann steht die Arbeit still, während du dich abmeldest, einen anderen Account suchst und dich wieder anmeldest.

Switchboard hält die Arbeit am Laufen. Mit aktivierter Rotation geht die nächste Anfrage an einen anderen Account im selben Pool, und die Sitzung bleibt offen.

IM INNEREN VON SWITCHBOARD

## Eine Ansicht deiner Accounts

Die echte Oberfläche von Switchboard, gezeigt mit synthetischen Demo-Accounts.

Browser-Demo · keine echten Accounts, Zugangsdaten oder Anbieteranfragen

EINE LOKALE WERKBANK

## Weniger Account-Jonglieren

## Mehr Kontext auf einen Blick

01 / ACCOUNTS

### Fang dort an, wo du stehst

Übernimm den aktuellen CLI-Account ausdrücklich, melde dich über die offizielle CLI an oder importiere Claude-Swap-Profile. Du entscheidest, was du in Switchboard mitbringst.

02 / GRENZEN

### Arbeit bleibt bei Arbeit

Gruppiere Accounts in Pools wie „Arbeit“ und „Privat“. Das Routing bleibt innerhalb desselben Anbieters und Pools.

03 / NUTZUNG

### Sieh die Limits, die du hast

Sieh dir gemeldete Kontingentfenster, Reset-Zeiten und das Alter jeder Prüfung an. Nicht unterstützte oder unbekannte Nutzung bleibt deutlich markiert.

04 / WECHSELN

### Die nächste Anfrage ändern

Wähle eine verwaltete Route oder aktiviere kontingentbewusste Rotation. Eine laufende Antwort behält die Identität, mit der sie begonnen hat.

05 / LOKALE SPEICHERUNG

### Zugangsdaten bleiben auf deinem Rechner

Gespeicherte Secrets liegen im macOS-Schlüsselbund oder in Windows DPAPI. Isolierte CLI-Starts erzeugen die lokale Kopie des Access-Tokens, die der offizielle Client braucht.

06 / DEIN WORKFLOW

### Nutze ein Fenster oder dein Terminal

Desktop-App und CLI nutzen dieselbe Runtime. Lass für verwaltete Sitzungen die App oder switchboard serve laufen.

FÜR AGENTEN · NEU IN 0.4

## Dein Agent sieht

## seine eigenen Limits

Switchboard enthält switchboard mcp, einen lokalen MCP-Server. Claude Code, Codex oder ein anderer MCP-Client kann lesen, wie viel Kontingent noch übrig ist, und seine nächste Anfrage auf einen anderen Account umlegen. Kein Tool nimmt Zugangsdaten an oder gibt welche zurück.

01 / NUTZUNG

### Lies, was noch übrig ist

Verbleibendes Kontingent je Account und Fenster, mit Reset-Zeiten und dem Alter jeder Prüfung. Unbekannte Nutzung wird als unbekannt gemeldet, nie als null.

02 / WECHSELN

### Wechsle vor dem Limit

Ein Agent kann den Account für die nächste Anfrage seiner Sitzung wählen, innerhalb desselben Anbieters und Pools. Die Claude-Code-Anmeldung für jede Sitzung auf dem Mac zu ändern, braucht ein ausdrückliches global Flag.

03 / PROJEKTREGELN

### Optionale Projektregeln

Starte einen Projektordner auf einem Account deiner Wahl, wenn du möchtest. Regeln bleiben in der App sichtbar, lassen sich pausieren oder befristen und stoppen die Rotation nie.

01

### Start aus Switchboard

Sitzungen, die du aus der App oder der CLI startest, bekommen die Tools, wenn die switchboard CLI gefunden wird. Isolierte Sitzungen bekommen die schreibgeschützten Tools. Unter macOS verknüpft das Agents-Panel die CLI in der App mit ~/.local/bin.

02

### Oder verbinde einen Agenten selbst

claude mcp add --scope user switchboard -- switchboard mcp
codex mcp add switchboard -- switchboard mcp

DIE ERSTE SITZUNG

## Bring einen Account mit

## Wähle, wie sie läuft

01

### Account hinzufügen

Übernimm deine aktuelle Autorisierung oder nutze die Anmeldung über die offizielle CLI. Gib dem Account ein Label und einen Pool.

02

### Prüfe, was bekannt ist

Sieh dir Account-Identität und gemeldete Nutzung an. Die verwaltete Auswahl und der aktuelle native CLI-Account werden getrennt angezeigt.

03

### Starte deine Sitzung

Nutze den verwalteten Modus, um zwischen Anfragen zu wechseln, oder den isolierten Modus für eine direkte Sitzung, die an einen Account gebunden ist.

BEVOR DU LOSLEGST

## Ein paar nützliche Unterscheidungen

Ersetzt Switchboard Claude Code oder Codex?

Nein. Es verwaltet Accounts und startet die offiziellen CLIs. Installiere Claude Code oder Codex separat für Anmeldung und Sitzungen. Switchboard enthält weder ein Anbieter-Abo noch API-Guthaben.

Ändert es automatisch meinen aktuellen CLI-Account?

Das Übernehmen ist eine ausdrückliche Aktion. Die Auswahl der verwalteten Route ist von der nativen Aktivierung getrennt. Die native Aktivierung bei Claude und die automatische Rotation sind Opt-in-Vorgänge; prüfe die Bestätigung, bevor du sie einschaltest.

Was ist der Unterschied zwischen verwaltet und isoliert?

Verwaltete Sitzungen senden Anfragen über einen lokalen Proxy und folgen bei späteren Anfragen deiner gewählten Route. Isolierte Sitzungen verbinden sich direkt über ein separates Account-Home; spätere Routenwechsel ändern sie nicht.

Ist Switchboard dasselbe wie Fabric?

Switchboard ist das Tool zur Account-Verwaltung, das es heute gibt. Fabric ist unser CEO-KI-Agent in früher Vorschau, der Agenten und Projekte koordiniert. Beide gehören zum PassionCode-Toolkit. Entdecke, was wir mit Fabric bauen.

Welche Agenten funktionieren mit Switchboard?

Claude Code, Codex und die anderen beliebten Coding-Agenten – Hermes, Kilo Code, Cline, Goose, OpenCode und mehr. Alle 30 ansehen und wie sich jeder verbindet.

Kann ein Projekt seine eigenen Accounts behalten?

Ja. Lege ein Projekt an, füge seine Ordner hinzu – zum Beispiel mehrere zusammengehörige Repositories – und wähle seine Accounts. Sitzungen, die aus diesen Ordnern starten, nutzen nur diese Accounts, der automatische Wechsel bleibt innerhalb davon, und Agenten, die in anderen Projekten arbeiten, wechseln nie auf sie.

Sendet Switchboard Daten?

Release-Builds zählen Installationen, Nutzungstage und wie viele Accounts verbunden sind, nach Anbieter und Typ. Sie senden niemals Account-Namen, E-Mail-Adressen, Anmeldungen, Pool-Namen oder was du mit deinen Accounts machst. Eine zufällige Installationsnummer, die sich die PassionCode.ai-Tools auf deinem Computer teilen, sorgt dafür, dass eine Person nur einmal gezählt wird. Schalte sie unter About → Share anonymous usage counts ab; der Schalter gilt für jedes PassionCode.ai-Tool. Was genau gesendet wird.

Kann ich es selbst prüfen oder bauen?

Ja. Switchboard ist Open Source unter der GNU AGPL-3.0. Für Nutzungen, die die AGPL nicht abdeckt, ist eine kommerzielle Lizenz erhältlich bei passioncode.ai/business. Releases bis einschließlich v0.3.1-beta.1 wurden unter MIT veröffentlicht und bleiben darunter verfügbar. Der aktuelle Download, 0.6.14, steht unter der AGPL. v0.4.0-beta.1 wurde unter PolyForm Noncommercial or Internal Use veröffentlicht und behält diese Lizenz. Das Repository enthält Build-Anleitung, Quellcode, Tests und Release-Nachweise.

TEIL DES PASSIONCODE-TOOLKITS

## Accounts sind nur ein Teil

## des Setups

Switchboard verwaltet Accounts für Claude Code und Codex. Project Observatory behält die Projekte im Blick, an denen diese Agenten arbeiten. Fabric Dashboards zeigt die lokalen Agentendienste auf deinem Mac in einem Fenster. Fabric, unser CEO-KI-Agent, ist in früher Vorschau.

Observatory entdecken

↗

Release von Fabric Dashboards

↗

Lerne Fabric kennen

↗

Alle Tools

↗

OPEN SOURCE · LOCAL FIRST

## Dein Setup, dein Quellcode

Probier es aus, sieh dir an, wie es funktioniert, und sag uns, wo es besser werden muss.

Switchboard herunterladen

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
