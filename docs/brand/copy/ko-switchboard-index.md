Contract: brand-contract v1

<!-- Generated from ko/switchboard/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Switchboard | Claude Code & Codex 계정 관리자 | PassionCode.ai

Claude Code와 Codex 계정을 관리하고, 사용량 한도를 확인하고, 관리형 요청을 전환합니다. macOS와 Windows용 Switchboard를 다운로드하세요.

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

FABRIC SWITCHBOARD · BY PASSIONCODE

# 내 계정을

# 더 분명하게 전환

Claude Code와 Codex CLI 계정을 로컬 작업대 한 곳에 모으세요. 각 계정이 보고하는 사용량을 확인하고, 다음 요청을 처리할 계정을 고릅니다

툴킷 안에서 계정: 각 에이전트가 어떤 계정으로 실행되는지 사용량 한도와 함께 보여 줍니다. 작동 방식의 4단계입니다. 모든 도구

Switchboard 다운로드

↓

소스 보기

↗

오픈 소스 · macOS + Windows · 데스크톱 + CLI

도구 하나 / 내 계정

CLAUDE CODE

+

CODEX CLI

SWITCHBOARD 받기

## 플랫폼을 선택하세요

최신 릴리스: 0.6.16. 두 다운로드 모두 데스크톱 앱과 switchboard CLI가 포함되어 있습니다.

⌘

### macOS

유니버설 · Apple silicon + Intel
macOS 14 이상 · ZIP 아카이브

macOS용 다운로드

↓

Developer ID로 서명되었으며 Apple 공증을 받았습니다. ZIP을 열어 Fabric Switchboard를 응용 프로그램 폴더로 옮긴 다음 그곳에서 실행하세요.

⊞

### Windows

x64 · 데스크톱 설치 프로그램 + CLI
ZIP 아카이브 · WebView2 필요

Windows용 다운로드

↓

Windows에서 직접 빌드했으며 아직 Authenticode로 서명되지 않았으므로 SmartScreen에 경고가 표시될 수 있습니다. 설치 프로그램에 CLI가 포함되어 있습니다.

☰

### 실행하기 전에

Switchboard는 계정을 관리하고 공식 CLI를 실행합니다. 공식 CLI를 대체하지는 않습니다.

Claude Code 또는 Codex CLI를 따로 설치해야 합니다. Switchboard에는 제공업체 구독이나 API 크레딧이 포함되어 있지 않습니다.

macOS 14 이상, Apple silicon 또는 Intel.

WebView2가 있는 Windows x64. Windows 빌드는 아직 Authenticode로 서명되지 않았습니다.

창을 닫아도 앱은 메뉴 막대에서 계속 실행되며 로그인할 때 열립니다. 종료는 앱 메뉴에서 하세요.

macOS ZIP · SHA-256

df7b94a8843711d80891ec91e800585eb1fd4db1440c735975615d1f4d3c7905

Windows ZIP · SHA-256

dfba522d80e4153d45614a04506d8093c0c3374e9d23068b87f4ed29cf13c2a2

열기 전에 비교하세요: shasum -a 256 (터미널), Get-FileHash (PowerShell). 값이 다르면 다른 파일이니 다시 다운로드하세요.

릴리스 노트 & 체크섬

↗

설치 안내

↗

모든 릴리스

↗

업그레이드하기 전에 릴리스 노트를 확인하세요. 각 플랫폼에서 실제 제공업체 계정으로 진행하는 인수 검증은 저장소에 공개적으로 기록됩니다.

문제

## 작업이 끝나기 전에

## 한도가 먼저 바닥납니다

긴 세션은 작업 도중에 계정의 사용량 한도에 닿을 수 있습니다. 그러면 로그아웃하고 다른 계정을 찾아 다시 로그인하는 동안 작업이 멈춥니다.

Switchboard가 작업을 계속 이어 갑니다. 순환을 켜 두면 다음 요청은 같은 풀의 다른 계정으로 넘어가고 세션은 열린 채로 유지됩니다.

SWITCHBOARD 살펴보기

## 계정을 한 화면에서

실제 Switchboard 인터페이스입니다. 합성 데모 계정으로 보여 줍니다.

0.6.13 브라우저 데모 · 실제 계정, 자격 증명, 제공업체 요청 없음

