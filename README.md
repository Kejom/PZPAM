# Programowanie Aplikacji Mobilnych: Projekt Zaliczeniowy


## O Projekcie:
Jest to prosty mockup aplikacji społecznościowej korzystający z https://jsonplaceholder.typicode.com/ jako backendu.
W związku z naturą backendu wszelkie operacje typu dodanie nowego zdjęcia albo wpisu nie są tak naprawde zapisywane w żadnej bazie danych na backendzie i zostają utracone po restarcie aplikacji.

## Ekran Startowy
Po uruchomieniu aplikacji powita nas ekran startowy ktory pozwala się zalogować albo utworzyć nowego użytkownika.
W związku z ograniczeniami wynikającymi z korzystania z jsonplaceholder wystarczy podac tylko username istniejacego już użytkownika i jakiekolwiek hasło.
Alternatywnie możemy kliknąć na "Stwórz nowe konto i utworzyć nowego użytkownika

![ekranLogowania](https://user-images.githubusercontent.com/44144231/236325649-512a14d5-5d3a-4755-ab3a-ba308642eddd.png)

## Ekran Rejestracji
Na tym ekranie mamy możliwość utworzenia nowego użytkownika, formularz zawiera również oproszczoną walidację.
Walidacja sprawdza czy wszystkie pola są wypełnione oraz czy pola "Hasło" oraz "Powtórz Hasło" zawieraja tą samą wartość.
Po poprawnym wypelnieniu formularza i naciśnięciu "Utwórz Konto" użytkownik zostanie automatycznie zalogowany.

![ekranRejestracji](https://user-images.githubusercontent.com/44144231/236326067-04dee284-6617-4c43-a888-da0c13fadf0a.png)

## Menu Główne
Aplikacja składa sie z 3 głownych zakładek które są widoczne w menu na spodzie ekranu oraz przycisku wylogowania.
- Albumy i Zdjęcia : pozwala na przeglądanie, dodawanie oraz zarządzanie albumami oraz zdjęciami
- Wpisy:  przeglądanie oraz dodawanie/usuwanie/edytowanie  wpisów oraz komentarzy do nich
- Profil:  profil użytkownika z możliwoscią jego edycji oraz informacje o albumach/zdjęciach/wpisach/komentarzach zalogowane użytkownika
- Wyloguj: opcja wylogowania się z aplikacji i powrót na powitalny ekran logowania.

![Menu](https://user-images.githubusercontent.com/44144231/236327067-47f69332-9f86-4589-8561-b2a975909392.png)

## Albumy i Zdjęcia: Lista Albumów
Domyślny ekran aplikacji który widzi użytkownik po zalogowaniu się do aplikacji. Zawiera listę wszystkich albumów z możliwościa filtrowania ich po tytule albumu albo nazwie użytkownika ich właściciela.

![AlbumyFeed](https://user-images.githubusercontent.com/44144231/236327492-03feefa5-8aa9-4b30-bb03-fb453898bed6.png)

Naciśnięcie na ikone "+" w prawym górnym rogu pozwala na dodanie nowego albumu (1 screen, 2screen przykład filtrowania po nazwie użytkownika)

![nowyAlbumModal](https://user-images.githubusercontent.com/44144231/236327738-e80299ad-07ec-4736-bb55-9f2c3b1a75e3.png)
![AlbumySzukanie](https://user-images.githubusercontent.com/44144231/236327817-cbbd378a-94e5-4c42-b91a-a31f11232c97.png)

## Albumy i Zdjęcia: Detale Albumu

Po naciśnięciu na album zostaniemy przeniesieniu do ekranu z jego detalami, tutaj jesli jesteśmy jego właścicielem mamy możliwość jego edycji, usunięcia oraz dodania do niego zdjęcia, pozostałe albumy możemy tylko przeglądać(screen 1)
Po kliknięciu na ikone "+" pojawi się formularz do dodania nowego zdjęcia(screen 2 oraz 3), kliknięcie na ikonę kosza na śmieci usunie album oraz wszystkie zawarte w nim zdjęcia.

![albumDetale](https://user-images.githubusercontent.com/44144231/236328362-edf3f501-63bc-4da4-977b-04bb6332d13d.png)
![dodawanieZdjecia](https://user-images.githubusercontent.com/44144231/236329300-d59369be-2a27-432d-acfd-0d4da071caca.png)
![dodaneZdjecie](https://user-images.githubusercontent.com/44144231/236329402-250a974f-6160-4008-afbf-8dd0c548ba06.png)

## Albumy i Zdjęcia: Detale Zdjęcia

Po naciśnięciu na zdjęcie zostaniemy przeniesieni do ekranu z jego detalami, jesli jesteśmy jego właścicielem mamy tutaj możliwość usunięcia go albo edycji tytułu.

![delateZdjecia](https://user-images.githubusercontent.com/44144231/236329828-76e04b84-0cf7-4a2d-9d90-e44d6ffe4ee1.png)

## Wpisy

Po Wybraniu "Wpisy" z dolnego menu zostaniemy przeniesieni na ekran z listą wpisów, podobnie jak z albumami i zdjęciami mamy tutaj możliwość dodania nowego wpisu za pomocą przycisku z ikoną "+" oraz filtrowania ich po tytule oraz autorze. Jesli jesteśmy autorem wpisu zobaczymy przy nim przycisk z ikoną kosza który pozwoli go nam usunąć.

![wpisyFeed](https://user-images.githubusercontent.com/44144231/236330230-f569fa36-9bb6-4162-a467-34eec4a9e4a3.png)
![NowyWpisModal](https://user-images.githubusercontent.com/44144231/236330285-deac840b-b9f6-4b02-910a-4ba501a8adc1.png)

## Wpisy: Komentarze

Po naciśnięciu na wpis, rozwinie się on i odsłoni on komentarze oraz opcje dodania nowego komentarza.
Podobnie jak z komentarzami wpisy których jesteśmy autorami możemy usunąć albo edytować, aby edytowac treść komentarza wystarczy nacisnąć na jego tekst i po zakończeniu na ikonę ołówka w celu zapisania wprowadzonych zmian.

![wpisyKomentarze](https://user-images.githubusercontent.com/44144231/236330788-1fb8280d-b372-4139-b918-964291edaf29.png)

## Profil Użytkownika

Ekran profilu użytkownika zawiera wszystkie dane na temat aktualnie zalogowanego użytkownika podzielone na 3 kategorie.

![ProfilUżytkownika](https://user-images.githubusercontent.com/44144231/236331453-ce609284-58a4-4e55-9b75-ceb6d8f8558c.png)

Moje dane zawiera dane konta użytkownika oraz pozwala na ich edycję(z wyjątkiem nazwy użytkownika która jest też loginem konta)

![ProfilDane](https://user-images.githubusercontent.com/44144231/236331613-8acdda6c-f592-4f97-bd5c-d8b8c98c75f8.png)

Moje Albumy oraz Wpisy zawieraja wszystkie Albumy oraz wpisy których autorem/właścicielem jest użytkownik. Użytkownik może bezpośrednio z poziomu tego menu przejść do detali albumu albo rozwinąć wpis w celu zarządzania jego komentarzami.

![ProfilAlbumyIPosty](https://user-images.githubusercontent.com/44144231/236331856-8a128d3b-e62b-428e-be11-da366b08cffa.png)


