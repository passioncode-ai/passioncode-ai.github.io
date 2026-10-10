Contract: brand-contract v1

<!-- Generated from de/inbox/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Inbox | Mail, bei der das Wichtige zuerst kommt · macOS-Vorschau | PassionCode.ai

Fabric Inbox ist das Mail-Tool von Fabric und funktioniert eigenständig: Gmail- und Cloudflare-Postfächer in einer Liste, wichtige Mails zuerst, und Agenten auf deinen eigenen Adressen. Entwicklungsvorschau für macOS.

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

GitHub

↗

FABRIC INBOX · ENTWICKLUNGSVORSCHAU

# Deine Mail

# Wichtiges zuerst

Bring Gmail- und Cloudflare-Postfächer in eine Liste, mit wichtigen Mails zuerst und Agenten für deine eigenen Domains, die beantworten, was du erlaubst, und den Rest als Entwurf vorbereiten

IN DER FAMILIE Mail: die Adressen, die Agenten lesen und im Rahmen deiner Richtlinie beantworten. Die ganze Familie

Für macOS herunterladen

↓

Ansehen, was es kann

↓

Entwicklungsvorschau 0.14.0 · macOS 12 oder neuer · Open Source unter AGPL-3.0

FABRIC INBOX / MAIL + AGENTEN

WICHTIG

+

BEANTWORTET

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

FABRIC INBOX HOLEN

## Eine Entwicklungsvorschau

## für deinen Mac

Neueste Vorschau: 0.14.0. Die Mac-App erstellt ihren Mailserver in deinem eigenen Cloudflare-Account und öffnet ihn; deine Mail bleibt bei deinen Accounts.

⌘

### macOS

Universal · Apple silicon + Intel · macOS 12 oder neuer
DMG-Installer · mit Developer ID signiert und von Apple notarisiert

Für macOS herunterladen

↓

Öffne das DMG und ziehe Fabric Inbox in den Ordner „Programme“.

☰

### Bevor du es öffnest

Wähle beim ersten Öffnen Create my server on Cloudflare.

Ein Cloudflare-Account; der kostenlose Tarif reicht

Ein API-Token, den du in dessen Dashboard erstellst, mit den Berechtigungen, die die App auflistet

Für Gmail: ein OAuth-Client aus deinem eigenen Google-Cloud-Projekt

Die Einrichtungsanleitung listet jede Einstellung auf.

macOS-DMG · SHA-256

ade939562ca8a035402f92927c308af4882d1b260abad879f7d41adcc7a14a24

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

### Einen Schlüssel erstellen

Öffne in der App Einstellungen → Agent-Zugriff. Wähle einen Namen, eine Stufe (read, mail oder admin) und ob er senden darf. Das Secret wird nur einmal angezeigt.

02

### Deinen Agenten verbinden

Die App gibt den ganzen Befehl aus: claude mcp add --transport http fabric-inbox https://<your-server>/mcp mit den beiden Headern des Schlüssels. Dann frag nach list_accounts.

02 / DIE PASSIONCODE-FAMILIE

## Ein Tool mit eigener Aufgabe

Inbox kümmert sich um Mail. Switchboard verwaltet Accounts für Claude Code und Codex. Project Observatory behält die Projekte im Blick, an denen diese Agenten arbeiten. Fabric ist der KI-Agent in der Rolle des CEO, den wir bauen, um die Arbeit zu koordinieren.

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

Nein. Inbox ist ein Mailprogramm; seine Agenten beantworten deine Adressen im Rahmen der Regeln, die du festlegst. Fabric ist unser KI-Agent in der Rolle des CEO, in früher Vorschau. Sie gehören zum selben Toolkit und haben unterschiedliche Rollen.

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
