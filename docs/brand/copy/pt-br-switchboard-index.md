Contract: brand-contract v1

<!-- Generated from pt-br/switchboard/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Switchboard | Gerenciador de contas do Claude Code e do Codex | PassionCode.ai

Gerencie contas do Claude Code e do Codex, confira os limites de uso e troque as requisições gerenciadas. Baixe o Switchboard para macOS e Windows.

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

FABRIC SWITCHBOARD · POR PASSIONCODE

# Suas contas

# Uma troca mais clara

Reúna suas contas do Claude Code e do Codex CLI numa bancada local: veja o uso que cada uma informa e escolha qual conta atende a próxima solicitação

NO CONJUNTO DE FERRAMENTAS As contas: em qual conta cada agente roda, com os limites de uso à vista. É o passo 4 de “Como funciona”. Todas as ferramentas

Baixar o Switchboard

↓

Ver o código-fonte

↗

Código aberto · macOS + Windows · App desktop + CLI

UMA FERRAMENTA / SUAS CONTAS

CLAUDE CODE

+

CODEX CLI

OBTENHA O SWITCHBOARD

## Escolha a sua plataforma

Versão mais recente: 0.6.16. Os dois downloads incluem o app desktop e a switchboard CLI.

⌘

### macOS

Universal · Apple silicon + Intel
macOS 14 ou mais recente · arquivo ZIP

Baixar para macOS

↓

Assinado com Developer ID e notarizado pela Apple. Abra o ZIP, mova o Fabric Switchboard para Aplicativos e abra-o de lá.

⊞

### Windows

x64 · Instalador do app desktop + CLI
Arquivo ZIP · requer WebView2

Baixar para Windows

↓

Compilado nativamente no Windows, ainda sem assinatura Authenticode, então o SmartScreen pode exibir um aviso. O instalador inclui a CLI.

☰

### Antes de abrir

O Switchboard gerencia contas e inicia as CLIs oficiais. Ele não as substitui.

Claude Code ou Codex CLI, instalado separadamente. O Switchboard não inclui assinatura de provedor nem créditos de API.

macOS 14 ou mais recente, em Apple silicon ou Intel.

Windows x64 com WebView2. A versão para Windows ainda não tem assinatura Authenticode.

Depois que você fecha a janela, o app continua rodando na barra de menus e abre no login; para encerrá-lo, use o menu dele.

ZIP do macOS · SHA-256

df7b94a8843711d80891ec91e800585eb1fd4db1440c735975615d1f4d3c7905

ZIP do Windows · SHA-256

dfba522d80e4153d45614a04506d8093c0c3374e9d23068b87f4ed29cf13c2a2

Compare antes de abrir: shasum -a 256 no Terminal, Get-FileHash no PowerShell. Um valor diferente indica um arquivo diferente; baixe-o novamente.

Notas da versão e checksums

↗

Notas de instalação

↗

Todas as versões

↗

Leia as notas da versão antes de atualizar. A aceitação com contas reais de provedores em cada plataforma é acompanhada abertamente no repositório.

O PROBLEMA

## Os limites acabam

## antes do trabalho

Uma sessão longa pode atingir o limite de uso de uma conta no meio de uma tarefa. Aí o trabalho fica parado enquanto você sai, procura outra conta e entra de novo.

O Switchboard mantém o trabalho em andamento. Com a rotação ativada, a próxima requisição passa para outra conta do mesmo pool, e a sessão continua aberta.

POR DENTRO DO SWITCHBOARD

## Todas as suas contas em uma só tela

A interface real do Switchboard, exibida com contas de demonstração sintéticas.

Demo da 0.6.13 no navegador · sem contas reais, credenciais ou solicitações a provedores

UMA BANCADA LOCAL

## Menos malabarismo com contas

## Mais contexto num relance

01 / CONTAS

### Comece de onde você está

Capture explicitamente a conta atual da CLI, entre pela CLI oficial ou importe perfis do Claude Swap. Você escolhe o que traz para o Switchboard.

02 / LIMITES

### Trabalho fica com trabalho

Agrupe as contas em pools, como trabalho e pessoal. O roteamento fica dentro do mesmo provedor e pool.

03 / USO

### Veja os limites que você tem

Confira as janelas de cota informadas, os horários de reinício e a idade de cada verificação. Uso sem suporte ou desconhecido fica claramente marcado.

04 / TROCA

### Mude a próxima requisição

Escolha uma rota gerenciada ou ative a rotação por cota. Uma resposta em andamento mantém a identidade com a qual começou.

05 / ARMAZENAMENTO LOCAL

### Mantenha as credenciais na sua máquina

Os segredos salvos usam o Keychain do macOS ou o DPAPI do Windows. Os inícios isolados da CLI criam a cópia local do token de acesso de que o cliente oficial precisa.

06 / SEU FLUXO DE TRABALHO

### Use uma janela ou o seu terminal

O app desktop e a CLI compartilham o mesmo runtime. Para sessões gerenciadas, mantenha o app ou switchboard serve em execução.

PARA AGENTES · NOVO NA 0.4

## Seu agente pode ver

## os próprios limites

O Switchboard inclui o switchboard mcp, um servidor MCP local. Claude Code, Codex ou outro cliente MCP pode ler o uso que resta e passar a próxima requisição para outra conta. Nenhuma ferramenta aceita ou devolve uma credencial.

