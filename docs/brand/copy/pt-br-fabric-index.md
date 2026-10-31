Contract: brand-contract v1

<!-- Generated from pt-br/fabric/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric | A casa dos seus projetos e dos agentes deles · prévia inicial para macOS, Windows e Linux | PassionCode.ai

O Fabric é a casa dos seus projetos e dos agentes deles, em prévia inicial para macOS, Windows e Linux. Ele reúne num só lugar, no seu computador, o quadro, as decisões, o trabalho e os releases de um projeto.

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

Configurar

↓

FABRIC · PRÉVIA INICIAL

# Uma casa para os seus projetos

# e os agentes deles

O Fabric guarda no seu computador o propósito, o quadro, as decisões e os releases de cada projeto, para todos os agentes que trabalham nele. Estamos construindo o Fabric para atuar como o CEO dos seus agentes

NO CONJUNTO DE FERRAMENTAS A casa que todos os agentes de um projeto compartilham: propósito, quadro, decisões e releases. São os passos 2 e 5 de “Como funciona”. Todas as ferramentas

Configure tudo com um único comando →

Baixar o Fabric

↓

Conhecer o fluxo de trabalho

↓

Prévia inicial 0.3.15 · macOS, Windows e Linux

A PRIMEIRA TELA · QUATRO AÇÕES

Criar um agente

Dê um nome, diga o que ele faz, escolha a pasta e o agente de programação

Adaptar um agente

Traga um feito em outro lugar, numa nova branch

Abrir um projeto

Uma pasta, ou uma pasta com vários projetos

Criar um projeto

Uma nova casa para o propósito, o quadro e os releases

O trabalho do agente em si roda no console do seu agente de programação

O PROBLEMA

## Um projeto dura mais

## do que uma conversa

Um agente pode concluir uma tarefa e, mesmo assim, a equipe perde o motivo por trás dela. O contexto se espalha por vários chats, as decisões precisam ser repetidas e alguém tem de juntar o trabalho de novo.

Estamos construindo o Fabric em torno do projeto: o propósito, a equipe, as decisões e o histórico que devem sobreviver à próxima sessão.

O CICLO DE OPERAÇÃO · DIREÇÃO

## Da intenção

## a um resultado verificado

Este é o fluxo de trabalho que estamos desenhando. Ele descreve a direção do Fabric, não a promessa de que cada etapa já esteja disponível hoje.

01

### Entender o projeto

Reunir no mesmo lugar o propósito, o estado atual e o contexto relevante.

02

### Tornar o trabalho explícito

Transformar o objetivo em trabalho com responsável, resultado esperado e limites claros.

03

### Coordenar a execução

Encaminhar o trabalho entre pessoas, agentes e processos repetíveis sem perder o contexto do projeto.

04

### Revisar e continuar aprendendo

Conferir o resultado com base em evidências. Preservar decisões e aprendizados para o próximo ciclo.

POR DENTRO DO FABRIC

## Onde você parou

## O que precisa de você

A janela real do Fabric, mostrada com um espaço de demonstração sintético: quatro projetos e 28 dias de trabalho.

Início · projetos de demonstração sintéticos, sem contas nem repositórios reais

O quadro · o que espera pela sua decisão

Releases · o que entrou, por quê e o que confirma

Criar um agente · um nome, uma frase, uma pasta, um agente de programação

Adaptar um agente · o Fabric lê a pasta e nada mais

O console depois de “Criar” · as perguntas, uma de cada vez

O console depois de “Adaptar” · o plano antes de qualquer mudança

As telas Criar e Adaptar são a própria interface do Fabric, renderizada a partir do código-fonte com dados de exemplo. O texto do console é um exemplo escrito do que o agente de programação faz, não uma gravação.

COMO ESTAMOS CONSTRUINDO

## As pessoas continuam responsáveis

A coordenação é para onde o Fabric está indo, e ela nunca substitui você. Você decide para que serve o projeto e o que cada agente pode fazer.

AUTORIDADE

### A permissão continua explícita

Objetivos, responsabilidades e limites pertencem ao projeto. A confiança de um agente não é permissão para agir.

ESCOLHA

### Os agentes continuam substituíveis

O projeto deve manter o propósito e o histórico quando você troca de provedor ou o agente que faz o trabalho.

EVIDÊNCIAS

### Resultados precisam de um recibo

Uma tarefa concluída deve vir com algo que uma pessoa possa conferir, não apenas com um agente dizendo que terminou.

BAIXAR O FABRIC

## Uma prévia inicial

