Contract: brand-contract v1

<!-- Generated from ko/fabric/agents/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric과 함께 쓸 수 있는 코딩 에이전트 | Fabric | PassionCode.ai

2026년 10월 8일 기준, Fabric 0.3.2는 Claude Code, Kilo Code, Hermes Agent를 연결합니다. Codex와 Cline은 Fabric의 도구 없이 Fabric 안에서 실행되며, 에이전트 5개가 계획상 다음 순서입니다.

본문으로 건너뛰기

PassionCode

.ai

비전

개인용

조직용

도구

소개

한국어

English

Русский

Deutsch

Français

Polski

Español

Português (Brasil)

简体中文

日本語

다운로드

↓

FABRIC · 지원하는 코딩 에이전트

# Fabric과 함께 쓸 수 있는

# 코딩 에이전트

Fabric이 프로젝트에서 시작할 수 있는 에이전트, 그중 Fabric 자체 도구를 받는 에이전트, 다음에 올 에이전트

기준일: 2026년 10월 8일 · 릴리스된 앱은 Fabric 0.3.2

릴리스된 앱에서 Fabric이 연결하는 에이전트는 Claude Code, Kilo Code 및 Hermes Agent입니다. 프로젝트의 터미널에서 에이전트를 시작하고, 그 세션 동안 Fabric의 도구를 제공합니다. Codex 및 Cline 은(는) Fabric 안에서 실행되지만 아직 Fabric의 도구는 없습니다. 계획상 에이전트 5개가 다음 순서이고, 그다음이 아래에 나열된 나머지입니다. Fabric Switchboard는 Claude Code와 Codex의 구독 계정을 전환하며, 다른 에이전트는 Switchboard를 통해 API 키 계정을 전환합니다.

01 / “함께 쓸 수 있다”의 의미

## 세 가지 단계

## 각 에이전트는 그중 하나에 속합니다

Fabric과 함께 쓴다는 말은 여러 뜻일 수 있으므로, 이 페이지는 모든 에이전트의 단계를 밝힙니다.

연결됨

### Fabric의 도구와 함께 시작

Fabric이 프로젝트의 터미널에서 에이전트를 시작합니다. 그 세션 동안에만 에이전트는 Fabric의 자체 도구인 클레임, 인계, 메모리, 보드를 받습니다. 이 접근은 한 세션짜리 자격 증명으로 이루어지며, 에이전트 자체 설정에는 아무것도 기록되지 않습니다.

FABRIC에서 실행

### 프로젝트 폴더에서 시작

Fabric이 프로젝트 폴더에서 에이전트를 시작하므로 에이전트는 그 프로젝트의 파일에서 작업합니다. 아직 Fabric의 도구는 없습니다.

계획됨

### 계획에 있음, 순서대로

이 에이전트를 연결할 계획입니다. 아래 계획은 날짜가 아니라 순서를 나타냅니다.

02 / 연결됨

## 연결됨

## 세션 동안 Fabric의 도구 제공

Claude Code, Kilo Code, Hermes Agent 세 가지 모두 릴리스된 앱에 있습니다.

연결된 에이전트, 2026년 10월 8일 기준

에이전트

공식 사이트

현재 상태

Claude Code

claude.com

릴리스됨, Fabric 0.3

Kilo Code

kilo.ai

릴리스됨, Fabric 0.3.2

Hermes Agent

hermes-agent.nousresearch.com

릴리스됨, Fabric 0.3.2

Kilo Code는 세션 설정을 KILO_CONFIG_CONTENT 변수에서 가져오며, 프로젝트 자체의 kilo.json 은(는) 이를 덮어쓸 수 없습니다. 2026년 10월 5일 Kilo 7.4.17에서 이를 확인했습니다. Hermes Agent는 개방형 Agent Client Protocol로 연결됩니다. Fabric이 세션을 열고 로컬 브리지를 통해 Fabric의 도구를 전달하며, 같은 날 Hermes 0.21.4에서 확인했습니다. Hermes는 자체 설정에서 모델을 선택해야 답할 수 있습니다.

03 / FABRIC에서 실행

## Fabric에서 실행

## 아직 연결되지 않음

Fabric이 프로젝트 폴더에서 에이전트를 시작합니다. 에이전트는 Fabric의 도구 없이 그곳에서 작업합니다.

Fabric에서 실행되는 에이전트, 2026년 10월 8일 기준

