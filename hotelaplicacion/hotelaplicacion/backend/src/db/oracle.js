// backend/src/db/oracle.js
import oracledb from 'oracledb';

let pool;

/** Crea (una sola vez) el pool de conexiones */
async function getPool() {
  if (!pool) {
    pool = await oracledb.createPool({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECT_STRING,
      poolMin: 1,
      poolMax: 4,
      poolIncrement: 1,
    });
  }
  return pool;
}

/** Devuelve una conexión del pool */
export async function getConnection() {
  const p = await getPool();
  return p.getConnection();
}

/**
 * Ejecuta SQL con binds y opciones y cierra la conexión.
 * - Para SELECT devuelve `rows` (array de objetos).
 * - Para DML (INSERT/UPDATE/DELETE) devuelve el `result` completo.
 * Usa { autoCommit: true } cuando quieras confirmar la transacción.
 */
export async function exec(sql, binds = {}, opts = {}) {
  const conn = await getConnection();
  try {
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT, // filas como objetos {COLUMNA: valor}
      autoCommit: false,                     // por defecto no hace commit
      ...opts,                               // permite override (p.ej. autoCommit: true)
    };
    const result = await conn.execute(sql, binds, options);
    return result.rows ?? result;
  } finally {
    try { await conn.close(); } catch {}
  }
}

export default { getConnection, exec };




