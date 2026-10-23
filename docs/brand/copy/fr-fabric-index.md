Contract: brand-contract v1

<!-- Generated from fr/fabric/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric | Le foyer de vos projets et de leurs agents · préversion pour macOS, Windows et Linux | PassionCode.ai

Fabric est le foyer de vos projets et de leurs agents, en préversion pour macOS, Windows et Linux. Il réunit le tableau, les décisions, le travail et les versions d’un projet au même endroit, sur votre ordinateur.

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

FABRIC · PRÉVERSION

# Un foyer pour vos projets

# et leurs agents

Fabric conserve l’objectif, le tableau, les décisions et les versions de chaque projet sur votre ordinateur, pour chaque agent qui y travaille. Nous le construisons pour qu’il devienne le CEO de vos agents

DANS LA BOÎTE À OUTILS Le lieu commun à tous les agents d’un projet : son objectif, son tableau, ses décisions et ses versions. Étapes 2 et 5 de « Comment ça marche ». Tous les outils

Tout installer en une commande →

Télécharger Fabric

↓

Voir le fonctionnement

↓

Préversion 0.3.11 · macOS, Windows et Linux

LE PREMIER ÉCRAN · QUATRE ACTIONS

Créer un agent

Nommez-le, dites ce qu’il fait, choisissez son dossier et son agent de code

Adapter un agent

Reprenez un agent construit ailleurs, sur une nouvelle branche

Ouvrir un projet

Un dossier, ou un dossier de projets

Créer un projet

Un nouveau foyer pour son objectif, son tableau et ses versions

Le travail sur l’agent lui-même se fait dans la console de votre agent de code

LE PROBLÈME

## Un projet dure plus longtemps

## qu’une conversation

Un agent peut terminer une tâche alors que l’équipe en perd la raison d’être. Le contexte s’éparpille entre les chats, les décisions doivent être répétées et quelqu’un doit remettre le travail en ordre.

Nous construisons Fabric autour du projet, c’est-à-dire de son objectif, de son équipe, de ses décisions et de son historique, qui doivent survivre à la session suivante.

LA BOUCLE DE TRAVAIL · ORIENTATION

## De l’intention

## au résultat vérifié

C’est le fonctionnement vers lequel nous travaillons. Il décrit l’orientation de Fabric, pas la promesse que chaque étape est disponible aujourd’hui.

01

### Comprendre le projet

Réunir au même endroit son objectif, son état actuel et le contexte utile.

02

### Rendre le travail explicite

Transformer l’objectif en travail avec un responsable, un résultat attendu et des limites claires.

03

### Coordonner l’exécution

Répartir le travail entre personnes, agents et processus répétables sans perdre le contexte du projet.

04

### Vérifier et continuer d’apprendre

Confronter le résultat aux preuves. Conserver les décisions et les enseignements pour le cycle suivant.

DANS FABRIC

## Là où vous en étiez

## Ce qui vous attend

La vraie fenêtre de Fabric, avec un espace de démonstration synthétique : quatre projets et 28 jours de travail.

Accueil · projets de démonstration synthétiques, sans vrais comptes ni dépôts

Le tableau · ce qui attend votre décision

Versions · ce qui est entré, pourquoi, et ce qui le confirme

Créer un agent · un nom, une phrase, un dossier, un agent de code

Adapter un agent · Fabric lit le dossier et rien d’autre

La console après « Créer » · les questions, une à une

La console après « Adapter » · le plan avant toute modification

Les écrans Créer et Adapter sont l’interface même de Fabric, rendue à partir de son code source avec des données d’exemple. Le texte de la console est un exemple rédigé de ce que fait l’agent de code, pas un enregistrement.

COMMENT NOUS LE CONSTRUISONS

## Les personnes restent responsables

La coordination est la direction que prend Fabric, et elle ne vous remplace jamais. C’est vous qui décidez à quoi sert le projet et ce que chaque agent a le droit de faire.

POUVOIRS

### L’autorisation reste explicite

Les objectifs, les responsabilités et les limites appartiennent au projet. L’assurance d’un agent n’est pas une autorisation d’agir.

CHOIX

### Les agents restent remplaçables

Le projet doit garder son objectif et son historique quand vous changez de fournisseur ou d’agent chargé du travail.

PREUVES

### Un résultat a besoin d’un reçu

Une tâche terminée doit s’accompagner de quelque chose qu’une personne peut vérifier, pas seulement d’un agent qui affirme qu’elle est faite.

OBTENIR FABRIC

## Une préversion

## pour Mac, Windows et Linux

