Contract: brand-contract v1

<!-- Generated from pl/fabric/agents/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Agenci kodujący, z którymi współpracuje Fabric | Fabric | PassionCode.ai

Stan na 8 października 2026 r.: Fabric 0.3.2 łączy Claude Code, Kilo Code i Hermes Agent, Codex i Cline działają w Fabric bez jego narzędzi, a kolejnych pięciu agentów jest następnych w planie.

Przejdź do treści

PassionCode

.ai

Wizja

Dla Ciebie

Dla organizacji

Narzędzia

O projekcie

Polski

English

Русский

Deutsch

Français

한국어

Español

Português (Brasil)

简体中文

日本語

Pobierz

↓

FABRIC · OBSŁUGIWANI AGENCI KODUJĄCY

# Agenci kodujący,

# z którymi współpracuje Fabric

Których agentów Fabric może uruchomić w Twoim projekcie, którzy z nich dostają własne narzędzia Fabric i którzy są następni w kolejce

Stan na 8 października 2026 r. · wydana aplikacja to Fabric 0.3.2

W wydanej aplikacji Fabric łączy Claude Code, Kilo Code i Hermes Agent: uruchamia agenta w terminalu projektu i daje mu narzędzia Fabric na tę sesję. Codex i Cline działają w Fabric, ale nie mają jeszcze narzędzi Fabric. Następnych w planie jest pięciu kolejnych agentów, a po nich reszta wymieniona niżej. Fabric Switchboard przełącza konta subskrypcyjne dla Claude Code i Codex, a dla pozostałych agentów — konta z kluczami API przez Switchboard.

01 / CO ZNACZY „WSPÓŁPRACUJE Z”

## Trzy poziomy

## Każdy agent jest na jednym z nich

„Współpraca z Fabric” może oznaczać różne rzeczy, dlatego ta strona podaje poziom każdego agenta.

POŁĄCZONY

### Uruchamiany z narzędziami Fabric

Fabric uruchamia agenta w terminalu projektu. Tylko na tę sesję agent dostaje własne narzędzia Fabric: przejmowanie zadań, przekazania, pamięć i tablicę. Dostęp zapewnia poświadczenie ważne przez jedną sesję i nic nie jest zapisywane we własnych ustawieniach agenta.

DZIAŁA W FABRIC

### Uruchamiany w folderze projektu

Fabric uruchamia agenta w folderze projektu, więc pracuje on na plikach tego projektu. Nie ma jeszcze narzędzi Fabric.

PLANOWANY

### W planie, po kolei

Zamierzamy połączyć tego agenta. Poniższy plan podaje kolejność, a nie terminy.

02 / POŁĄCZENI

## Połączeni

## Narzędzia Fabric na czas sesji

Claude Code, Kilo Code i Hermes Agent — wszyscy trzej w wydanej aplikacji.

Połączeni agenci, stan na 8 października 2026 r.

Agent

Oficjalna strona

Stan

Claude Code

claude.com

Wydany, w Fabric 0.3

Kilo Code

kilo.ai

Wydany, w Fabric 0.3.2

Hermes Agent

hermes-agent.nousresearch.com

Wydany, w Fabric 0.3.2

Kilo Code pobiera ustawienia sesji ze swojej zmiennej KILO_CONFIG_CONTENT, a własny plik kilo.json projektu nie może ich nadpisać. Sprawdziliśmy to na Kilo 7.4.17 5 października 2026 r. Hermes Agent łączy się przez otwarty Agent Client Protocol: Fabric otwiera jego sesję i przekazuje mu narzędzia Fabric przez lokalny most — sprawdzone na Hermes 0.21.4 tego samego dnia. Zanim Hermes będzie mógł odpowiadać, trzeba wybrać model w jego własnej konfiguracji.

03 / DZIAŁAJĄ W FABRIC

## Działają w Fabric

## Jeszcze niepołączeni

Fabric uruchamia agenta w folderze projektu. Agent pracuje tam bez narzędzi Fabric.

Agenci działający w Fabric, stan na 8 października 2026 r.

Agent

Oficjalna strona

Stan

Codex

github.com/openai/codex

