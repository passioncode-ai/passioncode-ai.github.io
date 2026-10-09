Contract: brand-contract v1

<!-- Generated from pl/switchboard/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Switchboard | Menedżer kont Claude Code i Codex | PassionCode.ai

Zarządzaj kontami Claude Code i Codex, sprawdzaj limity użycia i przełączaj zarządzane żądania. Pobierz Switchboard na macOS i Windows.

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

Pobierz

↓

FABRIC SWITCHBOARD · OD PASSIONCODE

# Twoje konta

# Przełączanie bez zgadywania

Trzymaj konta Claude Code i Codex CLI w jednym lokalnym warsztacie: sprawdzaj zgłaszane użycie, oddzielaj konta służbowe od prywatnych i wybieraj, które obsłuży następne żądanie

W RODZINIE Konta: na którym koncie działa każdy agent, z limitami użycia na widoku. Cała rodzina

Pobierz Switchboard

↓

Kod źródłowy

↗

Otwarty kod · macOS + Windows · Desktop + CLI

JEDNO NARZĘDZIE / TWOJE KONTA

CLAUDE CODE

+

CODEX CLI

POBIERZ SWITCHBOARD

## Wybierz platformę

Najnowsze wydanie: 0.6.14. Obie wersje zawierają aplikację desktopową i switchboard CLI.

⌘

### macOS

Universal · Apple silicon + Intel
macOS 14 lub nowszy · archiwum ZIP

Pobierz na macOS

↓

Podpisana Developer ID i notaryzowana przez Apple. Otwórz ZIP, przenieś Fabric Switchboard do folderu Aplikacje i uruchamiaj stamtąd.

⊞

### Windows

x64 · instalator desktopowy + CLI
Archiwum ZIP · wymaga WebView2

Pobierz na Windows

↓

Zbudowany natywnie na Windows, jeszcze bez podpisu Authenticode, więc SmartScreen może pokazać ostrzeżenie. Instalator zawiera CLI.

☰

### Zanim go otworzysz

Switchboard zarządza kontami i uruchamia oficjalne CLI. Nie zastępuje ich.

Claude Code lub Codex CLI, instalowane osobno. Switchboard nie zawiera subskrypcji u dostawcy ani kredytów API.

macOS 14 lub nowszy, na Apple silicon lub Intel.

Windows x64 z WebView2. Wersja na Windows nie ma jeszcze podpisu Authenticode.

Po zamknięciu okna aplikacja działa dalej na pasku menu i uruchamia się przy logowaniu; zakończysz ją z jej menu.

ZIP dla macOS · SHA-256

7daffb205c73ca65c2a279d46baf1a9e99ff7ff0a7d6226243f4cad63989f64e

ZIP dla Windows · SHA-256

4bf62562c216100b4c3adf4864fa9260764b20301f952345f38aca79c34a7eac

Porównaj przed otwarciem: shasum -a 256 w Terminalu, Get-FileHash w PowerShell. Inna wartość oznacza inny plik; pobierz go ponownie.

Informacje o wydaniu i sumy kontrolne

↗

Uwagi o instalacji

↗

Wszystkie wydania

↗

Przed aktualizacją przeczytaj informacje o wydaniu. Testy akceptacyjne z prawdziwymi kontami dostawców na każdej platformie są prowadzone jawnie w repozytorium.

PROBLEM

## Limity kończą się

## szybciej niż praca

Długa sesja może wyczerpać limit użycia konta w połowie zadania. Wtedy praca czeka, a Ty wylogowujesz się, szukasz innego konta i logujesz się ponownie.

Dzięki Switchboard praca toczy się dalej. Gdy rotacja jest włączona, następne żądanie trafia na inne konto z tej samej puli, a sesja pozostaje otwarta.

WEWNĄTRZ SWITCHBOARD

## Wszystkie konta w jednym widoku

Prawdziwy interfejs Switchboard z syntetycznymi kontami demonstracyjnymi.

Demo w przeglądarce · bez prawdziwych kont, danych logowania i żądań do dostawców

