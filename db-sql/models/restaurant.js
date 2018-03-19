
const pg = require('pg');
const pgp = require('pg-promise');
const env = require('dotenv');

const databaseHost = process.env.DATABASE_HOST || 'localhost';
const username = process.env.PG_USER || 'ellisona';
const password = process.env.PG_PASSWORD || 'bananas';

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'wegot_sidebar',
  user: 'ellisona',
  password: 'bananas'
};

const db = pgp(cn);

// Query logic will be placed here in future.

exports.db = db;
