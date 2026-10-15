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

Installer

↓

Premiers pas · gratuit et open source

# D’un ordinateur vide à votre premier agent

Créez des agents qui continuent de travailler et savent ce que les autres ont fait. Une commande installe les outils, et la même commande les vérifie ensuite

Nécessite Node.js 18+ et Claude Code ou Codex Fabric nécessite Docker et la CLI Supabase sur tous les systèmes

→

Une commande

01

Créez ou adaptez un agent

02

Lancez-le et regardez-le

03

Ajoutez l’agent suivant

+

Contribuer

UNE COMMANDE

## Tout installer,

## ou vérifier ce que vous avez

Sur macOS, une commande installe les outils que vous choisissez depuis leurs versions signées, connecte leurs serveurs MCP à Claude Code, Codex, Gemini CLI et Kimi Code, et ajoute les skills. Sur Windows et Linux, téléchargez les applications depuis leurs pages, puis lancez la même commande pour les skills et les serveurs MCP. Sur un ordinateur déjà configuré, la même commande vérifie tout, répare ce qui ne va pas et montre ce qui a changé.

### Lancez-la vous-même

npx @passioncode-ai/passioncode@latest setup

Nécessite Node.js 18+ · la commande n’installe rien dont la signature, la somme de contrôle ou la notarisation échoue · redémarrez ensuite votre agent de code · pour vérifier sans rien changer :

npx @passioncode-ai/passioncode@latest doctor

### Ou laissez votre agent de code s’en charger

Copiez ce prompt dans Claude Code, Codex ou un autre agent de code. Il lance la commande, fait ce qu’il peut et vous donne une courte liste de ce que vous seul pouvez faire : vous connecter, autoriser un accès, saisir une clé dans la fenêtre propre à l’outil.

Installe PassionCode.ai sur cet ordinateur, ou vérifie-le et répare-le s’il est déjà installé. Lance npx --yes @passioncode-ai/passioncode@latest setup --yes --json (il faut Node 18 ou plus récent) et lis son JSON : sur macOS, la commande installe les applications manquantes depuis leurs versions signées, et sur Windows et Linux elle indique plutôt la page de téléchargement de chaque application ; partout, elle installe les skills et chaque serveur MCP, répare ce qui ne va pas et vérifie tout à nouveau. Ne télécharge et n’installe rien à la main, et n’arrête ni ne tue jamais une application en cours d’exécution. Exécute ensuite chaque étape d’intégration de produit listée qu’un agent a le droit d’exécuter, ne me demande jamais de clé ni de mot de passe dans le chat (les outils ouvrent leur propre champ de saisie masqué), et termine par npx --yes @passioncode-ai/passioncode@latest doctor. Dis-moi brièvement ce que tu as installé ou réparé, ce qui échoue encore, et les étapes numérotées que je suis seul à pouvoir faire, comme me connecter ou, sur Windows et Linux, installer les applications depuis leurs pages et relancer la commande, et rappelle-moi de te redémarrer pour que les nouveaux skills et serveurs MCP se chargent.

Fabric est une préversion et nécessite Docker et la CLI Supabase sur tous les systèmes. Sur macOS, la commande l’installe quand les deux sont sur votre ordinateur, et sinon vous dit quoi ajouter ; sur Windows et Linux, téléchargez-le d’abord depuis la page de Fabric et installez-le.

Vous préférez le faire à la main ?

01

### Ajoutez Fabric

Fabric est le foyer de vos projets et de leurs agents : chaque projet y garde son objectif, son tableau, ses décisions et ses versions. Son premier écran propose quatre actions : créer un agent, adapter un agent existant, ouvrir un projet ou en créer un. C’est une préversion : elle nécessite Docker et la CLI Supabase, et sa conversation enregistre les messages mais ne répond pas encore.

Télécharger Fabric

0.3.5

pour macOS

↓

Pour Windows et Linux

Prérequis et limites

Apple silicon et Intel · signé et notarisé · SHA-256 1e54fe557f2752817bb00303a93d595c812609b355f6850420026663cf39b98b · notes de version

02

### Ajoutez Fabric Dashboards

Fabric Dashboards affiche chaque service d’agent local dans une seule fenêtre. Téléchargez-le, puis connectez-le à votre agent de code via MCP.

Télécharger Fabric Dashboards

0.7.10

↓

Pour Windows et Linux

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Switchboard, Project Observatory et Fabric Inbox ont chacun leur propre téléchargement : Switchboard · Observatory · Inbox

## Étapes suivantes

01

### Créez ou adaptez un agent

Dans Claude Code ou Codex, demandez ce dont vous avez besoin, ou partez des actions Créer et Adapter de Fabric ; dans les deux cas, le travail se fait dans la console de votre agent de code. Le skill Fabric Agent Adapter pose d’abord ses questions et montre son plan avant de modifier quoi que ce soit ; l’adaptation se fait sur une nouvelle branche fabric-adapter. Vous obtenez un contrat, un tableau de bord, des tests et un rapport de conformité.

nouveau Créez un agent Fabric qui consulte chaque matin les avis sur notre app store et rédige les réponses

adapter Adaptez ce dépôt à Fabric

02

### Lancez-le et regardez-le

Fabric Dashboards affiche chaque service d’agent local dans une seule fenêtre ; votre agent peut les démarrer, les arrêter et les ouvrir via MCP. La commande l’installe sur macOS et le connecte à votre agent de code.

03

### Ajoutez l’agent suivant au même projet

Construisez le prochain agent de la même façon et donnez-lui le même projet dans Fabric. Les agents connectés à Fabric partagent le tableau, la mémoire et les passations d’un même projet : l’un reprend là où l’autre s’est arrêté. Quels agents se connectent aujourd’hui

Pour les changements que font vos agents, nous recommandons task-pipeline, un skill open source distinct : ce qu’il fait et comment l’installer

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

Investisseurs

Contribuer

Presse

Système de design

Confidentialité

commercial@passioncode.ai

X

↗
