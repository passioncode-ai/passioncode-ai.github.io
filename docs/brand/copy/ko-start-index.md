Contract: brand-contract v1

<!-- Generated from ko/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

시작하기 | AI 에이전트 업무 공간 설치 | PassionCode.ai

명령 하나 또는 Claude Code나 Codex에 붙여 넣는 프롬프트 하나로 PassionCode.ai를 설정하세요. 도구, 그 MCP 서버, 스킬까지 한 번에 설정됩니다. 이미 설정한 환경도 같은 명령이 점검하고 고칩니다. 무료, 오픈 소스.

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

툴 받기

↓

시작하기 · 무료, 오픈 소스

# 빈 Mac에서 첫 에이전트까지

계속 일하고 다른 에이전트가 한 일을 아는 에이전트를 만드세요. 명령 하나가 도구를 설정하고, 나중에는 같은 명령이 점검합니다

Node.js 18+와 Claude Code 또는 Codex 필요 Fabric은 Apple silicon 또는 Intel 기반 macOS 필요

→

명령 하나

01

스킬 설치

02

Fabric 추가

03

에이전트 만들기 또는 맞추기

04

실행하고 확인

05

다음 에이전트 추가

+

기여하기

명령 하나

## 모두 설정하거나

## 지금 있는 것을 점검하세요

명령 하나가 고른 도구를 서명된 릴리스에서 설치하고, 그 MCP 서버를 Claude Code, Codex, Gemini CLI, Kimi Code에 연결하고, 스킬을 추가합니다. 이미 설정된 컴퓨터에서는 같은 명령이 모든 것을 점검하고, 잘못된 것을 고치고, 바뀐 내용을 보여 줍니다.

npx @passioncode-ai/passioncode@latest setup

Node.js 18+ 필요 · 앱은 macOS에 설치되며, Linux와 Windows에서는 스킬과 MCP 서버를 설정합니다 · 서명, 체크섬, 공증 중 하나라도 맞지 않으면 아무것도 설치하지 않습니다 · 아무것도 바꾸지 않고 점검만 하려면:

npx @passioncode-ai/passioncode@latest doctor

### 또는 코딩 에이전트에게 맡기세요

이 프롬프트를 Claude Code, Codex 또는 다른 코딩 에이전트에 붙여 넣으세요. 에이전트가 명령을 실행하고, 할 수 있는 일을 마친 뒤, 직접 하셔야 하는 일만 짧게 알려 드립니다. 로그인, 접근 허용, 도구 자체의 입력 창에 키 입력 같은 일입니다.

이 컴퓨터에 PassionCode.ai를 설정하고, 이미 설정되어 있다면 점검하고 고쳐 줘. npx --yes @passioncode-ai/passioncode@latest setup --yes --json를 실행하고(Node 18 이상 필요) 그 JSON을 읽어. 이 명령은 빠진 앱을 서명된 릴리스에서 설치하고, 스킬과 모든 MCP 서버를 설정하고, 잘못된 것을 고친 뒤, 모든 것을 다시 점검해. 아무것도 직접 내려받거나 설치하지 말고, 실행 중인 앱을 절대 멈추거나 강제 종료하지 마. 그다음 목록에 있는 제품 온보딩 단계 중 에이전트가 할 수 있는 것을 실행하고, 채팅에서 나에게 키나 비밀번호를 절대 묻지 말고(도구가 자체 비공개 입력 창을 열어), 마지막에 npx --yes @passioncode-ai/passioncode@latest doctor를 실행해. 무엇을 설정하거나 고쳤는지, 무엇이 아직 실패하는지, 로그인처럼 나만 할 수 있는 단계를 번호를 매겨 짧게 알려 주고, 새 스킬과 MCP 서버가 로드되도록 너를 재시작하라고 알려 줘.

Fabric은 초기 프리뷰입니다. 컴퓨터에 Docker와 Supabase CLI가 있으면 명령이 설치하고, 없으면 무엇을 추가해야 하는지 알려 줍니다. 직접 하고 싶으신가요? 아래 다섯 단계가 같은 설정을 도구 하나씩 진행합니다.

## 단계

01

### 스킬 설치

