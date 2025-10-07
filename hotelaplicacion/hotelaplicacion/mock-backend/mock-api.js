const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// === AUTH ===
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ ok:false, error:"Missing credentials" });
  const role = (email||"").toLowerCase().includes("admin") ? "ADMIN" : "CLIENT";
  res.json({ token:"mock-token-123", role, user:{ name:"Demo", email } });
});

// === USERS ===
app.post("/api/users", (req, res) => {
  const { name, email, password, role } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ ok:false, error:"Missing fields" });
  res.status(201).json({ ok:true, id:Date.now(), name, email, role: role || "CLIENT" });
});

// === ITEMS / RESERVAS mínimas
app.get("/api/items", (_req, res) => res.json([{ id:1, nombre:"Item A" }, { id:2, nombre:"Item B" }]));
app.get("/api/reservations", (_req, res) => res.json([]));
app.post("/api/reservations", (req, res) => res.status(201).json({ ok:true, payload:req.body }));

const PORT = 5000; // <--- PUERTO MOCK
app.listen(PORT, () => console.log(`Mock API corriendo en http://localhost:${PORT}`));
