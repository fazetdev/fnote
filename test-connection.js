const { Pool } = require('pg');

const connectionString = "postgresql://neondb_owner:npg_7lQ6KONmUesi@ep-fancy-mode-agy0ecjf-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function test() {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to database');
    
    const result = await client.query('SELECT version()');
    console.log('Database version:', result.rows[0].version);
    
    client.release();
    await pool.end();
  } catch (error) {
    console.error('❌ Connection error:', error.message);
  }
}

test();