로컬 작업대

## 계정 관리는 덜고

## 한눈에 보이는 맥락은 더 많이

01 / 계정

### 지금 쓰는 계정으로 시작

현재 CLI 계정을 직접 가져오거나, 공식 CLI로 로그인하거나, Claude Swap 프로필을 가져올 수 있습니다. Switchboard로 가져올 대상은 직접 고릅니다.

02 / 경계

### 업무는 업무끼리

계정을 업무용, 개인용 같은 풀로 묶습니다. 라우팅은 같은 제공업체와 같은 풀 안에서만 이루어집니다.

03 / 사용량

### 남은 한도 확인

보고된 할당량 구간, 초기화 시각, 각 확인이 얼마나 오래되었는지를 볼 수 있습니다. 지원되지 않거나 알 수 없는 사용량은 그렇다고 분명하게 표시됩니다.

04 / 전환

### 다음 요청 바꾸기

관리형 경로를 직접 선택하거나 할당량을 고려하는 순환을 켤 수 있습니다. 진행 중인 응답은 시작한 계정 그대로 유지됩니다.

05 / 로컬 저장

### 자격 증명은 내 컴퓨터에

저장된 시크릿은 macOS 키체인 또는 Windows DPAPI를 사용합니다. 격리 CLI를 실행하면 공식 클라이언트에 필요한 액세스 토큰 사본이 로컬에 만들어집니다.

06 / 작업 방식

### 창으로도 터미널로도

데스크톱 앱과 CLI는 같은 런타임을 씁니다. 관리형 세션을 쓰는 동안에는 앱이나 switchboard serve를 계속 실행해 두세요.

에이전트용 · 0.4 신규

## 에이전트가 자신의

## 한도를 직접 확인합니다

Switchboard에는 switchboard mcp라는 로컬 MCP 서버가 포함되어 있습니다. Claude Code, Codex 또는 다른 MCP 클라이언트가 남은 사용량을 읽고 다음 요청을 다른 계정으로 옮길 수 있습니다. 자격 증명을 받거나 돌려주는 도구는 없습니다.

01 / 사용량

### 남은 양 읽기

계정별, 구간별 남은 할당량을 초기화 시각, 각 확인이 얼마나 오래되었는지와 함께 보여 줍니다. 알 수 없는 사용량은 0이 아니라 알 수 없음으로 보고됩니다.

02 / 전환

### 한도 전에 전환

에이전트는 같은 제공업체와 풀 안에서 세션의 다음 요청에 쓸 계정을 고를 수 있습니다. Mac의 모든 세션에 적용되는 Claude Code 로그인을 바꾸려면 명시적인 global 플래그가 필요합니다.

03 / 프로젝트 규칙

### 선택 사항인 프로젝트 규칙

원하면 프로젝트 폴더를 지정한 계정으로 시작할 수 있습니다. 규칙은 앱에 계속 표시되고, 일시 중지하거나 만료일을 정할 수 있으며, 순환을 막지 않습니다.

01

### Switchboard에서 실행

앱이나 CLI에서 실행한 세션은 switchboard CLI를 찾을 수 있으면 도구를 사용할 수 있습니다. 격리 세션에는 읽기 전용 도구만 제공됩니다. macOS에서는 에이전트 패널이 앱 안의 CLI를 연결하는 경로는 ~/.local/bin.

02

### 또는 에이전트를 직접 연결

claude mcp add --scope user switchboard -- switchboard mcp
codex mcp add switchboard -- switchboard mcp

첫 세션

## 계정을 가져오고

## 실행 방식을 고르세요

01

### 계정 추가

현재 인증 정보를 가져오거나 공식 CLI 로그인을 사용하세요. 계정에 라벨과 풀을 지정합니다.

02

### 확인된 정보 보기

계정 식별 정보와 보고된 사용량을 확인합니다. 관리형 선택과 현재 네이티브 CLI 계정은 따로 표시됩니다.

03

### 세션 실행

요청 사이에 전환하려면 관리형 모드를, 한 계정에 고정된 직접 세션이 필요하면 격리 모드를 사용하세요.

시작하기 전에

## 알아 두면 좋은 구분

Switchboard가 Claude Code나 Codex를 대체하나요?

