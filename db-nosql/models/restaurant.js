const pgPromise = require('pg-promise');
const pg = require('pg');
const env = require('dotenv');

const databaseHost = process.env.DATABASE_HOST || 'localhost';
const username = process.env.PG_USER;
const password = process.env.PG_PASSWORD;

const connectionString = `postgres://${username}:${password}@${databaseHost}/ip:5432/wegot_sidebar`;
const client = new pg.Client(connectionString);
client.connect()
  .then(() => console.log('connected to postgres'))
  .catch(err => console.error('connection error to postgres: ', err.stack))

// PG connected. Query logic below.
// Note: `npm run sql-db` must already have been run, 
// prior to performing any of the following query logic.

const find = (queryObj) => {

};

const insert = (documents) => {

};

const remove = (queryObj) => {

};

const count = (queryObj) => {

};

// database functions
exports.find = find;
exports.insert = insert;
exports.remove = remove;
exports.count = count;
// misc objects for testing and database seeding
exports.Restaurant = Restaurant;
exports.connection = db;