에이전트

공식 사이트

현재 상태

Codex

github.com/openai/codex

프로젝트 폴더에서 실행, 아직 Fabric 도구 없음

Cline

cline.bot

릴리스됨, Fabric 0.3.2. 도구를 쓸 때마다 먼저 묻고, 아직 Fabric 도구 없음

04 / 계획됨

## 계획됨

## 이 순서대로

다음에는 5개를 묶어서 진행하고, 마지막 9개는 사례별로 검토합니다. 어느 것에도 아직 Fabric의 도구는 없습니다.

계획된 코딩 에이전트, 순서대로, 2026년 10월 8일 기준

에이전트

공식 사이트

순서

omp (oh-my-pi)

omp.sh

다음, 묶어서

pi

pi.dev

다음, 묶어서

OpenClaw

openclaw.ai

다음, 묶어서

OpenHands

openhands.dev

다음, 묶어서

Cursor CLI

cursor.com/cli

다음, 묶어서

Command Code

commandcode.ai

사례별 검토

DeepSeek Harness

deepseek.com/harness

사례별 검토

LangChain Deep Agents (dcode)

docs.langchain.com

사례별 검토

Letta

letta.com

사례별 검토

Strix

strix.ai

사례별 검토

goose

goose-docs.ai

사례별 검토

Qwen Code

github.com/QwenLM/qwen-code

사례별 검토

Gemini CLI

geminicli.com

사례별 검토

OpenCode

opencode.ai

사례별 검토

### 데스크톱 앱과 에디터

Zed, ZCode, Proto, CodeGPT, Freebuff, HackerAI는 다른 프로그램이 시작할 수 없는 데스크톱 앱과 에디터입니다. 대신 Fabric 로컬 허브의 클라이언트가 될 수 있습니다. 각각 문서화된 별도 항목이 필요하며, 이 항목들은 계획 단계이고 아직 작성되지 않았습니다.

계획된 데스크톱 앱과 에디터, 2026년 10월 8일 기준

앱

공식 사이트

연결 방식

Zed

zed.dev

로컬 허브의 클라이언트, 항목은 계획 단계

ZCode

zcode.z.ai

로컬 허브의 클라이언트, 항목은 계획 단계

Proto

proto.erp.ai

로컬 허브의 클라이언트, 항목은 계획 단계

CodeGPT

codegpt.co

로컬 허브의 클라이언트, 항목은 계획 단계

Freebuff

freebuff.com

로컬 허브의 클라이언트, 항목은 계획 단계

HackerAI

hackerai.co

로컬 허브의 클라이언트, 항목은 계획 단계

05 / 계획된 에이전트의 연결 방식

## 하나의 개방형 프로토콜

## 계획된 에이전트에는

계획된 에이전트는 Agent Client Protocol (ACP)로 연결됩니다. 세션 설정에 세션의 MCP 서버가 담기며, Fabric은 이 프로토콜을 쓰는 에이전트라면 무엇이든 구동합니다.

06 / 이 에이전트를 고른 이유

## 사람들이 쓰는 것에서

## 골랐습니다

선정 기준은 OpenRouter의 공개 앱 순위이며, 2026년 10월 5일에 확인했습니다. 일간 상위 30개 중 15개가 코딩 에이전트 또는 에이전트 하네스(harness)입니다. Fabric 0.3.2부터 연결된 Hermes Agent의 비중이 가장 큽니다.

07 / 계정

## 계정 전환

## 현재는 Claude Code와 Codex

Fabric Switchboard는 Claude Code와 Codex의 구독 계정을 전환합니다. 0.6.1부터는 다른 에이전트와도 함께 쓸 수 있습니다. 각 에이전트가 Switchboard의 도구를 받고, 사용자 지정 엔드포인트를 받는 에이전트는 요청을 Switchboard를 거쳐 보낼 수 있으며 Switchboard가 해당 에이전트의 API 키 계정을 전환합니다. 어떤 에이전트가 어떻게 연결되는지.

macOS용 다운로드

↓

Switchboard 살펴보기

↗

PassionCode

.ai

vibe coding에서 passion coding으로

시작하기

비전

조직용

Switchboard

Observatory

Inbox

Dashboards

Fabric

GitHub 및 소스 코드

소개

디자인 시스템

개인정보 처리방침

commercial@passioncode.ai

Twitter

↗
