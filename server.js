import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

const PUBLIC_FILES = new Set([
  'index.html',
  'servicios.html',
  'reservas.html',
  'style.css',
  'script.js',
  'validation.js'
]);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:file', (req, res, next) => {
  const file = req.params.file;
  if (!PUBLIC_FILES.has(file)) {
    return next();
  }
  return res.sendFile(path.join(__dirname, file));
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, HOST, () => {
  console.log(`AETHERIS server running at http://${HOST}:${PORT}`);
});
