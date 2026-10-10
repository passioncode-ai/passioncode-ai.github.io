Contract: brand-contract v1

<!-- Generated from fr/dashboards/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Dashboards | Vos services d’agents locaux, réunis

Une seule fenêtre sur Mac pour vos services d’agents locaux. Voyez ce qui demande votre attention, ouvrez les tableaux de bord et laissez vos agents utiliser les mêmes outils via MCP.

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

Télécharger

↓

FABRIC DASHBOARDS · macOS

# Vos services d’agents

# Un seul endroit où regarder

Voyez tous les services d’agents de votre Mac dans une seule application : ce qui vous attend passe en premier, et le tableau de bord propre à chaque service s’ouvre juste à côté

DANS LA BOÎTE À OUTILS État, dépenses et contrôle : chaque service d’agent, ce qu’il fait, ce qu’il dépense et ses mises à jour dans une seule fenêtre. Étape 4 de « Comment ça marche ». Tous les outils

Télécharger pour macOS ↓

Code source ↗

Version 0.6.7 · macOS 13+ · Apple silicon + Intel

VOS SERVICES LOCAUX / RÉUNIS

LA FENÊTRE

## Tous vos services d’agents

## sur un seul écran

Ce qui est prêt, ce qui vous attend et ce que cela coûte, avec l’action à un clic. Chaque service ouvre son propre tableau de bord dans l’application.

L’application réelle, issue de sa version de développement · services de démonstration du kit Fabric Agent Adapter, aucune donnée réelle

Le tableau de bord d’un service, ouvert dans l’application

01 / LE TRAVAIL SOUS LES YEUX

## Une fenêtre sur

## les outils qui font le travail

Fabric Dashboards détecte les services compatibles sur votre Mac. Chaque service garde son propre rôle ; vous disposez d’un endroit commun pour les inspecter et les piloter.

### Voyez ce qui vous attend

L’état du service, sa dernière activité et les points qui demandent votre attention s’affichent ensemble. Une sonde lente n’est pas aussitôt traitée comme une panne.

### Ouvrez le vrai tableau de bord

L’interface propre à chaque service s’ouvre dans l’application, avec la session déjà ouverte. Project Observatory est un service compatible que vous pouvez utiliser dès aujourd’hui.

### Passez à l’étape suivante

Démarrez, arrêtez ou redémarrez un service, consultez ses logs et utilisez les actions que son contrat expose. Si vous quittez Dashboards, vos services continuent de tourner.

DANS LA 0.6

## Dépenses, une console

## et des mises à jour fiables

Ce qu’ont apporté les versions 0.6, de la 0.6.0 le 6 octobre à la 0.6.5 le 8 octobre 2026.

### Toutes les limites sur la page Spend

La page Spend liste les limites que chaque agent applique : celle qui demande le plus votre attention passe au rouge quand elle a arrêté le travail ou dépassé son seuil, et à l’orange à 80 %, et chaque agent se déplie sur toutes ses limites, avec leur fenêtre et ce qui a été dépensé. Votre agent lit la même liste via MCP.

### Une console d’agent à côté du tableau de bord

Un vrai terminal s’ouvre à côté du tableau de bord d’un service et lance Claude Code, Codex ou un autre runtime dans le dépôt de cet agent. Lorsque Fabric Switchboard associe le dossier à un projet, la session démarre sur le compte de ce projet.

### Des mises à jour vérifiées avant tout

L’application se met à jour seule : une version doit porter la signature de l’organisation et correspondre à ses sommes de contrôle avant de s’installer, et l’installation attend tant qu’une console ou une commande tourne. L’installation automatique peut être désactivée dans les réglages.

### Des skills toujours à jour

Dans Settings → Estate updates, l’application surveille le Fabric Agent Contract et les skills PassionCode.ai, et peut mettre à jour les skills en arrière-plan après avoir vérifié qui les a publiés. Cette option est désactivée par défaut.

### Anglais ou russe

Settings → Language : comme sur ce Mac, anglais ou russe. La fenêtre, le menu et l’icône de la barre des menus changent aussitôt.

02 / OBTENIR FABRIC DASHBOARDS

## Un seul téléchargement

## Vos services restent les vôtres

### macOS

Version 0.6.7. DMG universel pour Apple silicon et Intel, macOS 13 ou version ultérieure. Signé avec Developer ID, notarisé et agrafé (stapled).

Télécharger Fabric Dashboards ↓

Ouvrez le DMG, faites glisser Fabric Dashboards dans le dossier Applications, puis ouvrez-le. L’application se lance à l’ouverture de session ; vous pouvez changer cela dans ses réglages.

### Avant de l’ouvrir

Les services s’installent séparément. Une liste vide est normale tant qu’aucun service compatible n’est installé ; Dashboards ne transforme pas chaque processus local en service d’agent.

Essayez Project Observatory, ou créez votre propre service avec le Fabric Agent Adapter. L’application elle-même ne demande ni compte ni clé API.

SHA-256 du DMG

d0e916fc1a9ee0586446c67474eb75156e770cc37dff302a3808703b4ec42e02

Notes de version et sommes de contrôle ↗

Guide d’installation ↗

03 / POUR VOS AGENTS

## Les mêmes services

## Depuis votre agent

Enregistrez le serveur MCP de l’application dans votre client. Un agent peut lister les services, obtenir les liens vers leurs tableaux de bord et utiliser les opérations que les règles de l’application autorisent.

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Une fois l’application installée dans Applications, demandez à votre agent d’appeler list_services. Un résultat vide signifie qu’aucun service n’est encore installé. D’autres clients MCP peuvent lancer le même exécutable comme serveur stdio. Consultez le guide de configuration MCP.

04 / BON À SAVOIR

## S’intègre à votre environnement

Ai-je besoin de Fabric ?

Non. Fabric Dashboards fonctionne seul. C’est l’un des outils de Fabric, et il peut afficher des services compatibles avant même que vous utilisiez la préversion de Fabric.

Quels services apparaissent ?

Les services qui publient un descripteur local pour fabric-service/0.1. Project Observatory le prend en charge. Le Fabric Agent Contract définit le protocole, et l’Adapter vous aide à l’implémenter.

Est-ce open source ?

Fabric Dashboards est open source sous licence GNU AGPL-3.0. Une licence commerciale est disponible : passioncode.ai/business. La version 0.1.0 reste sous MIT ; les versions 0.2.0 et 0.3.0 restent sous PolyForm Noncommercial ou Internal Use. La version 0.3.1 est la première sous AGPL.

AU CŒUR DE VOTRE ESPACE DE TRAVAIL POUR AGENTS IA

## Commencez par les services

## que vous utilisez déjà

Suivez vos projets avec Observatory. Configurez vos comptes avec Switchboard. N’ajoutez que les outils dont votre travail a besoin.

Découvrir les outils ↗

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
