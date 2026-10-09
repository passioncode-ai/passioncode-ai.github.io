Contract: brand-contract v1

<!-- Generated from fr/switchboard/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Switchboard | Gestionnaire de comptes Claude Code et Codex | PassionCode.ai

Gérez vos comptes Claude Code et Codex, consultez les limites d’usage et changez de compte pour les requêtes gérées. Téléchargez Switchboard pour macOS et Windows.

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

Español

Português (Brasil)

Télécharger

↓

FABRIC SWITCHBOARD · PAR PASSIONCODE

# Vos comptes

# Un changement plus clair

Réunissez vos comptes Claude Code et Codex CLI dans un seul poste de travail local pour vérifier l’usage déclaré, séparer comptes professionnels et personnels et choisir ce qui traite votre prochaine requête

DANS LA FAMILLE Les comptes : le compte sur lequel tourne chaque agent, avec ses limites d’usage sous les yeux. Toute la famille

Télécharger Switchboard

↓

Voir le code source

↗

Open source · macOS + Windows · Application de bureau + CLI

UN OUTIL / VOS COMPTES

CLAUDE CODE

+

CODEX CLI

OBTENIR SWITCHBOARD

## Choisissez votre plateforme

Dernière version : 0.6.14. Les deux téléchargements incluent l’application de bureau et la switchboard CLI.

⌘

### macOS

Universel · Apple silicon + Intel
macOS 14 ou ultérieur · archive ZIP

Télécharger pour macOS

↓

Signé avec un Developer ID et notarisé par Apple. Ouvrez le ZIP, déplacez Fabric Switchboard dans Applications et lancez-le depuis ce dossier.

⊞

### Windows

x64 · Installateur de l’application de bureau + CLI
Archive ZIP · WebView2 requis

Télécharger pour Windows

↓

Compilé nativement sous Windows, pas encore signé avec Authenticode : SmartScreen peut donc afficher un avertissement. L’installateur inclut la CLI.

☰

### Avant de l’ouvrir

Switchboard gère les comptes et lance les CLI officielles. Il ne les remplace pas.

Claude Code ou Codex CLI, installé séparément. Switchboard n’inclut ni abonnement chez un fournisseur ni crédits d’API.

macOS 14 ou ultérieur, sur Apple silicon ou Intel.

Windows x64 avec WebView2. La version Windows n’est pas encore signée avec Authenticode.

L’application reste active dans la barre des menus après la fermeture de sa fenêtre et s’ouvre à la connexion ; quittez-la depuis son menu.

ZIP macOS · SHA-256

7daffb205c73ca65c2a279d46baf1a9e99ff7ff0a7d6226243f4cad63989f64e

ZIP Windows · SHA-256

4bf62562c216100b4c3adf4864fa9260764b20301f952345f38aca79c34a7eac

À comparer avant l’ouverture : shasum -a 256 dans Terminal, Get-FileHash dans PowerShell. Une valeur différente signifie un fichier différent : téléchargez-le de nouveau.

Notes de version et sommes de contrôle

↗

Notes d’installation

↗

Toutes les versions

↗

Lisez les notes de version avant de mettre à jour. La recette avec de vrais comptes de fournisseurs sur chaque plateforme est suivie publiquement dans le dépôt.

LE PROBLÈME

## Les limites s’épuisent

## avant que le travail ne soit fini

Une longue session peut atteindre la limite d’usage d’un compte en plein milieu d’une tâche. Le travail attend alors que vous vous déconnectiez, trouviez un autre compte et vous reconnectiez.

Switchboard fait avancer le travail. Quand la rotation est activée, la requête suivante passe sur un autre compte du même groupe, et la session reste ouverte.

DANS SWITCHBOARD

## Une seule vue de vos comptes

L’interface réelle de Switchboard, présentée avec des comptes de démonstration fictifs.

