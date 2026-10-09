Contract: brand-contract v1

<!-- Generated from de/fabric/agents/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Coding-Agenten, mit denen Fabric arbeitet | Fabric | PassionCode.ai

Stand 8. Oktober 2026: Fabric 0.3.2 verbindet Claude Code, Kilo Code und Hermes Agent, Codex und Cline laufen in Fabric ohne dessen Tools, und fünf weitere Agenten stehen als Nächstes im Plan.

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

Download

↓

FABRIC · UNTERSTÜTZTE CODING-AGENTEN

# Coding-Agenten,

# mit denen Fabric arbeitet

Welche Agenten Fabric in deinem Projekt starten kann, welche davon Fabrics eigene Tools bekommen und welche als Nächstes folgen

Stand: 8. Oktober 2026 · die veröffentlichte App ist Fabric 0.3.2

In der veröffentlichten App verbindet Fabric Claude Code, Kilo Code und Hermes Agent: Es startet den Agenten im Terminal eines Projekts und gibt ihm für diese Sitzung die Tools von Fabric. Codex und Cline laufen in Fabric, haben aber noch nicht die Tools von Fabric. Fünf weitere Agenten folgen als Nächstes im Plan, danach die übrigen weiter unten. Fabric Switchboard wechselt Abo-Accounts für Claude Code und Codex sowie API-Key-Accounts für die anderen Agenten über Switchboard.

01 / WAS „UNTERSTÜTZT“ BEDEUTET

## Drei Stufen

## Jeder Agent steht auf genau einer

„Funktioniert mit Fabric“ kann Verschiedenes bedeuten, deshalb nennt diese Seite für jeden Agenten die Stufe.

VERBUNDEN

### Mit den Tools von Fabric gestartet

Fabric startet den Agenten im Terminal eines Projekts. Nur für diese Sitzung bekommt der Agent die eigenen Tools von Fabric: Claims, Übergaben, Gedächtnis und das Board. Ein Zugangsdatum für eine einzige Sitzung trägt diesen Zugriff, und in die eigenen Einstellungen des Agenten wird nichts geschrieben.

LÄUFT IN FABRIC

### Im Projektordner gestartet

Fabric startet den Agenten im Ordner des Projekts, sodass er an dessen Dateien arbeitet. Er hat noch nicht die Tools von Fabric.

GEPLANT

### Im Plan, der Reihe nach

Wir wollen den Agenten verbinden. Der Plan unten nennt eine Reihenfolge, keine Termine.

02 / VERBUNDEN

## Verbunden

## Die Tools von Fabric für die Sitzung

Claude Code, Kilo Code und Hermes Agent, alle drei in der veröffentlichten App.

Verbundene Agenten, Stand 8. Oktober 2026

Agent

Offizielle Website

Stand der Dinge

Claude Code

claude.com

Veröffentlicht, in Fabric 0.3

Kilo Code

kilo.ai

Veröffentlicht, in Fabric 0.3.2

Hermes Agent

hermes-agent.nousresearch.com

Veröffentlicht, in Fabric 0.3.2

Kilo Code übernimmt seine Sitzungseinstellungen aus seiner KILO_CONFIG_CONTENT -Variable, und die kilo.json eines Projekts kann sie nicht überschreiben. Wir haben das am 5. Oktober 2026 mit Kilo 7.4.17 geprüft. Hermes Agent verbindet sich über das offene Agent Client Protocol: Fabric öffnet seine Sitzung und gibt ihm die Tools von Fabric über eine lokale Brücke, am selben Tag mit Hermes 0.21.4 geprüft. Hermes braucht ein in der eigenen Einrichtung gewähltes Modell, bevor es antworten kann.

03 / LÄUFT IN FABRIC

## Läuft in Fabric

## Noch nicht verbunden

Fabric startet den Agenten im Projektordner. Dort arbeitet er ohne die Tools von Fabric.

Agenten, die in Fabric laufen, Stand 8. Oktober 2026

Agent

