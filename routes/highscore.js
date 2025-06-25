// routes/highscore.js

const express = require('express');
const router = express.Router();

// Importiere die Datenbankfunktionen
const db = require('../db/database');

// POST /api/highscore/upload
// Erwartet ein JSON mit: created_at, language, mode, name, score, time
router.post('/upload', async (req, res) => {
  const { created_at, language, mode, name, score, time } = req.body;

  // Validierung der Eingabedaten
  if (
    typeof created_at !== 'number' ||
    typeof language !== 'string' ||
    typeof mode !== 'number' ||
    typeof name !== 'string' ||
    typeof score !== 'number' ||
    typeof time !== 'number'
  ) {
    return res.status(400).json({ error: 'Ungültige oder fehlende Daten' });
  }

  try {
    const result = await db.insertHighscore({ created_at, language, mode, name, score, time });
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