Démo dans le navigateur · aucun compte réel, aucun identifiant, aucune requête vers un fournisseur

UN POSTE DE TRAVAIL LOCAL

## Moins de jonglage entre comptes

## Plus de contexte d’un coup d’œil

01 / COMPTES

### Partez de ce que vous avez

Capturez explicitement le compte CLI actuel, connectez-vous via la CLI officielle ou importez des profils Claude Swap. Vous choisissez ce que vous apportez dans Switchboard.

02 / SÉPARATION

### Le travail reste avec le travail

Regroupez les comptes en groupes, par exemple professionnel et personnel. L’acheminement reste dans le même fournisseur et le même groupe.

03 / USAGE

### Voyez les limites qui vous restent

Consultez les fenêtres de quota déclarées, les heures de réinitialisation et l’ancienneté de chaque vérification. Un usage non pris en charge ou inconnu reste clairement signalé.

04 / CHANGEMENT DE COMPTE

### Changez la prochaine requête

Choisissez une route gérée ou activez la rotation selon le quota. Une réponse en cours conserve l’identité avec laquelle elle a démarré.

05 / STOCKAGE LOCAL

### Gardez vos identifiants sur votre machine

Les secrets enregistrés utilisent le Trousseau macOS ou Windows DPAPI. Les lancements isolés de la CLI créent la copie locale du jeton d’accès dont le client officiel a besoin.

06 / VOTRE FAÇON DE TRAVAILLER

### Une fenêtre ou votre terminal, à vous de choisir

L’application de bureau et la CLI partagent le même moteur d’exécution. Laissez l’application ou switchboard serve actif pour les sessions gérées.

POUR LES AGENTS · NOUVEAU DANS LA 0.4

## Votre agent voit

## ses propres limites

Switchboard inclut switchboard mcp, un serveur MCP local. Claude Code, Codex ou un autre client MCP peut lire l’usage restant et faire passer sa prochaine requête sur un autre compte. Aucun outil n’accepte ni ne renvoie d’identifiant.

01 / USAGE

### Lisez ce qu’il reste

Le quota restant pour chaque compte et chaque fenêtre, avec les heures de réinitialisation et l’ancienneté de chaque vérification. Un usage inconnu est signalé comme inconnu, jamais comme nul.

02 / CHANGEMENT DE COMPTE

### Changez avant la limite

Un agent peut choisir le compte de la prochaine requête de sa session, au sein du même fournisseur et du même groupe. Changer la connexion Claude Code pour toutes les sessions du Mac exige explicitement l’option global.

03 / RÈGLES DE PROJET

### Règles de projet facultatives

Si vous le souhaitez, démarrez un dossier de projet sur un compte choisi. Les règles restent visibles dans l’application, peuvent être mises en pause ou expirer, et n’arrêtent jamais la rotation.

01

### Lancer depuis Switchboard

Les sessions lancées depuis l’application ou la CLI reçoivent les outils lorsque la switchboard CLI est trouvée. Les sessions isolées reçoivent les outils en lecture seule. Sous macOS, le panneau Agents relie la CLI incluse dans l’application à ~/.local/bin.

02

### Ou connectez un agent vous-même

claude mcp add --scope user switchboard -- switchboard mcp
codex mcp add switchboard -- switchboard mcp

LA PREMIÈRE SESSION

## Apportez un compte

## Choisissez son mode d’exécution

01

### Ajoutez un compte

Capturez votre autorisation actuelle ou utilisez la connexion de la CLI officielle. Donnez au compte un nom et un groupe.

02

### Vérifiez ce qui est connu

Examinez l’identité du compte et l’usage déclaré. La sélection gérée et le compte natif actuel de la CLI sont affichés séparément.

03

### Lancez votre session

Utilisez le mode géré pour changer de compte d’une requête à l’autre, ou le mode isolé pour une session directe liée à un seul compte.

AVANT DE COMMENCER

## Quelques distinctions utiles

