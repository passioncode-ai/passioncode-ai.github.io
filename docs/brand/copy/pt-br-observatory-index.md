Contract: brand-contract v1

<!-- Generated from pt-br/observatory/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Project Observatory | Painel local para projetos operados por agentes | PassionCode.ai

Veja o que mudou nos seus projetos, o que precisa de atenção e onde chaves de API conhecidas deixaram uma cópia. O Project Observatory é um painel local de código aberto da PassionCode.ai, em inglês ou russo.

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

PROJECT OBSERVATORY · POR PASSIONCODE

# Seus projetos

# de volta à vista

Veja o que mudou nos projetos dos seus agentes e o que precisa de você primeiro, inclusive onde uma chave de API conhecida deixou uma cópia, num painel local disponível em inglês ou russo

NO CONJUNTO DE FERRAMENTAS Memória e evidências: o que mudou em cada projeto, o que foi decidido e o que precisa de atenção. É o passo 5 de “Como funciona”. Todas as ferramentas

Começar

↓

Ver código-fonte

↗

Código aberto · macOS + Linux · Python 3.11+

UMA VISÃO / SEUS PROJETOS

PROJETOS

+

ACHADOS

POR DENTRO DO OBSERVATORY

## O que precisa de atenção, primeiro

A visão geral real do Observatory, gerada pelo motor sobre os projetos de uma empresa fictícia.

Ambiente de demonstração sintético · sem projetos, repositórios ou credenciais reais

UM OBSERVATORY LOCAL

## Menos adivinhação

## Mais evidências num relance

01 / INVENTÁRIO

### Saiba o que existe

Escolha a pasta de projetos que você quer observar. O Observatory encontra os repositórios dentro dela e mantém um registro local, com a regra por trás de cada vínculo.

02 / ATIVIDADE

### Veja o que se moveu

Commits, estado da árvore de trabalho e trabalho que existe só nesta máquina, em todos os projetos no escopo, com o desenho semana a semana de cada um.

03 / ACHADOS

### Comece pelo que importa

Os achados vêm com as evidências e um próximo passo, ordenados de crítico a informativo. Achados silenciados guardam quem os silenciou, quando e por quê.

04 / CHAVES

### Encontre cópias de chaves conhecidas

Os metadados das credenciais ficam separados dos valores. Transcrições, logs e bancos SQLite selecionados são comparados com chaves já conhecidas localmente; os achados nunca repetem um valor.

05 / SEU IDIOMA

### Inglês ou russo

O painel vem em inglês por padrão. Defina o russo para o espaço de trabalho ou alterne com EN/RU na barra lateral; as contagens usam as formas de plural de cada idioma.

06 / AGENTES

### Dê contexto ao próximo agente

Uma CLI, ferramentas MCP e um plugin do Claude Code compartilham os mesmos fatos locais. Integrações e tarefas em segundo plano ficam desativadas até você escolhê-las.

BAIXAR O OBSERVATORY

## Comece pelo seu próprio espaço de trabalho

Release mais recente: 0.21.0. Nenhuma chave de API é necessária para a primeira observação local. Entregue a configuração ao seu agente de programação ou execute-a você mesmo.

01

### Instale o release

Baixar project_observatory-0.21.0-py3-none-any.whl e SHA256SUMS do release 0.21.0, confira-os com shasum -a 256 -c SHA256SUMS --ignore-missing, depois, num ambiente Python 3.11+ isolado com suporte a extensões do SQLite, pip install --no-deps o wheel e depois o seu extra [full] com -c "$(project-observatory full-path)/requirements-full.lock", o conjunto de dependências com o qual o release foi testado. No macOS, use o Python do Homebrew.

02

### Crie um espaço de trabalho privado

project-observatory full init, depois escolha a pasta a observar com full configure sources projects. Configuração, chaves e histórico ficam fora do código instalado.

03

### Observe e abra

project-observatory full local, depois full open. Para o russo: full configure interface locale ru.

04

### Conecte seu agente

O servidor MCP fala stdio: claude mcp add observatory --scope user -e OBSERVATORY_HOME="$OBSERVATORY_HOME" -- "$(python -c 'import sys; print(sys.executable)')" "$(project-observatory full-path)/mcp/server.py", depois peça observatory_overview.

Guia de instalação

↗

Primeiros passos e integrações

↗

Todos os releases

↗

App para Mac: ProjectObservatory-0.21.0-macos.zip, assinado com Developer ID e notarizado pela Apple, para macOS 14+. Ele abre no painel e usa o motor instalado acima; confira-o com o mesmo SHA256SUMS.

O release atual, 0.21.0, está sob a AGPL, como todos os releases desde a 0.10.0, a primeira sob a AGPL; a 0.9.1 e as anteriores mantêm a licença com a qual foram lançadas.

A varredura de valores conhecidos compara artefatos selecionados com chaves já conhecidas localmente. Ela não consegue encontrar segredos desconhecidos nem provar que nenhuma cópia restou, e uma cópia local não é prova de que alguém mais obteve uma chave. A rotação real nos provedores e os hosts MCP externos ficam fora da suíte de testes offline.

ANTES DE COMEÇAR

## Algumas distinções úteis

O Observatory envia meus projetos ou chaves para algum lugar?

Não. O inventário, o histórico e as observações ficam no seu espaço de trabalho privado, na sua máquina. As integrações opcionais têm acesso próprio; cada uma é ativada separadamente, com a sua própria conta.

O que ele lê?

Somente as pastas e fontes que você configurar. full doctor informa o que está ativado e o que está faltando, e o painel avisa quando uma fonte não foi medida em vez de mostrar zero.

É a mesma coisa que o Switchboard?

Não. O Switchboard gerencia suas contas do Claude Code e do Codex. O Observatory mantém à vista os projetos em que esses agentes trabalham. Ambas são ferramentas de código aberto da PassionCode que você pode usar hoje.

E o Fabric?

O Fabric, em prévia inicial, é a casa dos seus projetos e dos agentes deles. O Observatory está disponível agora como uma ferramenta local separada. Conhecer o Fabric.

Posso inspecionar ou compilar por conta própria?

Sim. O Project Observatory é código aberto sob a GNU AGPL-3.0. Para usos que a AGPL não cobre, há uma licença comercial disponível em passioncode.ai/business. As versões já lançadas mantêm a sua licença: a 0.8.1 e as anteriores sob MIT, da 0.8.2 à 0.9.1 sob PolyForm Noncommercial or Internal Use. O repositório inclui o código-fonte, os testes, o modelo de segurança e as notas de versão.

CÓDIGO ABERTO · LOCAL EM PRIMEIRO LUGAR

## Seus projetos, suas evidências

Configure um espaço de trabalho privado, observe suas próprias pastas e diga onde ele precisa melhorar.

Começar

↑

Relatar um problema

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
