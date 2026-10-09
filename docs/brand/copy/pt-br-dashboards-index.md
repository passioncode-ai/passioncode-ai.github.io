Contract: brand-contract v1

<!-- Generated from pt-br/dashboards/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Dashboards | Seus serviços de agentes locais, reunidos

Uma janela do Mac para os seus serviços de agentes locais. Veja o que precisa de atenção, abra painéis e deixe seus agentes usarem as mesmas ferramentas via MCP.

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

Baixar

↓

FABRIC DASHBOARDS · macOS

# Seus serviços de agentes

# Um só lugar para olhar

Veja o que está rodando, o que precisa de atenção e o que aconteceu por último, com o painel de cada serviço num só app para Mac

NA FAMÍLIA Saúde, gastos e controle: cada serviço de agente, seu estado, seus gastos e suas atualizações numa só janela. A família inteira

Baixar para macOS ↓

Ver código-fonte ↗

Release 0.6.7 · macOS 13+ · Apple silicon + Intel

SEUS SERVIÇOS LOCAIS / REUNIDOS

A JANELA

## Todos os serviços de agentes

## numa só tela

O que está pronto, o que precisa de você e quanto custa, com a ação a um clique. Cada serviço abre o próprio painel dentro do app.

O app real, a partir do build de desenvolvimento · serviços de exemplo do kit do Fabric Agent Adapter, sem dados reais

O painel próprio de um serviço, aberto no app

01 / MANTENHA O TRABALHO À VISTA

## Uma janela para

## as ferramentas que fazem o trabalho

O Fabric Dashboards descobre os serviços compatíveis no seu Mac. Cada serviço mantém a própria função; você ganha um lugar comum para inspecioná-los e controlá-los.

### Veja o que precisa de você

O estado do serviço, a atividade mais recente e os itens de atenção aparecem juntos. Uma sondagem lenta não é tratada de imediato como queda.

### Abra o painel de verdade

A interface própria de cada serviço abre dentro do app, já com login feito. O Project Observatory é um serviço compatível que você pode usar hoje.

### Cuide do próximo passo

Inicie, pare ou reinicie um serviço, inspecione os logs dele e use as ações que o contrato dele expõe. Fechar o Dashboards deixa seus serviços em execução.

NA 0.6

## Gastos, um console

## e atualizações em que você pode confiar

O que os releases 0.6 trouxeram, da 0.6.0 em 6 de outubro à 0.6.5 em 8 de outubro de 2026.

### Todos os limites em Gastos

A página Gastos lista os limites que cada agente aplica: o que mais precisa de você aparece em vermelho quando interrompeu o trabalho ou ultrapassou a linha, e em âmbar aos 80%, e cada agente se expande para mostrar todos os limites, com a janela e o que foi gasto. Seu agente lê a mesma lista via MCP.

### Um console de agente ao lado do painel

Um terminal de verdade abre ao lado do painel de um serviço, executando Claude Code, Codex ou outro runtime no repositório desse agente. Onde o Fabric Switchboard vincula a pasta a um projeto, a sessão começa na conta desse projeto.

### Atualizações verificadas antes

O app se atualiza sozinho: um release precisa trazer a assinatura da organização e bater com os checksums antes de ser instalado, e espera enquanto um console ou um comando estiver em execução. A instalação automática pode ser desativada em Ajustes.

### A família sempre atualizada

A seção de atualizações do ambiente em Ajustes acompanha o Fabric Agent Contract e as skills da PassionCode.ai, e pode atualizar as skills em segundo plano depois de verificar quem as publicou. Essa opção vem desativada por padrão.

### Inglês ou russo

Ajustes → Idioma: como neste Mac, English ou Русский. A janela, o menu e a bandeja mudam de uma vez.

02 / BAIXAR O FABRIC DASHBOARDS

## Um só download

## Seus serviços continuam seus

### macOS

Release 0.6.7. DMG universal para Apple silicon e Intel, macOS 13 ou mais recente. Assinado com Developer ID, notarizado e com o ticket anexado (stapled).

Baixar o Fabric Dashboards ↓

Abra o DMG, arraste o Fabric Dashboards para Aplicativos e depois abra-o. O app inicia no login; você pode mudar isso em Ajustes.

### Antes de abrir

Os serviços são instalados separadamente. Uma lista vazia é esperada até que um serviço compatível seja instalado; o Dashboards não transforma todo processo local em serviço de agente.

Experimente Project Observatory, ou crie o seu próprio serviço com o Fabric Agent Adapter. O app em si não precisa de conta nem de chave de API.

DMG SHA-256

d0e916fc1a9ee0586446c67474eb75156e770cc37dff302a3808703b4ec42e02

Notas de versão e checksums ↗

Guia de instalação ↗

03 / PARA OS SEUS AGENTES

## Os mesmos serviços

## A partir do seu agente

Registre o servidor MCP do app no seu cliente. Um agente pode listar serviços, obter links de painéis e usar as operações expostas pelas regras do app.

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Depois de instalar o app em Aplicativos, peça ao seu agente para chamar list_services. Um resultado vazio significa que nenhum serviço foi instalado ainda. Outros clientes MCP podem executar o mesmo executável como servidor stdio. Veja o guia de configuração do MCP.

04 / BOM SABER

## Se encaixa no seu ambiente

Preciso do Fabric?

Não. O Fabric Dashboards funciona sozinho. Ele é uma das ferramentas do Fabric e pode mostrar serviços compatíveis antes de você usar a prévia inicial do Fabric.

Quais serviços aparecem?

Serviços que publicam um descritor local para fabric-service/0.1. O Project Observatory oferece suporte a ele. O Fabric Agent Contract define o protocolo e o Adapter ajuda você a implementá-lo.

É código aberto?

O Fabric Dashboards é código aberto sob a GNU AGPL-3.0. Há uma licença comercial disponível: passioncode.ai/business. O release 0.1.0 mantém a MIT; os 0.2.0 e 0.3.0 mantêm a PolyForm Noncommercial or Internal Use. O release 0.3.1 é o primeiro sob a AGPL.

PARTE DO SEU AMBIENTE DE TRABALHO DE AGENTES

## Comece pelos serviços

## que você já usa

Inspecione projetos com o Observatory. Configure contas com o Switchboard. Adicione só as ferramentas de que o seu trabalho precisa.

Conhecer as ferramentas ↗

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
