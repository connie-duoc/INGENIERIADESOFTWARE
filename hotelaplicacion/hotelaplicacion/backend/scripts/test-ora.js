// backend/scripts/test-ora.js
import dotenv from 'dotenv';
import oracledb from 'oracledb';
dotenv.config();

async function main() {
  console.log('Probando:', {
    user: process.env.ORACLE_USER,
    connectString: process.env.ORACLE_CONNECT_STRING
  });
  try {
    const conn = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECT_STRING,
    });
    const r = await conn.execute(
      "SELECT USER, SYS_CONTEXT('USERENV','CON_NAME') pdb FROM dual"
    );
    console.log('OK ->', r.rows[0]);
    await conn.close();
  } catch (e) {
    console.error('FAIL ->', e.message);
  }
}
main();