LOKALNY WARSZTAT

## Mniej żonglowania kontami

## Więcej kontekstu na pierwszy rzut oka

01 / KONTA

### Zacznij od tego, co masz

Jawnie przechwyć bieżące konto CLI, zaloguj się przez oficjalne CLI albo zaimportuj profile Claude Swap. Sam decydujesz, co trafia do Switchboard.

02 / GRANICE

### Praca zostaje przy pracy

Grupuj konta w pule, na przykład służbową i prywatną. Routing nie wychodzi poza tego samego dostawcę i tę samą pulę.

03 / ZUŻYCIE

### Zobacz, jakie masz limity

Sprawdzaj zgłaszane okna przydziału, czasy resetu i wiek każdego odczytu. Nieobsługiwane lub nieznane zużycie jest wyraźnie oznaczone.

04 / PRZEŁĄCZANIE

### Zmień następne żądanie

Wybierz zarządzaną trasę albo włącz rotację uwzględniającą przydział. Odpowiedź w toku zachowuje tożsamość, z którą się zaczęła.

05 / LOKALNE PRZECHOWYWANIE

### Dane logowania zostają na Twoim komputerze

Zapisane sekrety trafiają do Pęku kluczy macOS lub Windows DPAPI. Izolowane uruchomienia CLI tworzą lokalną kopię tokenu dostępu, której potrzebuje oficjalny klient.

06 / TWÓJ SPOSÓB PRACY

### Okno albo terminal

Aplikacja desktopowa i CLI korzystają z tego samego środowiska uruchomieniowego. Do sesji zarządzanych musi działać aplikacja albo switchboard serve.

DLA AGENTÓW · NOWOŚĆ W 0.4

## Twój agent widzi

## własne limity

Switchboard zawiera switchboard mcp, lokalny serwer MCP. Claude Code, Codex lub inny klient MCP może odczytać pozostałe użycie i przenieść następne żądanie na inne konto. Żadne narzędzie nie przyjmuje ani nie zwraca danych logowania.

01 / UŻYCIE

### Odczytaj, ile zostało

Pozostały limit dla każdego konta i okna, z czasem resetu i wiekiem każdego odczytu. Nieznane użycie jest zgłaszane jako nieznane, nigdy jako zero.

02 / PRZEŁĄCZANIE

### Przełącz przed limitem

Agent może wybrać konto dla następnego żądania swojej sesji, w obrębie tego samego dostawcy i puli. Zmiana logowania Claude Code dla wszystkich sesji na Macu wymaga jawnej flagi global.

03 / REGUŁY PROJEKTU

### Opcjonalne reguły projektu

Jeśli chcesz, uruchamiaj folder projektu na wybranym koncie. Reguły są widoczne w aplikacji, można je wstrzymać lub ograniczyć w czasie i nigdy nie zatrzymują rotacji.

01

### Uruchom ze Switchboard

Sesje uruchomione z aplikacji lub CLI dostają narzędzia, gdy da się znaleźć CLI switchboard. Sesje izolowane dostają narzędzia tylko do odczytu. Na macOS panel Agents linkuje CLI z wnętrza aplikacji do ~/.local/bin.

02

### Albo podłącz agenta samodzielnie

claude mcp add --scope user switchboard -- switchboard mcp
codex mcp add switchboard -- switchboard mcp

PIERWSZA SESJA

## Dodaj konto

## Wybierz, jak ma działać

01

### Dodaj konto

Przechwyć bieżącą autoryzację albo użyj oficjalnego logowania przez CLI. Nadaj kontu etykietę i przypisz je do puli.

02

### Sprawdź, co wiadomo

Przejrzyj tożsamość konta i zgłaszane użycie. Wybór zarządzany i bieżące natywne konto CLI są pokazywane osobno.

03

### Uruchom sesję

Użyj trybu zarządzanego, aby przełączać konta między żądaniami, albo trybu izolowanego do bezpośredniej sesji przypiętej do jednego konta.

NA START

## Kilka rozróżnień, które się przydadzą

Czy Switchboard zastępuje Claude Code albo Codex?

