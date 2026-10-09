Contract: brand-contract v1

<!-- Generated from fr/observatory/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Project Observatory | Tableau de bord local pour les projets menés par des agents | PassionCode.ai

Voyez ce qui a changé dans vos projets, ce qui demande votre attention et où des clés API connues ont laissé une copie. Project Observatory est un tableau de bord local open source de PassionCode.ai, en anglais ou en russe.

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

Télécharger

↓

PROJECT OBSERVATORY · PAR PASSIONCODE

# Vos projets

# De nouveau en vue

Voyez ce qui a changé dans les projets de vos agents, ce qui demande votre attention et où des clés API connues ont laissé une copie, dans un tableau de bord local disponible en anglais ou en russe

DANS LA FAMILLE Mémoire et preuves : ce qui a changé dans chaque projet, ce qui a été décidé et ce qui demande votre attention. Toute la famille

Commencer

↓

Code source

↗

Open source · macOS + Linux · Python 3.11+

UNE VUE / VOS PROJETS

PROJETS

+

CONSTATS

DANS OBSERVATORY

## D’abord, ce qui demande votre attention

La vraie vue d’ensemble d’Observatory, générée par le moteur à partir des projets d’une entreprise fictive.

Parc de démonstration synthétique · aucun projet, dépôt ni identifiant réel

UN OBSERVATOIRE LOCAL

## Moins de suppositions

## Plus de preuves d’un coup d’œil

01 / INVENTAIRE

### Sachez ce qui existe

Choisissez le dossier de projets à observer. Observatory y trouve les dépôts et tient un registre local, en indiquant la règle derrière chaque lien.

02 / ACTIVITÉ

### Voyez ce qui a bougé

Commits, état de l’arbre de travail et travail qui n’existe que sur cette machine, pour chaque projet suivi, avec l’évolution semaine par semaine de chacun.

03 / CONSTATS

### Commencez par l’essentiel

Les constats arrivent avec leurs preuves et une prochaine étape, classés de critique à info. Un constat mis en sourdine garde la trace de qui l’a fait, quand et pourquoi.

04 / CLÉS

### Retrouvez les copies de clés connues

Les métadonnées des identifiants restent séparées des valeurs. Les transcriptions, logs et bases SQLite sélectionnés sont comparés aux clés déjà connues localement ; les constats ne reproduisent jamais une valeur.

05 / VOTRE LANGUE

### Anglais ou russe

Le tableau de bord est en anglais par défaut. Choisissez le russe pour l’espace de travail, ou basculez avec EN/RU dans la barre latérale ; les compteurs suivent les règles du pluriel de chaque langue.

06 / AGENTS

### Donnez du contexte à l’agent suivant

Une CLI, des outils MCP et un plugin Claude Code partagent les mêmes faits locaux. Les intégrations et les tâches en arrière-plan restent désactivées tant que vous ne les choisissez pas.

OBTENIR OBSERVATORY

## Commencez par votre propre espace de travail

Dernière version : 0.19.4. Aucune clé API n’est nécessaire pour la première observation locale. Confiez l’installation à votre agent de code, ou faites-la vous-même.

01

### Installez la version

Télécharger project_observatory-0.19.4-py3-none-any.whl et SHA256SUMS depuis la version 0.19.4, les vérifier avec shasum -a 256 -c SHA256SUMS --ignore-missing, puis, dans un environnement Python 3.11+ isolé qui prend en charge les extensions SQLite, exécuter pip install --no-deps sur le wheel, puis sur son extra [full] avec -c "$(project-observatory full-path)/requirements-full.lock", l’ensemble de dépendances avec lequel la version a été testée. Sur macOS, utilisez le Python de Homebrew.

02

### Créez un espace de travail privé

project-observatory full init, puis choisissez le dossier à observer avec full configure sources projects. La configuration, les clés et l’historique restent hors du code installé.

03

### Observez et ouvrez

project-observatory full local, puis full open. Pour le russe : full configure interface locale ru.

04

### Connectez votre agent

Le serveur MCP communique en stdio : claude mcp add observatory --scope user -e OBSERVATORY_HOME="$OBSERVATORY_HOME" -- "$(python -c 'import sys; print(sys.executable)')" "$(project-observatory full-path)/mcp/server.py", puis demandez observatory_overview.

Guide d’installation

↗

Prise en main et intégrations

↗

Toutes les versions

↗

Application Mac : ProjectObservatory-0.19.4-macos.zip, signée avec un Developer ID et notarisée par Apple, pour macOS 14+. Elle s’ouvre sur le tableau de bord et utilise le moteur installé ci-dessus ; vérifiez-la avec le même SHA256SUMS.

La version actuelle, 0.19.4, est sous AGPL, comme toutes les versions depuis la 0.10.0, la première sous AGPL ; la 0.9.1 et les précédentes conservent la licence avec laquelle elles sont sorties.

L’analyse par valeurs connues compare les artefacts sélectionnés aux clés déjà connues localement. Elle ne peut ni trouver des secrets inconnus ni prouver qu’aucune copie ne subsiste, et une copie locale ne prouve pas que quelqu’un d’autre a obtenu une clé. La rotation réelle des clés chez les fournisseurs et les hôtes MCP externes ne sont pas couverts par la suite de tests hors ligne.

AVANT DE COMMENCER

## Quelques distinctions utiles

Observatory envoie-t-il mes projets ou mes clés quelque part ?

Non. L’inventaire, l’historique et les observations restent dans votre espace de travail privé, sur votre machine. Les intégrations facultatives ont leur propre accès ; chacune s’active séparément, avec votre propre compte.

Que lit-il ?

Uniquement les dossiers et les sources que vous configurez. full doctor indique ce qui est activé et ce qui manque, et le tableau de bord signale qu’une source n’a pas été mesurée au lieu d’afficher zéro.

Est-ce la même chose que Switchboard ?

Non. Switchboard gère vos comptes Claude Code et Codex. Observatory garde en vue les projets sur lesquels travaillent ces agents. Ce sont deux outils PassionCode open source que vous pouvez utiliser dès aujourd’hui.

Et Fabric ?

Fabric est notre agent IA dans le rôle de CEO, en préversion, centré sur la coordination des agents et des projets. Observatory est disponible dès maintenant comme outil local distinct. Découvrir Fabric.

Puis-je l’examiner ou le compiler moi-même ?

Oui. Project Observatory est open source sous licence GNU AGPL-3.0. Pour les usages que l’AGPL ne couvre pas, une licence commerciale est disponible sur passioncode.ai/business. Les versions publiées conservent leur licence : la 0.8.1 et les précédentes sous MIT, de la 0.8.2 à la 0.9.1 sous PolyForm Noncommercial ou Internal Use. Le dépôt contient le code source, les tests, le modèle de sécurité et les notes de version.

OPEN SOURCE · LOCAL D’ABORD

## Vos projets, vos preuves

Créez un espace de travail privé, observez vos propres dossiers et dites-nous ce qui doit être amélioré.

Commencer

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
