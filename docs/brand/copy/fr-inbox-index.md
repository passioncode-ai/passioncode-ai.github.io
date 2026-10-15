Contract: brand-contract v1

<!-- Generated from fr/inbox/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Inbox | Le courrier, l’important d’abord · préversion de bureau | PassionCode.ai

Fabric Inbox est l’outil de messagerie de Fabric et fonctionne aussi seul : vos boîtes Gmail et Cloudflare dans une seule liste, le courrier important en premier, et des agents sur vos propres adresses. Préversion de développement pour macOS, Windows et Linux.

Aller au contenu

PassionCode

.ai

Produits

Switchboard

Observatory

Inbox

Fabric

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

FABRIC INBOX · PRÉVERSION DE DÉVELOPPEMENT

# Votre courrier

# L’important d’abord

Réunissez vos boîtes Gmail et Cloudflare dans une seule liste, le courrier important en premier. Des agents sur vos propres domaines répondent à ce que vous autorisez et laissent le reste en brouillon

DANS LA BOÎTE À OUTILS Courrier : les adresses que les agents lisent et auxquelles ils répondent selon la politique que vous définissez. Étape 5 de « Comment ça marche ». Tous les outils

Tout installer en une commande →

Télécharger pour macOS

↓

Ce qu’il fait

↓

Préversion de développement 0.18.0 · macOS 12+ · Windows · Linux · open source sous licence AGPL-3.0

FABRIC INBOX / COURRIER + AGENTS

IMPORTANT

+

RÉPONDU

NOUVEAU DANS 0.15

## Votre agent de code

## au travail dans Inbox

La version 0.15 place Claude Code ou Codex à côté de votre courrier et lui permet de configurer Inbox pour vous. La console fonctionne à partir de 0.15.1 : dans 0.15.0, elle ne démarrait pas. Comment un agent se connecte ↓

CONSOLE D’AGENT

### Votre agent dans un panneau latéral

Claude Code ou Codex s’exécute à droite de la fenêtre du courrier, déjà connecté à cet Inbox, et peut faire tout ce que fait l’application. Ouvrez la console avec le bouton de la barre d’outils, View → Agent Console ou ⌃⌘T (Ctrl+Maj+T sous Windows et Linux). Chaque session reçoit sa propre clé, au niveau que vous choisissez, révoquée à la fin de la session. La version du Mac App Store n’a pas la console.

CONFIGURÉ PAR VOTRE AGENT

### Aucune adresse ni aucun secret à copier

Votre agent de code crée le serveur dans votre compte Cloudflare, puis se connecte lui-même dès que vous l’autorisez dans l’application. Vous collez le jeton, vous vous connectez et vous choisissez Allow. L’écran d’accueil propose Use the server your agent set up.

COURRIER NON PRIS EN CHARGE

### Le courrier que le serveur n’a pas pu prendre

Quand un message n’a pu être ni accepté ni refusé, les réglages du domaine indiquent à qui il était destiné, quand et pourquoi. Son expéditeur a peut-être reçu un avis de non-remise : vous savez qui contacter.

01 / CE QU’IL FAIT

## Moins de lecture

## Moins de réponses

Inbox trie tous les comptes de la même façon et donne aux adresses de vos domaines quelqu’un pour y répondre.

L’IMPORTANT D’ABORD

### Ce qui vous attend, en haut

Passent d’abord les messages non lus envoyés par des personnes, les messages de sécurité et de connexion, les alertes de supervision, les refus lors de la revue des apps, les paiements échoués et les builds en échec. Newsletters, notifications, facturation et le reste sont rangés dans des groupes repliés, avec leur nombre. Chaque ligne indique pourquoi elle est là.

VOS DOMAINES

### Toutes vos adresses au même endroit

Activez le courrier pour un domaine de votre compte Cloudflare, importez les adresses qu’il possède déjà et ajoutez-en de nouvelles. Chaque adresse existante continue de transférer une copie là où elle allait avant. Le courrier envoyé à une adresse sans boîte est listé, jamais supprimé.

DES AGENTS, DANS VOS RÈGLES

### N’envoie que ce qui est permis

Un agent a ses propres instructions, connaissances et outils, et peut servir plusieurs adresses. Il n’envoie une réponse que si elle s’appuie sur ses connaissances, relève d’un sujet que vous avez autorisé et reste dans sa limite quotidienne. Tout le reste attend en brouillon, avec la raison.

Toutes les boîtes · adresses et messages d’exemple, sans vrais comptes

OBTENIR FABRIC INBOX

## Une préversion de développement

## pour Mac, Windows et Linux

Dernière préversion : 0.18.0. L’application crée son serveur de messagerie dans votre propre compte Cloudflare et l’ouvre ; votre courrier reste dans vos comptes.

⌘

### macOS

Universal · Apple silicon + Intel · macOS 12 ou ultérieur
Programme d’installation DMG · signé Developer ID et notarisé par Apple

Télécharger pour macOS

↓

Ouvrez le DMG et faites glisser Fabric Inbox dans Applications.

