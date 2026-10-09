Contract: brand-contract v1

<!-- Generated from fr/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Premiers pas | Installez votre espace de travail pour agents IA | PassionCode.ai

Installez les skills PassionCode.ai, ajoutez Fabric, créez votre premier agent Fabric avec Claude Code ou Codex, adaptez un projet existant, lancez-le dans Fabric Dashboards et ajoutez l’agent suivant à la même famille. Gratuit et open source.

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

Obtenir les outils

↓

Premiers pas · gratuit et open source

# D’un Mac vide à votre premier agent

Cessez de construire des agents qui se périment et ne se parlent pas. Cinq étapes, une vingtaine de minutes, du premier agent à une famille que vous voyez. Chaque étape est utile en soi : arrêtez-vous dès que le résultat vous suffit

Nécessite Node.js 18+ et Claude Code ou Codex Fabric nécessite macOS sur Apple silicon

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

## Étapes

01

### Installez les skills

Le lanceur PassionCode.ai installe les skills de Fabric Agent Adapter, Observatory Log et les règles de travail dans Claude Code, Codex et les autres agents pris en charge. Sans compte et sans clé.

npx @passioncode-ai/passioncode@latest update

Lanceur 0.1.31 · il installe les membres de la famille aux versions qu’il épingle · redémarrez ensuite votre agent. Les mises à jour automatiques sont activées par défaut ; désactivez-les si vous préférez.

02

### Ajoutez Fabric

Fabric est l’agent IA dans le rôle de CEO : chaque projet y trouve un foyer pour son objectif, son tableau, ses décisions et ses versions. C’est une préversion : elle nécessite Docker et la CLI Supabase, et sa conversation enregistre les messages mais ne répond pas encore.

Télécharger Fabric

0.3.2

pour macOS

↓

Prérequis et limites

Apple silicon · signé et notarisé · SHA-256 db0f1a2adcc3aae96100e98194268826b1514b26dd0d35e62fd2301e7337457b · notes de version

03

### Créez ou adaptez un agent

Dans Claude Code ou Codex, demandez ce dont vous avez besoin. Le skill Fabric Agent Adapter construit un service compatible avec Fabric : un contrat, un tableau de bord, des tests et une vérification de conformité.

nouveau Créez un agent Fabric qui consulte chaque matin les avis sur notre app store et rédige les réponses

adapter Adaptez ce dépôt à Fabric

Un agent, un serveur MCP ou un outil en ligne de commande existant garde son code ; l’adaptateur ajoute autour de lui ce dont Fabric a besoin. Démarrage rapide de l’adaptateur · le contrat

04

### Lancez-le et regardez-le

Fabric Dashboards affiche tous les services d’agents locaux dans une seule fenêtre ; votre agent peut les démarrer, les arrêter et les ouvrir via MCP.

Télécharger Fabric Dashboards

0.6.5

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Ajoutez ensuite ce que votre travail demande : Fabric Switchboard quand les agents ont besoin de plusieurs comptes, Project Observatory pour voir ce qui a changé d’un projet à l’autre, Fabric Inbox pour le courrier.

05

### Ajoutez l’agent suivant et voyez la famille

Quand le travail le demande, construisez l’agent suivant de la même façon et donnez-lui le même projet dans Fabric. Claude Code, Kilo Code et Hermes Agent lancés depuis Fabric partagent le tableau, la mémoire et les passations de ce projet : l’un reprend là où l’autre s’est arrêté. Fabric Dashboards affiche les deux, avec leur état et leurs dépenses, dans une seule fenêtre.

suivant Créez un agent Fabric qui transforme les réponses d’avis rédigées en un résumé hebdomadaire pour le tableau

Chaque nouvel agent rejoint une famille que vous voyez déjà, au lieu de devenir un script de plus à retenir. Comment la famille grandit · quels agents sont connectés aujourd’hui

UN OUTIL QUE NOUS RECOMMANDONS

## Des agents qui terminent

## ce qu’ils commencent

Pour les changements que font vos agents, nous recommandons task-pipeline, un skill open source distinct, issu de la famille sshlg-skills famille. Il fait passer un changement par des étapes à validation, du brief et du plan jusqu’aux tests, au déploiement et à la recette, et n’avance pas tant que chaque validation n’est pas passée.

npx sshlg-skills install

task-pipeline sur GitHub · il ne fait pas partie de PassionCode.ai et n’en dépend en rien

CONTRIBUER

## Vous avez trouvé quelque chose à corriger ?

## Envoyez une pull request

Chaque dépôt de produit est public. Chacun indique sa commande de test dans AGENTS.md et son démarrage rapide dans le README ; votre agent de code peut lire les deux et faire le reste.

### Choisissez un dépôt

Faites un fork du produit que vous utilisez, ou parcourez l’organisation. Les tickets marqués d’une étiquette sont un bon point de départ.

### Lancez sa validation

Lisez le fichier AGENTS.md du dépôt et celui de l’organisation : CONTRIBUTING.md, puis faites la modification et lancez la commande de test jusqu’à ce qu’elle passe.

### Ouvrez la pull request

L’ouvrir vaut acceptation du fichier CLA.mddu dépôt ; il n’y a aucune case à cocher. Nous examinons chaque pull request et nous répondons.

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

Quelques dépôts sont internes et visibles uniquement des collaborateurs : la base de connaissances de l’équipe et la carte de l’organisation. Envie de rejoindre l’équipe ? Écrivez à Sergey.

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

Twitter

↗
