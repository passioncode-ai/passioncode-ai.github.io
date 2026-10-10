Contract: brand-contract v1

<!-- Generated from pt-br/inbox/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Inbox | E-mail com o que importa primeiro · prévia para macOS | PassionCode.ai

O Fabric Inbox é a ferramenta de e-mail do Fabric e funciona sozinha: caixas do Gmail e da Cloudflare numa só lista, com os e-mails importantes primeiro, e agentes nos seus próprios endereços. Prévia de desenvolvimento para macOS.

Ir para o conteúdo

PassionCode

.ai

Produtos

Switchboard

Observatory

Inbox

Fabric

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

GitHub

↗

FABRIC INBOX · PRÉVIA DE DESENVOLVIMENTO

# Seu e-mail

# o importante primeiro

Reúna caixas do Gmail e da Cloudflare numa só lista, com os e-mails importantes primeiro e agentes para os seus próprios domínios que respondem o que você permitir e deixam o resto como rascunho

NA FAMÍLIA E-mail: os endereços que os agentes leem e respondem dentro da política que você definir. A família inteira

Baixar para macOS

↓

Ver o que ele faz

↓

Prévia de desenvolvimento 0.14.0 · macOS 12 ou mais recente · código aberto sob a AGPL-3.0

FABRIC INBOX / E-MAIL + AGENTES

IMPORTANTE

+

RESPONDIDO

01 / O QUE ELE FAZ

## Menos para ler

## Menos para responder

O Inbox ordena todas as contas do mesmo jeito e dá aos endereços dos seus domínios alguém para respondê-los.

O IMPORTANTE PRIMEIRO

### O que precisa de você, no topo

E-mails não lidos de pessoas, e-mails de segurança e de login, alertas de monitoramento, rejeições na revisão de apps, pagamentos que falharam e builds que falharam vêm primeiro. Newsletters, notificações, cobranças e o restante ficam em grupos recolhidos, com contagem. Cada linha diz por que está ali.

SEUS DOMÍNIOS

### Todos os endereços num só lugar

Ative o e-mail para um domínio da sua conta da Cloudflare, traga os endereços que ele já tem e adicione novos. Cada endereço existente continua encaminhando uma cópia para onde ia antes. E-mail enviado a um endereço sem caixa de entrada fica listado, nunca é descartado.

AGENTES, DENTRO DAS SUAS REGRAS

### Envia só o que pode

Um agente tem as próprias instruções, conhecimento e ferramentas e pode atender vários endereços. Ele só envia uma resposta quando ela se baseia no conhecimento dele, se encaixa num tópico que você permitiu e respeita o limite diário. Todo o resto espera como rascunho, com o motivo.

BAIXAR O FABRIC INBOX

## Uma prévia de desenvolvimento

## para o seu Mac

Prévia mais recente: 0.14.0. O app para Mac cria o servidor de e-mail na sua própria conta da Cloudflare e o abre; seu e-mail permanece com as suas contas.

⌘

### macOS

Universal · Apple silicon + Intel · macOS 12 ou mais recente
Instalador DMG · assinado com Developer ID e notarizado pela Apple

Baixar para macOS

↓

Abra o DMG e arraste o Fabric Inbox para Aplicativos.

☰

### Antes de abrir

Na primeira abertura, escolha Create my server on Cloudflare.

Uma conta da Cloudflare; o plano gratuito funciona

Um token de API que você cria no painel dela, com as permissões que o app lista

Para o Gmail: um cliente OAuth do seu próprio projeto no Google Cloud

O guia de configuração lista todas as configurações.

DMG para macOS · SHA-256

ade939562ca8a035402f92927c308af4882d1b260abad879f7d41adcc7a14a24

Compare antes de abrir: shasum -a 256 no Terminal. Um valor diferente significa um arquivo diferente; baixe-o de novo.

Notas de versão e checksum

↗

Notas de instalação

↗

Todos os releases

↗

Esta é uma prévia de desenvolvimento. As respostas dos agentes ainda não foram testadas com uma chamada real a um modelo, e o Gmail ainda não foi aceito numa conta real. Suporte a IMAP em geral e a Outlook estão planejados; nenhum dos dois é oferecido hoje como integração funcional.

PARA AGENTES

## Tudo o que o app faz,

## um agente também faz

Seu servidor responde ao Model Context Protocol em /mcp. Cada função do app também é uma ferramenta MCP, de modo que o Claude Code ou outro cliente MCP pode ler, ordenar e enviar e-mails e gerenciar endereços dentro do nível da sua chave.

01

### Crie uma chave

No app, abra Settings → Agent access. Escolha um nome, um nível (leitura, e-mail ou admin) e se ela pode enviar. O segredo é mostrado uma única vez.

02

### Conecte seu agente

O app imprime o comando completo: claude mcp add --transport http fabric-inbox https://<your-server>/mcp com os dois cabeçalhos da chave. Depois peça list_accounts.

02 / A FAMÍLIA PASSIONCODE

## Uma ferramenta com a própria função

O Inbox cuida do e-mail. O Switchboard gerencia contas do Claude Code e do Codex. O Project Observatory mantém à vista os projetos em que esses agentes trabalham. O Fabric é o agente de IA no papel de CEO que estamos construindo para coordenar o trabalho.

Conhecer o Switchboard

↗

Conhecer o Observatory

↗

Conhecer o Fabric

↗

ANTES DE COMEÇAR

## Em que pé está o Inbox

Para onde vai o meu e-mail?

Para o servidor que o app cria na sua própria conta da Cloudflare. Contas do Gmail se conectam por meio de um cliente OAuth do seu próprio projeto no Google Cloud.

Ele vai responder meus e-mails sozinho?

Somente nos endereços que você entregar a um agente, e só com respostas que as regras dele permitirem. E-mails automáticos, em massa e de no-reply nunca são respondidos, e cada execução registra exatamente o que foi enviado.

Ele aceita qualquer conta de e-mail?

Ainda não. Caixas da Cloudflare e o Gmail funcionam na prévia. Suporte a IMAP em geral e a Outlook estão planejados.

O código-fonte é público?

Sim. O Fabric Inbox é código aberto sob a GNU AGPL-3.0. Para usos que a AGPL não cobre, há uma licença comercial disponível em passioncode.ai/business. Ele começou como o template Agentic Inbox da Cloudflare, que mantém o próprio aviso Apache-2.0. O repositório inclui o código-fonte, os testes e as notas de versão.

O Inbox é o agente Fabric?

Não. O Inbox é um cliente de e-mail; os agentes dele respondem aos seus endereços dentro das regras que você definir. Fabric é o nosso agente de IA no papel de CEO, em prévia inicial. Os dois fazem parte do mesmo conjunto de ferramentas e têm papéis diferentes.

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