Switchboard remplace-t-il Claude Code ou Codex ?

Non. Il gère les comptes et lance les CLI officielles. Installez Claude Code ou Codex séparément pour la connexion et les sessions. Switchboard n’inclut ni abonnement chez un fournisseur ni crédits d’API.

Change-t-il automatiquement mon compte CLI actuel ?

La capture est une action explicite. Le choix de la route gérée est distinct de l’activation native. L’activation native de Claude et la rotation automatique sont des opérations à activer volontairement ; vérifiez la confirmation avant de les activer.

Quelle différence entre mode géré et mode isolé ?

Les sessions gérées envoient leurs requêtes via un proxy local et suivent la route que vous avez choisie pour les requêtes suivantes. Les sessions isolées se connectent directement avec un répertoire de compte distinct ; les choix de route ultérieurs ne les modifient pas.

Switchboard et Fabric, est-ce la même chose ?

Switchboard est l’outil de gestion de comptes disponible aujourd’hui. Fabric est notre agent IA dans le rôle de CEO, en préversion, consacré à la coordination des agents et des projets. Les deux font partie de la boîte à outils PassionCode. Découvrir ce que nous construisons avec Fabric.

Quels agents fonctionnent avec Switchboard ?

Claude Code, Codex et les autres agents de code populaires : Hermes, Kilo Code, Cline, Goose, OpenCode et bien d’autres. Voir les 30 agents et la façon dont chacun se connecte.

Un projet peut-il avoir ses propres comptes ?

Oui. Créez un projet, ajoutez ses dossiers (par exemple plusieurs dépôts liés) et choisissez ses comptes. Les sessions lancées depuis ces dossiers n’utilisent que ces comptes, le changement automatique reste limité à eux, et les agents qui travaillent sur d’autres projets ne basculent jamais dessus.

Switchboard envoie-t-il des données ?

Les versions publiées comptent les installations, les jours d’utilisation et le nombre de comptes connectés, par fournisseur et par type. Elles n’envoient jamais de noms de comptes, d’adresses e-mail, de connexions, de noms de groupes ni ce que vous faites avec vos comptes. Un numéro d’installation aléatoire, partagé par les outils PassionCode.ai de votre ordinateur, permet de ne compter une personne qu’une fois. Désactivez-le dans À propos → Share anonymous usage counts ; ce réglage s’applique à tous les outils PassionCode.ai. Ce qui est envoyé exactement.

Puis-je l’examiner ou le compiler moi-même ?

Oui. Switchboard est open source sous licence GNU AGPL-3.0. Pour un usage que l’AGPL ne couvre pas, une licence commerciale est disponible auprès de passioncode.ai/business. Les versions jusqu’à v0.3.1-beta.1 incluse ont été publiées sous licence MIT et restent disponibles sous cette licence. Le téléchargement actuel, 0.6.14, est publié sous AGPL. La v0.4.0-beta.1 a été publiée sous PolyForm Noncommercial or Internal Use et conserve cette licence. Le dépôt comprend les instructions de compilation, le code source, les tests et les preuves de publication.

FAIT PARTIE DE LA BOÎTE À OUTILS PASSIONCODE

## Les comptes ne sont qu’une partie

## de l’installation

Switchboard gère les comptes Claude Code et Codex. Project Observatory garde sous les yeux les projets sur lesquels travaillent ces agents. Fabric Dashboards affiche dans une seule fenêtre les services d’agents locaux de votre Mac. Fabric, notre agent IA dans le rôle de CEO, est en préversion.

Découvrir Observatory

↗

Version de Fabric Dashboards

↗

Découvrir Fabric

↗

Tous les outils

↗

OPEN SOURCE · LOCAL D’ABORD

## Votre installation, votre code source

Essayez-le, examinez son fonctionnement et dites-nous où il doit s’améliorer.

Télécharger Switchboard

↑

Signaler un problème

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