Działa w folderze projektu, jeszcze bez narzędzi Fabric

Cline

cline.bot

Wydany, w Fabric 0.3.2; pyta przed każdym narzędziem, jeszcze bez narzędzi Fabric

04 / PLANOWANI

## Planowani

## W tej kolejności

Pięciu jest następnych jako grupa, a ostatnich dziewięciu rozpatrujemy indywidualnie. Żaden z nich nie ma jeszcze narzędzi Fabric.

Planowani agenci kodujący, po kolei, stan na 8 października 2026 r.

Agent

Oficjalna strona

Kolejność

omp (oh-my-pi)

omp.sh

Następny, w grupie

pi

pi.dev

Następny, w grupie

OpenClaw

openclaw.ai

Następny, w grupie

OpenHands

openhands.dev

Następny, w grupie

Cursor CLI

cursor.com/cli

Następny, w grupie

Command Code

commandcode.ai

Indywidualnie

DeepSeek Harness

deepseek.com/harness

Indywidualnie

LangChain Deep Agents (dcode)

docs.langchain.com

Indywidualnie

Letta

letta.com

Indywidualnie

Strix

strix.ai

Indywidualnie

goose

goose-docs.ai

Indywidualnie

Qwen Code

github.com/QwenLM/qwen-code

Indywidualnie

Gemini CLI

geminicli.com

Indywidualnie

OpenCode

opencode.ai

Indywidualnie

### Aplikacje desktopowe i edytory

Zed, ZCode, Proto, CodeGPT, Freebuff i HackerAI to aplikacje desktopowe i edytory, których inny program nie może uruchomić. Zamiast tego mogą być klientami lokalnego huba Fabric. Każda z nich potrzebuje własnego opisanego punktu wejścia; te punkty są zaplanowane, ale jeszcze nienapisane.

Planowane aplikacje desktopowe i edytory, stan na 8 października 2026 r.

Aplikacja

Oficjalna strona

Sposób

Zed

zed.dev

Klient lokalnego huba, punkt wejścia zaplanowany

ZCode

zcode.z.ai

Klient lokalnego huba, punkt wejścia zaplanowany

Proto

proto.erp.ai

Klient lokalnego huba, punkt wejścia zaplanowany

CodeGPT

codegpt.co

Klient lokalnego huba, punkt wejścia zaplanowany

Freebuff

freebuff.com

Klient lokalnego huba, punkt wejścia zaplanowany

HackerAI

hackerai.co

Klient lokalnego huba, punkt wejścia zaplanowany

05 / JAK ŁĄCZĄ SIĘ PLANOWANI AGENCI

## Jeden otwarty protokół

## Dla planowanych agentów

Planowani agenci łączą się przez Agent Client Protocol (ACP). Konfiguracja sesji w tym protokole przekazuje serwery MCP sesji, a Fabric może sterować każdym agentem, który go obsługuje.

06 / DLACZEGO CI AGENCI

## Wybrani według tego,

## czego ludzie używają

Wybraliśmy ich na podstawie publicznego rankingu aplikacji OpenRouter, odczytanego 5 października 2026 r. W jego dziennym top 30 jest 15 agentów kodujących lub harnessów dla agentów. Największy udział ma Hermes Agent, połączony od Fabric 0.3.2.

07 / KONTA

## Przełączanie kont

## dziś Claude Code i Codex

Fabric Switchboard przełącza konta subskrypcyjne dla Claude Code i Codex. Od wersji 0.6.1 współpracuje też z pozostałymi agentami: każdy dostaje narzędzia Switchboard, a agent, który pozwala ustawić własny endpoint, może wysyłać swoje żądania przez Switchboard, który przełącza jego konta z kluczami API. Którzy agenci i jak każdy się łączy.

Pobierz na macOS

↓

Poznaj Switchboard

↗

PassionCode

.ai

Od vibe coding do passion coding

Zacznij

Wizja

Dla organizacji

Switchboard

Observatory

Inbox

Dashboards

Fabric

GitHub i kod źródłowy

O projekcie

System projektowy

Prywatność

commercial@passioncode.ai

Twitter

↗
