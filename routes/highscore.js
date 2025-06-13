// routes/highscore.js

const express = require('express');
const router = express.Router();

// Importiere die Datenbankfunktionen
const db = require('../db/database');

// POST /api/highscore/upload
// Erwartet ein JSON mit username, mode, zpm, errors
router.post('/upload', async (req, res) => {
  const { username, mode, zpm, errors } = req.body;

  // Validierung der Eingabedaten
  if (!username || !mode || typeof zpm !== 'number' || typeof errors !== 'number') {
    return res.status(400).json({ error: 'Ungültige Daten' });
  }

  try {
    const result = await db.insertHighscore({ username, mode, zpm, errors });
    res.status(201).json({ success: true, id: result.id });
  } catch (err) {
    console.error('Fehler beim Speichern:', err);
    res.status(500).json({ error: 'Serverfehler beim Speichern' });
  }
});

// GET /api/highscore/top
// Gibt eine Liste der besten Einträge zurück (z. B. Top 10)
router.get('/top', async (req, res) => {
  try {
    const topScores = await db.getTopHighscores(10);
    res.json(topScores);
  } catch (err) {
    console.error('Fehler beim Abrufen:', err);
    res.status(500).json({ error: 'Serverfehler beim Abrufen' });
  }
});

module.exports = router;