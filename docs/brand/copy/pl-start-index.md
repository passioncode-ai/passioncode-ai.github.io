Contract: brand-contract v1

<!-- Generated from pl/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Pierwsze kroki | Zainstaluj miejsce pracy dla agentów AI | PassionCode.ai

Zainstaluj skille PassionCode.ai, dodaj Fabric, utwórz pierwszego agenta Fabric w Claude Code lub Codex, przekształć istniejący projekt, uruchom go w Fabric Dashboards i dodaj kolejnego agenta do tej samej rodziny. Za darmo i na otwartym kodzie.

Przejdź do treści

PassionCode

.ai

Wizja

Dla ciebie

Dla organizacji

Narzędzia

O projekcie

Polski

English

Русский

Deutsch

Français

한국어

简体中文

日本語

Pobierz narzędzia

↓

Pierwsze kroki · za darmo i na otwartym kodzie

# Od pustego Maca do pierwszego agenta

Przestań budować agentów, którzy niszczeją i nie rozmawiają ze sobą. Pięć kroków, około dwudziestu minut — od pierwszego agenta do rodziny, którą widać. Każdy krok jest przydatny sam w sobie, więc zatrzymaj się tam, gdzie wynik Ci wystarczy

Wymaga Node.js 18+ oraz Claude Code lub Codex Fabric wymaga macOS na Apple silicon

01

Zainstaluj skille

02

Dodaj Fabric

03

Utwórz lub przekształć agenta

04

Uruchom i zobacz

05

Dodaj kolejnego agenta

+

Współtwórz

## Kroki

01

### Zainstaluj skille

Launcher PassionCode.ai instaluje skille Fabric Agent Adapter, Observatory Log oraz zasady pracy w Claude Code, Codex i innych obsługiwanych agentach. Bez konta i bez klucza.

npx @passioncode-ai/passioncode@latest update

Launcher 0.1.31 · instaluje członków rodziny w przypiętych przez siebie wersjach · potem zrestartuj agenta. Automatyczne aktualizacje są domyślnie włączone; możesz je wyłączyć, jeśli wolisz.

02

### Dodaj Fabric

Fabric to agent AI w roli CEO: każdy projekt dostaje jedno miejsce na swój cel, tablicę, decyzje i wydania. To wczesna wersja zapoznawcza: wymaga Dockera i Supabase CLI, a jej czat zapisuje wiadomości, ale jeszcze nie odpowiada.

Pobierz Fabric

0.3.2

dla macOS

↓

Wymagania i ograniczenia

Apple silicon · podpisana i notaryzowana przez Apple · SHA-256 db0f1a2adcc3aae96100e98194268826b1514b26dd0d35e62fd2301e7337457b · informacje o wydaniu

03

### Utwórz lub przekształć agenta

W Claude Code lub Codex poproś o to, czego potrzebujesz. Skill Fabric Agent Adapter zbuduje usługę zgodną z Fabric: kontrakt, panel, testy i test zgodności.

nowy Utwórz agenta Fabric, który każdego ranka sprawdza opinie o naszej aplikacji w sklepie i przygotowuje szkice odpowiedzi

przekształć Dostosuj to repozytorium do Fabric

Istniejący agent, serwer MCP lub narzędzie wiersza poleceń zachowuje swój kod; adapter dodaje wokół niego to, czego potrzebuje Fabric. Szybki start adaptera · kontrakt

04

### Uruchom i zobacz

Fabric Dashboards pokazuje wszystkie lokalne usługi agentów w jednym oknie; Twój agent może je uruchamiać, zatrzymywać i otwierać przez MCP.

Pobierz Fabric Dashboards

0.6.5

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Potem dodaj to, czego wymaga Twoja praca: Fabric Switchboard — gdy agenci potrzebują kilku kont, Project Observatory — aby widzieć, co zmieniło się we wszystkich projektach, Fabric Inbox — do poczty.

05

### Dodaj kolejnego agenta i zobacz rodzinę

Gdy praca tego wymaga, zbuduj kolejnego agenta w ten sam sposób i przypisz mu ten sam projekt w Fabric. Claude Code, Kilo Code i Hermes Agent uruchomione z Fabric dzielą tablicę, pamięć i przekazania tego projektu, więc jeden podejmuje pracę tam, gdzie drugi skończył. Fabric Dashboards pokazuje oba, z ich stanem i kosztami, w jednym oknie.

kolejny Utwórz agenta Fabric, który zamienia przygotowane odpowiedzi na opinie w cotygodniowe podsumowanie na tablicę

Każdy nowy agent dołącza do rodziny, którą już widzisz, zamiast stawać się kolejnym skryptem, o którym trzeba pamiętać. Jak rośnie rodzina · którzy agenci łączą się już dziś

NARZĘDZIE, KTÓRE POLECAMY

## Agenci, którzy kończą

## to, co zaczęli

Do zmian wprowadzanych przez Twoich agentów polecamy task-pipeline, odrębny skill na otwartym kodzie z rodziny sshlg-skills. Prowadzi zmianę przez etapy z bramkami — od briefu i planu po testy, wdrożenie i odbiór — i nie idzie dalej, dopóki każda bramka nie przejdzie.

npx sshlg-skills install

task-pipeline na GitHubie · nie jest częścią PassionCode.ai i niczego od niego nie wymaga

WSPÓŁTWÓRZ

## Jest coś do poprawienia?

## Wyślij pull request

Repozytoria wszystkich produktów są publiczne. Każde podaje polecenie testów w pliku AGENTS.md, a szybki start w README; Twój agent kodujący przeczyta oba i zrobi resztę.

### Wybierz repozytorium

Zrób fork produktu, którego używasz, albo przejrzyj całą organizację. Zgłoszenia oznaczone etykietą to dobry początek.

### Uruchom jego bramkę testów

Przeczytaj AGENTS.md repozytorium oraz CONTRIBUTING.md organizacji, wprowadź zmianę i uruchamiaj polecenie testów, aż przejdzie.

### Otwórz pull request

Otwierając go, akceptujesz CLA.md repozytorium; nie trzeba niczego zaznaczać. Przeglądamy każdy pull request i odpowiadamy.

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

Kilka repozytoriów jest wewnętrznych i widzą je tylko współpracownicy: baza wiedzy zespołu i mapa organizacji. Chcesz dołączyć do zespołu? Napisz do Sergeya.

DLA ORGANIZACJI

## Chcesz, żeby to działało

## w całym Twoim zespole?

Rozpisujemy Twoje procesy, szacujemy, co mogą przejąć agenci, i wdrażamy to razem z Tobą albo za Ciebie.

Wycena i zgłoszenie

→

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
