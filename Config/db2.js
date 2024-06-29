const { Client } = require('pg');
require('dotenv').config();

// PostgreSQL connection configuration
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432
});

client.connect((err) => {
  if (err) {
      console.error('Database connection failed:', err.stack);
      return;
  }
  console.log('Connected to database');
});

module.exports = client;