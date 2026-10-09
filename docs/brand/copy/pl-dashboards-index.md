Contract: brand-contract v1

<!-- Generated from pl/dashboards/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Dashboards | Twoje lokalne usługi agentów w jednym miejscu

Jedno okno na Macu dla Twoich lokalnych usług agentów. Zobacz, co wymaga uwagi, otwieraj panele i pozwól agentom korzystać z tych samych narzędzi przez MCP.

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

FABRIC DASHBOARDS · macOS

# Twoje usługi agentów

# Jedno miejsce, w które patrzysz

Zobacz, co działa, co wymaga uwagi i co wydarzyło się ostatnio, a panel każdej usługi masz w jednej aplikacji na Maca

W RODZINIE Kondycja, wydatki i sterowanie: każda usługa agenta, jej stan, wydatki i aktualizacje w jednym oknie. Cała rodzina

Pobierz na macOS ↓

Zobacz kod źródłowy ↗

Wydanie 0.6.5 · macOS 13+ · Apple silicon + Intel

TWOJE LOKALNE USŁUGI / RAZEM

OKNO

## Każda usługa agenta

## na jednym ekranie

Co jest gotowe, co wymaga Ciebie i ile kosztuje, a akcja jest o jedno kliknięcie. Każda usługa otwiera swój własny panel w aplikacji.

Prawdziwa aplikacja z wersji deweloperskiej · przykładowe usługi z zestawu Fabric Agent Adapter, bez prawdziwych danych

Własny panel usługi, otwarty w aplikacji

01 / TRZYMAJ PRACĘ W POLU WIDZENIA

## Okno na

## narzędzia, które wykonują pracę

Fabric Dashboards wykrywa zgodne usługi na Twoim Macu. Każda usługa zachowuje swoje zadanie; Ty dostajesz wspólne miejsce, by je sprawdzać i nimi sterować.

### Zobacz, co wymaga Ciebie

Stan usługi, ostatnia aktywność i sprawy wymagające uwagi pojawiają się razem. Wolna sonda nie jest od razu uznawana za awarię.

### Otwórz prawdziwy panel

Własny interfejs każdej usługi otwiera się w aplikacji, z już wykonanym logowaniem. Project Observatory to jedna ze zgodnych usług, z której możesz korzystać już dziś.

### Zajmij się następnym krokiem

Uruchom, zatrzymaj lub zrestartuj usługę, sprawdź jej logi i użyj akcji, które udostępnia jej kontrakt. Zamknięcie Dashboards zostawia Twoje usługi uruchomione.

W 0.6

## Wydatki, konsola

## i aktualizacje, którym możesz ufać

Co dodały wydania 0.6, od 0.6.0 z 6 października do 0.6.5 z 8 października 2026.

### Każdy limit w Spend

Strona Spend wyświetla limity stosowane przez każdego agenta: ten, który najbardziej wymaga Ciebie, jest czerwony, gdy zatrzymał pracę lub przekroczył swoją granicę, i bursztynowy przy 80%; agenta można rozwinąć do każdego limitu z jego oknem i tym, ile wydano. Twój agent czyta tę samą listę przez MCP.

### Konsola agenta obok panelu

Prawdziwy terminal otwiera się obok panelu usługi i uruchamia Claude Code, Codex lub inne środowisko w repozytorium tego agenta. Tam, gdzie Fabric Switchboard wiąże folder z projektem, sesja startuje na koncie tego projektu.

### Aktualizacje, które są najpierw sprawdzane

Aplikacja aktualizuje się sama: wydanie musi nosić podpis organizacji i zgadzać się z sumami kontrolnymi, zanim zostanie zainstalowane, i czeka, dopóki działa konsola lub polecenie. Automatyczną instalację można wyłączyć w Settings.

### Rodzina na bieżąco

Settings → Estate updates śledzi Fabric Agent Contract i skille PassionCode.ai i może aktualizować skille w tle po sprawdzeniu, kto je opublikował. Ten przełącznik jest domyślnie wyłączony.

### Angielski lub rosyjski

Settings → Language: jak na tym Macu, English lub Русский. Okno, menu i zasobnik przełączają się od razu.

02 / POBIERZ FABRIC DASHBOARDS

## Jedno pobranie

## Twoje usługi pozostają Twoje

### macOS

Wydanie 0.6.5. Universal DMG dla Apple silicon i Intel, macOS 13 lub nowszy. Podpisany certyfikatem Developer ID, notaryzowany, z dołączonym biletem notaryzacji.

Pobierz Fabric Dashboards ↓

Otwórz DMG, przeciągnij Fabric Dashboards do Aplikacji, a potem otwórz je. Aplikacja startuje przy logowaniu; możesz to zmienić w Settings.

### Zanim otworzysz

Usługi instaluje się osobno. Pusta lista jest oczekiwana, dopóki nie zainstalujesz zgodnej usługi; Dashboards nie zamienia każdego lokalnego procesu w usługę agenta.

Wypróbuj Project Observatory, albo stwórz własną usługę za pomocą Fabric Agent Adapter. Sama aplikacja nie wymaga konta ani klucza API.

SHA-256 pliku DMG

b1d1d7253a32a059686725befb1b9ead53252688a3ce0ae995de3a91106a3ea3

Informacje o wydaniu i sumy kontrolne ↗

Przewodnik instalacji ↗

03 / DLA TWOICH AGENTÓW

## Te same usługi

## Z poziomu Twojego agenta

Zarejestruj serwer MCP aplikacji w swoim kliencie. Agent może wylistować usługi, pobrać linki do paneli i używać operacji udostępnianych przez reguły aplikacji.

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Po zainstalowaniu aplikacji w Aplikacjach poproś agenta o wywołanie list_services. Pusty wynik oznacza, że żadna usługa nie jest jeszcze zainstalowana. Inne klienty MCP mogą uruchamiać ten sam plik wykonywalny jako serwer stdio. Zobacz przewodnik konfiguracji MCP.

04 / WARTO WIEDZIEĆ

## Wpasowuje się w Twój układ

Czy potrzebuję Fabric?

Nie. Fabric Dashboards działa samodzielnie. To jedno z narzędzi Fabric i może pokazywać zgodne usługi, zanim zaczniesz używać wczesnej wersji zapoznawczej Fabric.

Które usługi się pojawiają?

Usługi, które publikują lokalny deskryptor dla fabric-service/0.1. Obsługuje go Project Observatory. Protokół opisuje Fabric Agent Contract a Adapter pomaga go zaimplementować.

Czy to otwarty kod?

Fabric Dashboards ma otwarty kod na licencji GNU AGPL-3.0. Dostępna jest licencja komercyjna: passioncode.ai/business. Wydanie 0.1.0 pozostaje na MIT; 0.2.0 i 0.3.0 pozostają na PolyForm Noncommercial lub Internal Use. Wydanie 0.3.1 jest pierwszym na AGPL.

CZĘŚĆ TWOJEGO MIEJSCA PRACY AGENTÓW

## Zacznij od usług,

## z których już korzystasz

Sprawdzaj projekty w Observatory. Konfiguruj konta w Switchboard. Dodawaj tylko te narzędzia, których potrzebuje Twoja praca.

Poznaj narzędzia ↗

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
