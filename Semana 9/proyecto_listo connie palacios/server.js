/**
 * Proyecto listo: Express + Frontend estático con login y roles
 * Comandos:
 *   npm install
 *   npm start
 * Abre: http://localhost:4000
 */
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const seed = [
      {
        name: "Administrador",
        email: "admin@demo.cl",
        password: bcrypt.hashSync("Admin*123", 10),
        role: "admin"
      },
      {
        name: "Cliente Demo",
        email: "cliente@demo.cl",
        password: bcrypt.hashSync("Demo*123", 10),
        role: "client"
      }
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(seed, null, 2));
    return seed;
  }
  try {
    const text = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(text);
  } catch (e) {
    console.error("Error leyendo users.json, resembrando...", e);
    const seed = [];
    fs.writeFileSync(USERS_FILE, JSON.stringify(seed, null, 2));
    return seed;
  }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

let users = loadUsers();

app.get('/api/health', (req, res) => {
  res.json({ ok: true, status: 'UP' });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ ok: false, error: 'Faltan campos' });
  }
  const r = role === 'admin' ? 'admin' : 'client';
  const exists = users.find(u => u.email.toLowerCase() == String(email).toLowerCase());
  if (exists) {
    return res.status(409).json({ ok: false, error: 'Usuario ya existe' });
  }
  const user = {
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    role: r
  };
  users.push(user);
  saveUsers(users);
  res.status(201).json({ ok: true, message: 'Usuario creado', user: { name, email, role: r } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ ok: false, error: 'Faltan credenciales' });
  }
  const u = users.find(x => x.email.toLowerCase() === String(email).toLowerCase());
  if (!u) {
    return res.status(401).json({ ok: false, error: 'Credenciales' });
  }
  const ok = bcrypt.compareSync(password, u.password);
  if (!ok) {
    return res.status(401).json({ ok: false, error: 'Credenciales' });
  }
  const token = jwt.sign({ sub: u.email, role: u.role, name: u.name }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ ok: true, token, user: { email: u.email, role: u.role, name: u.name } });
});

function auth(req, res, next) {
  const h = req.headers['authorization'] || '';
  const m = h.match(/^Bearer (.+)$/);
  if (!m) return res.status(401).json({ ok: false, error: 'No token' });
  try {
    req.user = jwt.verify(m[1], JWT_SECRET);
    next();
  } catch(e) {
    return res.status(401).json({ ok: false, error: 'Token inválido' });
  }
}

function onlyAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ ok: false, error: 'Solo admin' });
  }
  next();
}

// Rutas protegidas
app.get('/api/items', auth, (req, res) => {
  const items = [
    { id: 1, name: 'Habitación Simple', price: 35000 },
    { id: 2, name: 'Habitación Doble', price: 52000 },
    { id: 3, name: 'Suite', price: 95000 }
  ];
  res.json({ ok: true, items, user: req.user });
});

app.get('/api/admin/users', auth, onlyAdmin, (req, res) => {
  const slim = users.map(({ name, email, role }) => ({ name, email, role }));
  res.json({ ok: true, users: slim });
});

// Frontend estático
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Proyecto listo en http://localhost:${PORT}`);
  console.log(`➡️  Admin: admin@demo.cl / Admin*123`);
  console.log(`➡️  Cliente: cliente@demo.cl / Demo*123`);
});