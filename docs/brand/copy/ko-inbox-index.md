Contract: brand-contract v1

<!-- Generated from ko/inbox/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Inbox | 중요한 메일부터 보는 메일 · macOS 프리뷰 | PassionCode.ai

Fabric Inbox는 Fabric의 메일 도구이며 단독으로 사용할 수 있습니다. Gmail과 Cloudflare 메일함을 중요한 메일이 먼저 오는 하나의 목록으로 모으고, 내 주소에는 에이전트를 둘 수 있습니다. macOS용 개발 프리뷰입니다.

본문으로 건너뛰기

PassionCode

.ai

제품

Switchboard

Observatory

Inbox

Fabric

한국어

English

Русский

Deutsch

Français

Polski

Español

Português (Brasil)

GitHub

↗

FABRIC INBOX · 개발 프리뷰

# 내 메일

# 중요한 메일 먼저

Gmail과 Cloudflare 메일함을 하나의 목록으로 모아 중요한 메일을 먼저 보여 주고, 내 도메인의 에이전트가 허용한 메일에는 답하고 나머지는 초안으로 남깁니다

패밀리 안에서 메일: 에이전트가 정해 둔 정책 안에서 읽고 답하는 주소입니다. 전체 패밀리

macOS용 다운로드

↓

기능 살펴보기

↓

개발 프리뷰 0.12.0 · macOS 12 이상 · 오픈 소스(AGPL-3.0)

FABRIC INBOX / 메일 + 에이전트

중요

+

답변 완료

01 / 기능

## 읽을 메일은 줄이고

## 답할 메일도 줄이고

Inbox는 모든 계정을 같은 방식으로 분류하고, 내 도메인의 주소에는 대신 답할 에이전트를 붙여 줍니다.

중요한 메일 먼저

### 내가 처리할 메일이 맨 위에

사람이 보낸 읽지 않은 메일, 보안 및 로그인 메일, 모니터링 알림, 앱 심사 반려, 결제 실패, 빌드 실패가 먼저 나옵니다. 뉴스레터, 알림, 청구서와 나머지 메일은 개수가 표시된 접힌 그룹에 들어갑니다. 각 행에는 그 자리에 있는 이유가 적혀 있습니다.

내 도메인

### 모든 주소를 한곳에서

Cloudflare 계정의 도메인에서 메일을 켜면 이미 있는 주소를 가져오고 새 주소를 추가할 수 있습니다. 기존 주소는 이전에 보내던 곳으로 계속 사본을 전달합니다. 메일함이 없는 주소로 온 메일은 목록에 표시되며 버려지지 않습니다.

내 규칙 안에서 일하는 에이전트

### 허용된 답장만 보냅니다

에이전트는 고유한 지침, 지식, 도구를 갖고 여러 주소를 맡을 수 있습니다. 답장은 자신의 지식에 근거하고, 허용된 주제에 맞고, 하루 한도 안일 때만 보냅니다. 나머지는 이유와 함께 초안으로 남습니다.

FABRIC INBOX 받기

## 개발 프리뷰

## Mac용

최신 프리뷰: 0.12.0. Mac 앱은 내 Cloudflare 계정에 메일 서버를 만들고 엽니다. 메일은 내 계정에 그대로 남습니다.

⌘

### macOS

유니버설 · Apple silicon + Intel · macOS 12 이상
DMG 설치 파일 · Developer ID 서명 및 Apple 공증 완료

macOS용 다운로드

↓

DMG를 열고 Fabric Inbox를 응용 프로그램 폴더로 드래그합니다.

☰

### 열기 전에

처음 열 때 선택할 항목: Create my server on Cloudflare.

Cloudflare 계정(무료 요금제 가능)

Cloudflare 대시보드에서 만든 API 토큰(앱에 나열된 권한 포함)

Gmail의 경우: 내 Google Cloud 프로젝트의 OAuth 클라이언트

