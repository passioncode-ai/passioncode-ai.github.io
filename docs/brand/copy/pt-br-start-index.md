Contract: brand-contract v1

<!-- Generated from pt-br/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Primeiros passos | Instale seu ambiente de trabalho de agentes de IA | PassionCode.ai

Instale as skills da PassionCode.ai, adicione o Fabric, crie seu primeiro agente Fabric com o Claude Code ou o Codex ou adapte um projeto existente, rode-o no Fabric Dashboards e adicione o próximo agente ao mesmo projeto. Gratuito e de código aberto.

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

Polski

한국어

Español

简体中文

日本語

Obter as ferramentas

↓

Primeiros passos · gratuito e de código aberto

# De um Mac vazio ao seu primeiro agente

Crie agentes que continuam funcionando e sabem o que os outros fizeram. Cinco passos, cerca de vinte minutos, cada um útil por si só

Requer Node.js 18+ e Claude Code ou Codex O Fabric requer macOS em Apple silicon ou Intel

01

Instale as skills

02

Adicione o Fabric

03

Crie ou adapte um agente

04

Rode e veja funcionando

05

Adicione o próximo agente

+

Contribua

## Passos

01

### Instale as skills

O launcher da PassionCode.ai instala no seu agente de programação as skills do Fabric Agent Adapter, o Observatory Log e as regras de trabalho. Sem conta e sem chave. Ele não instala o Fabric: esse é o próximo passo, um download separado.

npx @passioncode-ai/passioncode@latest update

Launcher 0.1.31 · reinicie o seu agente depois · as atualizações automáticas estão ativadas; desative-as

02

### Adicione o Fabric

O Fabric é a casa dos seus projetos e dos agentes deles: cada projeto guarda ali o propósito, o quadro, as decisões e os releases. A primeira tela oferece quatro ações: criar um agente, adaptar um que você já tem, abrir um projeto ou criar um. É uma prévia inicial: precisa do Docker e da Supabase CLI, e a conversa dele salva as mensagens, mas ainda não responde.

Baixar o Fabric

0.3.4

para macOS

↓

Requisitos e limites

Apple silicon e Intel · assinado e notarizado · SHA-256 4d8e8da80bcf490fed955dd627ed64b76a1c53c50aa89de49ac6eaeed91f0653 · notas de versão

03

### Crie ou adapte um agente

No Claude Code ou no Codex, peça o que você precisa, ou comece pelas ações de criar e adaptar do Fabric; nos dois casos, o trabalho roda no console do seu agente de programação. A skill Fabric Agent Adapter faz as perguntas primeiro e mostra o plano antes de mudar qualquer coisa; a adaptação acontece numa nova branch fabric-adapter. Você recebe um contrato, um painel, testes e um relatório de conformidade.

novo Crie um agente Fabric que verifique todas as manhãs as avaliações do nosso app na loja e redija respostas

adaptar Adapte este repositório ao Fabric

04

### Rode e veja funcionando

O Fabric Dashboards mostra todos os serviços de agentes locais em uma só janela; seu agente pode iniciá-los, pará-los e abri-los via MCP.

Baixar o Fabric Dashboards

0.6.7

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

05

### Adicione o próximo agente ao mesmo projeto

Crie o próximo agente do mesmo jeito e dê a ele o mesmo projeto no Fabric. Claude Code, Kilo Code e Hermes Agent iniciados pelo Fabric compartilham o quadro, a memória e as passagens de trabalho desse projeto, então um continua de onde o outro parou. Quais agentes se conectam hoje

UMA FERRAMENTA QUE RECOMENDAMOS

## Agentes que terminam

## o que começam

Para as mudanças que seus agentes fazem, recomendamos a task-pipeline, uma skill de código aberto independente da coleção sshlg-skills: ela leva cada mudança do brief até a aceitação e não avança até que cada verificação seja aprovada.

npx sshlg-skills install

task-pipeline no GitHub · ela não faz parte da PassionCode.ai e não depende dela para nada

CONTRIBUA

## Encontrou algo para corrigir?

## Envie um pull request

Todo repositório de produto é público e informa seu comando de testes em AGENTS.md. Siga o da organização da organização e abra um pull request; ao abri-lo, você concorda com o CLA.md.

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
