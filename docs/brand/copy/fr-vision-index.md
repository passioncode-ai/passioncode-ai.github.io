Contract: brand-contract v1

<!-- Generated from fr/vision/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Vision | D’un agent à une organisation AI-native | PassionCode.ai

Pourquoi les agents se dégradent quand rien ne les tient ensemble, ce qu’est un harness, et comment PassionCode.ai fait grandir un agent jusqu’à une famille, une équipe et une organisation. En local d’abord, open source, par-dessus Claude Code, Codex et ce qui viendra ensuite.

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

La vision · état en octobre 2026

# D’un agent à une organisation AI-native

Les agents sont faciles à lancer et difficiles à garder. Nous construisons le harness qui les tient ensemble, pour que chaque nouvel agent renforce toute la famille au lieu d’ajouter une chose de plus à surveiller

En local d’abord, open source, indépendant des fournisseurs Par-dessus Claude Code, Codex et ce qui viendra ensuite

01

La prolifération des agents

02

Le harness qui manque

03

Ce que nous croyons

04

Le chemin

05

Aujourd’hui et orientation

06

Confiance

07

Pour les organisations

01 / LA PROLIFÉRATION DES AGENTS

## Les agents se multiplient plus vite

## qu’on ne parvient à les tenir

Toute équipe peut lancer un agent en un après-midi. Un mois plus tard, rares sont celles qui savent dire quels agents tournent, sur quels comptes, ce qu’ils coûtent, ce qu’ils ont modifié et si quelqu’un en a encore besoin. Les agents construits chacun de leur côté ne se parlent pas, et ceux dont personne ne s’occupe se dégradent en silence.

MCKINSEY · NOVEMBRE 2025

### Beaucoup expérimentent, peu passent à l’échelle

62 % des organisations interrogées expérimentent au moins les agents IA, mais dans chaque fonction métier prise isolément, pas plus de 10 % disent les déployer à grande échelle.

GARTNER · JUIN 2025

### Beaucoup de projets s’arrêteront

Gartner prévoit que plus de 40 % des projets d’IA agentique seront annulés d’ici fin 2027, en raison de coûts croissants, d’une valeur métier floue ou d’un contrôle des risques insuffisant.

GARTNER · AVRIL 2026

### Le prochain problème : la prolifération

D’ici 2028, une entreprise moyenne du Fortune 500 mondial utilisera plus de 150 000 agents, prévoit Gartner, alors que seulement 13 % des organisations estiment disposer de la bonne gouvernance des agents.

FORTUNE · AOÛT 2025

### Le fossé tient à l’apprentissage, pas aux modèles

Un rapport de l’initiative NANDA du Massachusetts Institute of Technology constate que la plupart des pilotes d’IA générative piétinent sans effet mesurable sur le compte de résultat, et en attribue la cause à un déficit d’apprentissage : des outils qui ne s’adaptent pas à la façon dont l’entreprise travaille.

McKinsey, The state of AI in 2025: Agents, innovation, and transformation · novembre 2025

Communiqué de presse de Gartner, 25 juin 2025

Communiqué de presse de Gartner, 28 avril 2026

Fortune, 18 août 2025, à propos du rapport The GenAI Divide: State of AI in Business 2025. Une réserve : le rapport repose sur 150 entretiens, une enquête auprès de 350 employés et l’examen de 300 déploiements publics, et la part de pilotes en échec qu’il met en avant a été contestée pour sa définition du succès. À lire comme un signal, pas comme une mesure.

02 / LE HARNESS QUI MANQUE

## Le problème n’est pas le modèle

## mais ce qui le tient

Un harness désigne tout ce qui entoure un modèle et rend un agent fiable dans la durée : l’endroit où il travaille, les outils et les comptes qu’il peut utiliser, ce dont il se souvient d’une session à l’autre, les contrôles que son travail doit passer et la trace de ce qu’il a fait. Les laboratoires qui conçoivent les modèles emploient le même mot : Anthropic écrit sur les harness efficaces pour les agents au long cours (novembre 2025), et OpenAI sur l’ingénierie de harness (février 2026).

01

### Un foyer

Chaque projet a un seul endroit pour son objectif, son tableau, ses décisions et ses versions, partagé par tous les agents qui y travaillent. C’est Fabric.

02

### Comptes

Chaque agent tourne sur le bon compte, avec ses limites sous les yeux. C’est Fabric Switchboard.

03

### Santé et contrôle

Chaque service d’agent, son état, ses dépenses et ses mises à jour, dans une seule fenêtre que les personnes comme les agents peuvent piloter. C’est Fabric Dashboards.

