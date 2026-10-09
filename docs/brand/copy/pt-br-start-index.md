Contract: brand-contract v1

<!-- Generated from pt-br/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Primeiros passos | Instale seu ambiente de trabalho de agentes de IA | PassionCode.ai

Instale as skills da PassionCode.ai, adicione o Fabric, crie seu primeiro agente Fabric com o Claude Code ou o Codex, converta um projeto existente, rode-o no Fabric Dashboards e adicione o próximo agente à mesma família. Gratuito e de código aberto.

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

Español

Obter as ferramentas

↓

Primeiros passos · gratuito e de código aberto

# De um Mac vazio ao seu primeiro agente

Chega de construir agentes que se degradam e não conversam entre si. Cinco passos, cerca de vinte minutos, do primeiro agente a uma família que você consegue ver. Cada passo é útil por si só, então pare onde o resultado já bastar

Requer Node.js 18+ e Claude Code ou Codex O Fabric requer macOS em Apple silicon

01

Instale as skills

02

Adicione o Fabric

03

Crie ou converta um agente

04

Rode e veja funcionando

05

Adicione o próximo agente

+

Contribua

## Passos

01

### Instale as skills

O launcher da PassionCode.ai instala as skills do Fabric Agent Adapter, o Observatory Log e as regras de trabalho no Claude Code, no Codex e em outros agentes compatíveis. Sem conta e sem chave.

npx @passioncode-ai/passioncode@latest update

Launcher 0.1.31 · ele instala os membros da família nas versões que fixa · reinicie seu agente depois. As atualizações automáticas vêm ativadas por padrão; desative-as se preferir.

02

### Adicione o Fabric

O Fabric é o agente de IA que atua como CEO: cada projeto ganha um lar para seu propósito, quadro, decisões e lançamentos. É uma prévia inicial: precisa do Docker e da Supabase CLI, e a conversa dele salva mensagens, mas ainda não responde.

Baixar o Fabric

0.3.2

para macOS

↓

Requisitos e limites

Apple silicon · assinado e notarizado · SHA-256 db0f1a2adcc3aae96100e98194268826b1514b26dd0d35e62fd2301e7337457b · notas de versão

03

### Crie ou converta um agente

No Claude Code ou no Codex, peça o que você precisa. A skill Fabric Agent Adapter constrói um serviço compatível com o Fabric: um contrato, um painel, testes e uma verificação de conformidade.

novo Crie um agente Fabric que verifique todas as manhãs as avaliações do nosso app na loja e redija respostas

converter Adapte este repositório ao Fabric

Um agente, servidor MCP ou ferramenta de linha de comando que já existe mantém seu código; o adapter acrescenta em volta dele o que o Fabric precisa. Início rápido do adapter · o contrato

04

### Rode e veja funcionando

O Fabric Dashboards mostra todos os serviços de agentes locais em uma só janela; seu agente pode iniciá-los, pará-los e abri-los via MCP.

Baixar o Fabric Dashboards

0.6.5

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Depois adicione o que o seu trabalho pedir: Fabric Switchboard quando os agentes precisarem de várias contas, Project Observatory para ver o que mudou entre projetos, Fabric Inbox para e-mail.

05

### Adicione o próximo agente e veja a família

Quando o trabalho pedir, construa o próximo agente da mesma forma e dê a ele o mesmo projeto no Fabric. O Claude Code, o Kilo Code e o Hermes Agent iniciados a partir do Fabric compartilham o quadro, a memória e as passagens de bastão desse projeto, e assim um continua de onde o outro parou. O Fabric Dashboards mostra os dois, com estado e gasto, em uma só janela.

próximo Crie um agente Fabric que transforme as respostas redigidas às avaliações em um resumo semanal para o quadro

Cada novo agente entra em uma família que você já consegue ver, em vez de virar mais um script para lembrar. Como a família cresce · quais agentes se conectam hoje

UMA FERRAMENTA QUE RECOMENDAMOS

## Agentes que terminam

## o que começam

Para as mudanças que seus agentes fazem, recomendamos a task-pipeline, uma skill de código aberto independente da família sshlg-skills família. Ela leva uma mudança por etapas com portões, do briefing e do plano até os testes, o deploy e a aceitação, e não avança até que cada portão seja passado.

npx sshlg-skills install

task-pipeline no GitHub · ela não faz parte da PassionCode.ai e não depende dela para nada

CONTRIBUA

## Encontrou algo para corrigir?

## Envie um pull request

Todo repositório de produto é público. Cada um indica seu comando de teste em AGENTS.md e seu início rápido no README; seu agente de programação consegue ler os dois e fazer o resto.

### Escolha um repositório

Faça um fork do produto que você usa ou explore a organização. Issues marcadas com uma label são um bom começo.

### Rode as verificações dele

Leia o AGENTS.md do repositório e o da organização, faça a mudança e rode o comando de teste até ele passar.

### Abra o pull request

Abri-lo é a sua concordância com a CLA.mddo repositório; não há caixa para marcar. Revisamos todo pull request e respondemos.

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

Alguns repositórios são internos e visíveis apenas para colaboradores: a base de conhecimento da equipe e o mapa da organização. Quer entrar para a equipe? Escreva para o Sergey.

PARA ORGANIZAÇÕES

## Quer isso funcionando

## para a sua equipe inteira?

Mapeamos seus processos, estimamos o que os agentes podem assumir e configuramos com você ou por você.

Estimativa e solicitação

→

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
