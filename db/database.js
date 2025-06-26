// db/database.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
// Absolute Pfadangabe für scores.db relativ zum Projektverzeichnis
const dbPath = path.resolve(__dirname, 'scores.db');

// SQLite-Verbindung öffnen (wird automatisch erstellt, wenn Datei nicht existiert)
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Fehler beim Öffnen der DB:', err.message);
    } else {
        console.log('SQLite-Datenbank erfolgreich geöffnet.');
    }
});

// Tabelle erstellen, falls sie nicht existiert
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS highscores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at INTEGER NOT NULL,
            language TEXT NOT NULL,
            mode INTEGER NOT NULL,
            name TEXT NOT NULL,
            score INTEGER NOT NULL,
            time INTEGER NOT NULL
        )
    `);
});

// Funktion: Highscore in DB einfügen
function insertHighscore({ created_at, language, mode, name, score, time }) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO highscores (created_at, language, mode, name, score, time)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.run(query, [created_at, language, mode, name, score, time], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
}

// Funktion: Top-N-Highscores abrufen (nach ZPM absteigend)
function getTopHighscores(limit = 10) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT created_at, language, mode, name, score, time
            FROM highscores
            ORDER BY score DESC
            LIMIT ?
        `;
        db.all(query, [limit], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Funktion: Datenbank leeren (nur für Testzwecke!)
function clearHighscores() {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM highscores`;
    db.run(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


// Funktionen exportieren
module.exports = {
    insertHighscore,
    getTopHighscores,
    clearHighscores,
};