04

### Mémoire et preuves

Ce qui a changé, ce qui a été décidé et ce qui demande de l’attention, avec la preuve à côté. C’est Project Observatory.

Un seul contrat ouvert les relie : Fabric Agent Contract. Le skill Fabric Agent Adapter apprend à n’importe quel agent de code à s’y conformer, si bien qu’un agent créé aujourd’hui rejoint la famille sans réécriture.

03 / CE QUE NOUS CROYONS

## Six principes

## qui guident notre travail

Des agents qui vous appartiennentIls tournent sur vos machines et vos comptes, dans un code que chacun peut lire, sous licence GNU AGPL-3.0.

N’importe quel agentIndépendant des fournisseurs. Un harness par-dessus Claude Code, Codex et tout ce qui viendra ensuite, jamais un remplacement.

Grandir selon le besoinCommencez par un agent pour une tâche. Ajoutez le suivant quand le travail le demande, pas parce qu’un plan le prévoyait.

Des preuves, pas de la confiance aveugleChaque action laisse une trace lisible, et « terminé » veut dire « vérifié », pas « annoncé ».

Les personnes décidentLes agents préparent, vérifient et portent le travail. Les personnes fixent ce qu’ils ont le droit de faire et approuvent ce qui compte.

Visible, jamais en cachetteLes analyses portent sur les agents et les résultats des processus. Rien ne surveille les personnes en secret.

04 / LE CHEMIN

## Six étapes

## chacune utile en soi

La même famille grandit d’une personne à toute une organisation. Chaque étape indique si elle fonctionne aujourd’hui ou si c’est là que nous construisons.

01

DISPONIBLE MAINTENANT

### Un agent

Votre agent de code construit un agent pour une tâche, avec un contrat, un tableau de bord et des tests.

Fondateur solo un agent qui rédige chaque matin des réponses aux avis sur les stores

Petite équipe un agent qui rédige les notes de version à partir des pull requests fusionnées

Service un agent qui assemble le rapport hebdomadaire à partir de vos propres données

02

DISPONIBLE MAINTENANT

### Deux agents qui se parlent

Les agents connectés à Fabric partagent le tableau, la mémoire et les passations d’un même projet : l’un reprend là où l’autre s’est arrêté.

Fondateur solo l’agent des avis transmet un rapport de bug à l’agent de code

Petite équipe un agent écrit la modification, un autre la relit

Service un agent du support transmet une question de remboursement à la finance, avec les preuves

03

ORIENTATION

### Une chaîne

Les agents s’enchaînent en un seul processus : l’un prépare, le suivant vérifie, une personne valide.

Fondateur solo build, fiche du store, captures d’écran et soumission, une seule approbation

Petite équipe brief, variantes créatives, contrôle de la marque, lancement

Service factures rassemblées, rapprochées et prêtes pour validation

04

DISPONIBLE EN PARTIE

### Une famille qui veille sur elle-même

Dashboards montre la santé et les dépenses de chaque agent, les outils se mettent à jour eux-mêmes après avoir vérifié leurs signatures, et Observatory garde la trace de ce qui a changé. Des agents qui veillent les uns sur les autres, c’est l’orientation.

Fondateur solo une seule fenêtre indique quel agent s’est arrêté et pourquoi

Petite équipe une limite de dépenses arrête un agent avant que la facture ne le fasse

Service chaque modification est rattachée à l’agent et à la personne qui l’a approuvée

05

ORIENTATION

### Une équipe

Les personnes rejoignent les mêmes boucles : chacune reçoit un espace de travail, les agents de son rôle et ce qu’elle a le droit de faire.

Fondateur solo la première recrue hérite des agents, pas d’une pile de scripts

Petite équipe designers, ingénieurs et marketeurs partagent une même famille

Service un espace de travail par rôle, déployé après un pilote mesuré

06

ORIENTATION

### Une organisation

Les agents arrivent à chaque poste de travail. Les personnes deviennent les experts qui vérifient le travail des agents et construisent leurs propres agents, et ces agents se diffusent dans le réseau.

Fondateur solo l’entreprise grandit sans que la routine grandisse avec elle

Petite équipe un bon agent construit par une personne profite à tous

Service les dirigeants voient comment les processus tournent, pas à quel point les gens ont l’air occupés

05 / AUJOURD’HUI ET ORIENTATION

## Ce que vous pouvez utiliser aujourd’hui

## et ce que nous construisons

DISPONIBLE MAINTENANT

### Télécharger et utiliser

Le lanceur PassionCode.ai et le skill Fabric Agent Adapter, pour construire ou convertir des agents avec Claude Code ou Codex

