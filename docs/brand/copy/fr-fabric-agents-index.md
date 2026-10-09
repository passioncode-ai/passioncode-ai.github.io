Contract: brand-contract v1

<!-- Generated from fr/fabric/agents/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Agents de code compatibles avec Fabric | Fabric | PassionCode.ai

Au 8 octobre 2026, Fabric 0.3.2 connecte Claude Code, Kilo Code et Hermes Agent ; Codex et Cline s’exécutent dans Fabric sans ses outils, et cinq autres agents sont les prochains au programme.

Aller au contenu

PassionCode

.ai

Vision

Pour vous

Pour les organisations

Les outils

À propos

Français

English

Русский

Deutsch

Polski

한국어

简体中文

日本語

Télécharger

↓

FABRIC · AGENTS DE CODE PRIS EN CHARGE

# Les agents de code

# compatibles avec Fabric

Quels agents Fabric peut lancer dans votre projet, lesquels reçoivent ses propres outils et lesquels viennent ensuite

Au 8 octobre 2026 · l’application publiée est Fabric 0.3.2

Dans l’application publiée, Fabric connecte Claude Code, Kilo Code et Hermes Agent, qu’il lance dans le terminal d’un projet en leur donnant les outils de Fabric pour cette session. Codex et Cline s’exécutent dans Fabric, mais n’ont pas encore les outils de Fabric. Cinq autres agents suivent au programme, puis le reste de la liste ci-dessous. Fabric Switchboard bascule entre les comptes d’abonnement de Claude Code et de Codex, et entre les comptes à clé API des autres agents via Switchboard.

01 / CE QUE « COMPATIBLE » VEUT DIRE

## Trois niveaux

## Chaque agent en occupe un

« Compatible avec Fabric » peut vouloir dire plusieurs choses : cette page indique donc le niveau de chaque agent.

CONNECTÉ

### Lancé avec les outils de Fabric

Fabric lance l’agent dans le terminal d’un projet. Pour cette session seulement, l’agent reçoit les outils propres à Fabric : prise de tâches, passations, mémoire et tableau. Cet accès passe par un identifiant valable pour une seule session, et rien n’est écrit dans les réglages de l’agent.

S’EXÉCUTE DANS FABRIC

### Lancé dans le dossier du projet

Fabric lance l’agent dans le dossier du projet : il travaille donc sur les fichiers de ce projet. Il n’a pas encore les outils de Fabric.

PRÉVU

### Au programme, dans l’ordre

Nous prévoyons de connecter l’agent. Le plan ci-dessous donne un ordre, pas de dates.

02 / CONNECTÉS

## Connectés

## Les outils de Fabric pour la session

Claude Code, Kilo Code et Hermes Agent, tous trois dans l’application publiée.

Agents connectés, au 8 octobre 2026

Agent

Site officiel

État

Claude Code

claude.com

Publié, dans Fabric 0.3

Kilo Code

kilo.ai

Publié, dans Fabric 0.3.2

Hermes Agent

hermes-agent.nousresearch.com

Publié, dans Fabric 0.3.2

Kilo Code lit ses réglages de session dans sa variable KILO_CONFIG_CONTENT, et le fichier kilo.json propre au projet ne peut pas les remplacer. Nous l’avons vérifié sur Kilo 7.4.17 le 5 octobre 2026. Hermes Agent se connecte via le protocole ouvert Agent Client Protocol : Fabric ouvre sa session et lui transmet les outils de Fabric par un pont local, vérifié sur Hermes 0.21.4 le même jour. Hermes doit avoir un modèle choisi dans sa propre configuration avant de pouvoir répondre.

03 / S’EXÉCUTENT DANS FABRIC

## S’exécutent dans Fabric

## Pas encore connectés

Fabric lance l’agent dans le dossier du projet. Il y travaille sans les outils de Fabric.

Agents qui s’exécutent dans Fabric, au 8 octobre 2026

Agent

Site officiel

