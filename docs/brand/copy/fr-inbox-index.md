Contract: brand-contract v1

<!-- Generated from fr/inbox/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Inbox | Le courrier, l’important d’abord · préversion macOS | PassionCode.ai

Fabric Inbox est l’outil de messagerie de Fabric et fonctionne aussi seul : vos boîtes Gmail et Cloudflare dans une seule liste, le courrier important en premier, et des agents sur vos propres adresses. Préversion de développement pour macOS.

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

GitHub

↗

FABRIC INBOX · PRÉVERSION DE DÉVELOPPEMENT

# Votre courrier

# L’important d’abord

Réunissez vos boîtes Gmail et Cloudflare dans une seule liste, le courrier important en premier, avec des agents sur vos propres domaines qui répondent à ce que vous autorisez et préparent un brouillon pour le reste

DANS LA FAMILLE Courrier : les adresses que les agents lisent et auxquelles ils répondent selon la politique que vous définissez. Toute la famille

Télécharger pour macOS

↓

Ce qu’il fait

↓

Préversion de développement 0.12.0 · macOS 12 ou ultérieur · open source sous licence AGPL-3.0

FABRIC INBOX / COURRIER + AGENTS

IMPORTANT

+

RÉPONDU

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

OBTENIR FABRIC INBOX

## Une préversion de développement

## pour votre Mac

Dernière préversion : 0.12.0. L’application Mac crée son serveur de messagerie dans votre propre compte Cloudflare et l’ouvre ; votre courrier reste dans vos comptes.

⌘

### macOS

Universal · Apple silicon + Intel · macOS 12 ou ultérieur
Programme d’installation DMG · signé Developer ID et notarisé par Apple

Télécharger pour macOS

↓

Ouvrez le DMG et faites glisser Fabric Inbox dans Applications.

☰

### Avant de l’ouvrir

Au premier lancement, choisissez Create my server on Cloudflare.

Un compte Cloudflare ; l’offre gratuite suffit

Un jeton API que vous créez dans son tableau de bord, avec les autorisations que l’application indique

Pour Gmail : un client OAuth issu de votre propre projet Google Cloud

Le guide d’installation détaille chaque réglage.

DMG macOS · SHA-256

a8e55bc8c8ad8837f079ad161104096cd14f1c09e08efaa883028642c0f136c7

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

### Créez une clé

Dans l’application, ouvrez Settings → Agent access. Choisissez un nom, un niveau (read, mail ou admin) et si la clé peut envoyer. Le secret n’est affiché qu’une fois.

02

### Connectez votre agent

L’application affiche la commande complète : claude mcp add --transport http fabric-inbox https://<your-server>/mcp avec les deux en-têtes de la clé. Demandez ensuite list_accounts.

02 / LA FAMILLE PASSIONCODE

## Un outil, un rôle

Inbox s’occupe du courrier. Switchboard gère les comptes Claude Code et Codex. Project Observatory garde en vue les projets sur lesquels travaillent ces agents. Fabric est l’agent IA dans le rôle de CEO que nous construisons pour coordonner le travail.

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

Non. Inbox est un client de messagerie ; ses agents répondent sur vos adresses dans le cadre des règles que vous fixez. Fabric est notre agent IA dans le rôle de CEO, en préversion. Les deux font partie de la même boîte à outils, avec des rôles différents.

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