Fabric Dashboards, Fabric Switchboard et Project Observatory, publiés

Fabric, en préversion : projets, tableaux, décisions et agents connectés ; sa conversation ne répond pas encore

Fabric Inbox, une préversion de développement pour le courrier

ORIENTATION

### En construction, dans cet ordre

Fabric qui crée des agents à partir d’une conversation

Des chaînes d’agents avec l’approbation d’une personne à l’intérieur

Des agents qui veillent sur la santé les uns des autres

Des espaces de travail pour les équipes, et PassionCode for Enterprise pour les organisations

D’autres agents de code connectés à Fabric, répertoriés sur la page des agents

06 / CONFIANCE

## Ce sur quoi vous pouvez compter

## à chaque étape

### Sécurité

Chaque agent ne reçoit que les outils et les comptes que vous autorisez. Les clés restent dans un stockage local protégé ; les versions sont signées et vérifiées avant leur installation.

### Données

Votre travail reste sur vos ordinateurs et dans vos comptes cloud. Fabric et Switchboard n’envoient que des compteurs d’utilisation anonymes, et vous pouvez les désactiver. Confidentialité

### Aucun verrouillage

Open source sous licence GNU AGPL-3.0, un contrat ouvert, n’importe quel agent de code et vos propres comptes de modèles. Partez quand vous voulez, en gardant tout.

### Fiabilité

Chaque outil a une commande de test publique et des notes de version, et dit clairement ce qui ne fonctionne pas encore. « Terminé » veut dire « vérifié sur preuves ».

### Personnes

Les analyses portent sur les agents et les résultats : ce qui a tourné, ce que cela a coûté, ce qui a été approuvé. Rien n’est caché, et ce qui est mesuré est visible par les personnes concernées.

UN OUTIL QUE NOUS RECOMMANDONS

## Des agents qui terminent

## ce qu’ils commencent

Un harness a aussi besoin de discipline à l’intérieur de chaque modification. Nous recommandons task-pipeline, un skill open source distinct, issu de la famille sshlg-skills, qui fait passer une modification par des étapes contrôlées, du brief et du plan jusqu’aux tests, au déploiement et à la recette, et n’avance pas tant que chaque contrôle n’est pas franchi. Il fonctionne dans Claude Code, Codex et les autres agents qui lisent les Agent Skills.

npx sshlg-skills install

task-pipeline sur GitHub · il ne fait pas partie de PassionCode.ai et n’en dépend en rien

07 / POUR LES ORGANISATIONS

## Le même chemin,

## pour toute une organisation

Nous faisons entrer les organisations dans l’IA en suivant le chemin ci-dessus : d’abord un pilote mesuré, puis un espace de travail par rôle, puis des agents sur les postes des employés, avec les personnes comme experts qui vérifient le travail et construisent leurs propres agents. PassionCode for Enterprise ajoute l’analyse des agents et des processus, le contrôle et les règles, une aide aux employés pour automatiser leur travail, et le choix entre votre cloud et le nôtre.

Pour votre organisation

→

Un pilote mesuré par rapport à votre situation de départun processus, les heures et le coût, chaque action enregistrée

Des espaces de travail déployés par rôleles agents, les comptes et ce qu’ils ont le droit de faire

Analyses des agents et des processusce qui a tourné, ce que cela a coûté, ce qui a été approuvé

Votre cloud ou le nôtreet les modèles sur vos propres comptes chez les fournisseurs

QUESTIONS

## Avant de commencer

PassionCode.ai remplace-t-il Claude Code ou Codex ?

Non. Il fonctionne par-dessus. Votre agent de code continue de faire le travail ; PassionCode.ai lui donne un foyer, des comptes, un suivi de santé, une mémoire et des preuves, et permet à l’agent suivant de rejoindre la même famille.

Est-ce une promesse ?

Non. Chaque étape de cette page est marquée « disponible maintenant » ou « orientation ». Les outils indiqués comme disponibles se téléchargent dès aujourd’hui ; le reste, c’est ce que nous construisons, dans cet ordre.

PassionCode.ai évalue-t-il les employés ?

Non. Les analyses portent sur les agents et les résultats des processus : ce qui a tourné, ce que cela a coûté, ce qui a été approuvé. Rien ne surveille les personnes en secret, et ce qui est mesuré est visible par les personnes concernées.

COMMENCEZ PAR UN AGENT

## La famille commence

## par une seule commande

Installez les skills, construisez le premier agent, et laissez les autres rejoindre la famille quand le travail le demande.

Pour vous, gratuitement

→

Pour votre organisation

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
