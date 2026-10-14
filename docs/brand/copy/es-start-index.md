Contract: brand-contract v1

<!-- Generated from es/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Empezar | Instala tu espacio de trabajo para agentes de IA | PassionCode.ai

Configura PassionCode.ai con un comando, o con un prompt para Claude Code o Codex: las herramientas, sus servidores MCP y las skills. El mismo comando revisa y repara una configuración que ya tengas. Gratis y de código abierto.

Saltar al contenido

PassionCode

.ai

Visión

Para ti

Para organizaciones

Herramientas

Acerca de

Español

English

Русский

Deutsch

Français

Polski

한국어

Português (Brasil)

简体中文

日本語

Descargar

↓

Empezar · gratis y de código abierto

# De un Mac vacío a tu primer agente

Crea agentes que siguen trabajando y saben lo que hicieron los demás. Un comando configura las herramientas, y el mismo comando las revisa después

Requiere Node.js 18+ y Claude Code o Codex Fabric requiere macOS en Apple silicon o Intel

→

Un comando

01

Instala las skills

02

Añade Fabric

03

Crea o adapta un agente

04

Ejecútalo y míralo

05

Añade el siguiente agente

+

Contribuir

UN COMANDO

## Configúralo todo,

## o revisa lo que ya tienes

Un comando instala las herramientas que elijas desde sus versiones firmadas, conecta sus servidores MCP a Claude Code, Codex, Gemini CLI y Kimi Code, y añade las skills. En un ordenador que ya está configurado, el mismo comando lo revisa todo, repara lo que falla y muestra qué cambió.

npx @passioncode-ai/passioncode@latest setup

Necesita Node.js 18+ · instala las aplicaciones en macOS; en Linux y Windows configura las skills y los servidores MCP · no instala nada cuya firma, suma de comprobación o notarización falle · para revisar sin cambiar nada:

npx @passioncode-ai/passioncode@latest doctor

### O deja que tu agente de programación lo haga

Copia este prompt en Claude Code, Codex u otro agente de programación. Ejecuta el comando, termina lo que puede y te da una lista corta de lo que solo tú puedes hacer: iniciar sesión, permitir el acceso, escribir una clave en la ventana propia de la herramienta.

Configura PassionCode.ai en este ordenador, o revísalo y repáralo si ya está configurado. Ejecuta npx --yes @passioncode-ai/passioncode@latest setup --yes --json (necesita Node 18 o posterior) y lee su JSON: instala las aplicaciones que faltan desde sus versiones firmadas, las skills y cada servidor MCP, repara lo que falle y lo revisa todo de nuevo. No descargues ni instales nada a mano, y nunca detengas ni mates una aplicación en ejecución. Después ejecuta cada paso de incorporación de producto de la lista que pueda hacer un agente, nunca me pidas una clave ni una contraseña en el chat (las herramientas abren su propio campo oculto) y termina con npx --yes @passioncode-ai/passioncode@latest doctor. Dime brevemente qué configuraste o reparaste, qué sigue fallando y los pasos numerados que solo yo puedo hacer, como iniciar sesión, y recuérdame que te reinicie para que se carguen las nuevas skills y los servidores MCP.

Fabric es una vista previa temprana: el comando lo instala cuando Docker y la CLI de Supabase están en tu ordenador, y si no, te dice qué añadir. ¿Prefieres hacerlo a mano? Los cinco pasos de abajo son la misma configuración, una herramienta cada vez.

## Pasos

01

### Instala las skills

El launcher de PassionCode.ai instala en tu agente de programación las skills de Fabric Agent Adapter, Observatory Log y las reglas de trabajo. Sin cuenta y sin clave. No instala Fabric: ese es el siguiente paso, una descarga aparte.

npx @passioncode-ai/passioncode@latest update

Lanzador 0.2.1 · reinicia tu agente después · las actualizaciones automáticas están activadas; desactívalas

02

### Añade Fabric

Fabric es el hogar de tus proyectos y sus agentes: cada proyecto guarda allí su propósito, su tablero, sus decisiones y sus versiones. Su primera pantalla ofrece cuatro acciones: crear un agente, adaptar uno que ya tienes, abrir un proyecto o crear uno. Es una vista previa temprana: requiere Docker y la CLI de Supabase, y su conversación guarda los mensajes pero todavía no responde.

Descargar Fabric

0.3.5

para macOS

↓

Requisitos y límites

Apple silicon e Intel · firmado y notarizado · SHA-256 1e54fe557f2752817bb00303a93d595c812609b355f6850420026663cf39b98b · notas de la versión

03

### Crea o adapta un agente

En Claude Code o Codex, pide lo que necesites, o empieza desde las acciones de Fabric para crear y adaptar; en ambos casos, el trabajo se hace en la consola de tu agente de programación. La skill Fabric Agent Adapter hace primero sus preguntas y muestra su plan antes de cambiar nada; la adaptación se hace en una rama nueva fabric-adapter. Obtienes un contrato, un panel, pruebas y un informe de conformidad.

nuevo Crea un agente de Fabric que revise cada mañana las reseñas de nuestra app en la tienda y redacte las respuestas

adaptar Adapta este repositorio a Fabric

04

### Ejecútalo y míralo

Fabric Dashboards muestra todos los servicios de agentes locales en una sola ventana; tu agente puede iniciarlos, detenerlos y abrirlos por MCP.

Descargar Fabric Dashboards

0.7.9

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

05

### Añade el siguiente agente al mismo proyecto

Crea el siguiente agente del mismo modo y dale el mismo proyecto en Fabric. Claude Code, Kilo Code y Hermes Agent iniciados desde Fabric comparten el tablero, la memoria y los traspasos de ese proyecto, así que uno retoma donde lo dejó el otro. Qué agentes se conectan hoy

UNA HERRAMIENTA QUE RECOMENDAMOS

## Agentes que terminan

## lo que empiezan

Para los cambios que hacen tus agentes, recomendamos la task-pipeline, una skill de código abierto independiente de la colección sshlg-skills: lleva cada cambio del brief a la aceptación y no avanza hasta que se supera cada verificación.

npx sshlg-skills install

task-pipeline en GitHub · no forma parte de PassionCode.ai y no necesita nada de él

CONTRIBUIR

## ¿Has encontrado algo que arreglar?

## Envía un pull request

Todos los repositorios de producto son públicos e indican su comando de pruebas en AGENTS.md. Sigue el documento CONTRIBUTING.md de la organización y abre una pull request; al abrirla aceptas el CLA.md.

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

PARA ORGANIZACIONES

## ¿Quieres que funcione

## para todo tu equipo?

Mapeamos tus procesos, estimamos qué pueden asumir los agentes y lo configuramos contigo o por ti.

Estimación y solicitud

→

PassionCode

.ai

Del vibe coding al passion coding

Empezar

Visión

Para organizaciones

Switchboard

Observatory

Inbox

Dashboards

Fabric

GitHub y código fuente

Acerca de

Sistema de diseño

Privacidad

commercial@passioncode.ai

X

↗
