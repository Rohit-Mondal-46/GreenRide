const { Pool } = require('pg');

// const pool = new Pool({
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   host: process.env.POSTGRES_HOST,
//   port: process.env.POSTGRES_PORT,
//   database: process.env.POSTGRES_DB,
// });
const pool = new Pool({
  user: 'postgres',
  password: 'Rohit@!#321',
  host: 'localhost',
  port: '5432',
  database: 'health_route_db',
});
// console.log(pool);

const initializeDatabase = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS routes (
        id SERIAL PRIMARY KEY,
        start_lat DOUBLE PRECISION NOT NULL,
        start_lng DOUBLE PRECISION NOT NULL,
        end_lat DOUBLE PRECISION NOT NULL,
        end_lng DOUBLE PRECISION NOT NULL,
        route_data JSONB NOT NULL,
        aqi_data JSONB NOT NULL,
        health_score FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        mode VARCHAR(50) NOT NULL
      );
      
      CREATE INDEX IF NOT EXISTS idx_routes_coordinates 
      ON routes(start_lat, start_lng, end_lat, end_lng);
      
      CREATE INDEX IF NOT EXISTS idx_routes_health_score 
      ON routes(health_score);
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  pool,
  initializeDatabase,
}; 