# Speedboard Backend

Dieses Backend stellt eine REST-API zur Verfügung, um Highscores der 
Speedboard-Terminalanwendung zu speichern und abzufragen.

## Features
- POST /api/highscore/upload - Ergebnis speichern
- GET /api/highscore/top - Bestenliste abrufen
- GET /api/status - Serverstatus prüfen
- SQLite-Datenbank (lokal)
- JSON-basiert, plattformunabhängig

## Setup
```bash
npm install
.\start_server.sh
```