Offizielle Website

Stand der Dinge

Codex

github.com/openai/codex

Läuft im Projektordner, noch keine Fabric-Tools

Cline

cline.bot

Veröffentlicht, in Fabric 0.3.2; fragt vor jedem Tool nach, noch keine Fabric-Tools

04 / GEPLANT

## Geplant

## In dieser Reihenfolge

Fünf folgen als Gruppe als Nächstes, die letzten neun nehmen wir Fall für Fall. Keiner von ihnen hat bisher die Tools von Fabric.

Geplante Coding-Agenten in Reihenfolge, Stand 8. Oktober 2026

Agent

Offizielle Website

Reihenfolge

omp (oh-my-pi)

omp.sh

Als Nächstes, als Gruppe

pi

pi.dev

Als Nächstes, als Gruppe

OpenClaw

openclaw.ai

Als Nächstes, als Gruppe

OpenHands

openhands.dev

Als Nächstes, als Gruppe

Cursor CLI

cursor.com/cli

Als Nächstes, als Gruppe

Command Code

commandcode.ai

Fall für Fall

DeepSeek Harness

deepseek.com/harness

Fall für Fall

LangChain Deep Agents (dcode)

docs.langchain.com

Fall für Fall

Letta

letta.com

Fall für Fall

Strix

strix.ai

Fall für Fall

goose

goose-docs.ai

Fall für Fall

Qwen Code

github.com/QwenLM/qwen-code

Fall für Fall

Gemini CLI

geminicli.com

Fall für Fall

OpenCode

opencode.ai

Fall für Fall

### Desktop-Apps und Editoren

Zed, ZCode, Proto, CodeGPT, Freebuff und HackerAI sind Desktop-Apps und Editoren, die ein anderes Programm nicht starten kann. Sie können stattdessen Clients des lokalen Hubs von Fabric sein. Jeder braucht einen eigenen dokumentierten Eintrag, und diese Einträge sind geplant, aber noch nicht geschrieben.

Geplante Desktop-Apps und Editoren, Stand 8. Oktober 2026

App

Offizielle Website

Weg

Zed

zed.dev

Client des lokalen Hubs, Eintrag geplant

ZCode

zcode.z.ai

Client des lokalen Hubs, Eintrag geplant

Proto

proto.erp.ai

Client des lokalen Hubs, Eintrag geplant

CodeGPT

codegpt.co

Client des lokalen Hubs, Eintrag geplant

Freebuff

freebuff.com

Client des lokalen Hubs, Eintrag geplant

HackerAI

hackerai.co

Client des lokalen Hubs, Eintrag geplant

05 / WIE DIE GEPLANTEN AGENTEN SICH VERBINDEN

## Ein offenes Protokoll

## Für die geplanten Agenten

Die geplanten Agenten verbinden sich über das Agent Client Protocol (ACP). Sein Sitzungsaufbau trägt die MCP-Server der Sitzung, und Fabric steuert jeden Agenten, der es spricht.

06 / WARUM DIESE AGENTEN

## Ausgewählt nach dem,

## was Menschen nutzen

Wir haben sie ausgewählt anhand des öffentlichen App-Rankings von OpenRouter, abgelesen am 5. Oktober 2026. Von den täglichen Top 30 sind 15 Coding-Agenten oder Agent-Harnesses. Hermes Agent, seit Fabric 0.3.2 verbunden, hat den größten Anteil.

07 / ACCOUNTS

## Account-Wechsel

## Heute Claude Code und Codex

Fabric Switchboard wechselt Abo-Accounts für Claude Code und Codex. Seit 0.6.1 arbeitet es auch mit den anderen Agenten: Jeder bekommt die Tools von Switchboard, und ein Agent, der einen eigenen Endpunkt akzeptiert, kann seine Anfragen über Switchboard senden, das seine API-Key-Accounts wechselt. Welche Agenten und wie jeder sich verbindet.

Für macOS herunterladen

↓

Switchboard entdecken

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
