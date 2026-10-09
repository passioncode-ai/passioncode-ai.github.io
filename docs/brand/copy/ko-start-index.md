Contract: brand-contract v1

<!-- Generated from ko/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

시작하기 | AI 에이전트 업무 공간 설치 | PassionCode.ai

PassionCode.ai 스킬을 설치하고, Fabric을 추가하고, Claude Code나 Codex로 첫 Fabric 에이전트를 만드세요. 기존 프로젝트를 변환해 Fabric Dashboards에서 실행하고, 다음 에이전트를 같은 패밀리에 추가할 수 있습니다. 무료이며 오픈 소스입니다.

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

툴 받기

↓

시작하기 · 무료, 오픈 소스

# 빈 Mac에서 첫 에이전트까지

방치되어 낡고 서로 대화하지 못하는 에이전트는 이제 그만 만드세요. 다섯 단계, 약 20분이면 첫 에이전트에서 눈에 보이는 패밀리까지 갑니다. 각 단계는 그 자체로 쓸모가 있으니, 결과가 충분하다 싶은 곳에서 멈춰도 됩니다

Node.js 18+와 Claude Code 또는 Codex 필요 Fabric은 Apple silicon 기반 macOS 필요

01

스킬 설치

02

Fabric 추가

03

에이전트 만들기 또는 변환

04

실행하고 확인

05

다음 에이전트 추가

+

기여하기

## 단계

01

### 스킬 설치

PassionCode.ai 런처는 Fabric Agent Adapter 스킬, Observatory Log, 작업 규칙을 Claude Code, Codex 등 지원되는 에이전트에 설치합니다. 계정도 키도 필요 없습니다.

npx @passioncode-ai/passioncode@latest update

런처 0.1.31 · 고정된 버전으로 패밀리 구성 요소를 설치합니다 · 설치 후 에이전트를 다시 시작하세요. 자동 업데이트는 기본으로 켜져 있습니다. 자동 업데이트 끄기 원하면 끌 수 있습니다.

02

### Fabric 추가

Fabric은 CEO AI 에이전트입니다. 각 프로젝트에 목적, 보드, 결정, 릴리스를 담는 공간이 생깁니다. 초기 프리뷰이며 Docker와 Supabase CLI가 필요합니다. 대화는 메시지를 저장하지만 아직 응답하지 않습니다.

Fabric 다운로드

0.3.2

macOS용

↓

요구 사항과 제한

Apple silicon · 서명 및 공증 완료 · SHA-256 db0f1a2adcc3aae96100e98194268826b1514b26dd0d35e62fd2301e7337457b · 릴리스 노트

03

### 에이전트 만들기 또는 변환

Claude Code나 Codex에서 필요한 것을 요청하세요. Fabric Agent Adapter 스킬이 Fabric과 호환되는 서비스를 만듭니다. 계약, 대시보드, 테스트, 적합성 검사가 포함됩니다.

새로 만들기 매일 아침 앱 스토어 리뷰를 확인하고 답글 초안을 쓰는 Fabric 에이전트를 만들어 줘

변환 이 저장소를 Fabric에 맞게 변환해 줘

기존 에이전트, MCP 서버, 명령줄 툴의 코드는 그대로 유지됩니다. 어댑터가 Fabric에 필요한 부분을 주변에 추가합니다. 어댑터 빠른 시작 · 계약

04

### 실행하고 확인

Fabric Dashboards는 로컬 에이전트 서비스를 한 창에 모두 보여 줍니다. 에이전트가 MCP로 서비스를 시작, 중지하고 열 수 있습니다.

Fabric Dashboards 다운로드

0.6.5

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

그다음 작업에 필요한 것을 추가하세요. Fabric Switchboard 에이전트에 계정이 여러 개 필요할 때, Project Observatory 프로젝트 전반의 변경 사항을 볼 때, Fabric Inbox 메일에는 이 툴을 쓰세요.

05

### 다음 에이전트 추가, 패밀리 확인

작업에 필요해지면 같은 방식으로 다음 에이전트를 만들고, Fabric에서 같은 프로젝트를 맡기세요. Fabric에서 시작한 Claude Code, Kilo Code, Hermes Agent는 그 프로젝트의 보드, 메모리, 인계를 함께 사용하므로 한쪽이 멈춘 곳에서 다른 쪽이 이어받습니다. Fabric Dashboards는 둘의 상태와 지출을 한 창에 보여 줍니다.

다음 작성된 리뷰 답글 초안을 보드용 주간 요약으로 만드는 Fabric 에이전트를 만들어 줘

새 에이전트는 기억해야 할 스크립트 하나가 더 늘어나는 대신, 이미 눈에 보이는 패밀리에 합류합니다. 패밀리가 커지는 방식 · 지금 연결되는 에이전트

추천 툴

## 시작한 일을

## 끝내는 에이전트

에이전트가 만드는 변경에는 다음을 권장합니다: task-pipeline, 별도의 오픈 소스 스킬로, sshlg-skills 패밀리에 속합니다. 브리프와 계획에서 테스트, 배포, 수락까지 게이트가 있는 단계를 거쳐 변경을 진행하며, 각 게이트를 통과해야 다음으로 넘어갑니다.

npx sshlg-skills install

GitHub의 task-pipeline · PassionCode.ai에 속하지 않으며 PassionCode.ai 없이도 동작합니다

기여하기

## 고칠 부분을 찾으셨나요?

## 풀 리퀘스트 보내기

모든 제품 저장소는 공개되어 있습니다. 각 저장소는 테스트 명령을 AGENTS.md 에, 빠른 시작을 README에 적어 둡니다. 코딩 에이전트가 둘을 읽고 나머지를 처리할 수 있습니다.

### 저장소 선택

사용하는 제품을 포크하거나 조직 저장소 둘러보기. 라벨이 붙은 이슈가 시작하기 좋습니다.

### 게이트 실행

저장소의 AGENTS.md 와 조직의 CONTRIBUTING.md를 읽고, 변경한 뒤, 테스트 명령이 통과할 때까지 실행하세요.

### 풀 리퀘스트 열기

풀 리퀘스트를 여는 것은 저장소의 CLA.md에 동의한다는 뜻이며, 체크할 칸은 없습니다. 모든 풀 리퀘스트를 검토하고 답변합니다.

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

일부 저장소는 내부용이며 협업자에게만 보입니다. 팀의 지식 베이스와 조직 맵이 그렇습니다. 팀에 합류하고 싶으신가요? Sergey에게 메일 보내기.

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
