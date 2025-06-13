// app.js

// Express-Framework importieren
const express = require('express');
const app = express();

// JSON-Parsing aktivieren (für eingehende JSON-Daten im Body)
app.use(express.json());

// Highscore-Routen importieren
const highscoreRoutes = require('./routes/highscore');
app.use('/api/highscore', highscoreRoutes);

// Status-Endpunkt für Health Checks
app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Server starten
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Speedboard-Backend auf Port ${PORT} aktiv`);
});