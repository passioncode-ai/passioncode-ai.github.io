Contract: brand-contract v1

<!-- Generated from pt-br/fabric/agents/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Agentes de programação com os quais o Fabric funciona | Fabric | PassionCode.ai

Em 8 de outubro de 2026, o Fabric 0.3.2 conecta Claude Code, Kilo Code e Hermes Agent, Codex e Cline rodam no Fabric sem as ferramentas dele, e outros cinco agentes são os próximos do plano.

Ir para o conteúdo

PassionCode

.ai

Visão

Para você

Para organizações

As ferramentas

Sobre

Português (Brasil)

English

Русский

Deutsch

Français

Español

Baixar

↓

FABRIC · AGENTES DE PROGRAMAÇÃO COMPATÍVEIS

# Agentes de programação

# com os quais o Fabric funciona

Quais agentes o Fabric pode iniciar no seu projeto, quais deles recebem as ferramentas próprias do Fabric e quais vêm a seguir

Em 8 de outubro de 2026 · o app lançado é o Fabric 0.3.2

No app lançado, o Fabric conecta Claude Code, Kilo Code e Hermes Agent: ele inicia o agente no terminal de um projeto e lhe dá as ferramentas do Fabric durante essa sessão. Codex e Cline rodam no Fabric, mas ainda não têm as ferramentas do Fabric. Outros cinco agentes vêm a seguir no plano, depois o restante da lista abaixo. O Fabric Switchboard alterna contas de assinatura para Claude Code e Codex, e contas com chave de API para os demais agentes por meio do Switchboard.

01 / O QUE SIGNIFICA “FUNCIONA COM”

## Três níveis

## Cada agente está em um

“Funcionar com o Fabric” pode significar coisas diferentes, por isso esta página indica o nível de cada agente.

CONECTADO

### Iniciado com as ferramentas do Fabric

O Fabric inicia o agente no terminal de um projeto. Somente nessa sessão, o agente recebe as ferramentas próprias do Fabric: reivindicação de tarefas, passagens de bastão, memória e o quadro. Uma credencial de uma única sessão carrega esse acesso, e nada é gravado nas configurações do próprio agente.

RODA NO FABRIC

### Iniciado na pasta do projeto

O Fabric inicia o agente na pasta do projeto, e ele trabalha nos arquivos desse projeto. Ele ainda não tem as ferramentas do Fabric.

PLANEJADO

### No plano, em ordem

Pretendemos conectar o agente. O plano abaixo indica uma ordem, não datas.

02 / CONECTADOS

## Conectados

## Ferramentas do Fabric na sessão

Claude Code, Kilo Code e Hermes Agent, os três no app lançado.

Agentes conectados, em 8 de outubro de 2026

Agente

Site oficial

Situação

Claude Code

claude.com

Lançado, no Fabric 0.3

Kilo Code

kilo.ai

Lançado, no Fabric 0.3.2

Hermes Agent

hermes-agent.nousresearch.com

Lançado, no Fabric 0.3.2

O Kilo Code lê as configurações da sessão da sua KILO_CONFIG_CONTENT variável, e o arquivo kilo.json do próprio projeto não consegue substituí-las. Verificamos isso no Kilo 7.4.17 em 5 de outubro de 2026. O Hermes Agent se conecta pelo protocolo aberto Agent Client Protocol: o Fabric abre a sessão dele e entrega as ferramentas do Fabric por uma ponte local, verificado no Hermes 0.21.4 no mesmo dia. O Hermes precisa de um modelo escolhido na configuração dele antes de poder responder.

03 / RODAM NO FABRIC

## Rodam no Fabric

## Ainda não conectados

O Fabric inicia o agente na pasta do projeto. Ele trabalha ali sem as ferramentas do Fabric.

Agentes que rodam no Fabric, em 8 de outubro de 2026

Agente

Site oficial

Situação

Codex

github.com/openai/codex

Roda na pasta do projeto, ainda sem ferramentas do Fabric

Cline

cline.bot

Lançado, no Fabric 0.3.2; pergunta antes de cada ferramenta, ainda sem ferramentas do Fabric

04 / PLANEJADOS

## Planejados

## Nesta ordem

Cinco vêm a seguir, em grupo, e os últimos nove avaliamos caso a caso. Nenhum deles tem as ferramentas do Fabric ainda.

Agentes de programação planejados, em ordem, em 8 de outubro de 2026

Agente

Site oficial

Ordem

omp (oh-my-pi)

omp.sh

Próximo, em grupo

pi

pi.dev

Próximo, em grupo

OpenClaw

openclaw.ai

Próximo, em grupo

OpenHands

openhands.dev

Próximo, em grupo

Cursor CLI

cursor.com/cli

Próximo, em grupo

Command Code

commandcode.ai

Caso a caso

DeepSeek Harness

deepseek.com/harness

Caso a caso

LangChain Deep Agents (dcode)

docs.langchain.com

Caso a caso

Letta

letta.com

Caso a caso

Strix

strix.ai

Caso a caso

goose

goose-docs.ai

Caso a caso

Qwen Code

github.com/QwenLM/qwen-code

Caso a caso

Gemini CLI

geminicli.com

Caso a caso

OpenCode

opencode.ai

Caso a caso

### Apps de desktop e editores

Zed, ZCode, Proto, CodeGPT, Freebuff e HackerAI são apps de desktop e editores que outro programa não consegue iniciar. Em vez disso, eles podem ser clientes do hub local do Fabric. Cada um precisa de uma entrada documentada própria; essas entradas estão planejadas, mas ainda não foram escritas.

Apps de desktop e editores planejados, em 8 de outubro de 2026

App

Site oficial

Caminho

Zed

zed.dev

Cliente do hub local, entrada planejada

ZCode

zcode.z.ai

Cliente do hub local, entrada planejada

Proto

proto.erp.ai

Cliente do hub local, entrada planejada

CodeGPT

codegpt.co

Cliente do hub local, entrada planejada

Freebuff

freebuff.com

Cliente do hub local, entrada planejada

HackerAI

hackerai.co

Cliente do hub local, entrada planejada

05 / COMO OS AGENTES PLANEJADOS SE CONECTAM

## Um protocolo aberto

## para os agentes planejados

Os agentes planejados se conectam pelo Agent Client Protocol (ACP). A configuração da sessão leva os servidores MCP dela, e o Fabric controla qualquer agente que o suporte.

06 / POR QUE ESSES AGENTES

## Escolhidos com base

## no que as pessoas usam

Nós os escolhemos a partir do ranking público de apps do OpenRouter, lido em 5 de outubro de 2026. Do top 30 diário, 15 são agentes de programação ou arcabouços (harness) de agentes. O Hermes Agent, conectado desde o Fabric 0.3.2, tem a maior participação.

07 / CONTAS

## Alternância de contas

## Claude Code e Codex hoje

O Fabric Switchboard alterna contas de assinatura para Claude Code e Codex. Desde a 0.6.1, ele também funciona com os outros agentes: cada um recebe as ferramentas do Switchboard, e um agente que aceita um endpoint personalizado pode enviar suas requisições pelo Switchboard, que alterna as contas com chave de API dele. Quais agentes e como cada um se conecta.

Baixar para macOS

↓

Conhecer o Switchboard

↗

PassionCode

.ai

Do vibe coding ao passion coding

Começar

Visão

Para organizações

Switchboard

Observatory

Inbox

Dashboards

Fabric

GitHub e código-fonte

Sobre

Sistema de design

Privacidade

commercial@passioncode.ai

Twitter

↗
