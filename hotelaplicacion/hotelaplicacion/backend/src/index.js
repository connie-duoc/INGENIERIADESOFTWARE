import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import users from './routes/users.js';
import auth from './routes/auth.js';
import items from './routes/items.js';
// (si quieres reservas luego) import reservations from './routes/reservations.js';

const app = express();
app.use(cors());
app.use(express.json());

// Health
app.get('/', (_req, res) => res.json({ ok: true, service: 'API Oracle' }));

// Rutas API
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/items', items);
// app.use('/api/reservations', reservations);

import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Servir la web en /app
app.use('/app', express.static(path.join(__dirname, '..', 'public')));


// 404
app.use((_req, res) => res.status(404).json({ ok: false, error: 'Not Found' }));

// Error handler (impide que el proceso muera)
app.use((err, _req, res, _next) => {
  console.error('ERROR:', err);
  const code = err?.errorNum ? `ORA-${err.errorNum}` : err.message;
  res.status(500).json({ ok: false, error: code });
});

// Evita caída por errores no capturados
process.on('unhandledRejection', (e) => console.error('unhandledRejection', e));
process.on('uncaughtException', (e) => console.error('uncaughtException', e));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API http://localhost:${PORT}`));

