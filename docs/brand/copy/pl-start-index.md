Contract: brand-contract v1

<!-- Generated from pl/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Pierwsze kroki | Zainstaluj miejsce pracy dla agentów AI | PassionCode.ai

Zainstaluj skille PassionCode.ai, dodaj Fabric, utwórz pierwszego agenta Fabric w Claude Code lub Codex albo dostosuj istniejący projekt, uruchom go w Fabric Dashboards i dodaj kolejnego agenta do tego samego projektu. Bezpłatnie i na otwartym kodzie.

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

Pobierz narzędzia

↓

Pierwsze kroki · za darmo i na otwartym kodzie

# Od pustego Maca do pierwszego agenta

Buduj agentów, którzy działają dalej i wiedzą, co zrobili pozostali. Pięć kroków, około dwudziestu minut, a każdy przydaje się sam z siebie

Wymaga Node.js 18+ oraz Claude Code lub Codex Fabric wymaga macOS na Apple silicon lub Intel

01

Zainstaluj skille

02

Dodaj Fabric

03

Utwórz lub dostosuj agenta

04

Uruchom i zobacz

05

Dodaj kolejnego agenta

+

Współtwórz

## Kroki

01

### Zainstaluj skille

Launcher PassionCode.ai instaluje w Twoim agencie kodującym skille Fabric Agent Adapter, Observatory Log i zasady pracy. Bez konta i bez klucza. Nie instaluje Fabric: to następny krok, osobne pobranie.

npx @passioncode-ai/passioncode@latest update

Launcher 0.1.32 · po instalacji uruchom agenta ponownie · automatyczne aktualizacje są włączone; możesz je wyłączyć

02

### Dodaj Fabric

Fabric to dom dla Twoich projektów i ich agentów: każdy projekt trzyma tam swój cel, tablicę, decyzje i wydania. Pierwszy ekran oferuje cztery akcje: utwórz agenta, dostosuj takiego, którego już masz, otwórz projekt albo utwórz nowy. To wczesna wersja zapoznawcza: wymaga Dockera i Supabase CLI, a jej czat zapisuje wiadomości, ale jeszcze nie odpowiada.

Pobierz Fabric

0.3.4

dla macOS

↓

Wymagania i ograniczenia

Apple silicon i Intel · podpisana i notaryzowana przez Apple · SHA-256 4d8e8da80bcf490fed955dd627ed64b76a1c53c50aa89de49ac6eaeed91f0653 · informacje o wydaniu

03

### Utwórz lub dostosuj agenta

W Claude Code lub Codex poproś o to, czego potrzebujesz, albo zacznij od akcji tworzenia i dostosowania w Fabric; w obu przypadkach praca odbywa się w konsoli Twojego agenta kodującego. Skill Fabric Agent Adapter najpierw zadaje pytania i pokazuje plan, zanim cokolwiek zmieni; dostosowanie odbywa się na nowej gałęzi fabric-adapter. Dostajesz kontrakt, panel, testy i raport zgodności.

nowy Utwórz agenta Fabric, który każdego ranka sprawdza opinie o naszej aplikacji w sklepie i przygotowuje szkice odpowiedzi

dostosuj Dostosuj to repozytorium do Fabric

04

### Uruchom i zobacz

Fabric Dashboards pokazuje wszystkie lokalne usługi agentów w jednym oknie; Twój agent może je uruchamiać, zatrzymywać i otwierać przez MCP.

Pobierz Fabric Dashboards

0.6.7

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

05

### Dodaj kolejnego agenta do tego samego projektu

Zbuduj następnego agenta w ten sam sposób i daj mu ten sam projekt w Fabric. Claude Code, Kilo Code i Hermes Agent uruchomione z Fabric dzielą tablicę, pamięć i przekazania tego projektu, więc jeden podejmuje pracę tam, gdzie skończył drugi. Którzy agenci łączą się dziś

NARZĘDZIE, KTÓRE POLECAMY

## Agenci, którzy kończą

## to, co zaczęli

Do zmian wprowadzanych przez Twoich agentów polecamy task-pipeline, odrębny skill na otwartym kodzie z kolekcji sshlg-skills: prowadzi każdą zmianę od zlecenia do odbioru i nie idzie dalej, dopóki nie przejdzie każda kontrola.

npx sshlg-skills install

task-pipeline na GitHubie · nie jest częścią PassionCode.ai i niczego od niego nie wymaga

WSPÓŁTWÓRZ

## Jest coś do poprawienia?

## Wyślij pull request

Repozytorium każdego produktu jest publiczne, a polecenie do testów podano w AGENTS.md. Zastosuj się do pliku CONTRIBUTING.md organizacji i otwórz pull request; jego otwarcie oznacza Twoją zgodę na zapisy z pliku CLA.md.

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
