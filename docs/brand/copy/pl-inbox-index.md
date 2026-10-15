Contract: brand-contract v1

<!-- Generated from pl/inbox/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Inbox | Poczta, w której najważniejsze jest na górze · wersja zapoznawcza na komputer | PassionCode.ai

Fabric Inbox to narzędzie pocztowe Fabric, które działa samodzielnie: skrzynki Gmail i Cloudflare w jednej liście z ważną pocztą na górze oraz agenci na Twoich własnych adresach. Rozwojowa wersja zapoznawcza na macOS, Windows i Linuksa.

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

Skonfiguruj

↓

FABRIC INBOX · ROZWOJOWA WERSJA ZAPOZNAWCZA

# Twoja poczta

# Ważne na górze

Zbierz skrzynki Gmail i Cloudflare w jedną listę, z ważną pocztą na górze. Agenci dla Twoich własnych domen odpowiadają na to, na co pozwolisz, a resztę zostawiają jako szkic

W ZESTAWIE NARZĘDZI Poczta: adresy, z których agenci czytają i na które odpowiadają w ramach ustawionej przez Ciebie polityki. To krok 5 w części „Jak to działa”. Wszystkie narzędzia

Skonfiguruj wszystko jednym poleceniem →

Pobierz na macOS

↓

Zobacz, co potrafi

↓

Wersja zapoznawcza 0.17.0 · macOS 12+ · Windows · Linux · otwarty kod na licencji AGPL-3.0

FABRIC INBOX / POCZTA + AGENCI

WAŻNE

+

ODPOWIEDZIANO

NOWOŚĆ W 0.15

## Twój agent kodujący

## przy pracy w Inbox

Wydanie 0.15 umieszcza Claude Code lub Codex obok Twojej poczty i pozwala mu skonfigurować Inbox za Ciebie. Konsola działa od 0.15.1: w 0.15.0 się nie uruchamiała. Jak łączy się agent ↓

KONSOLA AGENTA

### Twój agent w panelu bocznym

Claude Code lub Codex działa po prawej stronie okna poczty, już połączony z tym Inbox, i może zrobić wszystko, co robi aplikacja. Otwórz konsolę przyciskiem na pasku narzędzi, View → Agent Console lub ⌃⌘T (Ctrl+Shift+T w Windows i Linuksie). Każda sesja dostaje własny klucz na poziomie, który wybierasz, odwoływany, gdy sesja się kończy. Wersja z Mac App Store nie ma konsoli.

KONFIGURUJE TWÓJ AGENT

### Bez kopiowania adresów i sekretów

Twój agent kodujący tworzy serwer na Twoim koncie Cloudflare, a potem sam się łączy, gdy pozwolisz na to w aplikacji. Wklejasz token, logujesz się i wybierasz Allow. Ekran powitalny proponuje Use the server your agent set up.

NIEPRZYJĘTA POCZTA

### Poczta, której serwer nie mógł przyjąć

Gdy wiadomości nie dało się ani przyjąć, ani odrzucić, ustawienia domeny pokazują, do kogo była, kiedy i dlaczego. Jej nadawca mógł dostać zwrot, więc wiesz, kogo zapytać.

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

Wszystkie skrzynki · przykładowe adresy i wiadomości, bez prawdziwych kont

POBIERZ FABRIC INBOX

## Rozwojowa wersja zapoznawcza

## na Maca, Windows i Linuksa

Najnowsza wersja zapoznawcza: 0.17.0. Aplikacja tworzy swój serwer pocztowy na Twoim własnym koncie Cloudflare i go otwiera; Twoja poczta zostaje przy Twoich kontach.

⌘

### macOS

Universal · Apple silicon + Intel · macOS 12 lub nowszy
Instalator DMG · podpisany certyfikatem Developer ID i notaryzowany przez Apple

Pobierz na macOS

↓

Otwórz DMG i przeciągnij Fabric Inbox do Aplikacji.

Kopia na Maca starsza niż 0.15.2 nie zaktualizuje się sama: pobierz 0.15.2 raz i zainstaluj ją na starą. Kolejne wydania znów instalują się same.

⊞

### Windows i Linux

Wydanie 0.17.0 zawiera też instalator dla Windows x64 i arm64, który nie wymaga uprawnień administratora, z podpisem Authenticode od wersji 0.14.1, oraz AppImage i .deb dla Linuksa x64 i arm64.

Pobieranie dla Windows i Linuksa

↗

Aplikacja na Windows i AppImage aktualizują się same; kopia zainstalowana z pakietu .deb nie, więc zainstaluj kolejny .deb. Na Linuksie aplikacja trzyma Twoje logowanie w Secret Service (GNOME Keyring lub KWallet) i bez niego się nie uruchomi.

☰

### Zanim otworzysz

Przy pierwszym otwarciu wybierz Create my server on Cloudflare. Jeśli serwer utworzył Twój agent kodujący, wybierz zamiast tego Use the server your agent set up.

Konto Cloudflare; wystarczy plan darmowy

Token API, który tworzysz w jego panelu, z uprawnieniami podanymi w aplikacji

Dla Gmaila: klient OAuth z Twojego własnego projektu Google Cloud

Szczegóły w przewodniku konfiguracji — wymieniono w nim każde ustawienie.

macOS DMG · SHA-256

703fabc72024a905cb1b1c2bf1eff1c3a8a7b253fe60e5b034cd016233a79c78

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

### Daj agentowi jedno zdanie

W aplikacji otwórz Settings → Agent access. Najpierw pokazuje zdanie, które dajesz swojemu agentowi kodującemu. Agent tworzy serwer na Twoim koncie Cloudflare i sam się łączy, gdy wybierzesz Allow; nie kopiujesz żadnego adresu ani sekretu. Kroki agenta opisuje przewodnik konfiguracji dla agentów.

02

### Albo utwórz klucz sam

Na tym samym ekranie wybierz nazwę, poziom (read, mail lub admin) i to, czy klucz może wysyłać. Sekret jest pokazywany tylko raz.

03

### Podłącz swojego agenta

Dla klucza, który utworzysz sam, aplikacja wypisuje całe polecenie: claude mcp add --transport http fabric-inbox https://<your-server>/mcp z dwoma nagłówkami klucza. Potem poproś o list_accounts.

02 / ZESTAW NARZĘDZI PASSIONCODE

## Narzędzie z własnym zadaniem

Inbox obsługuje pocztę. Switchboard zarządza kontami Claude Code i Codex. Project Observatory trzyma w polu widzenia projekty, nad którymi pracują ci agenci. Fabric, we wczesnej wersji zapoznawczej, to dom dla Twoich projektów i ich agentów.

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

Nie. Inbox to klient poczty; jego agenci odpowiadają na Twoje adresy w ramach reguł, które ustawisz. Fabric, we wczesnej wersji zapoznawczej, to dom dla Twoich projektów i ich agentów. Należą do tego samego zestawu narzędzi i mają różne role.

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