PassionCode.ai 런처가 Fabric Agent Adapter 스킬, Observatory Log, 작업 규칙을 코딩 에이전트에 설치합니다. 계정도 키도 필요 없습니다. Fabric은 설치하지 않습니다. Fabric은 다음 단계에서 따로 내려받습니다.

npx @passioncode-ai/passioncode@latest update

런처 0.2.2 · 설치 후 에이전트를 다시 시작하세요 · 자동 업데이트가 켜져 있습니다. 자동 업데이트 끄기

02

### Fabric 추가

Fabric은 내 프로젝트와 그 에이전트를 위한 집입니다. 각 프로젝트의 목적, 보드, 결정, 릴리스가 이곳에 남습니다. 첫 화면에는 에이전트 만들기, 이미 있는 에이전트를 Fabric에 맞추기, 프로젝트 열기, 프로젝트 만들기의 네 가지 동작이 있습니다. 초기 프리뷰이며 Docker와 Supabase CLI가 필요합니다. 대화는 메시지를 저장하지만 아직 응답하지 않습니다.

Fabric 다운로드

0.3.5

macOS용

↓

요구 사항과 제한

Apple silicon 및 Intel · 서명 및 공증 완료 · SHA-256 1e54fe557f2752817bb00303a93d595c812609b355f6850420026663cf39b98b · 릴리스 노트

03

### 에이전트 만들기 또는 맞추기

Claude Code나 Codex에서 필요한 것을 요청하거나, Fabric의 만들기(Create)와 맞추기(Adapt) 동작에서 시작하세요. 어느 쪽이든 작업은 코딩 에이전트의 콘솔에서 진행됩니다. Fabric Agent Adapter 스킬은 먼저 질문하고, 무엇이든 바꾸기 전에 계획을 보여 줍니다. 맞추기 작업은 새 fabric-adapter 브랜치에서 진행됩니다. 결과로 계약, 대시보드, 테스트, 적합성 보고서를 받습니다.

새로 만들기 매일 아침 앱 스토어 리뷰를 확인하고 답글 초안을 쓰는 Fabric 에이전트를 만들어 줘

맞추기 이 저장소를 Fabric에 맞춰 줘

04

### 실행하고 확인

Fabric Dashboards는 로컬 에이전트 서비스를 한 창에 모두 보여 줍니다. 에이전트가 MCP로 서비스를 시작, 중지하고 열 수 있습니다.

Fabric Dashboards 다운로드

0.7.9

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

05

### 같은 프로젝트에 다음 에이전트 추가

다음 에이전트도 같은 방식으로 만들고 Fabric의 같은 프로젝트를 주세요. Fabric에서 시작한 Claude Code, Kilo Code, Hermes Agent는 그 프로젝트의 보드, 메모리, 인계를 공유하므로, 한 에이전트가 멈춘 곳에서 다른 에이전트가 이어받습니다. 오늘 연결되는 에이전트

추천 툴

## 시작한 일을

## 끝내는 에이전트

에이전트가 만드는 변경에는 다음 스킬을 권장합니다: task-pipeline, 별도의 오픈 소스 스킬로, sshlg-skills 컬렉션에 속합니다. 브리프에서 승인까지 각 변경을 이끌며, 각 관문을 통과하기 전에는 다음으로 넘어가지 않습니다.

npx sshlg-skills install

GitHub의 task-pipeline · PassionCode.ai에 속하지 않으며 PassionCode.ai 없이도 동작합니다

기여하기

## 고칠 부분을 찾으셨나요?

## 풀 리퀘스트 보내기

모든 제품 저장소는 공개되어 있으며, 테스트 명령은 AGENTS.md에 적혀 있습니다. 조직의 CONTRIBUTING.md를 따라 풀 리퀘스트를 여세요. 풀 리퀘스트를 열면 동의하는 것으로 간주되는 문서는 저장소의 CLA.md.

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

조직용

## 팀 전체가 쓰도록

## 운영하고 싶으신가요?

프로세스를 함께 정리하고, 에이전트가 넘겨받을 수 있는 일을 추정해, 함께 또는 대신 구성해 드립니다.

추정치 확인 및 요청

→

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

X

↗
