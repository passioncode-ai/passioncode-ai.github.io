Contract: brand-contract v1

<!-- Generated from pt-br/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Primeiros passos | Instale seu ambiente de trabalho de agentes de IA | PassionCode.ai

Configure o PassionCode.ai com um comando, ou com um prompt para o Claude Code ou o Codex: as ferramentas, seus servidores MCP e as skills. O mesmo comando verifica e corrige uma configuração que você já tem. Gratuito e de código aberto.

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

Crie agentes que continuam trabalhando e sabem o que os outros fizeram. Um comando configura as ferramentas, e o mesmo comando as verifica depois

Requer Node.js 18+ e Claude Code ou Codex O Fabric requer macOS em Apple silicon ou Intel

→

Um comando

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

UM COMANDO

## Configure tudo,

## ou verifique o que você já tem

Um comando instala as ferramentas que você escolher a partir das versões assinadas, conecta seus servidores MCP ao Claude Code, Codex, Gemini CLI e Kimi Code, e adiciona as skills. Num computador que já está configurado, o mesmo comando verifica tudo, corrige o que está errado e mostra o que mudou.

npx @passioncode-ai/passioncode@latest setup

Requer Node.js 18+ · instala os apps no macOS; no Linux e no Windows configura as skills e os servidores MCP · não instala nada cuja assinatura, checksum ou notarização falhe · para verificar sem mudar nada:

npx @passioncode-ai/passioncode@latest doctor

### Ou deixe seu agente de programação fazer isso

Copie este prompt no Claude Code, no Codex ou em outro agente de programação. Ele executa o comando, termina o que pode e entrega uma lista curta do que só você pode fazer: entrar na conta, permitir acesso, digitar uma chave na janela da própria ferramenta.

Configure o PassionCode.ai neste computador, ou verifique e corrija se ele já estiver configurado. Execute npx --yes @passioncode-ai/passioncode@latest setup --yes --json (requer Node 18 ou mais recente) e leia o JSON: o comando instala os apps que faltam a partir das versões assinadas, as skills e cada servidor MCP, corrige o que estiver errado e verifica tudo de novo. Não baixe nem instale nada à mão, e nunca pare nem mate um app em execução. Depois execute cada passo de integração de produto listado que um agente pode executar, nunca me peça uma chave ou senha no chat (as ferramentas abrem seu próprio campo oculto) e termine com npx --yes @passioncode-ai/passioncode@latest doctor. Diga brevemente o que você configurou ou corrigiu, o que ainda falha e os passos numerados que só eu posso fazer, como entrar na conta, e me lembre de reiniciar você para que as novas skills e os servidores MCP carreguem.

O Fabric é uma prévia inicial: o comando o instala quando o Docker e a CLI do Supabase estão no seu computador e, se não, diz o que adicionar. Prefere fazer à mão? Os cinco passos abaixo são a mesma configuração, uma ferramenta por vez.

## Passos

01

### Instale as skills

O launcher da PassionCode.ai instala no seu agente de programação as skills do Fabric Agent Adapter, o Observatory Log e as regras de trabalho. Sem conta e sem chave. Ele não instala o Fabric: esse é o próximo passo, um download separado.

npx @passioncode-ai/passioncode@latest update

Launcher 0.2.2 · reinicie o seu agente depois · as atualizações automáticas estão ativadas; desative-as

02

### Adicione o Fabric

O Fabric é a casa dos seus projetos e dos agentes deles: cada projeto guarda ali o propósito, o quadro, as decisões e os releases. A primeira tela oferece quatro ações: criar um agente, adaptar um que você já tem, abrir um projeto ou criar um. É uma prévia inicial: precisa do Docker e da Supabase CLI, e a conversa dele salva as mensagens, mas ainda não responde.

Baixar o Fabric

0.3.5

para macOS

↓

Requisitos e limites

Apple silicon e Intel · assinado e notarizado · SHA-256 1e54fe557f2752817bb00303a93d595c812609b355f6850420026663cf39b98b · notas de versão

03

### Crie ou adapte um agente

No Claude Code ou no Codex, peça o que você precisa, ou comece pelas ações de criar e adaptar do Fabric; nos dois casos, o trabalho roda no console do seu agente de programação. A skill Fabric Agent Adapter faz as perguntas primeiro e mostra o plano antes de mudar qualquer coisa; a adaptação acontece numa nova branch fabric-adapter. Você recebe um contrato, um painel, testes e um relatório de conformidade.

novo Crie um agente Fabric que verifique todas as manhãs as avaliações do nosso app na loja e redija respostas

adaptar Adapte este repositório ao Fabric

04

### Rode e veja funcionando

O Fabric Dashboards mostra todos os serviços de agentes locais em uma só janela; seu agente pode iniciá-los, pará-los e abri-los via MCP.

Baixar o Fabric Dashboards

0.7.9

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

X

↗
