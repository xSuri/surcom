# SURCOM — Privacy-First Messenger

## PL
Lekki komunikator mobilny zbudowany w **React Native** i **Node.js**, realizujący koncepcję **Privacy by Design**. System minimalizuje ślad cyfrowy użytkownika poprzez całkowitą rezygnację z persystentnych baz danych.

### Kluczowe cechy:
* **In-Memory Architecture:** Dane przechowywane są wyłącznie w pamięci operacyjnej (RAM).
* **Auto-Purge:** Cykliczne restarty serwera gwarantują nieodwracalne usuwanie historii komunikacji.
* **Ephemeral Messaging:** Brak zapisu wiadomości na dysku, co uniemożliwia wyciek danych historycznych.

*Status: Faza Alpha. Trwa refaktoryzacja struktury plików i optymalizacja stałych.*

### Uruchomienie
1. Zainstaluj zależności: `npm install`
2. Uruchom serwer i zaktualizuj IP w `utils/const.js`.
3. Budowanie: `npx react-native run-android` lub przez Gradle.

---

## ENG
A privacy-focused mobile messenger built with **React Native** and **Node.js**. Designed with a **Privacy by Design** approach to minimize the user's digital footprint.

### Key Features:
* **In-Memory Architecture:** Data is stored exclusively in volatile memory (RAM).
* **Auto-Purge:** Periodic server restarts ensure irreversible deletion of communication history.
* **Ephemeral Messaging:** No disk persistence, preventing any historical data leaks.

*Status: Alpha phase. Ongoing code refactoring and constant optimization.*

### Setup
1. Install dependencies: `npm install`
2. Start server and update IP in `utils/const.js`.
3. Build: `npx react-native run-android` or via Gradle.