모든 설정은 설정 가이드 에 나와 있습니다.

macOS DMG · SHA-256

a8e55bc8c8ad8837f079ad161104096cd14f1c09e08efaa883028642c0f136c7

열기 전에 비교하세요: shasum -a 256 터미널에서 확인합니다. 값이 다르면 다른 파일이므로 다시 다운로드하세요.

릴리스 노트 & 체크섬

↗

설치 안내

↗

모든 릴리스

↗

이 버전은 개발 프리뷰입니다. 에이전트 답변은 아직 실제 모델 호출로 시험하지 않았고, Gmail도 아직 실제 계정으로 승인받지 않았습니다. 일반 IMAP과 Outlook 지원은 계획 중이며, 둘 다 현재 동작하는 연동으로 제공되지 않습니다.

에이전트용

## 앱이 하는 모든 일을

## 에이전트도 할 수 있습니다

서버는 다음 주소에서 Model Context Protocol에 응답합니다: /mcp. 앱의 각 기능은 MCP 도구이기도 하므로, Claude Code나 다른 MCP 클라이언트가 키의 수준 안에서 메일을 읽고 분류하고 보내며 주소를 관리할 수 있습니다.

01

### 키 만들기

앱에서 다음을 엽니다: Settings → Agent access. 이름, 수준(read, mail 또는 admin), 발송 허용 여부를 선택합니다. 시크릿은 한 번만 표시됩니다.

02

### 에이전트 연결

앱이 전체 명령을 출력합니다: claude mcp add --transport http fabric-inbox https://<your-server>/mcp 여기에는 키의 헤더 두 개가 포함됩니다. 그다음 요청할 항목: list_accounts.

02 / PASSIONCODE 패밀리

## 각자 맡은 일이 있는 도구

Inbox는 메일을 다룹니다. Switchboard는 Claude Code와 Codex 계정을 관리합니다. Project Observatory는 그 에이전트들이 작업하는 프로젝트를 한눈에 보여 줍니다. Fabric은 이 작업을 조율하도록 우리가 만들고 있는 CEO AI 에이전트입니다.

Switchboard 살펴보기

↗

Observatory 살펴보기

↗

Fabric 만나보기

↗

시작하기 전에

## Inbox의 현재 상태

메일은 어디에 저장되나요?

앱이 내 Cloudflare 계정에 만드는 서버에 저장됩니다. Gmail 계정은 내 Google Cloud 프로젝트의 OAuth 클라이언트를 통해 연결합니다.

메일에 알아서 답장하나요?

에이전트를 지정한 주소에서, 그리고 규칙이 허용하는 답장만 보냅니다. 자동 발송 메일, 대량 메일, 회신 불가 메일에는 답하지 않으며, 실행할 때마다 무엇을 보냈는지 정확히 기록됩니다.

모든 메일 계정을 지원하나요?

아직 아닙니다. 프리뷰에서는 Cloudflare 메일함과 Gmail이 동작합니다. 일반 IMAP과 Outlook 지원은 계획 중입니다.

소스는 공개되어 있나요?

예. Fabric Inbox는 GNU AGPL-3.0 오픈 소스입니다. AGPL이 다루지 않는 용도에는 다음 주소에서 상용 라이선스를 받을 수 있습니다: passioncode.ai/business. 이 프로젝트는 Cloudflare의 Agentic Inbox 템플릿에서 시작했으며, 해당 템플릿은 자체 Apache-2.0 고지를 유지합니다. 소스, 테스트, 릴리스 노트는 저장소 에 있습니다.

Inbox가 Fabric 에이전트인가요?

아닙니다. Inbox는 메일 클라이언트이며, Inbox의 에이전트는 내가 정한 규칙 안에서 내 주소로 온 메일에 답합니다. Fabric 은 초기 프리뷰 단계의 CEO AI 에이전트입니다. 둘은 같은 툴킷에 속하지만 역할이 다릅니다.

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