아니요. Switchboard는 계정을 관리하고 공식 CLI를 실행합니다. 로그인과 세션을 위해 Claude Code나 Codex는 따로 설치하세요. Switchboard에는 제공업체 구독이나 API 크레딧이 포함되어 있지 않습니다.

현재 CLI 계정을 자동으로 바꾸나요?

계정 가져오기는 직접 실행하는 동작입니다. 관리형 경로 선택은 네이티브 활성화와 별개입니다. 네이티브 Claude 활성화와 자동 순환은 직접 켜야 하는 기능이므로 켜기 전에 확인 창을 살펴보세요.

관리형과 격리의 차이는 무엇인가요?

관리형 세션은 요청을 로컬 프록시를 거쳐 보내고, 이후 요청부터는 선택한 경로를 따릅니다. 격리 세션은 별도의 계정 홈을 사용해 직접 연결하며, 나중에 경로를 선택해도 바뀌지 않습니다.

Switchboard와 Fabric은 같은 것인가요?

Switchboard는 지금 사용할 수 있는 계정 관리 도구입니다. 초기 프리뷰 단계인 Fabric은 내 프로젝트와 그 에이전트를 위한 집입니다. 둘 다 PassionCode 툴킷에 속합니다. Fabric으로 만들고 있는 것 살펴보기.

어떤 에이전트를 Switchboard와 함께 쓸 수 있나요?

Claude Code, Codex와 그 밖의 인기 코딩 에이전트인 Hermes, Kilo Code, Cline, Goose, OpenCode 등을 쓸 수 있습니다. 30개 전체와 연결 방법 보기.

프로젝트가 자체 계정을 가질 수 있나요?

네. 프로젝트를 만들고 폴더를 추가한 뒤(예: 서로 관련된 여러 저장소) 그 프로젝트의 계정을 고르세요. 해당 폴더에서 실행한 세션은 그 계정만 사용하고, 자동 전환도 그 안에서만 이루어지며, 다른 프로젝트에서 일하는 에이전트는 그 계정으로 전환되지 않습니다.

Switchboard가 데이터를 전송하나요?

릴리스 빌드는 설치 수, 사용한 일수, 연결된 계정 수를 제공업체와 유형별로 집계합니다. 계정 이름, 이메일 주소, 로그인 정보, 풀 이름, 계정으로 하는 작업은 전송하지 않습니다. 컴퓨터에 있는 PassionCode.ai 도구들이 함께 쓰는 임의의 설치 번호 덕분에 한 사람이 한 번만 집계됩니다. 정보 → 익명 사용 횟수 공유에서 끌 수 있으며, 이 설정은 모든 PassionCode.ai 도구에 적용됩니다. 정확히 무엇이 전송되나요.

직접 살펴보거나 빌드할 수 있나요?

네. Switchboard는 오픈 소스(GNU AGPL-3.0)입니다. AGPL이 다루지 않는 용도에는 다음에서 상용 라이선스를 받을 수 있습니다: passioncode.ai/business. v0.3.1-beta.1까지의 릴리스는 MIT 라이선스로 배포되었으며 계속 그 라이선스로 이용할 수 있습니다. 현재 다운로드(0.6.16)는 AGPL로 릴리스되었습니다. v0.4.0-beta.1은 PolyForm Noncommercial or Internal Use로 릴리스되었으며 해당 라이선스가 유지됩니다. 빌드 방법, 소스 코드, 테스트, 릴리스 증거는 저장소에서 확인할 수 있습니다.

PASSIONCODE 툴킷의 일부

## 계정은 전체 환경의

## 한 부분입니다

Switchboard는 Claude Code와 Codex 계정을 관리합니다. Project Observatory는 에이전트가 작업하는 프로젝트를 한눈에 보여 줍니다. Fabric Dashboards는 Mac의 로컬 에이전트 서비스를 한 창에서 보여 줍니다. 내 프로젝트와 그 에이전트를 위한 집인 Fabric은 초기 프리뷰 단계입니다.

Observatory 살펴보기

↗

Fabric Dashboards 릴리스

↗

Fabric 만나 보기

↗

모든 도구

↗

오픈 소스 · 로컬 우선

## 내 환경, 내 소스

직접 써 보고, 작동 방식을 살펴보고, 개선이 필요한 부분을 알려 주세요.

Switchboard 다운로드

↑

문제 보고

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