## para Mac, Windows e Linux

Prévia mais recente: 0.3.15. O Fabric roda no seu computador com um banco de dados local; seus projetos ficam nesta máquina.

⌘

### macOS

Apple silicon e Intel (universal) · macOS 13 ou mais recente
Instalador DMG · assinado com Developer ID e notarizado pela Apple

Baixar para macOS

↓

Abra o DMG e arraste o Fabric para Aplicativos. O mesmo DMG roda em Macs com Apple silicon e Intel.

⊞

### Windows

x64 (Intel e AMD) e arm64 · instalador para Windows
Instala para o seu usuário · assinatura Authenticode

Baixar para Windows x64

↓

Windows em Arm (arm64) ↓

Execute o arquivo de instalação. Os terminais que o Fabric abre usam o PowerShell.

>_

### Linux

x64 e arm64
Pacote .deb ou AppImage

Baixar o .deb para x64

↓

.deb para arm64 ↓

AppImage para x64 ↓

AppImage para arm64 ↓

Prefira o .deb: ele abre links fabric:// e mantém um só caminho para registrar o fabric-mcp. Um AppImage é montado num caminho novo a cada inicialização.

☰

### Antes de abrir

O Fabric inicia o próprio banco de dados local com a Supabase CLI dentro do Docker.

No macOS: Docker Desktop ou OrbStack, em execução, e a Supabase CLI: brew install supabase/tap/supabase

No Windows: Docker Desktop com WSL2, em execução, e a Supabase CLI: scoop install supabase

No Linux: Docker Engine, em execução, e a Supabase CLI

Claude Code ou Codex CLI, com login feito, para os agentes trabalharem

Se faltar o Docker ou a CLI, o Fabric avisa qual deles na primeira inicialização. Veja com quais agentes de programação o Fabric funciona e o que cada um deles pode fazer nele.

Ainda não no Windows e no Linux: o Fabric não lê se um agente de programação está com login feito, e avisa isso. Ainda não no Windows: conectar o segredo de um produto em nuvem pelo Project Observatory.

Notas de versão e checksum

↗

Ver código-fonte

↗

Esta é uma prévia inicial. Você pode manter projetos, um quadro de decisões, tarefas, metas, um pulso do trabalho e releases com seus recibos. A conversa com o Fabric salva as suas mensagens, mas o Fabric ainda não responde. Uma versão mais nova não atualiza sozinha um banco de dados existente; ela informa o comando que você deve executar. Agentes registrados neste Mac podem pedir ao Fabric, pelo hub local de agentes, acesso a um produto conectado, como o Fabric Inbox; você permite ou recusa cada pedido e pode revogá-lo em Ajustes. Desde a versão 0.3.2, o Fabric envia contagens anônimas de uso — apenas quantidades e tipos, nunca nomes, caminhos ou conteúdo; desative em Ajustes → Compartilhar contagens de uso, o que vale para todos os apps da PassionCode.ai no seu Mac.

O Fabric é código aberto sob a GNU AGPL-3.0, e uma licença comercial está disponível em passioncode.ai/business para usos que a AGPL não cobre. A 0.3.15 prévia é compilada, assinada e notarizada no CI a partir desse código público.

FUNCIONA COM O FABRIC

## Quatro ferramentas em volta da casa

## Cada uma também funciona sozinha

O Fabric guarda o projeto. Estas quatro ferramentas funcionam com o Fabric e também sozinhas, então você pode começar por qualquer uma.

Fabric Switchboard

Escolha a conta em que cada agente roda, com os limites de uso à vista.

↗

Fabric Dashboards

Todos os serviços locais de agentes em uma só janela, controlados por você ou pelos agentes.

↗

Project Observatory

O que mudou em cada projeto e o que precisa de atenção, com as evidências.

↗

Fabric Inbox

E-mails do Gmail e do Cloudflare em uma só lista, os importantes primeiro; os agentes respondem conforme as regras.

↗

01

DISPONÍVEL AGORA

### Um único comando configura tudo

No Mac, as quatro ferramentas e o Fabric (quando o Docker e a CLI do Supabase estão lá), com os servidores MCP e as skills, a partir de releases verificados. Rode de novo mais tarde e ele verifica e conserta.

Configurar

02

DIREÇÃO

### Adicionar uma ferramenta de dentro do Fabric

Escolher e instalar as ferramentas sem sair do Fabric é o que estamos construindo.

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

Investidores

Contribuir

Imprensa

Sistema de design

Privacidade

commercial@passioncode.ai

X

↗
