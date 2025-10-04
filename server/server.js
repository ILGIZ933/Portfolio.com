const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Логи
const LOG_FILE = path.join(__dirname, 'logs.json');
if (!fs.existsSync(LOG_FILE)) fs.writeFileSync(LOG_FILE, '[]');

app.get('/logs', (req, res) => {
  const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
  res.json(logs);
});

app.post('/logs', (req, res) => {
  const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
  const { date } = req.body;
  if (!logs.some(log => log.date === date)) {
    logs.push({ date });
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
  }
  res.json(logs);
});

// Фронтенд
const frontendPath = path.join(__dirname, '../my/dist');
app.use(express.static(frontendPath));

// **Catch-all** для SPA
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