Une copie Mac antérieure à 0.15.2 ne peut pas se mettre à jour elle-même : téléchargez 0.15.2 une fois et installez-la par-dessus l’ancienne. Les versions suivantes s’installent de nouveau d’elles-mêmes.

⊞

### Windows et Linux

La version 0.18.0 fournit aussi un installateur Windows pour x64 et arm64 qui ne demande pas de droits d’administrateur, signé avec Authenticode depuis la 0.14.1, ainsi qu’un AppImage et un .deb Linux pour x64 et arm64.

Téléchargements Windows et Linux

↗

L’application Windows et l’AppImage se mettent à jour d’elles-mêmes ; une copie installée depuis le .deb, non : installez le .deb suivant. Sous Linux, l’application garde votre connexion dans le Secret Service (GNOME Keyring ou KWallet) et ne démarre pas sans lui.

☰

### Avant de l’ouvrir

Au premier lancement, choisissez Create my server on Cloudflare. Si votre agent de code a créé le serveur, choisissez plutôt Use the server your agent set up.

Un compte Cloudflare ; l’offre gratuite suffit

Un jeton API que vous créez dans son tableau de bord, avec les autorisations que l’application indique

Pour Gmail : un client OAuth issu de votre propre projet Google Cloud

Le guide d’installation détaille chaque réglage.

DMG macOS · SHA-256

3d971a0b00765ce1faf9dea63b41503dd29180adbe79bc2a5d0951a857641ffd

Comparez avant d’ouvrir : shasum -a 256 dans Terminal. Une valeur différente signifie un fichier différent ; téléchargez-le à nouveau.

Notes de version et somme de contrôle

↗

Notes d’installation

↗

Toutes les versions

↗

Ceci est une préversion de développement. Les réponses des agents n’ont pas encore été testées avec un véritable appel de modèle, et Gmail n’a pas encore été validé sur un vrai compte. La prise en charge d’IMAP générique et d’Outlook est prévue ; ni l’un ni l’autre n’est proposé aujourd’hui comme intégration fonctionnelle.

POUR LES AGENTS

## Tout ce que fait l’application,

## un agent peut le faire

Votre serveur répond au Model Context Protocol à l’adresse /mcp. Chaque fonction de l’application est aussi un outil MCP : Claude Code ou un autre client MCP peut donc lire, trier et envoyer du courrier et gérer les adresses, dans la limite du niveau de sa clé.

01

### Donnez une phrase à votre agent

Dans l’application, ouvrez Settings → Agent access. L’écran montre d’abord la phrase à donner à votre agent de code. L’agent crée le serveur dans votre compte Cloudflare et se connecte lui-même dès que vous choisissez Allow ; vous ne copiez ni adresse ni secret. Les étapes de l’agent sont dans le guide de configuration pour les agents.

02

### Ou créez une clé vous-même

Sur le même écran, choisissez un nom, un niveau (read, mail ou admin) et si la clé peut envoyer. Le secret n’est affiché qu’une fois.

03

### Connectez votre agent

Pour une clé que vous avez créée, l’application affiche la commande complète : claude mcp add --transport http fabric-inbox https://<your-server>/mcp avec les deux en-têtes de la clé. Demandez ensuite list_accounts.

02 / LA BOÎTE À OUTILS PASSIONCODE

## Un outil, un rôle

Inbox s’occupe du courrier. Switchboard gère les comptes Claude Code et Codex. Project Observatory garde en vue les projets sur lesquels travaillent ces agents. Fabric, en préversion, est le foyer de vos projets et de leurs agents.

Découvrir Switchboard

↗

Découvrir Observatory

↗

Découvrir Fabric

↗

AVANT DE COMMENCER

## Où en est Inbox

Où va mon courrier ?

Vers le serveur que l’application crée dans votre propre compte Cloudflare. Les comptes Gmail se connectent via un client OAuth issu de votre propre projet Google Cloud.

Va-t-il répondre seul à mon courrier ?

Seulement sur les adresses que vous confiez à un agent, et seulement par les réponses que ses règles autorisent. Le courrier automatique, de masse et no-reply ne reçoit jamais de réponse, et chaque exécution enregistre exactement ce qui a été envoyé.

Prend-il en charge n’importe quel compte de messagerie ?

Pas encore. Les boîtes Cloudflare et Gmail fonctionnent dans la préversion. La prise en charge d’IMAP générique et d’Outlook est prévue.

Le code source est-il public ?

Oui. Fabric Inbox est open source sous licence GNU AGPL-3.0. Pour les usages que l’AGPL ne couvre pas, une licence commerciale est disponible sur passioncode.ai/business. Le projet est né du modèle Agentic Inbox de Cloudflare, qui conserve sa propre mention de licence Apache-2.0. Le dépôt contient le code source, les tests et les notes de version.

Inbox est-il l’agent Fabric ?

Non. Inbox est un client de messagerie ; ses agents répondent sur vos adresses dans le cadre des règles que vous fixez. Fabric, en préversion, est le foyer de vos projets et de leurs agents. Les deux font partie de la même boîte à outils, avec des rôles différents.

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
