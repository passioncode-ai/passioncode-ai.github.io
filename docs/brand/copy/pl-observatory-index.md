Contract: brand-contract v1

<!-- Generated from pl/observatory/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Project Observatory | Lokalny dashboard dla projektów prowadzonych przez agentów | PassionCode.ai

Zobacz, co zmieniło się w Twoich projektach, co wymaga uwagi i gdzie znane klucze API zostawiły kopię. Project Observatory to lokalny dashboard o otwartym kodzie na licencji GNU AGPL-3.0 od PassionCode.ai, w wersji angielskiej lub rosyjskiej.

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

Pobierz

↓

PROJECT OBSERVATORY · OD PASSIONCODE

# Twoje projekty

# Znów w zasięgu wzroku

Zobacz, co zmieniło się w projektach Twoich agentów, co wymaga uwagi i gdzie znane klucze API zostawiły kopię, w lokalnym dashboardzie po angielsku lub rosyjsku

W RODZINIE Pamięć i dowody: co zmieniło się w każdym projekcie, co postanowiono i co wymaga uwagi. Cała rodzina

Zacznij

↓

Zobacz kod źródłowy

↗

Otwarty kod · macOS + Linux · Python 3.11+

JEDEN WIDOK / TWOJE PROJEKTY

PROJEKTY

+

USTALENIA

WEWNĄTRZ OBSERVATORY

## Najpierw to, co wymaga uwagi

Prawdziwy przegląd Observatory, wygenerowany przez silnik na projektach fikcyjnej firmy.

Syntetyczny zbiór demonstracyjny · bez prawdziwych projektów, repozytoriów ani danych uwierzytelniających

LOKALNE OBSERVATORIUM

## Mniej zgadywania

## Więcej dowodów na pierwszy rzut oka

01 / INWENTARZ

### Wiedz, co masz

Wybierz folder z projektami, który chcesz obserwować. Observatory znajdzie w nim repozytoria i będzie prowadzić lokalny rejestr, z podaną regułą stojącą za każdym powiązaniem.

02 / AKTYWNOŚĆ

### Zobacz, co się ruszyło

Commity, stan drzewa roboczego i praca, która istnieje tylko na tej maszynie, we wszystkich projektach objętych obserwacją, razem z tygodniowym przebiegiem każdego z nich.

03 / USTALENIA

### Zacznij od tego, co ważne

Ustalenia przychodzą z dowodami i kolejnym krokiem, od krytycznych po informacyjne. Wyciszone ustalenia zachowują informację, kto je wyciszył, kiedy i dlaczego.

04 / KLUCZE

### Znajdź kopie znanych kluczy

Metadane danych uwierzytelniających są trzymane osobno od wartości. Wybrane transkrypty, logi i bazy SQLite są porównywane z kluczami już znanymi lokalnie; ustalenia nigdy nie powtarzają wartości.

05 / TWÓJ JĘZYK

### Angielski lub rosyjski

Domyślnie dashboard jest po angielsku. Ustaw rosyjski dla przestrzeni roboczej albo przełączaj EN/RU na pasku bocznym; liczniki używają form liczby właściwych dla każdego języka.

06 / AGENCI

### Daj kolejnemu agentowi kontekst

CLI, narzędzia MCP i wtyczka do Claude Code opierają się na tych samych lokalnych faktach. Integracje i zadania w tle pozostają wyłączone, dopóki ich nie wybierzesz.

POBIERZ OBSERVATORY

## Zacznij od własnej przestrzeni roboczej

Najnowsze wydanie: 0.21.0. Do pierwszej lokalnej obserwacji nie potrzeba klucza API. Przekaż konfigurację swojemu agentowi programującemu albo wykonaj ją samodzielnie.

01

### Zainstaluj wydanie

