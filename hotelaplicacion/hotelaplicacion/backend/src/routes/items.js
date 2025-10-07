// backend/src/routes/items.js
import { Router } from 'express';
import { exec } from '../db/oracle.js';

const router = Router();

// GET /api/items  -> lista todo
router.get('/', async (_req, res, next) => {
  try {
    // OJO: exec devuelve result.rows, así que r ya es el array de filas
    const r = await exec(`
      SELECT id, name, description, price, active
      FROM items
      ORDER BY id
    `);
    res.json(r);
  } catch (e) {
    next(e);
  }
});

// POST /api/items -> crear (tu código)
router.post('/', async (req, res, next) => {
  try {
    const { name, description, price, active = 1 } = req.body;
    const sql = `
      INSERT INTO items (name, description, price, active)
      VALUES (:name, :description, :price, :active)
    `;
    await exec(sql, { name, description, price, active }, { autoCommit: true });
    res.status(201).json({ ok: true });
  } catch (e) { next(e); }
});

export default router;



