Contract: brand-contract v1

<!-- Generated from ko/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

시작하기 | AI 에이전트 업무 공간 설치 | PassionCode.ai

PassionCode.ai 스킬을 설치하고, Fabric을 추가하고, Claude Code나 Codex로 첫 Fabric 에이전트를 만들거나 기존 프로젝트를 Fabric에 맞추세요. Fabric Dashboards에서 실행하고, 다음 에이전트를 같은 프로젝트에 추가합니다. 무료이며 오픈 소스입니다.

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

계속 일하고, 다른 에이전트가 한 일을 아는 에이전트를 만드세요. 다섯 단계, 약 20분이며, 각 단계는 그 자체로 쓸모가 있습니다

Node.js 18+와 Claude Code 또는 Codex 필요 Fabric은 Apple silicon 또는 Intel 기반 macOS 필요

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

## 단계

01

### 스킬 설치

PassionCode.ai 런처가 Fabric Agent Adapter 스킬, Observatory Log, 작업 규칙을 코딩 에이전트에 설치합니다. 계정도 키도 필요 없습니다. Fabric은 설치하지 않습니다. Fabric은 다음 단계에서 따로 내려받습니다.

npx @passioncode-ai/passioncode@latest update

런처 0.1.32 · 설치 후 에이전트를 다시 시작하세요 · 자동 업데이트가 켜져 있습니다. 자동 업데이트 끄기

02

### Fabric 추가

Fabric은 내 프로젝트와 그 에이전트를 위한 집입니다. 각 프로젝트의 목적, 보드, 결정, 릴리스가 이곳에 남습니다. 첫 화면에는 에이전트 만들기, 이미 있는 에이전트를 Fabric에 맞추기, 프로젝트 열기, 프로젝트 만들기의 네 가지 동작이 있습니다. 초기 프리뷰이며 Docker와 Supabase CLI가 필요합니다. 대화는 메시지를 저장하지만 아직 응답하지 않습니다.

Fabric 다운로드

0.3.4

macOS용

↓

요구 사항과 제한

Apple silicon 및 Intel · 서명 및 공증 완료 · SHA-256 4d8e8da80bcf490fed955dd627ed64b76a1c53c50aa89de49ac6eaeed91f0653 · 릴리스 노트

03

### 에이전트 만들기 또는 맞추기

Claude Code나 Codex에서 필요한 것을 요청하거나, Fabric의 만들기(Create)와 맞추기(Adapt) 동작에서 시작하세요. 어느 쪽이든 작업은 코딩 에이전트의 콘솔에서 진행됩니다. Fabric Agent Adapter 스킬은 먼저 질문하고, 무엇이든 바꾸기 전에 계획을 보여 줍니다. 맞추기 작업은 새 fabric-adapter 브랜치에서 진행됩니다. 결과로 계약, 대시보드, 테스트, 적합성 보고서를 받습니다.

새로 만들기 매일 아침 앱 스토어 리뷰를 확인하고 답글 초안을 쓰는 Fabric 에이전트를 만들어 줘

맞추기 이 저장소를 Fabric에 맞춰 줘

04

### 실행하고 확인

Fabric Dashboards는 로컬 에이전트 서비스를 한 창에 모두 보여 줍니다. 에이전트가 MCP로 서비스를 시작, 중지하고 열 수 있습니다.

Fabric Dashboards 다운로드

0.6.7

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

Twitter

↗