01 / USO

### Leia o que resta

A cota restante de cada conta e janela, com horários de reinício e a idade de cada verificação. Uso desconhecido é informado como desconhecido, nunca como zero.

02 / TROCA

### Troque antes do limite

Um agente pode escolher a conta da próxima requisição da sua sessão, dentro do mesmo provedor e pool. Mudar o login do Claude Code para todas as sessões do Mac exige a flag explícita global.

03 / REGRAS DE PROJETO

### Regras de projeto opcionais

Se quiser, inicie uma pasta de projeto em uma conta escolhida. As regras ficam visíveis no app, podem ser pausadas ou ter prazo de expiração, e nunca interrompem a rotação.

01

### Iniciar pelo Switchboard

As sessões que você inicia pelo app ou pela CLI recebem as ferramentas quando a switchboard CLI é encontrada. As sessões isoladas recebem apenas as ferramentas de leitura. No macOS, o painel Agents vincula a CLI dentro do app a ~/.local/bin.

02

### Ou conecte um agente por conta própria

claude mcp add --scope user switchboard -- switchboard mcp
codex mcp add switchboard -- switchboard mcp

A PRIMEIRA SESSÃO

## Traga uma conta

## Escolha como ela roda

01

### Adicione uma conta

Capture a sua autorização atual ou use o login da CLI oficial. Dê à conta um rótulo e um pool.

02

### Confira o que se sabe

Revise a identidade da conta e o uso informado. A seleção gerenciada e a conta nativa atual da CLI aparecem separadas.

03

### Inicie a sua sessão

Use o modo gerenciado para trocar entre requisições, ou o modo isolado para uma sessão direta fixada em uma conta.

ANTES DE COMEÇAR

## Algumas distinções úteis

O Switchboard substitui o Claude Code ou o Codex?

Não. Ele gerencia contas e inicia as CLIs oficiais. Instale o Claude Code ou o Codex separadamente para login e sessões. O Switchboard não inclui assinatura de provedor nem créditos de API.

Ele muda automaticamente a minha conta atual da CLI?

A captura é uma ação explícita. A seleção de rota gerenciada é separada da ativação nativa. A ativação nativa do Claude e a rotação automática são operações opcionais; leia a confirmação antes de ativá-las.

Qual é a diferença entre gerenciado e isolado?

As sessões gerenciadas enviam as requisições por um proxy local e seguem a rota que você selecionou nas requisições seguintes. As sessões isoladas se conectam diretamente, usando um diretório de conta separado; seleções de rota posteriores não as alteram.

O Switchboard é a mesma coisa que o Fabric?

O Switchboard é a ferramenta de gerenciamento de contas disponível hoje. O Fabric, em prévia inicial, é a casa dos seus projetos e dos agentes deles. Os dois fazem parte do conjunto de ferramentas da PassionCode. Conheça o que estamos construindo com o Fabric.

Quais agentes funcionam com o Switchboard?

Claude Code, Codex e os outros agentes de programação populares — Hermes, Kilo Code, Cline, Goose, OpenCode e mais. Veja os 30 e como cada um se conecta.

Um projeto pode ter as suas próprias contas?

Sim. Crie um projeto, adicione as pastas dele — por exemplo, vários repositórios relacionados — e escolha as contas dele. As sessões iniciadas a partir dessas pastas usam somente essas contas, a troca automática fica restrita a elas, e agentes que trabalham em outros projetos nunca trocam para elas.

O Switchboard envia algum dado?

As versões de lançamento contam instalações, dias de uso e quantas contas estão conectadas, por provedor e tipo. Elas nunca enviam nomes de contas, endereços de e-mail, logins, nomes de pools nem o que você faz com as suas contas. Um número de instalação aleatório, compartilhado pelas ferramentas do PassionCode.ai no seu computador, permite que uma pessoa seja contada uma só vez. Desative em Sobre → Compartilhar contagens anônimas de uso; a opção vale para todas as ferramentas do PassionCode.ai. O que exatamente é enviado.

Posso inspecionar ou compilar por conta própria?

Sim. O Switchboard é código aberto sob a GNU AGPL-3.0. Para usos que a AGPL não cobre, há uma licença comercial disponível em passioncode.ai/business. As versões até a v0.3.1-beta.1, inclusive, foram publicadas sob a MIT e continuam disponíveis sob ela. O download atual, 0.6.16, é lançado sob a AGPL. A v0.4.0-beta.1 foi lançada sob a PolyForm Noncommercial or Internal Use e mantém essa licença. O repositório inclui instruções de compilação, código-fonte, testes e evidências de lançamento.

PARTE DO TOOLKIT DO PASSIONCODE

## As contas são apenas uma parte

## da configuração

O Switchboard gerencia contas do Claude Code e do Codex. O Project Observatory mantém à vista os projetos em que esses agentes trabalham. O Fabric Dashboards mostra numa só janela os serviços locais de agentes do seu Mac. O Fabric, a casa dos seus projetos e dos agentes deles, está em prévia inicial.

Conheça o Observatory

↗

Versão do Fabric Dashboards

↗

Conheça o Fabric

↗

Todas as ferramentas

↗

CÓDIGO ABERTO · LOCAL PRIMEIRO

## Sua configuração, o seu código

Experimente, veja como funciona e conte onde ele precisa melhorar.

Baixar o Switchboard

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