État

Codex

github.com/openai/codex

S’exécute dans le dossier du projet, pas encore d’outils Fabric

Cline

cline.bot

Publié, dans Fabric 0.3.2 ; demande l’autorisation avant chaque outil, pas encore d’outils Fabric

04 / PRÉVUS

## Prévus

## Dans cet ordre

Cinq viennent ensuite en groupe, et nous examinons les neuf derniers au cas par cas. Aucun n’a encore les outils de Fabric.

Agents de code prévus, dans l’ordre, au 8 octobre 2026

Agent

Site officiel

Ordre

omp (oh-my-pi)

omp.sh

Ensuite, en groupe

pi

pi.dev

Ensuite, en groupe

OpenClaw

openclaw.ai

Ensuite, en groupe

OpenHands

openhands.dev

Ensuite, en groupe

Cursor CLI

cursor.com/cli

Ensuite, en groupe

Command Code

commandcode.ai

Au cas par cas

DeepSeek Harness

deepseek.com/harness

Au cas par cas

LangChain Deep Agents (dcode)

docs.langchain.com

Au cas par cas

Letta

letta.com

Au cas par cas

Strix

strix.ai

Au cas par cas

goose

goose-docs.ai

Au cas par cas

Qwen Code

github.com/QwenLM/qwen-code

Au cas par cas

Gemini CLI

geminicli.com

Au cas par cas

OpenCode

opencode.ai

Au cas par cas

### Applications de bureau et éditeurs

Zed, ZCode, Proto, CodeGPT, Freebuff et HackerAI sont des applications de bureau et des éditeurs qu’un autre programme ne peut pas lancer. Ils peuvent en revanche être clients du hub local de Fabric. Chacun a besoin de son propre point d’entrée documenté ; ces points d’entrée sont prévus, pas encore écrits.

Applications de bureau et éditeurs prévus, au 8 octobre 2026

Application

Site officiel

Mode de connexion

Zed

zed.dev

Client du hub local, point d’entrée prévu

ZCode

zcode.z.ai

Client du hub local, point d’entrée prévu

Proto

proto.erp.ai

Client du hub local, point d’entrée prévu

CodeGPT

codegpt.co

Client du hub local, point d’entrée prévu

Freebuff

freebuff.com

Client du hub local, point d’entrée prévu

HackerAI

hackerai.co

Client du hub local, point d’entrée prévu

05 / COMMENT SE CONNECTENT LES AGENTS PRÉVUS

## Un protocole ouvert

## pour les agents prévus

Les agents prévus se connectent via le protocole Agent Client Protocol (ACP). À l’ouverture d’une session, il transmet les serveurs MCP de cette session, et Fabric peut piloter tout agent qui le parle.

06 / POURQUOI CES AGENTS

## Choisis d’après

## ce que les gens utilisent

Nous les avons choisis d’après le classement public des applications d’OpenRouter, consulté le 5 octobre 2026. Dans son top 30 quotidien, 15 sont des agents de code ou des harness d’agents. Hermes Agent, connecté depuis Fabric 0.3.2, y a la plus grande part.

07 / COMPTES

## Changement de compte

## Claude Code et Codex aujourd’hui

Fabric Switchboard bascule entre les comptes d’abonnement de Claude Code et de Codex. Depuis la 0.6.1, il fonctionne aussi avec les autres agents : chacun reçoit les outils de Switchboard, et un agent qui accepte un point de terminaison personnalisé peut faire passer ses requêtes par Switchboard, qui bascule alors entre ses comptes à clé API. Quels agents, et comment chacun se connecte.

Télécharger pour macOS

↓

Découvrir Switchboard

↗

PassionCode

.ai

Du vibe coding au passion coding

Commencer

Vision

Pour les organisations

Switchboard

Observatory

Inbox

Dashboards

Fabric

GitHub et code source

À propos

Système de design

Confidentialité

commercial@passioncode.ai

Twitter

↗
