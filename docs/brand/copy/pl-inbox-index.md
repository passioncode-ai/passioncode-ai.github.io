Contract: brand-contract v1

<!-- Generated from pl/inbox/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Inbox | Poczta, w której najważniejsze jest na górze · wersja zapoznawcza na macOS | PassionCode.ai

Fabric Inbox to narzędzie pocztowe z rodziny Fabric, które działa samodzielnie: skrzynki Gmail i Cloudflare w jednej liście z ważną pocztą na górze oraz agenci na Twoich własnych adresach. Rozwojowa wersja zapoznawcza na macOS.

Przejdź do treści

PassionCode

.ai

Produkty

Switchboard

Observatory

Inbox

Fabric

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

GitHub

↗

FABRIC INBOX · ROZWOJOWA WERSJA ZAPOZNAWCZA

# Twoja poczta

# Ważne na górze

Zbierz skrzynki Gmail i Cloudflare w jednej liście, z ważną pocztą na górze, oraz agentów dla własnych domen, którzy odpowiadają na to, na co pozwolisz, a resztę przygotowują jako szkice

W RODZINIE Poczta: adresy, które agenci czytają i na które odpowiadają w ramach ustawionej przez Ciebie reguły. Cała rodzina

Pobierz na macOS

↓

Zobacz, co potrafi

↓

Wersja zapoznawcza 0.12.0 · macOS 12 lub nowszy · otwarty kod na licencji AGPL-3.0

FABRIC INBOX / POCZTA + AGENCI

WAŻNE

+

ODPOWIEDZIANO

01 / CO ROBI

## Mniej do czytania

## Mniej do odpisywania

Inbox sortuje każde konto tak samo, a adresom w Twoich domenach daje kogoś, kto na nie odpowiada.

NAJPIERW WAŻNE

### To, co Cię wymaga, na górze

Na górze lądują: nieprzeczytana poczta od osób, poczta o bezpieczeństwie i logowaniu, alerty z monitoringu, odrzucenia aplikacji w recenzji, nieudane płatności i nieudane buildy. Newslettery, powiadomienia, rozliczenia i reszta czekają w zwiniętych grupach z licznikami. Każdy wiersz mówi, dlaczego się tam znalazł.

TWOJE DOMENY

### Wszystkie adresy w jednym miejscu

Włącz pocztę dla domeny z Twojego konta Cloudflare, przenieś adresy, które już ma, i dodaj nowe. Każdy istniejący adres nadal przekazuje kopię tam, gdzie trafiała wcześniej. Poczta na adres bez skrzynki jest wyświetlana na liście, nigdy nie jest porzucana.

AGENCI W RAMACH TWOICH REGUŁ

### Wysyła tylko to, co wolno

Agent ma własne instrukcje, wiedzę i narzędzia i może obsługiwać kilka adresów. Wysyła odpowiedź tylko wtedy, gdy opiera się ona na jego wiedzy, mieści się w dozwolonym przez Ciebie temacie i w dziennym limicie. Cała reszta czeka jako szkic z podanym powodem.

POBIERZ FABRIC INBOX

## Rozwojowa wersja zapoznawcza

## na Twojego Maca

Najnowsza wersja zapoznawcza: 0.12.0. Aplikacja na Maca tworzy swój serwer pocztowy na Twoim własnym koncie Cloudflare i go otwiera; Twoja poczta zostaje przy Twoich kontach.

⌘

### macOS

Universal · Apple silicon + Intel · macOS 12 lub nowszy
Instalator DMG · podpisany certyfikatem Developer ID i notaryzowany przez Apple

Pobierz na macOS

↓

Otwórz DMG i przeciągnij Fabric Inbox do Aplikacji.

☰

### Zanim otworzysz

Przy pierwszym otwarciu wybierz Create my server on Cloudflare.

Konto Cloudflare; wystarczy plan darmowy