Dernière préversion : 0.3.11. Fabric tourne sur votre ordinateur avec une base de données locale ; vos projets restent sur cette machine.

⌘

### macOS

Apple silicon et Intel (universel) · macOS 13 ou ultérieur
Programme d’installation DMG · signé Developer ID et notarisé par Apple

Télécharger pour macOS

↓

Ouvrez le DMG et faites glisser Fabric dans Applications. Le même DMG fonctionne sur les Mac Apple silicon et Intel.

⊞

### Windows

x64 (Intel et AMD) et arm64 · installateur Windows
S’installe pour votre utilisateur · signé avec Authenticode

Télécharger pour Windows x64

↓

Windows sur Arm (arm64) ↓

Lancez le fichier d’installation. Les terminaux que Fabric ouvre utilisent PowerShell.

>_

### Linux

x64 et arm64
Paquet .deb ou AppImage

Télécharger le .deb pour x64

↓

.deb pour arm64 ↓

AppImage pour x64 ↓

AppImage pour arm64 ↓

Préférez le .deb : il ouvre les liens fabric:// et garde un seul chemin pour enregistrer fabric-mcp. Une AppImage est montée à un nouveau chemin à chaque démarrage.

☰

### Avant de l’ouvrir

Fabric démarre sa propre base de données locale avec la Supabase CLI dans Docker.

Sous macOS : Docker Desktop ou OrbStack, en cours d’exécution, et la Supabase CLI : brew install supabase/tap/supabase

Sous Windows : Docker Desktop avec WSL2, en cours d’exécution, et la Supabase CLI : scoop install supabase

Sous Linux : Docker Engine, en cours d’exécution, et la Supabase CLI

Claude Code ou Codex CLI, avec une session ouverte, pour que les agents puissent travailler

S’il manque Docker ou la CLI, Fabric indique lequel au premier démarrage. Consultez les agents de code compatibles avec Fabric et ce que chacun peut y faire.

Pas encore sous Windows et Linux : Fabric ne lit pas si un agent de code est connecté, et le dit. Pas encore sous Windows : connecter le secret d’un produit cloud via Project Observatory.

Notes de version et somme de contrôle

↗

Voir le code source

↗

Ceci est une préversion. Vous pouvez y tenir des projets, un tableau des décisions, des tâches, des objectifs, le pouls du travail et des versions avec leurs reçus. La conversation avec Fabric enregistre vos messages, mais Fabric ne répond pas encore. Une version plus récente ne met pas à niveau d’elle-même une base de données existante ; elle vous indique la commande à exécuter. Les agents enregistrés sur ce Mac peuvent demander à Fabric, via son hub d’agents local, l’accès à un produit connecté comme Fabric Inbox ; vous autorisez ou refusez chaque demande et pouvez révoquer l’accès dans Settings. Depuis la 0.3.2, Fabric envoie des compteurs d’utilisation anonymes — uniquement des nombres et des types, jamais de noms, de chemins ni de contenu ; désactivez-les dans Settings → Share usage counts, ce qui s’applique à toutes les apps PassionCode.ai de votre Mac.

Fabric est open source sous licence GNU AGPL-3.0 ; pour les usages que l’AGPL ne couvre pas, une licence commerciale est disponible sur passioncode.ai/business. La préversion 0.3.11 est compilée, signée et notarisée en CI à partir de ce code public.

FONCTIONNE AVEC FABRIC

## Quatre outils autour du foyer

## Chacun fonctionne aussi seul

Fabric garde le projet. Ces quatre outils fonctionnent avec Fabric, et aussi seuls : vous pouvez commencer par n’importe lequel.

Fabric Switchboard

Choisissez le compte sur lequel tourne chaque agent, en gardant les limites d’utilisation sous les yeux.

↗

Fabric Dashboards

Tous les services d’agents locaux dans une seule fenêtre, pilotés par vous ou par des agents.

↗

Project Observatory

Ce qui a changé dans chaque projet et ce qui demande votre attention, preuves à l’appui.

↗

Fabric Inbox

Le courrier Gmail et Cloudflare dans une seule liste, l’important en premier ; les agents répondent selon vos règles.

↗

01

DISPONIBLE MAINTENANT

### Une commande installe tout

Sur un Mac, les quatre outils et Fabric (quand Docker et la CLI Supabase sont là), avec leurs serveurs MCP et les skills, depuis des publications vérifiées. Relancez-la plus tard : elle vérifie et répare.

Installer

02

ORIENTATION

### Ajouter un outil depuis Fabric

Choisir et installer les outils sans quitter Fabric : c’est ce que nous construisons.

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
