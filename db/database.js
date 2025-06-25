// db/database.js

const sqlite3 = require('sqlite3').verbose();
const { rejects } = require('assert');
const { get } = require('http');
const path = require('path');
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
            timestamp INTEGER DEFAULT CURRENT_TIMESTAMP,
            language TEXT NOT NULL,
            mode INTEGER NOT NULL,
            username TEXT NOT NULL,
            score INTEGER NOT NULL,
            time INTEGER NOT NULL
        )
    `);
});

// Funktion: Highscore in DB einfügen
function insertHighscore({ id, timestamp, mode, username, score, time }) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO highscores (id, timestamp, language, mode, username, score, time)
            VALUES (?, ?, ?, ?)
        `;
        db.run(query, [id, timestamp, mode, username, score, time], function (err) {
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
            SELECT id, timestamp, language, mode, username, score, time
            FROM highscores
            ORDER BY zpm DESC
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

// Funktionen exportieren
module.exports = {
    insertHighscore,
    getTopHighscores,
};