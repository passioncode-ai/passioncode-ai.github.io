Contract: brand-contract v1

<!-- Generated from pl/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Pierwsze kroki | Zainstaluj miejsce pracy dla agentów AI | PassionCode.ai

Skonfiguruj PassionCode.ai jednym poleceniem albo jednym promptem dla Claude Code lub Codex: narzędzia, ich serwery MCP i skille. To samo polecenie sprawdzi i naprawi konfigurację, którą już masz. Za darmo i na otwartym kodzie.

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

Skonfiguruj

↓

Pierwsze kroki · za darmo i na otwartym kodzie

# Od pustego komputera do pierwszego agenta

Twórz agentów, którzy pracują dalej i wiedzą, co zrobiły inne. Jedno polecenie konfiguruje narzędzia, a to samo polecenie sprawdza je później

Wymaga Node.js 18+ oraz Claude Code lub Codex Fabric wymaga Dockera i Supabase CLI na każdym systemie

→

Jedno polecenie

01

Utwórz lub dostosuj agenta

02

Uruchom i zobacz

03

Dodaj kolejnego agenta

+

Współtwórz

JEDNO POLECENIE

## Skonfiguruj wszystko

## albo sprawdź to, co masz

Na macOS jedno polecenie instaluje wybrane narzędzia z ich podpisanych wydań, podłącza ich serwery MCP do Claude Code, Codex, Gemini CLI i Kimi Code oraz dodaje skille. Na Windows i Linuksie pobierz aplikacje z ich stron, a potem uruchom to samo polecenie dla skilli i serwerów MCP. Na komputerze, który jest już skonfigurowany, to samo polecenie sprawdza wszystko, naprawia to, co nie działa, i pokazuje, co się zmieniło.

### Uruchom sam

npx @passioncode-ai/passioncode@latest setup

Wymaga Node.js 18+ · nie instaluje niczego, czego podpis, suma kontrolna lub notaryzacja się nie zgadza · potem zrestartuj agenta kodującego · aby tylko sprawdzić, niczego nie zmieniając:

npx @passioncode-ai/passioncode@latest doctor

### Albo zleć to swojemu agentowi kodującemu

Skopiuj ten prompt do Claude Code, Codex lub innego agenta kodującego. Uruchomi polecenie, zrobi, co może, i da Ci krótką listę tego, co możesz zrobić tylko Ty: zalogować się, zezwolić na dostęp, wpisać klucz we własnym oknie narzędzia.

Skonfiguruj PassionCode.ai na tym komputerze albo, jeśli jest już skonfigurowany, sprawdź go i napraw. Uruchom npx --yes @passioncode-ai/passioncode@latest setup --yes --json (wymaga Node 18 lub nowszego) i przeczytaj jego JSON: na macOS polecenie instaluje brakujące aplikacje z ich podpisanych wydań, a na Windows i Linuksie zamiast tego podaje stronę pobierania każdej aplikacji; wszędzie instaluje skille i każdy serwer MCP, naprawia to, co nie działa, i sprawdza wszystko jeszcze raz. Niczego nie pobieraj ani nie instaluj ręcznie i nigdy nie zatrzymuj ani nie zabijaj działającej aplikacji. Następnie wykonaj każdy wymieniony krok wdrożenia produktu, który może wykonać agent, nigdy nie proś mnie o klucz ani hasło na czacie (narzędzia otwierają własne ukryte pola) i zakończ poleceniem npx --yes @passioncode-ai/passioncode@latest doctor. Powiedz mi krótko, co skonfigurowałeś lub naprawiłeś, co wciąż nie działa, i ponumerowane kroki, które mogę zrobić tylko ja, na przykład logowanie albo, na Windows i Linuksie, instalację aplikacji z ich stron i ponowne uruchomienie polecenia, i przypomnij mi, żebym Cię zrestartował, aby załadowały się nowe skille i serwery MCP.

Fabric to wczesna wersja zapoznawcza i na każdym systemie wymaga Dockera i Supabase CLI. Na macOS polecenie instaluje go, gdy oba są na komputerze, a w przeciwnym razie mówi, co dodać; na Windows i Linuksie najpierw pobierz go ze strony Fabric i zainstaluj.

Wolisz ręcznie?

01

### Dodaj Fabric

Fabric to dom dla Twoich projektów i ich agentów: każdy projekt trzyma tam swój cel, tablicę, decyzje i wydania. Pierwszy ekran oferuje cztery akcje: utwórz agenta, dostosuj takiego, którego już masz, otwórz projekt albo utwórz nowy. To wczesna wersja zapoznawcza: wymaga Dockera i Supabase CLI, a jej czat zapisuje wiadomości, ale jeszcze nie odpowiada.

Pobierz Fabric

0.3.15

dla macOS

↓

Dla Windows i Linuksa

Wymagania i ograniczenia

Apple silicon i Intel · podpisana i notaryzowana przez Apple · SHA-256 7c592d39b54e0350ada2cd110e861f5789bc33aa9af0dc6b055cd0b54dd3596d · informacje o wydaniu

02

### Dodaj Fabric Dashboards

Fabric Dashboards pokazuje każdą lokalną usługę agenta w jednym oknie. Pobierz aplikację, a potem połącz ją z agentem kodującym przez MCP.

Pobierz Fabric Dashboards

0.8.17

↓

Dla Windows i Linuksa

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Switchboard, Project Observatory i Fabric Inbox mają własne pobrania: Switchboard · Observatory · Inbox

## Kolejne kroki

01

### Utwórz lub dostosuj agenta

W Claude Code lub Codex poproś o to, czego potrzebujesz, albo zacznij od akcji tworzenia i dostosowania w Fabric; w obu przypadkach praca odbywa się w konsoli Twojego agenta kodującego. Skill Fabric Agent Adapter najpierw zadaje pytania i pokazuje plan, zanim cokolwiek zmieni; dostosowanie odbywa się na nowej gałęzi fabric-adapter. Dostajesz kontrakt, panel, testy i raport zgodności.

nowy Utwórz agenta Fabric, który każdego ranka sprawdza opinie o naszej aplikacji w sklepie i przygotowuje szkice odpowiedzi

dostosuj Dostosuj to repozytorium do Fabric

02

### Uruchom i zobacz

Fabric Dashboards pokazuje każdą lokalną usługę agenta w jednym oknie; Twój agent może je uruchamiać, zatrzymywać i otwierać przez MCP. To samo polecenie instaluje aplikację na macOS i łączy ją z agentem kodującym.

03

### Dodaj kolejnego agenta do tego samego projektu

Zbuduj następnego agenta w ten sam sposób i daj mu ten sam projekt w Fabric. Agenci podłączeni do Fabric dzielą tablicę, pamięć i przekazania jednego projektu, więc jeden podejmuje pracę tam, gdzie skończył drugi. Którzy agenci łączą się dziś

Do zmian, które wprowadzają Twoi agenci, polecamy task-pipeline, osobny skill o otwartym kodzie: co robi i jak go zainstalować

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

Inwestorzy

Współtwórcy

Prasa

System projektowy

Prywatność

commercial@passioncode.ai

X

↗
