// src/routes/auth.js
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { exec } from '../db/oracle.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'Faltan credenciales' });
    }

    const rows = await exec(
      `SELECT ID, EMAIL, PASSWORD_HASH AS PWD, NVL("ROLE",'USER') AS ROLE
       FROM USERS
       WHERE EMAIL = :email`,
      { email }
    );

    if (!rows.length) return res.status(401).json({ ok: false, error: 'Credenciales' });

    const u = rows[0];
    const ok = await bcrypt.compare(password, u.PWD);
    if (!ok) return res.status(401).json({ ok: false, error: 'Credenciales' });

    const token = jwt.sign(
      { sub: u.ID, email: u.EMAIL, role: u.ROLE },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '8h' }
    );

    res.json({ ok: true, token });
  } catch (e) {
    console.error('POST /api/auth/login', e);
    res.status(500).json({ ok: false, error: e.errorNum ? `ORA-${e.errorNum}` : e.message });
  }
});

export default router;


