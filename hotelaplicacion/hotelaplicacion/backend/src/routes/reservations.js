import { Router } from 'express';
import oracledb from 'oracledb';
import pool from '../db/oracle.js';
import auth from '../middleware/auth.js'; // tu middleware JWT si lo tienes

const router = Router();

// Crea reserva muy simple (ajusta a tu esquema real)
router.post('/', auth, async (req, res) => {
  try {
    const { itemId, date } = req.body; // date en ISO
    if (!itemId || !date) {
      return res.status(400).json({ ok: false, error: 'Faltan campos' });
    }

    const conn = await pool.getConnection();
    await conn.execute(
      `INSERT INTO RESERVATIONS (ID, ITEM_ID, DATE_UTC)
       VALUES (RES_SEQ.NEXTVAL, :itemId, :dateUtc)`,
      { itemId, dateUtc: new Date(date) },
      { autoCommit: true }
    );
    await conn.close();

    return res.json({ ok: true });
  } catch (e) {
    console.error('POST /api/reservations', e);
    const msg = e.errorNum ? `ORA-${e.errorNum}` : e.message;
    return res.status(500).json({ ok: false, error: msg });
  }
});

export default router;

