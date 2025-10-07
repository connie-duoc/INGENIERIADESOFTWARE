// src/routes/users.js
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { exec } from '../db/oracle.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'Faltan campos' });
    }

    const hash = await bcrypt.hash(password, 10);

    await exec(
      `INSERT INTO USERS (EMAIL, PASSWORD_HASH, NAME, "ROLE", CREATED_AT)
       VALUES (:email, :password_hash, :name, :role, SYSTIMESTAMP)`,
      {
        email,
        password_hash: hash,
        name,
        role: role || 'ADMIN' // o 'USER', como prefieras
      },
      { autoCommit: true }
    );

    res.json({ ok: true });
  } catch (e) {
    // manejo bonito de duplicado de email
    if (e.errorNum === 1) {
      return res.status(409).json({ ok: false, error: 'EMAIL_DUPLICADO' });
    }
    console.error('POST /api/users', e);
    res.status(500).json({ ok: false, error: e.errorNum ? `ORA-${e.errorNum}` : e.message });
  }
});

export default router;




