# PAP2023Z-Z30 - Platforma dla korepetytorów

## 1. Technologie:

### Frontend:

- **React:** Wykorzystanie biblioteki React do budowy interfejsu użytkownika, zapewniającej efektywne odświeżanie i zarządzanie stanem komponentów.
- **Next.js:** Framework oparty na React, umożliwiający renderowanie strony po stronie serwera (SSR) oraz generowanie statyczne (SSG), co przyczynia się do optymalizacji wydajności.
- **TypeScript:** Rozszerzenie języka JavaScript o statyczną typizację, co przyczynia się do lepszej czytelności i utrzymanie kodu.

### Backend:

- **Oracle SQL (wydziałowy):** Baza danych Oracle SQL została wybrana jako główne źródło przechowywania danych, co zapewnia niezawodność i skalowalność w przypadku obsługi dużej ilości informacji.

## 2. Cel projektu:

Platforma ma służyć jako centralne miejsce dla korepetytorów i klientów, ułatwiając rezerwację korepetycji, dostęp do informacji o dostępności oraz zarządzanie kontami.

## 3. Funkcje systemu:

### Konta klientów:

- **Rejestracja:** Klienci mogą zarejestrować się, dostarczając niezbędne informacje.
- **Weryfikacja e-mail:** Proces weryfikacji e-mail dla zabezpieczenia kont użytkowników.
- **Zapisywanie się na korepetycje:** Możliwość przeglądania ofert korepetycji i zapisywania się na wybrane terminy.
- **Panel użytkownika:** Dostęp do historii rezerwacji, informacji o dostępności godzin, aktualnego stanu konta.

### Konta korepetytorów:

- **Rejestracja:** Proces rejestracji dla korepetytorów, wymagający podania informacji o umiejętnościach,
doświadczeniu, itp.
- **Dodawanie ofert korepetycji:** Możliwość dodawania informacji o dostępności, cenach, lokalizacji korepetycji.
- **Akceptacja korepetycji:** Mechanizm akceptacji rezerwacji ze strony korepetytora.
- **Powiadomienia e-mail o korepetycjach:** Automatyczne powiadomienia e-mail dla korepetytorów o nowych rezerwacjach.

### Ogólne funkcje:

- **Bezpieczne logowanie:** Użytkowanie protokołów bezpiecznego logowania, takich jak HTTPS, w celu ochrony danych logowania.
- **Doładowanie godzin użytkownika z poziomu API:** Dostęp do API umożliwiającego doładowanie godzin dla konta użytkownika.

## 4. Bezpieczeństwo:

- **Bezpieczne logowanie:** Wykorzystanie silnych algorytmów haszujących i praktyk bezpieczeństwa w celu ochrony haseł użytkowników.
- **Weryfikacja e-mail:** Weryfikacja poprzez e-mail w celu potwierdzenia tożsamości użytkowników.
- **Ochrona danych:** Zapewnienie bezpiecznego przechowywania danych użytkowników w bazie danych.

## 5. Integracje zewnętrzne:

- **Oracle SQL:** Integracja z lokalną bazą danych Oracle SQL do składowania i zarządzania danymi.
- **API do doładowywania godzin:** Wykorzystanie interfejsu programistycznego (API) do realizacji funkcji doładowywania godzin użytkownika.

## 6. Architektura:

- **Frontend:** Aplikacja oparta na architekturze komponentowej, wykorzystująca React, Next.js i TypeScript.
- **Backend:** Implementacja serwera obsługującego żądania API oraz komunikację z bazą danych Oracle SQL.

## 7. Komunikacja:

- **Powiadomienia e-mail:** System powinien automatycznie wysyłać powiadomienia e-mail klientom i korepetytorom w przypadku ważnych zdarzeń, takich jak potwierdzenie rezerwacji.

## 8. Inne:

- **Responsywność:** Interfejs użytkownika powinien być responsywny, dostosowujący się do różnych rozmiarów ekranu.
- **Obsługa różnych typów kont:** System powinien umożliwiać zarządzanie różnymi typami kont, takimi jak konta klientów i korepetytorów.
