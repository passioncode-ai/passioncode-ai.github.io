Contract: brand-contract v1

<!-- Generated from es/fabric/agents/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Agentes de programación con los que funciona Fabric | Fabric | PassionCode.ai

A 8 de octubre de 2026, Fabric 0.3.2 conecta Claude Code, Kilo Code y Hermes Agent; Codex y Cline se ejecutan en Fabric sin sus herramientas, y otros cinco agentes son los siguientes en el plan.

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

Português (Brasil)

Descargar

↓

FABRIC · AGENTES DE PROGRAMACIÓN COMPATIBLES

# Agentes de programación

# con los que funciona Fabric

Qué agentes puede iniciar Fabric en tu proyecto, cuáles reciben las herramientas propias de Fabric y cuáles vienen después

A 8 de octubre de 2026 · la app publicada es Fabric 0.3.2

En la app publicada, Fabric conecta Claude Code, Kilo Code y Hermes Agent: inicia el agente en la terminal de un proyecto y le da las herramientas de Fabric durante esa sesión. Codex y Cline se ejecutan en Fabric, pero todavía no tienen las herramientas de Fabric. Otros cinco agentes vienen a continuación en el plan, y después el resto de los que se listan abajo. Fabric Switchboard cambia las cuentas de suscripción de Claude Code y Codex, y las cuentas con clave de API de los demás agentes a través de Switchboard.

01 / QUÉ SIGNIFICA «FUNCIONA CON»

## Tres niveles

## Cada agente está en uno

Funcionar con Fabric puede significar cosas distintas, así que esta página indica el nivel de cada agente.

CONECTADO

### Se inicia con las herramientas de Fabric

Fabric inicia el agente en la terminal de un proyecto. Solo durante esa sesión, el agente recibe las herramientas propias de Fabric: reclamaciones, traspasos, memoria y el tablero. Una credencial de una sola sesión transporta ese acceso y no se escribe nada en los ajustes del propio agente.

SE EJECUTA EN FABRIC

### Se inicia en la carpeta del proyecto

Fabric inicia el agente en la carpeta del proyecto, de modo que trabaja sobre los archivos de ese proyecto. Todavía no tiene las herramientas de Fabric.

PLANIFICADO

### En el plan, por orden

Tenemos la intención de conectar el agente. El plan de abajo da un orden, no fechas.

02 / CONECTADOS

## Conectados

## Las herramientas de Fabric durante la sesión

Claude Code, Kilo Code y Hermes Agent, los tres en la app publicada.

Agentes conectados, a 8 de octubre de 2026

Agente

Sitio oficial

Estado

Claude Code

claude.com

Publicado, en Fabric 0.3

Kilo Code

kilo.ai

Publicado, en Fabric 0.3.2

Hermes Agent

hermes-agent.nousresearch.com

Publicado, en Fabric 0.3.2

Kilo Code toma los ajustes de su sesión de su variable KILO_CONFIG_CONTENT, y el archivo propio kilo.json de un proyecto no puede anularlo. Lo verificamos en Kilo 7.4.17 el 5 de octubre de 2026. Hermes Agent se conecta mediante el protocolo abierto Agent Client Protocol: Fabric abre su sesión y le entrega las herramientas de Fabric a través de un puente local, verificado en Hermes 0.21.4 ese mismo día. Hermes necesita que elijas un modelo en su propia configuración antes de poder responder.

03 / SE EJECUTAN EN FABRIC

## Se ejecutan en Fabric

## Aún sin conectar

Fabric inicia el agente en la carpeta del proyecto. Trabaja allí sin las herramientas de Fabric.

Agentes que se ejecutan en Fabric, a 8 de octubre de 2026

Agente

Sitio oficial

Estado

Codex

github.com/openai/codex

Se ejecuta en la carpeta del proyecto, aún sin herramientas de Fabric

Cline

cline.bot

Publicado, en Fabric 0.3.2; pregunta antes de usar cada herramienta, aún sin herramientas de Fabric

04 / PLANIFICADOS

## Planificados

## En este orden

Cinco vienen a continuación como grupo, y los últimos nueve los abordamos caso por caso. Ninguno tiene todavía las herramientas de Fabric.

Agentes de programación planificados, por orden, a 8 de octubre de 2026

Agente

Sitio oficial

Orden

omp (oh-my-pi)

omp.sh

A continuación, como grupo

pi

pi.dev

A continuación, como grupo

OpenClaw

openclaw.ai

A continuación, como grupo

OpenHands

openhands.dev

A continuación, como grupo

Cursor CLI

cursor.com/cli

A continuación, como grupo

Command Code

commandcode.ai

Caso por caso

DeepSeek Harness

deepseek.com/harness

Caso por caso

LangChain Deep Agents (dcode)

docs.langchain.com

Caso por caso

Letta

letta.com

Caso por caso

Strix

strix.ai

Caso por caso

goose

goose-docs.ai

Caso por caso

Qwen Code

github.com/QwenLM/qwen-code

Caso por caso

Gemini CLI

geminicli.com

Caso por caso

OpenCode

opencode.ai

Caso por caso

### Apps de escritorio y editores

Zed, ZCode, Proto, CodeGPT, Freebuff y HackerAI son apps de escritorio y editores que otro programa no puede iniciar. En su lugar, pueden ser clientes del centro local de Fabric. Cada uno necesita su propia entrada documentada, y esas entradas están planificadas, aún no escritas.

Apps de escritorio y editores planificados, a 8 de octubre de 2026

App

Sitio oficial

Vía

Zed

zed.dev

Cliente del centro local, entrada planificada

ZCode

zcode.z.ai

Cliente del centro local, entrada planificada

Proto

proto.erp.ai

Cliente del centro local, entrada planificada

CodeGPT

codegpt.co

Cliente del centro local, entrada planificada

Freebuff

freebuff.com

Cliente del centro local, entrada planificada

HackerAI

hackerai.co

Cliente del centro local, entrada planificada

05 / CÓMO SE CONECTAN LOS AGENTES PLANIFICADOS

## Un protocolo abierto

## para los agentes planificados

Los agentes planificados se conectan mediante el Agent Client Protocol (ACP). Su configuración de sesión incluye los servidores MCP de la sesión, y Fabric maneja cualquier agente que lo hable.

06 / POR QUÉ ESTOS AGENTES

## Elegidos según

## lo que usa la gente

Los elegimos a partir del ranking público de apps de OpenRouter, consultado el 5 de octubre de 2026. De su top 30 diario, 15 son agentes de programación o arneses (harness) de agentes. Hermes Agent, conectado desde Fabric 0.3.2, tiene la mayor cuota.

07 / CUENTAS

## Cambio de cuentas

## Claude Code y Codex hoy

Fabric Switchboard cambia las cuentas de suscripción de Claude Code y Codex. Desde la 0.6.1 también funciona con los demás agentes: cada uno recibe las herramientas de Switchboard, y un agente que acepta un endpoint personalizado puede enviar sus solicitudes a través de Switchboard, que cambia sus cuentas con clave de API. Qué agentes y cómo se conecta cada uno.

Descargar para macOS

↓

Conocer Switchboard

↗

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

Twitter

↗
