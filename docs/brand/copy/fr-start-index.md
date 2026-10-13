Contract: brand-contract v1

<!-- Generated from fr/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Premiers pas | Installez votre espace de travail pour agents IA | PassionCode.ai

Installez PassionCode.ai en une commande, ou avec un prompt pour Claude Code ou Codex : les outils, leurs serveurs MCP et les skills. La même commande vérifie et répare une installation existante. Gratuit et open source.

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

Español

Português (Brasil)

简体中文

日本語

Obtenir les outils

↓

Premiers pas · gratuit et open source

# D’un Mac vide à votre premier agent

Créez des agents qui continuent de travailler et savent ce que les autres ont fait. Une commande installe les outils, et la même commande les vérifie ensuite

Nécessite Node.js 18+ et Claude Code ou Codex Fabric nécessite macOS sur Apple silicon ou Intel

→

Une commande

01

Installez les skills

02

Ajoutez Fabric

03

Créez ou adaptez un agent

04

Lancez-le et regardez-le

05

Ajoutez l’agent suivant

+

Contribuer

UNE COMMANDE

## Tout installer,

## ou vérifier ce que vous avez

Une commande installe les outils que vous choisissez depuis leurs versions signées, connecte leurs serveurs MCP à Claude Code, Codex, Gemini CLI et Kimi Code, et ajoute les skills. Sur un ordinateur déjà configuré, la même commande vérifie tout, répare ce qui ne va pas et montre ce qui a changé.

npx @passioncode-ai/passioncode@latest setup

Nécessite Node.js 18+ · installe les applications sur macOS ; sur Linux et Windows, elle configure les skills et les serveurs MCP · elle n’installe rien dont la signature, la somme de contrôle ou la notarisation échoue · pour vérifier sans rien changer :

npx @passioncode-ai/passioncode@latest doctor

### Ou laissez votre agent de code s’en charger

Copiez ce prompt dans Claude Code, Codex ou un autre agent de code. Il lance la commande, fait ce qu’il peut et vous donne une courte liste de ce que vous seul pouvez faire : vous connecter, autoriser un accès, saisir une clé dans la fenêtre propre à l’outil.

Installe PassionCode.ai sur cet ordinateur, ou vérifie-le et répare-le s’il est déjà installé. Lance npx --yes @passioncode-ai/passioncode@latest setup --yes --json (il faut Node 18 ou plus récent) et lis son JSON : la commande installe les applications manquantes depuis leurs versions signées, les skills et chaque serveur MCP, répare ce qui ne va pas et vérifie tout à nouveau. Ne télécharge et n’installe rien à la main, et n’arrête ni ne tue jamais une application en cours d’exécution. Exécute ensuite chaque étape d’intégration de produit listée qu’un agent a le droit d’exécuter, ne me demande jamais de clé ni de mot de passe dans le chat (les outils ouvrent leur propre champ de saisie masqué), et termine par npx --yes @passioncode-ai/passioncode@latest doctor. Dis-moi brièvement ce que tu as installé ou réparé, ce qui échoue encore, et les étapes numérotées que je suis seul à pouvoir faire, comme me connecter, et rappelle-moi de te redémarrer pour que les nouveaux skills et serveurs MCP se chargent.

Fabric est une préversion : la commande l’installe quand Docker et la CLI Supabase sont sur votre ordinateur, et sinon vous dit quoi ajouter. Vous préférez le faire à la main ? Les cinq étapes ci-dessous sont la même installation, un outil à la fois.

## Étapes

01

### Installez les skills

Le lanceur PassionCode.ai installe les skills Fabric Agent Adapter, Observatory Log et les règles de travail dans votre agent de code. Sans compte et sans clé. Il n’installe pas Fabric : c’est l’étape suivante, un téléchargement à part.

npx @passioncode-ai/passioncode@latest update

Lanceur 0.2.0 · redémarrez ensuite votre agent · les mises à jour automatiques sont activées ; désactivez-les

02

### Ajoutez Fabric

Fabric est le foyer de vos projets et de leurs agents : chaque projet y garde son objectif, son tableau, ses décisions et ses versions. Son premier écran propose quatre actions : créer un agent, adapter un agent existant, ouvrir un projet ou en créer un. C’est une préversion : elle nécessite Docker et la CLI Supabase, et sa conversation enregistre les messages mais ne répond pas encore.

Télécharger Fabric

0.3.5

pour macOS

↓

Prérequis et limites

Apple silicon et Intel · signé et notarisé · SHA-256 1e54fe557f2752817bb00303a93d595c812609b355f6850420026663cf39b98b · notes de version

03

### Créez ou adaptez un agent

Dans Claude Code ou Codex, demandez ce dont vous avez besoin, ou partez des actions Créer et Adapter de Fabric ; dans les deux cas, le travail se fait dans la console de votre agent de code. Le skill Fabric Agent Adapter pose d’abord ses questions et montre son plan avant de modifier quoi que ce soit ; l’adaptation se fait sur une nouvelle branche fabric-adapter. Vous obtenez un contrat, un tableau de bord, des tests et un rapport de conformité.

nouveau Créez un agent Fabric qui consulte chaque matin les avis sur notre app store et rédige les réponses

adapter Adaptez ce dépôt à Fabric

04

### Lancez-le et regardez-le

Fabric Dashboards affiche tous les services d’agents locaux dans une seule fenêtre ; votre agent peut les démarrer, les arrêter et les ouvrir via MCP.

Télécharger Fabric Dashboards

0.7.8

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

05

### Ajoutez l’agent suivant au même projet

Construisez le prochain agent de la même façon et donnez-lui le même projet dans Fabric. Claude Code, Kilo Code et Hermes Agent lancés depuis Fabric partagent le tableau, la mémoire et les passations de ce projet : l’un reprend là où l’autre s’est arrêté. Quels agents se connectent aujourd’hui

UN OUTIL QUE NOUS RECOMMANDONS

## Des agents qui terminent

## ce qu’ils commencent

Pour les changements que font vos agents, nous recommandons task-pipeline, un skill open source distinct, issu de la collection sshlg-skills : il mène chaque changement du brief à la recette et n’avance pas tant que chaque validation n’est pas passée.

npx sshlg-skills install

task-pipeline sur GitHub · il ne fait pas partie de PassionCode.ai et n’en dépend en rien

CONTRIBUER

## Vous avez trouvé quelque chose à corriger ?

## Envoyez une pull request

Chaque dépôt de produit est public et indique sa commande de test dans AGENTS.md. Suivez les règles de l’organisation dans CONTRIBUTING.md et ouvrez une pull request ; en l’ouvrant, vous acceptez le fichier CLA.md.

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

POUR LES ORGANISATIONS

## Vous le voulez en marche

## pour toute votre équipe ?

Nous cartographions vos processus, estimons ce que les agents peuvent prendre en charge et mettons le tout en place avec vous ou pour vous.

Estimation et demande

→

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

X

↗