Token API, który tworzysz w jego panelu, z uprawnieniami podanymi w aplikacji

Dla Gmaila: klient OAuth z Twojego własnego projektu Google Cloud

Szczegóły w przewodniku konfiguracji — wymieniono w nim każde ustawienie.

macOS DMG · SHA-256

a8e55bc8c8ad8837f079ad161104096cd14f1c09e08efaa883028642c0f136c7

Porównaj przed otwarciem: shasum -a 256 w Terminalu. Inna wartość oznacza inny plik; pobierz go ponownie.

Notatki do wydania & suma kontrolna

↗

Uwagi dotyczące instalacji

↗

Wszystkie wydania

↗

To rozwojowa wersja zapoznawcza. Odpowiedzi agentów nie zostały jeszcze wypróbowane z prawdziwym wywołaniem modelu, a Gmail nie został jeszcze zaakceptowany na prawdziwym koncie. Ogólna obsługa IMAP i Outlook jest planowana; żadna z nich nie jest dziś oferowana jako działająca integracja.

DLA AGENTÓW

## Wszystko, co robi aplikacja,

## może zrobić agent

Twój serwer odpowiada w Model Context Protocol pod adresem /mcp. Każda funkcja aplikacji jest też narzędziem MCP, więc Claude Code lub inny klient MCP może czytać, sortować i wysyłać pocztę oraz zarządzać adresami w granicach poziomu swojego klucza.

01

### Utwórz klucz

W aplikacji otwórz Settings → Agent access. Wybierz nazwę, poziom (read, mail lub admin) i to, czy klucz może wysyłać. Sekret jest pokazywany tylko raz.

02

### Podłącz swojego agenta

Aplikacja wypisuje całe polecenie: claude mcp add --transport http fabric-inbox https://<your-server>/mcp z dwoma nagłówkami klucza. Potem poproś o list_accounts.

02 / RODZINA PASSIONCODE

## Narzędzie z własnym zadaniem

Inbox zajmuje się pocztą. Switchboard zarządza kontami Claude Code i Codex. Project Observatory trzyma w polu widzenia projekty, nad którymi pracują ci agenci. Fabric to agent CEO AI, którego budujemy, by koordynował pracę.

Poznaj Switchboard

↗

Poznaj Observatory

↗

Poznaj Fabric

↗

ZANIM ZACZNIESZ

## Na jakim etapie jest Inbox

Dokąd trafia moja poczta?

Na serwer, który aplikacja tworzy na Twoim własnym koncie Cloudflare. Konta Gmail łączą się przez klienta OAuth z Twojego własnego projektu Google Cloud.

Czy będzie odpisywać na moją pocztę sam?

Tylko na adresach, którym przypiszesz agenta, i tylko takimi odpowiedziami, na jakie pozwalają jego reguły. Na pocztę automatyczną, masową i no-reply nie odpowiada nigdy, a każde uruchomienie zapisuje dokładnie, co wysłano.

Czy obsługuje każde konto pocztowe?

Jeszcze nie. W wersji zapoznawczej działają skrzynki Cloudflare i Gmail. Ogólna obsługa IMAP i Outlook jest planowana.

Czy kod źródłowy jest publiczny?

Tak. Fabric Inbox ma otwarty kod na licencji GNU AGPL-3.0. Na zastosowania, których AGPL nie obejmuje, dostępna jest licencja komercyjna od passioncode.ai/business. Projekt zaczął się od szablonu Agentic Inbox od Cloudflare, który zachowuje własną informację o licencji Apache-2.0. Znajdziesz w repozytorium kod źródłowy, testy i uwagi do wydania.

Czy Inbox to agent Fabric?

Nie. Inbox to klient poczty; jego agenci odpowiadają na Twoje adresy w ramach reguł, które ustawisz. Fabric to nasz agent CEO AI, we wczesnej wersji zapoznawczej. Oba należą do tego samego zestawu narzędzi i mają różne role.

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