Nie. Zarządza kontami i uruchamia oficjalne CLI. Claude Code lub Codex zainstaluj osobno — do logowania i sesji. Switchboard nie zawiera subskrypcji u dostawcy ani kredytów API.

Czy zmienia moje bieżące konto CLI automatycznie?

Przechwycenie to jawna czynność. Wybór zarządzanej trasy jest oddzielony od natywnej aktywacji. Natywna aktywacja Claude i automatyczna rotacja są opcjonalne; przed ich włączeniem przeczytaj potwierdzenie.

Czym różni się tryb zarządzany od izolowanego?

Sesje zarządzane wysyłają żądania przez lokalne proxy i przy kolejnych żądaniach podążają za wybraną trasą. Sesje izolowane łączą się bezpośrednio, z osobnym katalogiem konta; późniejsze wybory trasy ich nie zmieniają.

Czy Switchboard to to samo co Fabric?

Switchboard to narzędzie do zarządzania kontami dostępne już dziś. Fabric to nasz agent AI w roli CEO, we wczesnej wersji zapoznawczej, skupiony na koordynowaniu agentów i projektów. Oba należą do zestawu narzędzi PassionCode. Zobacz, co budujemy w Fabric.

Które agenty działają ze Switchboard?

Claude Code, Codex i inne popularne agenty kodujące — Hermes, Kilo Code, Cline, Goose, OpenCode i kolejne. Zobacz wszystkie 30 i sposób podłączenia każdego.

Czy projekt może mieć własne konta?

Tak. Utwórz projekt, dodaj jego foldery — na przykład kilka powiązanych repozytoriów — i wybierz jego konta. Sesje uruchamiane z tych folderów używają tylko tych kont, automatyczne przełączanie nie wychodzi poza nie, a agenty pracujące w innych projektach nigdy się na nie nie przełączą.

Czy Switchboard wysyła jakiekolwiek dane?

Wersje wydane zliczają instalacje, dni użycia i liczbę podłączonych kont według dostawcy i typu. Nigdy nie wysyłają nazw kont, adresów e-mail, danych logowania, nazw pul ani tego, co robisz na swoich kontach. Losowy numer instalacji, wspólny dla narzędzi PassionCode.ai na Twoim komputerze, sprawia, że jedna osoba jest liczona raz. Wyłączysz to w About → Share anonymous usage counts; przełącznik dotyczy wszystkich narzędzi PassionCode.ai. Co dokładnie jest wysyłane.

Czy mogę sam go przejrzeć albo zbudować?

Tak. Switchboard ma otwarty kod na licencji GNU AGPL-3.0. Do zastosowań, których AGPL nie obejmuje, licencja komercyjna jest dostępna przez passioncode.ai/business. Wydania do v0.3.1-beta.1 włącznie zostały opublikowane na licencji MIT i nadal są na niej dostępne. Bieżąca wersja do pobrania, 0.6.14, jest wydana na licencji AGPL. v0.4.0-beta.1 została wydana na licencji PolyForm Noncommercial lub Internal Use i zachowuje tę licencję. W repozytorium znajdziesz instrukcje budowania, kod źródłowy, testy i dowody wydań.

CZĘŚĆ ZESTAWU NARZĘDZI PASSIONCODE

## Konta to jedna część

## całego środowiska

Switchboard zarządza kontami Claude Code i Codex. Project Observatory pokazuje projekty, nad którymi pracują te agenty. Fabric Dashboards pokazuje lokalne usługi agentów na Twoim Macu w jednym oknie. Fabric, nasz agent AI w roli CEO, jest we wczesnej wersji zapoznawczej.

Poznaj Observatory

↗

Wydanie Fabric Dashboards

↗

Poznaj Fabric

↗

Wszystkie narzędzia

↗

OTWARTY KOD · NAJPIERW LOKALNIE

## Twoje środowisko, Twój kod

Wypróbuj, sprawdź, jak działa, i powiedz nam, co wymaga poprawy.

Pobierz Switchboard

↑

Zgłoś problem

↗

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
