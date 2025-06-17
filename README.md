# Speedboard Backend

Dieses Backend stellt eine REST-API zur Verfügung, um Highscores der 
Speedboard-Terminalanwendung zu speichern und abzufragen.

---
## Features
### HTTP-Endpunkte
- `POST /api/highscore/upload` - Ergebnis speichern
- `GET /api/highscore/top` - Bestenliste abrufen
- `GET /api/status` - Serverstatus prüfen
### Datenverarbeitung
- SQLite-Datenbank (lokal)
- JSON-basiert, plattformunabhängig

---
## Setup
### Lokale installation 
#### Windows (PowerShell)
```powershell
# Node.js
winget install OpenJS.NodeJS.LTS

# Git
winget install Git.Git

# PM2 (über npm)
npm install -g pm2
```
#### Ubuntu (bash)
```bash
# Node.js + npm
sudo apt update
sudo apt install nodejs npm -y

# Git
sudo apt install git -y

# PM2 global installieren
sudo npm install -g pm2

# curl für API-Tests
sudo apt install curl -y
```

#### Projekt starten (plattformunabhängig)
```bash
# Projekt klonen
git clone https://github.com/mstellbrink/speedboard-backend.git
cd speedboard-backend

# Abhängigkeiten installieren
npm install

# Server starten
pm2 start app.js --name speedboard

# API testen
curl http://localhost:8000/api/status
```

### Ubuntu-Server
Für diese Installation wurde ein Ubuntu 24.04.02 Server verwendet. Andere Betriebssysteme wurden **nicht getestet**!

#### Schritt 1: Voraussetzungen auf dem Server
1. Node.js und npm installieren
```bash
sudo apt update
sudo apt install nodejs npm -y
```
Version prüfen:
```bash
node -v
npm -v
```

2. `pm2` installieren (Prozessmanager für Node.js)
```bash
sudo npm install -g pm2
```
Prüfen:
```bash
pm2 --version
```
#### Schritt 2: Projekt auf den Server übertragen
1. GitHub Repo klonen
```bash
git clone https://github.com/mstellbrink/speedboard-backend.git
cd speedboard-backend
npm install
```
2. Mit `pm2` starten
```bash
pm2 start app.js --name speedboard
```
Ergebnis:
```bash
[PM2] App [speedboard] launched (Node.js 18.x)
```
3. Autostart einrichten
```bash
pm2 startup
```
Den ausgegebenen Befehl (z.B. `sudo env PATH=... pm2 startup systemd -u $USER...`) kopieren und ausführen. Dann:
```bash
pm2 save
```
4. Backend lokal testen
```bash
curl http://localhost:8000/api/status
```
Antwort:
```json
{"status":"OK"}
```
---
