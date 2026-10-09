Contract: brand-contract v1

<!-- Generated from ko/observatory/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Project Observatory | 에이전트가 작업하는 프로젝트를 위한 로컬 대시보드 | PassionCode.ai

프로젝트 전반에서 무엇이 바뀌었는지, 무엇에 주의가 필요한지, 알려진 API 키의 사본이 어디에 남았는지 확인하세요. Project Observatory는 PassionCode.ai의 오픈 소스 로컬 대시보드이며 영어 또는 러시아어로 사용할 수 있습니다.

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

Polski

다운로드

↓

PROJECT OBSERVATORY · PASSIONCODE 제작

# 내 프로젝트

# 다시 한눈에

에이전트가 작업하는 프로젝트에서 무엇이 바뀌었는지, 무엇에 주의가 필요한지, 알려진 API 키의 사본이 어디에 남았는지 영어 또는 러시아어로 쓸 수 있는 로컬 대시보드에서 확인하세요

패밀리 소개 기억과 증거: 각 프로젝트에서 무엇이 바뀌었고, 무엇이 결정되었고, 무엇에 주의가 필요한지. 전체 패밀리

시작하기

↓

소스 보기

↗

오픈 소스 · macOS + Linux · Python 3.11+

한 화면 / 내 프로젝트

프로젝트

+

발견 항목

OBSERVATORY 살펴보기

## 가장 먼저 주의할 것

가상의 회사 프로젝트를 대상으로 엔진이 실제로 렌더링한 Observatory 개요 화면입니다.

합성 데모 환경 · 실제 프로젝트, 저장소, 자격 증명 없음

로컬 OBSERVATORY

## 추측은 줄이고

## 한눈에 더 많은 증거를

01 / 인벤토리

### 무엇이 있는지 파악

관찰할 프로젝트 폴더를 선택하세요. Observatory가 그 안의 저장소를 찾아 로컬 레지스트리로 관리하며, 각 연결에는 근거가 된 규칙이 함께 남습니다.

02 / 활동

### 무엇이 움직였는지 확인

범위에 포함된 모든 프로젝트의 커밋, 작업 트리 상태, 이 머신에만 있는 작업을 프로젝트별 주간 추이와 함께 보여 줍니다.

03 / 발견 항목

### 중요한 것부터

발견 항목에는 근거와 다음 단계가 함께 제공되며, 심각도 높음부터 정보까지 정렬됩니다. 무시 처리된 발견 항목에는 누가, 언제, 왜 무시했는지가 남습니다.

04 / 키

### 알려진 키의 사본 찾기

자격 증명 메타데이터는 값과 분리되어 있습니다. 선택한 대화 기록, 로그, SQLite 저장소를 로컬에 이미 알려진 키와 비교하며, 발견 항목에는 값이 다시 나타나지 않습니다.

05 / 사용 언어

### 영어 또는 러시아어

대시보드는 기본적으로 영어입니다. 워크스페이스에 러시아어를 설정하거나 사이드바의 EN/RU로 전환할 수 있으며, 개수 표기는 각 언어의 복수형 규칙을 따릅니다.

06 / 에이전트

### 다음 에이전트에 맥락 전달

CLI, MCP 도구, Claude Code 플러그인이 같은 로컬 사실을 공유합니다. 통합과 백그라운드 작업은 직접 선택하기 전까지 꺼져 있습니다.

OBSERVATORY 받기

## 내 워크스페이스에서 시작하기

최신 릴리스: 0.19.4. 첫 로컬 관찰에는 API 키가 필요하지 않습니다. 설정은 코딩 에이전트에 맡기거나 직접 실행하세요.

01

### 릴리스 설치

다운로드 project_observatory-0.19.4-py3-none-any.whl 및 SHA256SUMS 출처: 릴리스 0.19.4, 확인 명령: shasum -a 256 -c SHA256SUMS --ignore-missing, 이어서 SQLite 확장을 지원하는 격리된 Python 3.11+ 환경에서 pip install --no-deps wheel을 설치하고, 이어서 해당 [full] extra를 다음 옵션으로 설치합니다: -c "$(project-observatory full-path)/requirements-full.lock"는 릴리스를 테스트한 의존성 세트입니다. macOS에서는 Homebrew Python을 사용하세요.