Pobierz project_observatory-0.21.0-py3-none-any.whl i SHA256SUMS z wydania 0.21.0, sprawdź je poleceniem shasum -a 256 -c SHA256SUMS --ignore-missing, a następnie w odizolowanym środowisku Python 3.11+ z obsługą rozszerzeń SQLite wykonaj pip install --no-deps dla pakietu wheel, a potem jego dodatku [full] z -c "$(project-observatory full-path)/requirements-full.lock", czyli zestawem zależności, z którym wydanie było testowane. Na macOS użyj Pythona z Homebrew.

02

### Utwórz prywatną przestrzeń roboczą

project-observatory full init, a potem wybierz folder do obserwacji poleceniem full configure sources projects. Konfiguracja, klucze i historia zostają poza zainstalowanym kodem.

03

### Obserwuj i otwieraj

project-observatory full local, a potem full open. Dla rosyjskiego: full configure interface locale ru.

04

### Podłącz swojego agenta

Serwer MCP komunikuje się przez stdio: claude mcp add observatory --scope user -e OBSERVATORY_HOME="$OBSERVATORY_HOME" -- "$(python -c 'import sys; print(sys.executable)')" "$(project-observatory full-path)/mcp/server.py", a potem poproś o observatory_overview.

Przewodnik instalacji

↗

Wdrożenie i integracje

↗

Wszystkie wydania

↗

Aplikacja na Maca: ProjectObservatory-0.21.0-macos.zip, podpisana certyfikatem Developer ID i notaryzowana przez Apple, na macOS 14+. Otwiera się na dashboardzie i korzysta z silnika zainstalowanego wyżej; sprawdź ją względem tego samego SHA256SUMS.

Bieżące wydanie, 0.21.0, jest na licencji AGPL, tak jak każde wydanie od 0.10.0, pierwszego na AGPL; 0.9.1 i wcześniejsze zachowują licencję, z którą zostały wydane.

Skanowanie znanych wartości porównuje wybrane artefakty z kluczami już znanymi lokalnie. Nie potrafi znaleźć nieznanych sekretów ani udowodnić, że nie została żadna kopia, a lokalna kopia nie jest dowodem, że ktokolwiek inny zdobył klucz. Rotacja kluczy u prawdziwych dostawców i zewnętrzne hosty MCP nie wchodzą w skład testów offline.

PRZED STARTEM

## Kilka przydatnych rozróżnień

Czy Observatory wysyła moje projekty lub klucze?

Nie. Inwentarz, historia i obserwacje żyją w Twojej prywatnej przestrzeni roboczej na Twojej maszynie. Opcjonalne integracje mają własny dostęp; każdą włączasz osobno, na własnym koncie.

Co czyta?

Tylko foldery i źródła, które skonfigurujesz. full doctor pokazuje, co jest włączone, a czego brakuje, a dashboard mówi wprost, że źródło nie zostało zmierzone, zamiast pokazywać zero.

Czy to to samo co Switchboard?

Nie. Switchboard zarządza Twoimi kontami Claude Code i Codex. Observatory trzyma w zasięgu wzroku projekty, nad którymi pracują ci agenci. Oba to narzędzia PassionCode o otwartym kodzie, z których możesz korzystać już dziś.

A Fabric?

Fabric to nasz agent AI w roli CEO, we wczesnej wersji zapoznawczej, skupiony na koordynowaniu agentów i projektów. Observatory jest dostępne już teraz jako osobne narzędzie lokalne. Poznaj Fabric.

Czy mogę go sprawdzić lub zbudować sam?

Tak. Project Observatory ma otwarty kod na licencji GNU AGPL-3.0. Na użycie, którego AGPL nie obejmuje, licencję komercyjną można uzyskać na passioncode.ai/business. Wydane wersje zachowują swoją licencję: 0.8.1 i wcześniejsze na MIT, od 0.8.2 do 0.9.1 na PolyForm Noncommercial or Internal Use. W repozytorium znajdziesz kod źródłowy, testy, model bezpieczeństwa i notatki do wydań.

OTWARTY KOD · NAJPIERW LOKALNIE

## Twoje projekty, Twoje dowody

Skonfiguruj prywatną przestrzeń roboczą, obserwuj własne foldery i powiedz nam, gdzie trzeba coś poprawić.

Zacznij

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