02

### 비공개 워크스페이스 만들기

project-observatory full init, 그다음 관찰할 폴더를 다음 명령으로 선택합니다: full configure sources projects. 설정, 키, 기록은 설치된 코드 바깥에 보관됩니다.

03

### 관찰하고 열기

project-observatory full local, 그다음 full open. 러시아어로 쓰려면: full configure interface locale ru.

04

### 에이전트 연결

MCP 서버는 stdio로 동작합니다: claude mcp add observatory --scope user -e OBSERVATORY_HOME="$OBSERVATORY_HOME" -- "$(python -c 'import sys; print(sys.executable)')" "$(project-observatory full-path)/mcp/server.py", 그다음 다음을 요청하세요: observatory_overview.

설치 가이드

↗

온보딩 & 통합

↗

전체 릴리스

↗

Mac 앱: ProjectObservatory-0.19.4-macos.zip, Developer ID로 서명되고 Apple 공증을 받았으며 macOS 14+용입니다. 대시보드로 열리고 위에서 설치한 엔진을 사용합니다. 검증은 같은 SHA256SUMS.

현재 릴리스 0.19.4는 AGPL 라이선스입니다. 최초의 AGPL 릴리스인 0.10.0 이후 모든 릴리스가 같으며, 0.9.1 및 이전 버전은 배포 당시의 라이선스를 유지합니다.

알려진 값 스캔은 선택한 아티팩트를 로컬에 이미 알려진 키와 비교합니다. 알 수 없는 시크릿은 찾을 수 없고 사본이 남아 있지 않다는 것도 증명할 수 없으며, 로컬 사본이 있다고 해서 다른 누군가가 키를 입수했다는 증거는 아닙니다. 실제 제공업체에서의 키 교체와 외부 MCP 호스트는 오프라인 테스트 모음 범위 밖입니다.

시작하기 전에

## 알아 두면 좋은 구분

Observatory가 내 프로젝트나 키를 업로드하나요?

아니요. 인벤토리, 기록, 관찰 결과는 내 머신의 비공개 워크스페이스에 있습니다. 선택 통합에는 각자의 접근 권한이 있으며, 각각 내 계정으로 따로 활성화합니다.

무엇을 읽나요?

직접 설정한 폴더와 소스만 읽습니다. full doctor 명령은 무엇이 활성화되어 있고 무엇이 빠져 있는지 보고하며, 대시보드는 소스를 측정하지 못했을 때 0을 표시하는 대신 측정하지 않았다고 알려 줍니다.

Switchboard와 같은 것인가요?

아니요. Switchboard는 Claude Code와 Codex 계정을 관리합니다. Observatory는 그 에이전트들이 작업하는 프로젝트를 한눈에 보여 줍니다. 둘 다 오늘 바로 쓸 수 있는 PassionCode 오픈 소스 도구입니다.

Fabric은요?

Fabric은 초기 프리뷰 단계의 CEO AI 에이전트로, 에이전트와 프로젝트의 조율에 집중합니다. Observatory는 지금 별도의 로컬 도구로 사용할 수 있습니다. Fabric 자세히 보기.

직접 살펴보거나 빌드할 수 있나요?

예. Project Observatory는 GNU AGPL-3.0 오픈 소스입니다. AGPL이 다루지 않는 용도에는 다음 주소에서 상용 라이선스를 받을 수 있습니다: passioncode.ai/business. 이미 배포된 버전은 해당 라이선스를 유지합니다. 0.8.1 및 이전 버전은 MIT, 0.8.2부터 0.9.1까지는 PolyForm Noncommercial or Internal Use입니다. 소스 코드, 테스트, 보안 모델, 릴리스 노트는 저장소 에 들어 있습니다.

오픈 소스 · 로컬 우선

## 내 프로젝트, 내 증거

비공개 워크스페이스를 만들고, 내 폴더를 관찰하고, 개선이 필요한 부분을 알려 주세요.

시작하기

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
